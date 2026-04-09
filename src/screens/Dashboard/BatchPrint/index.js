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
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
    FilterToolbar,
    MetaBadge,
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
        statusCard,
        summaryItems,
        sourceOptions,
        paperOptions,
        applyPatch,
        handleToggleCandidate,
        handleToggleVisible,
        handleClearSelection,
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
                                <CatalogCardTitle>Impressão em lote</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione registros reais do histórico e das promoções para montar o lote de impressão.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <FilterToolbar>
                                <CatalogField>
                                    <CatalogLabel>Buscar no lote</CatalogLabel>
                                    <CatalogInput
                                        value={draft.search}
                                        placeholder="Buscar por título, descrição, período ou origem"
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
                                    {candidates.length && candidates.every(item => draft.selectedKeys.includes(item.key))
                                        ? "Desmarcar visíveis"
                                        : "Selecionar visíveis"}
                                </ToolbarButton>
                                <ToolbarButton onClick={handleClearSelection} disabled={!selectedCandidates.length}>
                                    Limpar seleção
                                </ToolbarButton>
                            </ToolbarActions>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Seleção</CatalogCardEyebrow>
                                <CatalogCardTitle>Cartazes disponíveis</CatalogCardTitle>
                                <CatalogCardText>
                                    Monte o lote reaproveitando o que já foi criado ou programado para a operação.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!candidates.length ? (
                                <EmptyState>
                                    Nenhum registro disponível nesta visão. Gere cartazes ou aguarde promoções atribuídas para alimentar a fila.
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
                                                    <BatchDetailLabel>Período operacional</BatchDetailLabel>
                                                    <BatchDetailValue>{candidate.periodLabel || "--"}</BatchDetailValue>
                                                </BatchDetail>
                                                <BatchDetail>
                                                    <BatchDetailLabel>Origem dos cartazes</BatchDetailLabel>
                                                    <BatchDetailValue>{candidate.entryTitles.join(" - ") || "Sem títulos adicionais"}</BatchDetailValue>
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
                                {statusCard.tone === "green" ? "Pronto" : "Atenção"}
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
                    </BatchPrintSidebar>
                </BatchPrintLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
