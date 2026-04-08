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
    EditorBadge,
    EditorGrid,
    EmptyState,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    FilterBadge,
    ItemActionButton,
    ItemActions,
    ItemCell,
    ItemCode,
    ItemMeta,
    ItemRow,
    ItemsLayout,
    ItemsMain,
    ItemsSidebar,
    ItemsTable,
    ItemsTableHeader,
    ItemsTableHeaderCell,
    ItemSubtitle,
    ItemTag,
    ItemTitle,
    PreviewBadge,
    PreviewCard,
    PreviewMetaItem,
    PreviewMetaLabel,
    PreviewMetaList,
    PreviewMetaValue,
    PreviewSubtitle,
    PreviewTitle,
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
    SearchField,
    SearchMeta,
    SearchToolbar,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    WarningItem,
    WarningList,
} from "./styled";

export default function DashboardItems() {
    const {
        loading,
        header,
        actions,
        items,
        search,
        filters,
        activeFiltersCount,
        selectedItemId,
        selectedItem,
        editor,
        preview,
        validation,
        sectionSuggestions,
        statusCard,
        summaryItems,
        recentItems,
        guidelines,
        unitOptions,
        sections,
        isEditorDirty,
        applyFiltersPatch,
        clearFilters,
        setSearch,
        applyEditorPatch,
        handleSelectItem,
        handleDuplicateItem,
        handleDeleteItem,
        handleCreatePriceFromItem,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <ItemsLayout>
                    <ItemsMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Consulta</CatalogCardEyebrow>
                                <CatalogCardTitle>Base ativa do catalogo</CatalogCardTitle>
                                <CatalogCardText>
                                    Filtre, revise e reaproveite os itens da base central para manter coerencia com o restante da operacao.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <SearchToolbar>
                                <SearchField>
                                    <CatalogLabel>Buscar item</CatalogLabel>
                                    <CatalogInput
                                        value={search}
                                        placeholder="Buscar por nome, secao, codigo interno ou EAN"
                                        onChange={event => setSearch(event.target.value)}
                                    />
                                    <SearchMeta>
                                        <span>{items.length} item(ns) na visao atual</span>
                                        {activeFiltersCount ? <FilterBadge>{activeFiltersCount} filtro(s)</FilterBadge> : <span />}
                                    </SearchMeta>
                                </SearchField>

                                <CatalogField>
                                    <CatalogLabel>Secao</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.section}
                                        onChange={event => applyFiltersPatch({ section: event.target.value })}
                                    >
                                        <option value="">Todas</option>
                                        {sections.map(item => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Unidade</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.unit}
                                        onChange={event => applyFiltersPatch({ unit: event.target.value })}
                                    >
                                        <option value="">Todas</option>
                                        {unitOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Tem EAN</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.hasEan}
                                        onChange={event => applyFiltersPatch({ hasEan: event.target.value })}
                                    >
                                        <option value="">Todos</option>
                                        <option value="yes">Sim</option>
                                        <option value="no">Nao</option>
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Tem codigo interno</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.hasInternalCode}
                                        onChange={event => applyFiltersPatch({ hasInternalCode: event.target.value })}
                                    >
                                        <option value="">Todos</option>
                                        <option value="yes">Sim</option>
                                        <option value="no">Nao</option>
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>
                            </SearchToolbar>

                            {activeFiltersCount || search ? (
                                <ItemActions>
                                    <ItemActionButton onClick={clearFilters}>
                                        Limpar filtros
                                    </ItemActionButton>
                                </ItemActions>
                            ) : null}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Edicao</CatalogCardEyebrow>
                                <CatalogCardTitle>Item selecionado</CatalogCardTitle>
                                <CatalogCardText>
                                    Toda alteracao aqui atualiza a mesma base que sera consumida pelos demais modulos do sistema.
                                </CatalogCardText>
                                <EditorBadge $active={isEditorDirty}>
                                    {isEditorDirty ? "Alterações não salvas" : "Sem alterações pendentes"}
                                </EditorBadge>
                            </CatalogCardHeader>

                            {!selectedItem ? (
                                <EmptyState>
                                    Selecione um item da lista para editar a mesma base usada pelos outros modulos do sistema.
                                </EmptyState>
                            ) : null}

                            {selectedItem && validation.errorList.length ? (
                                <ErrorSummary>
                                    <ErrorSummaryTitle>Pendencias da edicao</ErrorSummaryTitle>
                                    {validation.errorList.map(item => (
                                        <ErrorSummaryItem key={item}>{item}</ErrorSummaryItem>
                                    ))}
                                </ErrorSummary>
                            ) : null}

                            {!selectedItem ? null : (
                                <>
                                    <EditorGrid>
                                        <CatalogField>
                                            <CatalogLabel>Codigo interno</CatalogLabel>
                                            <CatalogInput
                                                value={editor.internalCode}
                                                maxLength={24}
                                                placeholder="Ex: CAFE-500"
                                                onChange={event => applyEditorPatch({ internalCode: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError>{validation.errors.internalCode || ""}</FieldError>
                                                <FieldCounter>{editor.internalCode.length}/24</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>EAN-13</CatalogLabel>
                                            <CatalogInput
                                                value={editor.ean13}
                                                maxLength={13}
                                                inputMode="numeric"
                                                placeholder="7891234567890"
                                                onChange={event => applyEditorPatch({ ean13: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError>{validation.errors.ean13 || ""}</FieldError>
                                                <FieldCounter>{editor.ean13.length}/13</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>
                                    </EditorGrid>

                                    <CatalogField>
                                        <CatalogLabel>Descrição principal</CatalogLabel>
                                        <CatalogInput
                                            value={editor.description1}
                                            maxLength={80}
                                            placeholder="Ex: Cafe Pilao 500g"
                                            onChange={event => applyEditorPatch({ description1: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.description1 || ""}</FieldError>
                                            <FieldCounter>{editor.description1.length}/80</FieldCounter>
                                        </FieldMeta>
                                    </CatalogField>

                                    <EditorGrid>
                                        <CatalogField>
                                            <CatalogLabel>Descrição complementar</CatalogLabel>
                                            <CatalogInput
                                                value={editor.description2}
                                                maxLength={60}
                                                placeholder="Ex: Torracao media"
                                                onChange={event => applyEditorPatch({ description2: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter>{editor.description2.length}/60</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Descrição adicional</CatalogLabel>
                                            <CatalogInput
                                                value={editor.description3}
                                                maxLength={60}
                                                placeholder="Ex: Embalagem almofada"
                                                onChange={event => applyEditorPatch({ description3: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter>{editor.description3.length}/60</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>
                                    </EditorGrid>

                                    <EditorGrid>
                                        <CatalogField>
                                            <CatalogLabel>Secao</CatalogLabel>
                                            <CatalogInput
                                                value={editor.section}
                                                maxLength={40}
                                                list="items-section-suggestions"
                                                placeholder="Ex: Mercearia"
                                                onChange={event => applyEditorPatch({ section: event.target.value })}
                                            />
                                            <datalist id="items-section-suggestions">
                                                {sectionSuggestions.map(item => (
                                                    <option key={item.id} value={item.name} />
                                                ))}
                                            </datalist>
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter>{editor.section.length}/40</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Unidade</CatalogLabel>
                                            <CatalogSelect
                                                value={editor.unit}
                                                onChange={event => applyEditorPatch({ unit: event.target.value })}
                                            >
                                                {unitOptions.map(item => (
                                                    <option key={item.value} value={item.value}>{item.label}</option>
                                                ))}
                                            </CatalogSelect>
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter />
                                            </FieldMeta>
                                        </CatalogField>
                                    </EditorGrid>
                                </>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Lista</CatalogCardEyebrow>
                                <CatalogCardTitle>Itens cadastrados</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione um item para editar ou use as ações por linha para acelerar duplicação, exclusão e criação de preço.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!items.length ? (
                                <EmptyState>
                                    Nenhum item encontrado com os filtros atuais. Ajuste a busca ou cadastre um novo item para iniciar a base.
                                </EmptyState>
                            ) : (
                                <ItemsTable>
                                    <ItemsTableHeader>
                                        <ItemsTableHeaderCell>Descrição</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Secao e unidade</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Identificadores</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Data base</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Acoes</ItemsTableHeaderCell>
                                    </ItemsTableHeader>

                                    {items.map(item => (
                                        <ItemRow
                                            key={item.id}
                                            $active={selectedItemId === item.id}
                                            onClick={() => handleSelectItem(item)}
                                        >
                                            <ItemCell>
                                                <ItemTitle>{item.description1}</ItemTitle>
                                                {item.description2 ? <ItemSubtitle>{item.description2}</ItemSubtitle> : null}
                                                {item.description3 ? <ItemMeta>{item.description3}</ItemMeta> : null}
                                            </ItemCell>

                                            <ItemCell>
                                                <ItemTag>{item.section || "Sem secao"}</ItemTag>
                                                <ItemMeta>Unidade: {item.unit || "unidade"}</ItemMeta>
                                            </ItemCell>

                                            <ItemCell>
                                                <ItemCode>{item.ean13 || "EAN não informado"}</ItemCode>
                                                <ItemMeta>{item.internalCode || "Código interno não informado"}</ItemMeta>
                                            </ItemCell>

                                            <ItemCell>
                                                <ItemMeta>Criado em {item.createdLabel}</ItemMeta>
                                                <ItemMeta>Atualizado {item.updatedLabel}</ItemMeta>
                                            </ItemCell>

                                            <ItemActions>
                                                <ItemActionButton
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleSelectItem(item);
                                                    }}
                                                >
                                                    Editar
                                                </ItemActionButton>
                                                <ItemActionButton
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleCreatePriceFromItem(item);
                                                    }}
                                                >
                                                    Criar preço
                                                </ItemActionButton>
                                                <ItemActionButton
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleDuplicateItem(item);
                                                    }}
                                                >
                                                    Duplicar
                                                </ItemActionButton>
                                                <ItemActionButton
                                                    $tone="danger"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleDeleteItem(item);
                                                    }}
                                                >
                                                    Excluir
                                                </ItemActionButton>
                                            </ItemActions>
                                        </ItemRow>
                                    ))}
                                </ItemsTable>
                            )}
                        </CatalogCard>
                    </ItemsMain>

                    <ItemsSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Operando" : "Atencao"}
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

                        {selectedItem && validation.warnings.length ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Melhorias</CatalogCardEyebrow>
                                    <CatalogCardTitle>Ajustes recomendados</CatalogCardTitle>
                                    <CatalogCardText>
                                        Mesmo com um item valido, estes pontos ajudam a manter a base preparada para crescimento do sistema.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <WarningList>
                                    {validation.warnings.map(item => (
                                        <WarningItem key={item}>{item}</WarningItem>
                                    ))}
                                </WarningList>
                            </CatalogCard>
                        ) : null}

                        {!selectedItem ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                                    <CatalogCardTitle>Selecione um item</CatalogCardTitle>
                                    <CatalogCardText>
                                        O resumo visual do item aparece aqui assim que um registro da base for selecionado.
                                    </CatalogCardText>
                                </CatalogCardHeader>
                            </CatalogCard>
                        ) : (
                            <PreviewCard>
                                <CatalogCardHeader>
                                    <PreviewBadge>Preview da base</PreviewBadge>
                                    <PreviewTitle>{preview.title}</PreviewTitle>
                                    {preview.subtitle ? <PreviewSubtitle>{preview.subtitle}</PreviewSubtitle> : null}
                                </CatalogCardHeader>

                                <PreviewMetaList>
                                    <PreviewMetaItem>
                                        <PreviewMetaLabel>Identificacao</PreviewMetaLabel>
                                        <PreviewMetaValue>{preview.identifierLine}</PreviewMetaValue>
                                    </PreviewMetaItem>
                                    <PreviewMetaItem>
                                        <PreviewMetaLabel>Secao</PreviewMetaLabel>
                                        <PreviewMetaValue>{preview.section}</PreviewMetaValue>
                                    </PreviewMetaItem>
                                    <PreviewMetaItem>
                                        <PreviewMetaLabel>Unidade</PreviewMetaLabel>
                                        <PreviewMetaValue>{preview.unit}</PreviewMetaValue>
                                    </PreviewMetaItem>
                                </PreviewMetaList>
                            </PreviewCard>
                        )}

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Boas praticas</CatalogCardEyebrow>
                                <CatalogCardTitle>Governanca do catalogo</CatalogCardTitle>
                                <CatalogCardText>
                                    Regras para manter a base consistente enquanto as demais telas passam a depender dela.
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Ultimas alteracoes</CatalogCardEyebrow>
                                <CatalogCardTitle>Itens recentes</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione rapidamente um item alterado recentemente para revisar ou continuar a manutencao.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <RecentList>
                                {!recentItems.length ? (
                                    <RecentItem>
                                        <RecentTitle>Nenhum item salvo ainda</RecentTitle>
                                        <RecentMeta>Assim que o catalogo ganhar registros, eles aparecerao aqui.</RecentMeta>
                                    </RecentItem>
                                ) : recentItems.map(item => (
                                    <RecentItem key={item.id}>
                                        <RecentHeader>
                                            <div>
                                                <RecentTitle>{item.description1}</RecentTitle>
                                                <RecentMeta>{item.helper}</RecentMeta>
                                                <RecentMeta>{item.relativeDate}</RecentMeta>
                                            </div>
                                            <RecentButton type="button" onClick={() => handleSelectItem(item)}>
                                                Abrir
                                            </RecentButton>
                                        </RecentHeader>
                                    </RecentItem>
                                ))}
                            </RecentList>
                        </CatalogCard>
                    </ItemsSidebar>
                </ItemsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
