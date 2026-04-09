import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import {
    buildPriceDraftFromCatalogItem,
    clearCatalogPriceSeed,
    readCatalogItems,
    readCatalogPriceSeed,
} from "services/catalog";
import {
    getPdvPolicy,
    resolvePdvSuggestionForCatalogItem,
} from "services/pdv";
import { readOfferTypes } from "services/governance";
import { recordPricingOperation } from "services/pricing";
import { getCreatePriceDefaults } from "services/settings";

import {
    DEFAULT_FORM_VALUES,
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_TYPE_OPTIONS,
    QUALITY_GUIDELINES,
    SPECIAL_LAYOUT_OPTIONS,
    UNIT_OPTIONS,
} from "./constants";
import {
    buildPreview,
    buildSnapshot,
    buildPrintMarkup,
    formatLastSaved,
    formatRecentDate,
    sanitizeDraft,
    validateDraft,
} from "./helpers";
import {
    appendRecentComposition,
    readPriceStudioDraft,
    readRecentCompositions,
    savePriceStudioDraft,
} from "./storage";

const OFFER_TYPE_CUSTOM_VALUE = "__custom__";

export default function useController() {
    const { user } = useContext(CoreContext);

    const [form, setForm] = useState(DEFAULT_FORM_VALUES);
    const [itemQuery, setItemQuery] = useState("");
    const [selectedItemId, setSelectedItemId] = useState("");
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [recentCompositions, setRecentCompositions] = useState([]);
    const [lastSavedAt, setLastSavedAt] = useState(null);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const appliedPdvSignatureRef = useRef("");
    const fieldRefs = useRef({});

    const catalogItems = useMemo(() => readCatalogItems(), []);
    const offerTypeOptions = useMemo(() => (
        readOfferTypes()
            .filter(item => item.active)
            .map(item => ({
                value: item.name,
                label: item.name,
            }))
    ), []);

    useEffect(() => {
        const priceSeed = readCatalogPriceSeed();
        const settingsDefaults = getCreatePriceDefaults();
        let initialForm = readPriceStudioDraft();

        if (priceSeed) {
            initialForm = sanitizeDraft({
                ...DEFAULT_FORM_VALUES,
                ...settingsDefaults,
                ...buildPriceDraftFromCatalogItem(priceSeed),
            });
            clearCatalogPriceSeed();
        }

        const matchedItem = matchCatalogItem(initialForm, catalogItems);

        setForm(initialForm);
        setSelectedItemId(matchedItem?.id || "");
        setItemQuery(buildItemSearchLabel(matchedItem, initialForm));
        setRecentCompositions(readRecentCompositions());
        setReady(true);
    }, [catalogItems]);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            savePriceStudioDraft(form);
            setLastSavedAt(new Date().toISOString());
        }, 300);

        return () => window.clearTimeout(timer);
    }, [form, ready]);

    const applyPatch = useCallback((patch) => {
        setForm(previous => sanitizeDraft({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const selectedCatalogItem = useMemo(() => {
        if (selectedItemId) {
            const directMatch = catalogItems.find(item => item.id === selectedItemId);

            if (directMatch) {
                return directMatch;
            }
        }

        return matchCatalogItem(form, catalogItems);
    }, [catalogItems, form, selectedItemId]);

    const validation = useMemo(() => validateDraft(form), [form]);
    const preview = useMemo(() => buildPreview(form), [form]);
    const pdvPolicy = useMemo(() => getPdvPolicy(user), [user]);
    const pdvSuggestion = useMemo(() => resolvePdvSuggestionForCatalogItem({
        internalCode: form.internalCode,
        ean13: form.eanCode,
        description1: form.productName,
    }, user, form.priceType), [
        form.eanCode,
        form.internalCode,
        form.priceType,
        form.productName,
        user,
    ]);
    const pdvLockedFields = useMemo(() => (
        pdvSuggestion?.lockSuggestedField ? Object.keys(pdvSuggestion.draftPatch || {}) : []
    ), [pdvSuggestion]);
    const pdvSuggestedField = useMemo(() => (
        Object.keys(pdvSuggestion?.draftPatch || {})[0] || ""
    ), [pdvSuggestion]);
    const pdvSuggestedFieldValue = pdvSuggestedField ? form[pdvSuggestedField] : "";

    useEffect(() => {
        if (!ready || !pdvSuggestion || !pdvSuggestedField || pdvSuggestedFieldValue) {
            return;
        }

        const signature = [
            form.priceType,
            form.productName,
            form.internalCode,
            form.eanCode,
            pdvSuggestion.numericValue,
            pdvSuggestedField,
        ].join("|");

        if (appliedPdvSignatureRef.current === signature) {
            return;
        }

        setForm(previous => sanitizeDraft({
            ...previous,
            ...pdvSuggestion.draftPatch,
        }));
        appliedPdvSignatureRef.current = signature;
    }, [
        form.eanCode,
        form.internalCode,
        form.priceType,
        form.productName,
        pdvSuggestedField,
        pdvSuggestedFieldValue,
        pdvSuggestion,
        ready,
    ]);

    const itemSuggestions = useMemo(() => buildCatalogSuggestions(catalogItems, itemQuery), [catalogItems, itemQuery]);
    const showSuggestions = !!itemQuery.trim() && itemSuggestions.length > 0;
    const offerTypeSelectValue = useMemo(() => {
        if (!form.offerTitle) return "";
        return offerTypeOptions.some(item => item.value === form.offerTitle)
            ? form.offerTitle
            : OFFER_TYPE_CUSTOM_VALUE;
    }, [form.offerTitle, offerTypeOptions]);
    const showCustomOfferInput = offerTypeSelectValue === OFFER_TYPE_CUSTOM_VALUE;
    const activeFieldOrder = useMemo(
        () => buildFieldOrder(form.priceType, showCustomOfferInput),
        [form.priceType, showCustomOfferInput]
    );

    const unitOptions = useMemo(() => {
        const canUseHundredGrams = selectedCatalogItem?.unit === "kg" || form.unitLabel === "kg" || form.unitLabel === "100g";

        return UNIT_OPTIONS.filter(item => (
            item.value !== "100g" || canUseHundredGrams
        ));
    }, [form.unitLabel, selectedCatalogItem]);

    const bindFieldRef = useCallback((fieldKey) => (node) => {
        if (node) {
            fieldRefs.current[fieldKey] = node;
            return;
        }

        delete fieldRefs.current[fieldKey];
    }, []);

    const focusField = useCallback((fieldKey) => {
        const target = fieldRefs.current[fieldKey];

        if (!target || typeof target.focus !== "function") {
            return;
        }

        target.focus();

        if (typeof target.select === "function" && target.tagName !== "SELECT" && target.type !== "date") {
            target.select();
        }
    }, []);

    const handleFieldAdvance = useCallback((fieldKey, event) => {
        const isAdvanceKey = event.key === "Enter" || (event.key === "Tab" && !event.shiftKey);

        if (!isAdvanceKey) {
            return;
        }

        event.preventDefault();

        const currentIndex = activeFieldOrder.indexOf(fieldKey);
        const nextField = currentIndex >= 0 ? activeFieldOrder[currentIndex + 1] : "";

        if (nextField) {
            window.requestAnimationFrame(() => focusField(nextField));
        }
    }, [activeFieldOrder, focusField]);

    const handleOfferTypeSelectChange = useCallback((value) => {
        if (!value) {
            applyPatch({ offerTitle: "" });
            return;
        }

        if (value === OFFER_TYPE_CUSTOM_VALUE) {
            applyPatch({ offerTitle: form.offerTitle || "" });
            window.requestAnimationFrame(() => focusField("offerTitleCustom"));
            return;
        }

        applyPatch({ offerTitle: value });
    }, [applyPatch, focusField, form.offerTitle]);

    const handleSelectCatalogItem = useCallback((item) => {
        const selected = buildPriceDraftFromCatalogItem(item);

        applyPatch(selected);
        setSelectedItemId(item.id);
        setItemQuery(buildItemSearchLabel(item));
        setActiveSuggestionIndex(0);
        window.requestAnimationFrame(() => focusField(getPrimaryPriceField(form.priceType)));
    }, [applyPatch, focusField, form.priceType]);

    const handleItemQueryChange = useCallback((value) => {
        setItemQuery(value);
        setActiveSuggestionIndex(0);
    }, []);

    const handleItemQueryKeyDown = useCallback((event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveSuggestionIndex(previous => Math.min(previous + 1, Math.max(itemSuggestions.length - 1, 0)));
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveSuggestionIndex(previous => Math.max(previous - 1, 0));
            return;
        }

        if (event.key === "Enter" || (event.key === "Tab" && !event.shiftKey)) {
            const suggestion = itemSuggestions[activeSuggestionIndex] || itemSuggestions[0] || selectedCatalogItem;

            if (suggestion) {
                event.preventDefault();
                handleSelectCatalogItem(suggestion);
            }
        }
    }, [activeSuggestionIndex, handleSelectCatalogItem, itemSuggestions, selectedCatalogItem]);

    const handleSaveSnapshot = useCallback((options = {}) => {
        const {
            showToast = true,
            persistHistory = true,
        } = options;

        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise os campos obrigatórios antes de salvar.");
            return false;
        }

        const snapshot = buildSnapshot(form, user);
        const nextRecent = appendRecentComposition(snapshot);
        setRecentCompositions(nextRecent);

        if (persistHistory) {
            recordPricingOperation({
                source: "manual",
                restoreTarget: "manual",
                restoreDraft: snapshot.draft,
                createdBy: user?.email || user?.documentId || user?.id || "usuario@local",
                savedAt: snapshot.createdAt,
                priceType: snapshot.priceType,
                paperSize: snapshot.draft.paperSize,
                orientation: snapshot.draft.orientation,
                title: snapshot.title,
                offerTitle: preview.offerTitle,
                summaryLabel: `${preview.primaryPrice} - ${preview.paperLabel}`,
                records: [
                    {
                        title: preview.title,
                        subtitle: preview.subtitle,
                        offerTitle: preview.offerTitle,
                        primaryPrice: preview.primaryPrice,
                        supportingPrice: preview.supportingPrice,
                        specialLabel: preview.specialLabel,
                        barcodeLabel: preview.barcodeLabel,
                        validityLabel: preview.validityLabel,
                        observation: preview.observation,
                        internalCode: snapshot.draft.internalCode,
                        eanCode: snapshot.draft.eanCode,
                        sectionName: snapshot.draft.sectionName,
                        unitLabel: snapshot.draft.unitLabel,
                        priceType: snapshot.priceType,
                        paperSize: snapshot.draft.paperSize,
                        orientation: snapshot.draft.orientation,
                    },
                ],
            });
        }

        if (showToast) {
            toast.success("Composição salva localmente com sucesso.");
        }

        return snapshot;
    }, [form, preview, user, validation.errorList, validation.isValid]);

    const handlePrint = useCallback(() => {
        if (!validation.isValid) {
            toast.error(validation.errorList[0] || "Revise a composição antes de imprimir.");
            return;
        }

        const snapshot = handleSaveSnapshot({
            showToast: false,
            persistHistory: false,
        });

        if (!snapshot) {
            return;
        }

        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=760");

            if (!printWindow) {
                toast.error("Não foi possível abrir a impressão. Verifique se o navegador bloqueou pop-ups.");
                setLoading(false);
                return;
            }

            printWindow.document.open();
            printWindow.document.write(buildPrintMarkup(preview));
            printWindow.document.close();
            printWindow.focus();

            recordPricingOperation({
                source: "manual",
                restoreTarget: "manual",
                restoreDraft: snapshot.draft,
                createdBy: user?.email || user?.documentId || user?.id || "usuario@local",
                savedAt: snapshot.createdAt,
                printedAt: new Date().toISOString(),
                priceType: snapshot.priceType,
                paperSize: snapshot.draft.paperSize,
                orientation: snapshot.draft.orientation,
                title: snapshot.title,
                offerTitle: preview.offerTitle,
                summaryLabel: `${preview.primaryPrice} - ${preview.paperLabel}`,
                records: [
                    {
                        title: preview.title,
                        subtitle: preview.subtitle,
                        offerTitle: preview.offerTitle,
                        primaryPrice: preview.primaryPrice,
                        supportingPrice: preview.supportingPrice,
                        specialLabel: preview.specialLabel,
                        barcodeLabel: preview.barcodeLabel,
                        validityLabel: preview.validityLabel,
                        observation: preview.observation,
                        internalCode: snapshot.draft.internalCode,
                        eanCode: snapshot.draft.eanCode,
                        sectionName: snapshot.draft.sectionName,
                        unitLabel: snapshot.draft.unitLabel,
                        priceType: snapshot.priceType,
                        paperSize: snapshot.draft.paperSize,
                        orientation: snapshot.draft.orientation,
                    },
                ],
            });

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
            }, 250);
        } catch (error) {
            console.log("CreatePricePrintError", error);
            toast.error("A impressão falhou. Tente novamente em alguns instantes.");
            setLoading(false);
        }
    }, [handleSaveSnapshot, preview, user, validation.errorList, validation.isValid]);

    const handleRestoreComposition = useCallback((snapshot) => {
        if (!snapshot?.draft) return;

        const nextForm = sanitizeDraft(snapshot.draft);
        const matchedItem = matchCatalogItem(nextForm, catalogItems);

        setForm(nextForm);
        setSelectedItemId(matchedItem?.id || "");
        setItemQuery(buildItemSearchLabel(matchedItem, nextForm));
        toast.success("Composição restaurada a partir do histórico local.");
    }, [catalogItems]);

    useEffect(() => {
        if (!ready) return;

        const handleShortcut = (event) => {
            const isModifierPressed = event.ctrlKey || event.metaKey;

            if (!isModifierPressed) return;

            const key = `${event.key || ""}`.toLowerCase();

            if (key === "s") {
                event.preventDefault();
                handleSaveSnapshot();
            }

            if (key === "p") {
                event.preventDefault();
                handlePrint();
            }
        };

        window.addEventListener("keydown", handleShortcut);

        return () => window.removeEventListener("keydown", handleShortcut);
    }, [handlePrint, handleSaveSnapshot, ready]);

    const header = useMemo(() => ({
        title: "Criar Preço",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operação" },
            { label: "Criar Preço" },
        ],
        actions: [],
    }), []);

    const actions = useMemo(() => ([
        {
            label: "Salvar",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => handleSaveSnapshot(),
        },
        {
            label: "Imprimir",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handlePrint,
        },
    ]), [handlePrint, handleSaveSnapshot]);

    const statusCard = useMemo(() => {
        if (validation.isValid) {
            return {
                tone: "green",
                title: "Cartaz pronto para impressão",
                description: preview.sheetLayout.enabled
                    ? `${preview.sheetLayout.sheetLabel} configurado e pronto para gerar a folha final.`
                    : "Os campos obrigatórios foram validados e a composição está pronta para gerar o cartaz.",
            };
        }

        return {
            tone: "orange",
            title: "Ajustes necessários",
            description: `${validation.errorList.length} ponto(s) ainda precisam de revisão antes da impressão.`,
        };
    }, [preview.sheetLayout, validation.errorList.length, validation.isValid]);

    const summaryItems = useMemo(() => ([
        { label: "Operador", value: user?.email || "usuario@local" },
        { label: "Tipo", value: PRICE_TYPE_OPTIONS.find(item => item.value === form.priceType)?.label || "--" },
        { label: "Formato", value: preview.sheetLayout.enabled ? preview.sheetLayout.sheetLabel : preview.paperLabel || "--" },
        { label: "Rascunho", value: formatLastSaved(lastSavedAt) },
    ]), [form.priceType, lastSavedAt, preview.paperLabel, preview.sheetLayout, user]);

    const recentItems = useMemo(() => (
        recentCompositions.map(item => ({
            ...item,
            helper: `${item.primaryPrice} - ${item.paperLabel}`,
            relativeDate: formatRecentDate(item.createdAt),
        }))
    ), [recentCompositions]);

    const shortcuts = useMemo(() => ([
        {
            label: "Enter / Tab",
            description: "Avança para o próximo campo importante sem depender do mouse.",
        },
        {
            label: "Ctrl + S",
            description: "Salva a composição válida no histórico local criptografado.",
        },
        {
            label: "Ctrl + P",
            description: "Abre a impressão da composição atual com a montagem configurada.",
        },
    ]), []);

    return {
        loading,
        header,
        actions,
        form,
        preview,
        validation,
        statusCard,
        summaryItems,
        recentItems,
        shortcuts,
        guidelines: QUALITY_GUIDELINES,
        offerTypeOptions,
        offerTypeSelectValue,
        showCustomOfferInput,
        priceTypeOptions: PRICE_TYPE_OPTIONS,
        paperSizeOptions: PAPER_SIZE_OPTIONS,
        orientationOptions: ORIENTATION_OPTIONS,
        unitOptions,
        specialLayoutOptions: SPECIAL_LAYOUT_OPTIONS,
        pdvPolicy,
        pdvSuggestion,
        pdvLockedFields,
        itemQuery,
        itemSuggestions,
        showSuggestions,
        activeSuggestionIndex,
        selectedCatalogItem,
        bindFieldRef,
        handleFieldAdvance,
        handleOfferTypeSelectChange,
        handleItemQueryChange,
        handleItemQueryKeyDown,
        handleSelectCatalogItem,
        setActiveSuggestionIndex,
        applyPatch,
        handleRestoreComposition,
    };
}

