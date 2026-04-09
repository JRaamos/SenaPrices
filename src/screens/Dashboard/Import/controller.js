import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import {
    createCatalogItem,
    readCatalogItems,
    updateCatalogItem,
} from "services/catalog";

import {
    IMPORT_CONFLICT_OPTIONS,
    IMPORT_TARGET_FIELDS,
} from "./constants";
import {
    buildImportPlan,
    buildInitialMapping,
    downloadImportTemplate,
    parseImportFile,
    sanitizeMapping,
} from "./helpers";

export default function useController() {
    const { user, setModal } = useContext(CoreContext);

    const [loading, setLoading] = useState(false);
    const [catalogItems, setCatalogItems] = useState([]);
    const [dataset, setDataset] = useState(null);
    const [mapping, setMapping] = useState({});
    const [conflictMode, setConflictMode] = useState("skip");
    const [lastImportResult, setLastImportResult] = useState(null);

    const refreshCatalog = useCallback(() => {
        const items = readCatalogItems();
        setCatalogItems(items);
        return items;
    }, []);

    useEffect(() => {
        refreshCatalog();
    }, [refreshCatalog]);

    const mappingSummary = useMemo(() => {
        const mappedFields = IMPORT_TARGET_FIELDS.filter(field => !!mapping?.[field.key]);
        const requiredFields = IMPORT_TARGET_FIELDS.filter(field => field.required);
        const requiredMissing = requiredFields.filter(field => !mapping?.[field.key]);

        return {
            mappedCount: mappedFields.length,
            totalCount: IMPORT_TARGET_FIELDS.length,
            requiredCount: requiredFields.length,
            requiredMappedCount: requiredFields.length - requiredMissing.length,
            requiredMissing,
        };
    }, [mapping]);

    const importPlan = useMemo(() => (
        buildImportPlan({
            dataset,
            mapping,
            conflictMode,
            existingItems: catalogItems,
        })
    ), [catalogItems, conflictMode, dataset, mapping]);

    const readyRowsCount = useMemo(() => (
        importPlan.summary.create + importPlan.summary.update
    ), [importPlan.summary.create, importPlan.summary.update]);

    const header = useMemo(() => ({
        title: "Importar",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Catálogo" },
            { label: "Importar" },
        ],
        actions: [],
    }), []);

    const resetImportSession = useCallback(() => {
        setDataset(null);
        setMapping({});
        setConflictMode("skip");
    }, []);

    const handleClearImport = useCallback(() => {
        resetImportSession();
        setLastImportResult(null);
        toast.info("Arquivo de importação removido da sessão atual.");
    }, [resetImportSession]);

    const confirmClearImport = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Descartar este arquivo importado?",
            text: "O arquivo atual, o mapeamento e o preview serão removidos desta sessão.",
            action: handleClearImport,
        });
    }, [handleClearImport, setModal]);

    const processAcceptedFile = useCallback(async (file) => {
        if (!file) return;

        setLoading(true);

        try {
            const nextDataset = await parseImportFile(file);
            setDataset(nextDataset);
            setMapping(buildInitialMapping(nextDataset.columns));
            setLastImportResult(null);
            toast.success(`${nextDataset.rows.length} linha(s) carregadas para revisão.`);
        } catch (error) {
            toast.error(error?.message || "Não foi possível ler o arquivo informado.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleFileAccepted = useCallback((file) => {
        if (!file) return;

        if (!dataset) {
            processAcceptedFile(file);
            return;
        }

        setModal({
            type: "confirm",
            title: "Substituir o arquivo atual?",
            text: "O preview atual será descartado e a nova carga assumirá a sessão de importação.",
            action: () => processAcceptedFile(file),
        });
    }, [dataset, processAcceptedFile, setModal]);

    const applyMappingPatch = useCallback((patch) => {
        setMapping(prev => sanitizeMapping({
            ...prev,
            ...(typeof patch === "function" ? patch(prev) : patch),
        }));
    }, []);

    const handleImport = useCallback(() => {
        if (mappingSummary.requiredMissing.length) {
            toast.error("Mapeie todos os campos obrigatórios antes de importar.");
            return;
        }

        if (!importPlan.canImport) {
            toast.error("Não há linhas válidas prontas para importação.");
            return;
        }

        setLoading(true);

        try {
            let created = 0;
            let updated = 0;
            const errors = [];

            importPlan.rows.forEach(row => {
                try {
                    if (row.action === "create") {
                        createCatalogItem(row.values, user);
                        created += 1;
                    }

                    if (row.action === "update" && row.matchedItem?.id) {
                        updateCatalogItem(row.matchedItem.id, row.values, user);
                        updated += 1;
                    }
                } catch (error) {
                    errors.push(`Linha ${row.lineNumber}: ${error?.message || "falha ao importar."}`);
                }
            });

            refreshCatalog();
            setLastImportResult({
                created,
                updated,
                skipped: importPlan.summary.skip,
                invalid: importPlan.summary.invalid + errors.length,
                errors,
            });

            resetImportSession();

            if (errors.length) {
                toast.warn(`${created + updated} linha(s) processadas com pendências registradas no resumo.`);
            } else {
                toast.success(`${created + updated} linha(s) processadas com sucesso na base.`);
            }
        } finally {
            setLoading(false);
        }
    }, [importPlan, mappingSummary.requiredMissing.length, refreshCatalog, resetImportSession, user]);

    const actions = useMemo(() => ([
        !dataset ? null : {
            label: "Limpar importação",
            color: "error",
            outline: true,
            rounded: true,
            left: true,
            action: confirmClearImport,
        },
        {
            label: "Modelo CSV",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => downloadImportTemplate("csv"),
        },
        {
            label: "Modelo XLSX",
            color: "primary",
            outline: true,
            rounded: true,
            action: () => downloadImportTemplate("xlsx"),
        },
        !dataset ? null : {
            label: "Importar linhas válidas",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleImport,
        },
    ].filter(Boolean)), [confirmClearImport, dataset, handleImport]);

    return {
        loading,
        header,
        actions,
        dataset,
        mapping,
        mappingSummary,
        conflictMode,
        conflictOptions: IMPORT_CONFLICT_OPTIONS,
        targetFields: IMPORT_TARGET_FIELDS,
        importPlan,
        lastImportResult,
        handleFileAccepted,
        applyMappingPatch,
        setConflictMode,
        readyRowsCount,
    };
}
