import React, { useContext, useState } from "react";  

import { useNavigate } from 'react-router-dom';

import {  

    DashboardMenuOption,
    OptionContainer,
    OptionText,
    DashboardSubMenu,
    DashboardSubMenuItem,
    ChevronIcon,
    DashboardMenuBorder

} from "./styled"; 

import { CoreContext } from "context/CoreContext";
import { Icon } from "ui/styled";

export default function DashboardSideCollapse({ fluid, options }){ 
    const n = useNavigate();
    const navigate = to => {
        const nextPath = `${to || ""}`.startsWith("/") ? `${to}` : `/${to}`;
        n(nextPath);
    }; 

    const { side, setSide } = useContext(CoreContext)
    const [collapsed, setCollapsed] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});

    const handleSide = (item) => {
        if(typeof item?.action === 'function'){
            item?.action()
            return;
        }
        if(item?.children){
            if(!side) {
                setSide(true)
                setCollapsed(true)
                setOpenSubmenus(prev => ({ ...prev, [item.label]: true }));
                return;
            }
            setOpenSubmenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
            return;
        }
        if(!fluid) setSide(false);
        navigate(item.path);
    }

    const handleSubSide = sub => {
        if(collapsed){
            setSide(false)
            setCollapsed(false)
        }
        navigate(sub.path)
    }

    return ( 
        <>  
            {
                (options||[])?.map((item, index) => (
                    <React.Fragment key={item.label}>
                        <DashboardMenuOption
                            opened={side}
                            onClick={() => handleSide(item)}
                        >
                            <Icon icon={item.icon} pointer nomargin width={24} />
                                {
                                    !side ? null : <>
                                        <OptionContainer>
                                            <OptionText>
                                                { item.label }
                                            </OptionText>
                                            {!item.children ? null : <ChevronIcon icon={'chevron-up'} active={openSubmenus[item.label]} />}
                                        </OptionContainer>
                                    </>
                                }
                        </DashboardMenuOption>
                        {
                            !side ? null : <>
                                {item.children && openSubmenus[item.label] && (
                                    <DashboardSubMenu>
                                        {item.children.map(sub => (
                                            <DashboardSubMenuItem key={sub.path} onClick={() => handleSubSide(sub)}>
                                                {sub.label}
                                            </DashboardSubMenuItem>
                                        ))}
                                    </DashboardSubMenu>
                                )}
                                {!item?.border ? null : <DashboardMenuBorder />}
                            </>
                        }
                    </React.Fragment>
                ))
            }
        </>
    );
}
