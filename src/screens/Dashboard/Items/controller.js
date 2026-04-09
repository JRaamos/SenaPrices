import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    deleteCatalogItem,
    duplicateCatalogItem,
    readCatalogItems,
    readCatalogSections,
    updateCatalogItem,
} from "services/catalog";

import { ITEM_DEFAULT_FORM_VALUES, ITEM_UNIT_OPTIONS } from "../CreateItem/constants";
import { sanitizeItemDraft, validateItemDraft } from "../CreateItem/helpers";

import { DEFAULT_ITEMS_FILTERS } from "./constants";
import {
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

    const activeFiltersCount = useMemo(() => countActiveFilters(filters), [filters]);

    const sectionSuggestions = useMemo(() => (
        sections
            .filter(item => {
                const currentSearch = `${editor.section || ""}`.toLowerCase();
                return !currentSearch || item.name.toLowerCase().includes(currentSearch);
            })
            .slice(0, 8)
    ), [editor.section, sections]);

    const header = useMemo(() => ({
        title: "Itens",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Catálogo" },
            { label: "Itens" },
        ],
        actions: [
            {
                label: "Novo item",
                icon: "products",
                rounded: true,
                color: "primary",
                action: () => navigate("dashboard/items/create"),
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
                title: "Trocar item em edição?",
                text: "Existem alterações locais ainda não salvas. Se continuar, elas serão descartadas.",
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
            toast.error(validation.errorList[0] || "Revise os campos antes de salvar as alterações.");
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
            toast.error(error?.message || "Não foi possível atualizar o item.");
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
            toast.error(error?.message || "Não foi possível duplicar o item.");
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
            toast.success("Item removido do catálogo.");
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
            text: "A exclusão remove este registro do catálogo local e pode afetar fluxos operacionais baseados nele.",
            action: () => performDeleteItem(item),
        });
    }, [performDeleteItem, selectedItem, setModal]);

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
            label: "Salvar alterações",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleSaveChanges,
        },
    ].filter(Boolean)), [handleDeleteItem, handleDuplicateItem, handleSaveChanges, selectedItem]);

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
        validation,
        sectionSuggestions,
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
    };
}
