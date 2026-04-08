import {
    ORIENTATION_OPTIONS,
    PAPER_SIZE_OPTIONS,
    PRICE_TYPE_OPTIONS,
} from "../CreatePrice/constants";

export { ORIENTATION_OPTIONS, PAPER_SIZE_OPTIONS, PRICE_TYPE_OPTIONS };

export const QUICK_PRICE_DEFAULT_ROW = {
    id: "",
    query: "",
    subtitle: "",
    cashPrice: "",
    fromPrice: "",
    toPrice: "",
    clubRegularPrice: "",
    clubPrice: "",
    specialQuantity: "3",
    specialPrice: "",
};

export const QUICK_PRICE_DEFAULT_DRAFT = {
    priceType: "avista",
    paperSize: "A5",
    orientation: "portrait",
    offerTitle: "Oferta rapida",
    validUntil: "",
    observation: "",
    showBarcode: true,
    showValidity: true,
    rows: [],
};

export const QUICK_PRICE_LIMITS = {
    query: 80,
    subtitle: 60,
    observation: 60,
    offerTitle: 30,
    rowsMax: 30,
    recentMax: 6,
};

export const QUICK_PRICE_GUIDELINES = [
    {
        title: "Entrada curta e objetiva",
        description: "Use nomes curtos e identificaveis para manter ritmo de digitacao e leitura rapida no cartaz.",
    },
    {
        title: "Lotes sem retrabalho",
        description: "Revise todas as linhas validas antes de imprimir o lote para evitar desperdicio operacional.",
    },
    {
        title: "Sem promessas falsas de integracao",
        description: "Nesta etapa, a tela assume entrada manual segura e nao depende de catalogo ou PDV nao implementados.",
    },
];
