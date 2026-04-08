import React from "react";
import moment from "moment";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer, PageContent } from "ui/styled";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardUserCard from "components/Dashboard/UserCard";
import useController from "./controller";

import {
    AccessActionButton,
    AccessActionRow,
    AccessBadge,
    AccessBadgeRow,
    AccessField,
    AccessFormGrid,
    AccessInput,
    AccessLabel,
    AccessLogHeader,
    AccessLogItem,
    AccessLogList,
    AccessLogMeta,
    AccessLogText,
    AccessLogTitle,
    AccessSearchInput,
    AccessTextarea,
    DashboardCard,
    DashboardGrid,
    DashboardGuidelineCard,
    DashboardGuidelineGrid,
    DashboardGuidelineText,
    DashboardGuidelineTitle,
    DashboardHighlightCard,
    DashboardHighlightLabel,
    DashboardHighlightText,
    DashboardHighlightTitle,
    DashboardMain,
    DashboardNoticeCard,
    DashboardNoticeText,
    DashboardNoticeTitle,
    DashboardProfileEmail,
    DashboardProfileMeta,
    DashboardProfileName,
    DashboardQuickActionButton,
    DashboardQuickActionCard,
    DashboardQuickActionGrid,
    DashboardQuickActionIcon,
    DashboardQuickActionText,
    DashboardQuickActionTitle,
    DashboardSectionText,
    DashboardSectionTitle,
    DashboardSidebar,
    DashboardSummaryGrid,
    DashboardSummaryItem,
    DashboardSummaryLabel,
    DashboardSummaryValue,
    EmptyState,
} from "./styled";

