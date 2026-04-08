import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import {
    createCatalogSection,
    deleteCatalogSection,
    readCatalogSectionUsage,
    updateCatalogSection,
} from "services/catalog";
import {
    LABEL_DPI_OPTIONS,
    LABEL_PRESET_OPTIONS,
    readLabelSettings,
    saveLabelSettings,
} from "services/labels";
import {
    DEFAULT_APP_SETTINGS,
    readAppSettings,
    saveAppSettings,
} from "services/settings";
import {
    canManagePromotions,
    normalizeUserRole,
    readUsersDirectory,
} from "services/users";

import {
    ACCESS_MATRIX,
    SETTINGS_GUIDELINES,
    SETTINGS_SHORTCUTS,
    SETTINGS_TABS,
} from "./constants";
import {
    buildSettingsStatus,
    buildSettingsSummary,
    formatUpdatedAt,
} from "./helpers";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const { user, setModal } = useContext(CoreContext);

    const canManage = canManagePromotions(user);
    const role = normalizeUserRole(user);
    const roleLabel = getRoleLabel(role);

    const [activeTab, setActiveTab] = useState("print");
    const [appSettings, setAppSettings] = useState(readAppSettings());
    const [labelSettings, setLabelSettingsState] = useState(readLabelSettings());
    const [sections, setSections] = useState(readCatalogSectionUsage());
    const [newSectionName, setNewSectionName] = useState("");
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [editingSectionName, setEditingSectionName] = useState("");
    const [usersState, setUsersState] = useState({
        loading: false,
        error: "",
        items: [],
    });

    const refreshLocalState = useCallback(() => {
        setAppSettings(readAppSettings());
        setLabelSettingsState(readLabelSettings());
        setSections(readCatalogSectionUsage());
    }, []);

    const refreshUsers = useCallback(async () => {
        if (!canManage) {
            return;
        }

        setUsersState(previous => ({
            ...previous,
            loading: true,
            error: "",
        }));

        const result = await readUsersDirectory();

        if (!Array.isArray(result)) {
            setUsersState({
                loading: false,
                error: "Não foi possível ler o diretório autenticado de usuários nesta etapa.",
                items: [],
            });
            return;
        }

        setUsersState({
            loading: false,
            error: "",
            items: result,
        });
    }, [canManage]);

    useEffect(() => {
        refreshLocalState();
        refreshUsers();
    }, [refreshLocalState, refreshUsers]);

    const activeTabMeta = useMemo(() => (
        SETTINGS_TABS.find(item => item.key === activeTab) || SETTINGS_TABS[0]
    ), [activeTab]);

    const statusCard = useMemo(() => buildSettingsStatus({
        activeTab,
        canManage,
        sections,
        usersCount: usersState.items.length,
        usersError: usersState.error,
    }), [activeTab, canManage, sections, usersState.error, usersState.items.length]);

    const summaryItems = useMemo(() => buildSettingsSummary({
        roleLabel,
        activeTabLabel: activeTabMeta.label,
        sections,
        labelSettings,
        appSettings,
        usersCount: usersState.items.length,
    }), [activeTabMeta.label, appSettings, labelSettings, roleLabel, sections, usersState.items.length]);

    const tabItems = useMemo(() => SETTINGS_TABS.map(item => ({
        ...item,
        active: activeTab === item.key,
    })), [activeTab]);

    const shortcuts = useMemo(() => (
        SETTINGS_SHORTCUTS.filter(item => (
            item.route !== "dashboard/reports" || canManage
        ))
    ), [canManage]);

    const handlePrintPatch = useCallback((patch) => {
        setAppSettings(previous => ({
            ...previous,
            print: {
                ...previous.print,
                ...(typeof patch === "function" ? patch(previous.print) : patch),
            },
        }));
    }, []);

    const handleLabelPatch = useCallback((patch) => {
        setLabelSettingsState(previous => {
            const nextPatch = typeof patch === "function" ? patch(previous) : patch;
            return {
                ...previous,
                ...nextPatch,
            };
        });
    }, []);

    const handleLabelPresetChange = useCallback((preset) => {
        const presetConfig = LABEL_PRESET_OPTIONS.find(item => item.value === preset) || LABEL_PRESET_OPTIONS[0];

        setLabelSettingsState(previous => ({
            ...previous,
            preset: presetConfig.value,
            widthMm: presetConfig.value === "custom" ? previous.widthMm : presetConfig.widthMm,
            heightMm: presetConfig.value === "custom" ? previous.heightMm : presetConfig.heightMm,
        }));
    }, []);

    const startEditingSection = useCallback((section) => {
        setEditingSectionId(section.id);
        setEditingSectionName(section.name);
    }, []);

    const cancelEditingSection = useCallback(() => {
        setEditingSectionId(null);
        setEditingSectionName("");
    }, []);

    const handleRefreshAll = useCallback(async () => {
        refreshLocalState();
        await refreshUsers();
        toast.info("Base de definições atualizada.");
    }, [refreshLocalState, refreshUsers]);

    const handleSavePrint = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem alterar definições centrais.");
            return;
        }

        const saved = saveAppSettings(appSettings, user);
        setAppSettings(saved);
        toast.success("Defaults de impressão salvos com sucesso.");
    }, [appSettings, canManage, user]);

    const handleSaveLabels = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem alterar definições centrais.");
            return;
        }

        const saved = saveLabelSettings(labelSettings);
        setLabelSettingsState(saved);
        toast.success("Configuração de etiquetas salva com sucesso.");
    }, [canManage, labelSettings]);

    const handleResetPrint = useCallback(() => {
        if (!canManage) {
            return;
        }

        setAppSettings(previous => ({
            ...previous,
            print: {
                ...DEFAULT_APP_SETTINGS.print,
            },
        }));
        toast.info("Defaults de impressão restaurados para o padrão recomendado.");
    }, [canManage]);

    const handleAddSection = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem gerenciar seções.");
            return;
        }

        try {
            createCatalogSection({ name: newSectionName }, user);
            setNewSectionName("");
            setSections(readCatalogSectionUsage());
            toast.success("Seção criada com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível criar a seção.");
        }
    }, [canManage, newSectionName, user]);

    const handleSaveSection = useCallback((sectionId) => {
        if (!canManage) {
            return;
        }

        try {
            updateCatalogSection(sectionId, { name: editingSectionName }, user);
            setSections(readCatalogSectionUsage());
            cancelEditingSection();
            toast.success("Seção atualizada com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível atualizar a seção.");
        }
    }, [canManage, cancelEditingSection, editingSectionName, user]);

    const handleDeleteSection = useCallback((section) => {
        if (!canManage) {
            return;
        }

        if (section.usageCount > 0) {
            toast.info("Seções em uso não podem ser excluídas diretamente. Renomeie a seção para reclassificar os itens vinculados.");
            return;
        }

        setModal({
            type: "confirm",
            title: "Deseja excluir esta seção?",
            text: "A exclusão remove apenas a classificação vazia da base. Itens já classificados não serão afetados porque esta seção não possui uso atual.",
            action: () => {
                try {
                    deleteCatalogSection(section.id, {}, user);
                    setSections(readCatalogSectionUsage());
                    toast.success("Seção excluída com sucesso.");
                } catch (error) {
                    toast.error(error?.message || "Não foi possível excluir a seção.");
                }
            },
        });
    }, [canManage, setModal, user]);

    const header = useMemo(() => ({
        title: "Definições",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Governança" },
            { label: "Definições" },
        ],
        actions: [
            {
                label: "Criar preço",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/prices/create"),
            },
            {
                label: "Etiquetas",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/labels"),
            },
            {
                label: "Integração PDV",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/integration"),
            },
        ],
    }), [navigate]);

    const actions = useMemo(() => {
        if (!canManage) {
            return [
                {
                    label: "Abrir minha conta",
                    color: "primary",
                    outline: true,
                    rounded: true,
                    left: true,
                    action: () => navigate("dashboard/me"),
                },
                {
                    label: "Falar com suporte",
                    color: "primary",
                    rounded: true,
                    action: () => navigate("dashboard/support"),
                },
            ];
        }

        const baseActions = [
            {
                label: "Atualizar base",
                color: "primary",
                outline: true,
                rounded: true,
                left: true,
                action: handleRefreshAll,
            },
        ];

        if (activeTab === "print") {
            return [
                ...baseActions,
                {
                    label: "Salvar impressão",
                    color: "primary",
                    rounded: true,
                    action: handleSavePrint,
                },
            ];
        }

        if (activeTab === "labels") {
            return [
                ...baseActions,
                {
                    label: "Salvar etiquetas",
                    color: "primary",
                    rounded: true,
                    action: handleSaveLabels,
                },
            ];
        }

        if (activeTab === "access") {
            return [
                ...baseActions,
                {
                    label: "Atualizar usuários",
                    color: "primary",
                    rounded: true,
                    action: refreshUsers,
                },
            ];
        }

        return baseActions;
    }, [activeTab, canManage, handleRefreshAll, handleSaveLabels, handleSavePrint, navigate, refreshUsers]);

    return {
        loading: usersState.loading,
        header,
        actions,
        canManage,
        roleLabel,
        activeTab,
        activeTabLabel: activeTabMeta.label,
        lastUpdatedLabel: formatUpdatedAt(appSettings.updatedAt),
        tabItems,
        appSettings,
        labelSettings,
        sections,
        newSectionName,
        editingSectionId,
        editingSectionName,
        usersState,
        accessMatrix: ACCESS_MATRIX,
        guidelines: SETTINGS_GUIDELINES,
        shortcuts,
        labelPresetOptions: LABEL_PRESET_OPTIONS,
        labelDpiOptions: LABEL_DPI_OPTIONS,
        statusCard,
        summaryItems,
        setActiveTab,
        setNewSectionName,
        setEditingSectionId,
        setEditingSectionName,
        handlePrintPatch,
        handleLabelPatch,
        handleLabelPresetChange,
        startEditingSection,
        cancelEditingSection,
        handleSavePrint,
        handleSaveLabels,
        handleResetPrint,
        handleAddSection,
        handleSaveSection,
        handleDeleteSection,
        refreshUsers,
        navigate,
    };
}

function getRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuário";
}
