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
                                {`${profile.roleLabel} \u00b7 ${profile.planLabel} \u00b7 ${profile.subscriptionStatusLabel}`}
                            </DashboardProfileMeta>
                            <DashboardProfileMeta>
                                {`Conta criada em ${profile.memberSince} \u00b7 ID ${profile.accountId}`}
                            </DashboardProfileMeta>
                        </DashboardCard>

                        <DashboardCard>
                            <DashboardSectionTitle>A\u00e7\u00f5es r\u00e1pidas</DashboardSectionTitle>
                            <DashboardSectionText>
                                Atalhos principais da base j\u00e1 ativa do sistema para acelerar seu fluxo de trabalho.
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
                                Uma vis\u00e3o r\u00e1pida da opera\u00e7\u00e3o atual do ambiente j\u00e1 dispon\u00edvel no projeto GitHub.
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
                                Estado consolidado do que j\u00e1 est\u00e1 estruturado e pronto para ser expandido com os pr\u00f3ximos m\u00f3dulos.
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
                            <DashboardSectionTitle>M\u00f3dulos ativos</DashboardSectionTitle>
                            <DashboardSectionText>
                                \u00c1reas j\u00e1 implementadas no reposit\u00f3rio atual e dispon\u00edveis para uso e manuten\u00e7\u00e3o.
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
                                \u00daltimos chamados registrados na fila de suporte para acesso r\u00e1pido e acompanhamento.
                            </DashboardSectionText>

                            <DashboardTicketList>
                                {recentTickets.length ? recentTickets.map(item => (
                                    <DashboardTicketItem key={item.id}>
                                        <DashboardTicketTitle>{item.title}</DashboardTicketTitle>
                                        <DashboardTicketMeta>
                                            {`${item.statusLabel} \u00b7 ${item.date} \u00b7 ${item.relativeDate}`}
                                        </DashboardTicketMeta>
                                    </DashboardTicketItem>
                                )) : (
                                    <DashboardTicketItem>
                                        <DashboardTicketTitle>Nenhum ticket registrado ainda</DashboardTicketTitle>
                                        <DashboardTicketMeta>
                                            Assim que o primeiro chamado for criado, ele aparecer\u00e1 aqui.
                                        </DashboardTicketMeta>
                                    </DashboardTicketItem>
                                )}
                            </DashboardTicketList>
                        </DashboardCard>

                        <DashboardCard>
                            <DashboardSectionTitle>Pr\u00f3ximos m\u00f3dulos mapeados</DashboardSectionTitle>
                            <DashboardSectionText>
                                Refer\u00eancias funcionais observadas nas p\u00e1ginas locais para guiar as pr\u00f3ximas implementa\u00e7\u00f5es no padr\u00e3o do GitHub.
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
                            <DashboardNoticeTitle>Dire\u00e7\u00e3o da implanta\u00e7\u00e3o</DashboardNoticeTitle>
                            <DashboardNoticeText>
                                Esta home funciona como painel central do SenaPrices: mostra o que j\u00e1 est\u00e1 ativo no GitHub e organiza, de forma clara, os m\u00f3dulos que ser\u00e3o portados das p\u00e1ginas locais nas pr\u00f3ximas etapas.
                            </DashboardNoticeText>
                        </DashboardNoticeCard>
                    </DashboardMain>
                </DashboardGrid>
            </PageContent>
        </ContainerAuthenticated>
    );
}
