import React from "react";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer, PageContent } from "ui/styled";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardUserCard from "components/Dashboard/UserCard";
import BasicTable from "components/Form/Table";
import useController from "./controller";

import {
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
    DashboardHighlightCard,
    DashboardHighlightLabel,
    DashboardHighlightTitle,
    DashboardHighlightText,
    DashboardGuidelineGrid,
    DashboardGuidelineCard,
    DashboardGuidelineTitle,
    DashboardGuidelineText,
    DashboardTableCard,
    DashboardTableWrapper,
    DashboardNoticeCard,
    DashboardNoticeTitle,
    DashboardNoticeText,
} from "./styled";

export default function DashboardSupport() {
    const {
        header,
        loading,
        table,
        summaryItems,
        quickActions,
        quickGuidelines,
        profile,
        latestTicketCard,
    } = useController();

    return (
        <>
            <ContainerAuthenticated>
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

                            <DashboardHighlightCard>
                                <DashboardHighlightLabel>Último ticket</DashboardHighlightLabel>
                                <DashboardHighlightTitle>{latestTicketCard.title}</DashboardHighlightTitle>
                                <DashboardHighlightText>{latestTicketCard.description}</DashboardHighlightText>
                                <DashboardHighlightText>
                                    {latestTicketCard.status} • {latestTicketCard.date}
                                </DashboardHighlightText>
                            </DashboardHighlightCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Acesso rápido</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Abra novos tickets e navegue para sua conta sem perder o contexto do suporte.
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
                                <DashboardSectionTitle>Resumo dos tickets</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Indicadores rápidos para acompanhar o volume de chamados e o status atual dos atendimentos.
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

                            <DashboardTableCard>
                                <DashboardSectionTitle>Tickets registrados</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Consulte, filtre e acompanhe os chamados já abertos. Use a ação lateral para acessar os detalhes de cada ticket.
                                </DashboardSectionText>

                                <DashboardTableWrapper>
                                    <BasicTable
                                        rows={table?.rows}
                                        columns={table?.columns}
                                        config={table?.config}
                                        loading={table?.loading}
                                    />
                                </DashboardTableWrapper>
                            </DashboardTableCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Boas práticas de acompanhamento</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Uma fila de suporte bem organizada facilita correções, auditoria e manutenção por qualquer integrante do time.
                                </DashboardSectionText>

                                <DashboardGuidelineGrid>
                                    {quickGuidelines.map(item => (
                                        <DashboardGuidelineCard key={item.title}>
                                            <DashboardGuidelineTitle>{item.title}</DashboardGuidelineTitle>
                                            <DashboardGuidelineText>{item.description}</DashboardGuidelineText>
                                        </DashboardGuidelineCard>
                                    ))}
                                </DashboardGuidelineGrid>
                            </DashboardCard>

                            <DashboardNoticeCard>
                                <DashboardNoticeTitle>Importante para o histórico</DashboardNoticeTitle>
                                <DashboardNoticeText>
                                    Sempre mantenha o andamento do ticket atualizado e concentre as informações do atendimento no próprio chamado para facilitar futuras correções e revisões.
                                </DashboardNoticeText>
                            </DashboardNoticeCard>
                        </DashboardMain>
                    </DashboardGrid>
                </PageContent>
            </ContainerAuthenticated>
        </>
    );
}
