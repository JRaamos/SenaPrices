import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { createCatalogItem } from "services/catalog";
import { appendRecentLabelJob } from "services/labels";
import { recordPricingOperation } from "services/pricing";
import { createPromotionOrder } from "services/promotions";
import { SaveObject } from "services/storage";
import Page from "./";

import { appendRecentBatchPrintJob } from "../BatchPrint/storage";

const ADMIN_USER = {
    id: 1,
    documentId: "admin-doc-01",
    name: "Mateus Sena",
    email: "mateus@senaprices.com",
    role: { name: "admin" },
    createdAt: "2026-04-01T10:00:00.000Z",
    created_at: "2026-04-01T10:00:00.000Z",
};

const OPERATOR_USER = {
    id: 2,
    documentId: "user-doc-02",
    name: "Joao Operador",
    email: "joao@senaprices.com",
    role: { name: "user" },
    createdAt: "2026-04-01T10:00:00.000Z",
    created_at: "2026-04-01T10:00:00.000Z",
};

function ensureScrollRoot() {
    if (!document.getElementById("body-scroll")) {
        const scrollRoot = document.createElement("div");
        scrollRoot.id = "body-scroll";
        scrollRoot.scrollTo = () => {};
        document.body.appendChild(scrollRoot);
    }
}

function mountPage() {
    ensureScrollRoot();

    mount(
        <BrowserRouter>
            <CoreState>
                <Page />
                <ToastContainer />
            </CoreState>
        </BrowserRouter>
    );
}

function resetStorage(user = ADMIN_USER) {
    SaveObject("authentication", { jwt: "fake-jwt-token" });
    SaveObject("user", user);
    SaveObject("catalog-items", []);
    SaveObject("catalog-sections", []);
    SaveObject("pricing-history", []);
    SaveObject("pricing-records", []);
    SaveObject("promotion-orders", []);
    SaveObject("label-recent-jobs", []);
    SaveObject("batch-print-recent-jobs", []);
}

function seedReportData() {
    createCatalogItem({
        internalCode: "CAFE500",
        ean13: "7891234567895",
        description1: "Cafe Pilao 500g",
        description2: "Tradicional",
        section: "Mercearia",
        unit: "pacote",
    }, ADMIN_USER);

    const { historyEntry } = recordPricingOperation({
        source: "manual",
        restoreTarget: "manual",
        createdBy: ADMIN_USER.email,
        savedAt: "2026-04-08T14:00:00.000Z",
        printedAt: "2026-04-08T14:05:00.000Z",
        priceType: "avista",
        paperSize: "A5",
        orientation: "portrait",
        title: "Cafe Pilao 500g",
        offerTitle: "Oferta da Semana",
        summaryLabel: "R$ 12,90 - A5 Retrato",
        records: [
            {
                title: "Cafe Pilao 500g",
                primaryPrice: "R$ 12,90",
                offerTitle: "Oferta da Semana",
                priceType: "avista",
                paperSize: "A5",
                orientation: "portrait",
                internalCode: "CAFE500",
                eanCode: "7891234567895",
                sectionName: "Mercearia",
                unitLabel: "pacote",
            },
        ],
    });

    createPromotionOrder({
        name: "Campanha do cafe",
        description: "Reposicao da ponta de gondola",
        validFrom: "2026-04-08",
        validTo: "2026-04-12",
        paperSize: "A5",
        orientation: "portrait",
        historyEntryIds: [historyEntry.id],
        assignedUserIds: [OPERATOR_USER.documentId],
        assignedUserNames: [OPERATOR_USER.name],
        entryTitles: ["Cafe Pilao 500g"],
        totalCards: 1,
        createdAt: "2026-04-08T15:00:00.000Z",
    }, ADMIN_USER);

    appendRecentBatchPrintJob({
        id: "batch-job-01",
        title: "Lote da segunda-feira",
        createdAt: "2026-04-08T16:00:00.000Z",
        sourceSummary: "Historico operacional",
        totalSelections: 1,
        totalCards: 1,
        selectedKeys: ["history-entry-01"],
    });

    appendRecentLabelJob({
        id: "label-job-01",
        title: "Etiquetas do cafe",
        createdAt: "2026-04-08T17:00:00.000Z",
        totalItems: 1,
        totalLabels: 4,
        preset: "58x30",
        selectedItemIds: ["CAFE500"],
    });
}

describe("Dashboard Reports page", () => {
    beforeEach(() => {
        ensureScrollRoot();
    });

    it("renders management indicators for admin profiles", () => {
        resetStorage(ADMIN_USER);
        seedReportData();

        mountPage();

        cy.contains("Relatórios").should("exist");
        cy.contains("Leitura consolidada da operação").should("exist");
        cy.contains("Cartazes rastreados").should("exist");
        cy.contains("Promoções ativas").should("exist");
        cy.contains("Campanha do cafe").should("exist");
        cy.contains("Mercearia").should("exist");
    });

    it("shows restricted access message to regular users", () => {
        resetStorage(OPERATOR_USER);
        seedReportData();

        mountPage();

        cy.contains("Visão gerencial necessária").should("exist");
        cy.contains("Abrir histórico").should("exist");
        cy.contains("Falar com suporte").should("exist");
    });
});
