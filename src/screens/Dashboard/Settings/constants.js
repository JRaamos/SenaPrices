export const SETTINGS_TABS = [
    {
        key: "print",
        label: "Impressão",
        description: "Defaults para novos cartazes e lotes operacionais.",
        icon: "/icons/products.svg",
    },
    {
        key: "sections",
        label: "Seções",
        description: "Classificação central do catálogo e da operação.",
        icon: "/icons/products.svg",
    },
    {
        key: "labels",
        label: "Etiquetas",
        description: "Preset, DPI e campos padrão da emissão.",
        icon: "/icons/products.svg",
    },
    {
        key: "access",
        label: "Acessos",
        description: "Matriz por perfil e diretório atual de usuários.",
        icon: "/icons/user.svg",
    },
];

export const SETTINGS_GUIDELINES = [
    {
        title: "Governança antes de customização",
        description: "Centralize primeiro o que realmente muda a operação, para depois evoluir refinamentos visuais ou regras avançadas.",
    },
    {
        title: "Uma fonte única de verdade",
        description: "Os defaults salvos aqui devem abastecer os módulos ativos, evitando configuração duplicada em cada tela.",
    },
    {
        title: "Permissões honestas",
        description: "A tela não deve prometer CRUD administrativo onde a API ainda não expõe alteração segura de usuários.",
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
        title: "Criar Preço e Modo Rápido",
        admin: "Total",
        subadmin: "Total",
        user: "Operacional",
    },
    {
        title: "Etiquetas, Histórico e Lote",
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
        title: "Criar Preço",
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
