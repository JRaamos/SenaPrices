import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    createCatalogItem,
    readCatalogItems,
    readCatalogSections,
    saveCatalogPriceSeed,
} from "services/catalog";

import { ITEM_DEFAULT_FORM_VALUES } from "./constants";
import { sanitizeItemDraft, validateItemDraft } from "./helpers";
import {
    clearCreateItemDraft,
    readCreateItemDraft,
    saveCreateItemDraft,
} from "./storage";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const { user, setModal } = useContext(CoreContext);

    const [form, setForm] = useState(ITEM_DEFAULT_FORM_VALUES);
    const [catalogItems, setCatalogItems] = useState([]);
    const [sections, setSections] = useState([]);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);

    const refreshCatalogState = useCallback(() => {
        setCatalogItems(readCatalogItems());
        setSections(readCatalogSections());
    }, []);

    useEffect(() => {
        setForm(readCreateItemDraft());
        refreshCatalogState();
        setReady(true);
    }, [refreshCatalogState]);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            saveCreateItemDraft(form);
        }, 300);

        return () => window.clearTimeout(timer);
    }, [form, ready]);

    const applyPatch = useCallback((patch) => {
        setForm(prev => sanitizeItemDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const validation = useMemo(() => validateItemDraft(form, catalogItems), [catalogItems, form]);

    const handleClearDraft = useCallback(() => {
        clearCreateItemDraft();
        setForm(ITEM_DEFAULT_FORM_VALUES);
        toast.success("Rascunho do item limpo com sucesso.");
    }, []);

    const confirmClearDraft = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja limpar este cadastro?",
            text: "Os dados atuais serão removidos do rascunho local. O catálogo salvo continua preservado.",
            action: handleClearDraft,
        });
    }, [handleClearDraft, setModal]);

    const handleSave = useCallback((openCreatePrice = false) => {
        if (loading) {
            return false;
        }

        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os campos obrigatórios antes de salvar o item.");
            return false;
        }

        setLoading(true);

        try {
            const createdItem = createCatalogItem(form, user);
            refreshCatalogState();
            clearCreateItemDraft();
            setForm(ITEM_DEFAULT_FORM_VALUES);

            if (openCreatePrice) {
                saveCatalogPriceSeed(createdItem);
                toast.success("Item cadastrado e enviado para a criação de preço.");
                navigate("dashboard/prices/create");
            } else {
                toast.success("Item cadastrado com sucesso.");
            }

            return createdItem;
        } catch (error) {
            toast.error(error?.message || "Não foi possível salvar o item.");
            return false;
        } finally {
            setLoading(false);
        }
    }, [form, loading, navigate, refreshCatalogState, user, validation.errorList, validation.isValid]);

    const sectionSuggestions = useMemo(() => (
        sections
            .filter(item => {
                const currentSearch = `${form.section || ""}`.toLowerCase();
                return !currentSearch || item.name.toLowerCase().includes(currentSearch);
            })
            .slice(0, 8)
    ), [form.section, sections]);

    const header = useMemo(() => ({
        title: "Criar Item",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Catálogo" },
            { label: "Criar Item" },
        ],
        actions: [],
    }), []);

    const actions = useMemo(() => ([
        {
            label: "Limpar",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: confirmClearDraft,
        },
        {
            label: "Ver itens",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => navigate("dashboard/items"),
        },
        {
            label: "Salvar item",
            color: "primary",
            outline: true,
            rounded: true,
            loadable: true,
            action: () => handleSave(false),
        },
        {
            label: "Salvar e criar preço",
            color: "primary",
            rounded: true,
            loadable: true,
            action: () => handleSave(true),
        },
    ]), [confirmClearDraft, handleSave, navigate]);

    return {
        loading,
        header,
        actions,
        form,
        validation,
        sectionSuggestions,
        applyPatch,
    };
}
