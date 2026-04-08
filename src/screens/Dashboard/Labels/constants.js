export const DEFAULT_LABEL_FILTERS = {
    search: "",
    section: "",
};

export const LABEL_GUIDELINES = [
    {
        title: "Etiqueta nasce da mesma base do cartaz",
        description: "A seleção reaproveita itens do catálogo e a última precificação vinculada por EAN-13 ou código interno, evitando divergência entre gôndola e material promocional.",
    },
    {
        title: "Sem preço válido, sem impressão",
        description: "Itens sem rastreabilidade de preço continuam visíveis para manutenção, mas ficam bloqueados para emissão até que uma precificação consistente exista.",
    },
    {
        title: "ZPL e HTML no mesmo fluxo",
        description: "A mesma seleção operacional gera impressão comum ou código Zebra ZPL, sem duplicar configuração nem montar arquivos paralelos.",
    },
];
