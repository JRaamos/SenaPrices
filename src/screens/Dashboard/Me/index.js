import React from "react";  

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer, PageContent } from "ui/styled";
import useController from "./controller";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardUserCard from "components/Dashboard/UserCard";

import {
    DashboardContainer,
    DashboardGrid,
    DashboardSidebar,
    DashboardMain,
    DashboardCard,
    DashboardSectionTitle,
    DashboardSectionText,
    DashboardProfileName,
    DashboardProfileEmail,
    DashboardProfileMeta,
    DashboardQuickActionGrid,
    DashboardQuickActionCard,
    DashboardQuickActionIcon,
    DashboardQuickActionTitle,
    DashboardQuickActionText,
    DashboardQuickActionButton,
    DashboardSummaryGrid,
    DashboardSummaryItem,
    DashboardSummaryLabel,
    DashboardSummaryValue,
    StyledCore,
    DashboardWarningCard,
    DashboardWarningTitle,
    DashboardWarningText,
} from "./styled";

export default function DashboardMe(){  
    
    const {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
        quickActions
    } = useController()

    return ( 
        <>
            <ContainerAuthenticated actions={actions} loading={loading}>  
                <PageContent>
                    <PageHeader header={header} loading={loading} />
                    <FormSpacer />

                    <DashboardGrid>
                        <DashboardSidebar>
                            <DashboardCard>
                                <DashboardUserCard />
                                <DashboardProfileName>{ profile.displayName }</DashboardProfileName>
                                <DashboardProfileEmail>{ profile.email }</DashboardProfileEmail>
                                <DashboardProfileMeta>
                                    Conta criada em { profile.memberSince } • ID { profile.accountId }
                                </DashboardProfileMeta>
                            </DashboardCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Acesso rápido</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Use estes atalhos para cuidar da segurança da conta e falar com o suporte.
                                </DashboardSectionText>

                                <DashboardQuickActionGrid>
                                    {
                                        quickActions.map(item => (
                                            <DashboardQuickActionCard key={item.key}>
                                                <DashboardQuickActionIcon src={item.icon} alt={`${item.title}-icon`} />
                                                <DashboardQuickActionTitle>{ item.title }</DashboardQuickActionTitle>
                                                <DashboardQuickActionText>{ item.description }</DashboardQuickActionText>
                                                <DashboardQuickActionButton type="button" onClick={item.action}>
                                                    { item.buttonLabel }
                                                </DashboardQuickActionButton>
                                            </DashboardQuickActionCard>
                                        ))
                                    }
                                </DashboardQuickActionGrid>
                            </DashboardCard>
                        </DashboardSidebar>

                        <DashboardMain>
                            <DashboardCard>
                                <DashboardSectionTitle>Resumo da conta</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Informações principais para manutenção do perfil e rastreabilidade dos acessos.
                                </DashboardSectionText>

                                <DashboardSummaryGrid>
                                    {
                                        summaryItems.map(item => (
                                            <DashboardSummaryItem key={item.label}>
                                                <DashboardSummaryLabel>{ item.label }</DashboardSummaryLabel>
                                                <DashboardSummaryValue>{ item.value }</DashboardSummaryValue>
                                            </DashboardSummaryItem>
                                        ))
                                    }
                                </DashboardSummaryGrid>
                            </DashboardCard>

                            <DashboardContainer>
                                <DashboardSectionTitle>Dados do perfil</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Atualize o nome exibido na conta. O e-mail é o identificador principal de acesso e permanece protegido nesta etapa.
                                </DashboardSectionText>

                                <StyledCore register={user} ref={formRef} formItems={formItems} />
                            </DashboardContainer>

                            <DashboardWarningCard>
                                <DashboardWarningTitle>Zona de atenção</DashboardWarningTitle>
                                <DashboardWarningText>
                                    A exclusão da conta remove o acesso e não poderá ser desfeita. Revise com cuidado antes de confirmar essa ação.
                                </DashboardWarningText>
                            </DashboardWarningCard>
                        </DashboardMain>
                    </DashboardGrid>
                </PageContent>
            </ContainerAuthenticated> 
        </>
    );
}
