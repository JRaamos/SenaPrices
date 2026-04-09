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
    CreateItemLayout,
    CreateItemMain,
    FieldCounter,
    FieldError,
    FieldMeta,
} from "./styled";

export default function DashboardCreateItem() {
    const {
        loading,
        header,
        actions,
        form,
        validation,
        sectionSuggestions,
        applyPatch,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <CreateItemLayout $singleColumn>
                    <CreateItemMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Códigos</CatalogCardEyebrow>
                                <CatalogCardTitle>Ao menos um identificador é obrigatório</CatalogCardTitle>
                                <CatalogCardText>
                                    Informe código interno ou EAN-13 para manter o catálogo consistente e pronto para busca, impressão e integração.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CatalogGrid>
                                <CatalogField>
                                    <CatalogLabel>Código interno</CatalogLabel>
                                    <CatalogInput
                                        value={form.internalCode}
                                        maxLength={24}
                                        placeholder="Ex: PROD001"
                                        onChange={event => applyPatch({ internalCode: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.internalCode || validation.errors.identifier || ""}</FieldError>
                                        <FieldCounter>{form.internalCode.length}/24</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>EAN-13 (código de barras)</CatalogLabel>
                                    <CatalogInput
                                        value={form.ean13}
                                        maxLength={13}
                                        inputMode="numeric"
                                        placeholder="13 dígitos"
                                        onChange={event => applyPatch({ ean13: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.ean13 || validation.errors.identifier || ""}</FieldError>
                                        <FieldCounter>{form.ean13.length}/13</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>
                            </CatalogGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Descrições</CatalogCardEyebrow>
                                <CatalogCardTitle>Textos principais do item</CatalogCardTitle>
                                <CatalogCardText>
                                    Organize o nome do produto de forma clara para cadastro, etiqueta e cartaz.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CatalogGrid>
                                <CatalogField $full>
                                    <CatalogLabel>Descrição 1</CatalogLabel>
                                    <CatalogInput
                                        value={form.description1}
                                        maxLength={80}
                                        placeholder="Nome principal do produto"
                                        onChange={event => applyPatch({ description1: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.description1 || ""}</FieldError>
                                        <FieldCounter>{form.description1.length}/80</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField $full>
                                    <CatalogLabel>Descrição 2</CatalogLabel>
                                    <CatalogInput
                                        value={form.description2}
                                        maxLength={60}
                                        placeholder="Opcional — exibida em destaque no preço"
                                        onChange={event => applyPatch({ description2: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.description2.length}/60</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField $full>
                                    <CatalogLabel>Descrição 3</CatalogLabel>
                                    <CatalogInput
                                        value={form.description3}
                                        maxLength={60}
                                        placeholder="Opcional — informação adicional"
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
                                <CatalogCardEyebrow>Categorização</CatalogCardEyebrow>
                                <CatalogCardTitle>Seção e unidade de venda</CatalogCardTitle>
                                <CatalogCardText>
                                    Esses campos serão reutilizados na listagem, na criação de cartazes e na emissão de etiquetas.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CatalogGrid>
                                <CatalogField>
                                    <CatalogLabel>Seção</CatalogLabel>
                                    <CatalogInput
                                        value={form.section}
                                        maxLength={40}
                                        list="catalog-section-suggestions"
                                        placeholder="Buscar ou criar seção..."
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
                </CreateItemLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
