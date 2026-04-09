import React, { useCallback, useContext, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import {
    DashboardMenu,
    DashboardMenuContainer,
    DashboardMenuContent,
    DashboardMenuFooter,
    DashboardMenuHeader,
    DashboardMenuHeaderIcon,
    DashboardMenuHeaderUserContent,
    DashboardMenuHeaderUserImage,
    DashboardVersionContent,
    DashboardVersionText,
} from "./styled";

import DashboardSideCollapse from "../SideCollapse";
import { CoreContext } from "context/CoreContext";
import { buildAccessProfile, buildSidebarSections } from "services/access";
import { DoLogout } from "services/authentication";

export default function DashboardSide({ fluid }) {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const { side, setSide, user } = useContext(CoreContext);
    const accessProfile = useMemo(() => buildAccessProfile(user), [user]);
    const navigation = useMemo(() => buildSidebarSections(user, true), [user]);

    const verifyClose = event => {
        if (!event.target.closest(".menu-contant")) {
            setSide(false);
        }
    };

    const exit = useCallback(async () => {
        await DoLogout();
        navigate("login");
    }, [navigate]);

    const footerOptions = useMemo(() => {
        const groups = [...navigation.secondary];

        groups.push({
            label: "Sair",
            icon: "exit",
            action: exit,
        });

        return groups.filter(item => !item.children || item.children.length);
    }, [exit, navigation.secondary]);

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
                            <DashboardSideCollapse options={navigation.primary} fluid={fluid} />
                        </DashboardMenuContent>

                        <DashboardMenuFooter>
                            <DashboardSideCollapse options={footerOptions} fluid={fluid} />
                            <DashboardVersionContent>
                                <DashboardVersionText>{accessProfile.roleLabel}</DashboardVersionText>
                                <DashboardVersionText>{accessProfile.planLabel}</DashboardVersionText>
                            </DashboardVersionContent>
                        </DashboardMenuFooter>
                    </DashboardMenu>
                </DashboardMenuContainer>
            )}
        </>
    );
}