function buildCatalogSuggestions(items, query) {
    const normalizedQuery = normalizeValue(query);

    if (!normalizedQuery) {
        return items.slice(0, 6);
    }

    return items
        .map(item => ({
            item,
            score: getSuggestionScore(item, normalizedQuery),
        }))
        .filter(item => item.score > 0)
        .sort((left, right) => (
            right.score - left.score
            || `${left.item.description1 || ""}`.localeCompare(`${right.item.description1 || ""}`, "pt-BR")
        ))
        .slice(0, 8)
        .map(item => item.item);
}

function getSuggestionScore(item, normalizedQuery) {
    const fields = [
        item.internalCode,
        item.ean13,
        item.description1,
        item.description2,
        item.description3,
    ].filter(Boolean);

    let bestScore = 0;

    fields.forEach(field => {
        const normalizedField = normalizeValue(field);

        if (!normalizedField) return;

        if (normalizedField === normalizedQuery) {
            bestScore = Math.max(bestScore, 120);
            return;
        }

        if (normalizedField.startsWith(normalizedQuery)) {
            bestScore = Math.max(bestScore, 90);
            return;
        }

        if (normalizedField.includes(normalizedQuery)) {
            bestScore = Math.max(bestScore, 60);
        }
    });

    return bestScore;
}

