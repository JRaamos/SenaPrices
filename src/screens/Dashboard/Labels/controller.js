import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import { readCatalogItems, readCatalogSections } from "services/catalog";
import {
    appendRecentLabelJob,
    buildLabelPrintMarkup,
    buildLabelsZpl,
    LABEL_DPI_OPTIONS,
    LABEL_PRESET_OPTIONS,
    readLabelSettings,
    readRecentLabelJobs,
    sanitizeLabelSettings,
    saveLabelSettings,
} from "services/labels";
import { readPriceRecords } from "services/pricing";

import { DEFAULT_LABEL_FILTERS, LABEL_GUIDELINES } from "./constants";
import {
    buildLabelItemRow,
    buildLabelRecentJobRow,
    buildLabelStatus,
    buildSelectedLabelItems,
    createRestoredSelection,
    filterLabelRows,
    sanitizeLabelFilters,
} from "./helpers";

export default function useController() {
    const { user } = useContext(CoreContext);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [sections, setSections] = useState([]);
    const [priceRecords, setPriceRecords] = useState([]);
    const [filters, setFilters] = useState(DEFAULT_LABEL_FILTERS);
    const [settings, setSettings] = useState(() => readLabelSettings());
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [recentJobs, setRecentJobs] = useState([]);
    const [zplCode, setZplCode] = useState("");
    const [showZplModal, setShowZplModal] = useState(false);
    const [ready, setReady] = useState(false);

    const refreshState = useCallback(() => {
        const nextItems = readCatalogItems();
        const nextSections = readCatalogSections();
        const nextPriceRecords = readPriceRecords();

        setItems(nextItems);
        setSections(nextSections);
        setPriceRecords(nextPriceRecords);

        return {
            items: nextItems,
            sections: nextSections,
            priceRecords: nextPriceRecords,
        };
    }, []);

    useEffect(() => {
        refreshState();
        setRecentJobs(readRecentLabelJobs().map(buildLabelRecentJobRow));
        setReady(true);
    }, [refreshState]);

    useEffect(() => {
        if (!ready) return;
        saveLabelSettings(settings);
    }, [ready, settings]);

    useEffect(() => {
        if (!ready) return;

        const availableIds = new Set(items.map(item => item.id));
        setSelectedQuantities(previous => {
            const next = Object.entries(previous).reduce((result, [itemId, copies]) => {
                if (!availableIds.has(itemId)) {
                    return result;
                }

                result[itemId] = copies;
                return result;
            }, {});

            return JSON.stringify(next) === JSON.stringify(previous) ? previous : next;
        });
    }, [items, ready]);

    const rows = useMemo(() => (
        items.map(item => buildLabelItemRow(item, priceRecords))
    ), [items, priceRecords]);

    const visibleRows = useMemo(() => (
        filterLabelRows(rows, filters)
    ), [filters, rows]);

    const sectionOptions = useMemo(() => {
        const visibleSectionNames = new Set(items.map(item => item.section).filter(Boolean));

        return sections
            .filter(item => visibleSectionNames.has(item.name))
            .map(item => ({
                value: item.name,
                label: item.name,
            }))
            .sort((left, right) => left.label.localeCompare(right.label, "pt-BR"));
    }, [items, sections]);

    const selectedItems = useMemo(() => (
        buildSelectedLabelItems(rows, selectedQuantities)
    ), [rows, selectedQuantities]);

    const totalLabels = useMemo(() => (
        selectedItems.reduce((result, item) => result + item.copies, 0)
    ), [selectedItems]);

    const applyFiltersPatch = useCallback((patch) => {
        setFilters(previous => sanitizeLabelFilters({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const applySettingsPatch = useCallback((patch) => {
        setSettings(previous => {
            const next = typeof patch === "function" ? patch(previous) : patch;

            return sanitizeLabelSettings({
                ...previous,
                ...next,
            });
        });
    }, []);

    const handleToggleItem = useCallback((item) => {
        if (!item?.id) return;

        if (!item.canSelect) {
            toast.error("Este item ainda não possui uma precificação rastreável para gerar etiqueta.");
            return;
        }

        setSelectedQuantities(previous => {
            const next = { ...previous };

            if (next[item.id]) {
                delete next[item.id];
            } else {
                next[item.id] = settings.defaultCopies;
            }

            return next;
        });
    }, [settings.defaultCopies]);

    const handleChangeCopies = useCallback((itemId, value) => {
        const copies = Math.min(Math.max(parseInt(`${value || 0}`, 10) || 0, 0), 99);

        setSelectedQuantities(previous => {
            const next = { ...previous };

            if (copies <= 0) {
                delete next[itemId];
            } else {
                next[itemId] = copies;
            }

            return next;
        });
    }, []);

    const handleToggleVisible = useCallback(() => {
        const selectableIds = visibleRows.filter(item => item.canSelect).map(item => item.id);
        const allSelected = selectableIds.length > 0 && selectableIds.every(itemId => Number(selectedQuantities[itemId]) > 0);

        setSelectedQuantities(previous => {
            const next = { ...previous };

            if (allSelected) {
                selectableIds.forEach(itemId => {
                    delete next[itemId];
                });

                return next;
            }

            selectableIds.forEach(itemId => {
                if (!next[itemId]) {
                    next[itemId] = settings.defaultCopies;
                }
            });

            return next;
        });
    }, [selectedQuantities, settings.defaultCopies, visibleRows]);

    const handleClearSelection = useCallback(() => {
        setSelectedQuantities({});
        toast.info("Seleção de etiquetas limpa com sucesso.");
    }, []);

    const registerRecentJob = useCallback((title) => {
        const nextJobs = appendRecentLabelJob({
            title,
            totalItems: selectedItems.length,
            totalLabels,
            preset: settings.preset,
            selectedItemIds: selectedItems.map(item => item.id),
        }).map(buildLabelRecentJobRow);

        setRecentJobs(nextJobs);
    }, [selectedItems, settings.preset, totalLabels]);

    const handlePrint = useCallback(() => {
        if (!selectedItems.length) {
            toast.error("Selecione ao menos um item com preço válido para imprimir etiquetas.");
            return;
        }

        setLoading(true);

        try {
            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1180,height=820");

            if (!printWindow) {
                toast.error("Não foi possível abrir a impressão das etiquetas. Verifique o bloqueio de pop-ups.");
                setLoading(false);
                return;
            }

            const title = selectedItems.length === 1
                ? `Etiquetas - ${selectedItems[0].description1}`
                : `Etiquetas com ${selectedItems.length} item(ns)`;

            printWindow.document.open();
            printWindow.document.write(buildLabelPrintMarkup({
                title,
                subtitle: `${totalLabels} etiqueta(s) · ${settings.widthMm}x${settings.heightMm} mm · ${user?.email || "usuario@local"}`,
                items: selectedItems,
                settings,
            }));
            printWindow.document.close();
            printWindow.focus();

            registerRecentJob(title);

            window.setTimeout(() => {
                printWindow.print();
                printWindow.close();
                setLoading(false);
                toast.success("Lote de etiquetas enviado para impressão.");
            }, 250);
        } catch (error) {
            console.log("LabelsPrintError", error);
            toast.error("Não foi possível imprimir o lote de etiquetas.");
            setLoading(false);
        }
    }, [registerRecentJob, selectedItems, settings, totalLabels, user]);

    const handleGenerateZpl = useCallback(() => {
        if (!selectedItems.length) {
            toast.error("Selecione ao menos um item com preço válido para gerar ZPL.");
            return;
        }

        const title = selectedItems.length === 1
            ? `Etiquetas ZPL - ${selectedItems[0].description1}`
            : `Etiquetas ZPL com ${selectedItems.length} item(ns)`;

        const nextCode = buildLabelsZpl({
            items: selectedItems,
            settings,
        });

        setZplCode(nextCode);
        setShowZplModal(true);
        registerRecentJob(title);
        toast.success("Código ZPL gerado com sucesso.");
    }, [registerRecentJob, selectedItems, settings]);

    const handleCloseZpl = useCallback(() => {
        setShowZplModal(false);
    }, []);

    const handleRestoreRecentJob = useCallback((job) => {
        if (!job?.selectedItemIds?.length) {
            toast.error("Este lote recente não possui itens restauráveis.");
            return;
        }

        const restored = createRestoredSelection(
            job.selectedItemIds,
            settings.defaultCopies,
            rows.filter(item => item.canSelect).map(item => item.id),
        );

        if (!Object.keys(restored).length) {
            toast.error("Os itens deste lote não estão mais disponíveis com preço válido.");
            return;
        }

        setSelectedQuantities(restored);
        toast.success("Seleção de etiquetas restaurada com sucesso.");
    }, [rows, settings.defaultCopies]);

    const handleCopyZpl = useCallback(async () => {
        if (!zplCode) {
            return;
        }

        try {
            await navigator.clipboard.writeText(zplCode);
            toast.success("Código ZPL copiado para a área de transferência.");
        } catch (error) {
            console.log("CopyZplError", error);
            toast.error("Não foi possível copiar o código ZPL automaticamente neste ambiente.");
        }
    }, [zplCode]);

    const handleDownloadZpl = useCallback(() => {
        if (!zplCode) {
            return;
        }

        const blob = new Blob([zplCode], { type: "text/plain;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "senaprices-etiquetas.zpl";
        anchor.click();
        window.URL.revokeObjectURL(url);
        toast.success("Arquivo ZPL preparado para download.");
    }, [zplCode]);

    useEffect(() => {
        if (!ready) return;

        const handleShortcut = (event) => {
            const isModifierPressed = event.ctrlKey || event.metaKey;
            if (!isModifierPressed) return;

            const key = `${event.key || ""}`.toLowerCase();

            if (key === "p") {
                event.preventDefault();
                handlePrint();
            }

            if (key === "a" && event.shiftKey) {
                event.preventDefault();
                handleToggleVisible();
            }
        };

        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, [handlePrint, handleToggleVisible, ready]);

    const header = useMemo(() => ({
        title: "Etiquetas",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Operação" },
            { label: "Etiquetas" },
        ],
        actions: [],
    }), []);

    const actions = useMemo(() => ([]), []);

    const visibleSelectableCount = useMemo(() => (
        visibleRows.filter(item => item.canSelect).length
    ), [visibleRows]);

    const allVisibleSelected = useMemo(() => (
        visibleSelectableCount > 0
        && visibleRows
            .filter(item => item.canSelect)
            .every(item => Number(selectedQuantities[item.id]) > 0)
    ), [selectedQuantities, visibleRows, visibleSelectableCount]);

    const summaryItems = useMemo(() => {
        const pricedItems = visibleRows.filter(item => item.canSelect).length;
        const missingPriceItems = visibleRows.length - pricedItems;

        return [
            { label: "Itens visíveis", value: `${visibleRows.length}` },
            { label: "Com preço", value: `${pricedItems}` },
            { label: "Sem preço", value: `${missingPriceItems}` },
            { label: "Selecionados", value: `${selectedItems.length}` },
            { label: "Etiquetas", value: `${totalLabels}` },
            { label: "Formato", value: `${settings.widthMm}x${settings.heightMm} mm` },
        ];
    }, [selectedItems.length, settings.heightMm, settings.widthMm, totalLabels, visibleRows]);

    const statusCard = useMemo(() => (
        buildLabelStatus({
            rows,
            visibleRows,
            selectedItems,
        })
    ), [rows, selectedItems, visibleRows]);

    const previewItems = useMemo(() => selectedItems.slice(0, 3), [selectedItems]);

    return {
        loading,
        header,
        actions,
        filters,
        settings,
        rows: visibleRows,
        sectionOptions,
        selectedQuantities,
        selectedItems,
        previewItems,
        recentJobs,
        statusCard,
        summaryItems,
        guidelines: LABEL_GUIDELINES,
        presetOptions: LABEL_PRESET_OPTIONS,
        dpiOptions: LABEL_DPI_OPTIONS,
        allVisibleSelected,
        visibleSelectableCount,
        zplCode,
        showZplModal,
        applyFiltersPatch,
        applySettingsPatch,
        handleToggleItem,
        handleChangeCopies,
        handleToggleVisible,
        handleRestoreRecentJob,
        handleCopyZpl,
        handleDownloadZpl,
        handleGenerateZpl,
        handlePrint,
        handleCloseZpl,
    };
}
