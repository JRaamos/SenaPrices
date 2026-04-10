import React, { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    ChevronIcon,
    DashboardMenuBorder,
    DashboardMenuGlyph,
    DashboardMenuOption,
    DashboardSubMenu,
    DashboardSubMenuItem,
    OptionContainer,
    OptionText,
} from "./styled";

import { CoreContext } from "context/CoreContext";
import DashboardIconGlyph from "../IconGlyph";

function normalizeRoute(path = "") {
    try {
        const url = new URL(path, "http://localhost");
        return {
            pathname: url.pathname.replace(/\/+$/, "") || "/",
            search: url.search || "",
        };
    } catch (error) {
        return {
            pathname: `${path || ""}`.replace(/\/+$/, "") || "/",
            search: "",
        };
    }
}

export default function DashboardSideCollapse({ fluid, options }) {
    const n = useNavigate();
    const location = useLocation();
    const { side, setSide } = useContext(CoreContext);
    const [openSubmenus, setOpenSubmenus] = useState({});

    const currentRoute = useMemo(() => ({
        pathname: (location.pathname || "/").replace(/\/+$/, "") || "/",
        search: location.search || "",
    }), [location.pathname, location.search]);

    const navigate = (to) => {
        const nextPath = `${to || ""}`.startsWith("/") ? `${to}` : `/${to}`;
        n(nextPath);
    };

    const shouldCloseAfterNavigate = () => (
        !fluid || (typeof window !== "undefined" && window.innerWidth < 1024)
    );

    const isPathActive = (path) => {
        const target = normalizeRoute(path);

        if (target.search) {
            return currentRoute.pathname === target.pathname && currentRoute.search === target.search;
        }

        return currentRoute.pathname === target.pathname;
    };

    const isItemActive = (item) => {
        if (item?.path && isPathActive(item.path)) {
            return true;
        }

        if (item?.children?.length) {
            return item.children.some(child => isPathActive(child.path));
        }

        return false;
    };

    const handleSide = (item) => {
        if (typeof item?.action === "function") {
            item.action();
            return;
        }

        if (item?.children?.length) {
            if (!side) {
                setSide(true);
            }

            setOpenSubmenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
            return;
        }

        if (shouldCloseAfterNavigate()) {
            setSide(false);
        }

        navigate(item.path);
    };

    const handleSubSide = (sub) => {
        if (shouldCloseAfterNavigate()) {
            setSide(false);
        }

        navigate(sub.path);
    };

    return (
        <>
            {(options || []).map((item) => {
                const active = isItemActive(item);
                const submenuOpen = !!openSubmenus[item.label] || (!!item.children?.length && active);

                return (
                    <React.Fragment key={item.label}>
                        <DashboardMenuOption
                            type="button"
                            opened={side}
                            active={active}
                            onClick={() => handleSide(item)}
                        >
                            <DashboardMenuGlyph $active={active}>
                                {item.iconToken ? (
                                    <DashboardIconGlyph
                                        name={item.iconToken}
                                        size={16}
                                        color={active ? "#f8fafc" : "#94a3b8"}
                                    />
                                ) : null}
                            </DashboardMenuGlyph>

                            {!side ? null : (
                                <OptionContainer>
                                    <OptionText active={active}>{item.label}</OptionText>
                                    {!item.children?.length ? null : <ChevronIcon active={submenuOpen} />}
                                </OptionContainer>
                            )}
                        </DashboardMenuOption>

                        {!side ? null : (
                            <>
                                {item.children?.length && submenuOpen ? (
                                    <DashboardSubMenu>
                                        {item.children.map(sub => (
                                            <DashboardSubMenuItem
                                                key={sub.path}
                                                type="button"
                                                active={isPathActive(sub.path)}
                                                onClick={() => handleSubSide(sub)}
                                            >
                                                {sub.label}
                                            </DashboardSubMenuItem>
                                        ))}
                                    </DashboardSubMenu>
                                ) : null}
                                {!item?.border ? null : <DashboardMenuBorder />}
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
}
