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
    FilterToolbar,
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
} from "./styled";

export default function DashboardBatchPrint() {
    const {
        loading,
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

    const allVisibleSelected = (
        candidates.length
        && candidates.every(item => draft.selectedKeys.includes(item.key))
    );

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
                                <CatalogCardTitle>Impressao em lote</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione registros reais do historico e das promocoes para montar um lote consistente de impressao.
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
                                        <FieldCounter>{candidates.length} registro(s)</FieldCounter>
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
                                    {allVisibleSelected ? "Desmarcar visiveis" : "Selecionar visiveis"}
                                </ToolbarButton>
                                <ToolbarButton onClick={handleClearSelection} disabled={!selectedCandidates.length}>
                                    Limpar selecao
                                </ToolbarButton>
                            </ToolbarActions>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Selecao</CatalogCardEyebrow>
                                <CatalogCardTitle>Cartazes disponiveis</CatalogCardTitle>
                                <CatalogCardText>
                                    Monte o lote reaproveitando o que ja foi criado ou programado para a operacao.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!candidates.length ? (
                                <EmptyState>
                                    Nenhum registro disponivel nesta visao. Gere cartazes ou aguarde promocoes atribuidas para alimentar a fila.
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

                        <InlineNotice>
                            {selectedCandidates.length
                                ? `${selectedCandidates.length} selecao(oes) estao prontas para reuso em lote. Use Ctrl+P para imprimir e Ctrl+Shift+A para marcar a visao atual.`
                                : "A fila de lote fica mais segura quando voce reutiliza apenas historico validado e promocoes ativas da operacao."}
                        </InlineNotice>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Ultimos lotes</CatalogCardEyebrow>
                                <CatalogCardTitle>Recuperacao rapida</CatalogCardTitle>
                                <CatalogCardText>
                                    Reaplique uma selecao recente para repetir o mesmo lote sem refazer toda a triagem manual.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentJobs.length ? (
                                <CatalogCardText>
                                    Nenhum lote recente foi salvo ainda nesta base operacional.
                                </CatalogCardText>
                            ) : (
                                <RecentList>
                                    {recentJobs.map(job => (
                                        <RecentItem key={job.id}>
                                            <RecentHeader>
                                                <div>
                                                    <RecentTitle>{job.title}</RecentTitle>
                                                    <RecentMeta>{job.sourceSummary || "Selecao manual"}</RecentMeta>
                                                </div>
                                                <RecentButton onClick={() => handleRestoreRecentJob(job)}>
                                                    Restaurar
                                                </RecentButton>
                                            </RecentHeader>
                                            <RecentMeta>{job.helper}</RecentMeta>
                                            <RecentMeta>{job.createdLabel} - {job.relativeDate}</RecentMeta>
                                        </RecentItem>
                                    ))}
                                </RecentList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Boas praticas</CatalogCardEyebrow>
                                <CatalogCardTitle>Cuidados na operacao</CatalogCardTitle>
                                <CatalogCardText>
                                    O lote deve refletir o fluxo real da loja para preservar rastreabilidade e evitar reimpressao desnecessaria.
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
