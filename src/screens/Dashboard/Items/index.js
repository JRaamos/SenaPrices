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
    EditorBadge,
    EditorGrid,
    EmptyState,
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
    ItemsTable,
    ItemsTableHeader,
    ItemsTableHeaderCell,
    ItemSubtitle,
    ItemTag,
    ItemTitle,
    SearchField,
    SearchMeta,
    SearchToolbar,
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
        validation,
        sectionSuggestions,
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
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <ItemsLayout $singleColumn>
                    <ItemsMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Itens</CatalogCardEyebrow>
                                <CatalogCardTitle>Base cadastrada</CatalogCardTitle>
                                <CatalogCardText>
                                    Busque por nome, código, seção ou unidade para revisar rapidamente o catálogo.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <SearchToolbar>
                                <SearchField>
                                    <CatalogLabel>Buscar item</CatalogLabel>
                                    <CatalogInput
                                        value={search}
                                        placeholder="Buscar por nome, código ou EAN..."
                                        onChange={event => setSearch(event.target.value)}
                                    />
                                    <SearchMeta>
                                        <span>{items.length} item(ns) na visão atual</span>
                                        {activeFiltersCount ? <FilterBadge>{activeFiltersCount} filtro(s)</FilterBadge> : <span />}
                                    </SearchMeta>
                                </SearchField>

                                <CatalogField>
                                    <CatalogLabel>Seção</CatalogLabel>
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
                                        <option value="no">Não</option>
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Tem código interno</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.hasInternalCode}
                                        onChange={event => applyFiltersPatch({ hasInternalCode: event.target.value })}
                                    >
                                        <option value="">Todos</option>
                                        <option value="yes">Sim</option>
                                        <option value="no">Não</option>
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

                        {!selectedItem ? null : (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Edição</CatalogCardEyebrow>
                                    <CatalogCardTitle>Item selecionado</CatalogCardTitle>
                                    <CatalogCardText>
                                        Ajuste os dados do cadastro e salve as alterações no mesmo catálogo central usado pelo restante do sistema.
                                    </CatalogCardText>
                                    <EditorBadge $active={isEditorDirty}>
                                        {isEditorDirty ? "Alterações não salvas" : "Sem alterações pendentes"}
                                    </EditorBadge>
                                </CatalogCardHeader>

                                <EditorGrid>
                                    <CatalogField>
                                        <CatalogLabel>Código interno</CatalogLabel>
                                        <CatalogInput
                                            value={editor.internalCode}
                                            maxLength={24}
                                            placeholder="Ex: PROD001"
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
                                        placeholder="Nome principal do produto"
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
                                            placeholder="Opcional"
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
                                            placeholder="Opcional"
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
                                        <CatalogLabel>Seção</CatalogLabel>
                                        <CatalogInput
                                            value={editor.section}
                                            maxLength={40}
                                            list="items-section-suggestions"
                                            placeholder="Buscar ou criar seção..."
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
                            </CatalogCard>
                        )}

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Lista</CatalogCardEyebrow>
                                <CatalogCardTitle>Itens cadastrados</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione um item para editar ou use as ações da linha para duplicar e excluir.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!items.length ? (
                                <EmptyState>
                                    Nenhum item encontrado com os filtros atuais. Ajuste a busca ou cadastre um novo item.
                                </EmptyState>
                            ) : (
                                <ItemsTable>
                                    <ItemsTableHeader>
                                        <ItemsTableHeaderCell>Descrição</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Seção e unidade</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Identificadores</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Datas</ItemsTableHeaderCell>
                                        <ItemsTableHeaderCell>Ações</ItemsTableHeaderCell>
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
                                                <ItemTag>{item.section || "Sem seção"}</ItemTag>
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
                </ItemsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
