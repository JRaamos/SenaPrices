import React from "react";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer, PageContent } from "ui/styled";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardUserCard from "components/Dashboard/UserCard";
import useController from "./controller";

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
    DashboardGuidelineGrid,
    DashboardGuidelineCard,
    DashboardGuidelineTitle,
    DashboardGuidelineText,
    DashboardNoticeCard,
    DashboardNoticeTitle,
    DashboardNoticeText,
} from "./styled";

export default function DashboardMePassword() {
    const {
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
        quickActions,
        guidelines,
    } = useController();

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
                                <DashboardProfileName>{profile.displayName}</DashboardProfileName>
                                <DashboardProfileEmail>{profile.email}</DashboardProfileEmail>
                                <DashboardProfileMeta>
                                    Conta criada em {profile.memberSince} • ID {profile.accountId}
                                </DashboardProfileMeta>
                            </DashboardCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Acesso rápido</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Navegue entre perfil, suporte e demais pontos de manutenção sem sair da área segura.
                                </DashboardSectionText>

                                <DashboardQuickActionGrid>
                                    {quickActions.map(item => (
                                        <DashboardQuickActionCard key={item.key}>
                                            <DashboardQuickActionIcon src={item.icon} alt={`${item.title}-icon`} />
                                            <DashboardQuickActionTitle>{item.title}</DashboardQuickActionTitle>
                                            <DashboardQuickActionText>{item.description}</DashboardQuickActionText>
                                            <DashboardQuickActionButton type="button" onClick={item.action}>
                                                {item.buttonLabel}
                                            </DashboardQuickActionButton>
                                        </DashboardQuickActionCard>
                                    ))}
                                </DashboardQuickActionGrid>
                            </DashboardCard>
                        </DashboardSidebar>

                        <DashboardMain>
                            <DashboardCard>
                                <DashboardSectionTitle>Resumo de segurança</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Referências principais da conta para apoiar auditoria, atualização e suporte ao acesso.
                                </DashboardSectionText>

                                <DashboardSummaryGrid>
                                    {summaryItems.map(item => (
                                        <DashboardSummaryItem key={item.label}>
                                            <DashboardSummaryLabel>{item.label}</DashboardSummaryLabel>
                                            <DashboardSummaryValue>{item.value}</DashboardSummaryValue>
                                        </DashboardSummaryItem>
                                    ))}
                                </DashboardSummaryGrid>
                            </DashboardCard>

                            <DashboardContainer>
                                <DashboardSectionTitle>Atualizar senha</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Defina uma nova senha forte para proteger sua conta. A confirmação e a política mínima são verificadas antes do envio.
                                </DashboardSectionText>

                                <StyledCore ref={formRef} formItems={formItems} />
                            </DashboardContainer>

                            <DashboardCard>
                                <DashboardSectionTitle>Boas práticas</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Recomendações simples para manter o acesso seguro e facilitar futuras manutenções do ambiente.
                                </DashboardSectionText>

                                <DashboardGuidelineGrid>
                                    {guidelines.map(item => (
                                        <DashboardGuidelineCard key={item.title}>
                                            <DashboardGuidelineTitle>{item.title}</DashboardGuidelineTitle>
                                            <DashboardGuidelineText>{item.description}</DashboardGuidelineText>
                                        </DashboardGuidelineCard>
                                    ))}
                                </DashboardGuidelineGrid>
                            </DashboardCard>

                            <DashboardNoticeCard>
                                <DashboardNoticeTitle>Importante após salvar</DashboardNoticeTitle>
                                <DashboardNoticeText>
                                    Depois da alteração, utilize a nova senha nos próximos acessos e remova registros antigos salvos em navegadores, anotações ou dispositivos compartilhados.
                                </DashboardNoticeText>
                            </DashboardNoticeCard>
                        </DashboardMain>
                    </DashboardGrid>
                </PageContent>
            </ContainerAuthenticated>
        </>
    );
}
