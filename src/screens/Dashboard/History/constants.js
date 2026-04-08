export const HISTORY_SOURCE_OPTIONS = [
    { value: "", label: "Todas as fontes" },
    { value: "manual", label: "Criar Preco" },
    { value: "quick", label: "Criacao Rapida" },
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
        title: "Use o historico como trilha operacional",
        description: "Cada registro aqui nasce dos fluxos reais de criacao e impressao e pode ser restaurado sem recriar o cartaz do zero.",
    },
    {
        title: "Reimprima a partir do mesmo registro",
        description: "Quando precisar repetir uma acao, prefira reimprimir ou restaurar o item historico em vez de gerar uma nova variacao manualmente.",
    },
    {
        title: "Mantenha a base auditavel",
        description: "Excluir deve ser excecao. O historico foi desenhado para sustentar revisao operacional e, nas proximas etapas, alimentar promocoes e lotes.",
    },
];
