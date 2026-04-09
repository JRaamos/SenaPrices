export const HERO_SLIDES = [
    {
        title: "Etiquetas de gôndola com Zebra ZPL",
        description: "Imprima etiquetas com código EAN-13 direto na sua impressora Zebra, com leitura confiável em 203 e 300 DPI.",
    },
    {
        title: "Cartazes promocionais prontos em segundos",
        description: "Preencha produto e preço, escolha o layout e deixe o SenaPrices entregar o cartaz com padrão profissional.",
    },
    {
        title: "Promoções programadas para equipes e lojas",
        description: "Distribua cartazes por usuário, acompanhe a vigência das campanhas e mantenha histórico e operação sincronizados.",
    },
];

export const HERO_METRICS = [
    { key: "price-types", value: "4", label: "tipos de cartaz no mesmo fluxo" },
    { key: "labels", value: "ZPL", label: "etiquetas Zebra com EAN-13" },
    { key: "governance", value: "4 perfis", label: "com governança de acesso" },
];

export const PLATFORM_FEATURES = [
    {
        key: "desktop",
        title: "Programa de Computador",
        eyebrow: "Instalado no seu PC",
        tag: "Disponível em todos os planos",
        description: "Instale uma vez e use para sempre. Seus dados ficam seguros no computador, sem depender de servidores externos ou mensalidades de nuvem para a operação principal.",
        bullets: [
            "Dados seguros no seu computador",
            "Impressão direta e rápida",
            "Disponível em todos os planos",
            "Etiquetas Zebra ZPL e cartazes no mesmo lugar",
        ],
        iconToken: "landingDesktop",
    },
    {
        key: "web",
        title: "Acesso via Navegador Web",
        eyebrow: "Requer internet",
        tag: "Planos Profissional e Completo",
        description: "Acesse de qualquer dispositivo com navegador. Ideal para gerentes e equipes que precisam acompanhar diferentes lojas, promoções programadas e integrações ativas.",
        bullets: [
            "Acesso de qualquer dispositivo",
            "Promoções programadas em tempo real",
            "Sincronização automática com PDV",
            "Gestão remota da equipe",
        ],
        iconToken: "landingWeb",
    },
];

export const FEATURE_CARDS = [
    {
        key: "labels",
        title: "Etiquetas Zebra ZPL",
        description: "Imprima etiquetas de gôndola profissional com código EAN-13. Suporte a impressoras Zebra 203 e 300 DPI.",
        iconToken: "labels",
    },
    {
        key: "desktop",
        title: "Programa de computador",
        description: "Instale no PC do estabelecimento. Rápido, sólido, sem depender do navegador para a operação principal.",
        iconToken: "landingDesktop",
    },
    {
        key: "web",
        title: "Também na web",
        description: "Nos planos com acesso web, acompanhe a equipe e as promoções de qualquer dispositivo.",
        iconToken: "landingWeb",
    },
    {
        key: "pricing",
        title: "4 tipos de cartaz",
        description: "À vista, De/Por, Clube e Oferta Especial, cada um com layout próprio e configuração dinâmica.",
        iconToken: "createPrice",
    },
    {
        key: "print",
        title: "Impressão profissional",
        description: "A6 até tamanho personalizado, retrato e paisagem, com organização inteligente para folha A4.",
        iconToken: "batchPrint",
    },
    {
        key: "import",
        title: "Importação em massa",
        description: "Importe centenas de produtos por CSV, Excel ou TXT com base pronta para crescer.",
        iconToken: "import",
    },
    {
        key: "promotions",
        title: "Promoções programadas",
        description: "Crie lotes por data, atribua a usuários e acompanhe a execução com histórico e rastreabilidade.",
        iconToken: "promotions",
    },
    {
        key: "security",
        title: "Controle de acesso",
        description: "Administrador, Sub-admin, Usuário e Master enxergam apenas o que faz sentido para sua função.",
        iconToken: "security",
    },
];

export const PLAN_CARDS = [
    {
        key: "essencial",
        name: "ESSENCIAL",
        badge: null,
        modeLabel: "Desktop",
        description: "Ideal para lojas pequenas que precisam de cartazes profissionais com agilidade e sem complicação.",
        seatLabel: "2 contas — 1 Administrador + 1 Usuário",
        highlights: [
            "Programa de computador",
            "4 tipos de cartaz: À Vista, De/Por, Clube e Oferta",
            "Código de barras EAN-13 automático",
            "Modo Rápido para vários itens",
            "Tamanhos A6, A5, A4, A3 e personalizado",
            "Histórico completo de impressões",
            "14 dias de teste grátis",
        ],
        discountLabel: "Economize com o anual",
        cta: "Começar agora",
    },
    {
        key: "profissional",
        name: "PROFISSIONAL",
        badge: "Mais popular",
        modeLabel: "Web + Desktop",
        description: "Para supermercados e redes que precisam de equipe, automação e controle total das promoções.",
        seatLabel: "8 contas — 1 Admin + 1 Sub-admin + 6 Usuários",
        highlights: [
            "Tudo do plano Essencial",
            "Acesso via navegador web",
            "Importação em massa CSV / Excel / XLSX",
            "Fila de encarte e promoções programadas",
            "Impressão em lote",
            "Etiquetas Zebra ZPL",
            "Subadministrador com permissões configuráveis",
        ],
        discountLabel: "Economize com o anual",
        cta: "Começar agora",
    },
    {
        key: "personalizado",
        name: "PERSONALIZADO",
        badge: "Para grandes operações",
        modeLabel: "Web + Desktop",
        description: "Para redes de lojas e grandes varejos com integração total ao PDV e automação completa.",
        seatLabel: "Contas ilimitadas — múltiplos administradores e equipes",
        highlights: [
            "Tudo do plano Profissional",
            "Integração PDV / Frente de Caixa em tempo real",
            "Sincronização automática de preços via API",
            "Importação agendada por CSV ou API",
            "Múltiplos terminais e filiais configuráveis",
            "Relatórios avançados com exportação",
            "Suporte prioritário com atendimento dedicado",
        ],
        discountLabel: "Escopo comercial sob consulta",
        cta: "Falar com a equipe",
    },
];

export const FAQ_ITEMS = [
    {
        key: "faq-1",
        question: "O SenaPrices funciona só no computador ou também na web?",
        answer: "O produto pode operar como programa de computador e, nos planos com acesso web, também via navegador para gestão remota, promoções programadas e governança da equipe.",
    },
    {
        key: "faq-2",
        question: "Os acessos mudam conforme o perfil?",
        answer: "Sim. Master, admin, subadmin e usuário enxergam menus e recursos diferentes, respeitando papel operacional e plano contratado.",
    },
    {
        key: "faq-3",
        question: "As configurações globais podem ser compartilhadas entre todos os usuários?",
        answer: "Sim. Tipos de oferta, páginas personalizadas, imagens de fundo, padrões de impressão e presets de etiquetas ficam disponíveis conforme a governança central da plataforma.",
    },
    {
        key: "faq-4",
        question: "O sistema já está preparado para crescer com integrações e suporte?",
        answer: "Sim. A base atual já considera PDV, cobrança, suporte, auditoria e expansão futura sem quebrar a estrutura principal do sistema.",
    },
];
