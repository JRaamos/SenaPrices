import moment from "moment";

import { getPdvTypeLabel } from "services/pdv";

export function buildStatusCard({ config, validation, coverage, recentSyncs }) {
    const integrationEnabled = config.active && config.type !== "none";
    const latestSync = recentSyncs[0] || null;

    if (!integrationEnabled) {
        return {
            tone: "orange",
            title: "Integração inativa",
            description: "A base automática ainda não está habilitada. O sistema continua operando com catálogo e preços rastreados localmente.",
        };
    }

    if (!validation.isValid) {
        return {
            tone: "orange",
            title: "Configuração exige revisão",
            description: validation.errorList[0] || "Revise os campos obrigatórios antes de confiar na política do PDV.",
        };
    }

    if (latestSync?.status === "error") {
        return {
            tone: "orange",
            title: "Validação recente com falha",
            description: latestSync.message,
        };
    }

    return {
        tone: "green",
        title: "Política PDV consistente",
        description: `${coverage.pricedItems} item(ns) do catálogo já conseguem reaproveitar o último preço rastreado dentro da política ativa.`,
    };
}

export function formatSyncDate(value) {
    if (!value) return "Ainda não validado";

    const parsed = moment(value);
    if (!parsed.isValid()) return "Ainda não validado";

    return `${parsed.format("DD/MM/YYYY HH:mm")} • ${parsed.fromNow()}`;
}

export function getSyncTone(status) {
    if (status === "success") return "green";
    if (status === "error") return "orange";
    return "blue";
}

export function getSyncLabel(status) {
    if (status === "success") return "Validado";
    if (status === "error") return "Falha";
    return "Atenção";
}

export function buildTypeSummary(config) {
    return [
        {
            label: "Fonte",
            value: getPdvTypeLabel(config.type),
        },
        {
            label: "Sincronização",
            value: config.autoSync ? "Automática" : "Sob demanda",
        },
        {
            label: "Intervalo",
            value: config.autoSync ? formatInterval(config.syncInterval) : "Não aplicado",
        },
    ];
}

function formatInterval(value) {
    if (value === 15) return "15 min";
    if (value === 30) return "30 min";
    if (value === 60) return "1 hora";
    if (value === 360) return "6 horas";
    if (value === 1440) return "24 horas";
    return "--";
}
