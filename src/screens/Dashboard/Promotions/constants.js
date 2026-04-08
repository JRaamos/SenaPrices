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
    { value: "manual", label: "Criar Preço" },
    { value: "quick", label: "Criação Rápida" },
];

export const PROMOTION_GUIDELINES = [
    {
        title: "Monte a fila a partir do histórico real",
        description: "Promoções devem reaproveitar registros que já passaram pelos fluxos de criação e revisão, evitando cartazes divergentes.",
    },
    {
        title: "Use vigência clara",
        description: "Definir início e fim da promoção reduz risco de material antigo permanecer ativo na operação.",
    },
    {
        title: "Imprima a partir da fila",
        description: "Ao concentrar a execução na fila, o sistema preserva rastreabilidade para futuras etapas de lote, auditoria e manutenção.",
    },
];
