export function buildSettingsStatus({ activeTab, canManage, isMaster, sections, usersCount, usersError }) {
    if (isMaster) {
        return {
            tone: "green",
            title: "Governanca global ativa",
            description: "A conta master controla a landing, os planos e os parametros centrais da plataforma.",
        };
    }

    if (!canManage) {
        return {
            tone: "orange",
            title: "Governanca restrita",
            description: "Somente admin e subadmin podem alterar configuracoes centrais do SenaPrices.",
        };
    }

    if (activeTab === "access" && usersError) {
        return {
            tone: "orange",
            title: "Diretorio parcial",
            description: "A matriz de acesso esta disponivel, mas a leitura do diretorio depende da API autenticada.",
        };
    }

    return {
        tone: "green",
        title: "Central operacional ativa",
        description: `${sections.length} secao(oes) e ${usersCount} usuario(s) refletidos na governanca atual.`,
    };
}

export function buildSettingsSummary({ roleLabel, activeTabLabel, sections, labelSettings, appSettings, masterConfig, usersCount, isMaster }) {
    if (isMaster) {
        return [
            { label: "Perfil", value: roleLabel },
            { label: "Aba ativa", value: activeTabLabel },
            { label: "Tema", value: masterConfig.seasonalThemeActive ? masterConfig.seasonalTheme : "generic" },
            { label: "Trial", value: `${masterConfig.planConfig.trialDays} dias` },
            { label: "Moeda", value: masterConfig.planConfig.currency },
            { label: "Contato", value: masterConfig.contactEmail || "--" },
        ];
    }

    return [
        { label: "Perfil", value: roleLabel },
        { label: "Aba ativa", value: activeTabLabel },
        { label: "Secoes", value: `${sections.length}` },
        { label: "Preset etiqueta", value: labelSettings.preset },
        { label: "Papel padrao", value: appSettings.print.defaultPaperSize },
        { label: "Usuarios lidos", value: `${usersCount}` },
    ];
}

export function formatUpdatedAt(value) {
    if (!value) {
        return "Ainda nao salvo";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return "Ainda nao salvo";
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
