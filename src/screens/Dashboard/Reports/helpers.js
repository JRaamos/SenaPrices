import moment from "moment";

import { readCatalogItems } from "services/catalog";
import { readRecentLabelJobs } from "services/labels";
import { readPriceRecords, readPrintHistory } from "services/pricing";
import { readPromotionOrders } from "services/promotions";
import { normalizeUserRole } from "services/users";

import { readRecentBatchPrintJobs } from "../BatchPrint/storage";

import {
    REPORT_PERIOD_OPTIONS,
    REPORT_SOURCE_COLORS,
    REPORT_SOURCE_LABELS,
} from "./constants";

export function resolveReportsAccess(user = {}) {
    const role = normalizeUserRole(user);
    return {
        role,
        roleLabel: formatRoleLabel(role),
        canAccess: role === "admin" || role === "subadmin",
    };
}

export function buildOperationalReport(period = "30d") {
    const catalogItems = readCatalogItems();
    const historyEntries = readPrintHistory();
    const priceRecords = readPriceRecords();
    const promotionOrders = readPromotionOrders();
    const batchJobs = readRecentBatchPrintJobs();
    const labelJobs = readRecentLabelJobs();

    const startDate = resolveStartDate(period);
    const today = moment().startOf("day");

    const filteredHistory = historyEntries.filter(item => isWithinPeriod(item.savedAt, startDate));
    const filteredPromotions = promotionOrders.filter(item => isWithinPeriod(item.createdAt, startDate));
    const filteredBatchJobs = batchJobs.filter(item => isWithinPeriod(item.createdAt, startDate));
    const filteredLabelJobs = labelJobs.filter(item => isWithinPeriod(item.createdAt, startDate));

    const trackedPriceRecordIds = new Set(filteredHistory.flatMap(item => item.priceRecordIds || []));
    const filteredPriceRecords = priceRecords.filter(item => trackedPriceRecordIds.has(item.id));

    const activePromotions = filteredPromotions.filter(item => {
        const start = item.validFrom ? moment(item.validFrom, "YYYY-MM-DD", true) : null;
        const end = item.validTo ? moment(item.validTo, "YYYY-MM-DD", true) : null;

        if (start?.isAfter(today, "day")) return false;
        if (end?.isBefore(today, "day")) return false;
        return true;
    });

    const events = [
        ...filteredHistory.map(item => ({
            id: item.id,
            title: item.title || "Cartaz sem título",
            source: item.source || "manual",
            sourceLabel: REPORT_SOURCE_LABELS[item.source] || REPORT_SOURCE_LABELS.manual,
            createdAt: item.savedAt,
            actor: item.createdBy || "Operação local",
            volume: item.totalCards || 0,
            description: item.summaryLabel || item.offerTitle || "Registro do histórico operacional.",
        })),
        ...filteredPromotions.map(item => ({
            id: item.id,
            title: item.name || "Promoção programada",
            source: "promotion",
            sourceLabel: REPORT_SOURCE_LABELS.promotion,
            createdAt: item.createdAt,
            actor: item.createdBy || "Operação local",
            volume: item.totalCards || 0,
            description: item.description || "Campanha programada para a fila promocional.",
        })),
        ...filteredBatchJobs.map(item => ({
            id: item.id,
            title: item.title || "Lote operacional",
            source: "batch",
            sourceLabel: REPORT_SOURCE_LABELS.batch,
            createdAt: item.createdAt,
            actor: "Equipe operacional",
            volume: item.totalCards || 0,
            description: item.sourceSummary || `${item.totalSelections || 0} seleção(ões) combinadas.`,
        })),
        ...filteredLabelJobs.map(item => ({
            id: item.id,
            title: item.title || "Lote de etiquetas",
            source: "labels",
            sourceLabel: REPORT_SOURCE_LABELS.labels,
            createdAt: item.createdAt,
            actor: "Equipe operacional",
            volume: item.totalLabels || 0,
            description: `${item.totalItems || 0} item(ns) • ${item.totalLabels || 0} etiqueta(s)`,
        })),
    ]
        .filter(item => !!item.createdAt)
        .sort((left, right) => `${right.createdAt}`.localeCompare(`${left.createdAt}`));

    const sourceSummary = Object.entries(groupBy(events, item => item.source)).map(([source, rows]) => ({
        source,
        label: REPORT_SOURCE_LABELS[source] || source,
        color: REPORT_SOURCE_COLORS[source] || "#64748b",
        count: rows.length,
        volume: rows.reduce((result, item) => result + (item.volume || 0), 0),
    }))
        .sort((left, right) => right.count - left.count);

    const userSummary = Object.entries(groupBy(events.filter(item => item.actor), item => item.actor)).map(([actor, rows]) => ({
        actor,
        count: rows.length,
        volume: rows.reduce((result, item) => result + (item.volume || 0), 0),
        latestAt: rows[0]?.createdAt || null,
    }))
        .sort((left, right) => right.volume - left.volume)
        .slice(0, 6);

    const sectionSummary = Object.entries(groupBy(
        filteredPriceRecords.filter(item => item.sectionName),
        item => item.sectionName,
    )).map(([sectionName, rows]) => ({
        sectionName,
        count: rows.length,
        volume: rows.length,
    }))
        .sort((left, right) => right.count - left.count)
        .slice(0, 6);

    const trendMap = new Map();
    events.forEach(item => {
        const key = moment(item.createdAt).format("YYYY-MM-DD");
        const current = trendMap.get(key) || { date: key, count: 0, volume: 0 };
        current.count += 1;
        current.volume += item.volume || 0;
        trendMap.set(key, current);
    });

    const trend = Array.from(trendMap.values())
        .sort((left, right) => `${left.date}`.localeCompare(`${right.date}`))
        .slice(-12)
        .map(item => ({
            ...item,
            label: moment(item.date).format("DD/MM"),
        }));

    const maxTrendVolume = Math.max(...trend.map(item => item.volume || 0), 1);
    const periodLabel = REPORT_PERIOD_OPTIONS.find(item => item.value === period)?.label || REPORT_PERIOD_OPTIONS[1].label;

    return {
        period,
        periodLabel,
        summaryItems: [
            {
                label: "Cartazes rastreados",
                value: `${filteredHistory.reduce((result, item) => result + (item.totalCards || 0), 0)}`,
                helper: `${filteredHistory.length} registro(s)`,
            },
            {
                label: "Impressões confirmadas",
                value: `${filteredHistory.filter(item => !!item.printedAt).length}`,
                helper: "Histórico operacional",
            },
            {
                label: "Promoções ativas",
                value: `${activePromotions.length}`,
                helper: `${filteredPromotions.length} campanha(s) no período`,
            },
            {
                label: "Itens catalogados",
                value: `${catalogItems.length}`,
                helper: `${filteredPriceRecords.length} registro(s) com seção`,
            },
        ],
        sourceSummary,
        userSummary,
        sectionSummary,
        trend,
        maxTrendVolume,
        recentActivities: events.slice(0, 8).map(item => ({
            ...item,
            createdLabel: formatDateTime(item.createdAt),
            relativeDate: formatRelativeDate(item.createdAt),
        })),
        exportColumns: [
            { title: "Data", ref: "createdLabel" },
            { title: "Fonte", ref: "sourceLabel" },
            { title: "Título", ref: "title" },
            { title: "Responsável", ref: "actor" },
            { title: "Volume", ref: "volumeLabel" },
            { title: "Descrição", ref: "description" },
        ],
        exportRows: events.map(item => ({
            createdLabel: formatDateTime(item.createdAt),
            sourceLabel: item.sourceLabel,
            title: item.title,
            actor: item.actor,
            volumeLabel: `${item.volume || 0}`,
            description: item.description,
        })),
        totals: {
            catalogItems: catalogItems.length,
            historyEntries: filteredHistory.length,
            promotions: filteredPromotions.length,
            labels: filteredLabelJobs.length,
            batches: filteredBatchJobs.length,
        },
    };
}

function resolveStartDate(period) {
    if (period === "all") return null;

    const now = moment();
    if (period === "7d") return now.clone().subtract(7, "days").startOf("day");
    if (period === "90d") return now.clone().subtract(90, "days").startOf("day");
    return now.clone().subtract(30, "days").startOf("day");
}

function isWithinPeriod(value, startDate) {
    if (!startDate) return true;

    const parsed = moment(value);
    if (!parsed.isValid()) return false;

    return parsed.isSameOrAfter(startDate, "day");
}

function groupBy(items, resolver) {
    return (Array.isArray(items) ? items : []).reduce((result, item) => {
        const key = resolver(item);
        if (!key) return result;
        if (!result[key]) result[key] = [];
        result[key].push(item);
        return result;
    }, {});
}

function formatRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuário";
}

export function formatDateTime(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.format("DD/MM/YYYY [às] HH:mm");
}

export function formatRelativeDate(value) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return parsed.fromNow();
}
