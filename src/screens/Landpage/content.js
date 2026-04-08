export const HERO_SLIDES = [
    {
        title: "Cartazes promocionais prontos em segundos",
        description: "Preencha produto e preco, escolha o formato e deixe o SenaPrices organizar a apresentacao com padrao profissional.",
    },
    {
        title: "Etiquetas e precos pensados para o varejo",
        description: "A base do sistema considera cartazes, etiquetas, impressao rapida e rotinas operacionais comuns em supermercados e lojas.",
    },
    {
        title: "Operacao simples para equipes de loja",
        description: "Fluxos claros, manutencao previsivel e telas desenhadas para uso diario por administradores, supervisores e operadores.",
    },
    {
        title: "Estrutura preparada para crescer modulo por modulo",
        description: "Landing, autenticacao, conta, seguranca e suporte ja seguem um padrao forte para a evolucao segura do produto.",
    },
];

export const PLATFORM_FEATURES = [
    {
        key: "desktop",
        title: "Programa de computador",
        description: "Estrutura pensada para operacao rapida no ambiente da loja, com foco em produtividade e baixa friccao no uso diario.",
        icon: "/icons/products.svg",
    },
    {
        key: "web",
        title: "Acesso web",
        description: "Arquitetura pronta para abrir espaco a paineis e modulos acessiveis pelo navegador conforme o sistema evolui.",
        icon: "/icons/menu.svg",
    },
];

export const FEATURE_CARDS = [
    {
        key: "posters",
        title: "Cartazes promocionais",
        description: "Base pensada para suportar fluxos de preco a vista, de/por, clube e ofertas especiais.",
        icon: "/icons/products.svg",
    },
    {
        key: "labels",
        title: "Etiquetas de gondola",
        description: "Preparacao para fluxos de etiquetas, impressao especifica e expansao futura de formatos.",
        icon: "/icons/training.svg",
    },
    {
        key: "support",
        title: "Suporte organizado",
        description: "Registro, acompanhamento e atualizacao de tickets ja implementados no repositorio atual.",
        icon: "/icons/proposal.svg",
    },
    {
        key: "security",
        title: "Seguranca e acesso",
        description: "Perfil, senha e rotas sensiveis seguem um padrao de separacao por responsabilidade e manutencao.",
        icon: "/icons/password.svg",
    },
    {
        key: "users",
        title: "Preparado para equipe",
        description: "A estrutura local de referencia contempla administrador, subadmin e usuarios operacionais.",
        icon: "/icons/user.svg",
    },
    {
        key: "history",
        title: "Historico e rastreabilidade",
        description: "O projeto esta sendo organizado para facilitar evolucao de historico, fila, relatorios e revisao operacional.",
        icon: "/icons/search.svg",
    },
];

export const PLAN_CARDS = [
    {
        key: "essencial",
        name: "Essencial",
        badge: null,
        monthlyPrice: 59.9,
        annualDiscountPercent: 12,
        description: "Para operacoes menores que precisam de cartazes profissionais com agilidade e simplicidade.",
        highlights: [
            "Cartazes promocionais",
            "Fluxo rapido de operacao",
            "Historico basico",
            "Base para impressao",
        ],
        cta: "Solicitar acesso",
    },
    {
        key: "profissional",
        name: "Profissional",
        badge: "Mais completo",
        monthlyPrice: 299.9,
        annualDiscountPercent: 18,
        description: "Para equipes e supermercados que exigem mais controle, escala e consistencia operacional.",
        highlights: [
            "Tudo do Essencial",
            "Multiplos usuarios",
            "Suporte operacional ampliado",
            "Pronto para modulos avancados",
        ],
        cta: "Quero conhecer",
    },
    {
        key: "personalizado",
        name: "Personalizado",
        badge: "Grandes operacoes",
        monthlyPrice: null,
        annualDiscountPercent: 0,
        description: "Para redes ou operacoes com necessidades especificas, integracao e fluxos sob medida.",
        highlights: [
            "Implantacao guiada",
            "Escopo sob consulta",
            "Expansao orientada por processo",
            "Evolucao dedicada",
        ],
        cta: "Falar com o time",
    },
];

export const FAQ_ITEMS = [
    {
        key: "faq-1",
        question: "O SenaPrices ja esta pronto para uso completo?",
        answer: "A base atual do GitHub ja tem painel inicial, login, conta, seguranca e suporte. Os modulos centrais do varejo estao sendo portados das paginas locais com padrao alto e manutencao organizada.",
    },
    {
        key: "faq-2",
        question: "Os planos da landing ja fazem checkout real?",
        answer: "Ainda nao neste repositorio. Nesta fase, a landing apresenta os planos e organiza o posicionamento do produto enquanto o backend comercial nao foi acoplado aqui.",
    },
    {
        key: "faq-3",
        question: "Como voces estao mantendo consistencia entre os projetos?",
        answer: "As paginas locais em `artifacts/preco-promo/src/pages` servem como referencia funcional, enquanto toda implementacao segue a arquitetura mais limpa do projeto GitHub em `C:\\Users\\mateu\\SenaPrices`.",
    },
    {
        key: "faq-4",
        question: "As telas novas ja seguem padrao de manutencao?",
        answer: "Sim. Cada tela esta sendo estruturada com separacao clara entre `index.js`, `controller.js`, `styled.js` e `index.test.js`, com foco em seguranca, previsibilidade e facilidade de manutencao.",
    },
];
