import React from "react";  

import ContainerAuthenticated from "containers/Authenticated";
import useController from "./controller";
import PageHeader from "components/Dashboard/PageHeader"; 
import BasicTable from "components/Form/Table";
import { PageContent } from "ui/styled";

export default function DashboardSupport(){  

    const {
        header,
        table
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated> 
                <PageContent>
                    <PageHeader header={header} />
                    <BasicTable rows={table?.rows} columns={table?.columns} config={table?.config} />
                </PageContent>
            </ContainerAuthenticated> 
        </>
    );
}