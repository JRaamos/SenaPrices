import React from "react";  

import ContainerAuthenticated from "containers/Authenticated";
import useController from "./controller";
import PageHeader from "components/Dashboard/PageHeader"; 
import BasicTable from "components/Form/Table";
import { PageContent } from "ui/styled";
import Core from "components/Form/Core";
import PageActions from "components/Dashboard/PageActions";

export default function DashboardSupportForm(){  

    const {
        header, loading, register, formRef, formItems, actions
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated actions={actions} loading={loading}> 
                <PageContent>
                    <PageHeader header={header} loading={loading} />
                    <Core register={register} ref={formRef} formItems={formItems} />
                </PageContent>
            </ContainerAuthenticated> 
        </>
    );
}