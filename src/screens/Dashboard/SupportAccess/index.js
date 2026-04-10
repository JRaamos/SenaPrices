import React from "react";
import moment from "moment";

import ContainerAuthenticated from "containers/Authenticated";

import { FormSpacer, PageContent } from "ui/styled";
import PageHeader from "components/Dashboard/PageHeader";
import useController from "./controller";

import {
    AccessActionButton,
    AccessActionRow,
    AccessCellLabel,
    AccessDeleteButton,
    AccessField,
    AccessFormGrid,
    AccessInput,
    AccessLabel,
    AccessSearchInput,
    AccessTable,
    AccessTableCell,
    AccessTableHeader,
    AccessTableHeadCell,
    AccessTablePrimaryCell,
    AccessTableRow,
    AccessTextarea,
    AccessTicketPill,
    AuditBanner,
    AuditBannerDot,
    AuditPage,
    AuditStatCard,
    AuditStatGrid,
    AuditStatLabel,
    AuditStatValue,
    DashboardCard,
    DashboardGuidelineCard,
    DashboardGuidelineGrid,
    DashboardGuidelineText,
    DashboardGuidelineTitle,
    DashboardNoticeCard,
    DashboardNoticeText,
    DashboardNoticeTitle,
    DashboardSectionText,
    DashboardSectionTitle,
    EmptyState,
} from "./styled";

const STAT_TONES = ["blue", "orange", "purple", "teal"];

