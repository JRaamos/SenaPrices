export const REPORT_PERIOD_OPTIONS = [
    { value: "7d", label: "Últimos 7 dias" },
    { value: "30d", label: "Últimos 30 dias" },
    { value: "90d", label: "Últimos 90 dias" },
    { value: "all", label: "Todo o período" },
];

export const REPORT_GUIDELINES = [
    {
        title: "Use o relatório como auditoria operacional",
        description: "O painel foi desenhado para reunir rastreabilidade real dos módulos já ativos e reduzir decisões com base em memória informal.",
    },
    {
        title: "Priorize leitura por período",
        description: "Acompanhar janelas curtas ajuda a identificar desvios na operação, excesso de retrabalho e campanhas fora do ritmo esperado.",
    },
    {
        title: "Aja sobre os gargalos recorrentes",
        description: "Fontes, usuários e seções com volume atípico indicam onde a equipe precisa de reforço, revisão ou automação futura.",
    },
];

export const REPORT_SOURCE_LABELS = {
    manual: "Criar Preço",
    quick: "Criação Rápida",
    promotion: "Promoções",
    batch: "Impressão em Lote",
    labels: "Etiquetas",
};

export const REPORT_SOURCE_COLORS = {
    manual: "#2563eb",
    quick: "#0f766e",
    promotion: "#ea580c",
    batch: "#7c3aed",
    labels: "#ca8a04",
};
