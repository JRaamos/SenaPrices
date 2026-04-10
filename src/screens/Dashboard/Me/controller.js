import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { buildAccessProfile } from "services/access";
import {
    createLocalAccount,
    readLocalAccountsDirectory,
    saveGovernedLocalAccount,
    toggleLocalAccountActive,
} from "services/localAccounts";
import { ReadMe, UpdateMe } from "services/me";
import { readMasterConfig } from "services/platform";
import { exposeStrapiError } from "utils";

const EMPTY_USER_FORM = {
    id: "",
    name: "",
    email: "",
    role: "user",
    password: "",
    pin: "",
    active: true,
};

const USER_ROLE_OPTIONS = [
    { value: "user", label: "Usuario" },
    { value: "subadmin", label: "Subadministrador" },
    { value: "admin", label: "Administrador" },
];

const PLAN_FEATURES = [
    { key: "createPrice", label: "Criar preco", description: "Fluxo principal para montar cartazes e materiais promocionais." },
    { key: "quickPrice", label: "Criacao rapida", description: "Entrada acelerada para operacao de precificacao recorrente." },
    { key: "batchPrint", label: "Impressao em lote", description: "Montagem e impressao de filas com rastreabilidade." },
    { key: "history", label: "Historico", description: "Consulta, restauracao e reimpressao do material emitido." },
    { key: "promotions", label: "Promocoes", description: "Fila programada de campanhas e distribuicao operacional." },
    { key: "labels", label: "Etiquetas", description: "Etiquetas unitarias e configuracao de impressao dedicada." },
    { key: "importItems", label: "Importacao", description: "Carga de base de itens e reconciliacao do catalogo." },
    { key: "reports", label: "Relatorios", description: "Leituras gerenciais e rastreabilidade de uso." },
    { key: "pdvIntegration", label: "Integracao PDV", description: "Conexao com origens externas de produto e preco." },
];

