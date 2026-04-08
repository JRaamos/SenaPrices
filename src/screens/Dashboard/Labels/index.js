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
                                    <ModalTitle>Codigo ZPL pronto para Zebra</ModalTitle>
                                    <ModalText>
                                        Use este conteudo para enviar as etiquetas diretamente para a impressora Zebra sem conversao intermediaria.
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
                                <CatalogCardEyebrow>Selecao</CatalogCardEyebrow>
                                <CatalogCardTitle>Etiquetas ligadas ao catalogo e ao preco</CatalogCardTitle>
                                <CatalogCardText>
                                    Esta tela usa a base real de itens e a ultima precificacao vinculada por EAN-13 ou codigo interno. O objetivo e emitir etiqueta sem quebrar a consistencia entre cartaz, gondola e operacao.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <FiltersGrid>
                                <CatalogField>
                                    <CatalogLabel>Buscar item</CatalogLabel>
                                    <CatalogInput
                                        value={filters.search}
                                        placeholder="Buscar por descricao, secao, codigo ou EAN"
                                        onChange={event => applyFiltersPatch({ search: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{rows.length} item(ns) na visao</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Secao</CatalogLabel>
                                    <CatalogSelect
                                        value={filters.section}
                                        onChange={event => applyFiltersPatch({ section: event.target.value })}
                                    >
                                        <option value="">Todas as secoes</option>
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
                                Itens sem preco continuam visiveis para manutencao, mas nao entram na emissao ate existir uma precificacao rastreavel. Isso evita etiqueta sem base comercial confiavel.
                            </InlineNotice>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Configuracao</CatalogCardEyebrow>
                                <CatalogCardTitle>Preset, resolucao e campos da etiqueta</CatalogCardTitle>
                                <CatalogCardText>
                                    A configuracao fica persistida na base local criptografada e ja prepara o terreno para a futura centralizacao em Definicoes.
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
                                    <CatalogLabel>Resolucao Zebra</CatalogLabel>
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
                                        <FieldCounter>{settings.preset === "custom" ? "Editavel" : "Definido pelo preset"}</FieldCounter>
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
                                        <FieldCounter>{settings.preset === "custom" ? "Editavel" : "Definido pelo preset"}</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Copias padrao</CatalogLabel>
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
                                        <strong>Descricao complementar</strong>
                                        Exibe a segunda linha de descricao quando o item tiver complemento operacional relevante.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showSection}
                                        onChange={event => applySettingsPatch({ showSection: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Secao do item</strong>
                                        Ajuda a equipe a conferir rapidamente em qual area da loja a etiqueta sera aplicada.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showUnit}
                                        onChange={event => applySettingsPatch({ showUnit: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Unidade de venda</strong>
                                        Mantem contexto de peso, volume ou unidade diretamente na etiqueta de gondola.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showBarcode}
                                        onChange={event => applySettingsPatch({ showBarcode: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Codigo de barras EAN-13</strong>
                                        Emite o EAN na etiqueta para leitura por scanner em impressoras Zebra compativeis.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showEan}
                                        onChange={event => applySettingsPatch({ showEan: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Numero do EAN</strong>
                                        Mostra o codigo numerico junto da etiqueta quando o processo operacional exige conferencia manual.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={settings.showInternalCode}
                                        onChange={event => applySettingsPatch({ showInternalCode: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Codigo interno</strong>
                                        Exibe o identificador interno do catalogo quando a equipe opera tambem por referencia de cadastro.
                                    </ToggleText>
                                </ToggleItem>
                            </ToggleGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Itens</CatalogCardEyebrow>
                                <CatalogCardTitle>Catalogo pronto para emissao</CatalogCardTitle>
                                <CatalogCardText>
                                    Selecione apenas itens com preco rastreavel. A quantidade de copias pode ser ajustada por item sem quebrar a configuracao geral do lote.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!rows.length ? (
                                <EmptyState>
                                    Nenhum item encontrado nesta visao. Ajuste a busca ou cadastre itens para iniciar a emissao de etiquetas.
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                                <CatalogCardTitle>Etiqueta fisica esperada</CatalogCardTitle>
                                <CatalogCardText>
                                    A pre-visualizacao usa a mesma configuracao salva para dar seguranca antes da emissao em HTML ou ZPL.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!previewItems.length ? (
                                <EmptyState>
                                    Selecione itens validos para ver a etiqueta antes de imprimir.
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
                                    Use o atalho `Ctrl + P` para imprimir o lote atual ou `Ctrl + Shift + A` para selecionar todos os itens visiveis com preco valido.
                                </InlineNotice>
                            ) : null}

                            <ActionButton $tone="primary" onClick={handleToggleVisible}>
                                {allVisibleSelected && visibleSelectableCount
                                    ? "Desmarcar visiveis"
                                    : "Selecionar visiveis"}
                            </ActionButton>
                            <ActionButton onClick={handleGenerateZpl}>
                                Gerar ZPL do lote
                            </ActionButton>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Recentes</CatalogCardEyebrow>
                                <CatalogCardTitle>Ultimos lotes de etiquetas</CatalogCardTitle>
                                <CatalogCardText>
                                    Reaproveite selecoes anteriores quando a loja repetir a mesma troca de precos ou a mesma campanha.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentJobs.length ? (
                                <EmptyState>
                                    Os lotes recentes aparecerao aqui depois da primeira emissao.
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
                                <CatalogCardTitle>Diretrizes da emissao</CatalogCardTitle>
                                <CatalogCardText>
                                    A emissao de etiquetas foi desenhada para acompanhar o ritmo do varejo sem abrir brecha entre cadastro, preco e gondola.
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
