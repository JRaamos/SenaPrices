export const SETTINGS_TABS = [
    {
        key: "platform",
        label: "Plataforma",
        description: "Contato público, tema sazonal e visão central da operação da plataforma.",
        iconToken: "master",
        masterOnly: true,
    },
    {
        key: "billing",
        label: "Planos e cobrança",
        description: "Planos comerciais, moeda, trial, Stripe e parâmetros da jornada de contratação.",
        iconToken: "billing",
        masterOnly: true,
    },
    {
        key: "print",
        label: "Impressão",
        description: "Layout, margens, tipografia e visual do cartaz promocional.",
        iconToken: "print",
    },
    {
        key: "users",
        label: "Usuários",
        description: "Diretório atual de pessoas com acesso e perfis operacionais.",
        iconToken: "users",
    },
    {
        key: "groups",
        label: "Grupos",
        description: "Agrupamentos operacionais para distribuição rápida de promoções.",
        iconToken: "groups",
    },
    {
        key: "offertypes",
        label: "Tipos de oferta",
        description: "Etiquetas padrão e apelidos comerciais usados nos cartazes.",
        iconToken: "offerTypes",
    },
    {
        key: "special",
        label: "Ofertas especiais",
        description: "Combos e variações promocionais reutilizáveis na operação.",
        iconToken: "specialOffers",
    },
    {
        key: "sections",
        label: "Seções",
        description: "Classificação central do catálogo e da operação de loja.",
        iconToken: "sections",
    },
    {
        key: "backgrounds",
        label: "Imagens de fundo",
        description: "Assets visuais aplicados nos cartazes e no modo clube.",
        iconToken: "backgrounds",
    },
    {
        key: "custompages",
        label: "Páginas",
        description: "Formatos personalizados para cartazes além dos padrões A6, A5, A4 e A3.",
        iconToken: "customPages",
    },
    {
        key: "labels",
        label: "Etiquetas",
        description: "Preset, margens, campos visíveis e Zebra ZPL.",
        iconToken: "labels",
    },
    {
        key: "support",
        label: "Suporte",
        description: "Central de chamados, auditoria e validação operacional do atendimento.",
        iconToken: "support",
    },
];

export const SETTINGS_GUIDELINES = [
    {
        title: "Governança antes de customização",
        description: "Centralize primeiro o que realmente muda a operação e depois evolua refinamentos visuais ou regras avançadas.",
    },
    {
        title: "Uma fonte única de verdade",
        description: "Os defaults salvos aqui precisam abastecer os módulos ativos, evitando configuração duplicada em cada tela.",
    },
    {
        title: "Permissões honestas",
        description: "A interface só deve expor edição onde a camada atual consegue salvar com segurança e rastreabilidade.",
    },
];

export const ACCESS_MATRIX = [
    {
        title: "Definições da plataforma",
        admin: "Total",
        subadmin: "Operacional",
        user: "Sem acesso",
    },
    {
        title: "Catálogo e seções",
        admin: "Total",
        subadmin: "Total",
        user: "Sem acesso",
    },
    {
        title: "Criar preço e modo rápido",
        admin: "Total",
        subadmin: "Total",
        user: "Operacional",
    },
    {
        title: "Etiquetas, histórico e lote",
        admin: "Total",
        subadmin: "Total",
        user: "Operacional",
    },
    {
        title: "Relatórios e governança",
        admin: "Total",
        subadmin: "Gerencial",
        user: "Sem acesso",
    },
];

export const SETTINGS_SHORTCUTS = [
    {
        key: "create-price",
        title: "Criar preço",
        description: "Validar imediatamente como os defaults de impressão entram no cartaz.",
        route: "dashboard/prices/create",
        buttonLabel: "Abrir criação",
    },
    {
        key: "labels",
        title: "Etiquetas",
        description: "Conferir o preset atual de emissão e a leitura da gôndola.",
        route: "dashboard/labels",
        buttonLabel: "Abrir etiquetas",
    },
    {
        key: "pdv",
        title: "Integração PDV",
        description: "Ver como a política externa conversa com as regras operacionais do sistema.",
        route: "dashboard/integration",
        buttonLabel: "Abrir integração",
    },
    {
        key: "reports",
        title: "Relatórios",
        description: "Acompanhar o impacto das decisões de governança na base ativa.",
        route: "dashboard/reports",
        buttonLabel: "Abrir relatórios",
    },
];
