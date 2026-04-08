import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    deleteCatalogItem,
    duplicateCatalogItem,
    readCatalogItems,
    readCatalogSections,
    saveCatalogPriceSeed,
    updateCatalogItem,
} from "services/catalog";

import { ITEM_DEFAULT_FORM_VALUES, ITEM_GUIDELINES, ITEM_UNIT_OPTIONS } from "../CreateItem/constants";
import {
    buildItemPreview,
    buildRecentItemHelper,
    sanitizeItemDraft,
    validateItemDraft,
} from "../CreateItem/helpers";

import {
    DEFAULT_ITEMS_FILTERS,
    ITEMS_GUIDELINES as LIST_GUIDELINES,
} from "./constants";
import {
    buildCatalogStatus,
    countActiveFilters,
    filterCatalogItems,
    formatCatalogDate,
    formatRelativeCatalogDate,
    sanitizeItemsFilters,
} from "./helpers";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user, setModal } = useContext(CoreContext);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [sections, setSections] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_ITEMS_FILTERS);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [editor, setEditor] = useState(ITEM_DEFAULT_FORM_VALUES);

    const refreshCatalog = useCallback(() => {
        const nextItems = readCatalogItems();
        const nextSections = readCatalogSections();

        setItems(nextItems);
        setSections(nextSections);

        return {
            items: nextItems,
            sections: nextSections,
        };
    }, []);

    const commitSelection = useCallback((item) => {
        if (!item) {
            setSelectedItemId(null);
            setEditor(ITEM_DEFAULT_FORM_VALUES);
            return;
        }

        setSelectedItemId(item.id);
        setEditor(sanitizeItemDraft(item));
    }, []);

    useEffect(() => {
        const nextState = refreshCatalog();
        if (nextState.items.length) {
            commitSelection(nextState.items[0]);
        }
    }, [commitSelection, refreshCatalog]);

    const filteredItems = useMemo(() => (
        filterCatalogItems(items, search, filters)
    ), [filters, items, search]);

    const selectedItem = useMemo(() => (
        items.find(item => item.id === selectedItemId) || null
    ), [items, selectedItemId]);

    const selectedBaseDraft = useMemo(() => (
        selectedItem ? sanitizeItemDraft(selectedItem) : ITEM_DEFAULT_FORM_VALUES
    ), [selectedItem]);

    const isEditorDirty = useMemo(() => (
        JSON.stringify(editor) !== JSON.stringify(selectedBaseDraft)
    ), [editor, selectedBaseDraft]);

    const validation = useMemo(() => (
        validateItemDraft(editor, items, selectedItem?.id || null)
    ), [editor, items, selectedItem]);

    const preview = useMemo(() => (
        buildItemPreview(editor)
    ), [editor]);

    const activeFiltersCount = useMemo(() => countActiveFilters(filters), [filters]);

    const sectionSuggestions = useMemo(() => (
        sections
            .filter(item => {
                const currentSearch = `${editor.section || ""}`.toLowerCase();
                return !currentSearch || item.name.toLowerCase().includes(currentSearch);
            })
            .slice(0, 8)
    ), [editor.section, sections]);

    const recentItems = useMemo(() => (
        items.slice(0, 5).map(item => ({
            ...item,
            helper: buildRecentItemHelper(item),
            relativeDate: formatRelativeCatalogDate(item.updatedAt || item.createdAt),
        }))
    ), [items]);

    const summaryItems = useMemo(() => {
        const itemsWithEan = items.filter(item => !!item.ean13).length;
        const itemsWithoutSection = items.filter(item => !item.section).length;

        return [
            { label: "Itens na base", value: `${items.length}` },
            { label: "Na visao atual", value: `${filteredItems.length}` },
            { label: "Com EAN", value: `${itemsWithEan}` },
            { label: "Sem secao", value: `${itemsWithoutSection}` },
        ];
    }, [filteredItems.length, items]);

    const statusCard = useMemo(() => (
        buildCatalogStatus({ items, filteredItems, isEditorDirty })
    ), [filteredItems, isEditorDirty, items]);

    const header = useMemo(() => ({
        title: "Itens",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Catalogo" },
            { label: "Itens" },
        ],
        actions: [
            {
                label: "Criar item",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/items/create"),
            },
            {
                label: "Importar",
                icon: "products",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/items/import"),
            },
            {
                label: "Painel",
                icon: "home",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard"),
            },
        ],
    }), [navigate]);

    const handleSelectItem = useCallback((item) => {
        if (!item || item.id === selectedItemId) {
            return;
        }

        const changeSelection = () => commitSelection(item);

        if (isEditorDirty) {
            setModal({
                type: "confirm",
                title: "Trocar item em edicao?",
                text: "Existem alteracoes locais ainda nao salvas. Se continuar, elas serao descartadas.",
                action: changeSelection,
            });
            return;
        }

        changeSelection();
    }, [commitSelection, isEditorDirty, selectedItemId, setModal]);

    const clearFilters = useCallback(() => {
        setFilters(DEFAULT_ITEMS_FILTERS);
        setSearch("");
    }, []);

    const applyFiltersPatch = useCallback((patch) => {
        setFilters(prev => sanitizeItemsFilters({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const applyEditorPatch = useCallback((patch) => {
        setEditor(prev => sanitizeItemDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const handleSaveChanges = useCallback(() => {
        if (!selectedItem) {
            toast.error("Selecione um item para atualizar.");
            return false;
        }

        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os campos antes de salvar as alteracoes.");
            return false;
        }

        setLoading(true);

        try {
            const updatedItem = updateCatalogItem(selectedItem.id, editor, user);
            const nextState = refreshCatalog();
            const nextSelected = nextState.items.find(item => item.id === updatedItem.id) || updatedItem;
            commitSelection(nextSelected);
            toast.success("Item atualizado com sucesso.");
            return updatedItem;
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel atualizar o item.");
            return false;
        } finally {
            setLoading(false);
        }
    }, [commitSelection, editor, refreshCatalog, selectedItem, user, validation.errorList, validation.isValid]);

    const handleDuplicateItem = useCallback((item = selectedItem) => {
        if (!item) {
            toast.error("Selecione um item para duplicar.");
            return false;
        }

        setLoading(true);

        try {
            const duplicatedItem = duplicateCatalogItem(item.id, user);
            const nextState = refreshCatalog();
            const nextSelected = nextState.items.find(current => current.id === duplicatedItem.id) || duplicatedItem;
            commitSelection(nextSelected);
            toast.success("Item duplicado com sucesso. Revise os identificadores antes de usar.");
            return duplicatedItem;
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel duplicar o item.");
            return false;
        } finally {
            setLoading(false);
        }
    }, [commitSelection, refreshCatalog, selectedItem, user]);

    const performDeleteItem = useCallback((item) => {
        if (!item) {
            return;
        }

        setLoading(true);

        try {
            const nextItems = deleteCatalogItem(item.id);
            const nextSelected = nextItems[0] || null;
            setItems(nextItems);
            setSections(readCatalogSections());
            commitSelection(nextSelected);
            toast.success("Item removido do catalogo.");
        } finally {
            setLoading(false);
        }
    }, [commitSelection]);

    const handleDeleteItem = useCallback((item = selectedItem) => {
        if (!item) {
            toast.error("Selecione um item para excluir.");
            return;
        }

        setModal({
            type: "confirm",
            title: "Deseja excluir este item?",
            text: "A exclusao remove este registro do catalogo local e pode afetar fluxos operacionais baseados nele.",
            action: () => performDeleteItem(item),
        });
    }, [performDeleteItem, selectedItem, setModal]);

    const handleCreatePriceFromItem = useCallback((item = selectedItem) => {
        if (!item) {
            toast.error("Selecione um item para enviar para a criacao de preco.");
            return;
        }

        saveCatalogPriceSeed(item);
        toast.success("Item enviado para a criacao de preco.");
        navigate("dashboard/prices/create");
    }, [navigate, selectedItem]);

    const visibleRows = useMemo(() => (
        filteredItems.map(item => ({
            ...item,
            createdLabel: formatCatalogDate(item.createdAt),
            updatedLabel: formatRelativeCatalogDate(item.updatedAt || item.createdAt),
        }))
    ), [filteredItems]);

    const actions = useMemo(() => ([
        !selectedItem ? null : {
            label: "Excluir item",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: () => handleDeleteItem(selectedItem),
        },
        !selectedItem ? null : {
            label: "Duplicar",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => handleDuplicateItem(selectedItem),
        },
        !selectedItem ? null : {
            label: "Criar preco",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => handleCreatePriceFromItem(selectedItem),
        },
        !selectedItem ? null : {
            label: "Salvar alteracoes",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleSaveChanges,
        },
    ].filter(Boolean)), [handleCreatePriceFromItem, handleDeleteItem, handleDuplicateItem, handleSaveChanges, selectedItem]);

    return {
        loading,
        header,
        actions,
        items: visibleRows,
        search,
        filters,
        activeFiltersCount,
        selectedItemId,
        selectedItem,
        editor,
        preview,
        validation,
        sectionSuggestions,
        statusCard,
        summaryItems,
        recentItems,
        guidelines: [...ITEM_GUIDELINES, ...LIST_GUIDELINES],
        unitOptions: ITEM_UNIT_OPTIONS,
        sections,
        isEditorDirty,
        applyFiltersPatch,
        clearFilters,
        setSearch,
        applyEditorPatch,
        handleSelectItem,
        handleDuplicateItem,
        handleDeleteItem,
        handleCreatePriceFromItem,
    };
}
