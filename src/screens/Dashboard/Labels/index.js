import React, { useMemo } from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { buildLabelStyleTokens } from "services/labels";
import { ALIGN_OPTIONS, PRINT_FONT_OPTIONS } from "services/settings";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    ActionButton,
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogInput,
    CatalogLabel,
    CatalogSelect,
    CopiesButton,
    CopiesControl,
    CopiesValue,
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
    FiltersGrid,
    ItemHeaderMain,
    ItemList,
    ItemMeta,
    ItemRow,
    ItemRowActions,
    ItemRowHeader,
    ItemRowText,
    ItemRowTitle,
    ItemSelectionMark,
    LabelsLayout,
    LabelsMain,
    LabelsSidebar,
    MetaBadge,
    ModalActions,
    ModalCard,
    ModalCloseButton,
    ModalHeader,
    ModalOverlay,
    ModalText,
    ModalTitle,
    PreviewGrid,
    PreviewLabelCard,
    PreviewLabelMeta,
    PreviewLabelPrice,
    PreviewLabelText,
    PreviewLabelTitle,
    SettingsGrid,
    ToggleGrid,
    ToggleInput,
    ToggleItem,
    ToggleText,
} from "./styled";

const LABEL_TOGGLES = [
    ["showDescription2", "Descrição complementar", "Exibe a segunda linha de descrição quando ela contribuir para a leitura do item."],
    ["showDescription3", "Descrição adicional", "Ativa a terceira linha quando a operação precisar de detalhamento extra na etiqueta."],
    ["showSection", "Seção do item", "Ajuda a equipe a conferir rapidamente em qual área da loja a etiqueta será aplicada."],
    ["showUnit", "Unidade de venda", "Mantém contexto de peso, volume ou unidade diretamente na etiqueta de gôndola."],
    ["showBarcode", "Código de barras EAN-13", "Emite o bloco gráfico para leitura por scanner em impressoras Zebra compatíveis."],
    ["showEan", "Número do EAN", "Mostra o código numérico junto da etiqueta quando o processo exigir conferência manual."],
    ["showInternalCode", "Código interno", "Exibe o identificador do catálogo quando a equipe também opera por referência de cadastro."],
    ["showPrice", "Preço principal", "Permite esconder o valor na etiqueta quando o template servir a fluxos técnicos específicos."],
];

