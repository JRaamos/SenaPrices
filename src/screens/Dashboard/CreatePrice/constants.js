export const PRICE_TYPE_OPTIONS = [
    {
        value: "avista",
        label: "A vista",
        helper: "Preco unico com destaque direto no cartaz.",
    },
    {
        value: "depor",
        label: "De por",
        helper: "Compara o valor anterior com a oferta atual.",
    },
    {
        value: "clube",
        label: "Clube",
        helper: "Destaca a condicao especial para membros do clube.",
    },
    {
        value: "ofertaespecial",
        label: "Oferta especial",
        helper: "Modelo para campanhas como 3 por R$ 10,00.",
    },
];

export const PAPER_SIZE_OPTIONS = [
    { value: "A6", label: "A6" },
    { value: "A5", label: "A5" },
    { value: "A4", label: "A4" },
    { value: "A3", label: "A3" },
];

export const ORIENTATION_OPTIONS = [
    { value: "portrait", label: "Retrato" },
    { value: "landscape", label: "Paisagem" },
];

export const UNIT_OPTIONS = [
    { value: "unidade", label: "Unidade" },
    { value: "kg", label: "Kg" },
    { value: "litro", label: "Litro" },
    { value: "pacote", label: "Pacote" },
    { value: "caixa", label: "Caixa" },
];

export const SPECIAL_LAYOUT_OPTIONS = [
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" },
];

export const QUALITY_GUIDELINES = [
    {
        title: "Descricao clara e objetiva",
        description: "Use o nome principal do produto de forma curta para manter leitura rapida no ponto de venda.",
    },
    {
        title: "Dados validos antes da impressao",
        description: "Revise preco, validade e regra promocional para evitar retrabalho e divergencia operacional.",
    },
    {
        title: "Nada sensivel no cartaz",
        description: "Nao inclua observacoes internas, codigos confidenciais ou dados que nao devam aparecer ao cliente.",
    },
];

export const DEFAULT_FORM_VALUES = {
    priceType: "avista",
    productName: "",
    productSubtitle: "",
    sectionName: "",
    unitLabel: "unidade",
    internalCode: "",
    eanCode: "",
    cashPrice: "",
    fromPrice: "",
    toPrice: "",
    clubRegularPrice: "",
    clubPrice: "",
    clubLabel: "Oferta Clube",
    specialQuantity: "3",
    specialPrice: "",
    specialLayout: "horizontal",
    paperSize: "A5",
    orientation: "portrait",
    offerTitle: "Oferta da semana",
    validUntil: "",
    observation: "",
    showBarcode: true,
    showValidity: true,
};

export const PRICE_STUDIO_LIMITS = {
    productName: 80,
    productSubtitle: 80,
    sectionName: 40,
    internalCode: 24,
    eanCode: 13,
    offerTitle: 30,
    observation: 60,
    clubLabel: 28,
    recentMax: 6,
};
