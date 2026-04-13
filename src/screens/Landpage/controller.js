import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useController() {
    const navigate = useNavigate()
    const [cookieVisible, setCookieVisible] = useState(true)

    const goToLogin = () => navigate('/login')
    const scrollToPlans = () => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    const hero = useMemo(() => ({
        subtitle: 'Sistema profissional para supermercados e varejos',
        title: 'Crie cartazes promocionais em segundos',
        description: 'Preencha produto e preco - o layout profissional e gerado na hora. Sem designer, sem complicacao.',
        primaryAction: { label: 'Entrar no sistema', onClick: goToLogin },
        secondaryAction: { label: 'Ver planos', onClick: scrollToPlans },
        features: [
            'Programa de Computador',
            'Acesso web (Profissional+)',
            'Etiquetas Zebra ZPL',
        ],
    }), [])

    const accessCards = useMemo(() => ([
        {
            icon: 'monitor-green',
            title: 'Programa de Computador',
            badge: 'Disponivel em todos os planos',
            eyebrow: 'Instalado no seu PC',
            description: 'Instale uma vez e use para sempre - seus dados ficam seguros no seu computador, sem depender de servidores externos ou mensalidades de nuvem.',
            items: [
                'Dados seguros no seu computador',
                'Impressao direta e rapida',
                'Disponivel em todos os planos',
                'Etiquetas Zebra ZPL e cartazes em um so lugar',
            ],
            tone: 'green',
        },
        {
            icon: 'globe-blue',
            title: 'Acesso via Navegador Web',
            badge: 'Planos Profissional e Completo',
            eyebrow: 'Requer internet',
            description: 'Acesse de qualquer dispositivo com navegador. Ideal para gerentes e equipes que precisam acompanhar de diferentes locais.',
            items: [
                'Acesso de qualquer dispositivo',
                'Promocoes programadas em tempo real',
                'Sincronizacao automatica com PDV',
                'Gestao remota da equipe',
            ],
            tone: 'blue',
        },
    ]), [])

    const featureSection = useMemo(() => ({
        title: 'Tudo que voce precisa',
        subtitle: 'Desenvolvido especificamente para o varejo brasileiro - rapido, confiavel, sem burocracia.',
        hint: 'Requer conexao com internet',
        items: [
            { icon: 'printer-purple', title: 'Etiquetas Zebra ZPL', description: 'Imprima etiquetas de gondola profissionais com codigo EAN-13. Suporte a impressoras Zebra 203 e 300 DPI.' },
            { icon: 'monitor-purple', title: 'Programa de computador', description: 'Instale no PC do seu estabelecimento. Rapido, sem abrir navegador, sempre disponivel.' },
            { icon: 'web-yellow', title: 'Tambem na web  * web', description: 'Nos planos Profissional e Completo, acesse de qualquer dispositivo pelo navegador.' },
            { icon: 'tag-yellow', title: '4 tipos de cartaz', description: 'A Vista, De/Por, Clube e Oferta Especial - cada um com layout exclusivo e visual impactante.' },
            { icon: 'printer-red', title: 'Impressao profissional', description: 'A6 ate tamanho personalizado, retrato e paisagem. Layout automatico para folha A4.' },
            { icon: 'file-blue', title: 'Importacao em massa', description: 'Importe centenas de produtos via CSV ou Excel. Compativel com sistemas ERP e PDV.' },
            { icon: 'stack-purple', title: 'Promocoes programadas  * web', description: 'Crie lotes de impressao com data de inicio, atribua a usuarios e acompanhe a execucao.' },
            { icon: 'shield-grey', title: 'Controle de acesso', description: 'Administrador, Sub-admin e multiplos usuarios. Cada papel ve apenas o que precisa.' },
        ],
    }), [])

    const plans = useMemo(() => ([
        {
            accent: 'default',
            title: 'Essencial',
            label: 'Desktop',
            labelIcon: 'monitor-green-small',
            description: 'Ideal para lojas pequenas que precisam de cartazes profissionais com agilidade e sem complicacao.',
            price: '59,90',
            badge: '2 contas',
            badgeMeta: '- 1 Administrador + 1 Usuario',
            buttonText: 'Comecar agora',
            buttonColor: 'slateSoft',
            buttonOutline: true,
            buttonIcon: 'chevron-grey',
            features: [
                { text: 'Programa de computador (desktop)', enabled: true },
                { text: '4 tipos de cartaz: A Vista, De/Por, Clube e Oferta', enabled: true },
                { text: 'Codigo de barras EAN-13 automatico', enabled: true },
                { text: 'Modo Rapido - preencha varios itens de uma vez', enabled: true },
                { text: 'Tamanhos A6, A5, A4, A3 e personalizado', enabled: true },
                { text: 'Retrato e paisagem - 2 por folha A4 (A5)', enabled: true },
                { text: 'Historico completo de impressoes', enabled: true },
                { text: '14 dias de teste gratis', enabled: true },
                { text: 'Importacao em massa CSV/XLSX', enabled: false },
                { text: 'Fila de encarte / promocoes programadas', enabled: false },
                { text: 'Impressao em lote', enabled: false },
                { text: 'Etiquetas Zebra ZPL (gondola)', enabled: false },
                { text: 'Acesso via navegador web', enabled: false },
                { text: 'Sub-administrador e grupos de usuarios', enabled: false },
                { text: 'Relatorios por usuario', enabled: false },
            ],
        },
        {
            accent: 'featured',
            title: 'Profissional',
            label: 'Web + Desktop',
            labelIcon: 'globe-blue-small',
            description: 'Para supermercados e redes que precisam de equipe, automacao e controle total das promocoes.',
            price: '299,90',
            badge: '8 contas',
            badgeMeta: '- 1 Admin + 1 Sub-admin + 6 Usuarios',
            buttonText: 'Comecar agora',
            buttonColor: 'violet',
            buttonOutline: false,
            buttonIcon: 'chevron',
            topTag: 'Mais popular',
            features: [
                { text: 'Tudo do plano Essencial', enabled: true },
                { text: 'Acesso via navegador web (qualquer dispositivo)', enabled: true, hint: '* web' },
                { text: 'Importacao em massa CSV / Excel / XLSX', enabled: true },
                { text: 'Fila de encarte - promocoes programadas por data', enabled: true },
                { text: 'Impressao em lote (varios itens de uma vez)', enabled: true },
                { text: 'Etiquetas de gondola - Zebra ZPL (203 e 300 DPI)', enabled: true },
                { text: 'Sub-administrador com permissoes configuraveis', enabled: true },
                { text: 'Grupos de usuarios por secao ou categoria', enabled: true },
                { text: 'Imagens de fundo e temas personalizados', enabled: true },
                { text: 'Tipos de oferta e secoes customizados', enabled: true },
                { text: 'Ofertas especiais com destaque visual', enabled: true },
                { text: 'Relatorios detalhados por usuario e periodo', enabled: true },
                { text: 'Exportacao CSV do historico', enabled: true },
                { text: 'Integracao PDV / Frente de Caixa', enabled: false },
                { text: 'Sincronizacao automatica de precos via API', enabled: false },
            ],
        },
        {
            accent: 'custom',
            title: 'Personalizado',
            label: 'Web + Desktop',
            labelIcon: 'globe-blue-small',
            description: 'Para redes de lojas e grandes varejos - integracao total com seu PDV e automacao completa.',
            price: 'Sob consulta',
            badge: 'Ilimitadas',
            badgeMeta: '- Multiplos administradores e equipes',
            buttonText: 'Entrar em contato',
            buttonColor: 'skySoft',
            buttonOutline: true,
            buttonIcon: 'mail-blue',
            topTag: 'Para grandes operacoes',
            features: [
                { text: 'Tudo do plano Profissional', enabled: true },
                { text: 'Integracao PDV / Frente de Caixa em tempo real', enabled: true, hint: '* web' },
                { text: 'Sincronizacao automatica de precos via API', enabled: true, hint: '* web' },
                { text: 'Importacao automatica agendada (CSV / API)', enabled: true, hint: '* web' },
                { text: 'Multiplos terminais e filiais configuraveis', enabled: true },
                { text: 'Relatorios avancados com exportacao personalizada', enabled: true },
                { text: 'Suporte prioritario com atendimento dedicado', enabled: true, hint: '* web' },
                { text: 'Customizacoes exclusivas para seu negocio', enabled: true },
                { text: 'SLA garantido e onboarding assistido', enabled: true },
            ],
        },
    ]), [])

    const finalCta = useMemo(() => ({
        title: 'Pronto para otimizar seus cartazes?',
        description: 'Acesse agora e veja como e simples criar cartazes promocionais profissionais - sem precisar de internet.',
        action: { label: 'Acessar o SenaPrices', onClick: goToLogin },
    }), [])

    const footer = useMemo(() => ({
        description: 'Sistema de Cartazes de Precos Promocionais - Desenvolvido para o varejo brasileiro',
        lgpdText: 'LGPD (Lei n 13.709/2018) - Seus dados estao protegidos',
    }), [])

    const cookie = useMemo(() => ({
        text: 'Utilizamos armazenamento local (localStorage) para salvar suas configuracoes e dados do sistema. Nenhum dado pessoal e enviado a servidores externos sem seu consentimento explicito. Ao continuar, voce concorda com nossa Politica de Privacidade e Termos de Uso, em conformidade com a LGPD (Lei n 13.709/2018).',
        onAccept: () => setCookieVisible(false),
        onReject: () => setCookieVisible(false),
        onClose: () => setCookieVisible(false),
    }), [])

    return {
        hero,
        accessCards,
        featureSection,
        plans,
        finalCta,
        footer,
        cookie,
        cookieVisible,
        plansFooterNote: 'Cancele quando quiser. Sem fidelidade minima. Plano Personalizado sob consulta.',
    }
}
