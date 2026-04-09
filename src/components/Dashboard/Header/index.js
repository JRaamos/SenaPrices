import React, { useContext } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
 
import { 
    DashboardHeaderContainer,
    DashboardHeaderAction
} from "./styled"; 
import { CoreContext } from "context/CoreContext";
import DashboardUserLabel from "../UserLabel";

export default function DashboardHeader() {
    const { side, setSide } = useContext(CoreContext);

    return (
        <>
            <DashboardHeaderContainer>
                <DashboardHeaderAction type="button" onClick={() => setSide(!side)}>
                    <MenuRoundedIcon sx={{ fontSize: 20, color: "#1e293b" }} />
                </DashboardHeaderAction>
                <DashboardUserLabel />
            </DashboardHeaderContainer>
        </>
    );
}
