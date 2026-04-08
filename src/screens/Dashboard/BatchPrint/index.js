import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    BatchDetail,
    BatchDetailLabel,
    BatchDetailValue,
    BatchDetails,
    BatchHeaderMain,
    BatchList,
    BatchMeta,
    BatchPrintLayout,
    BatchPrintMain,
    BatchPrintSidebar,
    BatchRow,
    BatchRowHeader,
    BatchRowText,
    BatchRowTitle,
    BatchSelectionMark,
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogInput,
    CatalogLabel,
    CatalogSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineNotice,
    MetaBadge,
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    ToolbarActions,
    ToolbarButton,
    FilterToolbar,
} from "./styled";

export default function DashboardBatchPrint() {
    const {
        loading,
        canManage,
        header,
        actions,
        draft,
        candidates,
        selectedCandidates,
        recentJobs,
        statusCard,
        summaryItems,
        guidelines,
        sourceOptions,
        paperOptions,
        applyPatch,
        handleToggleCandidate,
        handleToggleVisible,
        handleClearSelection,
        handleRestoreRecentJob,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <BatchPrintLayout>
                    <BatchPrintMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Consulta</CatalogCardEyebrow>
                                <CatalogCardTitle>Fila unificada de impressao</CatalogCardTitle>
                                <CatalogCardText>
                                    A tela consolida fontes reais de Historico e Promocoes para montar lotes sem duplicar cadastro, sem recriar cartazes e com rastreabilidade preservada.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <FilterToolbar>
                                <CatalogField>
                                    <CatalogLabel>Buscar no lote</CatalogLabel>
                                    <CatalogInput
                                        value={draft.search}
                                        placeholder="Buscar por titulo, descricao, periodo ou origem"
                                        onChange={event => applyPatch({ search: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{candidates.length} registro(s) visivel(is)</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Origem</CatalogLabel>
                                    <CatalogSelect
                                        value={draft.source}
                                        onChange={event => applyPatch({ source: event.target.value })}
                                    >
                                        {sourceOptions.map(option => (
                                            <option key={option.value || "all"} value={option.value}>{option.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Formato</CatalogLabel>
                                    <CatalogSelect
                                        value={draft.paperSize}
                                        onChange={event => applyPatch({ paperSize: event.target.value })}
                                    >
                                        {paperOptions.map(option => (
                                            <option key={option.value || "all"} value={option.value}>{option.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>
                            </FilterToolbar>

                            <ToolbarActions>
                                <ToolbarButton $tone="primary" onClick={handleToggleVisible} disabled={!candidates.length}>
                                    {candidates.length && candidates.every(item => draft.selectedKeys.includes(item.key))
                                        ? "Desmarcar visiveis"
                                        : "Selecionar visiveis"}
                                </ToolbarButton>
                                <ToolbarButton onClick={handleClearSelection} disabled={!selectedCandidates.length}>
                                    Limpar selecao
                                </ToolbarButton>
                            </ToolbarActions>

                            <InlineNotice>
                                {canManage
                                    ? "Admin e subadmin podem montar o lote com historico operacional e promocoes ativas. O sistema deduplica registros repetidos antes da impressao para evitar cartazes em dobro."
                                    : "O usuario operacional ve apenas o proprio historico e as promocoes atribuidas ao seu usuario. Registros expirados ou nao autorizados nao entram na fila."}
                            </InlineNotice>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Selecao</CatalogCardEyebrow>
                                <CatalogCardTitle>Fontes disponiveis para o lote</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione registros operacionais ou campanhas programadas. A impressao em lote reaproveita exatamente as mesmas fontes ja validadas nos modulos anteriores.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!candidates.length ? (
                                <EmptyState>
                                    Nenhum registro disponivel nesta visao. Gere cartazes no Historico ou aguarde novas promocoes atribuidas para alimentar a fila de impressao.
                                </EmptyState>
                            ) : (
                                <BatchList>
                                    {candidates.map(candidate => (
                                        <BatchRow
                                            key={candidate.key}
                                            $selected={draft.selectedKeys.includes(candidate.key)}
                                            $tone={candidate.statusTone}
                                            onClick={() => handleToggleCandidate(candidate.key)}
                                        >
                                            <BatchRowHeader>
                                                <BatchHeaderMain>
                                                    <BatchRowTitle>{candidate.title}</BatchRowTitle>
                                                    <BatchRowText>{candidate.description}</BatchRowText>
                                                    <BatchMeta>
                                                        <MetaBadge $tone={candidate.statusTone}>{candidate.statusLabel}</MetaBadge>
                                                        <MetaBadge $tone="blue">{candidate.sourceLabel}</MetaBadge>
                                                        <MetaBadge>{candidate.cardsLabel}</MetaBadge>
                                                        <MetaBadge>{candidate.paperLabel || "--"}</MetaBadge>
                                                    </BatchMeta>
                                                </BatchHeaderMain>

                                                <BatchSelectionMark $selected={draft.selectedKeys.includes(candidate.key)} />
                                            </BatchRowHeader>

                                            <BatchDetails>
                                                <BatchDetail>
                                                    <BatchDetailLabel>{candidate.detailLabel}</BatchDetailLabel>
                                                    <BatchDetailValue>{candidate.detailValue || "--"}</BatchDetailValue>
                                                </BatchDetail>
                                                <BatchDetail>
                                                    <BatchDetailLabel>Periodo operacional</BatchDetailLabel>
                                                    <BatchDetailValue>{candidate.periodLabel || "--"}</BatchDetailValue>
                                                </BatchDetail>
                                                <BatchDetail>
                                                    <BatchDetailLabel>Origem dos cartazes</BatchDetailLabel>
                                                    <BatchDetailValue>{candidate.entryTitles.join(" - ") || "Sem titulos adicionais"}</BatchDetailValue>
                                                </BatchDetail>
                                                <BatchDetail>
                                                    <BatchDetailLabel>Chave da fila</BatchDetailLabel>
                                                    <BatchDetailValue>{candidate.key}</BatchDetailValue>
                                                </BatchDetail>
                                            </BatchDetails>
                                        </BatchRow>
                                    ))}
                                </BatchList>
                            )}
                        </CatalogCard>
                    </BatchPrintMain>

                    <BatchPrintSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Pronto" : "Atencao"}
                            </StatusBadge>
                            <StatusTitle>{statusCard.title}</StatusTitle>
                            <StatusText>{statusCard.description}</StatusText>

                            <SummaryGrid>
                                {summaryItems.map(item => (
                                    <SummaryItem key={item.label}>
                                        <SummaryLabel>{item.label}</SummaryLabel>
                                        <SummaryValue>{item.value}</SummaryValue>
                                    </SummaryItem>
                                ))}
                            </SummaryGrid>
                        </StatusCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Recentes</CatalogCardEyebrow>
                                <CatalogCardTitle>Lotes recentes</CatalogCardTitle>
                                <CatalogCardText>
                                    Retome selecoes ja impressas para repetir a operacao sem remontar a fila do zero.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentJobs.length ? (
                                <EmptyState>
                                    Os ultimos lotes impressos aparecerao aqui.
                                </EmptyState>
                            ) : (
                                <RecentList>
                                    {recentJobs.map(item => (
                                        <RecentItem key={item.id}>
                                            <RecentHeader>
                                                <div>
                                                    <RecentTitle>{item.title || "Lote operacional"}</RecentTitle>
                                                    <RecentMeta>{item.helper}</RecentMeta>
                                                    <RecentMeta>{item.sourceSummary || item.createdLabel}</RecentMeta>
                                                    <RecentMeta>{item.relativeDate}</RecentMeta>
                                                </div>
                                                <RecentButton type="button" onClick={() => handleRestoreRecentJob(item)}>
                                                    Restaurar
                                                </RecentButton>
                                            </RecentHeader>
                                        </RecentItem>
                                    ))}
                                </RecentList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Checklist</CatalogCardEyebrow>
                                <CatalogCardTitle>Diretrizes do lote</CatalogCardTitle>
                                <CatalogCardText>
                                    A impressao em lote foi desenhada para ganhar escala sem quebrar o encadeamento dos modulos que ja estao ativos.
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
                    </BatchPrintSidebar>
                </BatchPrintLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
