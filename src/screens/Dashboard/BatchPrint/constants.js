export const BATCH_PRINT_DEFAULT_DRAFT = {
    search: "",
    source: "",
    paperSize: "",
    selectedKeys: [],
};

export const BATCH_PRINT_SOURCE_OPTIONS = [
    { value: "", label: "Todas as origens" },
    { value: "promotion", label: "Promoções programadas" },
    { value: "history", label: "Histórico operacional" },
];

export const BATCH_PRINT_PAPER_OPTIONS = [
    { value: "", label: "Todos os formatos" },
    { value: "A6", label: "A6" },
    { value: "A5", label: "A5" },
    { value: "A4", label: "A4" },
];

export const BATCH_PRINT_GUIDELINES = [
    {
        title: "Monte o lote sobre fontes reais",
        description: "A selecao usa Histórico e Promoções para evitar duplicidade de base e manter a impressao coerente com o que ja foi produzido.",
    },
    {
        title: "Respeite o recorte por perfil",
        description: "Usuários operacionais enxergam apenas o próprio histórico e as promoções atribuídas ao seu usuário, sem expor filas administrativas.",
    },
    {
        title: "Impressão atualiza a trilha",
        description: "Ao imprimir o lote, os registros subjacentes recebem confirmacao de impressao para manter rastreabilidade operacional.",
    },
];
