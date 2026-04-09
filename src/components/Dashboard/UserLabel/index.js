import React, { useContext, useMemo } from "react";

import {
    UserContent,
    UserInitial,
    InfoContainer,
    UserMeta,
    UserName,
    UserTextGroup,
} from "./styled";

import { useNavigate } from 'react-router-dom';
import { CoreContext } from "context/CoreContext";
import { buildAccessProfile, getAccountEntryPath } from "services/access";

export default function DashboardUserLabel() {
    const n = useNavigate();

    const { user } = useContext(CoreContext);
    const accessProfile = useMemo(() => buildAccessProfile(user), [user]);

    const label = useMemo(() => {
        return user?.name || user?.email
    }, [user])
    
    return (
        <>
            <InfoContainer>
                <UserContent type="button" onClick={() => n(getAccountEntryPath(user))}>
                    <UserInitial>{label?.[0]}</UserInitial>
                    <UserTextGroup>
                        <UserName>{label}</UserName>
                        <UserMeta>{`${accessProfile.roleLabel} - ${accessProfile.planLabel}`}</UserMeta>
                    </UserTextGroup>
                </UserContent>
            </InfoContainer>
        </>
    );
}
