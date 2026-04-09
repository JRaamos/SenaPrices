import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import {
    getPdvPolicy,
    resolvePdvSuggestionForQuery,
} from "services/pdv";
import { readOfferTypes } from "services/governance";
import { recordPricingOperation } from "services/pricing";
import { getQuickPriceDefaults } from "services/settings";

import {
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_TYPE_OPTIONS,
    QUICK_PRICE_DEFAULT_DRAFT,
    QUICK_PRICE_GUIDELINES,
    QUICK_PRICE_LIMITS,
} from "./constants";
import {
    buildBatchPrintMarkup,
    buildBatchSnapshot,
    buildRowPreview,
    createQuickRow,
    formatLastSaved,
    formatRecentDate,
    sanitizeQuickDraft,
    validateQuickDraft,
} from "./helpers";
import {
    appendRecentQuickBatch,
    clearQuickPriceDraft,
    readQuickPriceDraft,
    readRecentQuickBatches,
    saveQuickPriceDraft,
} from "./storage";

export default function useController() {
    const { user, setModal } = useContext(CoreContext);

    const [draft, setDraft] = useState({
        ...QUICK_PRICE_DEFAULT_DRAFT,
        rows: [createQuickRow()],
    });
    const [activeRowId, setActiveRowId] = useState(null);
    const [recentBatches, setRecentBatches] = useState([]);
    const [lastSavedAt, setLastSavedAt] = useState(null);
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const appliedPdvSuggestionsRef = useRef({});

    useEffect(() => {
        const storedDraft = readQuickPriceDraft();
        setDraft(storedDraft);
        setActiveRowId(storedDraft?.rows?.[0]?.id || null);
        setRecentBatches(readRecentQuickBatches());
        setReady(true);
    }, []);

    useEffect(() => {
        if (!ready) return;

        const timer = window.setTimeout(() => {
            saveQuickPriceDraft(draft);
            setLastSavedAt(new Date().toISOString());
        }, 300);

        return () => window.clearTimeout(timer);
    }, [draft, ready]);

    const applyPatch = useCallback((patch) => {
        setDraft(prev => sanitizeQuickDraft({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const updateRow = useCallback((rowId, patch) => {
        setDraft(prev => sanitizeQuickDraft({
            ...prev,
            rows: prev.rows.map(row => (
                row.id === rowId
                    ? {
                        ...row,
                        ...(typeof patch === "function" ? patch(row) : patch),
                    }
                    : row
            )),
        }));
    }, []);

    const addRow = useCallback(() => {
        if (draft.rows.length >= QUICK_PRICE_LIMITS.rowsMax) {
            toast.info(`O lote rápido aceita até ${QUICK_PRICE_LIMITS.rowsMax} linhas por vez.`);
            return;
        }

        const newRow = createQuickRow();

        setDraft(prev => sanitizeQuickDraft({
            ...prev,
            rows: [...prev.rows, newRow],
        }));
        setActiveRowId(newRow.id);
    }, [draft.rows.length]);

    const removeRow = useCallback((rowId) => {
        delete appliedPdvSuggestionsRef.current[rowId];

        setDraft(prev => {
            const nextRows = prev.rows.filter(row => row.id !== rowId);
            const safeRows = nextRows.length ? nextRows : [createQuickRow()];
            return sanitizeQuickDraft({
                ...prev,
                rows: safeRows,
            });
        });

        setActiveRowId(prev => {
            if (prev !== rowId) return prev;

            const nextRows = draft.rows.filter(row => row.id !== rowId);
            return nextRows[0]?.id || null;
        });
    }, [draft.rows]);

    const validation = useMemo(() => validateQuickDraft(draft), [draft]);
    const pdvPolicy = useMemo(() => getPdvPolicy(user), [user]);
    const rowSuggestions = useMemo(() => (
        draft.rows.reduce((accumulator, row) => {
            const suggestion = resolvePdvSuggestionForQuery(row.query, user, draft.priceType);

            if (suggestion) {
                accumulator[row.id] = suggestion;
            }

            return accumulator;
        }, {})
    ), [draft.priceType, draft.rows, user]);
    const rowLockedFields = useMemo(() => (
        draft.rows.reduce((accumulator, row) => {
            const suggestion = rowSuggestions[row.id];

            accumulator[row.id] = suggestion?.lockSuggestedField
                ? Object.keys(suggestion.draftPatch || {})
                : [];

            return accumulator;
        }, {})
    ), [draft.rows, rowSuggestions]);

    useEffect(() => {
        if (!ready) return;

        const rowPatchMap = {};

        draft.rows.forEach(row => {
            const suggestion = rowSuggestions[row.id];
            const suggestedField = Object.keys(suggestion?.draftPatch || {})[0];

            if (!suggestion || !suggestedField || row[suggestedField]) {
                return;
            }

            const signature = [
                draft.priceType,
                row.id,
                row.query,
                suggestion.numericValue,
                suggestedField,
            ].join("|");

            if (appliedPdvSuggestionsRef.current[row.id] === signature) {
                return;
            }

            rowPatchMap[row.id] = {
                patch: suggestion.draftPatch,
                signature,
            };
        });

        const patchIds = Object.keys(rowPatchMap);

        if (!patchIds.length) {
            return;
        }

        setDraft(previous => sanitizeQuickDraft({
            ...previous,
            rows: previous.rows.map(row => (
                rowPatchMap[row.id]
                    ? { ...row, ...rowPatchMap[row.id].patch }
                    : row
            )),
        }));

        patchIds.forEach(rowId => {
            appliedPdvSuggestionsRef.current[rowId] = rowPatchMap[rowId].signature;
        });
    }, [draft.priceType, draft.rows, ready, rowSuggestions]);

    const activeRow = useMemo(() => {
        return draft.rows.find(row => row.id === activeRowId) || draft.rows[0] || null;
    }, [activeRowId, draft.rows]);

    const activePreview = useMemo(() => {
        if (!activeRow) return null;
        return buildRowPreview(draft, activeRow);
    }, [activeRow, draft]);

    const handleSaveBatch = useCallback((options = {}) => {
        const {
            showToast = true,
            persistHistory = true,
        } = options;

        if (!validation.isValid) {
            toast.error("Revise todas as linhas antes de salvar o lote rápido.");
            return false;
        }

        const snapshot = buildBatchSnapshot(draft, validation.validRows, user);
        const nextRecent = appendRecentQuickBatch(snapshot);
        setRecentBatches(nextRecent);

        if (persistHistory) {
            const orientationLabel = ORIENTATION_OPTIONS.find(item => item.value === snapshot.draft.orientation)?.label || snapshot.draft.orientation;

            recordPricingOperation({
                source: "quick",
                restoreTarget: "quick",
                restoreDraft: snapshot.draft,
                createdBy: user?.email || user?.documentId || user?.id || "usuario@local",
                savedAt: snapshot.createdAt,
                priceType: snapshot.priceType,
                paperSize: snapshot.draft.paperSize,
                orientation: snapshot.draft.orientation,
                title: snapshot.offerTitle || `Lote rápido com ${snapshot.totalRows} cartaz(es)`,
                offerTitle: snapshot.offerTitle || "Criação Rápida",
                summaryLabel: `${snapshot.totalRows} cartaz(es) - ${snapshot.draft.paperSize} ${orientationLabel}`,
                records: validation.validRows.map(row => {
                    const preview = buildRowPreview(draft, row);

                    return {
                        title: preview.title,
                        subtitle: preview.subtitle,
                        offerTitle: preview.offerTitle,
                        primaryPrice: preview.primaryPrice,
                        supportingPrice: preview.supportingPrice,
                        specialLabel: preview.specialLabel,
                        barcodeLabel: preview.barcodeLabel,
                        validityLabel: preview.validityLabel,
                        observation: preview.observation,
                        priceType: snapshot.priceType,
                        paperSize: snapshot.draft.paperSize,
                        orientation: snapshot.draft.orientation,
                    };
                }),
            });
        }

        if (showToast) {
            toast.success(`${validation.validRows.length} linha(s) salvas no histórico rápido.`);
        }

        return snapshot;
    }, [draft, user, validation.isValid, validation.validRows]);

    const handlePrintBatch = useCallback(() => {
        if (!validation.isValid) {
            toast.error("A impressão em lote exige todas as linhas válidas.");
            return;
        }

        const snapshot = handleSaveBatch({
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
            printWindow.document.write(buildBatchPrintMarkup(draft, validation.validRows));
            printWindow.document.close();
            printWindow.focus();

            const orientationLabel = ORIENTATION_OPTIONS.find(item => item.value === snapshot.draft.orientation)?.label || snapshot.draft.orientation;

            recordPricingOperation({
                source: "quick",
                restoreTarget: "quick",
                restoreDraft: snapshot.draft,
                createdBy: user?.email || user?.documentId || user?.id || "usuario@local",
                savedAt: snapshot.createdAt,
                printedAt: new Date().toISOString(),
                priceType: snapshot.priceType,
                paperSize: snapshot.draft.paperSize,
                orientation: snapshot.draft.orientation,
                title: snapshot.offerTitle || `Lote rápido com ${snapshot.totalRows} cartaz(es)`,
                offerTitle: snapshot.offerTitle || "Criação Rápida",
                summaryLabel: `${snapshot.totalRows} cartaz(es) - ${snapshot.draft.paperSize} ${orientationLabel}`,
                records: validation.validRows.map(row => {
                    const preview = buildRowPreview(draft, row);

                    return {
                        title: preview.title,
                        subtitle: preview.subtitle,
                        offerTitle: preview.offerTitle,
                        primaryPrice: preview.primaryPrice,
                        supportingPrice: preview.supportingPrice,
                        specialLabel: preview.specialLabel,
                        barcodeLabel: preview.barcodeLabel,
                        validityLabel: preview.validityLabel,
                        observation: preview.observation,
                        priceType: snapshot.priceType,
                        paperSize: snapshot.draft.paperSize,
                        orientation: snapshot.draft.orientation,
                    };
                }),
            });

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
            }, 250);
        } catch (error) {
            console.log("QuickPricePrintError", error);
            toast.error("A impressão do lote falhou. Tente novamente.");
            setLoading(false);
        }
    }, [draft, handleSaveBatch, user, validation.isValid, validation.validRows]);

    const handleRestoreBatch = useCallback((snapshot) => {
        if (!snapshot?.draft) return;

        const nextDraft = sanitizeQuickDraft(snapshot.draft);
        setDraft(nextDraft);
        setActiveRowId(nextDraft?.rows?.[0]?.id || null);
        toast.success("Lote rápido restaurado com sucesso.");
    }, []);

    const handleClearDraft = useCallback(() => {
        const nextDraft = sanitizeQuickDraft({
            ...QUICK_PRICE_DEFAULT_DRAFT,
            ...getQuickPriceDefaults(),
            rows: [createQuickRow()],
        });

        clearQuickPriceDraft();
        setDraft(nextDraft);
        setActiveRowId(nextDraft.rows[0].id);
        setLastSavedAt(null);
        toast.success("Rascunho rápido limpo com sucesso.");
    }, []);

    const confirmClearDraft = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja limpar este lote rápido?",
            text: "As linhas atuais serão removidas do rascunho local. O histórico salvo continua disponível para restauração.",
            action: handleClearDraft,
        });
    }, [handleClearDraft, setModal]);

    useEffect(() => {
        if (!ready) return;

        const handleShortcut = (event) => {
            const isModifierPressed = event.ctrlKey || event.metaKey;
            if (!isModifierPressed) return;

            const key = `${event.key || ""}`.toLowerCase();

            if (key === "s") {
                event.preventDefault();
                handleSaveBatch();
            }

            if (key === "p") {
                event.preventDefault();
                handlePrintBatch();
            }

            if (key === "enter") {
                event.preventDefault();
                addRow();
            }
        };

        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, [addRow, handlePrintBatch, handleSaveBatch, ready]);

    const header = useMemo(() => ({
        title: "Criação Rápida",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operação" },
            { label: "Criação Rápida" },
        ],
        actions: [],
    }), []);

    const actions = useMemo(() => ([
        {
            label: "Limpar lote",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: confirmClearDraft,
        },
        {
            label: "Adicionar linha",
            color: "primary",
            outline: true,
            rounded: true,
            action: addRow,
        },
        {
            label: "Salvar lote",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => handleSaveBatch(),
        },
        {
            label: "Imprimir lote",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handlePrintBatch,
        },
    ]), [addRow, confirmClearDraft, handlePrintBatch, handleSaveBatch]);

    const statusCard = useMemo(() => {
        if (validation.isValid) {
            return {
                tone: "green",
                title: "Lote consistente",
                description: "Todas as linhas estão válidas e prontas para salvar ou imprimir em lote.",
            };
        }

        return {
            tone: "orange",
            title: "Lote em revisao",
            description: `${validation.invalidRows} linha(s) exigem correcao antes da liberacao do lote.`,
        };
    }, [validation.invalidRows, validation.isValid]);

    const summaryItems = useMemo(() => ([
        { label: "Operador", value: user?.email || "usuario@local" },
        { label: "Tipo", value: PRICE_TYPE_OPTIONS.find(item => item.value === draft.priceType)?.label || "--" },
        { label: "Linhas", value: `${validation.validRows.length}/${draft.rows.length} válidas` },
        { label: "Rascunho", value: formatLastSaved(lastSavedAt) },
    ]), [draft.priceType, draft.rows.length, lastSavedAt, user, validation.validRows.length]);

    const recentItems = useMemo(() => (
        recentBatches.map(item => ({
            ...item,
            helper: `${item.totalRows} linha(s) - ${item.offerTitle || "Lote rápido"}`,
            relativeDate: formatRecentDate(item.createdAt),
        }))
    ), [recentBatches]);

    const shortcuts = useMemo(() => ([
        {
            label: "Ctrl + S",
            description: "Salva o lote rápido quando todas as linhas estiverem consistentes.",
        },
        {
            label: "Ctrl + P",
            description: "Imprime o lote atual apos validacao completa.",
        },
        {
            label: "Ctrl + Enter",
            description: "Adiciona uma nova linha de trabalho ao lote rápido.",
        },
    ]), []);

    const errorSummary = useMemo(() => (
        Object.entries(validation.rowErrors).map(([rowId, errors]) => {
            const index = draft.rows.findIndex(row => row.id === rowId);
            return {
                key: rowId,
                message: `Linha ${index + 1}: ${errors[0]}`,
            };
        }).concat(validation.draftErrors.map((item, index) => ({
            key: `draft-${index}`,
            message: item,
        })))
    ), [draft.rows, validation.draftErrors, validation.rowErrors]);
    const offerTypeOptions = useMemo(() => (
        readOfferTypes()
            .filter(item => item.active)
            .map(item => ({
                value: item.name,
                label: item.name,
            }))
    ), []);

    return {
        loading,
        header,
        actions,
        draft,
        activeRowId,
        activePreview,
        validation,
        statusCard,
        summaryItems,
        recentItems,
        shortcuts,
        errorSummary,
        guidelines: QUICK_PRICE_GUIDELINES,
        offerTypeOptions,
        priceTypeOptions: PRICE_TYPE_OPTIONS,
        paperSizeOptions: PAPER_SIZE_OPTIONS,
        orientationOptions: ORIENTATION_OPTIONS,
        pdvPolicy,
        rowSuggestions,
        rowLockedFields,
        applyPatch,
        updateRow,
        addRow,
        removeRow,
        setActiveRowId,
        handleRestoreBatch,
    };
}
