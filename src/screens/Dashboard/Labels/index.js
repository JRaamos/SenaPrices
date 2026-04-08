import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
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
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CodeBlock,
    CopiesButton,
    CopiesControl,
    CopiesValue,
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
    FiltersGrid,
    InlineNotice,
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
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
    SettingsGrid,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    ToggleGrid,
    ToggleInput,
    ToggleItem,
    ToggleText,
} from "./styled";

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
        recentJobs,
        statusCard,
        summaryItems,
        guidelines,
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
        handleRestoreRecentJob,
        handleCopyZpl,
        handleDownloadZpl,
        handleGenerateZpl,
        handleCloseZpl,
    } = useController();

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
                                        Use este conteúdo para enviar as etiquetas diretamente para a impressora Zebra sem conversão intermediária.
                                    </ModalText>
                                </div>

                                <ModalCloseButton onClick={handleCloseZpl}>
                                    Fechar
                                </ModalCloseButton>
                            </ModalHeader>

                            <CodeBlock>{zplCode}</CodeBlock>

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
                                <CatalogCardTitle>Etiquetas ligadas ao catálogo e ao preço</CatalogCardTitle>
                                <CatalogCardText>
                                    Esta tela usa a base real de itens e a última precificação vinculada por EAN-13 ou código interno. O objetivo é emitir etiqueta sem quebrar a consistência entre cartaz, gôndola e operação.
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

                            <InlineNotice>
                                Itens sem preço continuam visíveis para manutenção, mas não entram na emissão até existir uma precificação rastreável. Isso evita etiqueta sem base comercial confiável.
                            </InlineNotice>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Configuração</CatalogCardEyebrow>
                                <CatalogCardTitle>Preset, resolução e campos da etiqueta</CatalogCardTitle>
                                <CatalogCardText>
                                    A configuração fica persistida na base local criptografada e já prepara o terreno para a futura centralização em Definições.
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
                            </SettingsGrid>

                            <ToggleGrid>
                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showDescription2}
                                        onChange={event => applySettingsPatch({ showDescription2: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Descrição complementar</strong>
                                        Exibe a segunda linha de descrição quando o item tiver complemento operacional relevante.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showSection}
                                        onChange={event => applySettingsPatch({ showSection: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Seção do item</strong>
                                        Ajuda a equipe a conferir rapidamente em qual área da loja a etiqueta será aplicada.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showUnit}
                                        onChange={event => applySettingsPatch({ showUnit: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Unidade de venda</strong>
                                        Mantém contexto de peso, volume ou unidade diretamente na etiqueta de gôndola.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showBarcode}
                                        onChange={event => applySettingsPatch({ showBarcode: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Código de barras EAN-13</strong>
                                        Emite o EAN na etiqueta para leitura por scanner em impressoras Zebra compatíveis.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showEan}
                                        onChange={event => applySettingsPatch({ showEan: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Número do EAN</strong>
                                        Mostra o código numérico junto da etiqueta quando o processo operacional exige conferência manual.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showInternalCode}
                                        onChange={event => applySettingsPatch({ showInternalCode: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Código interno</strong>
                                        Exibe o identificador interno do catálogo quando a equipe opera também por referência de cadastro.
                                    </ToggleText>
                                </ToggleItem>
                            </ToggleGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Itens</CatalogCardEyebrow>
                                <CatalogCardTitle>Catálogo pronto para emissão</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione apenas itens com preço rastreável. A quantidade de cópias pode ser ajustada por item sem quebrar a configuração geral do lote.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!rows.length ? (
                                <EmptyState>
                                    Nenhum item encontrado nesta visão. Ajuste a busca ou cadastre itens para iniciar a emissão de etiquetas.
                                </EmptyState>
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                                <CatalogCardTitle>Etiqueta física esperada</CatalogCardTitle>
                                <CatalogCardText>
                                    A pré-visualização usa a mesma configuração salva para dar segurança antes da emissão em HTML ou ZPL.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!previewItems.length ? (
                                <EmptyState>
                                    Selecione itens válidos para ver a etiqueta antes de imprimir.
                                </EmptyState>
                            ) : (
                                <PreviewGrid>
                                    {previewItems.map(item => (
                                        <PreviewLabelCard key={item.id} $heightMm={settings.heightMm}>
                                            <PreviewLabelTitle>{item.description1}</PreviewLabelTitle>
                                            {settings.showDescription2 && item.description2 ? (
                                                <PreviewLabelText>{item.description2}</PreviewLabelText>
                                            ) : null}
                                            <PreviewLabelPrice>{item.priceLabel}</PreviewLabelPrice>
                                            {item.secondaryPrice ? (
                                                <PreviewLabelMeta>{item.secondaryPrice}</PreviewLabelMeta>
                                            ) : null}
                                            {item.offerLabel ? (
                                                <PreviewLabelMeta>{item.offerLabel}</PreviewLabelMeta>
                                            ) : null}
                                            <PreviewLabelMeta>
                                                {[
                                                    settings.showSection ? item.section : "",
                                                    settings.showUnit ? item.unit : "",
                                                    settings.showInternalCode ? item.internalCode : "",
                                                    settings.showEan ? item.ean13 : "",
                                                ].filter(Boolean).join(" - ")}
                                            </PreviewLabelMeta>
                                        </PreviewLabelCard>
                                    ))}
                                </PreviewGrid>
                            )}

                            {selectedItems.length ? (
                                <InlineNotice>
                                    Use o atalho `Ctrl + P` para imprimir o lote atual ou `Ctrl + Shift + A` para selecionar todos os itens visíveis com preço válido.
                                </InlineNotice>
                            ) : null}

                            <ActionButton $tone="primary" onClick={handleToggleVisible}>
                                {allVisibleSelected && visibleSelectableCount
                                    ? "Desmarcar visíveis"
                                    : "Selecionar visíveis"}
                            </ActionButton>
                            <ActionButton onClick={handleGenerateZpl}>
                                Gerar ZPL do lote
                            </ActionButton>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Recentes</CatalogCardEyebrow>
                                <CatalogCardTitle>Últimos lotes de etiquetas</CatalogCardTitle>
                                <CatalogCardText>
                                    Reaproveite seleções anteriores quando a loja repetir a mesma troca de preços ou a mesma campanha.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentJobs.length ? (
                                <EmptyState>
                                    Os lotes recentes aparecerão aqui depois da primeira emissão.
                                </EmptyState>
                            ) : (
                                <RecentList>
                                    {recentJobs.map(item => (
                                        <RecentItem key={item.id}>
                                            <RecentHeader>
                                                <div>
                                                    <RecentTitle>{item.title || "Lote de etiquetas"}</RecentTitle>
                                                    <RecentMeta>{item.helper}</RecentMeta>
                                                    <RecentMeta>{item.preset}</RecentMeta>
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
                                <CatalogCardTitle>Diretrizes da emissão</CatalogCardTitle>
                                <CatalogCardText>
                                    A emissão de etiquetas foi desenhada para acompanhar o ritmo do varejo sem abrir brecha entre cadastro, preço e gôndola.
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
                    </LabelsSidebar>
                </LabelsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
