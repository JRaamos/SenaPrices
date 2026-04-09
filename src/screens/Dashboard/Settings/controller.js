import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

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
    readMasterConfig,
    saveMasterConfig,
} from "services/platform";
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

const SEASONAL_THEME_OPTIONS = [
    { value: "generic", label: "Generico" },
    { value: "blackfriday", label: "Black Friday" },
    { value: "semanaConsumidor", label: "Semana do Consumidor" },
    { value: "natal", label: "Natal" },
    { value: "pascoa", label: "Pascoa" },
];

export default function useController() {
    const n = useNavigate();
    const location = useLocation();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const { user, setModal } = useContext(CoreContext);

    const role = normalizeUserRole(user);
    const roleLabel = getRoleLabel(role);
    const isMaster = role === "master";
    const canManage = canManagePromotions(user);
    const canAccessSettings = isMaster || canManage;
    const initialTab = useMemo(() => {
        const query = new URLSearchParams(location.search);
        const requestedTab = `${query.get("tab") || ""}`.trim().toLowerCase();

        if (isMaster) {
            return "platform";
        }

        return SETTINGS_TABS
            .filter(item => item.key !== "platform")
            .some(item => item.key === requestedTab)
            ? requestedTab
            : "print";
    }, [isMaster, location.search]);

    const [activeTab, setActiveTab] = useState(initialTab);
    const [appSettings, setAppSettings] = useState(readAppSettings());
    const [masterConfig, setMasterConfig] = useState(readMasterConfig());
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

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const refreshLocalState = useCallback(() => {
        setAppSettings(readAppSettings());
        setMasterConfig(readMasterConfig());
        setLabelSettingsState(readLabelSettings());
        setSections(readCatalogSectionUsage());
    }, []);

    const refreshUsers = useCallback(async () => {
        if (!canManage) {
            setUsersState({
                loading: false,
                error: "",
                items: [],
            });
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
                error: "Nao foi possivel ler o diretorio autenticado de usuarios nesta etapa.",
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

    const tabItems = useMemo(() => {
        if (isMaster) {
            return [
                {
                    key: "platform",
                    label: "Master",
                    description: "Parametros comerciais, tema sazonal e politicas globais da plataforma.",
                    icon: "/icons/training.svg",
                    active: activeTab === "platform",
                },
            ];
        }

        return SETTINGS_TABS.filter(item => item.key !== "platform").map(item => ({
            ...item,
            active: activeTab === item.key,
        }));
    }, [activeTab, isMaster]);

    const activeTabMeta = useMemo(() => (
        tabItems.find(item => item.key === activeTab) || tabItems[0]
    ), [activeTab, tabItems]);

    const statusCard = useMemo(() => buildSettingsStatus({
        activeTab,
        canManage,
        isMaster,
        sections,
        usersCount: usersState.items.length,
        usersError: usersState.error,
    }), [activeTab, canManage, isMaster, sections, usersState.error, usersState.items.length]);

    const summaryItems = useMemo(() => buildSettingsSummary({
        roleLabel,
        activeTabLabel: activeTabMeta?.label || "",
        sections,
        labelSettings,
        appSettings,
        masterConfig,
        usersCount: usersState.items.length,
        isMaster,
    }), [activeTabMeta?.label, appSettings, isMaster, labelSettings, masterConfig, roleLabel, sections, usersState.items.length]);

    const shortcuts = useMemo(() => {
        if (isMaster) {
            return [
                {
                    key: "landing",
                    title: "Landing",
                    description: "Validar o impacto imediato dos planos, do tema sazonal e dos contatos publicos.",
                    route: "",
                    buttonLabel: "Abrir apresentacao",
                },
                {
                    key: "checkout",
                    title: "Pos-checkout",
                    description: "Revisar como o retorno comercial sera apresentado ao visitante autenticado ou publico.",
                    route: "checkout/success?status=success&plan=profissional",
                    buttonLabel: "Simular retorno",
                },
            ];
        }

        return SETTINGS_SHORTCUTS.filter(item => (
            item.route !== "dashboard/reports" || canManage
        ));
    }, [canManage, isMaster]);

    const handlePrintPatch = useCallback((patch) => {
        setAppSettings(previous => ({
            ...previous,
            print: {
                ...previous.print,
                ...(typeof patch === "function" ? patch(previous.print) : patch),
            },
        }));
    }, []);

    const handleMasterPatch = useCallback((patch) => {
        setMasterConfig(previous => {
            if (typeof patch === "function") {
                return patch(previous);
            }

            return {
                ...previous,
                ...patch,
                planConfig: {
                    ...previous.planConfig,
                    ...(patch?.planConfig || {}),
                },
            };
        });
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
        toast.info("Base de definicoes atualizada.");
    }, [refreshLocalState, refreshUsers]);

    const handleSavePrint = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem alterar definicoes centrais.");
            return;
        }

        const saved = saveAppSettings(appSettings, user);
        setAppSettings(saved);
        toast.success("Defaults de impressao salvos com sucesso.");
    }, [appSettings, canManage, user]);

    const handleSavePlatform = useCallback(() => {
        if (!isMaster) {
            toast.error("Somente a conta master pode alterar parametros globais da plataforma.");
            return;
        }

        const saved = saveMasterConfig(masterConfig, user);
        setMasterConfig(saved);
        toast.success("Parametros globais da plataforma salvos com sucesso.");
    }, [isMaster, masterConfig, user]);

    const handleSaveLabels = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem alterar definicoes centrais.");
            return;
        }

        const saved = saveLabelSettings(labelSettings);
        setLabelSettingsState(saved);
        toast.success("Configuracao de etiquetas salva com sucesso.");
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
        toast.info("Defaults de impressao restaurados para o padrao recomendado.");
    }, [canManage]);

    const handleAddSection = useCallback(() => {
        if (!canManage) {
            toast.error("Somente admin e subadmin podem gerenciar secoes.");
            return;
        }

        try {
            createCatalogSection({ name: newSectionName }, user);
            setNewSectionName("");
            setSections(readCatalogSectionUsage());
            toast.success("Secao criada com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel criar a secao.");
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
            toast.success("Secao atualizada com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel atualizar a secao.");
        }
    }, [canManage, cancelEditingSection, editingSectionName, user]);

    const handleDeleteSection = useCallback((section) => {
        if (!canManage) {
            return;
        }

        if (section.usageCount > 0) {
            toast.info("Secoes em uso nao podem ser excluidas diretamente. Renomeie a secao para reclassificar os itens vinculados.");
            return;
        }

        setModal({
            type: "confirm",
            title: "Deseja excluir esta secao?",
            text: "A exclusao remove apenas a classificacao vazia da base. Itens ja classificados nao serao afetados porque esta secao nao possui uso atual.",
            action: () => {
                try {
                    deleteCatalogSection(section.id, {}, user);
                    setSections(readCatalogSectionUsage());
                    toast.success("Secao excluida com sucesso.");
                } catch (error) {
                    toast.error(error?.message || "Nao foi possivel excluir a secao.");
                }
            },
        });
    }, [canManage, setModal, user]);

    const header = useMemo(() => {
        if (isMaster) {
            return {
                title: "Governanca da plataforma",
                breadcrumbs: [
                    { label: "Landing", to: "/" },
                    { label: "Master" },
                ],
                actions: [
                    {
                        label: "Ver landing",
                        rounded: true,
                        outline: true,
                        color: "primary",
                        action: () => n("/"),
                    },
                    {
                        label: "Atualizar base",
                        rounded: true,
                        color: "secondary",
                        action: handleRefreshAll,
                    },
                ],
            };
        }

        return {
            title: "Definicoes",
            breadcrumbs: [
                { label: "Home", to: "/dashboard" },
                { label: "Governanca" },
                { label: "Definicoes" },
            ],
            actions: [
                {
                    label: "Criar preco",
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
                    label: "Integracao PDV",
                    rounded: true,
                    color: "secondary",
                    action: () => navigate("dashboard/integration"),
                },
            ],
        };
    }, [handleRefreshAll, isMaster, n, navigate]);

    const actions = useMemo(() => {
        if (isMaster) {
            return [
                {
                    label: "Atualizar base",
                    color: "primary",
                    outline: true,
                    rounded: true,
                    left: true,
                    action: handleRefreshAll,
                },
                {
                    label: "Salvar plataforma",
                    color: "primary",
                    rounded: true,
                    action: handleSavePlatform,
                },
            ];
        }

        if (!canAccessSettings) {
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
                    label: "Salvar impressao",
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
                    label: "Atualizar usuarios",
                    color: "primary",
                    rounded: true,
                    action: refreshUsers,
                },
            ];
        }

        return baseActions;
    }, [activeTab, canAccessSettings, handleRefreshAll, handleSaveLabels, handleSavePlatform, handleSavePrint, isMaster, navigate, refreshUsers]);

    return {
        loading: usersState.loading,
        header,
        actions,
        canManage,
        canAccessSettings,
        isMaster,
        roleLabel,
        activeTab,
        activeTabLabel: activeTabMeta?.label || "",
        lastUpdatedLabel: formatUpdatedAt(isMaster ? masterConfig.updatedAt : appSettings.updatedAt),
        tabItems,
        appSettings,
        masterConfig,
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
        seasonalThemeOptions: SEASONAL_THEME_OPTIONS,
        statusCard,
        summaryItems,
        setActiveTab,
        setNewSectionName,
        setEditingSectionId,
        setEditingSectionName,
        handlePrintPatch,
        handleMasterPatch,
        handleLabelPatch,
        handleLabelPresetChange,
        startEditingSection,
        cancelEditingSection,
        handleSavePrint,
        handleSavePlatform,
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
    return "Usuario";
}
