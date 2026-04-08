import { ReadObject, SaveObject } from "./storage";
import { readCatalogItems } from "./catalog";
import { readPriceRecords } from "./pricing";
import { normalizeUserRole } from "./users";

const PDV_CONFIG_KEY = "pdv-config";
const PDV_SYNC_HISTORY_KEY = "pdv-sync-history";
const PDV_SYNC_HISTORY_LIMIT = 12;

const ALLOWED_TYPES = ["api", "database", "csv", "none"];
const ALLOWED_SYNC_INTERVALS = [15, 30, 60, 360, 1440];
const ALLOWED_SYNC_STATUSES = ["idle", "success", "warning", "error"];

const DEFAULT_PDV_CONFIG = {
    active: false,
    type: "none",
    endpoint: "",
    apiKey: "",
    autoSync: false,
    syncInterval: 60,
    allowUserPriceEdit: true,
    showPdvPricesForAdmin: true,
    showPdvPricesForUsers: true,
    lastSyncAt: "",
    lastSyncStatus: "idle",
    lastSyncMessage: "",
    updatedAt: "",
    updatedBy: null,
};

export function readPdvConfig() {
    const stored = ReadObject(PDV_CONFIG_KEY);
    return sanitizePdvConfig(stored);
}

export function savePdvConfig(values = {}, user = null) {
    const previous = readPdvConfig();
    const nextConfig = sanitizePdvConfig({
        ...previous,
        ...(values || {}),
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email || user?.documentId || user?.id || previous.updatedBy || null,
    });

    SaveObject(PDV_CONFIG_KEY, nextConfig);
    return nextConfig;
}

export function validatePdvConfig(values = {}) {
    const draft = sanitizePdvConfig(values);
    const errors = {};
    const warnings = [];

    if (draft.type === "none") {
        if (draft.active) {
            warnings.push("A integração está marcada como ativa, mas o tipo selecionado é 'Sem integração'.");
        }

        return {
            draft,
            errors,
            warnings,
            errorList: [],
            isValid: true,
        };
    }

    if (!draft.endpoint) {
        errors.endpoint = "Informe o endpoint, conexão ou caminho principal da integração.";
    }

    if (draft.type === "api" && draft.endpoint && !/^https?:\/\//i.test(draft.endpoint)) {
        errors.endpoint = "Use uma URL HTTP/HTTPS válida para a API do PDV.";
    }

    if (draft.type === "database" && draft.endpoint && !/^(mysql|postgresql|mssql|sqlite):\/\//i.test(draft.endpoint)) {
        errors.endpoint = "Use uma string de conexão válida para MySQL, PostgreSQL, SQL Server ou SQLite.";
    }

    if (draft.type === "csv" && draft.endpoint) {
        const looksLikeFilePath = /[\\/]/.test(draft.endpoint);
        const looksLikeCsv = /\.csv$/i.test(draft.endpoint);

        if (!looksLikeFilePath || !looksLikeCsv) {
            errors.endpoint = "Informe um caminho de arquivo CSV válido para a importação monitorada.";
        }
    }

    if (draft.autoSync && !ALLOWED_SYNC_INTERVALS.includes(draft.syncInterval)) {
        errors.syncInterval = "Escolha um intervalo de sincronização suportado.";
    }

    if (draft.type === "api" && draft.active && !draft.apiKey) {
        warnings.push("A integração por API está ativa sem token informado. Isso só funciona se o endpoint for público.");
    }

    if (!draft.allowUserPriceEdit && !draft.showPdvPricesForAdmin && !draft.showPdvPricesForUsers) {
        warnings.push("Com preços ocultos para todos os perfis, a integração perde valor operacional nos fluxos de precificação.");
    }

    if (draft.type === "database") {
        warnings.push("Conexão direta com banco exige backend ou worker dedicado. No navegador, esta tela valida apenas a estrutura da configuração.");
    }

    if (draft.type === "csv") {
        warnings.push("Importação automática por arquivo depende de processo servidor ou desktop observando a pasta monitorada.");
    }

    const errorList = Object.values(errors);

    return {
        draft,
        errors,
        warnings,
        errorList,
        isValid: errorList.length === 0,
    };
}

