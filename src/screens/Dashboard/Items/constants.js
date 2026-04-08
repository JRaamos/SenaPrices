export const DEFAULT_ITEMS_FILTERS = {
    section: "",
    unit: "",
    hasEan: "",
    hasInternalCode: "",
};

export const YES_NO_FILTER_OPTIONS = [
    { value: "yes", label: "Sim" },
    { value: "no", label: "Nao" },
];

export const ITEMS_GUIDELINES = [
    {
        title: "Edite a mesma base do catalogo",
        description: "Mantenha o ajuste de itens centralizado aqui para evitar divergencia entre cadastro, busca e criacao de preco.",
    },
    {
        title: "Reaproveite sem duplicar identificadores",
        description: "Use duplicacao apenas quando fizer sentido comercial e sempre revise EAN e codigo interno antes de salvar.",
    },
    {
        title: "Acione o preco a partir do item",
        description: "Quando o item ja estiver consistente, siga para a criacao de preco usando a mesma base para reduzir retrabalho.",
    },
];