export default function useController() {
    const navigate = useNavigate();
    const { user, setUser, reloadMe } = useContext(CoreContext);
    const accessProfile = useMemo(() => buildAccessProfile(user || {}), [user]);
    const masterConfig = useMemo(() => readMasterConfig(), []);
    const canManageUsers = accessProfile.isAdmin || accessProfile.isSubadmin;

    const [loading, setLoading] = useState(false);
    const [managedUsers, setManagedUsers] = useState([]);
    const [userForm, setUserForm] = useState(EMPTY_USER_FORM);
    const [editingUserId, setEditingUserId] = useState("");
    const formRef = useRef();

    const init = useCallback(async () => {
        setLoading(true);

        try {
            const result = await ReadMe();
            if (result?.id) {
                setUser(result);
            }
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    const refreshManagedUsers = useCallback(() => {
        if (!canManageUsers) {
            setManagedUsers([]);
            return [];
        }

        const nextUsers = readLocalAccountsDirectory()
            .slice()
            .sort((left, right) => `${left.name || ""}`.localeCompare(`${right.name || ""}`));

        setManagedUsers(nextUsers);
        return nextUsers;
    }, [canManageUsers]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        refreshManagedUsers();
    }, [refreshManagedUsers]);

    const handleSave = useCallback(async () => {
        const form = formRef?.current?.getForm();
        if (!form || loading) return;

        const nextName = `${form?.name || ""}`.trim();
        if (!nextName) {
            toast.error("Informe um nome valido.");
            return;
        }

        if (nextName === `${user?.name || ""}`.trim()) {
            toast.info("Nenhuma alteracao para salvar.");
            return;
        }

        setLoading(true);

        try {
            const result = await UpdateMe({ name: nextName });

            if (!exposeStrapiError(result)) {
                toast.success("Perfil atualizado com sucesso.");
                await reloadMe();
            }
        } finally {
            setLoading(false);
        }
    }, [loading, reloadMe, user]);

    const formItems = useMemo(() => ([
        {
            ref: "name",
            label: "Nome de exibicao",
            placeholder: "Digite o nome que aparecera na conta",
            required: true,
            full: true,
        },
        {
            ref: "email",
            label: "E-mail de acesso",
            placeholder: "email@empresa.com",
            disabled: true,
            full: true,
        },
    ]), []);

    const header = useMemo(() => ({
        title: "Minha Conta",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Minha Conta" },
        ],
        actions: [],
    }), []);

    const actions = useMemo(() => ([]), []);

    const summaryItems = useMemo(() => ([
        { label: "Perfil", value: accessProfile.roleLabel || "--" },
        { label: "Plano", value: accessProfile.planLabel || "--" },
        { label: "Membro desde", value: formatDate(user?.createdAt || user?.created_at) },
        { label: "Ultima atualizacao", value: formatDate(user?.updatedAt || user?.updated_at, true) },
    ]), [accessProfile.planLabel, accessProfile.roleLabel, user]);

    const subscriptionItems = useMemo(() => ([
        { label: "Plano", value: accessProfile.planLabel || "--" },
        { label: "Status", value: accessProfile.subscriptionStatusLabel || "--" },
        {
            label: "Renovacao",
            value: accessProfile.subscription?.autoRenew === false ? "Manual" : "Automatica",
        },
        {
            label: "Expira em",
            value: formatDate(accessProfile.subscription?.expiryDate),
        },
    ]), [accessProfile.planLabel, accessProfile.subscription, accessProfile.subscriptionStatusLabel]);

    const planFeatureItems = useMemo(() => (
        PLAN_FEATURES.map(item => ({
            ...item,
            active: !!accessProfile.capabilities?.[item.key],
            statusLabel: accessProfile.capabilities?.[item.key] ? "Liberado" : "Bloqueado",
        }))
    ), [accessProfile.capabilities]);

    const supportChannels = useMemo(() => ([
        { label: "Contato", value: masterConfig.contactEmail || "Nao informado" },
        { label: "WhatsApp", value: masterConfig.contactWhatsApp || "Nao informado" },
        { label: "Telefone", value: masterConfig.contactPhone || "Nao informado" },
    ]), [masterConfig.contactEmail, masterConfig.contactPhone, masterConfig.contactWhatsApp]);

    const quickActions = useMemo(() => ([
        {
            key: "security",
            iconToken: "security",
            title: "Senha e seguranca",
            description: "Atualize a credencial da conta e mantenha o acesso protegido.",
            buttonLabel: "Abrir seguranca",
            action: () => navigate("/dashboard/me/password"),
        },
        {
            key: "support",
            iconToken: "support",
            title: "Abrir ticket",
            description: "Envie uma solicitacao ao suporte sem sair da area autenticada.",
            buttonLabel: "Falar com suporte",
            action: () => navigate("/dashboard/support/create"),
        },
    ]), [navigate]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuario SenaPrices",
        email: user?.email || "email@nao-informado.com",
        accountId: user?.code || user?.documentId || user?.id || "--",
    }), [user]);

    const sectionItems = useMemo(() => ([
        { key: "overview", label: "Conta", iconToken: "account" },
        { key: "plan", label: "Plano", iconToken: "billing" },
        { key: "security", label: "Seguranca", iconToken: "security" },
        ...(canManageUsers ? [{ key: "users", label: "Usuarios", iconToken: "users" }] : []),
    ]), [canManageUsers]);

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

    const handleSaveUser = useCallback(() => {
        if (!canManageUsers) {
            toast.error("Somente admin e subadmin podem gerenciar usuarios nesta area.");
            return;
        }

        try {
            if (editingUserId) {
                const updated = saveGovernedLocalAccount({ id: editingUserId }, userForm);

                if (!updated) {
                    throw new Error("Nao foi possivel localizar o usuario local para edicao.");
                }

                toast.success("Usuario atualizado com sucesso.");
            } else {
                createLocalAccount(userForm);
                toast.success("Usuario criado com sucesso.");
            }

            resetUserForm();
            refreshManagedUsers();
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel salvar o usuario.");
        }
    }, [canManageUsers, editingUserId, refreshManagedUsers, resetUserForm, userForm]);

    const handleToggleUserActive = useCallback((item) => {
        if (!canManageUsers) {
            return;
        }

        try {
            toggleLocalAccountActive(item);
            refreshManagedUsers();
            toast.success(item.active ? "Usuario desativado com sucesso." : "Usuario reativado com sucesso.");
        } catch (error) {
            toast.error(error?.message || "Nao foi possivel atualizar o status do usuario.");
        }
    }, [canManageUsers, refreshManagedUsers]);

    const managementSummaryItems = useMemo(() => {
        const counters = {
            admin: 0,
            subadmin: 0,
            user: 0,
        };

        managedUsers.forEach(item => {
            if (item.role === "admin") counters.admin += 1;
            else if (item.role === "subadmin") counters.subadmin += 1;
            else if (item.role === "user") counters.user += 1;
        });

        return [
            { label: "Total local", value: `${managedUsers.length}` },
            { label: "Admins", value: `${counters.admin}` },
            { label: "Subadmins", value: `${counters.subadmin}` },
            { label: "Usuarios", value: `${counters.user}` },
        ];
    }, [managedUsers]);

    return {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
        subscriptionItems,
        planFeatureItems,
        supportChannels,
        quickActions,
        sectionItems,
        canManageUsers,
        managedUsers,
        managementSummaryItems,
        userForm,
        userRoleOptions: USER_ROLE_OPTIONS,
        editingUserId,
        applyUserFormPatch,
        handleSave,
        resetUserForm,
        startEditingUser,
        handleSaveUser,
        handleToggleUserActive,
    };
}

function formatDate(value, includeTime = false) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return includeTime ? parsed.format("L [as] LT") : parsed.format("L");
}