export function getPdvAccess(user = {}) {
    const role = normalizeUserRole(user);
    const canConfigure = role === "admin" || role === "subadmin";

    return {
        role,
        roleLabel: formatRoleLabel(role),
        canConfigure,
        canView: true,
    };
}

export function getPdvPolicy(user = {}, config = readPdvConfig()) {
    const access = getPdvAccess(user);
    const safeConfig = sanitizePdvConfig(config);
    const integrationEnabled = safeConfig.active && safeConfig.type !== "none";
    const isManager = access.canConfigure;

    const canSeeSuggestedPrice = integrationEnabled && (
        isManager
            ? safeConfig.showPdvPricesForAdmin
            : (safeConfig.allowUserPriceEdit ? safeConfig.showPdvPricesForUsers : true)
    );

    const canEditSuggestedPrice = isManager || !integrationEnabled || safeConfig.allowUserPriceEdit;

    return {
        ...access,
        integrationEnabled,
        canSeeSuggestedPrice,
        canEditSuggestedPrice,
        locksUserPriceEditing: integrationEnabled && !isManager && !safeConfig.allowUserPriceEdit,
        sourceLabel: getPdvTypeLabel(safeConfig.type),
    };
}

export function readPdvSyncHistory() {
    const stored = ReadObject(PDV_SYNC_HISTORY_KEY);
    const items = Array.isArray(stored) ? stored : [];

    return items
        .map(sanitizePdvSyncEntry)
        .filter(item => item.id && item.createdAt)
        .sort((left, right) => `${right.createdAt}`.localeCompare(`${left.createdAt}`))
        .slice(0, PDV_SYNC_HISTORY_LIMIT);
}

export function appendPdvSyncHistory(entry = {}, user = null) {
    const safeEntry = sanitizePdvSyncEntry({
        ...entry,
        id: entry.id || createId("pdv-sync"),
        createdAt: entry.createdAt || new Date().toISOString(),
        actor: entry.actor || user?.email || user?.documentId || user?.id || "Operação local",
    });

    const nextItems = [safeEntry, ...readPdvSyncHistory()].slice(0, PDV_SYNC_HISTORY_LIMIT);
    SaveObject(PDV_SYNC_HISTORY_KEY, nextItems);

    savePdvConfig({
        lastSyncAt: safeEntry.createdAt,
        lastSyncStatus: safeEntry.status,
        lastSyncMessage: safeEntry.message,
    }, user);

    return nextItems;
}

export async function runPdvConnectionTest(values = {}) {
    const validation = validatePdvConfig(values);

    if (!validation.isValid) {
        return {
            status: "error",
            message: validation.errorList[0],
        };
    }

    const config = validation.draft;

    if (config.type === "none") {
        return {
            status: "warning",
            message: "Nenhuma integração ativa foi selecionada para validação.",
        };
    }

    if (config.type === "database") {
        return {
            status: "warning",
            message: "Configuração do banco validada localmente. O teste real depende de backend ou worker com acesso à base externa.",
        };
    }

    if (config.type === "csv") {
        return {
            status: "warning",
            message: "Configuração do arquivo validada localmente. O consumo automático depende de processo servidor ou desktop monitorando a pasta.",
        };
    }

    const endpoint = config.endpoint.trim();

    try {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 5000);

        const response = await fetch(endpoint, {
            method: "GET",
            headers: config.apiKey
                ? { Authorization: `Bearer ${config.apiKey}` }
                : {},
            cache: "no-store",
            signal: controller.signal,
        });

        window.clearTimeout(timeoutId);

        if (response.ok || response.status < 500) {
            return {
                status: "success",
                message: `Endpoint respondeu com status ${response.status}. A configuração da API está consistente para esta etapa.`,
            };
        }

        return {
            status: "warning",
            message: `O endpoint respondeu com status ${response.status}. A URL foi alcançada, mas precisa de revisão antes da sincronização real.`,
        };
    } catch (error) {
        return {
            status: "warning",
            message: "A configuração da API foi validada, mas o navegador não conseguiu confirmar o endpoint diretamente. A verificação final depende de backend, CORS ou ambiente de rede.",
        };
    }
}

