export const HISTORY_SOURCE_OPTIONS = [
    { value: "", label: "Todas as fontes" },
    { value: "manual", label: "Criar Preço" },
    { value: "quick", label: "Criação Rápida" },
];

export const HISTORY_STATUS_OPTIONS = [
    { value: "", label: "Todos os status" },
    { value: "saved", label: "Somente salvos" },
    { value: "printed", label: "Somente impressos" },
];

export const DEFAULT_HISTORY_FILTERS = {
    source: "",
    status: "",
};

export const HISTORY_GUIDELINES = [
    {
        title: "Use o histórico como trilha operacional",
        description: "Cada registro aqui nasce dos fluxos reais de criação e impressão e pode ser restaurado sem recriar o cartaz do zero.",
    },
    {
        title: "Reimprima a partir do mesmo registro",
        description: "Quando precisar repetir uma ação, prefira reimprimir ou restaurar o item histórico em vez de gerar uma nova variação manualmente.",
    },
    {
        title: "Mantenha a base auditavel",
        description: "Excluir deve ser exceção. O histórico foi desenhado para sustentar revisão operacional e, nas próximas etapas, alimentar promoções e lotes.",
    },
];
