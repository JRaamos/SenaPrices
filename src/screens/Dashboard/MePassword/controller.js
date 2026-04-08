import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { exposeStrapiError } from "utils";
import { ReadMe, UpdateMePassword } from "services/me";

const PASSWORD_RULES = [
    {
        key: "length",
        validate: value => `${value || ""}`.length >= 6,
        message: "A senha precisa ter pelo menos 6 caracteres.",
    },
    {
        key: "uppercase",
        validate: value => /[A-Z]/.test(`${value || ""}`),
        message: "A senha precisa conter ao menos uma letra maiúscula.",
    },
    {
        key: "number",
        validate: value => /[0-9]/.test(`${value || ""}`),
        message: "A senha precisa conter ao menos um número.",
    },
    {
        key: "special",
        validate: value => /[-./',;&@#*)(_+:"´`~]/.test(`${value || ""}`),
        message: "A senha precisa conter ao menos um caractere especial.",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const goBack = useCallback(() => n(-1), [n]);

    const { user, setUser } = useContext(CoreContext);

    const [loading, setLoading] = useState(false);

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

    const handleSave = useCallback(async () => {
        const form = formRef?.current?.getForm();
        if (!form || loading) return;

        const nextPassword = `${form?.password || ""}`;
        const confirmPassword = `${form?.cpassword || ""}`;

        if (/\s/.test(nextPassword)) {
            toast.error("A senha não pode conter espaços em branco.");
            return;
        }

        if (nextPassword !== confirmPassword) {
            toast.error("Senha e confirmação precisam ser iguais.");
            return;
        }

        const invalidRule = PASSWORD_RULES.find(rule => !rule.validate(nextPassword));
        if (invalidRule) {
            toast.error(invalidRule.message);
            return;
        }

        setLoading(true);

        try {
            const result = await UpdateMePassword({
                password: nextPassword,
            });

            if (!exposeStrapiError(result)) {
                toast.success("Senha atualizada com sucesso.");
                goBack();
            }
        } finally {
            setLoading(false);
        }
    }, [goBack, loading]);

    const goToProfile = useCallback(() => navigate("dashboard/me"), [navigate]);
    const goToSupport = useCallback(() => navigate("dashboard/support/create"), [navigate]);

    const formItems = useMemo(() => ([
        {
            ref: "password",
            placeholder: "********",
            label: "Nova senha",
            type: "password",
            required: true,
            half: true,
        },
        {
            ref: "cpassword",
            placeholder: "********",
            label: "Confirme a nova senha",
            type: "password",
            required: true,
            half: true,
            onSubmitEditing: handleSave,
        },
        { passwordValidation: true, full: true },
    ]), [handleSave]);

    const header = useMemo(() => ({
        title: "Senha e segurança",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Minha Conta", to: "/dashboard/me" },
            { label: "Senha e segurança" },
        ],
        actions: [
            {
                label: "Meu perfil",
                icon: "user",
                rounded: true,
                outline: true,
                color: "primary",
                action: goToProfile,
            },
            {
                label: "Abrir suporte",
                icon: "proposal",
                rounded: true,
                color: "secondary",
                action: goToSupport,
            },
        ],
    }), [goToProfile, goToSupport]);

    const actions = useMemo(() => ([
        {
            label: "Voltar",
            color: "primary",
            rounded: true,
            outline: true,
            action: goBack,
        },
        {
            label: "Salvar nova senha",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleSave,
        },
    ]), [goBack, handleSave]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const summaryItems = useMemo(() => ([
        { label: "Email de acesso", value: user?.email || "--" },
        { label: "Perfil protegido", value: user?.name || "--" },
        { label: "Conta criada em", value: formatDate(user?.createdAt || user?.created_at) },
        { label: "Política mínima", value: "6+ caracteres, maiúscula, número e símbolo" },
    ]), [user]);

    const quickActions = useMemo(() => ([
        {
            key: "profile",
            icon: "/icons/user.svg",
            title: "Meu perfil",
            description: "Revise seus dados principais e mantenha as informações da conta atualizadas.",
            buttonLabel: "Abrir perfil",
            action: goToProfile,
        },
        {
            key: "support",
            icon: "/icons/proposal.svg",
            title: "Suporte",
            description: "Acione o time responsável se precisar de ajuda com acesso, conta ou manutenção.",
            buttonLabel: "Abrir ticket",
            action: goToSupport,
        },
    ]), [goToProfile, goToSupport]);

    const guidelines = useMemo(() => ([
        {
            title: "Use uma senha exclusiva",
            description: "Evite reaproveitar senhas usadas em e-mail, bancos ou outros sistemas críticos.",
        },
        {
            title: "Troque ao menor sinal de risco",
            description: "Se alguém viu sua senha ou se o acesso foi compartilhado, atualize imediatamente.",
        },
        {
            title: "Armazene com segurança",
            description: "Prefira um gerenciador de senhas e nunca envie credenciais em mensagens ou planilhas.",
        },
    ]), []);

    useEffect(() => {
        init();
    }, [init]);

    return {
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
        quickActions,
        guidelines,
    };
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}
