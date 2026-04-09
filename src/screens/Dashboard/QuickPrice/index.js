import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    PreviewBadge,
    PreviewCard,
    PreviewMetaItem,
    PreviewMetaLabel,
    PreviewMetaList,
    PreviewMetaValue,
    PreviewPrice,
    PreviewSpecialLabel,
    PreviewSubtitle,
    PreviewSupportPrice,
    PreviewTitle,
    PriceTypeButton,
    PriceTypeButtonText,
    PriceTypeButtonTitle,
    PriceTypeGrid,
    QuickCard,
    QuickCardEyebrow,
    QuickCardHeader,
    QuickCardText,
    QuickCardTitle,
    QuickField,
    QuickFieldCounter,
    QuickFieldError,
    QuickFieldMeta,
    QuickInput,
    QuickLabel,
    QuickPriceLayout,
    QuickPriceMain,
    QuickPriceSidebar,
    QuickSelect,
    QuickTextarea,
    RowActionButton,
    RowActions,
    RowBadge,
    RowCard,
    RowField,
    RowGrid,
    RowHeader,
    RowList,
    RowPriceGrid,
    RowStatus,
    SetupGrid,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "./styled";

export default function DashboardQuickPrice() {
    const {
        loading,
        header,
        actions,
        draft,
        activeRowId,
        activePreview,
        validation,
        statusCard,
        summaryItems,
        offerTypeOptions,
        priceTypeOptions,
        paperSizeOptions,
        orientationOptions,
        pdvPolicy,
        rowSuggestions,
        rowLockedFields,
        applyPatch,
        updateRow,
        addRow,
        removeRow,
        setActiveRowId,
        handleRestoreBatch,
    } = useController();
    const isCustomOfferTitle = !draft.offerTitle || !offerTypeOptions.some(item => item.value === draft.offerTitle);

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <QuickPriceLayout>
                    <QuickPriceMain>
                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Configuração</QuickCardEyebrow>
                                <QuickCardTitle>Lote rápido de cartazes</QuickCardTitle>
                                <QuickCardText>
                                    Configure o contexto do lote e padronize os metadados antes de preencher as linhas operacionais.
                                </QuickCardText>
                            </QuickCardHeader>

                            <PriceTypeGrid>
                                {priceTypeOptions.map(item => (
                                    <PriceTypeButton
                                        key={item.value}
                                        type="button"
                                        $active={draft.priceType === item.value}
                                        onClick={() => applyPatch({ priceType: item.value })}
                                    >
                                        <PriceTypeButtonTitle>{item.label}</PriceTypeButtonTitle>
                                        <PriceTypeButtonText>{item.helper}</PriceTypeButtonText>
                                    </PriceTypeButton>
                                ))}
                            </PriceTypeGrid>

                            <SetupGrid>
                                <QuickField>
                                    <QuickLabel>Tipo de oferta</QuickLabel>
                                    <QuickSelect
                                        value={isCustomOfferTitle ? "__custom__" : draft.offerTitle}
                                        onChange={event => {
                                            const nextValue = event.target.value;

                                            if (nextValue === "__custom__") {
                                                applyPatch(previous => ({
                                                    ...previous,
                                                    offerTitle: offerTypeOptions.some(item => item.value === previous.offerTitle)
                                                        ? ""
                                                        : previous.offerTitle,
                                                }));
                                                return;
                                            }

                                            applyPatch({ offerTitle: nextValue });
                                        }}
                                    >
                                        {offerTypeOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                        <option value="__custom__">Personalizado</option>
                                    </QuickSelect>
                                    <QuickFieldMeta>
                                        <QuickFieldError />
                                        <QuickFieldCounter />
                                    </QuickFieldMeta>
                                </QuickField>

                                {isCustomOfferTitle ? (
                                    <QuickField>
                                        <QuickLabel>Título customizado</QuickLabel>
                                        <QuickInput
                                            value={draft.offerTitle}
                                            maxLength={30}
                                            placeholder="Ex: Oferta de corredor"
                                            onChange={event => applyPatch({ offerTitle: event.target.value })}
                                        />
                                        <QuickFieldMeta>
                                            <QuickFieldError />
                                            <QuickFieldCounter>{draft.offerTitle.length}/30</QuickFieldCounter>
                                        </QuickFieldMeta>
                                    </QuickField>
                                ) : null}

                                <QuickField>
                                    <QuickLabel>Válido até</QuickLabel>
                                    <QuickInput
                                        type="date"
                                        value={draft.validUntil}
                                        onChange={event => applyPatch({ validUntil: event.target.value })}
                                    />
                                    <QuickFieldMeta>
                                        <QuickFieldError />
                                        <QuickFieldCounter />
                                    </QuickFieldMeta>
                                </QuickField>

                                <QuickField>
                                    <QuickLabel>Tamanho do papel</QuickLabel>
                                    <QuickSelect
                                        value={draft.paperSize}
                                        onChange={event => applyPatch({ paperSize: event.target.value })}
                                    >
                                        {paperSizeOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </QuickSelect>
                                    <QuickFieldMeta>
                                        <QuickFieldError />
                                        <QuickFieldCounter />
                                    </QuickFieldMeta>
                                </QuickField>

                                <QuickField>
                                    <QuickLabel>Orientação</QuickLabel>
                                    <QuickSelect
                                        value={draft.orientation}
                                        onChange={event => applyPatch({ orientation: event.target.value })}
                                    >
                                        {orientationOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </QuickSelect>
                                    <QuickFieldMeta>
                                        <QuickFieldError />
                                        <QuickFieldCounter />
                                    </QuickFieldMeta>
                                </QuickField>

                                <QuickField $full>
                                    <QuickLabel>Observação do lote</QuickLabel>
                                    <QuickTextarea
                                        value={draft.observation}
                                        maxLength={60}
                                        placeholder="Ex: Revisar corredor 3 antes da abertura da loja."
                                        onChange={event => applyPatch({ observation: event.target.value })}
                                    />
                                    <QuickFieldMeta>
                                        <QuickFieldError />
                                        <QuickFieldCounter>{draft.observation.length}/60</QuickFieldCounter>
                                    </QuickFieldMeta>
                                </QuickField>
                            </SetupGrid>

                        </QuickCard>

                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Linhas</QuickCardEyebrow>
                                <QuickCardTitle>Montagem rápida do lote</QuickCardTitle>
                                <QuickCardText>
                                    Cada linha representa um cartaz. O lote só é liberado quando todas as linhas estão consistentes.
                                </QuickCardText>
                            </QuickCardHeader>

                            <RowList>
                                {draft.rows.map((row, index) => {
                                    const rowErrors = validation.rowErrors[row.id] || [];
                                    const isActive = activeRowId === row.id;
                                    const isValid = rowErrors.length === 0;
                                    const rowSuggestion = rowSuggestions[row.id];
                                    const lockedFields = rowLockedFields[row.id] || [];

                                    return (
                                        <RowCard
                                            key={row.id}
                                            $active={isActive}
                                            onClick={() => setActiveRowId(row.id)}
                                        >
                                            <RowHeader>
                                                <div>
                                                    <RowBadge>Linha {index + 1}</RowBadge>
                                                </div>
                                                <RowStatus $valid={isValid}>
                                                    {isValid ? "Pronta" : "Revisar"}
                                                </RowStatus>
                                            </RowHeader>

                                            <RowGrid>
                                                <RowField>
                                                    <QuickLabel>Produto ou EAN</QuickLabel>
                                                    <QuickInput
                                                        value={row.query}
                                                        maxLength={80}
                                                        placeholder="Ex: Café Pilão 500g ou 7891234567890"
                                                        onFocus={() => setActiveRowId(row.id)}
                                                        onChange={event => updateRow(row.id, { query: event.target.value })}
                                                    />
                                                    <QuickFieldMeta>
                                                        <QuickFieldError>{rowErrors[0] || ""}</QuickFieldError>
                                                        <QuickFieldCounter>{row.query.length}/80</QuickFieldCounter>
                                                    </QuickFieldMeta>
                                                </RowField>

                                                <RowField>
                                                    <QuickLabel>Complemento</QuickLabel>
                                                    <QuickInput
                                                        value={row.subtitle}
                                                        maxLength={60}
                                                        placeholder="Ex: Torração média"
                                                        onFocus={() => setActiveRowId(row.id)}
                                                        onChange={event => updateRow(row.id, { subtitle: event.target.value })}
                                                    />
                                                    <QuickFieldMeta>
                                                        <QuickFieldError />
                                                        <QuickFieldCounter>{row.subtitle.length}/60</QuickFieldCounter>
                                                    </QuickFieldMeta>
                                                </RowField>

                                                <RowPriceGrid>
                                                    {draft.priceType === "avista" ? (
                                                        <RowField>
                                                            <QuickLabel>Preço promocional</QuickLabel>
                                                            <QuickInput
                                                                value={row.cashPrice}
                                                                inputMode="decimal"
                                                                disabled={lockedFields.includes("cashPrice")}
                                                                placeholder="Ex: 12,99"
                                                                onFocus={() => setActiveRowId(row.id)}
                                                                onChange={event => updateRow(row.id, { cashPrice: event.target.value })}
                                                                onKeyDown={event => {
                                                                    if (event.key === "Enter") {
                                                                        event.preventDefault();
                                                                        addRow();
                                                                    }
                                                                }}
                                                            />
                                                            <QuickFieldMeta>
                                                                <QuickFieldError />
                                                                <QuickFieldCounter />
                                                            </QuickFieldMeta>
                                                        </RowField>
                                                    ) : null}

                                                    {draft.priceType === "depor" ? (
                                                        <>
                                                            <RowField>
                                                                <QuickLabel>Preço original</QuickLabel>
                                                                <QuickInput
                                                                    value={row.fromPrice}
                                                                    inputMode="decimal"
                                                                    placeholder="Ex: 15,90"
                                                                    onFocus={() => setActiveRowId(row.id)}
                                                                    onChange={event => updateRow(row.id, { fromPrice: event.target.value })}
                                                                />
                                                                <QuickFieldMeta>
                                                                    <QuickFieldError />
                                                                    <QuickFieldCounter />
                                                                </QuickFieldMeta>
                                                            </RowField>

                                                            <RowField>
                                                                <QuickLabel>Preço promocional</QuickLabel>
                                                                <QuickInput
                                                                    value={row.toPrice}
                                                                    inputMode="decimal"
                                                                    disabled={lockedFields.includes("toPrice")}
                                                                    placeholder="Ex: 12,99"
                                                                    onFocus={() => setActiveRowId(row.id)}
                                                                    onChange={event => updateRow(row.id, { toPrice: event.target.value })}
                                                                    onKeyDown={event => {
                                                                        if (event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            addRow();
                                                                        }
                                                                    }}
                                                                />
                                                                <QuickFieldMeta>
                                                                    <QuickFieldError />
                                                                    <QuickFieldCounter />
                                                                </QuickFieldMeta>
                                                            </RowField>
                                                        </>
                                                    ) : null}

                                                    {draft.priceType === "clube" ? (
                                                        <>
                                                            <RowField>
                                                                <QuickLabel>Valor normal</QuickLabel>
                                                                <QuickInput
                                                                    value={row.clubRegularPrice}
                                                                    inputMode="decimal"
                                                                    placeholder="Ex: 18,90"
                                                                    onFocus={() => setActiveRowId(row.id)}
                                                                    onChange={event => updateRow(row.id, { clubRegularPrice: event.target.value })}
                                                                />
                                                                <QuickFieldMeta>
                                                                    <QuickFieldError />
                                                                    <QuickFieldCounter />
                                                                </QuickFieldMeta>
                                                            </RowField>

                                                            <RowField>
                                                                <QuickLabel>Valor clube</QuickLabel>
                                                                <QuickInput
                                                                    value={row.clubPrice}
                                                                    inputMode="decimal"
                                                                    disabled={lockedFields.includes("clubPrice")}
                                                                    placeholder="Ex: 15,90"
                                                                    onFocus={() => setActiveRowId(row.id)}
                                                                    onChange={event => updateRow(row.id, { clubPrice: event.target.value })}
                                                                    onKeyDown={event => {
                                                                        if (event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            addRow();
                                                                        }
                                                                    }}
                                                                />
                                                                <QuickFieldMeta>
                                                                    <QuickFieldError />
                                                                    <QuickFieldCounter />
                                                                </QuickFieldMeta>
                                                            </RowField>
                                                        </>
                                                    ) : null}

                                                    {draft.priceType === "ofertaespecial" ? (
                                                        <>
                                                            <RowField>
                                                                <QuickLabel>Quantidade</QuickLabel>
                                                                <QuickInput
                                                                    value={row.specialQuantity}
                                                                    inputMode="numeric"
                                                                    placeholder="Ex: 3"
                                                                    onFocus={() => setActiveRowId(row.id)}
                                                                    onChange={event => updateRow(row.id, { specialQuantity: event.target.value })}
                                                                />
                                                                <QuickFieldMeta>
                                                                    <QuickFieldError />
                                                                    <QuickFieldCounter />
                                                                </QuickFieldMeta>
                                                            </RowField>

                                                            <RowField>
                                                                <QuickLabel>Preço da oferta</QuickLabel>
                                                                <QuickInput
                                                                    value={row.specialPrice}
                                                                    inputMode="decimal"
                                                                    disabled={lockedFields.includes("specialPrice")}
                                                                    placeholder="Ex: 10,00"
                                                                    onFocus={() => setActiveRowId(row.id)}
                                                                    onChange={event => updateRow(row.id, { specialPrice: event.target.value })}
                                                                    onKeyDown={event => {
                                                                        if (event.key === "Enter") {
                                                                            event.preventDefault();
                                                                            addRow();
                                                                        }
                                                                    }}
                                                                />
                                                                <QuickFieldMeta>
                                                                    <QuickFieldError />
                                                                    <QuickFieldCounter />
                                                                </QuickFieldMeta>
                                                            </RowField>
                                                        </>
                                                    ) : null}
                                                </RowPriceGrid>
                                            </RowGrid>

                                            <RowActions>
                                                <QuickCardText>
                                                    {rowErrors.length
                                                        ? rowErrors.join(" ")
                                                        : rowSuggestion
                                                            ? `${rowSuggestion.priceLabel} sugerido pelo ${pdvPolicy.sourceLabel}. ${rowSuggestion.lockSuggestedField ? "Campo principal protegido para este perfil." : "Ajuste manual permitido."}`
                                                            : "Linha pronta para entrar no lote."}
                                                </QuickCardText>
                                                <div>
                                                    <RowActionButton
                                                        type="button"
                                                        $danger
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            removeRow(row.id);
                                                        }}
                                                    >
                                                        Remover
                                                    </RowActionButton>
                                                </div>
                                            </RowActions>
                                        </RowCard>
                                    );
                                })}
                            </RowList>
                        </QuickCard>
                    </QuickPriceMain>

                    <QuickPriceSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Liberado" : "Revisão"}
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

                        <PreviewCard $accentColor={activePreview?.style?.accentColor}>
                            <QuickCardHeader>
                                <PreviewBadge $accentColor={activePreview?.style?.accentColor}>
                                    {activePreview?.offerTitle || "Linha ativa"}
                                </PreviewBadge>
                                <PreviewTitle
                                    $fontFamily={activePreview?.style?.titleFontFamily}
                                    $fontSize={activePreview?.style?.titleSizePx}
                                    $align={activePreview?.style?.titleAlign}
                                    $transform={activePreview?.style?.titleTransform}
                                >
                                    {activePreview?.title || "Selecione uma linha"}
                                </PreviewTitle>
                                {activePreview?.subtitle ? (
                                    <PreviewSubtitle
                                        $fontFamily={activePreview?.style?.infoFontFamily}
                                        $fontSize={activePreview?.style?.subtitleSizePx}
                                        $align={activePreview?.style?.titleAlign}
                                    >
                                        {activePreview.subtitle}
                                    </PreviewSubtitle>
                                ) : null}
                            </QuickCardHeader>

                            <PreviewPrice
                                $fontFamily={activePreview?.style?.priceFontFamily}
                                $fontSize={activePreview?.style?.priceSizePx}
                                $align={activePreview?.style?.priceAlign}
                                $accentColor={activePreview?.style?.accentColor}
                            >
                                {activePreview?.primaryPrice || "R$ --,--"}
                            </PreviewPrice>

                            {activePreview?.supportingPrice ? (
                                <PreviewSupportPrice
                                    $strike={draft.priceType === "depor"}
                                    $fontFamily={activePreview?.style?.infoFontFamily}
                                    $fontSize={activePreview?.style?.supportSizePx}
                                    $align={activePreview?.style?.priceAlign}
                                >
                                    {activePreview.supportingPrice}
                                </PreviewSupportPrice>
                            ) : null}

                            {activePreview?.specialLabel ? (
                                <PreviewSpecialLabel
                                    $fontFamily={activePreview?.style?.infoFontFamily}
                                    $color={activePreview?.style?.highlightColor}
                                    style={{
                                        background: activePreview?.style?.highlightColor
                                            ? `linear-gradient(180deg, ${activePreview.style.highlightColor}22 0%, ${activePreview.style.highlightColor}14 100%)`
                                            : undefined,
                                    }}
                                >
                                    {activePreview.specialLabel}
                                </PreviewSpecialLabel>
                            ) : null}

                            <PreviewMetaList>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Formato</PreviewMetaLabel>
                                    <PreviewMetaValue>{activePreview?.paperLabel || "--"}</PreviewMetaValue>
                                </PreviewMetaItem>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Código</PreviewMetaLabel>
                                    <PreviewMetaValue>{activePreview?.barcodeLabel || "Não exibido"}</PreviewMetaValue>
                                </PreviewMetaItem>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Validade</PreviewMetaLabel>
                                    <PreviewMetaValue>{activePreview?.validityLabel || "Sem validade"}</PreviewMetaValue>
                                </PreviewMetaItem>
                                {activePreview?.observation ? (
                                    <PreviewMetaItem>
                                        <PreviewMetaLabel>Observação</PreviewMetaLabel>
                                        <PreviewMetaValue>{activePreview.observation}</PreviewMetaValue>
                                    </PreviewMetaItem>
                                ) : null}
                            </PreviewMetaList>
                        </PreviewCard>
                    </QuickPriceSidebar>
                </QuickPriceLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
