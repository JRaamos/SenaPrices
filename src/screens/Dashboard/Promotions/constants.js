export const PROMOTION_DEFAULT_FORM_VALUES = {
    name: "",
    description: "",
    validFrom: new Date().toISOString().slice(0, 10),
    validTo: "",
    paperSize: "A5",
    orientation: "portrait",
    selectedEntryIds: [],
    assignedUserIds: [],
};

export const PROMOTION_PAPER_SIZE_OPTIONS = [
    { value: "A6", label: "A6" },
    { value: "A5", label: "A5" },
    { value: "A4", label: "A4" },
];

export const PROMOTION_ORIENTATION_OPTIONS = [
    { value: "portrait", label: "Retrato" },
    { value: "landscape", label: "Paisagem" },
];

export const PROMOTION_SOURCE_OPTIONS = [
    { value: "", label: "Todas as fontes" },
    { value: "manual", label: "Criar Preco" },
    { value: "quick", label: "Criacao Rapida" },
];

export const PROMOTION_GUIDELINES = [
    {
        title: "Monte a fila a partir do historico real",
        description: "Promocoes devem reaproveitar registros que ja passaram pelos fluxos de criacao e revisao, evitando cartazes divergentes.",
    },
    {
        title: "Use vigencia clara",
        description: "Definir inicio e fim da promocao reduz risco de material antigo permanecer ativo na operacao.",
    },
    {
        title: "Imprima a partir da fila",
        description: "Ao concentrar a execucao na fila, o sistema preserva rastreabilidade para futuras etapas de lote, auditoria e manutencao.",
    },
];
