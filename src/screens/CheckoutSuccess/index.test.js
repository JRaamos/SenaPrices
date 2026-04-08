import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import { SaveObject } from "services/storage";
import Page from "./";

function mountPage(pathname) {
    window.history.pushState({}, "", pathname);

    mount(
        <BrowserRouter>
            <Page />
        </BrowserRouter>
    );
}

describe("Checkout Success page", () => {
    beforeEach(() => {
        SaveObject("authentication", {});
    });

    it("renders success state when checkout session is present", () => {
        mountPage("/checkout/success?session_id=cs_test_123&plan=profissional");

        cy.contains("Assinatura recebida com sucesso").should("exist");
        cy.contains("Profissional").should("exist");
        cy.contains("Ir para login").should("exist");
    });

    it("renders fallback state when checkout session is missing", () => {
        mountPage("/checkout/success");

        cy.contains("Não foi possível validar a sessão de checkout").should("exist");
        cy.contains("Voltar à apresentação").should("exist");
    });
});
