import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { Create, Delete, ReadOne, Update } from "services/core";
import { exposeStrapiError, normalizeStrapiRegister } from "utils";
import { optionsSupport } from "utils/options";

const DEFAULT_STATUS = "opened";

const STATUS_META = {
    opened: {
        label: "Aberto",
        color: "blue",
        helper: "Ticket registrado e aguardando atendimento.",
    },
    answered: {
        label: "Respondido",
        color: "green",
        helper: "Chamado atualizado com retorno do suporte.",
    },
    closed: {
        label: "Fechado",
        color: "red",
        helper: "Atendimento concluído e ticket encerrado.",
    },
};

const GUIDELINES = [
    {
        title: "Explique o cenário completo",
        description: "Descreva onde o problema acontece, qual ação foi executada e qual resultado era esperado.",
    },
    {
        title: "Mostre o impacto real",
        description: "Informe se o erro impede o uso, atrasa a operação ou afeta apenas uma parte do fluxo.",
    },
    {
        title: "Evite dados sensíveis",
        description: "Não inclua senhas, tokens, chaves privadas ou qualquer dado confidencial na descrição do ticket.",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const goBack = useCallback(() => n(-1), [n]);

    const { id } = useParams();

    const { user, setModal } = useContext(CoreContext);

    const formRef = useRef();

    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(null);

    const isEditing = !!id;

    const init = useCallback(async () => {
        if (!id) return;

        setLoading(true);

        try {
            const result = await ReadOne("supports", id, null, null);

            if (result && !exposeStrapiError(result)) {
                const normalized = normalizeStrapiRegister(result);
                setRegister({
                    ...normalized,
                    support_status: normalized?.support_status || DEFAULT_STATUS,
                });
            }
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handleSave = useCallback(async () => {
        const form = formRef?.current?.getForm();
        if (!form || loading) return;

        const nextTitle = `${form?.title || ""}`.trim();
        const nextDescription = `${form?.description || ""}`.trim();
        const nextStatus = isEditing ? (form?.support_status || register?.support_status || DEFAULT_STATUS) : DEFAULT_STATUS;

        if (nextTitle.length < 6) {
            toast.error("Informe um título com pelo menos 6 caracteres.");
            return;
        }

        if (nextDescription.length < 20) {
            toast.error("Descreva o chamado com pelo menos 20 caracteres.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                title: nextTitle,
                description: nextDescription,
                support_status: nextStatus,
                ...(user?.documentId ? {
                    user: {
                        set: [user.documentId],
                    },
                } : {}),
            };

            const result = isEditing
                ? await Update("supports", { data: payload }, id)
                : await Create("supports", { data: payload });

            if (!exposeStrapiError(result)) {
                toast.success(isEditing ? "Ticket atualizado com sucesso." : "Ticket criado com sucesso.");
                navigate("dashboard/support");
            }
        } finally {
            setLoading(false);
        }
    }, [id, isEditing, loading, navigate, register, user]);

    const handleRemove = useCallback(async () => {
        if (!id) return;

        setLoading(true);

        try {
            const result = await Delete("supports", id);

            if (!exposeStrapiError(result)) {
                toast.success("Ticket excluído com sucesso.");
                navigate("dashboard/support");
            }
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    const confirmRemove = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja realmente excluir este ticket?",
            text: "Após a exclusão não será possível recuperar o histórico deste atendimento.",
            action: () => handleRemove(),
        });
    }, [handleRemove, setModal]);

    const goToSupportList = useCallback(() => navigate("dashboard/support"), [navigate]);
    const goToProfile = useCallback(() => navigate("dashboard/me"), [navigate]);

    const safeRegister = useMemo(() => ({
        support_status: DEFAULT_STATUS,
        ...register,
    }), [register]);

    const currentStatus = safeRegister?.support_status || DEFAULT_STATUS;
    const statusMeta = STATUS_META[currentStatus] || STATUS_META[DEFAULT_STATUS];

    const header = useMemo(() => ({
        title: isEditing ? "Gerenciar ticket de suporte" : "Novo ticket de suporte",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Suporte", to: "/dashboard/support" },
            { label: isEditing ? "Ticket" : "Novo ticket" },
        ],
        actions: [
            {
                label: "Todos os tickets",
                icon: "proposal",
                rounded: true,
                outline: true,
                color: "primary",
                action: goToSupportList,
            },
            {
                label: "Meu perfil",
                icon: "user",
                rounded: true,
                color: "secondary",
                action: goToProfile,
            },
        ],
    }), [goToProfile, goToSupportList, isEditing]);

    const actions = useMemo(() => ([
        !isEditing ? null : {
            label: "Excluir ticket",
            color: "error",
            rounded: true,
            left: true,
            outline: true,
            action: confirmRemove,
        },
        {
            label: "Voltar",
            color: "primary",
            rounded: true,
            outline: true,
            action: goBack,
        },
        {
            label: isEditing ? "Salvar alterações" : "Criar ticket",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleSave,
        },
    ].filter(Boolean)), [confirmRemove, goBack, handleSave, isEditing]);

    const formItems = useMemo(() => {
        const baseItems = [
            {
                ref: "title",
                label: "Título do ticket",
                placeholder: "Ex: Impressão falhando ao gerar cartaz",
                required: true,
                full: true,
            },
            {
                ref: "description",
                type: "textarea",
                label: "Descrição detalhada",
                placeholder: "Explique o problema, o impacto na operação e os passos para reproduzir.",
                required: true,
                full: true,
            },
        ];

        if (!isEditing) {
            return baseItems;
        }

        return [
            baseItems[0],
            {
                ref: "support_status",
                label: "Status do atendimento",
                placeholder: "Selecione o status",
                options: optionsSupport,
                half: true,
                required: true,
            },
            baseItems[1],
        ];
    }, [isEditing]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const summaryItems = useMemo(() => ([
        { label: "Solicitante", value: user?.email || "--" },
        { label: "Modo da tela", value: isEditing ? "Edição de ticket" : "Abertura de ticket" },
        { label: "Status atual", value: statusMeta.label },
        { label: "Criado em", value: formatDate(safeRegister?.createdAt || safeRegister?.created_at) },
    ]), [isEditing, safeRegister, statusMeta.label, user]);

    const quickActions = useMemo(() => ([
        {
            key: "list",
            icon: "/icons/proposal.svg",
            title: "Todos os tickets",
            description: "Acompanhe o histórico dos chamados e abra rapidamente qualquer ticket existente.",
            buttonLabel: "Ver tickets",
            action: goToSupportList,
        },
        {
            key: "profile",
            icon: "/icons/user.svg",
            title: "Minha conta",
            description: "Volte para seus dados principais e para as configurações de segurança da conta.",
            buttonLabel: "Abrir perfil",
            action: goToProfile,
        },
    ]), [goToProfile, goToSupportList]);

    const guidelines = useMemo(() => GUIDELINES, []);

    const statusCard = useMemo(() => ({
        label: statusMeta.label,
        helper: statusMeta.helper,
        color: statusMeta.color,
    }), [statusMeta.color, statusMeta.helper, statusMeta.label]);

    useEffect(() => {
        init();
    }, [init]);

    return {
        loading,
        register: safeRegister,
        formRef,
        formItems,
        header,
        actions,
        profile,
        summaryItems,
        quickActions,
        guidelines,
        statusCard,
        isEditing,
    };
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}
