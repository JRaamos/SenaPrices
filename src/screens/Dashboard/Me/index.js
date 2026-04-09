import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    DashboardCard,
    DashboardInfoGrid,
    DashboardInfoLabel,
    DashboardInfoNote,
    DashboardInfoValue,
    DashboardIdentifier,
    DashboardMain,
    DashboardSectionText,
    DashboardSectionTitle,
    DashboardSummaryGrid,
    DashboardSummaryItem,
    DashboardSummaryLabel,
    DashboardSummaryValue,
    StyledCore,
} from "./styled";

export default function DashboardMe() {
    const {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <DashboardMain>
                    <DashboardCard>
                        <DashboardSectionTitle>Dados principais da conta</DashboardSectionTitle>
                        <DashboardSectionText>
                            Informações centrais para identificação, rastreabilidade e suporte da sua conta no SenaPrices.
                        </DashboardSectionText>

                        <DashboardInfoGrid>
                            <div>
                                <DashboardInfoLabel>Nome</DashboardInfoLabel>
                                <DashboardInfoValue>{profile.displayName}</DashboardInfoValue>
                            </div>
                            <div>
                                <DashboardInfoLabel>E-mail</DashboardInfoLabel>
                                <DashboardInfoValue>{profile.email}</DashboardInfoValue>
                            </div>
                            <div>
                                <DashboardInfoLabel>Código de identificação</DashboardInfoLabel>
                                <DashboardIdentifier>{profile.accountId}</DashboardIdentifier>
                            </div>
                        </DashboardInfoGrid>

                        <DashboardInfoNote>
                            Este código aparece nos registros vinculados à sua conta para reforçar a rastreabilidade operacional do sistema.
                        </DashboardInfoNote>

                        <DashboardSummaryGrid>
                            {summaryItems.map(item => (
                                <DashboardSummaryItem key={item.label}>
                                    <DashboardSummaryLabel>{item.label}</DashboardSummaryLabel>
                                    <DashboardSummaryValue>{item.value}</DashboardSummaryValue>
                                </DashboardSummaryItem>
                            ))}
                        </DashboardSummaryGrid>
                    </DashboardCard>

                    <DashboardCard>
                        <DashboardSectionTitle>Atualizar perfil</DashboardSectionTitle>
                        <DashboardSectionText>
                            Ajuste apenas o nome exibido da conta. O e-mail permanece protegido como identificador principal de acesso.
                        </DashboardSectionText>

                        <StyledCore register={user} ref={formRef} formItems={formItems} />
                    </DashboardCard>
                </DashboardMain>
            </PageContent>
        </ContainerAuthenticated>
    );
}
