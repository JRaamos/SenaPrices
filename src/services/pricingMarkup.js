import moment from "moment";

import { buildPreview, buildPrintStyleTokens, withAlpha } from "screens/Dashboard/CreatePrice/helpers";
import { buildRowPreview, sanitizeQuickDraft } from "screens/Dashboard/QuickPrice/helpers";
import { getPrintStyleSettings } from "./settings";

export function buildHistoryEntryPrintMarkup(entry) {
    const cards = buildCardsFromHistoryEntry(entry);

    return buildPricingDocumentMarkup({
        title: entry?.title || "Histórico SenaPrices",
        subtitle: entry?.summaryLabel || entry?.offerTitle || "",
        cards,
    });
}

export function buildPromotionPrintMarkup(order, entries = []) {
    const cards = entries.flatMap(buildCardsFromHistoryEntry);
    const periodLabel = [formatDate(order?.validFrom), formatDate(order?.validTo)]
        .filter(Boolean)
        .join(" até ");
    const formatLabel = [order?.paperSize, formatOrientation(order?.orientation)]
        .filter(Boolean)
        .join(" ");
    const subtitleParts = [
        periodLabel ? `Vigência ${periodLabel}` : "",
        formatLabel ? `Formato ${formatLabel}` : "",
        order?.description || "",
    ].filter(Boolean);

    return buildPricingDocumentMarkup({
        title: order?.name || "Promoção SenaPrices",
        subtitle: subtitleParts.join(" · "),
        cards,
    });
}

export function buildBatchSelectionPrintMarkup({ title, subtitle, entries = [] }) {
    const uniqueEntries = dedupeHistoryEntries(entries);
    const cards = uniqueEntries.flatMap(buildCardsFromHistoryEntry);

    return buildPricingDocumentMarkup({
        title: title || "Lote SenaPrices",
        subtitle: subtitle || "",
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
                style: preview.style,
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
        style: preview.style,
    }];
}

function buildPricingDocumentMarkup({ title, subtitle, cards = [] }) {
    const safeCards = Array.isArray(cards) ? cards : [];
    const headerStyle = safeCards[0]?.style || buildPrintStyleTokens(getPrintStyleSettings());

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
            font-family: ${headerStyle.infoFontFamily};
            color: #111827;
        }
        .header {
            max-width: 1180px;
            margin: 0 auto 24px;
            padding: 24px 28px;
            border-radius: 24px;
            background: linear-gradient(180deg, ${headerStyle.accentColor} 0%, #0f172a 100%);
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
            font-family: ${headerStyle.titleFontFamily};
            font-size: 34px;
            line-height: 1.02;
            font-weight: 800;
            letter-spacing: -0.05em;
        }
        .header-text {
            margin: 12px 0 0;
            max-width: 760px;
            color: rgba(255,255,255,0.78);
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
        @media (max-width: 840px) {
            .grid {
                grid-template-columns: 1fr;
            }
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
    const style = card.style || buildPrintStyleTokens(getPrintStyleSettings());

    return `
        <article class="card">
            <span
                style="
                    display:inline-block;
                    padding:8px 12px;
                    border-radius:999px;
                    background:${style.accentColor};
                    color:#ffffff;
                    font-size:11px;
                    font-weight:700;
                    letter-spacing:0.08em;
                    text-transform:uppercase;
                "
            >${escapeHtml(card.offerTitle || "Oferta")}</span>
            <h2
                style="
                    margin:14px 0 0;
                    color:#111827;
                    font-family:${style.titleFontFamily};
                    font-size:${Math.max(28, Math.round(style.titleSizePx * 0.72))}px;
                    font-weight:800;
                    line-height:0.98;
                    letter-spacing:-0.05em;
                    text-align:${style.titleAlign};
                    text-transform:${style.titleTransform};
                "
            >${escapeHtml(card.title || "Sem descrição")}</h2>
            ${card.subtitle ? `
                <p
                    style="
                        margin:10px 0 0;
                        color:#475569;
                        font-family:${style.infoFontFamily};
                        font-size:${Math.max(14, Math.round(style.subtitleSizePx * 0.88))}px;
                        line-height:1.5;
                        text-align:${style.titleAlign};
                    "
                >${escapeHtml(card.subtitle)}</p>
            ` : ""}
            <div
                style="
                    margin-top:22px;
                    color:${style.accentColor};
                    font-family:${style.priceFontFamily};
                    font-size:${Math.max(44, Math.round(style.priceSizePx * 0.68))}px;
                    line-height:0.94;
                    font-weight:800;
                    letter-spacing:-0.05em;
                    text-align:${style.priceAlign};
                "
            >${escapeHtml(card.primaryPrice || "R$ --,--")}</div>
            ${card.supportingPrice ? `
                <div
                    style="
                        margin-top:10px;
                        color:#64748b;
                        font-family:${style.infoFontFamily};
                        font-size:${Math.max(16, Math.round(style.supportSizePx * 0.76))}px;
                        line-height:1.35;
                        text-align:${style.priceAlign};
                    "
                >${escapeHtml(card.supportingPrice)}</div>
            ` : ""}
            ${card.specialLabel ? `
                <div
                    style="
                        margin-top:12px;
                        display:inline-block;
                        padding:8px 12px;
                        border-radius:12px;
                        background:${withAlpha(style.highlightColor, 0.12)};
                        color:${style.highlightColor};
                        font-family:${style.infoFontFamily};
                        font-size:13px;
                        font-weight:700;
                    "
                >${escapeHtml(card.specialLabel)}</div>
            ` : ""}
            <div style="margin-top:18px;display:grid;gap:10px;">
                ${card.barcodeLabel ? renderMeta("Código", card.barcodeLabel, style) : ""}
                ${card.validityLabel ? renderMeta("Validade", card.validityLabel, style) : ""}
                ${card.observation ? renderMeta("Observação", card.observation, style) : ""}
            </div>
        </article>
    `;
}

function renderMeta(label, value, style) {
    return `
        <div style="padding:12px 14px;border-radius:14px;background:#f8fbff;border:1px solid #d9e4f2;">
            <div style="color:#64748b;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(label)}</div>
            <div style="margin-top:6px;color:#111827;font-family:${style.infoFontFamily};font-size:13px;font-weight:700;line-height:20px;word-break:break-word;">${escapeHtml(value)}</div>
        </div>
    `;
}

function dedupeHistoryEntries(entries = []) {
    const register = new Map();

    (Array.isArray(entries) ? entries : []).forEach(entry => {
        if (!entry?.id || register.has(entry.id)) {
            return;
        }

        register.set(entry.id, entry);
    });

    return Array.from(register.values());
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
