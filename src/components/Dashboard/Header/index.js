import React, { useContext } from "react";   
 
import { 
    DashboardHeaderContainer,
    DashboardHeaderAction,
    DashboardHeaderActionIcon
} from "./styled"; 
import { CoreContext } from "context/CoreContext";
import DashboardUserLabel from "../UserLabel";

export default function DashboardHeader(){  
    
    const { side, setSide } = useContext(CoreContext) 

    return ( 
        <> 
            <DashboardHeaderContainer>
                <DashboardHeaderAction onClick={() => setSide(!side)}>
                    <DashboardHeaderActionIcon src={side ? `/icons/close-white.svg` : `/icons/menu.svg`} alt="menu-icon" />
                </DashboardHeaderAction> 
                <DashboardUserLabel />
            </DashboardHeaderContainer> 
        </>
    );
}