import moment from "moment";

import { buildPreview } from "screens/Dashboard/CreatePrice/helpers";
import { buildRowPreview, sanitizeQuickDraft } from "screens/Dashboard/QuickPrice/helpers";

export function buildHistoryEntryPrintMarkup(entry) {
    const cards = buildCardsFromHistoryEntry(entry);

    return buildPricingDocumentMarkup({
        title: entry?.title || "Historico SenaPrices",
        subtitle: entry?.summaryLabel || entry?.offerTitle || "",
        cards,
    });
}

export function buildPromotionPrintMarkup(order, entries = []) {
    const cards = entries.flatMap(buildCardsFromHistoryEntry);
    const periodLabel = [formatDate(order?.validFrom), formatDate(order?.validTo)]
        .filter(Boolean)
        .join(" ate ");
    const formatLabel = [order?.paperSize, formatOrientation(order?.orientation)]
        .filter(Boolean)
        .join(" ");
    const subtitleParts = [periodLabel ? `Vigencia ${periodLabel}` : "", formatLabel ? `Formato ${formatLabel}` : "", order?.description || ""]
        .filter(Boolean);

    return buildPricingDocumentMarkup({
        title: order?.name || "Promocao SenaPrices",
        subtitle: subtitleParts.join(" - "),
        cards,
    });
}

function buildCardsFromHistoryEntry(entry = {}) {
    if (!entry?.restoreDraft) {
        return [];
    }

    if (entry.restoreTarget === "quick") {
        const draft = sanitizeQuickDraft(entry.restoreDraft);

        return (draft.rows || []).map(row => {
            const preview = buildRowPreview(draft, row);

            return {
                title: preview.title,
                subtitle: preview.subtitle,
                offerTitle: preview.offerTitle,
                primaryPrice: preview.primaryPrice,
                supportingPrice: preview.supportingPrice,
                specialLabel: preview.specialLabel,
                barcodeLabel: preview.barcodeLabel,
                validityLabel: preview.validityLabel,
                observation: preview.observation,
            };
        });
    }

    const preview = buildPreview(entry.restoreDraft);

    return [{
        title: preview.title,
        subtitle: preview.subtitle,
        offerTitle: preview.offerTitle,
        primaryPrice: preview.primaryPrice,
        supportingPrice: preview.supportingPrice,
        specialLabel: preview.specialLabel,
        barcodeLabel: preview.barcodeLabel,
        validityLabel: preview.validityLabel,
        observation: preview.observation,
    }];
}

function buildPricingDocumentMarkup({ title, subtitle, cards = [] }) {
    const safeCards = Array.isArray(cards) ? cards : [];

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title || "SenaPrices")}</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 24px;
            background: #f3f6fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
        }
        .header {
            max-width: 1180px;
            margin: 0 auto 24px;
            padding: 24px 28px;
            border-radius: 24px;
            background: linear-gradient(180deg, #06346b 0%, #0f172a 100%);
            color: #ffffff;
        }
        .eyebrow {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .header-title {
            margin: 18px 0 0;
            font-size: 34px;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .header-text {
            margin: 12px 0 0;
            max-width: 720px;
            color: rgba(255,255,255,0.76);
            font-size: 15px;
            line-height: 22px;
        }
        .grid {
            max-width: 1180px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
        }
        .card {
            padding: 22px;
            border-radius: 22px;
            background: linear-gradient(180deg, #ffffff 0%, #eef4fb 100%);
            border: 1px solid #d9e4f2;
            break-inside: avoid;
        }
        .badge {
            display: inline-block;
            padding: 8px 12px;
            border-radius: 999px;
            background: #06346b;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .title {
            margin: 14px 0 0;
            font-size: 30px;
            line-height: 0.98;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .subtitle {
            margin: 10px 0 0;
            color: #475569;
            font-size: 14px;
            line-height: 21px;
        }
        .price {
            margin-top: 22px;
            color: #06346b;
            font-size: 48px;
            line-height: 0.94;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .support {
            margin-top: 10px;
            color: #64748b;
            font-size: 18px;
            line-height: 24px;
        }
        .special {
            margin-top: 12px;
            display: inline-block;
            padding: 8px 12px;
            border-radius: 12px;
            background: #fff1ea;
            color: #e86c30;
            font-size: 13px;
            font-weight: 700;
        }
        .meta {
            margin-top: 18px;
            display: grid;
            gap: 10px;
        }
        .meta-item {
            padding: 12px 14px;
            border-radius: 14px;
            background: #f8fbff;
            border: 1px solid #d9e4f2;
        }
        .meta-label {
            color: #64748b;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }
        .meta-value {
            margin-top: 6px;
            color: #111827;
            font-size: 13px;
            font-weight: 700;
            line-height: 20px;
            word-break: break-word;
        }
        @media print {
            body { background: #ffffff; padding: 0; }
            .header { border-radius: 0; margin-bottom: 12px; }
            .grid { gap: 12px; }
            .card { box-shadow: none; }
        }
    </style>
</head>
<body>
    <section class="header">
        <span class="eyebrow">SenaPrices</span>
        <h1 class="header-title">${escapeHtml(title || "SenaPrices")}</h1>
        ${subtitle ? `<p class="header-text">${escapeHtml(subtitle)}</p>` : ""}
    </section>
    <section class="grid">
        ${safeCards.map(renderCard).join("")}
    </section>
</body>
</html>`;
}

function renderCard(card = {}) {
    return `
        <article class="card">
            <span class="badge">${escapeHtml(card.offerTitle || "Oferta")}</span>
            <h2 class="title">${escapeHtml(card.title || "Sem descricao")}</h2>
            ${card.subtitle ? `<p class="subtitle">${escapeHtml(card.subtitle)}</p>` : ""}
            <div class="price">${escapeHtml(card.primaryPrice || "R$ --,--")}</div>
            ${card.supportingPrice ? `<div class="support">${escapeHtml(card.supportingPrice)}</div>` : ""}
            ${card.specialLabel ? `<div class="special">${escapeHtml(card.specialLabel)}</div>` : ""}
            <div class="meta">
                ${card.barcodeLabel ? renderMeta("Codigo", card.barcodeLabel) : ""}
                ${card.validityLabel ? renderMeta("Validade", card.validityLabel) : ""}
                ${card.observation ? renderMeta("Observacao", card.observation) : ""}
            </div>
        </article>
    `;
}

function renderMeta(label, value) {
    return `
        <div class="meta-item">
            <div class="meta-label">${escapeHtml(label)}</div>
            <div class="meta-value">${escapeHtml(value)}</div>
        </div>
    `;
}

function formatDate(value) {
    if (!value) return "";

    const parsed = moment(value, "YYYY-MM-DD", true);
    if (!parsed.isValid()) return "";

    return parsed.format("DD/MM/YYYY");
}

function formatOrientation(value) {
    if (value === "portrait") return "Retrato";
    if (value === "landscape") return "Paisagem";
    return "";
}

function escapeHtml(value) {
    return `${value || ""}`
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
