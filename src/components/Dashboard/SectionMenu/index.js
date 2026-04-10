import React from "react";

import DashboardIconGlyph from "components/Dashboard/IconGlyph";

import {
    SectionMenuButton,
    SectionMenuIconWrap,
    SectionMenuLabel,
    SectionMenuList,
    SectionMenuSidebar,
    SectionMenuTitle,
} from "./styled";

export default function DashboardSectionMenu({
    title = "Secoes",
    items = [],
    activeKey = "",
    onChange = () => {},
}) {
    return (
        <SectionMenuSidebar>
            <SectionMenuTitle>{title}</SectionMenuTitle>
            <SectionMenuList>
                {items.map(item => (
                    <SectionMenuButton
                        key={item.key}
                        $active={item.key === activeKey}
                        onClick={() => onChange(item.key)}
                    >
                        <SectionMenuIconWrap>
                            <DashboardIconGlyph
                                name={item.iconToken}
                                size={18}
                                color={item.key === activeKey ? "#3b82f6" : "#64748b"}
                            />
                        </SectionMenuIconWrap>
                        <SectionMenuLabel>{item.label}</SectionMenuLabel>
                    </SectionMenuButton>
                ))}
            </SectionMenuList>
        </SectionMenuSidebar>
    );
}