function buildItemSearchLabel(item, fallbackDraft = null) {
    if (item) {
        return item.description1 || item.internalCode || item.ean13 || "";
    }

    return fallbackDraft?.productName || fallbackDraft?.internalCode || fallbackDraft?.eanCode || "";
}

function buildFieldOrder(priceType, showCustomOfferInput) {
    const priceFields = {
        avista: ["cashPrice"],
        depor: ["fromPrice", "toPrice"],
        clube: ["clubRegularPrice", "clubPrice", "clubLabel"],
        ofertaespecial: ["specialQuantity", "specialPrice", "specialLayout"],
    };

    return [
        "itemSearch",
        ...(priceFields[priceType] || []),
        "unitLabel",
        "validFrom",
        "validUntil",
        "offerTypeSelect",
        ...(showCustomOfferInput ? ["offerTitleCustom"] : []),
        "observation",
    ];
}

function getPrimaryPriceField(priceType) {
    if (priceType === "depor") return "fromPrice";
    if (priceType === "clube") return "clubRegularPrice";
    if (priceType === "ofertaespecial") return "specialQuantity";
    return "cashPrice";
}

function matchCatalogItem(form, catalogItems) {
    const internalCode = normalizeValue(form?.internalCode);
    const eanCode = normalizeValue(form?.eanCode);
    const productName = normalizeValue(form?.productName);

    return catalogItems.find(item => (
        (internalCode && normalizeValue(item.internalCode) === internalCode)
        || (eanCode && normalizeValue(item.ean13) === eanCode)
        || (productName && normalizeValue(item.description1) === productName)
    )) || null;
}

function normalizeValue(value) {
    return `${value || ""}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();
}