export default function DashboardSupportAccess() {
    const {
        loading,
        header,
        actions,
        canAccess,
        profile,
        summaryItems,
        quickActions,
        latestLogCard,
        statusCard,
        guidelines,
        showForm,
        form,
        search,
        filteredLogs,
        setSearch,
        handlePatch,
        handleCreateLog,
        handleDeleteLog,
    } = useController();

    return (
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

                        <DashboardHighlightCard>
                            <DashboardHighlightLabel>{statusCard.badge}</DashboardHighlightLabel>
                            <DashboardHighlightTitle>{statusCard.title}</DashboardHighlightTitle>
                            <DashboardHighlightText>{statusCard.description}</DashboardHighlightText>
                            <DashboardHighlightText>
                                {latestLogCard.status} • {latestLogCard.date}
                            </DashboardHighlightText>
                        </DashboardHighlightCard>

                        <DashboardCard>
                            <DashboardSectionTitle>Acesso rápido</DashboardSectionTitle>
                            <DashboardSectionText>
                                Navegue entre tickets, conta e auditoria sem perder o contexto do suporte.
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
                        {!canAccess ? (
                            <DashboardCard>
                                <DashboardSectionTitle>Acesso administrativo necessário</DashboardSectionTitle>
                                <DashboardSectionText>
                                    O log de suporte documenta acessos sensíveis a contas de clientes e fica disponível apenas para administradores.
                                </DashboardSectionText>

                                <DashboardNoticeCard>
                                    <DashboardNoticeTitle>Motivo da restrição</DashboardNoticeTitle>
                                    <DashboardNoticeText>
                                        Subadministradores e usuários continuam operando tickets normalmente, mas não podem consultar nem editar a trilha administrativa de acesso.
                                    </DashboardNoticeText>
                                </DashboardNoticeCard>
                            </DashboardCard>
                        ) : (
                            <>
                                <DashboardCard>
                                    <DashboardSectionTitle>Resumo da auditoria</DashboardSectionTitle>
                                    <DashboardSectionText>
                                        Indicadores rápidos do volume de acessos registrados, responsáveis distintos e contas já auditadas.
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

                                {showForm ? (
                                    <DashboardCard>
                                        <DashboardSectionTitle>Registrar novo acesso</DashboardSectionTitle>
                                        <DashboardSectionText>
                                            Documente quem acessou, qual conta foi atendida, o ticket correspondente e a justificativa objetiva da intervenção.
                                        </DashboardSectionText>

                                        <AccessFormGrid>
                                            <AccessField>
                                                <AccessLabel>Data do acesso</AccessLabel>
                                                <AccessInput
                                                    type="date"
                                                    value={form.accessDate}
                                                    onChange={event => handlePatch({ accessDate: event.target.value })}
                                                />
                                            </AccessField>

                                            <AccessField>
                                                <AccessLabel>Responsável</AccessLabel>
                                                <AccessInput
                                                    value={form.adminName}
                                                    placeholder="Ex: Mateus Sena"
                                                    onChange={event => handlePatch({ adminName: event.target.value })}
                                                />
                                            </AccessField>

                                            <AccessField>
                                                <AccessLabel>Conta ou usuário alvo</AccessLabel>
                                                <AccessInput
                                                    value={form.targetUser}
                                                    placeholder="Ex: Loja ABC - Maria Oliveira"
                                                    onChange={event => handlePatch({ targetUser: event.target.value })}
                                                />
                                            </AccessField>

                                            <AccessField>
                                                <AccessLabel>Ticket vinculado</AccessLabel>
                                                <AccessInput
                                                    value={form.ticketCode}
                                                    placeholder="Ex: #452"
                                                    onChange={event => handlePatch({ ticketCode: event.target.value })}
                                                />
                                            </AccessField>

                                            <AccessField $full>
                                                <AccessLabel>Justificativa</AccessLabel>
                                                <AccessTextarea
                                                    value={form.justification}
                                                    placeholder="Explique por que o acesso foi necessário e qual ação operacional motivou a intervenção."
                                                    onChange={event => handlePatch({ justification: event.target.value })}
                                                />
                                            </AccessField>
                                        </AccessFormGrid>

                                        <AccessActionRow>
                                            <AccessActionButton onClick={handleCreateLog} $primary>
                                                Salvar registro
                                            </AccessActionButton>
                                        </AccessActionRow>
                                    </DashboardCard>
                                ) : null}

                                <DashboardCard>
                                    <DashboardSectionTitle>Registros do log</DashboardSectionTitle>
                                    <DashboardSectionText>
                                        Busque por responsável, conta alvo, justificativa ou ticket. Use a exportação para apoiar auditorias formais e histórico de atendimento.
                                    </DashboardSectionText>

                                    <AccessSearchInput
                                        value={search}
                                        placeholder="Buscar por responsável, conta, justificativa ou ticket"
                                        onChange={event => setSearch(event.target.value)}
                                    />

                                    {!filteredLogs.length ? (
                                        <EmptyState>
                                            {search
                                                ? `Nenhum registro encontrado para "${search}".`
                                                : "Nenhum acesso de suporte foi registrado até o momento."}
                                        </EmptyState>
                                    ) : (
                                        <AccessLogList>
                                            {filteredLogs.map(item => (
                                                <AccessLogItem key={item.id}>
                                                    <AccessLogHeader>
                                                        <div>
                                                            <AccessLogTitle>{item.targetUser}</AccessLogTitle>
                                                            <AccessLogMeta>
                                                                {item.adminName} • {item.accessDate}
                                                            </AccessLogMeta>
                                                        </div>

                                                        <AccessBadgeRow>
                                                            <AccessBadge>{item.ticketCode}</AccessBadge>
                                                            <AccessActionButton onClick={() => handleDeleteLog(item)}>
                                                                Excluir
                                                            </AccessActionButton>
                                                        </AccessBadgeRow>
                                                    </AccessLogHeader>

                                                    <AccessLogText>{item.justification}</AccessLogText>
                                                    <AccessLogMeta>Registrado em {moment(item.createdAt).isValid() ? moment(item.createdAt).format("L LT") : "--"}</AccessLogMeta>
                                                </AccessLogItem>
                                            ))}
                                        </AccessLogList>
                                    )}
                                </DashboardCard>
                            </>
                        )}

                        <DashboardCard>
                            <DashboardSectionTitle>Boas práticas da trilha de acesso</DashboardSectionTitle>
                            <DashboardSectionText>
                                O objetivo é manter governança real sobre acessos administrativos, sem depender de memória, conversa informal ou planilhas paralelas.
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
                            <DashboardNoticeTitle>Importante para compliance operacional</DashboardNoticeTitle>
                            <DashboardNoticeText>
                                O log existe para documentar o motivo do acesso administrativo, reforçar responsabilidade individual e reduzir zonas cinzentas no atendimento a clientes.
                            </DashboardNoticeText>
                        </DashboardNoticeCard>
                    </DashboardMain>
                </DashboardGrid>
            </PageContent>
        </ContainerAuthenticated>
    );
}
