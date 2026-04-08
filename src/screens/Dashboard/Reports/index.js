import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    AccessActions,
    AccessButton,
    ActivityHeader,
    ActivityItem,
    ActivityList,
    ActivityMeta,
    ActivityText,
    ActivityTitle,
    BreakdownItem,
    BreakdownList,
    BreakdownMain,
    BreakdownMeta,
    BreakdownTitle,
    BreakdownValue,
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    InlineNotice,
    PeriodButton,
    PeriodToolbar,
    ReportsLayout,
    ReportsMain,
    ReportsSidebar,
    StatCard,
    StatLabel,
    StatMeta,
    StatValue,
    StatsGrid,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    TrendBar,
    TrendBarWrap,
    TrendColumn,
    TrendGrid,
    TrendLabel,
    TrendValue,
} from "./styled";

export default function DashboardReports() {
    const {
        loading,
        access,
        header,
        actions,
        period,
        periodOptions,
        report,
        guidelines,
        setPeriod,
        navigate,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <ReportsLayout>
                    <ReportsMain>
                        {!access.canAccess ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Acesso</CatalogCardEyebrow>
                                    <CatalogCardTitle>Visão gerencial necessária</CatalogCardTitle>
                                    <CatalogCardText>
                                        Esta área consolida indicadores operacionais e fica disponível apenas para perfis com responsabilidade de gestão.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <InlineNotice>
                                    Se você precisa acompanhar volumes, produtividade ou auditoria operacional, solicite liberação a um administrador ou subadministrador.
                                </InlineNotice>

                                <AccessActions>
                                    <AccessButton $primary onClick={() => navigate("dashboard/history")}>
                                        Abrir histórico
                                    </AccessButton>
                                    <AccessButton onClick={() => navigate("dashboard/support")}>
                                        Falar com suporte
                                    </AccessButton>
                                </AccessActions>
                            </CatalogCard>
                        ) : (
                            <>
                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Período</CatalogCardEyebrow>
                                        <CatalogCardTitle>Leitura consolidada da operação</CatalogCardTitle>
                                        <CatalogCardText>
                                            O relatório combina Histórico, Promoções, lotes e Etiquetas para mostrar o que realmente aconteceu na base ativa do SenaPrices.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    <PeriodToolbar>
                                        {periodOptions.map(item => (
                                            <PeriodButton
                                                key={item.value}
                                                $active={period === item.value}
                                                onClick={() => setPeriod(item.value)}
                                            >
                                                {item.label}
                                            </PeriodButton>
                                        ))}
                                    </PeriodToolbar>
                                </CatalogCard>

                                <StatsGrid>
                                    {report.summaryItems.map(item => (
                                        <StatCard key={item.label}>
                                            <StatLabel>{item.label}</StatLabel>
                                            <StatValue>{item.value}</StatValue>
                                            <StatMeta>{item.helper}</StatMeta>
                                        </StatCard>
                                    ))}
                                </StatsGrid>

                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Tendência</CatalogCardEyebrow>
                                        <CatalogCardTitle>Volume por dia</CatalogCardTitle>
                                        <CatalogCardText>
                                            O gráfico abaixo resume o volume de eventos operacionais recentes dentro do período selecionado.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    {!report.trend.length ? (
                                        <InlineNotice>
                                            Ainda não existem eventos suficientes no período selecionado para compor a linha do tempo.
                                        </InlineNotice>
                                    ) : (
                                        <TrendGrid>
                                            {report.trend.map(item => (
                                                <TrendColumn key={item.date}>
                                                    <TrendValue>{item.volume}</TrendValue>
                                                    <TrendBarWrap>
                                                        <TrendBar
                                                            $height={Math.max(18, Math.round((item.volume / report.maxTrendVolume) * 160))}
                                                        />
                                                    </TrendBarWrap>
                                                    <TrendLabel>{item.label}</TrendLabel>
                                                </TrendColumn>
                                            ))}
                                        </TrendGrid>
                                    )}
                                </CatalogCard>

                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Eventos</CatalogCardEyebrow>
                                        <CatalogCardTitle>Atividade recente</CatalogCardTitle>
                                        <CatalogCardText>
                                            Um recorte objetivo das movimentações mais recentes para auditoria rápida da operação.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    {!report.recentActivities.length ? (
                                        <InlineNotice>
                                            Ainda não existem atividades registradas neste período.
                                        </InlineNotice>
                                    ) : (
                                        <ActivityList>
                                            {report.recentActivities.map(item => (
                                                <ActivityItem key={`${item.source}-${item.id}`}>
                                                    <ActivityHeader>
                                                        <div>
                                                            <ActivityTitle>{item.title}</ActivityTitle>
                                                            <ActivityText>{item.description}</ActivityText>
                                                        </div>
                                                        <ActivityMeta>{item.sourceLabel}</ActivityMeta>
                                                    </ActivityHeader>
                                                    <ActivityText>
                                                        {item.actor} • {item.createdLabel} • {item.relativeDate}
                                                    </ActivityText>
                                                </ActivityItem>
                                            ))}
                                        </ActivityList>
                                    )}
                                </CatalogCard>
                            </>
                        )}
                    </ReportsMain>

                    <ReportsSidebar>
                        <StatusCard $tone={access.canAccess ? "green" : "orange"}>
                            <StatusBadge $tone={access.canAccess ? "green" : "orange"}>
                                {access.canAccess ? "Gestão" : "Restrito"}
                            </StatusBadge>
                            <StatusTitle>
                                {access.canAccess ? "Painel liberado" : "Acesso bloqueado"}
                            </StatusTitle>
                            <StatusText>
                                {access.canAccess
                                    ? `Dados consolidados para ${report.periodLabel.toLowerCase()}.`
                                    : "Somente perfis gerenciais podem consultar os indicadores completos."}
                            </StatusText>

                            <SummaryGrid>
                                <SummaryItem>
                                    <SummaryLabel>Perfil</SummaryLabel>
                                    <SummaryValue>{access.roleLabel}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Período</SummaryLabel>
                                    <SummaryValue>{report.periodLabel}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Histórico</SummaryLabel>
                                    <SummaryValue>{report.totals.historyEntries}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Promoções</SummaryLabel>
                                    <SummaryValue>{report.totals.promotions}</SummaryValue>
                                </SummaryItem>
                            </SummaryGrid>
                        </StatusCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Fontes</CatalogCardEyebrow>
                                <CatalogCardTitle>Origem dos eventos</CatalogCardTitle>
                                <CatalogCardText>
                                    Acompanhe quais fluxos estão puxando mais volume dentro do período selecionado.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!report.sourceSummary.length ? (
                                <InlineNotice>
                                    Ainda não existem fontes suficientes para análise neste período.
                                </InlineNotice>
                            ) : (
                                <BreakdownList>
                                    {report.sourceSummary.map(item => (
                                        <BreakdownItem key={item.source}>
                                            <BreakdownMain>
                                                <BreakdownTitle>{item.label}</BreakdownTitle>
                                                <BreakdownMeta>{item.count} evento(s)</BreakdownMeta>
                                            </BreakdownMain>
                                            <BreakdownValue>{item.volume}</BreakdownValue>
                                        </BreakdownItem>
                                    ))}
                                </BreakdownList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Usuários</CatalogCardEyebrow>
                                <CatalogCardTitle>Quem mais operou</CatalogCardTitle>
                                <CatalogCardText>
                                    A lista ajuda a entender concentração de atividade e apoiar redistribuição de carga.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!report.userSummary.length ? (
                                <InlineNotice>
                                    Ainda não existem usuários com eventos suficientes para ranking neste período.
                                </InlineNotice>
                            ) : (
                                <BreakdownList>
                                    {report.userSummary.map(item => (
                                        <BreakdownItem key={item.actor}>
                                            <BreakdownMain>
                                                <BreakdownTitle>{item.actor}</BreakdownTitle>
                                                <BreakdownMeta>{item.count} evento(s)</BreakdownMeta>
                                            </BreakdownMain>
                                            <BreakdownValue>{item.volume}</BreakdownValue>
                                        </BreakdownItem>
                                    ))}
                                </BreakdownList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Seções</CatalogCardEyebrow>
                                <CatalogCardTitle>Áreas com mais giro</CatalogCardTitle>
                                <CatalogCardText>
                                    Leitura rápida das seções mais presentes na precificação rastreada do período.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!report.sectionSummary.length ? (
                                <InlineNotice>
                                    Ainda não existem seções suficientes para montar este recorte.
                                </InlineNotice>
                            ) : (
                                <BreakdownList>
                                    {report.sectionSummary.map(item => (
                                        <BreakdownItem key={item.sectionName}>
                                            <BreakdownMain>
                                                <BreakdownTitle>{item.sectionName}</BreakdownTitle>
                                                <BreakdownMeta>{item.count} ocorrência(s)</BreakdownMeta>
                                            </BreakdownMain>
                                            <BreakdownValue>{item.volume}</BreakdownValue>
                                        </BreakdownItem>
                                    ))}
                                </BreakdownList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Diretrizes</CatalogCardEyebrow>
                                <CatalogCardTitle>Leitura recomendada</CatalogCardTitle>
                                <CatalogCardText>
                                    O objetivo desta tela é apoiar acompanhamento, auditoria e decisão operacional sem depender de planilhas paralelas.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <ChecklistList>
                                {guidelines.map(item => (
                                    <ChecklistItem key={item.title}>
                                        <ChecklistTitle>{item.title}</ChecklistTitle>
                                        <ChecklistText>{item.description}</ChecklistText>
                                    </ChecklistItem>
                                ))}
                            </ChecklistList>
                        </CatalogCard>
                    </ReportsSidebar>
                </ReportsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
