import React, { useContext, useMemo } from "react";

import {
    UserContent,
    UserName,
    UserInitial,
    InfoContainer,
} from "./styled";

import { useNavigate } from 'react-router-dom';
import { CoreContext } from "context/CoreContext";

export default function DashboardUserLabel() {
    const n = useNavigate();
    const navigate = to => n(`/${to}`); 

    const {user} = useContext(CoreContext) 

    const label = useMemo(() => {
        return user?.name || user?.email
    }, [user])
    
    return (
        <>
            <InfoContainer>
                <UserContent onClick={() => navigate('dashboard/me')}>
                    <UserInitial>{label?.[0]}</UserInitial>
                    <UserName>{label}</UserName>
                </UserContent>
            </InfoContainer>
        </>
    );
}