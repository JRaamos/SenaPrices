import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
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
    PeriodButton,
    PeriodToolbar,
    ReportsLayout,
    ReportsMain,
    StatCard,
    StatLabel,
    StatMeta,
    StatValue,
    StatsGrid,
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
        setPeriod,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <ReportsLayout $singleColumn>
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
                            </CatalogCard>
                        ) : (
                            <>
                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Período</CatalogCardEyebrow>
                                        <CatalogCardTitle>Leitura consolidada da operação</CatalogCardTitle>
                                        <CatalogCardText>
                                            Acompanhe o volume de movimentações e o comportamento da operação por janela de tempo.
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
                                            A linha do tempo resume a quantidade de eventos operacionais registrados no período selecionado.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    {!report.trend.length ? (
                                        <CatalogCardText>Sem dados no período.</CatalogCardText>
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

                                <StatsGrid>
                                    <CatalogCard>
                                        <CatalogCardHeader>
                                            <CatalogCardEyebrow>Por origem</CatalogCardEyebrow>
                                            <CatalogCardTitle>Fontes da operação</CatalogCardTitle>
                                            <CatalogCardText>
                                                Entenda quais fluxos estão puxando mais volume no período.
                                            </CatalogCardText>
                                        </CatalogCardHeader>

                                        {!report.sourceSummary.length ? (
                                            <CatalogCardText>Sem dados no período.</CatalogCardText>
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
                                            <CatalogCardEyebrow>Por usuário</CatalogCardEyebrow>
                                            <CatalogCardTitle>Quem mais operou</CatalogCardTitle>
                                            <CatalogCardText>
                                                Visualize a concentração de atividade por operador no período selecionado.
                                            </CatalogCardText>
                                        </CatalogCardHeader>

                                        {!report.userSummary.length ? (
                                            <CatalogCardText>Sem dados no período.</CatalogCardText>
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
                                </StatsGrid>

                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Últimos registros</CatalogCardEyebrow>
                                        <CatalogCardTitle>Atividade recente</CatalogCardTitle>
                                        <CatalogCardText>
                                            Um recorte rápido das movimentações mais recentes do sistema.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    {!report.recentActivities.length ? (
                                        <CatalogCardText>Sem dados no período.</CatalogCardText>
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
                </ReportsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
