import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

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
    buildLabelStyleTokens,
    readLabelSettings,
    saveLabelSettings,
} from "services/labels";
import {
    ALIGN_OPTIONS,
    A5_SHEET_MODE_OPTIONS,
    A6_SHEET_MODE_OPTIONS,
    DEFAULT_APP_SETTINGS,
    INFO_POSITION_OPTIONS,
    META_LAYOUT_OPTIONS,
    PRICE_CENTS_ALIGN_OPTIONS,
    PRICE_SYMBOL_POSITION_OPTIONS,
    PRICE_UNIT_POSITION_OPTIONS,
    PRINT_FONT_OPTIONS,
    readAppSettings,
    saveAppSettings,
    TITLE_TRANSFORM_OPTIONS,
    VALIDITY_POSITION_OPTIONS,
} from "services/settings";
import {
    buildPlanOffer,
    readMasterConfig,
    resolveUserSubscription,
    saveMasterConfig,
} from "services/platform";
import {
    canManagePromotions,
    normalizeUserRole,
    readUsersDirectory,
} from "services/users";
import {
    createCustomPage,
    createGovernanceGroup,
    createOfferType,
    createSpecialOffer,
    deleteCustomPage,
    deleteGovernanceGroup,
    deleteOfferType,
    deleteSpecialOffer,
    readBackgroundAssets,
    readCustomPages,
    readGovernanceGroups,
    readOfferTypes,
    readSpecialOffers,
    saveBackgroundAssets,
    toggleOfferType,
    toggleSpecialOffer,
} from "services/governance";
import {
    createLocalAccount,
    readLocalAccountsDirectory,
    saveGovernedLocalAccount,
    toggleLocalAccountActive,
} from "services/localAccounts";
import { readSupportAccessLogs } from "services/supportAccess";

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
import { buildPreview } from "../CreatePrice/helpers";

const SEASONAL_THEME_OPTIONS = [
    { value: "generic", label: "Genérico" },
    { value: "blackfriday", label: "Black Friday" },
    { value: "semanaConsumidor", label: "Semana do Consumidor" },
    { value: "natal", label: "Natal" },
    { value: "pascoa", label: "Páscoa" },
];

const EMPTY_USER_FORM = {
    id: "",
    name: "",
    email: "",
    role: "user",
    password: "",
    pin: "",
    active: true,
};

const EMPTY_GROUP_FORM = {
    name: "",
    description: "",
};

const EMPTY_SPECIAL_OFFER_FORM = {
    name: "",
    template: "",
};

const EMPTY_CUSTOM_PAGE_FORM = {
    name: "",
    widthCm: 21,
    heightCm: 14.8,
    priceType: "avista",
    orientation: "landscape",
    description: "",
};