export function buildPdvOperationalOverview(user = {}) {
    const config = readPdvConfig();
    const policy = getPdvPolicy(user, config);
    const catalogItems = readCatalogItems();
    const priceRecords = readPriceRecords();
    const identifiedItems = catalogItems.filter(item => item.ean13 || item.internalCode);
    const pricedItems = identifiedItems.filter(item => !!findLatestTrackedPriceForIdentifiers(item));
    const recentSyncs = readPdvSyncHistory().slice(0, 5);

    return {
        config,
        policy,
        recentSyncs,
        summaryItems: [
            { label: "Integração", value: policy.integrationEnabled ? "Ativa" : "Inativa" },
            { label: "Tipo", value: getPdvTypeLabel(config.type) },
            { label: "Catálogo apto", value: `${pricedItems.length}/${identifiedItems.length || 0}` },
            { label: "Registros de preço", value: `${priceRecords.length}` },
        ],
        coverage: {
            catalogItems: catalogItems.length,
            identifiedItems: identifiedItems.length,
            pricedItems: pricedItems.length,
            coveragePercent: identifiedItems.length
                ? Math.round((pricedItems.length / identifiedItems.length) * 100)
                : 0,
        },
    };
}

export function resolvePdvSuggestionForCatalogItem(item = {}, user = {}, priceType = "avista") {
    return resolvePdvSuggestionFromIdentifiers({
        internalCode: item.internalCode,
        ean13: item.ean13,
        title: item.description1,
    }, user, priceType);
}

export function resolvePdvSuggestionForQuery(query = "", user = {}, priceType = "avista") {
    const safeQuery = `${query || ""}`.trim();

    if (!safeQuery || safeQuery.length < 3) {
        return null;
    }

    const catalogItems = readCatalogItems();
    const normalizedQuery = normalizeComparisonValue(safeQuery);
    const isEan = /^\d{13}$/.test(safeQuery);

    const item = catalogItems.find(candidate => (
        (isEan && candidate.ean13 === safeQuery)
        || normalizeComparisonValue(candidate.internalCode) === normalizedQuery
        || normalizeComparisonValue(candidate.description1) === normalizedQuery
    ));

    return resolvePdvSuggestionFromIdentifiers({
        internalCode: item?.internalCode || (!isEan ? safeQuery : ""),
        ean13: item?.ean13 || (isEan ? safeQuery : ""),
        title: item?.description1 || safeQuery,
    }, user, priceType);
}

export function shouldApplyPdvSuggestion(values = {}, suggestion = null) {
    if (!suggestion?.draftPatch) {
        return false;
    }

    return Object.entries(suggestion.draftPatch).some(([key, value]) => !values?.[key] && value);
}

function resolvePdvSuggestionFromIdentifiers(identifiers = {}, user = {}, priceType = "avista") {
    const config = readPdvConfig();
    const policy = getPdvPolicy(user, config);

    if (!policy.canSeeSuggestedPrice) {
        return null;
    }

    const match = findLatestTrackedPriceForIdentifiers(identifiers);

    if (!match) {
        return null;
    }

    const draftPatch = buildDraftPatchFromTrackedPrice(priceType, match.numericValue);

    return {
        trackedAt: match.savedAt,
        source: match.source,
        sourceLabel: getPriceSourceLabel(match.source),
        title: match.title,
        priceLabel: match.primaryPrice,
        numericValue: match.numericValue,
        draftPatch,
        lockSuggestedField: policy.locksUserPriceEditing,
        message: `Preço sugerido a partir do último registro rastreado em ${formatDateTime(match.savedAt)}.`,
    };
}

