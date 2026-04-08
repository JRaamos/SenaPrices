import React, { useCallback, useContext, useMemo } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import useList from "hooks/useList";
import {
    ButtonContainer,
    Icon,
    IconButton,
    TableLabelColor,
    TableLabelContainer,
} from "ui/styled";
import { optionsSupport } from "utils/options";

const STATUS_COLORS = {
    opened: "blue",
    answered: "green",
    closed: "red",
};

const QUICK_GUIDELINES = [
    {
        title: "Atualize o status corretamente",
        description: "Manter o andamento do ticket coerente reduz retrabalho e melhora o acompanhamento do time.",
    },
    {
        title: "Centralize o histórico",
        description: "Concentre respostas e contexto no próprio ticket para facilitar manutenção futura e auditoria.",
    },
    {
        title: "Priorize títulos objetivos",
        description: "Chamados com títulos claros ficam mais fáceis de localizar na rotina operacional.",
    },
];

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { user } = useContext(CoreContext);

    const formPage = "dashboard/support/create";

    const { loading, registers, pagination } = useList({
        table: "supports",
        paginate: true,
    });

    const header = useMemo(() => ({
        title: "Suporte",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Suporte" },
        ],
        actions: [
            {
                label: "Novo ticket",
                rounded: true,
                color: "primary",
                action: () => navigate(formPage),
            },
            {
                label: "Meu perfil",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/me"),
            },
        ],
    }), [navigate]);

    const rows = useMemo(() => (
        (registers || []).map(item => ({
            id: item?.documentId,
            code: item?.documentId || "--",
            title: item?.title || "--",
            description: item?.description || "Sem descrição informada.",
            date: moment(item?.createdAt).isValid() ? moment(item?.createdAt).format("L") : "--",
            relativeDate: moment(item?.createdAt).isValid() ? moment(item?.createdAt).fromNow() : "--",
            status: item?.support_status || "opened",
            statusColor: STATUS_COLORS[item?.support_status] || "blue",
        }))
    ), [registers]);

    const columns = useMemo(() => ([
        {
            title: "Título",
            renderCell: ({ row }) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "420px" }}>
                    <div style={{ color: "#111827", fontSize: "14px", fontWeight: 700, lineHeight: "20px" }}>
                        {row?.title}
                    </div>
                    <div style={{ color: "#64748B", fontSize: "12px", lineHeight: "18px" }}>
                        {row?.description}
                    </div>
                </div>
            ),
        },
        {
            title: "Status",
            renderCell: ({ row }) => (
                <TableLabelContainer>
                    <TableLabelColor color={row?.statusColor}>
                        {optionsSupport?.find(option => option.id === row?.status)?.title}
                    </TableLabelColor>
                </TableLabelContainer>
            ),
        },
        {
            title: "Data",
            renderCell: ({ row }) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div style={{ color: "#111827", fontSize: "13px", fontWeight: 700, lineHeight: "19px" }}>
                        {row?.date}
                    </div>
                    <div style={{ color: "#64748B", fontSize: "11px", lineHeight: "16px" }}>
                        {row?.relativeDate}
                    </div>
                </div>
            ),
        },
        {
            title: "Ticket",
            renderCell: ({ row }) => (
                <div style={{ color: "#1D4ED8", fontSize: "12px", fontWeight: 700, fontFamily: "monospace" }}>
                    {row?.code}
                </div>
            ),
        },
        {
            title: " ",
            renderCell: ({ row }) => (
                <ButtonContainer onClick={() => navigate(`${formPage}/${row?.id}`)}>
                    <IconButton>
                        <Icon icon="chevron-right" pointer />
                    </IconButton>
                </ButtonContainer>
            ),
        },
    ]), [navigate]);

    const summaryItems = useMemo(() => {
        const total = pagination?.total || rows.length;
        const opened = rows.filter(item => item.status === "opened").length;
        const answered = rows.filter(item => item.status === "answered").length;
        const closed = rows.filter(item => item.status === "closed").length;

        return [
            { label: "Tickets cadastrados", value: `${total}` },
            { label: "Em aberto na página", value: `${opened}` },
            { label: "Respondidos na página", value: `${answered}` },
            { label: "Fechados na página", value: `${closed}` },
        ];
    }, [pagination?.total, rows]);

    const latestTicket = useMemo(() => rows?.[0] || null, [rows]);

    const quickActions = useMemo(() => ([
        {
            key: "new-ticket",
            icon: "/icons/proposal.svg",
            title: "Novo ticket",
            description: "Abra um novo chamado com o contexto necessário para análise do suporte.",
            buttonLabel: "Criar ticket",
            action: () => navigate(formPage),
        },
        {
            key: "profile",
            icon: "/icons/user.svg",
            title: "Minha conta",
            description: "Volte para seu perfil e para as configurações pessoais e de segurança.",
            buttonLabel: "Abrir perfil",
            action: () => navigate("dashboard/me"),
        },
    ]), [navigate]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || "--",
    }), [user]);

    const latestTicketCard = useMemo(() => ({
        title: latestTicket?.title || "Nenhum ticket aberto ainda",
        description: latestTicket?.description || "Assim que um ticket for criado, ele aparecerá aqui para acesso rápido.",
        status: latestTicket
            ? (optionsSupport?.find(option => option.id === latestTicket.status)?.title || "Aberto")
            : "Sem registros",
        date: latestTicket?.date || "--",
    }), [latestTicket]);

    const table = useMemo(() => ({
        rows,
        columns,
        loading,
        config: {
            tabs: {
                all: "Todos",
                ref: "status",
                options: optionsSupport,
            },
            search: { placeholder: "Pesquisar ticket" },
            filter: { placeholder: "Filtros" },
            pagination,
        },
    }), [rows, columns, loading, pagination]);

    return {
        header,
        loading,
        table,
        summaryItems,
        quickActions,
        quickGuidelines: QUICK_GUIDELINES,
        profile,
        latestTicketCard,
    };
}

function formatDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("L");
}
