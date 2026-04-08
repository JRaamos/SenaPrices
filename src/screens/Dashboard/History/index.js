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
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
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
        recentEntries,
        guidelines,
        applyFiltersPatch,
        clearFilters,
        setSearch,
        handleRestoreEntry,
        handlePrintEntry,
        handleDeleteEntry,
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
                                <CatalogCardTitle>Rastro operacional da precificacao</CatalogCardTitle>
                                <CatalogCardText>
                                    Esta tela concentra os registros produzidos por Criar Preco e Criacao Rapida, permitindo restaurar, reimprimir e auditar a base ja usada nas operacoes atuais.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <FilterToolbar>
                                <CatalogField>
                                    <CatalogLabel>Buscar registro</CatalogLabel>
                                    <CatalogInput
                                        value={search}
                                        placeholder="Buscar por titulo, oferta, resumo ou operador"
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
                                    <HistoryActionButton onClick={clearFilters}>
                                        Limpar filtros
                                    </HistoryActionButton>
                                </HistoryActions>
                            ) : null}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Registros</CatalogCardEyebrow>
                                <CatalogCardTitle>Historico consolidado</CatalogCardTitle>
                                <CatalogCardText>
                                    Cada linha abaixo pode voltar para o fluxo original ou ser reimpressa sem precisar remontar o cartaz do zero.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!entries.length ? (
                                <EmptyState>
                                    Nenhum registro encontrado nesta visao. Salve ou imprima um cartaz para iniciar o historico compartilhado da operacao.
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
                                                    <HistoryDetailValue>{entry.offerTitle || "Nao informado"}</HistoryDetailValue>
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
                                {statusCard.tone === "green" ? "Ativo" : "Atencao"}
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
                                <CatalogCardTitle>Ultimos registros</CatalogCardTitle>
                                <CatalogCardText>
                                    Uma leitura rapida da fila mais recente para retomar fluxos sem perder contexto.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentEntries.length ? (
                                <EmptyState>
                                    Os registros recentes aparecerao aqui assim que o historico for alimentado.
                                </EmptyState>
                            ) : (
                                <ChecklistList>
                                    {recentEntries.map(entry => (
                                        <ChecklistItem key={entry.id}>
                                            <ChecklistTitle>{entry.title}</ChecklistTitle>
                                            <ChecklistText>
                                                {entry.sourceLabel} - {entry.cardsLabel} - {entry.relativeSavedAt}
                                            </ChecklistText>
                                        </ChecklistItem>
                                    ))}
                                </ChecklistList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Checklist</CatalogCardEyebrow>
                                <CatalogCardTitle>Diretrizes da trilha</CatalogCardTitle>
                                <CatalogCardText>
                                    O historico foi desenhado para sustentar manutencao, auditoria e os modulos que ainda vamos conectar.
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
                    </HistorySidebar>
                </HistoryLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
