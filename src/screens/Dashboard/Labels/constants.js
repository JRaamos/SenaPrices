export const DEFAULT_LABEL_FILTERS = {
    search: "",
    section: "",
};

export const LABEL_GUIDELINES = [
    {
        title: "Etiqueta nasce da mesma base do cartaz",
        description: "A selecao reaproveita itens do catalogo e a ultima precificacao vinculada por EAN-13 ou codigo interno, evitando divergencia entre gondola e material promocional.",
    },
    {
        title: "Sem preco valido, sem impressao",
        description: "Itens sem rastreabilidade de preco continuam visiveis para manutencao, mas ficam bloqueados para emissao ate que uma precificacao consistente exista.",
    },
    {
        title: "ZPL e HTML no mesmo fluxo",
        description: "A mesma selecao operacional gera impressao comum ou codigo Zebra ZPL, sem duplicar configuracao nem montar arquivos paralelos.",
    },
];
