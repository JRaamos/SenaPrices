export const ITEM_UNIT_OPTIONS = [
    { value: "unidade", label: "Unidade" },
    { value: "cada", label: "Cada" },
    { value: "kg", label: "Kg" },
    { value: "litro", label: "Litro" },
    { value: "pacote", label: "Pacote" },
    { value: "caixa", label: "Caixa" },
    { value: "saco", label: "Saco" },
    { value: "fardo", label: "Fardo" },
    { value: "100g", label: "100g" },
];

export const ITEM_DEFAULT_FORM_VALUES = {
    internalCode: "",
    ean13: "",
    description1: "",
    description2: "",
    description3: "",
    section: "",
    unit: "unidade",
};

export const ITEM_LIMITS = {
    internalCode: 24,
    ean13: 13,
    description1: 80,
    description2: 60,
    description3: 60,
    section: 40,
    recentMax: 5,
};

export const ITEM_GUIDELINES = [
    {
        title: "Identificador sem colisao",
        description: "Evite duplicidade de EAN ou codigo interno para preservar rastreabilidade entre cadastro e operacao.",
    },
    {
        title: "Descricao pronta para cartaz",
        description: "Mantenha a descricao principal curta e reserve os complementos para dados que realmente ajudam a leitura.",
    },
    {
        title: "Base reutilizavel",
        description: "O cadastro criado aqui serve como fundacao para listagem, importacao e precificacao nas proximas etapas.",
    },
];
