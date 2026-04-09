export function buildSettingsStatus({ activeTab, canManage, isMaster, sections, usersCount, usersError }) {
    if (isMaster) {
        if (activeTab === "billing") {
            return {
                tone: "green",
                title: "Governança comercial ativa",
                description: "A conta master controla planos, cobrança, contatos públicos e a prontidão da jornada comercial.",
            };
        }

        if (activeTab === "support") {
            return {
                tone: "green",
                title: "Governança de suporte ativa",
                description: "A conta master acompanha atendimento, auditoria e parâmetros globais sem entrar na rotina operacional de loja.",
            };
        }

        return {
            tone: "green",
            title: "Governança global ativa",
            description: "A conta master controla landing, planos, suporte e parâmetros centrais da plataforma.",
        };
    }

    if (!canManage) {
        return {
            tone: "orange",
            title: "Governança restrita",
            description: "Somente admin, subadmin e conta master podem alterar configurações centrais do SenaPrices.",
        };
    }

    if (activeTab === "users" && usersError) {
        return {
            tone: "orange",
            title: "Diretório parcial",
            description: "A matriz de acesso está disponível, mas a leitura do diretório depende da API autenticada.",
        };
    }

    return {
        tone: "green",
        title: "Central operacional ativa",
        description: `${sections.length} seção(ões) e ${usersCount} usuário(s) refletidos na governança atual.`,
    };
}

export function buildSettingsSummary({ roleLabel, activeTabLabel, sections, labelSettings, appSettings, masterConfig, usersCount, isMaster }) {
    if (isMaster) {
        return [
            { label: "Perfil", value: roleLabel },
            { label: "Área ativa", value: activeTabLabel },
            { label: "Tema", value: masterConfig.seasonalThemeActive ? masterConfig.seasonalTheme : "genérico" },
            { label: "Trial", value: `${masterConfig.planConfig.trialDays} dias` },
            { label: "Moeda", value: masterConfig.planConfig.currency },
            { label: "Diretório lido", value: `${usersCount}` },
        ];
    }

    return [
        { label: "Perfil", value: roleLabel },
        { label: "Área ativa", value: activeTabLabel },
        { label: "Seções", value: `${sections.length}` },
        { label: "Preset etiqueta", value: labelSettings.preset },
        { label: "Papel padrão", value: appSettings.print.defaultPaperSize },
        { label: "Usuários lidos", value: `${usersCount}` },
    ];
}

export function formatUpdatedAt(value) {
    if (!value) {
        return "Ainda não salvo";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "Ainda não salvo";
    }

    return parsed.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function getPermissionTone(value) {
    if (value === "Total") return "green";
    if (value === "Operacional" || value === "Gerencial") return "blue";
    return "orange";
}
