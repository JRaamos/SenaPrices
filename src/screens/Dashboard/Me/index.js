import React from "react";  

import {  
    DashboardContainer
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer } from "ui/styled";
import Core from "components/Form/Core";
import useController from "./controller";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardUserCard from "components/Dashboard/UserCard";

export default function DashboardMe(){  
    
    const {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated actions={actions} loading={loading}>  
                <PageHeader header={header} />
                <FormSpacer />
                <DashboardContainer>
                    <DashboardUserCard />
                    <Core register={user} ref={formRef} formItems={formItems} />
                </DashboardContainer>
            </ContainerAuthenticated> 
        </>
    );
}