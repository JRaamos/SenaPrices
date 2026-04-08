export const HERO_SLIDES = [
    {
        title: "Cartazes promocionais prontos em segundos",
        description: "Preencha produto e preço, escolha o formato e deixe o SenaPrices organizar a apresentação com padrão profissional.",
    },
    {
        title: "Etiquetas e preços pensados para o varejo",
        description: "A base do sistema considera cartazes, etiquetas, impressão rápida e rotinas operacionais comuns em supermercados e lojas.",
    },
    {
        title: "Operação simples para equipes de loja",
        description: "Fluxos claros, manutenção previsível e telas desenhadas para uso diário por administradores, supervisores e operadores.",
    },
    {
        title: "Estrutura preparada para crescer módulo por módulo",
        description: "Landing, autenticação, conta, segurança e suporte já seguem um padrão forte para a evolução segura do produto.",
    },
];

export const PLATFORM_FEATURES = [
    {
        key: "desktop",
        title: "Programa de computador",
        description: "Estrutura pensada para operação rápida no ambiente da loja, com foco em produtividade e baixa fricção no uso diário.",
        icon: "/icons/products.svg",
    },
    {
        key: "web",
        title: "Acesso web",
        description: "Arquitetura pronta para abrir espaço a painéis e módulos acessíveis pelo navegador conforme o sistema evolui.",
        icon: "/icons/menu.svg",
    },
];

export const FEATURE_CARDS = [
    {
        key: "posters",
        title: "Cartazes promocionais",
        description: "Base pensada para suportar fluxos de preço à vista, de/por, clube e ofertas especiais.",
        icon: "/icons/products.svg",
    },
    {
        key: "labels",
        title: "Etiquetas de gôndola",
        description: "Preparação para fluxos de etiquetas, impressão específica e expansão futura de formatos.",
        icon: "/icons/training.svg",
    },
    {
        key: "support",
        title: "Suporte organizado",
        description: "Registro, acompanhamento e atualização de tickets já implementados no repositório atual.",
        icon: "/icons/proposal.svg",
    },
    {
        key: "security",
        title: "Segurança e acesso",
        description: "Perfil, senha e rotas sensíveis seguem um padrão de separação por responsabilidade e manutenção.",
        icon: "/icons/password.svg",
    },
    {
        key: "users",
        title: "Preparado para equipe",
        description: "A estrutura local de referência contempla administrador, subadmin e usuários operacionais.",
        icon: "/icons/user.svg",
    },
    {
        key: "history",
        title: "Histórico e rastreabilidade",
        description: "O projeto está sendo organizado para facilitar evolução de histórico, fila, relatórios e revisão operacional.",
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
        description: "Para operações menores que precisam de cartazes profissionais com agilidade e simplicidade.",
        highlights: [
            "Cartazes promocionais",
            "Fluxo rápido de operação",
            "Histórico basico",
            "Base para impressão",
        ],
        cta: "Solicitar acesso",
    },
    {
        key: "profissional",
        name: "Profissional",
        badge: "Mais completo",
        monthlyPrice: 299.9,
        annualDiscountPercent: 18,
        description: "Para equipes e supermercados que exigem mais controle, escala e consistência operacional.",
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
        badge: "Grandes operações",
        monthlyPrice: null,
        annualDiscountPercent: 0,
        description: "Para redes ou operações com necessidades específicas, integração e fluxos sob medida.",
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
        question: "O SenaPrices já está pronto para uso completo?",
        answer: "A base atual do GitHub já tem painel inicial, login, conta, segurança e suporte. Os módulos centrais do varejo estão sendo portados das páginas locais com padrão alto e manutenção organizada.",
    },
    {
        key: "faq-2",
        question: "Os planos da landing já fazem checkout real?",
        answer: "Ainda não neste repositório. Nesta fase, a landing apresenta os planos e organiza o posicionamento do produto enquanto o backend comercial não foi acoplado aqui.",
    },
    {
        key: "faq-3",
        question: "Como vocês estão mantendo consistência entre os projetos?",
        answer: "As páginas locais em `artifacts/preco-promo/src/pages` servem como referência funcional, enquanto toda implementação segue a arquitetura mais limpa do projeto GitHub em `C:\\Users\\mateu\\SenaPrices`.",
    },
    {
        key: "faq-4",
        question: "As telas novas já seguem padrão de manutenção?",
        answer: "Sim. Cada tela está sendo estruturada com separação clara entre `index.js`, `controller.js`, `styled.js` e `index.test.js`, com foco em segurança, previsibilidade e facilidade de manutenção.",
    },
];