export default function useController() {
    const location = useLocation();
    const { user, setModal } = useContext(CoreContext);

    const role = normalizeUserRole(user);
    const roleLabel = getRoleLabel(role);
    const isMaster = role === "master";
    const canManage = canManagePromotions(user);
    const canAccessSettings = isMaster || canManage;
    const availableTabs = useMemo(() => (
        SETTINGS_TABS.filter(item => isMaster || !item.masterOnly)
    ), [isMaster]);
    const initialTab = useMemo(() => {
        const query = new URLSearchParams(location.search);
        const requestedTab = `${query.get("tab") || ""}`.trim().toLowerCase();

        return availableTabs.some(item => item.key === requestedTab)
            ? requestedTab
            : isMaster
                ? "platform"
                : "print";
    }, [availableTabs, isMaster, location.search]);

    const [activeTab, setActiveTab] = useState(initialTab);
    const [appSettings, setAppSettings] = useState(readAppSettings());
    const [masterConfig, setMasterConfig] = useState(readMasterConfig());
    const [labelSettings, setLabelSettingsState] = useState(readLabelSettings());
    const [sections, setSections] = useState(readCatalogSectionUsage());
    const [groups, setGroups] = useState(readGovernanceGroups());
    const [offerTypes, setOfferTypes] = useState(readOfferTypes());
    const [specialOffers, setSpecialOffers] = useState(readSpecialOffers());
    const [backgroundAssets, setBackgroundAssets] = useState(readBackgroundAssets());
    const [customPages, setCustomPages] = useState(readCustomPages());
    const [newSectionName, setNewSectionName] = useState("");
    const [userForm, setUserForm] = useState(EMPTY_USER_FORM);
    const [editingUserId, setEditingUserId] = useState("");
    const [groupForm, setGroupForm] = useState(EMPTY_GROUP_FORM);
    const [offerTypeName, setOfferTypeName] = useState("");
    const [specialOfferForm, setSpecialOfferForm] = useState(EMPTY_SPECIAL_OFFER_FORM);
    const [customPageForm, setCustomPageForm] = useState(EMPTY_CUSTOM_PAGE_FORM);
    const [editingSectionId, setEditingSectionId] = useState(null);
    const [editingSectionName, setEditingSectionName] = useState("");
    const [usersState, setUsersState] = useState({
        loading: false,
        error: "",
        items: [],
    });
    const [supportAccessLogs, setSupportAccessLogs] = useState(readSupportAccessLogs());

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const refreshLocalState = useCallback(() => {
        setAppSettings(readAppSettings());
        setMasterConfig(readMasterConfig());
        setLabelSettingsState(readLabelSettings());
        setSections(readCatalogSectionUsage());
        setGroups(readGovernanceGroups());
        setOfferTypes(readOfferTypes());
        setSpecialOffers(readSpecialOffers());
        setBackgroundAssets(readBackgroundAssets());
        setCustomPages(readCustomPages());
        setSupportAccessLogs(readSupportAccessLogs());
    }, []);

    const refreshUsers = useCallback(async () => {
        if (!canAccessSettings) {
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

        const localItems = readLocalAccountsDirectory();
        const apiItems = Array.isArray(result) ? result : [];
        const byIdentity = new Map();

        [...apiItems, ...localItems].forEach(item => {
            const key = `${item?.email || item?.id || ""}`.trim().toLowerCase();
            if (!key) return;

            byIdentity.set(key, {
                ...byIdentity.get(key),
                ...item,
            });
        });

        setUsersState({
            loading: false,
            error: Array.isArray(result) ? "" : "Diretório remoto indisponível. A lista abaixo mostra a governança local deste dispositivo.",
            items: Array.from(byIdentity.values()),
        });
    }, [canAccessSettings]);

    useEffect(() => {
        refreshLocalState();
        refreshUsers();
    }, [refreshLocalState, refreshUsers]);

    const tabItems = useMemo(() => {
        return availableTabs.map(item => ({
            ...item,
            active: activeTab === item.key,
        }));
    }, [activeTab, availableTabs]);

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

    const roleSummaryItems = useMemo(() => {
        const counters = {
            master: 0,
            admin: 0,
            subadmin: 0,
            user: 0,
        };

        usersState.items.forEach(item => {
            const normalizedRole = normalizeUserRole(item);
            counters[normalizedRole] = (counters[normalizedRole] || 0) + 1;
        });

        return [
            { label: "Masters", value: `${counters.master}` },
            { label: "Admins", value: `${counters.admin}` },
            { label: "Subadmins", value: `${counters.subadmin}` },
            { label: "Usuários", value: `${counters.user}` },
        ];
    }, [usersState.items]);

    const planSummaryItems = useMemo(() => {
        const counters = {
            essencial: 0,
            profissional: 0,
            personalizado: 0,
            none: 0,
        };

        usersState.items.forEach(item => {
            const plan = resolveUserSubscription(item).plan || "none";
            counters[plan] = (counters[plan] || 0) + 1;
        });

        return [
            { label: "Essencial", value: `${counters.essencial}` },
            { label: "Profissional", value: `${counters.profissional}` },
            { label: "Personalizado", value: `${counters.personalizado}` },
            { label: "Sem plano", value: `${counters.none}` },
        ];
    }, [usersState.items]);

    const billingSummaryItems = useMemo(() => {
        const formatCurrency = (value) => Number(value || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: masterConfig.planConfig.currency || "BRL",
            minimumFractionDigits: 2,
        });

        return [
            {
                label: "Essencial",
                value: `${formatCurrency(masterConfig.planConfig.essencialMonthlyPrice)} / mês`,
            },
            {
                label: "Profissional",
                value: `${formatCurrency(masterConfig.planConfig.profissionalMonthlyPrice)} / mês`,
            },
            {
                label: "Trial",
                value: `${masterConfig.planConfig.trialDays} dias`,
            },
            {
                label: "Moeda",
                value: masterConfig.planConfig.currency || "BRL",
            },
        ];
    }, [masterConfig.planConfig.currency, masterConfig.planConfig.essencialMonthlyPrice, masterConfig.planConfig.profissionalMonthlyPrice, masterConfig.planConfig.trialDays]);

    const supportAccessSummaryItems = useMemo(() => {
        const distinctAdmins = new Set(supportAccessLogs.map(item => item.adminName)).size;
        const distinctTargets = new Set(supportAccessLogs.map(item => item.targetUser)).size;
        const currentMonth = new Date().toISOString().slice(0, 7);
        const currentMonthEntries = supportAccessLogs.filter(item => `${item.accessDate || ""}`.startsWith(currentMonth)).length;

        return [
            { label: "Registros", value: `${supportAccessLogs.length}` },
            { label: "Neste mês", value: `${currentMonthEntries}` },
            { label: "Admins distintos", value: `${distinctAdmins}` },
            { label: "Contas acessadas", value: `${distinctTargets}` },
        ];
    }, [supportAccessLogs]);

    const printPreview = useMemo(() => buildPreview({
        productName: "Café tradicional 500g",
        productSubtitle: "Torra média - embalagem almofada",
        sectionName: "Mercearia",
        unitLabel: "pacote",
        internalCode: "CAF-500",
        eanCode: "7891234567895",
        priceType: "depor",
        fromPrice: "15,90",
        toPrice: "12,99",
        paperSize: appSettings.print.defaultPaperSize,
        orientation: appSettings.print.defaultOrientation,
        offerTitle: appSettings.print.defaultOfferTitle,
        validUntil: "2026-12-31",
        observation: "Leitura de teste para ajuste simultâneo do layout.",
        showBarcode: appSettings.print.defaultShowBarcode,
        showValidity: appSettings.print.defaultShowValidity,
    }, {
        printSettings: appSettings.print,
    }), [appSettings.print]);

    const labelPreviewStyle = useMemo(() => buildLabelStyleTokens(labelSettings), [labelSettings]);
    const labelPreviewItem = useMemo(() => ({
        description1: "Feijão carioca 1kg",
        description2: "Marca da loja",
        description3: "Safra selecionada",
        section: "Mercearia",
        unit: "pacote",
        internalCode: "FEI-001",
        ean13: "7891234567895",
        priceLabel: "R$ 8,99",
    }), []);

    const shortcuts = useMemo(() => {
        if (isMaster) {
            return [
                {
                    key: "landing",
                    title: "Landing",
                    description: "Validar o impacto imediato dos planos, do tema sazonal e dos contatos públicos.",
                    route: "",
                    buttonLabel: "Abrir apresentação",
                },
                {
                    key: "checkout",
                    title: "Pos-checkout",
                    description: "Revisar como o retorno comercial será apresentado ao visitante autenticado ou público.",
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

    const applyUserFormPatch = useCallback((patch) => {
        setUserForm(previous => ({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const resetUserForm = useCallback(() => {
        setUserForm(EMPTY_USER_FORM);
        setEditingUserId("");
    }, []);

    const startEditingUser = useCallback((item) => {
        setEditingUserId(item.id);
        setUserForm({
            id: item.id,
            name: item.name || "",
            email: item.email || "",
            role: item.role || "user",
            password: "",
            pin: "",
            active: item.active !== false,
        });
    }, []);

    const handleSaveUser = useCallback(async () => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem gerenciar usuários.");
            return;
        }

        try {
            if (editingUserId) {
                const updated = saveGovernedLocalAccount({ id: editingUserId }, userForm);

                if (!updated) {
                    throw new Error("Usuários remotos podem ser visualizados, mas só contas locais podem ser editadas nesta etapa.");
                }

                toast.success("Usuário atualizado com sucesso.");
            } else {
                createLocalAccount(userForm);
                toast.success("Usuário criado com sucesso.");
            }

            resetUserForm();
            await refreshUsers();
        } catch (error) {
            toast.error(error?.message || "Não foi possível salvar o usuário.");
        }
    }, [canAccessSettings, editingUserId, refreshUsers, resetUserForm, userForm]);

    const handleToggleUserActive = useCallback(async (item) => {
        if (!canAccessSettings) {
            return;
        }

        try {
            if (item?.source !== "local") {
                throw new Error("Somente contas locais podem ser ativadas ou desativadas nesta etapa.");
            }

            toggleLocalAccountActive(item);
            await refreshUsers();
            toast.success(item.active ? "Usuário desativado com sucesso." : "Usuário reativado com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível atualizar o status do usuário.");
        }
    }, [canAccessSettings, refreshUsers]);

    const applyGroupFormPatch = useCallback((patch) => {
        setGroupForm(previous => ({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const handleCreateGroup = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem gerenciar grupos.");
            return;
        }

        try {
            createGovernanceGroup(groupForm, user);
            setGroupForm(EMPTY_GROUP_FORM);
            setGroups(readGovernanceGroups());
            toast.success("Grupo criado com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível criar o grupo.");
        }
    }, [canAccessSettings, groupForm, user]);

    const handleDeleteGroup = useCallback((group) => {
        if (!canAccessSettings) {
            return;
        }

        setModal({
            type: "confirm",
            title: "Deseja excluir este grupo?",
            text: "A exclusão remove apenas o agrupamento operacional salvo localmente.",
            action: () => {
                deleteGovernanceGroup(group.id);
                setGroups(readGovernanceGroups());
                toast.success("Grupo excluído com sucesso.");
            },
        });
    }, [canAccessSettings, setModal]);

    const handleCreateOfferType = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem gerenciar tipos de oferta.");
            return;
        }

        try {
            createOfferType({ name: offerTypeName }, user);
            setOfferTypeName("");
            setOfferTypes(readOfferTypes());
            toast.success("Tipo de oferta criado com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível criar o tipo de oferta.");
        }
    }, [canAccessSettings, offerTypeName, user]);

    const handleToggleOfferType = useCallback((item) => {
        if (!canAccessSettings) return;

        try {
            toggleOfferType(item.id, user);
            setOfferTypes(readOfferTypes());
            toast.success(item.active ? "Tipo de oferta desativado." : "Tipo de oferta ativado.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível atualizar o tipo de oferta.");
        }
    }, [canAccessSettings, user]);

    const handleDeleteOfferType = useCallback((item) => {
        if (!canAccessSettings) return;

        setModal({
            type: "confirm",
            title: "Deseja excluir este tipo de oferta?",
            text: "A exclusão remove apenas o rótulo customizado salvo nesta operação.",
            action: () => {
                try {
                    deleteOfferType(item.id);
                    setOfferTypes(readOfferTypes());
                    toast.success("Tipo de oferta removido com sucesso.");
                } catch (error) {
                    toast.error(error?.message || "Não foi possível remover o tipo de oferta.");
                }
            },
        });
    }, [canAccessSettings, setModal]);

    const applySpecialOfferFormPatch = useCallback((patch) => {
        setSpecialOfferForm(previous => ({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const handleCreateSpecialOffer = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem gerenciar ofertas especiais.");
            return;
        }

        try {
            createSpecialOffer(specialOfferForm, user);
            setSpecialOfferForm(EMPTY_SPECIAL_OFFER_FORM);
            setSpecialOffers(readSpecialOffers());
            toast.success("Oferta especial criada com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível criar a oferta especial.");
        }
    }, [canAccessSettings, specialOfferForm, user]);

    const handleToggleSpecialOffer = useCallback((item) => {
        if (!canAccessSettings) return;

        try {
            toggleSpecialOffer(item.id, user);
            setSpecialOffers(readSpecialOffers());
            toast.success(item.active ? "Oferta especial desativada." : "Oferta especial ativada.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível atualizar a oferta especial.");
        }
    }, [canAccessSettings, user]);

    const handleDeleteSpecialOffer = useCallback((item) => {
        if (!canAccessSettings) return;

        setModal({
            type: "confirm",
            title: "Deseja excluir esta oferta especial?",
            text: "A exclusão remove apenas o template customizado salvo nesta operação.",
            action: () => {
                try {
                    deleteSpecialOffer(item.id);
                    setSpecialOffers(readSpecialOffers());
                    toast.success("Oferta especial removida com sucesso.");
                } catch (error) {
                    toast.error(error?.message || "Não foi possível remover a oferta especial.");
                }
            },
        });
    }, [canAccessSettings, setModal]);

    const handleBackgroundPatch = useCallback((patch) => {
        setBackgroundAssets(previous => ({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const handleBackgroundFileSelect = useCallback((field, file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : "";
            setBackgroundAssets(previous => ({
                ...previous,
                [field]: result,
            }));
        };
        reader.readAsDataURL(file);
    }, []);

    const handleSaveBackgroundAssets = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem salvar ativos visuais.");
            return;
        }

        const saved = saveBackgroundAssets(backgroundAssets, user);
        setBackgroundAssets(saved);
        toast.success("Assets visuais salvos com sucesso.");
    }, [backgroundAssets, canAccessSettings, user]);

    const applyCustomPageFormPatch = useCallback((patch) => {
        setCustomPageForm(previous => ({
            ...previous,
            ...(typeof patch === "function" ? patch(previous) : patch),
        }));
    }, []);

    const handleCreateCustomPage = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem criar páginas personalizadas.");
            return;
        }

        try {
            createCustomPage(customPageForm, user);
            setCustomPageForm(EMPTY_CUSTOM_PAGE_FORM);
            setCustomPages(readCustomPages());
            toast.success("Página personalizada criada com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Não foi possível criar a página personalizada.");
        }
    }, [canAccessSettings, customPageForm, user]);

    const handleDeleteCustomPage = useCallback((item) => {
        if (!canAccessSettings) return;

        setModal({
            type: "confirm",
            title: "Deseja excluir esta página personalizada?",
            text: "A exclusão remove apenas o formato salvo localmente.",
            action: () => {
                deleteCustomPage(item.id);
                setCustomPages(readCustomPages());
                toast.success("Página personalizada excluída com sucesso.");
            },
        });
    }, [canAccessSettings, setModal]);

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
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem alterar definições centrais.");
            return;
        }

        const saved = saveAppSettings(appSettings, user);
        setAppSettings(saved);
        toast.success("Defaults de impressão salvos com sucesso.");
    }, [appSettings, canAccessSettings, user]);

    const handleSavePlatform = useCallback(() => {
        if (!isMaster) {
            toast.error("Somente a conta master pode alterar parâmetros globais da plataforma.");
            return;
        }

        const saved = saveMasterConfig(masterConfig, user);
        setMasterConfig(saved);
        toast.success("Parâmetros globais da plataforma salvos com sucesso.");
    }, [isMaster, masterConfig, user]);

    const handleSaveLabels = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem alterar definições centrais.");
            return;
        }

        const saved = saveLabelSettings(labelSettings);
        setLabelSettingsState(saved);
        toast.success("Configuração de etiquetas salva com sucesso.");
    }, [canAccessSettings, labelSettings]);

    const handleResetPrint = useCallback(() => {
        if (!canAccessSettings) {
            return;
        }

        setAppSettings(previous => ({
            ...previous,
            print: {
                ...DEFAULT_APP_SETTINGS.print,
            },
        }));
        toast.info("Defaults de impressão restaurados para o padrão recomendado.");
    }, [canAccessSettings]);

    const handleAddSection = useCallback(() => {
        if (!canAccessSettings) {
            toast.error("Somente perfis com governança central podem gerenciar seções.");
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
    }, [canAccessSettings, newSectionName, user]);

    const handleSaveSection = useCallback((sectionId) => {
        if (!canAccessSettings) {
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
    }, [canAccessSettings, cancelEditingSection, editingSectionName, user]);

    const handleDeleteSection = useCallback((section) => {
        if (!canAccessSettings) {
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
    }, [canAccessSettings, setModal, user]);

    const header = useMemo(() => {
        if (isMaster) {
            const activeLabel = activeTabMeta?.label || "Conta master";

            return {
                title: activeTab === "platform" ? "Conta Master" : activeLabel,
                breadcrumbs: [
                    { label: "Governança master" },
                    { label: activeTab === "platform" ? "Conta master" : activeLabel },
                ],
                actions: [],
            };
        }

        return {
            title: "Definições",
            breadcrumbs: [
                { label: "Home", to: "/dashboard" },
                { label: "Governança" },
                { label: "Definições" },
            ],
            actions: [],
        };
    }, [activeTab, activeTabMeta?.label, isMaster]);

    const actions = useMemo(() => {
        if (isMaster) {
            const baseMasterActions = [
                {
                    label: "Atualizar base",
                    color: "primary",
                    outline: true,
                    rounded: true,
                    left: true,
                    action: handleRefreshAll,
                },
            ];

            if (activeTab === "platform" || activeTab === "billing") {
                return [
                    ...baseMasterActions,
                    {
                        label: "Salvar plataforma",
                        color: "primary",
                        rounded: true,
                        action: handleSavePlatform,
                    },
                ];
            }

            if (activeTab === "print") {
                return [
                    ...baseMasterActions,
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
                    ...baseMasterActions,
                    {
                        label: "Salvar etiquetas",
                        color: "primary",
                        rounded: true,
                        action: handleSaveLabels,
                    },
                ];
            }

            if (activeTab === "backgrounds") {
                return [
                    ...baseMasterActions,
                    {
                        label: "Salvar ativos",
                        color: "primary",
                        rounded: true,
                        action: handleSaveBackgroundAssets,
                    },
                ];
            }

            if (activeTab === "users") {
                return [
                    ...baseMasterActions,
                    {
                        label: "Atualizar usuários",
                        color: "primary",
                        rounded: true,
                        action: refreshUsers,
                    },
                ];
            }

            return baseMasterActions;
        }

        if (!canAccessSettings) {
            return [];
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

        if (activeTab === "users") {
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
    }, [activeTab, canAccessSettings, handleRefreshAll, handleSaveBackgroundAssets, handleSaveLabels, handleSavePlatform, handleSavePrint, isMaster, refreshUsers]);

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
        groups,
        offerTypes,
        specialOffers,
        backgroundAssets,
        customPages,
        newSectionName,
        userForm,
        editingUserId,
        groupForm,
        offerTypeName,
        specialOfferForm,
        customPageForm,
        editingSectionId,
        editingSectionName,
        usersState,
        supportAccessLogs,
        accessMatrix: ACCESS_MATRIX,
        guidelines: SETTINGS_GUIDELINES,
        shortcuts,
        roleSummaryItems,
        planSummaryItems,
        billingSummaryItems,
        supportAccessSummaryItems,
        labelPresetOptions: LABEL_PRESET_OPTIONS,
        labelDpiOptions: LABEL_DPI_OPTIONS,
        printFontOptions: PRINT_FONT_OPTIONS,
        alignOptions: ALIGN_OPTIONS,
        a5SheetModeOptions: A5_SHEET_MODE_OPTIONS,
        a6SheetModeOptions: A6_SHEET_MODE_OPTIONS,
        titleTransformOptions: TITLE_TRANSFORM_OPTIONS,
        priceSymbolPositionOptions: PRICE_SYMBOL_POSITION_OPTIONS,
        priceCentsAlignOptions: PRICE_CENTS_ALIGN_OPTIONS,
        priceUnitPositionOptions: PRICE_UNIT_POSITION_OPTIONS,
        infoPositionOptions: INFO_POSITION_OPTIONS,
        validityPositionOptions: VALIDITY_POSITION_OPTIONS,
        metaLayoutOptions: META_LAYOUT_OPTIONS,
        seasonalThemeOptions: SEASONAL_THEME_OPTIONS,
        userRoleOptions: [
            { value: "admin", label: "Administrador" },
            { value: "subadmin", label: "Subadministrador" },
            { value: "user", label: "Usuário" },
        ],
        customPagePriceTypeOptions: [
            { value: "avista", label: "À vista" },
            { value: "depor", label: "De / Por" },
            { value: "clube", label: "Clube" },
            { value: "ofertaespecial", label: "Oferta especial" },
        ],
        customPageOrientationOptions: [
            { value: "portrait", label: "Retrato" },
            { value: "landscape", label: "Paisagem" },
        ],
        statusCard,
        summaryItems,
        printPreview,
        labelPreviewStyle,
        labelPreviewItem,
        setActiveTab,
        setNewSectionName,
        setEditingSectionId,
        setEditingSectionName,
        setOfferTypeName,
        handlePrintPatch,
        handleMasterPatch,
        handleLabelPatch,
        handleLabelPresetChange,
        applyUserFormPatch,
        resetUserForm,
        startEditingUser,
        handleSaveUser,
        handleToggleUserActive,
        applyGroupFormPatch,
        handleCreateGroup,
        handleDeleteGroup,
        applySpecialOfferFormPatch,
        handleCreateOfferType,
        handleToggleOfferType,
        handleDeleteOfferType,
        handleCreateSpecialOffer,
        handleToggleSpecialOffer,
        handleDeleteSpecialOffer,
        handleBackgroundPatch,
        handleBackgroundFileSelect,
        handleSaveBackgroundAssets,
        applyCustomPageFormPatch,
        handleCreateCustomPage,
        handleDeleteCustomPage,
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
    };
}

function getRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuario";
}
