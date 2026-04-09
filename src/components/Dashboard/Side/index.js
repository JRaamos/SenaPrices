import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import {
    DashboardBrandAccent,
    DashboardBrandButton,
    DashboardBrandMeta,
    DashboardBrandMono,
    DashboardBrandName,
    DashboardBrandRow,
    DashboardFooterAvatar,
    DashboardFooterCard,
    DashboardFooterHint,
    DashboardFooterInfo,
    DashboardFooterName,
    DashboardMenu,
    DashboardMenuContainer,
    DashboardMenuContent,
    DashboardMenuFooter,
    DashboardMenuHeader,
    DashboardMenuToggle,
    DashboardVersionContent,
    DashboardVersionText,
} from "./styled";

import DashboardSideCollapse from "../SideCollapse";
import { CoreContext } from "context/CoreContext";
import { buildAccessProfile, buildSidebarSections, getAccountEntryPath } from "services/access";
import { DoLogout } from "services/authentication";

export default function DashboardSide({ fluid }) {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`${to || ""}`.startsWith("/") ? to : `/${to}`), [n]);

    const { side, setSide, user } = useContext(CoreContext);
    const accessProfile = useMemo(() => buildAccessProfile(user), [user]);
    const navigation = useMemo(() => buildSidebarSections(user, true), [user]);

    const handleBackdropClose = useCallback((event) => {
        if (!fluid) {
            return;
        }

        if (!event.target.closest(".menu-contant")) {
            setSide(false);
        }
    }, [fluid, setSide]);

    const exit = useCallback(async () => {
        await DoLogout();
        navigate("login");
    }, [navigate]);

    const footerOptions = useMemo(() => {
        const options = [...navigation.secondary];

        options.push({
            label: "Sair",
            iconToken: "exit",
            action: exit,
        });

        return options;
    }, [exit, navigation.secondary]);

    const accountLabel = useMemo(() => (
        user?.name || user?.email || accessProfile.roleLabel
    ), [accessProfile.roleLabel, user]);

    const accountInitial = useMemo(() => (
        `${accountLabel || "S"}`.trim().charAt(0) || "S"
    ), [accountLabel]);

    const collapsed = !side;

    return (
        <>
            {!side && !fluid ? null : (
                <DashboardMenuContainer fluid={fluid} opened={side} onClick={handleBackdropClose}>
                    <DashboardMenu fluid={fluid} opened={side}>
                        <DashboardMenuHeader>
                            <DashboardBrandButton
                                type="button"
                                onClick={() => navigate(accessProfile.defaultPath)}
                            >
                                <DashboardBrandRow>
                                    <DashboardBrandMono $collapsed={collapsed}>SP</DashboardBrandMono>
                                    <DashboardBrandName $collapsed={collapsed}>Sena</DashboardBrandName>
                                    <DashboardBrandAccent $collapsed={collapsed}>Prices</DashboardBrandAccent>
                                </DashboardBrandRow>
                                <DashboardBrandMeta $collapsed={collapsed}>Sistema promocional</DashboardBrandMeta>
                            </DashboardBrandButton>

                            <DashboardMenuToggle type="button" onClick={() => setSide(!side)}>
                                <ChevronLeftRoundedIcon
                                    sx={{
                                        fontSize: 20,
                                        color: "#cbd5e1",
                                        transform: side ? "rotate(0deg)" : "rotate(180deg)",
                                        transition: "transform .24s ease",
                                    }}
                                />
                            </DashboardMenuToggle>
                        </DashboardMenuHeader>

                        <DashboardMenuContent>
                            <DashboardSideCollapse options={navigation.primary} fluid={fluid} />
                        </DashboardMenuContent>

                        <DashboardMenuFooter>
                            <DashboardSideCollapse options={footerOptions} fluid={fluid} />

                            <DashboardFooterCard
                                type="button"
                                $collapsed={collapsed}
                                onClick={() => navigate(getAccountEntryPath(user))}
                            >
                                <DashboardFooterAvatar>{accountInitial}</DashboardFooterAvatar>
                                <DashboardFooterInfo $collapsed={collapsed}>
                                    <DashboardFooterName>{accountLabel}</DashboardFooterName>
                                    <DashboardFooterHint>
                                        {`${accessProfile.roleLabel} - ${accessProfile.planLabel}`}
                                    </DashboardFooterHint>
                                </DashboardFooterInfo>
                            </DashboardFooterCard>

                            <DashboardVersionContent $collapsed={collapsed}>
                                <DashboardVersionText>SenaPrices v1.0.0</DashboardVersionText>
                            </DashboardVersionContent>
                        </DashboardMenuFooter>
                    </DashboardMenu>
                </DashboardMenuContainer>
            )}
        </>
    );
}