function findLatestTrackedPriceForIdentifiers(identifiers = {}) {
    const safeEan = sanitizeDigits(identifiers.ean13, 13);
    const safeInternalCode = normalizeComparisonValue(identifiers.internalCode);
    const safeTitle = normalizeComparisonValue(identifiers.title);

    return readPriceRecords().find(item => {
        const sameEan = safeEan && item.eanCode === safeEan;
        const sameInternalCode = safeInternalCode && normalizeComparisonValue(item.internalCode) === safeInternalCode;
        const sameTitle = safeTitle && normalizeComparisonValue(item.title) === safeTitle;
        const numericValue = parsePriceValue(item.primaryPrice);

        if (numericValue === null) {
            return false;
        }

        return sameEan || sameInternalCode || sameTitle;
    }) || null;
}

function buildDraftPatchFromTrackedPrice(priceType, numericValue) {
    if (numericValue === null) {
        return null;
    }

    const formatted = formatInputPrice(numericValue);

    if (priceType === "depor") {
        return { toPrice: formatted };
    }

    if (priceType === "clube") {
        return { clubPrice: formatted };
    }

    if (priceType === "ofertaespecial") {
        return { specialPrice: formatted };
    }

    return { cashPrice: formatted };
}

function sanitizePdvConfig(values = {}) {
    const next = {
        ...DEFAULT_PDV_CONFIG,
        ...(values || {}),
    };

    const type = pickAllowed(next.type, ALLOWED_TYPES, DEFAULT_PDV_CONFIG.type);
    const active = type === "none" ? false : !!next.active;
    const autoSync = type === "none" ? false : !!next.autoSync;

    return {
        active,
        type,
        endpoint: sanitizeText(next.endpoint, 260),
        apiKey: sanitizeText(next.apiKey, 160),
        autoSync,
        syncInterval: pickAllowed(Number(next.syncInterval), ALLOWED_SYNC_INTERVALS, DEFAULT_PDV_CONFIG.syncInterval),
        allowUserPriceEdit: !!next.allowUserPriceEdit,
        showPdvPricesForAdmin: !!next.showPdvPricesForAdmin,
        showPdvPricesForUsers: type === "none" ? false : !!next.showPdvPricesForUsers,
        lastSyncAt: `${next.lastSyncAt || ""}`,
        lastSyncStatus: pickAllowed(next.lastSyncStatus, ALLOWED_SYNC_STATUSES, DEFAULT_PDV_CONFIG.lastSyncStatus),
        lastSyncMessage: sanitizeText(next.lastSyncMessage, 180),
        updatedAt: `${next.updatedAt || ""}`,
        updatedBy: next.updatedBy || null,
    };
}

function sanitizePdvSyncEntry(values = {}) {
    return {
        id: `${values.id || ""}`,
        createdAt: `${values.createdAt || ""}`,
        actor: sanitizeText(values.actor, 80) || "Operação local",
        status: pickAllowed(values.status, ["success", "warning", "error"], "warning"),
        type: pickAllowed(values.type, ["save", "validate", "manual-sync"], "validate"),
        message: sanitizeText(values.message, 220),
        details: sanitizeText(values.details, 180),
    };
}

function parsePriceValue(value) {
    const normalized = `${value || ""}`
        .replace(/[^\d,.-]/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const parsed = Number(normalized);

    if (!Number.isFinite(parsed) || parsed <= 0) {
        return null;
    }

    return Number(parsed.toFixed(2));
}

function formatInputPrice(value) {
    return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatDateTime(value) {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        return "data recente";
    }

    return parsed.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuário";
}

export function getPdvTypeLabel(type) {
    if (type === "api") return "API REST";
    if (type === "database") return "Banco de Dados";
    if (type === "csv") return "CSV / Arquivo";
    return "Sem integração";
}

function getPriceSourceLabel(source) {
    if (source === "quick") return "Criação Rápida";
    return "Criar Preço";
}

function sanitizeText(value, limit) {
    return `${value || ""}`.replace(/\s+/g, " ").trim().slice(0, limit);
}

function sanitizeDigits(value, limit) {
    return `${value || ""}`.replace(/\D/g, "").slice(0, limit);
}

function normalizeComparisonValue(value) {
    return `${value || ""}`.trim().toUpperCase();
}

function pickAllowed(value, allowedValues, fallback) {
    return allowedValues.includes(value) ? value : fallback;
}

function createId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
