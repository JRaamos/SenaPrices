import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
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
    HistoryActionButton,
    HistoryActions,
    HistoryDetail,
    HistoryDetailLabel,
    HistoryDetailValue,
    HistoryDetails,
    HistoryHeaderMain,
    HistoryLayout,
    HistoryList,
    HistoryMain,
    HistoryMeta,
    HistoryRow,
    HistoryRowHeader,
    HistorySidebar,
    HistoryText,
    HistoryTitle,
    MetaBadge,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "./styled";

export default function DashboardHistory() {
    const {
        loading,
        header,
        actions,
        entries,
        search,
        filters,
        sourceOptions,
        statusOptions,
        statusCard,
        summaryItems,
        applyFiltersPatch,
        clearFilters,
        setSearch,
        handleRestoreEntry,
        handlePrintEntry,
        handleDeleteEntry,
        handleSendToPromotions,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <HistoryLayout>
                    <HistoryMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Consulta</CatalogCardEyebrow>
                                <CatalogCardTitle>Histórico de impressão</CatalogCardTitle>
                                <CatalogCardText>
                                    Consulte, restaure e reimprima registros já produzidos pela operação.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <FilterToolbar>
                                <CatalogField>
                                    <CatalogLabel>Buscar registro</CatalogLabel>
                                    <CatalogInput
                                        value={search}
                                        placeholder="Buscar por título, oferta, resumo ou operador"
                                        onChange={event => setSearch(event.target.value)}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{entries.length} registro(s)</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Fonte</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.source}
                                        onChange={event => applyFiltersPatch({ source: event.target.value })}
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
                                    <CatalogLabel>Status</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.status}
                                        onChange={event => applyFiltersPatch({ status: event.target.value })}
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option.value || "all"} value={option.value}>{option.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>
                            </FilterToolbar>

                            {search || filters.source || filters.status ? (
                                <HistoryActions>
                                    <HistoryActionButton onClick={clearFilters}>Limpar filtros</HistoryActionButton>
                                </HistoryActions>
                            ) : null}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Registros</CatalogCardEyebrow>
                                <CatalogCardTitle>Histórico consolidado</CatalogCardTitle>
                                <CatalogCardText>
                                    Cada linha pode voltar para o fluxo original ou ser reimpressa sem remontar o cartaz do zero.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!entries.length ? (
                                <EmptyState>
                                    Nenhum registro encontrado nesta visão. Salve ou imprima um cartaz para iniciar o histórico compartilhado.
                                </EmptyState>
                            ) : (
                                <HistoryList>
                                    {entries.map(entry => (
                                        <HistoryRow key={entry.id} $tone={entry.printedAt ? "green" : "orange"}>
                                            <HistoryRowHeader>
                                                <HistoryHeaderMain>
                                                    <HistoryTitle>{entry.title}</HistoryTitle>
                                                    <HistoryText>{entry.summaryLabel || entry.titlesPreview || "Registro sem resumo adicional"}</HistoryText>
                                                    <HistoryMeta>
                                                        <MetaBadge $tone="blue">{entry.sourceLabel}</MetaBadge>
                                                        <MetaBadge $tone={entry.printedAt ? "green" : "neutral"}>{entry.statusLabel}</MetaBadge>
                                                        <MetaBadge>{entry.cardsLabel}</MetaBadge>
                                                    </HistoryMeta>
                                                </HistoryHeaderMain>

                                                <HistoryActions>
                                                    <HistoryActionButton onClick={() => handleSendToPromotions(entry)}>
                                                        Promoções
                                                    </HistoryActionButton>
                                                    <HistoryActionButton onClick={() => handleRestoreEntry(entry)}>
                                                        Restaurar
                                                    </HistoryActionButton>
                                                    <HistoryActionButton onClick={() => handlePrintEntry(entry)}>
                                                        Reimprimir
                                                    </HistoryActionButton>
                                                    <HistoryActionButton $tone="danger" onClick={() => handleDeleteEntry(entry)}>
                                                        Remover
                                                    </HistoryActionButton>
                                                </HistoryActions>
                                            </HistoryRowHeader>

                                            <HistoryDetails>
                                                <HistoryDetail>
                                                    <HistoryDetailLabel>Oferta</HistoryDetailLabel>
                                                    <HistoryDetailValue>{entry.offerTitle || "Não informado"}</HistoryDetailValue>
                                                </HistoryDetail>
                                                <HistoryDetail>
                                                    <HistoryDetailLabel>Formato</HistoryDetailLabel>
                                                    <HistoryDetailValue>{entry.paperLabel || "--"}</HistoryDetailValue>
                                                </HistoryDetail>
                                                <HistoryDetail>
                                                    <HistoryDetailLabel>Salvo em</HistoryDetailLabel>
                                                    <HistoryDetailValue>{entry.savedLabel} - {entry.relativeSavedAt}</HistoryDetailValue>
                                                </HistoryDetail>
                                                <HistoryDetail>
                                                    <HistoryDetailLabel>Impresso em</HistoryDetailLabel>
                                                    <HistoryDetailValue>{entry.printedLabel}</HistoryDetailValue>
                                                </HistoryDetail>
                                            </HistoryDetails>
                                        </HistoryRow>
                                    ))}
                                </HistoryList>
                            )}
                        </CatalogCard>
                    </HistoryMain>

                    <HistorySidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Ativo" : "Atenção"}
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
                    </HistorySidebar>
                </HistoryLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
