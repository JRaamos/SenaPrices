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
    DashboardStatusCard,
    DashboardStatusLabel,
    DashboardStatusText,
    DashboardNoticeCard,
    DashboardNoticeTitle,
    DashboardNoticeText,
} from "./styled";

export default function DashboardSupportForm() {
    const {
        loading,
        register,
        formRef,
        formItems,
        header,
        actions,
        profile,
        summaryItems,
        quickActions,
        guidelines,
        statusCard,
        isEditing,
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

                            <DashboardStatusCard color={statusCard.color}>
                                <DashboardStatusLabel color={statusCard.color}>
                                    {statusCard.label}
                                </DashboardStatusLabel>
                                <DashboardStatusText>
                                    {statusCard.helper}
                                </DashboardStatusText>
                            </DashboardStatusCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Acesso rápido</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Navegue entre seus tickets e o perfil da conta sem perder o contexto do atendimento.
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
                                <DashboardSectionTitle>Resumo do ticket</DashboardSectionTitle>
                                <DashboardSectionText>
                                    {isEditing
                                        ? "Visão rápida do atendimento em andamento para facilitar atualização, acompanhamento e manutenção."
                                        : "Referências principais para abertura do chamado com informações mais claras e úteis ao suporte."}
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
                                <DashboardSectionTitle>{isEditing ? "Atualizar ticket" : "Abrir ticket"}</DashboardSectionTitle>
                                <DashboardSectionText>
                                    {isEditing
                                        ? "Atualize o status e refine a descrição conforme o atendimento evolui."
                                        : "Descreva o problema com contexto suficiente para agilizar a análise e a correção."}
                                </DashboardSectionText>

                                <StyledCore register={register} ref={formRef} formItems={formItems} />
                            </DashboardContainer>

                            <DashboardCard>
                                <DashboardSectionTitle>Boas práticas para descrever o problema</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Chamados claros e objetivos reduzem retrabalho, melhoram a rastreabilidade e aceleram a resposta do time.
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
                                <DashboardNoticeTitle>Importante antes de enviar</DashboardNoticeTitle>
                                <DashboardNoticeText>
                                    Nunca registre senhas, tokens, dados de cartão ou qualquer informação confidencial dentro do ticket. Descreva o contexto sem expor segredos operacionais.
                                </DashboardNoticeText>
                            </DashboardNoticeCard>
                        </DashboardMain>
                    </DashboardGrid>
                </PageContent>
            </ContainerAuthenticated>
        </>
    );
}
