import React, { useContext, useMemo } from "react";

import {
    UserContent,
    UserName,
    UserInitial,
    InfoContainer,
} from "./styled";

import { useNavigate } from 'react-router-dom';
import { CoreContext } from "context/CoreContext";
import { getAccountEntryPath } from "services/access";

export default function DashboardUserLabel() {
    const n = useNavigate();

    const {user} = useContext(CoreContext) 

    const label = useMemo(() => {
        return user?.name || user?.email
    }, [user])
    
    return (
        <>
            <InfoContainer>
                <UserContent onClick={() => n(getAccountEntryPath(user))}>
                    <UserInitial>{label?.[0]}</UserInitial>
                    <UserName>{label}</UserName>
                </UserContent>
            </InfoContainer>
        </>
    );
}
