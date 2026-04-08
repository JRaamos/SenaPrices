import React, { useCallback, useContext, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import {
    DashboardMenuContainer,
    DashboardMenu,
    DashboardMenuHeader,
    DashboardMenuHeaderIcon,
    DashboardMenuHeaderUserContent,
    DashboardMenuHeaderUserImage,
    DashboardMenuContent,
    DashboardMenuFooter,
    DashboardVersionContent,
    DashboardVersionText,
} from "./styled";

import { CoreContext } from "context/CoreContext";
import DashboardSideCollapse from "../SideCollapse";
import { DoLogout } from "services/authentication";
import { canManagePromotions } from "services/users";

export default function DashboardSide({ fluid }) {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { side, setSide, user } = useContext(CoreContext);
    const canManage = canManagePromotions(user);

    const verifyClose = event => {
        if (!event.target.closest(".menu-contant")) {
            setSide(false);
        }
    };

    const exit = useCallback(async () => {
        await DoLogout();
        navigate("login");
    }, [navigate]);

    const menuOptions = useMemo(() => ([
        { label: "Home", icon: "home", path: "dashboard", border: true },
        { label: "Criar Preço", icon: "products", path: "dashboard/prices/create" },
        { label: "Criação Rápida", icon: "products", path: "dashboard/prices/quick" },
        { label: "Impressão em Lote", icon: "products", path: "dashboard/prices/batch" },
        { label: "Histórico", icon: "products", path: "dashboard/history" },
        { label: "Promoções", icon: "products", path: "dashboard/promotions" },
        { label: "Etiquetas", icon: "products", path: "dashboard/labels" },
        { label: "Integração PDV", icon: "products", path: "dashboard/integration" },
        ...(canManage ? [
            { label: "Itens", icon: "products", path: "dashboard/items" },
            { label: "Criar Item", icon: "products", path: "dashboard/items/create" },
            { label: "Importar", icon: "products", path: "dashboard/items/import" },
            { label: "Definições", icon: "training", path: "dashboard/settings" },
            { label: "Relatórios", icon: "training", path: "dashboard/reports" },
        ] : []),
        { label: "Suporte", icon: "proposal", path: "dashboard/support" },
    ]), [canManage]);

    const footerOptions = useMemo(() => ([
        {
            label: "Minha Conta",
            icon: "user",
            children: [
                { label: "Meu Perfil", path: "dashboard/me" },
                { label: "Senha e segurança", path: "dashboard/me/password" },
            ],
        },
        { label: "Sair", icon: "exit", action: exit },
    ]), [exit]);

    return (
        <>
            {!side && !fluid ? null : (
                <DashboardMenuContainer fluid={fluid} opened={side} onClick={verifyClose}>
                    <DashboardMenu fluid={fluid} opened={side}>
                        {fluid ? null : (
                            <DashboardMenuHeader onClick={() => setSide(false)}>
                                <DashboardMenuHeaderIcon src="/icons/close-white.svg" />
                            </DashboardMenuHeader>
                        )}

                        <DashboardMenuHeaderUserContent fluid={fluid}>
                            <DashboardMenuHeaderUserImage opened={side} />
                        </DashboardMenuHeaderUserContent>

                        <DashboardMenuContent>
                            <DashboardSideCollapse options={menuOptions} fluid={fluid} />
                        </DashboardMenuContent>

                        <DashboardMenuFooter>
                            <DashboardSideCollapse options={footerOptions} fluid={fluid} />
                            <DashboardVersionContent>
                                <DashboardVersionText>1.0.0</DashboardVersionText>
                                <DashboardVersionText>1.10.1.201</DashboardVersionText>
                            </DashboardVersionContent>
                        </DashboardMenuFooter>
                    </DashboardMenu>
                </DashboardMenuContainer>
            )}
        </>
    );
}
