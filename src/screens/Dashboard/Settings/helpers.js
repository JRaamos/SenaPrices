export function buildSettingsStatus({ activeTab, canManage, sections, usersCount, usersError }) {
    if (!canManage) {
        return {
            tone: "orange",
            title: "Governança restrita",
            description: "Somente admin e subadmin podem alterar configurações centrais do SenaPrices.",
        };
    }

    if (activeTab === "access" && usersError) {
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

export function buildSettingsSummary({ roleLabel, activeTabLabel, sections, labelSettings, appSettings, usersCount }) {
    return [
        { label: "Perfil", value: roleLabel },
        { label: "Aba ativa", value: activeTabLabel },
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