export default function DashboardLabels() {
    const {
        loading,
        header,
        actions,
        filters,
        settings,
        rows,
        sectionOptions,
        selectedQuantities,
        selectedItems,
        previewItems,
        presetOptions,
        dpiOptions,
        allVisibleSelected,
        visibleSelectableCount,
        zplCode,
        showZplModal,
        applyFiltersPatch,
        applySettingsPatch,
        handleToggleItem,
        handleChangeCopies,
        handleToggleVisible,
        handleCopyZpl,
        handleDownloadZpl,
        handleGenerateZpl,
        handlePrint,
        handleCloseZpl,
    } = useController();
    const previewStyle = useMemo(() => buildLabelStyleTokens(settings), [settings]);

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                {showZplModal ? (
                    <ModalOverlay>
                        <ModalCard>
                            <ModalHeader>
                                <div>
                                    <ModalTitle>Código ZPL pronto para Zebra</ModalTitle>
                                    <ModalText>
                                        Use este conteúdo para enviar as etiquetas diretamente para a impressora Zebra.
                                    </ModalText>
                                </div>

                                <ModalCloseButton onClick={handleCloseZpl}>Fechar</ModalCloseButton>
                            </ModalHeader>

                            <pre>{zplCode}</pre>

                            <ModalActions>
                                <ActionButton onClick={handleCopyZpl}>Copiar ZPL</ActionButton>
                                <ActionButton $tone="primary" onClick={handleDownloadZpl}>Baixar .ZPL</ActionButton>
                            </ModalActions>
                        </ModalCard>
                    </ModalOverlay>
                ) : null}

                <LabelsLayout>
                    <LabelsMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Seleção</CatalogCardEyebrow>
                                <CatalogCardTitle>Etiquetas / Mata-burro</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione produtos com preço rastreável para emitir etiquetas de gôndola ou ZPL.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <FiltersGrid>
                                <CatalogField>
                                    <CatalogLabel>Buscar item</CatalogLabel>
                                    <CatalogInput
                                        value={filters.search}
                                        placeholder="Buscar por descrição, seção, código ou EAN"
                                        onChange={event => applyFiltersPatch({ search: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{rows.length} item(ns) na visão</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Seção</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.section}
                                        onChange={event => applyFiltersPatch({ section: event.target.value })}
                                    >
                                        <option value="">Todas as seções</option>
                                        {sectionOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>
                            </FiltersGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Configuração</CatalogCardEyebrow>
                                <CatalogCardTitle>Preset e conteúdo da etiqueta</CatalogCardTitle>
                                <CatalogCardText>
                                    Ajuste o formato da etiqueta e os campos exibidos antes de gerar o lote.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <SettingsGrid>
                                <CatalogField>
                                    <CatalogLabel>Preset</CatalogLabel>
                                    <CatalogSelect
                                        value={settings.preset}
                                        onChange={event => applySettingsPatch({ preset: event.target.value })}
                                    >
                                        {presetOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Resolução Zebra</CatalogLabel>
                                    <CatalogSelect
                                        value={settings.dpi}
                                        onChange={event => applySettingsPatch({ dpi: Number(event.target.value) })}
                                    >
                                        {dpiOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Largura em mm</CatalogLabel>
                                    <CatalogInput
                                        type="number"
                                        min="20"
                                        max="120"
                                        disabled={settings.preset !== "custom"}
                                        value={settings.widthMm}
                                        onChange={event => applySettingsPatch({ widthMm: Number(event.target.value) })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{settings.preset === "custom" ? "Editável" : "Definido pelo preset"}</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Altura em mm</CatalogLabel>
                                    <CatalogInput
                                        type="number"
                                        min="20"
                                        max="120"
                                        disabled={settings.preset !== "custom"}
                                        value={settings.heightMm}
                                        onChange={event => applySettingsPatch({ heightMm: Number(event.target.value) })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{settings.preset === "custom" ? "Editável" : "Definido pelo preset"}</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Cópias padrão</CatalogLabel>
                                    <CatalogInput
                                        type="number"
                                        min="1"
                                        max="99"
                                        value={settings.defaultCopies}
                                        onChange={event => applySettingsPatch({ defaultCopies: Number(event.target.value) })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Fonte principal</CatalogLabel>
                                    <CatalogSelect
                                        value={settings.fontFamily}
                                        onChange={event => applySettingsPatch({ fontFamily: event.target.value })}
                                    >
                                        {PRINT_FONT_OPTIONS.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Alinhamento do conteúdo</CatalogLabel>
                                    <CatalogSelect
                                        value={settings.textAlign}
                                        onChange={event => applySettingsPatch({ textAlign: event.target.value })}
                                    >
                                        {ALIGN_OPTIONS.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Escala do título (%)</CatalogLabel>
                                    <CatalogInput
                                        type="number"
                                        min="80"
                                        max="140"
                                        value={settings.titleScale}
                                        onChange={event => applySettingsPatch({ titleScale: Number(event.target.value) })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>80 a 140</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Escala do preço (%)</CatalogLabel>
                                    <CatalogInput
                                        type="number"
                                        min="80"
                                        max="180"
                                        value={settings.priceScale}
                                        onChange={event => applySettingsPatch({ priceScale: Number(event.target.value) })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>80 a 180</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Escala dos metadados (%)</CatalogLabel>
                                    <CatalogInput
                                        type="number"
                                        min="80"
                                        max="140"
                                        value={settings.metaScale}
                                        onChange={event => applySettingsPatch({ metaScale: Number(event.target.value) })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>80 a 140</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Cor de destaque</CatalogLabel>
                                    <CatalogInput
                                        type="color"
                                        value={settings.accentColor}
                                        onChange={event => applySettingsPatch({ accentColor: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{settings.accentColor}</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>
                            </SettingsGrid>

                            <ToggleGrid>
                                {LABEL_TOGGLES.map(([key, title, description]) => (
                                    <ToggleItem key={key}>
                                        <ToggleInput
                                            checked={settings[key]}
                                            onChange={event => applySettingsPatch({ [key]: event.target.checked })}
                                        />
                                        <ToggleText>
                                            <strong>{title}</strong>
                                            {description}
                                        </ToggleText>
                                    </ToggleItem>
                                ))}
                            </ToggleGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Itens</CatalogCardEyebrow>
                                <CatalogCardTitle>Catálogo pronto para emissão</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione apenas itens com preço rastreável e ajuste a quantidade por produto quando necessário.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!rows.length ? (
                                <EmptyState>Nenhum item encontrado nesta visão.</EmptyState>
                            ) : (
                                <ItemList>
                                    {rows.map(item => {
                                        const selected = Number(selectedQuantities[item.id]) > 0;

                                        return (
                                            <ItemRow
                                                key={item.id}
                                                $selected={selected}
                                                $tone={item.statusTone}
                                                $disabled={!item.canSelect}
                                                onClick={() => handleToggleItem(item)}
                                            >
                                                <ItemRowHeader>
                                                    <ItemHeaderMain>
                                                        <ItemRowTitle>{item.description1}</ItemRowTitle>
                                                        <ItemRowText>{item.helper}</ItemRowText>
                                                        <ItemMeta>
                                                            <MetaBadge $tone={item.statusTone}>{item.statusLabel}</MetaBadge>
                                                            <MetaBadge $tone="blue">{item.priceLabel}</MetaBadge>
                                                            {item.offerLabel ? <MetaBadge>{item.offerLabel}</MetaBadge> : null}
                                                        </ItemMeta>
                                                    </ItemHeaderMain>

                                                    <ItemRowActions onClick={event => event.stopPropagation()}>
                                                        {selected ? (
                                                            <CopiesControl>
                                                                <CopiesButton onClick={() => handleChangeCopies(item.id, Number(selectedQuantities[item.id]) - 1)}>
                                                                    -
                                                                </CopiesButton>
                                                                <CopiesValue>{selectedQuantities[item.id]}</CopiesValue>
                                                                <CopiesButton onClick={() => handleChangeCopies(item.id, Number(selectedQuantities[item.id]) + 1)}>
                                                                    +
                                                                </CopiesButton>
                                                            </CopiesControl>
                                                        ) : null}

                                                        <ItemSelectionMark $selected={selected} />
                                                    </ItemRowActions>
                                                </ItemRowHeader>
                                            </ItemRow>
                                        );
                                    })}
                                </ItemList>
                            )}
                        </CatalogCard>
                    </LabelsMain>

                    <LabelsSidebar>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                                <CatalogCardTitle>Prévia da etiqueta</CatalogCardTitle>
                                <CatalogCardText>
                                    A visualização usa a mesma configuração salva para a impressão HTML ou Zebra.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!previewItems.length ? (
                                <EmptyState>Selecione itens válidos para ver a etiqueta antes de imprimir.</EmptyState>
                            ) : (
                                <PreviewGrid>
                                    {previewItems.map(item => (
                                        <PreviewLabelCard
                                            key={item.id}
                                            $heightMm={settings.heightMm}
                                            $textAlign={previewStyle.textAlign}
                                        >
                                            <PreviewLabelTitle
                                                $fontFamily={previewStyle.fontFamily}
                                                $fontSize={previewStyle.titleSizePx}
                                            >
                                                {item.description1}
                                            </PreviewLabelTitle>
                                            {settings.showDescription2 && item.description2 ? (
                                                <PreviewLabelText
                                                    $fontFamily={previewStyle.fontFamily}
                                                    $fontSize={previewStyle.subtitleSizePx}
                                                >
                                                    {item.description2}
                                                </PreviewLabelText>
                                            ) : null}
                                            {settings.showDescription3 && item.description3 ? (
                                                <PreviewLabelText
                                                    $fontFamily={previewStyle.fontFamily}
                                                    $fontSize={previewStyle.subtitleSizePx}
                                                >
                                                    {item.description3}
                                                </PreviewLabelText>
                                            ) : null}
                                            {settings.showPrice ? (
                                                <PreviewLabelPrice
                                                    $fontFamily={previewStyle.fontFamily}
                                                    $fontSize={previewStyle.priceSizePx}
                                                    $accentColor={previewStyle.accentColor}
                                                >
                                                    {item.priceLabel}
                                                </PreviewLabelPrice>
                                            ) : null}
                                            {settings.showPrice && item.secondaryPrice ? (
                                                <PreviewLabelMeta
                                                    $fontFamily={previewStyle.fontFamily}
                                                    $fontSize={previewStyle.metaSizePx}
                                                >
                                                    {item.secondaryPrice}
                                                </PreviewLabelMeta>
                                            ) : null}
                                            {item.offerLabel ? (
                                                <PreviewLabelMeta
                                                    $fontFamily={previewStyle.fontFamily}
                                                    $fontSize={previewStyle.metaSizePx}
                                                >
                                                    {item.offerLabel}
                                                </PreviewLabelMeta>
                                            ) : null}
                                            <PreviewLabelMeta
                                                $fontFamily={previewStyle.fontFamily}
                                                $fontSize={previewStyle.metaSizePx}
                                            >
                                                {[
                                                    settings.showSection ? item.section : "",
                                                    settings.showUnit ? item.unit : "",
                                                    settings.showInternalCode ? item.internalCode : "",
                                                    settings.showEan ? item.ean13 : "",
                                                ].filter(Boolean).join(" · ")}
                                            </PreviewLabelMeta>
                                        </PreviewLabelCard>
                                    ))}
                                </PreviewGrid>
                            )}

                            <ActionButton onClick={handleToggleVisible}>
                                {allVisibleSelected && visibleSelectableCount ? "Desmarcar visíveis" : "Selecionar visíveis"}
                            </ActionButton>
                            <ActionButton $tone="primary" onClick={handlePrint}>Imprimir etiquetas</ActionButton>
                            <ActionButton $tone="primary" onClick={handleGenerateZpl}>Gerar ZPL</ActionButton>
                        </CatalogCard>
                    </LabelsSidebar>
                </LabelsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
