import React from "react";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer, PageContent } from "ui/styled";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardUserCard from "components/Dashboard/UserCard";
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
    DashboardHighlightGrid,
    DashboardHighlightCard,
    DashboardHighlightTitle,
    DashboardHighlightText,
    DashboardModuleGrid,
    DashboardModuleCard,
    DashboardModuleHeader,
    DashboardModuleIcon,
    DashboardModuleStatus,
    DashboardModuleTitle,
    DashboardModuleText,
    DashboardModuleButton,
    DashboardRoadmapGrid,
    DashboardRoadmapCard,
    DashboardRoadmapHeader,
    DashboardRoadmapIcon,
    DashboardRoadmapStatus,
    DashboardRoadmapTitle,
    DashboardRoadmapText,
    DashboardTicketList,
    DashboardTicketItem,
    DashboardTicketTitle,
    DashboardTicketMeta,
    DashboardNoticeCard,
    DashboardNoticeTitle,
    DashboardNoticeText,
} from "./styled";

export default function DashboardHome() {
    const {
        header,
        loading,
        profile,
        quickActions,
        summaryItems,
        systemHighlights,
        recentTickets,
        moduleCards,
        roadmapModules,
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

                            <DashboardCard>
                                <DashboardSectionTitle>Ações rápidas</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Atalhos principais da base já ativa do sistema para acelerar seu fluxo de trabalho.
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
                                <DashboardSectionTitle>Resumo operacional</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Uma visão rápida da operação atual do ambiente já disponível no projeto GitHub.
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

                            <DashboardCard>
                                <DashboardSectionTitle>Base atual do sistema</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Estado consolidado do que já está estruturado e pronto para ser expandido com os próximos módulos.
                                </DashboardSectionText>

                                <DashboardHighlightGrid>
                                    {systemHighlights.map(item => (
                                        <DashboardHighlightCard key={item.title}>
                                            <DashboardHighlightTitle>{item.title}</DashboardHighlightTitle>
                                            <DashboardHighlightText>{item.description}</DashboardHighlightText>
                                        </DashboardHighlightCard>
                                    ))}
                                </DashboardHighlightGrid>
                            </DashboardCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Módulos ativos</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Áreas já implementadas no repositório atual e disponíveis para uso e manutenção.
                                </DashboardSectionText>

                                <DashboardModuleGrid>
                                    {moduleCards.map(item => (
                                        <DashboardModuleCard key={item.key}>
                                            <DashboardModuleHeader>
                                                <DashboardModuleIcon src={item.icon} alt={`${item.title}-icon`} />
                                                <DashboardModuleStatus>{item.status}</DashboardModuleStatus>
                                            </DashboardModuleHeader>
                                            <DashboardModuleTitle>{item.title}</DashboardModuleTitle>
                                            <DashboardModuleText>{item.description}</DashboardModuleText>
                                            <DashboardModuleButton type="button" onClick={item.action}>
                                                {item.actionLabel}
                                            </DashboardModuleButton>
                                        </DashboardModuleCard>
                                    ))}
                                </DashboardModuleGrid>
                            </DashboardCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Tickets recentes</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Últimos chamados registrados na fila de suporte para acesso rápido e acompanhamento.
                                </DashboardSectionText>

                                <DashboardTicketList>
                                    {recentTickets.length ? recentTickets.map(item => (
                                        <DashboardTicketItem key={item.id}>
                                            <DashboardTicketTitle>{item.title}</DashboardTicketTitle>
                                            <DashboardTicketMeta>
                                                {item.statusLabel} • {item.date} • {item.relativeDate}
                                            </DashboardTicketMeta>
                                        </DashboardTicketItem>
                                    )) : (
                                        <DashboardTicketItem>
                                            <DashboardTicketTitle>Nenhum ticket registrado ainda</DashboardTicketTitle>
                                            <DashboardTicketMeta>
                                                Assim que o primeiro chamado for criado, ele aparecerá aqui.
                                            </DashboardTicketMeta>
                                        </DashboardTicketItem>
                                    )}
                                </DashboardTicketList>
                            </DashboardCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Próximos módulos mapeados</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Referências funcionais observadas nas páginas locais para guiar as próximas implementações no padrão do GitHub.
                                </DashboardSectionText>

                                <DashboardRoadmapGrid>
                                    {roadmapModules.map(item => (
                                        <DashboardRoadmapCard key={item.key}>
                                            <DashboardRoadmapHeader>
                                                <DashboardRoadmapIcon src={item.icon} alt={`${item.title}-icon`} />
                                                <DashboardRoadmapStatus>{item.status}</DashboardRoadmapStatus>
                                            </DashboardRoadmapHeader>
                                            <DashboardRoadmapTitle>{item.title}</DashboardRoadmapTitle>
                                            <DashboardRoadmapText>{item.description}</DashboardRoadmapText>
                                        </DashboardRoadmapCard>
                                    ))}
                                </DashboardRoadmapGrid>
                            </DashboardCard>

                            <DashboardNoticeCard>
                                <DashboardNoticeTitle>Direção da implantação</DashboardNoticeTitle>
                                <DashboardNoticeText>
                                    Esta home agora funciona como painel central do SenaPrices: mostra o que já está ativo no GitHub e organiza, de forma clara, os módulos que serão portados das páginas locais nas próximas etapas.
                                </DashboardNoticeText>
                            </DashboardNoticeCard>
                        </DashboardMain>
                    </DashboardGrid>
                </PageContent>
            </ContainerAuthenticated>
        </>
    );
}
