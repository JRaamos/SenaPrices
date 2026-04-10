import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import {
    DashboardBrandAccent,
    DashboardBrandButton,
    DashboardBrandMeta,
    DashboardBrandMono,
    DashboardBrandName,
    DashboardBrandRow,
    DashboardCollapsedToggle,
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
    DashboardMobileBar,
    DashboardMobileItem,
    DashboardMobileItemActiveBar,
    DashboardMobileItemIconWrap,
    DashboardMobileItemLabel,
    DashboardVersionContent,
    DashboardVersionText,
} from "./styled";

import DashboardSideCollapse from "../SideCollapse";
import DashboardIconGlyph from "../IconGlyph";
import { CoreContext } from "context/CoreContext";
import { buildAccessProfile, buildSidebarSections, getAccountEntryPath } from "services/access";
import { DoLogout } from "services/authentication";

export default function DashboardSide({ fluid }) {
    const n = useNavigate();
    const location = useLocation();
    const navigate = useCallback((to) => n(`${to || ""}`.startsWith("/") ? to : `/${to}`), [n]);

    const { side, setSide, user } = useContext(CoreContext);
    const [isMobile, setIsMobile] = useState(() => (
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    ));
    const accessProfile = useMemo(() => buildAccessProfile(user), [user]);
    const navigation = useMemo(() => buildSidebarSections(user, true), [user]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return undefined;
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const mobilePrimaryItems = useMemo(() => (
        navigation.primary.slice(0, 4)
    ), [navigation.primary]);

    const isPathActive = useCallback((path = "") => {
        if (!path) {
            return false;
        }

        try {
            const url = new URL(path, "http://localhost");
            const targetPath = url.pathname.replace(/\/+$/, "") || "/";
            const targetSearch = url.search || "";
            const currentPath = (location.pathname || "/").replace(/\/+$/, "") || "/";
            const currentSearch = location.search || "";

            if (targetSearch) {
                return currentPath === targetPath && currentSearch === targetSearch;
            }

            return currentPath === targetPath;
        } catch (error) {
            return false;
        }
    }, [location.pathname, location.search]);

    const activeOutsidePrimary = useMemo(() => {
        const visiblePrimary = mobilePrimaryItems.some(item => isPathActive(item.path));
        if (visiblePrimary) {
            return false;
        }

        const allVisibleOptions = [...navigation.primary, ...navigation.secondary];
        return allVisibleOptions.some(item => isPathActive(item.path));
    }, [isPathActive, mobilePrimaryItems, navigation.primary, navigation.secondary]);

    const handleMobileNavigate = useCallback((item) => {
        if (!item) {
            return;
        }

        if (typeof item.action === "function") {
            item.action();
            setSide(false);
            return;
        }

        if (item.path) {
            setSide(false);
            navigate(item.path);
        }
    }, [navigate, setSide]);

    const collapsed = !side;

    return (
        <>
            {!side && !fluid ? null : (
                <DashboardMenuContainer fluid={fluid} opened={side} onClick={handleBackdropClose}>
                    <DashboardMenu fluid={fluid} opened={side}>
                        <DashboardMenuHeader $collapsed={collapsed}>
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

                            {!collapsed ? (
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
                            ) : null}
                        </DashboardMenuHeader>

                        {collapsed ? (
                            <DashboardCollapsedToggle type="button" onClick={() => setSide(true)}>
                                <ChevronLeftRoundedIcon
                                    sx={{
                                        fontSize: 18,
                                        color: "#cbd5e1",
                                        transform: "rotate(180deg)",
                                        transition: "transform .24s ease",
                                    }}
                                />
                            </DashboardCollapsedToggle>
                        ) : null}

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

            {!isMobile ? null : (
                <DashboardMobileBar>
                    {mobilePrimaryItems.map(item => {
                        const active = isPathActive(item.path);

                        return (
                            <DashboardMobileItem
                                key={item.path}
                                type="button"
                                $active={active}
                                onClick={() => handleMobileNavigate(item)}
                            >
                                <DashboardMobileItemIconWrap>
                                    <DashboardIconGlyph
                                        name={item.iconToken}
                                        size={18}
                                        color={active ? "#93c5fd" : "#64748b"}
                                    />
                                </DashboardMobileItemIconWrap>
                                <DashboardMobileItemLabel>{item.label}</DashboardMobileItemLabel>
                                {active ? <DashboardMobileItemActiveBar /> : null}
                            </DashboardMobileItem>
                        );
                    })}

                    <DashboardMobileItem
                        type="button"
                        $active={side || activeOutsidePrimary}
                        onClick={() => setSide(true)}
                    >
                        <DashboardMobileItemIconWrap>
                            <DashboardIconGlyph
                                name="settings"
                                size={18}
                                color={side || activeOutsidePrimary ? "#93c5fd" : "#64748b"}
                            />
                        </DashboardMobileItemIconWrap>
                        <DashboardMobileItemLabel>Mais</DashboardMobileItemLabel>
                        {side || activeOutsidePrimary ? <DashboardMobileItemActiveBar /> : null}
                    </DashboardMobileItem>
                </DashboardMobileBar>
            )}
        </>
    );
}
