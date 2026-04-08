export const IMPORT_TARGET_FIELDS = [
    { key: "internalCode", label: "Codigo interno", required: false },
    { key: "ean13", label: "EAN-13", required: false },
    { key: "description1", label: "Descrição principal", required: true },
    { key: "description2", label: "Descrição complementar", required: false },
    { key: "description3", label: "Descrição adicional", required: false },
    { key: "section", label: "Secao", required: false },
    { key: "unit", label: "Unidade", required: false },
];

export const IMPORT_CONFLICT_OPTIONS = [
    {
        value: "skip",
        label: "Ignorar duplicados",
        helper: "Linhas que ja encontrarem item por EAN ou codigo interno serao ignoradas.",
    },
    {
        value: "update",
        label: "Atualizar existentes",
        helper: "Quando houver correspondencia, o item existente sera atualizado com os dados da linha.",
    },
];

export const IMPORT_TEMPLATE_COLUMNS = [
    "codigo_interno",
    "ean13",
    "descricao1",
    "descricao2",
    "descricao3",
    "secao",
    "unidade",
];

export const IMPORT_TEMPLATE_ROWS = [
    ["CAFE-500", "7896003701685", "CAFE PILAO 500G", "TORRACAO MEDIA", "EMBALAGEM ALMOFADA", "Mercearia", "unidade"],
    ["ARROZ-5KG", "7893500001231", "ARROZ TIPO 1 5KG", "GRAOS SELECIONADOS", "", "Mercearia", "kg"],
];

export const IMPORT_GUIDELINES = [
    {
        title: "Mapeie antes de importar",
        description: "Confirme o relacionamento entre as colunas do arquivo e os campos do catalogo antes de executar a carga.",
    },
    {
        title: "Escolha a estrategia de conflito",
        description: "Defina se linhas duplicadas devem ser ignoradas ou usadas para atualizar a base existente.",
    },
    {
        title: "Importe para a mesma base",
        description: "A carga desta tela alimenta diretamente o catálogo que já sustenta cadastro, listagem e criação de preço.",
    },
];

export const IMPORT_PREVIEW_LIMIT = 12;
