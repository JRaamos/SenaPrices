import React from "react";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer } from "ui/styled";
import Core from "components/Form/Core";
import useController from "./controller";
import { DashboardContainer} from "./styled";
import PageHeader from "components/Dashboard/PageHeader";

export default function DashboardMePassword() {

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
                    <Core register={user} ref={formRef} formItems={formItems} />
                </DashboardContainer>
            </ContainerAuthenticated>
        </>
    );
}