export default function DashboardSupportAccess() {
    const {
        loading,
        header,
        actions,
        canAccess,
        summaryItems,
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

                <AuditPage>
                    <AuditBanner $tone={statusCard.tone}>
                        <AuditBannerDot $tone={statusCard.tone} />
                        {statusCard.title} - {statusCard.description}
                    </AuditBanner>

                    {!canAccess ? (
                        <DashboardCard>
                            <DashboardSectionTitle>Acesso administrativo necessario</DashboardSectionTitle>
                            <DashboardSectionText>
                                O log de suporte documenta acessos sensiveis a contas de clientes e fica disponivel apenas para administradores.
                            </DashboardSectionText>

                            <DashboardNoticeCard>
                                <DashboardNoticeTitle>Motivo da restricao</DashboardNoticeTitle>
                                <DashboardNoticeText>
                                    Subadministradores e usuarios continuam operando tickets normalmente, mas nao podem consultar nem editar a trilha administrativa de acesso.
                                </DashboardNoticeText>
                            </DashboardNoticeCard>
                        </DashboardCard>
                    ) : (
                        <>
                            <DashboardCard>
                                <DashboardSectionTitle>Resumo da auditoria</DashboardSectionTitle>
                                <DashboardSectionText>
                                    Indicadores rapidos do volume de acessos registrados, responsaveis distintos e contas ja auditadas.
                                </DashboardSectionText>

                                <AuditStatGrid>
                                    {summaryItems.map((item, index) => {
                                        const tone = STAT_TONES[index] || "blue";

                                        return (
                                            <AuditStatCard key={item.label} $tone={tone}>
                                                <AuditStatValue $tone={tone}>{item.value}</AuditStatValue>
                                                <AuditStatLabel $tone={tone}>{item.label}</AuditStatLabel>
                                            </AuditStatCard>
                                        );
                                    })}
                                </AuditStatGrid>
                            </DashboardCard>

                            <DashboardCard>
                                <DashboardSectionTitle>Ultimo acesso auditado</DashboardSectionTitle>
                                <DashboardSectionText>{latestLogCard.description}</DashboardSectionText>

                                <AuditStatGrid>
                                    <AuditStatCard $tone="blue">
                                        <AuditStatValue $tone="blue">{latestLogCard.title}</AuditStatValue>
                                        <AuditStatLabel $tone="blue">Conta ou usuario alvo</AuditStatLabel>
                                    </AuditStatCard>
                                    <AuditStatCard $tone="purple">
                                        <AuditStatValue $tone="purple">{latestLogCard.status}</AuditStatValue>
                                        <AuditStatLabel $tone="purple">Ticket vinculado</AuditStatLabel>
                                    </AuditStatCard>
                                    <AuditStatCard $tone="orange">
                                        <AuditStatValue $tone="orange">{latestLogCard.date}</AuditStatValue>
                                        <AuditStatLabel $tone="orange">Data do acesso</AuditStatLabel>
                                    </AuditStatCard>
                                    <AuditStatCard $tone="teal">
                                        <AuditStatValue $tone="teal">{statusCard.badge}</AuditStatValue>
                                        <AuditStatLabel $tone="teal">Status da trilha</AuditStatLabel>
                                    </AuditStatCard>
                                </AuditStatGrid>
                            </DashboardCard>

                            {showForm ? (
                                <DashboardCard>
                                    <DashboardSectionTitle>Registrar acesso</DashboardSectionTitle>
                                    <DashboardSectionText>
                                        Documente quem acessou, qual conta foi atendida, o ticket correspondente e a justificativa objetiva da intervencao.
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
                                            <AccessLabel>Responsavel</AccessLabel>
                                            <AccessInput
                                                value={form.adminName}
                                                placeholder="Ex: Mateus Sena"
                                                onChange={event => handlePatch({ adminName: event.target.value })}
                                            />
                                        </AccessField>

                                        <AccessField>
                                            <AccessLabel>Conta ou usuario alvo</AccessLabel>
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
                                                placeholder="Explique por que o acesso foi necessario e qual acao operacional motivou a intervencao."
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
                                    Busque por responsavel, conta alvo, justificativa ou ticket. Use a exportacao para apoiar auditorias formais e historico de atendimento.
                                </DashboardSectionText>

                                <AccessSearchInput
                                    value={search}
                                    placeholder="Buscar por responsavel, conta, justificativa ou ticket"
                                    onChange={event => setSearch(event.target.value)}
                                />

                                {!filteredLogs.length ? (
                                    <EmptyState>
                                        {search
                                            ? `Nenhum registro encontrado para "${search}".`
                                            : "Nenhum acesso de suporte foi registrado ate o momento."}
                                    </EmptyState>
                                ) : (
                                    <AccessTable>
                                        <AccessTableHeader>
                                            {["Data", "Responsavel", "Conta alvo", "Justificativa", "Ticket", ""].map(label => (
                                                <AccessTableHeadCell key={label}>{label}</AccessTableHeadCell>
                                            ))}
                                        </AccessTableHeader>

                                        {filteredLogs.map((item, index) => (
                                            <AccessTableRow key={item.id} $last={index === filteredLogs.length - 1}>
                                                <AccessTableCell>
                                                    <AccessCellLabel>Data</AccessCellLabel>
                                                    {item.accessDate}
                                                </AccessTableCell>
                                                <AccessTablePrimaryCell>
                                                    <AccessCellLabel>Responsavel</AccessCellLabel>
                                                    {item.adminName}
                                                </AccessTablePrimaryCell>
                                                <AccessTablePrimaryCell>
                                                    <AccessCellLabel>Conta alvo</AccessCellLabel>
                                                    {item.targetUser}
                                                </AccessTablePrimaryCell>
                                                <AccessTableCell>
                                                    <AccessCellLabel>Justificativa</AccessCellLabel>
                                                    {item.justification}
                                                    <div style={{ marginTop: 6, color: "#94a3b8", fontSize: 11, lineHeight: "16px" }}>
                                                        Registrado em {moment(item.createdAt).isValid() ? moment(item.createdAt).format("L LT") : "--"}
                                                    </div>
                                                </AccessTableCell>
                                                <AccessTableCell>
                                                    <AccessCellLabel>Ticket</AccessCellLabel>
                                                    <AccessTicketPill>{item.ticketCode}</AccessTicketPill>
                                                </AccessTableCell>
                                                <AccessTableCell>
                                                    <AccessCellLabel>Acoes</AccessCellLabel>
                                                    <AccessDeleteButton onClick={() => handleDeleteLog(item)}>
                                                        Excluir
                                                    </AccessDeleteButton>
                                                </AccessTableCell>
                                            </AccessTableRow>
                                        ))}
                                    </AccessTable>
                                )}
                            </DashboardCard>
                        </>
                    )}

                    <DashboardCard>
                        <DashboardSectionTitle>Boas praticas da trilha de acesso</DashboardSectionTitle>
                        <DashboardSectionText>
                            O objetivo e manter governanca real sobre acessos administrativos, sem depender de memoria, conversa informal ou planilhas paralelas.
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
                            O log existe para documentar o motivo do acesso administrativo, reforcar responsabilidade individual e reduzir zonas cinzentas no atendimento a clientes.
                        </DashboardNoticeText>
                    </DashboardNoticeCard>
                </AuditPage>
            </PageContent>
        </ContainerAuthenticated>
    );
}
