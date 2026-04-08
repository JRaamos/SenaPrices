import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import { ITEM_UNIT_OPTIONS } from "./constants";
import useController from "./controller";
import {
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogGrid,
    CatalogInput,
    CatalogLabel,
    CatalogSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CreateItemLayout,
    CreateItemMain,
    CreateItemSidebar,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineNotice,
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

export default function DashboardCreateItem() {
    const {
        loading,
        header,
        actions,
        form,
        preview,
        validation,
        statusCard,
        summaryItems,
        sectionSuggestions,
        recentItems,
        guidelines,
        applyPatch,
        handleUseRecentItem,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <CreateItemLayout>
                    <CreateItemMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Identificacao</CatalogCardEyebrow>
                                <CatalogCardTitle>Base do item</CatalogCardTitle>
                                <CatalogCardText>
                                    Cadastre os identificadores com rigor para que catalogo, precificacao e etapas futuras operem sobre a mesma base confiavel.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {validation.errors.identifier ? (
                                <ErrorSummary>
                                    <ErrorSummaryTitle>Identificador obrigatorio</ErrorSummaryTitle>
                                    <ErrorSummaryItem>{validation.errors.identifier}</ErrorSummaryItem>
                                </ErrorSummary>
                            ) : null}

                            <CatalogGrid>
                                <CatalogField>
                                    <CatalogLabel>Codigo interno</CatalogLabel>
                                    <CatalogInput
                                        value={form.internalCode}
                                        maxLength={24}
                                        placeholder="Ex: CAFE-500"
                                        onChange={event => applyPatch({ internalCode: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.internalCode || ""}</FieldError>
                                        <FieldCounter>{form.internalCode.length}/24</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>EAN-13</CatalogLabel>
                                    <CatalogInput
                                        value={form.ean13}
                                        maxLength={13}
                                        inputMode="numeric"
                                        placeholder="7891234567890"
                                        onChange={event => applyPatch({ ean13: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.ean13 || ""}</FieldError>
                                        <FieldCounter>{form.ean13.length}/13</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>
                            </CatalogGrid>

                            <InlineNotice>
                                Duplicidade de EAN ou codigo interno e bloqueada para preservar integridade entre cadastro, busca e precificacao.
                            </InlineNotice>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Descricao</CatalogCardEyebrow>
                                <CatalogCardTitle>Linhas do produto</CatalogCardTitle>
                                <CatalogCardText>
                                    Organize a nomenclatura do item de forma pronta para impressao e manutencao por qualquer operador ou analista.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CatalogGrid>
                                <CatalogField $full>
                                    <CatalogLabel>Descricao principal</CatalogLabel>
                                    <CatalogInput
                                        value={form.description1}
                                        maxLength={80}
                                        placeholder="Ex: Cafe Pilao 500g"
                                        onChange={event => applyPatch({ description1: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.description1 || ""}</FieldError>
                                        <FieldCounter>{form.description1.length}/80</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField $full>
                                    <CatalogLabel>Descricao complementar</CatalogLabel>
                                    <CatalogInput
                                        value={form.description2}
                                        maxLength={60}
                                        placeholder="Ex: Torracao media"
                                        onChange={event => applyPatch({ description2: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.description2.length}/60</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField $full>
                                    <CatalogLabel>Descricao adicional</CatalogLabel>
                                    <CatalogInput
                                        value={form.description3}
                                        maxLength={60}
                                        placeholder="Ex: Embalagem almofada"
                                        onChange={event => applyPatch({ description3: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.description3.length}/60</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>
                            </CatalogGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Classificacao</CatalogCardEyebrow>
                                <CatalogCardTitle>Contexto do catalogo</CatalogCardTitle>
                                <CatalogCardText>
                                    Esta classificacao sera reaproveitada nas proximas telas de listagem, importacao e criacao de cartazes.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CatalogGrid>
                                <CatalogField>
                                    <CatalogLabel>Secao</CatalogLabel>
                                    <CatalogInput
                                        value={form.section}
                                        maxLength={40}
                                        list="catalog-section-suggestions"
                                        placeholder="Ex: Mercearia"
                                        onChange={event => applyPatch({ section: event.target.value })}
                                    />
                                    <datalist id="catalog-section-suggestions">
                                        {sectionSuggestions.map(item => (
                                            <option key={item.id} value={item.name} />
                                        ))}
                                    </datalist>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.section.length}/40</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Unidade</CatalogLabel>
                                    <CatalogSelect
                                        value={form.unit}
                                        onChange={event => applyPatch({ unit: event.target.value })}
                                    >
                                        {ITEM_UNIT_OPTIONS.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>
                            </CatalogGrid>
                        </CatalogCard>
                    </CreateItemMain>

                    <CreateItemSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Liberado" : "Revisao"}
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

                        {validation.errorList.length ? (
                            <ErrorSummary>
                                <ErrorSummaryTitle>Pendencias do cadastro</ErrorSummaryTitle>
                                {validation.errorList.map(item => (
                                    <ErrorSummaryItem key={item}>{item}</ErrorSummaryItem>
                                ))}
                            </ErrorSummary>
                        ) : null}

                        {validation.warnings.length ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Melhorias</CatalogCardEyebrow>
                                    <CatalogCardTitle>Ajustes recomendados</CatalogCardTitle>
                                    <CatalogCardText>
                                        Mesmo com cadastro valido, estes pontos ajudam a preparar melhor a base para os proximos modulos.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <WarningList>
                                    {validation.warnings.map(item => (
                                        <WarningItem key={item}>{item}</WarningItem>
                                    ))}
                                </WarningList>
                            </CatalogCard>
                        ) : null}

                        <PreviewCard>
                            <CatalogCardHeader>
                                <PreviewBadge>Preview do item</PreviewBadge>
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Boas praticas</CatalogCardEyebrow>
                                <CatalogCardTitle>Checklist do catalogo</CatalogCardTitle>
                                <CatalogCardText>
                                    Diretrizes para construir uma base que suporte manutencao, expansao e operacao de alto volume.
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
                                <CatalogCardEyebrow>Catalogo ativo</CatalogCardEyebrow>
                                <CatalogCardTitle>Itens recentes</CatalogCardTitle>
                                <CatalogCardText>
                                    Use uma base existente como referencia para acelerar cadastro sem duplicar identificadores.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <RecentList>
                                {!recentItems.length ? (
                                    <RecentItem>
                                        <RecentTitle>Nenhum item salvo ainda</RecentTitle>
                                        <RecentMeta>Assim que o primeiro item for cadastrado, ele aparecera aqui como referencia.</RecentMeta>
                                    </RecentItem>
                                ) : recentItems.map(item => (
                                    <RecentItem key={item.id}>
                                        <RecentHeader>
                                            <div>
                                                <RecentTitle>{item.description1}</RecentTitle>
                                                <RecentMeta>{item.helper}</RecentMeta>
                                                <RecentMeta>{item.relativeDate}</RecentMeta>
                                            </div>
                                            <RecentButton type="button" onClick={() => handleUseRecentItem(item)}>
                                                Usar base
                                            </RecentButton>
                                        </RecentHeader>
                                    </RecentItem>
                                ))}
                            </RecentList>
                        </CatalogCard>
                    </CreateItemSidebar>
                </CreateItemLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
