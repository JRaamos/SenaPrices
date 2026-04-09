export const SETTINGS_TABS = [
    {
        key: "platform",
        label: "Master",
        description: "Parametros globais da landing, planos e tema sazonal.",
        icon: "/icons/training.svg",
    },
    {
        key: "print",
        label: "Impressao",
        description: "Defaults para novos cartazes e lotes operacionais.",
        icon: "/icons/products.svg",
    },
    {
        key: "sections",
        label: "Secoes",
        description: "Classificacao central do catalogo e da operacao.",
        icon: "/icons/products.svg",
    },
    {
        key: "labels",
        label: "Etiquetas",
        description: "Preset, DPI e campos padrao da emissao.",
        icon: "/icons/products.svg",
    },
    {
        key: "access",
        label: "Acessos",
        description: "Matriz por perfil e diretorio atual de usuarios.",
        icon: "/icons/user.svg",
    },
];

export const SETTINGS_GUIDELINES = [
    {
        title: "Governanca antes de customizacao",
        description: "Centralize primeiro o que realmente muda a operacao, para depois evoluir refinamentos visuais ou regras avancadas.",
    },
    {
        title: "Uma fonte unica de verdade",
        description: "Os defaults salvos aqui devem abastecer os modulos ativos, evitando configuracao duplicada em cada tela.",
    },
    {
        title: "Permissoes honestas",
        description: "A tela nao deve prometer CRUD administrativo onde a API ainda nao expoe alteracao segura de usuarios.",
    },
];

export const ACCESS_MATRIX = [
    {
        title: "Definicoes da plataforma",
        admin: "Total",
        subadmin: "Operacional",
        user: "Sem acesso",
    },
    {
        title: "Catalogo e secoes",
        admin: "Total",
        subadmin: "Total",
        user: "Sem acesso",
    },
    {
        title: "Criar Preco e Modo Rapido",
        admin: "Total",
        subadmin: "Total",
        user: "Operacional",
    },
    {
        title: "Etiquetas, Historico e Lote",
        admin: "Total",
        subadmin: "Total",
        user: "Operacional",
    },
    {
        title: "Relatorios e governanca",
        admin: "Total",
        subadmin: "Gerencial",
        user: "Sem acesso",
    },
];

export const SETTINGS_SHORTCUTS = [
    {
        key: "create-price",
        title: "Criar Preco",
        description: "Validar imediatamente como os defaults de impressao entram no cartaz.",
        route: "dashboard/prices/create",
        buttonLabel: "Abrir criacao",
    },
    {
        key: "labels",
        title: "Etiquetas",
        description: "Conferir o preset atual de emissao e a leitura da gondola.",
        route: "dashboard/labels",
        buttonLabel: "Abrir etiquetas",
    },
    {
        key: "pdv",
        title: "Integracao PDV",
        description: "Ver como a politica externa conversa com as regras operacionais do sistema.",
        route: "dashboard/integration",
        buttonLabel: "Abrir integracao",
    },
    {
        key: "reports",
        title: "Relatorios",
        description: "Acompanhar o impacto das decisoes de governanca na base ativa.",
        route: "dashboard/reports",
        buttonLabel: "Abrir relatorios",
    },
];
