export const PDV_TYPE_OPTIONS = [
    {
        value: "api",
        label: "API REST",
        description: "Integra via HTTP/HTTPS com sistemas que expõem produtos e preços por endpoint seguro.",
        icon: "/icons/products.svg",
    },
    {
        value: "database",
        label: "Banco de Dados",
        description: "Prepara a conexão com base externa para leitura controlada por backend ou worker dedicado.",
        icon: "/icons/training.svg",
    },
    {
        value: "csv",
        label: "CSV / Arquivo",
        description: "Usa arquivo monitorado como fonte de entrada para cenários legados ou integrações intermediárias.",
        icon: "/icons/products.svg",
    },
    {
        value: "none",
        label: "Sem integração",
        description: "Mantém a operação manual enquanto a base automática ainda não foi habilitada.",
        icon: "/icons/proposal.svg",
    },
];

export const PDV_SYNC_INTERVAL_OPTIONS = [
    { value: 15, label: "A cada 15 min" },
    { value: 30, label: "A cada 30 min" },
    { value: 60, label: "A cada hora" },
    { value: 360, label: "A cada 6 horas" },
    { value: 1440, label: "Diariamente" },
];

export const PDV_POLICY_ROWS = [
    {
        key: "allowUserPriceEdit",
        label: "Permitir edição de preço por usuário comum",
        description: "Quando desativado, o usuário operacional passa a respeitar o valor sugerido pela política ativa do PDV.",
    },
    {
        key: "showPdvPricesForAdmin",
        label: "Mostrar preço sugerido para admin e subadmin",
        description: "Usa o último preço rastreado como base de preenchimento para fluxos gerenciais de cartaz.",
    },
    {
        key: "showPdvPricesForUsers",
        label: "Mostrar preço sugerido para usuário comum",
        description: "Libera o pré-preenchimento operacional para perfis de loja quando a política permitir edição manual.",
    },
];

export const PDV_GUIDELINES = [
    {
        title: "Integração precisa alimentar a operação",
        description: "A configuração só faz sentido quando reduz digitação, melhora rastreabilidade ou protege preço em telas já ativas.",
    },
    {
        title: "Não prometa sincronização inexistente",
        description: "API, banco ou arquivo devem ser validados com honestidade. Se o ambiente ainda depende de backend, a interface precisa deixar isso explícito.",
    },
    {
        title: "Use governança por perfil",
        description: "A política do PDV deve respeitar a hierarquia operacional do sistema para evitar alteração indevida de preço em loja.",
    },
];

export const PDV_COMPATIBILITY_OPTIONS = [
    "Linx",
    "TOTVS",
    "Microvix",
    "Bling",
    "GestãoPDV",
    "Auttar",
    "Stone",
    "Cielo",
    "SitEF",
    "Rede",
    "AnyMarket",
    "Marketplace próprio",
];

export const PDV_STEP_CONTENT = {
    api: [
        {
            title: "Publicar endpoint seguro do PDV",
            text: "O sistema deve expor produtos por URL estável, com autenticação e contrato claro para código, descrição, seção, unidade e preço.",
            code: `GET /api/produtos
Authorization: Bearer {token}
Accept: application/json

{
  "produtos": [
    {
      "codigo": "7891234567890",
      "descricao": "ARROZ TIPO 1 5KG",
      "secao": "Mercearia",
      "unidade": "kg",
      "preco": 8.99
    }
  ]
}`,
        },
        {
            title: "Configurar URL, token e política de uso",
            text: "Salve a URL da API, defina o comportamento por perfil e valide a configuração. O navegador só confirma o endpoint quando a rede e o CORS permitirem.",
        },
        {
            title: "Ativar sincronização supervisionada",
            text: "Depois da validação, mantenha sincronização periódica apenas quando houver rotina de backend, worker ou camada desktop processando a origem externa.",
        },
    ],
    database: [
        {
            title: "Preparar leitura por backend ou worker",
            text: "Conexões diretas com banco não devem sair do navegador. Use credencial de leitura e isole a consulta em processo controlado.",
            code: `mysql://usuario_leitura:senha_segura@servidor:3306/seu_banco`,
        },
        {
            title: "Definir tabela e campos de origem",
            text: "Mapeie o mínimo necessário para não carregar ruído operacional: identificador, descrição, seção, unidade e preço vigente.",
            code: `SELECT
  codigo_barras AS ean13,
  codigo_interno AS internalCode,
  descricao AS description1,
  departamento AS section,
  unidade AS unit,
  preco_venda AS price
FROM produtos
WHERE ativo = 1`,
        },
    ],
    csv: [
        {
            title: "Publicar arquivo em pasta observada",
            text: "Use caminho previsível e gere o CSV com cabeçalho consistente para importação segura e repetível.",
            code: `codigo_interno,ean13,descricao1,secao,unidade,preco
PROD001,7891234567890,ARROZ TIPO 1 5KG,Mercearia,kg,8.99`,
        },
        {
            title: "Amarrar leitura a processo servidor ou desktop",
            text: "A tela salva a governança, mas o consumo automático do arquivo depende de rotina observando alterações fora do navegador.",
        },
    ],
    none: [
        {
            title: "Manter operação manual com rastreabilidade",
            text: "Sem integração ativa, o sistema continua funcional pelas bases já existentes de catálogo, histórico e precificação manual.",
        },
    ],
};
