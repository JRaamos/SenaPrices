import React, { useMemo, useState } from "react";

import DashboardIconGlyph from "components/Dashboard/IconGlyph";
import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import { buildPreviewInfoGroups, buildPriceDisplayParts, withAlpha } from "./helpers";
import {
    CreatePriceLayout,
    CreatePriceMain,
    CreatePriceSidebar,
    CreatePriceTopGrid,
    FieldCounter,
    FieldError,
    FieldInlineGrid,
    FieldMeta,
    HelperText,
    PosterBadge,
    PosterBadgeRow,
    PosterCard,
    PosterCentsGroup,
    PosterCurrencySymbol,
    PosterFooter,
    PosterHeader,
    PosterHeaderMetaItem,
    PosterHeaderMetaList,
    PosterMetaCard,
    PosterMetaGrid,
    PosterMetaLabel,
    PosterMetaValue,
    PosterPriceCents,
    PosterPriceComma,
    PosterPriceInteger,
    PosterPriceLine,
    PosterPriceRaw,
    PosterPriceSection,
    PosterPriceUnit,
    PosterSpecialLabel,
    PosterSubtitle,
    PosterSupportPrice,
    PosterTitle,
    PreviewCanvas,
    PreviewCanvasHeader,
    PreviewCanvasMeta,
    PreviewCanvasWrap,
    PreviewRail,
    PreviewSection,
    PreviewSectionEyebrow,
    PreviewSectionHeader,
    PreviewSectionText,
    PreviewSectionTextWrap,
    PreviewSectionTitle,
    PreviewSheet,
    PreviewSlot,
    PreviewWorkspace,
    SearchField,
    SearchIconWrap,
    SearchInput,
    SearchInputWrap,
    SearchPriceGrid,
    SelectedItemHint,
    SelectedItemMeta,
    SelectedItemPanel,
    SelectedItemTitle,
    SheetModeBadge,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    StudioCard,
    StudioCardEyebrow,
    StudioCardHeader,
    StudioCardText,
    StudioCardTitle,
    StudioField,
    StudioInput,
    StudioLabel,
    StudioSelect,
    StudioTextarea,
    SuggestionButton,
    SuggestionMeta,
    SuggestionPanel,
    SuggestionTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    ToggleInput,
    ToggleList,
    ToggleRow,
    ToggleText,
    ToggleTextWrap,
    ToggleTitle,
} from "./styled";

export default function DashboardCreatePrice() {
    const controller = useController();
    const [searchFocused, setSearchFocused] = useState(false);

    const previewPriceParts = useMemo(
        () => buildPriceDisplayParts(controller.preview.primaryPrice, controller.form.unitLabel, controller.preview.mode),
        [controller.form.unitLabel, controller.preview.mode, controller.preview.primaryPrice]
    );
    const previewInfoGroups = useMemo(
        () => buildPreviewInfoGroups(controller.preview),
        [controller.preview]
    );

    const selectedUnit = controller.selectedCatalogItem?.unit || controller.form.unitLabel;
    const canAdjustUnit = selectedUnit === "kg" || selectedUnit === "100g";
    return (
        <ContainerAuthenticated actions={controller.actions} loading={controller.loading}>
            <PageContent>
                <PageHeader header={controller.header} loading={controller.loading} />
                <FormSpacer />

                <CreatePriceLayout>
                    <CreatePriceMain>
                        <CreatePriceTopGrid>
                            <StudioCard>
                                <StudioCardHeader>
                                    <StudioCardEyebrow>Configuração</StudioCardEyebrow>
                                    <StudioCardTitle>Estrutura do cartaz</StudioCardTitle>
                                    <StudioCardText>
                                        Defina o tipo de preço, tamanho e orientação antes de preencher o item. O preview abaixo acompanha tudo em tempo real.
                                    </StudioCardText>
                                </StudioCardHeader>

                                <FieldInlineGrid>
                                    <StudioField>
                                        <StudioLabel>Tipo de preço</StudioLabel>
                                        <StudioSelect
                                            value={controller.form.priceType}
                                            onChange={event => controller.applyPatch({ priceType: event.target.value })}
                                        >
                                            {controller.priceTypeOptions.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </StudioSelect>
                                    </StudioField>

                                    <StudioField>
                                        <StudioLabel>Tamanho</StudioLabel>
                                        <StudioSelect
                                            value={controller.form.paperSize}
                                            onChange={event => controller.applyPatch({ paperSize: event.target.value })}
                                        >
                                            {controller.paperSizeOptions.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </StudioSelect>
                                    </StudioField>

                                    <StudioField>
                                        <StudioLabel>Orientação</StudioLabel>
                                        <StudioSelect
                                            value={controller.form.orientation}
                                            onChange={event => controller.applyPatch({ orientation: event.target.value })}
                                        >
                                            {controller.orientationOptions.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </StudioSelect>
                                    </StudioField>
                                </FieldInlineGrid>
                            </StudioCard>

                            <SearchPriceGrid>
                                <StudioCard>
                                    <StudioCardHeader>
                                        <StudioCardEyebrow>Buscar item</StudioCardEyebrow>
                                        <StudioCardTitle>Catálogo com sugestão dinâmica</StudioCardTitle>
                                        <StudioCardText>
                                            Digite código interno, EAN ou descrição. Enter e Tab escolhem a melhor sugestão e avançam para o preço.
                                        </StudioCardText>
                                    </StudioCardHeader>

                                    <SearchField>
                                        <SearchInputWrap>
                                            <SearchIconWrap>
                                                <DashboardIconGlyph name="search" size={18} color="currentColor" />
                                            </SearchIconWrap>
                                            <SearchInput
                                                ref={controller.bindFieldRef("itemSearch")}
                                                value={controller.itemQuery}
                                                placeholder="Buscar por nome, código ou EAN"
                                                onFocus={() => setSearchFocused(true)}
                                                onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
                                                onChange={event => controller.handleItemQueryChange(event.target.value)}
                                                onKeyDown={controller.handleItemQueryKeyDown}
                                            />
                                            {searchFocused && controller.showSuggestions ? (
                                                <SuggestionPanel>
                                                    {controller.itemSuggestions.map((item, index) => (
                                                        <SuggestionButton
                                                            key={item.id}
                                                            $active={index === controller.activeSuggestionIndex}
                                                            onMouseDown={event => {
                                                                event.preventDefault();
                                                                controller.handleSelectCatalogItem(item);
                                                                setSearchFocused(false);
                                                            }}
                                                            onMouseEnter={() => controller.setActiveSuggestionIndex(index)}
                                                        >
                                                            <SuggestionTitle>{item.description1 || item.internalCode || item.ean13}</SuggestionTitle>
                                                            <SuggestionMeta>
                                                                {[item.description2, item.internalCode || item.ean13, item.unit].filter(Boolean).join(" · ")}
                                                            </SuggestionMeta>
                                                        </SuggestionButton>
                                                    ))}
                                                </SuggestionPanel>
                                            ) : null}
                                        </SearchInputWrap>

                                        {controller.selectedCatalogItem ? (
                                            <SelectedItemPanel>
                                                <SelectedItemTitle>{controller.selectedCatalogItem.description1}</SelectedItemTitle>
                                                <SelectedItemMeta>
                                                    {[
                                                        controller.selectedCatalogItem.description2,
                                                        controller.selectedCatalogItem.internalCode || controller.selectedCatalogItem.ean13,
                                                        controller.form.unitLabel,
                                                    ].filter(Boolean).join(" · ")}
                                                </SelectedItemMeta>
                                                {canAdjustUnit ? (
                                                    <SelectedItemHint>Item por peso: você pode emitir por kg ou a cada 100g.</SelectedItemHint>
                                                ) : (
                                                    <SelectedItemHint>A unidade segue o cadastro do item para manter a consistência operacional.</SelectedItemHint>
                                                )}
                                            </SelectedItemPanel>
                                        ) : null}
                                    </SearchField>
                                </StudioCard>

                                <StudioCard>
                                    <StudioCardHeader>
                                        <StudioCardEyebrow>Preço</StudioCardEyebrow>
                                        <StudioCardTitle>Entrada prática da oferta</StudioCardTitle>
                                        <StudioCardText>
                                            Digite apenas números no valor. O sistema formata automaticamente em reais e centavos.
                                        </StudioCardText>
                                    </StudioCardHeader>

                                    {renderPriceFields(controller, canAdjustUnit)}

                                </StudioCard>
                            </SearchPriceGrid>
                        </CreatePriceTopGrid>

                        <PreviewSection>
                            <PreviewSectionHeader>
                                <PreviewSectionTextWrap>
                                    <PreviewSectionEyebrow>Preview</PreviewSectionEyebrow>
                                    <PreviewSectionTitle>Prévia simultânea do cartaz e da folha</PreviewSectionTitle>
                                    <PreviewSectionText>
                                        O preview se adapta ao espaço disponível e à orientação do cartaz. Quando A5 ou A6 estiverem configurados para sair em A4, a montagem da folha aparece aqui.
                                    </PreviewSectionText>
                                </PreviewSectionTextWrap>
                                <SheetModeBadge>
                                    {controller.preview.sheetLayout.sheetLabel}
                                </SheetModeBadge>
                            </PreviewSectionHeader>

                            <PreviewWorkspace $orientation={controller.preview.orientation}>
                                <PreviewRail>
                                    <StatusCard $tone={controller.statusCard.tone}>
                                        <StatusBadge $tone={controller.statusCard.tone}>
                                            {controller.statusCard.tone === "green" ? "Pronto" : "Revisar"}
                                        </StatusBadge>
                                        <StatusTitle>{controller.statusCard.title}</StatusTitle>
                                        <StatusText>{controller.statusCard.description}</StatusText>
                                    </StatusCard>

                                    <SummaryGrid>
                                        {controller.summaryItems.map(item => (
                                            <SummaryItem key={item.label}>
                                                <SummaryLabel>{item.label}</SummaryLabel>
                                                <SummaryValue>{item.value}</SummaryValue>
                                            </SummaryItem>
                                        ))}
                                    </SummaryGrid>

                                </PreviewRail>

                                <PreviewCanvasWrap>
                                    <PreviewCanvasHeader>
                                        <PreviewCanvasMeta>{controller.preview.paperLabel}</PreviewCanvasMeta>
                                        <PreviewCanvasMeta>{controller.preview.sheetLayout.helperText}</PreviewCanvasMeta>
                                    </PreviewCanvasHeader>
                                    <PreviewCanvas $orientation={controller.preview.orientation}>
                                        <PreviewSheet
                                            $aspectRatio={controller.preview.sheetAspectRatio}
                                            $columns={controller.preview.sheetLayout.columns}
                                            $rows={controller.preview.sheetLayout.rows}
                                            $orientation={controller.preview.orientation}
                                        >
                                            {Array.from({ length: controller.preview.sheetLayout.copies }).map((_, index) => (
                                                <PreviewSlot key={`${controller.preview.sheetLayout.mode}-${index}`}>
                                                    {renderPoster({
                                                        preview: controller.preview,
                                                        previewPriceParts,
                                                        previewInfoGroups,
                                                    })}
                                                </PreviewSlot>
                                            ))}
                                        </PreviewSheet>
                                    </PreviewCanvas>
                                </PreviewCanvasWrap>
                            </PreviewWorkspace>
                        </PreviewSection>
                    </CreatePriceMain>

                    <CreatePriceSidebar>
                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Informações adicionais</StudioCardEyebrow>
                                <StudioCardTitle>Vigência e observações</StudioCardTitle>
                                <StudioCardText>
                                    Defina os metadados da campanha e o título comercial que aparecerá no cartaz.
                                </StudioCardText>
                            </StudioCardHeader>

                            <StudioField>
                                <StudioLabel>Válido de</StudioLabel>
                                <StudioInput
                                    ref={controller.bindFieldRef("validFrom")}
                                    type="date"
                                    value={controller.form.validFrom}
                                    onChange={event => controller.applyPatch({ validFrom: event.target.value })}
                                    onKeyDown={event => controller.handleFieldAdvance("validFrom", event)}
                                />
                                <FieldMeta>
                                    <FieldError>{controller.validation.errors.validFrom || ""}</FieldError>
                                    <FieldCounter />
                                </FieldMeta>
                            </StudioField>

                            <StudioField>
                                <StudioLabel>Válido até</StudioLabel>
                                <StudioInput
                                    ref={controller.bindFieldRef("validUntil")}
                                    type="date"
                                    value={controller.form.validUntil}
                                    onChange={event => controller.applyPatch({ validUntil: event.target.value })}
                                    onKeyDown={event => controller.handleFieldAdvance("validUntil", event)}
                                />
                                <FieldMeta>
                                    <FieldError>{controller.validation.errors.validUntil || ""}</FieldError>
                                    <FieldCounter />
                                </FieldMeta>
                            </StudioField>

                            <StudioField>
                                <StudioLabel>Tipo de oferta</StudioLabel>
                                <StudioSelect
                                    ref={controller.bindFieldRef("offerTypeSelect")}
                                    value={controller.offerTypeSelectValue}
                                    onChange={event => controller.handleOfferTypeSelectChange(event.target.value)}
                                    onKeyDown={event => controller.handleFieldAdvance("offerTypeSelect", event)}
                                >
                                    <option value="">Nenhum</option>
                                    {controller.offerTypeOptions.map(item => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                                    <option value="__custom__">Personalizado</option>
                                </StudioSelect>
                            </StudioField>

                            {controller.showCustomOfferInput ? (
                                <StudioField>
                                    <StudioLabel>Título personalizado</StudioLabel>
                                    <StudioInput
                                        ref={controller.bindFieldRef("offerTitleCustom")}
                                        value={controller.form.offerTitle}
                                        placeholder="Ex: Oferta da semana"
                                        onChange={event => controller.applyPatch({ offerTitle: event.target.value })}
                                        onKeyDown={event => controller.handleFieldAdvance("offerTitleCustom", event)}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{controller.form.offerTitle.length}/30</FieldCounter>
                                    </FieldMeta>
                                </StudioField>
                            ) : null}

                            <StudioField>
                                <StudioLabel>Observação</StudioLabel>
                                <StudioTextarea
                                    ref={controller.bindFieldRef("observation")}
                                    value={controller.form.observation}
                                    placeholder="Texto complementar no rodapé"
                                    onChange={event => controller.applyPatch({ observation: event.target.value })}
                                    onKeyDown={event => controller.handleFieldAdvance("observation", event)}
                                />
                                <FieldMeta>
                                    <FieldError />
                                    <FieldCounter>{controller.form.observation.length}/60</FieldCounter>
                                </FieldMeta>
                            </StudioField>

                            <ToggleList>
                                <ToggleRow>
                                    <ToggleInput
                                        checked={controller.form.showBarcode}
                                        onChange={event => controller.applyPatch({ showBarcode: event.target.checked })}
                                    />
                                    <ToggleTextWrap>
                                        <ToggleTitle>Exibir código de barras</ToggleTitle>
                                        <ToggleText>Mostra EAN ou código interno conforme a disponibilidade do item.</ToggleText>
                                    </ToggleTextWrap>
                                </ToggleRow>

                                <ToggleRow>
                                    <ToggleInput
                                        checked={controller.form.showValidity}
                                        onChange={event => controller.applyPatch({ showValidity: event.target.checked })}
                                    />
                                    <ToggleTextWrap>
                                        <ToggleTitle>Exibir validade</ToggleTitle>
                                        <ToggleText>Inclui a vigência programada no cartaz para reduzir trocas incorretas.</ToggleText>
                                    </ToggleTextWrap>
                                </ToggleRow>
                            </ToggleList>
                        </StudioCard>

                    </CreatePriceSidebar>
                </CreatePriceLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}

function renderPriceFields(controller, canAdjustUnit) {
    const priceType = controller.form.priceType;
    const isUnitLocked = !!controller.selectedCatalogItem && !canAdjustUnit;

    return (
        <>
            <FieldInlineGrid>
                {priceType === "avista" ? (
                    <StudioField>
                        <StudioLabel>Valor (R$)</StudioLabel>
                        <StudioInput
                            ref={controller.bindFieldRef("cashPrice")}
                            inputMode="numeric"
                            value={controller.form.cashPrice}
                            placeholder="Digite apenas números"
                            onChange={event => controller.applyPatch({ cashPrice: event.target.value })}
                            onKeyDown={event => controller.handleFieldAdvance("cashPrice", event)}
                        />
                        <FieldMeta>
                            <FieldError>{controller.validation.errors.cashPrice || ""}</FieldError>
                            <FieldCounter />
                        </FieldMeta>
                    </StudioField>
                ) : null}

                {priceType === "depor" ? (
                    <>
                        <StudioField>
                            <StudioLabel>De (R$)</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("fromPrice")}
                                inputMode="numeric"
                                value={controller.form.fromPrice}
                                placeholder="Digite apenas números"
                                onChange={event => controller.applyPatch({ fromPrice: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("fromPrice", event)}
                            />
                            <FieldMeta>
                                <FieldError>{controller.validation.errors.fromPrice || ""}</FieldError>
                                <FieldCounter />
                            </FieldMeta>
                        </StudioField>

                        <StudioField>
                            <StudioLabel>Por (R$)</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("toPrice")}
                                inputMode="numeric"
                                value={controller.form.toPrice}
                                placeholder="Digite apenas números"
                                onChange={event => controller.applyPatch({ toPrice: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("toPrice", event)}
                            />
                            <FieldMeta>
                                <FieldError>{controller.validation.errors.toPrice || ""}</FieldError>
                                <FieldCounter />
                            </FieldMeta>
                        </StudioField>
                    </>
                ) : null}

                {priceType === "clube" ? (
                    <>
                        <StudioField>
                            <StudioLabel>Preço normal (R$)</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("clubRegularPrice")}
                                inputMode="numeric"
                                value={controller.form.clubRegularPrice}
                                placeholder="Digite apenas números"
                                onChange={event => controller.applyPatch({ clubRegularPrice: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("clubRegularPrice", event)}
                            />
                            <FieldMeta>
                                <FieldError>{controller.validation.errors.clubRegularPrice || ""}</FieldError>
                                <FieldCounter />
                            </FieldMeta>
                        </StudioField>

                        <StudioField>
                            <StudioLabel>Preço clube (R$)</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("clubPrice")}
                                inputMode="numeric"
                                value={controller.form.clubPrice}
                                placeholder="Digite apenas números"
                                onChange={event => controller.applyPatch({ clubPrice: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("clubPrice", event)}
                            />
                            <FieldMeta>
                                <FieldError>{controller.validation.errors.clubPrice || ""}</FieldError>
                                <FieldCounter />
                            </FieldMeta>
                        </StudioField>

                        <StudioField>
                            <StudioLabel>Texto do selo</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("clubLabel")}
                                value={controller.form.clubLabel}
                                placeholder="Ex: Oferta Clube"
                                onChange={event => controller.applyPatch({ clubLabel: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("clubLabel", event)}
                            />
                            <FieldMeta>
                                <FieldError />
                                <FieldCounter>{controller.form.clubLabel.length}/28</FieldCounter>
                            </FieldMeta>
                        </StudioField>
                    </>
                ) : null}

                {priceType === "ofertaespecial" ? (
                    <>
                        <StudioField>
                            <StudioLabel>Quantidade</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("specialQuantity")}
                                inputMode="numeric"
                                value={controller.form.specialQuantity}
                                placeholder="Ex: 3"
                                onChange={event => controller.applyPatch({ specialQuantity: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("specialQuantity", event)}
                            />
                            <FieldMeta>
                                <FieldError>{controller.validation.errors.specialQuantity || ""}</FieldError>
                                <FieldCounter />
                            </FieldMeta>
                        </StudioField>

                        <StudioField>
                            <StudioLabel>Valor da oferta (R$)</StudioLabel>
                            <StudioInput
                                ref={controller.bindFieldRef("specialPrice")}
                                inputMode="numeric"
                                value={controller.form.specialPrice}
                                placeholder="Digite apenas números"
                                onChange={event => controller.applyPatch({ specialPrice: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("specialPrice", event)}
                            />
                            <FieldMeta>
                                <FieldError>{controller.validation.errors.specialPrice || ""}</FieldError>
                                <FieldCounter />
                            </FieldMeta>
                        </StudioField>

                        <StudioField>
                            <StudioLabel>Layout da oferta</StudioLabel>
                            <StudioSelect
                                ref={controller.bindFieldRef("specialLayout")}
                                value={controller.form.specialLayout}
                                onChange={event => controller.applyPatch({ specialLayout: event.target.value })}
                                onKeyDown={event => controller.handleFieldAdvance("specialLayout", event)}
                            >
                                {controller.specialLayoutOptions.map(item => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </StudioSelect>
                        </StudioField>
                    </>
                ) : null}

                <StudioField>
                    <StudioLabel>Unidade de venda</StudioLabel>
                    <StudioSelect
                        ref={controller.bindFieldRef("unitLabel")}
                        value={controller.form.unitLabel}
                        disabled={isUnitLocked}
                        onChange={event => controller.applyPatch({ unitLabel: event.target.value })}
                        onKeyDown={event => controller.handleFieldAdvance("unitLabel", event)}
                    >
                        {controller.unitOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </StudioSelect>
                    <FieldMeta>
                        <FieldError />
                        <FieldCounter />
                    </FieldMeta>
                </StudioField>
            </FieldInlineGrid>

            <HelperText>
                {canAdjustUnit
                    ? "Itens vendidos por peso podem alternar entre kg e cada 100g sem perder a base do cadastro."
                    : "A unidade principal vem do cadastro do item para manter o cartaz coerente com o catálogo."}
            </HelperText>
        </>
    );
}

function renderPoster({ preview, previewPriceParts, previewInfoGroups }) {
    const titleSize = preview.style?.titleSizePx ? Math.max(18, Math.round(preview.style.titleSizePx * 0.58)) : 28;
    const subtitleSize = preview.style?.subtitleSizePx ? Math.max(11, Math.round(preview.style.subtitleSizePx * 0.74)) : 13;
    const priceSize = preview.style?.priceSizePx ? Math.max(34, Math.round(preview.style.priceSizePx * 0.72)) : 54;
    const supportSize = preview.style?.supportSizePx ? Math.max(12, Math.round(preview.style.supportSizePx * 0.78)) : 16;
    const priceColor = preview.style?.accentColor;
    const specialBackground = withAlpha(preview.style?.highlightColor, 0.14);
    const badgeBackground = withAlpha(preview.style?.accentColor, 0.08);

    return (
        <PosterCard $padding={preview.style?.framePadding} $radius={preview.style?.frameRadius}>
            <PosterHeader>
                <PosterBadgeRow>
                    <PosterBadge $background={badgeBackground} $color={priceColor}>
                        {preview.offerTitle}
                    </PosterBadge>
                    {previewInfoGroups.badgeItems.map(item => (
                        <PosterBadge key={`${item.label}-${item.value}`} $background="rgba(255,255,255,0.46)" $color="#334155">
                            {item.value}
                        </PosterBadge>
                    ))}
                </PosterBadgeRow>

                <PosterTitle
                    $fontFamily={preview.style?.titleFontFamily}
                    $fontSize={titleSize}
                    $align={preview.style?.titleAlign}
                    $transform={preview.style?.titleTransform}
                >
                    {preview.title}
                </PosterTitle>

                {preview.subtitle ? (
                    <PosterSubtitle
                        $fontFamily={preview.style?.infoFontFamily}
                        $fontSize={subtitleSize}
                        $align={preview.style?.titleAlign}
                    >
                        {preview.subtitle}
                    </PosterSubtitle>
                ) : null}

                {previewInfoGroups.headerItems.length ? (
                    <PosterHeaderMetaList>
                        {previewInfoGroups.headerItems.map(item => (
                            <PosterHeaderMetaItem key={`${item.label}-${item.value}`}>
                                <PosterMetaLabel>{item.label}</PosterMetaLabel>
                                <PosterMetaValue>{item.value}</PosterMetaValue>
                            </PosterHeaderMetaItem>
                        ))}
                    </PosterHeaderMetaList>
                ) : null}
            </PosterHeader>

            <PosterPriceSection $align={preview.style?.priceAlign}>
                {!previewPriceParts.structured ? (
                    <PosterPriceRaw
                        $color={priceColor}
                        $fontFamily={preview.style?.priceFontFamily}
                        $fontSize={priceSize}
                        $align={preview.style?.priceAlign}
                    >
                        {preview.primaryPrice}
                    </PosterPriceRaw>
                ) : (
                    <>
                        {preview.style?.priceSymbolPosition === "top" ? (
                            <PosterCurrencySymbol
                                $color={priceColor}
                                $fontFamily={preview.style?.priceFontFamily}
                                $fontSize={Math.max(14, Math.round(priceSize * 0.22))}
                                $offsetX={preview.style?.priceSymbolOffsetX}
                                $offsetY={preview.style?.priceSymbolOffsetY}
                            >
                                {previewPriceParts.symbol}
                            </PosterCurrencySymbol>
                        ) : null}

                        <PosterPriceLine>
                            {preview.style?.priceSymbolPosition === "left" ? (
                                <PosterCurrencySymbol
                                    $color={priceColor}
                                    $fontFamily={preview.style?.priceFontFamily}
                                    $fontSize={Math.max(14, Math.round(priceSize * 0.22))}
                                    $offsetX={preview.style?.priceSymbolOffsetX}
                                    $offsetY={preview.style?.priceSymbolOffsetY}
                                >
                                    {previewPriceParts.symbol}
                                </PosterCurrencySymbol>
                            ) : null}

                            <PosterPriceInteger
                                $color={priceColor}
                                $fontFamily={preview.style?.priceFontFamily}
                                $fontSize={priceSize}
                            >
                                {previewPriceParts.integer}
                            </PosterPriceInteger>

                            <PosterCentsGroup
                                $align={preview.style?.centsAlign}
                                $offsetX={preview.style?.centsOffsetX}
                                $offsetY={preview.style?.centsOffsetY}
                            >
                                <PosterPriceComma
                                    $color={priceColor}
                                    $fontFamily={preview.style?.priceFontFamily}
                                    $fontSize={Math.max(14, Math.round(priceSize * 0.28))}
                                    $offsetX={preview.style?.commaOffsetX}
                                    $offsetY={preview.style?.commaOffsetY}
                                >
                                    {previewPriceParts.comma}
                                </PosterPriceComma>
                                <PosterPriceCents
                                    $color={priceColor}
                                    $fontFamily={preview.style?.priceFontFamily}
                                    $fontSize={Math.max(18, Math.round(priceSize * 0.34))}
                                >
                                    {previewPriceParts.cents}
                                </PosterPriceCents>
                            </PosterCentsGroup>

                            {preview.style?.unitPosition === "inline" && previewPriceParts.unitLabel ? (
                                <PosterPriceUnit
                                    $fontFamily={preview.style?.infoFontFamily}
                                    $fontSize={supportSize}
                                    $offsetX={preview.style?.unitOffsetX}
                                    $offsetY={preview.style?.unitOffsetY}
                                >
                                    {previewPriceParts.unitLabel}
                                </PosterPriceUnit>
                            ) : null}
                        </PosterPriceLine>

                        {preview.style?.unitPosition === "below" && previewPriceParts.unitLabel ? (
                            <PosterPriceUnit
                                $fontFamily={preview.style?.infoFontFamily}
                                $fontSize={supportSize}
                                $offsetX={preview.style?.unitOffsetX}
                                $offsetY={preview.style?.unitOffsetY}
                            >
                                {previewPriceParts.unitLabel}
                            </PosterPriceUnit>
                        ) : null}
                    </>
                )}

                {preview.supportingPrice ? (
                    <PosterSupportPrice
                        $strike={preview.mode === "compare"}
                        $fontFamily={preview.style?.infoFontFamily}
                        $fontSize={supportSize}
                        $align={preview.style?.priceAlign}
                    >
                        {preview.supportingPrice}
                    </PosterSupportPrice>
                ) : null}

                {preview.specialLabel ? (
                    <PosterSpecialLabel $background={specialBackground} $color={preview.style?.highlightColor}>
                        {preview.specialLabel}
                    </PosterSpecialLabel>
                ) : null}
            </PosterPriceSection>

            <PosterFooter>
                {previewInfoGroups.metaItems.length ? (
                    <PosterMetaGrid $layout={preview.style?.metaLayout}>
                        {previewInfoGroups.metaItems.map(item => (
                            <PosterMetaCard key={`${item.label}-${item.value}`}>
                                <PosterMetaLabel>{item.label}</PosterMetaLabel>
                                <PosterMetaValue>{item.value}</PosterMetaValue>
                            </PosterMetaCard>
                        ))}
                    </PosterMetaGrid>
                ) : null}

                {previewInfoGroups.footerItems.length ? (
                    <PosterMetaGrid $layout="stacked">
                        {previewInfoGroups.footerItems.map(item => (
                            <PosterMetaCard key={`${item.label}-${item.value}`}>
                                <PosterMetaLabel>{item.label}</PosterMetaLabel>
                                <PosterMetaValue>{item.value}</PosterMetaValue>
                            </PosterMetaCard>
                        ))}
                    </PosterMetaGrid>
                ) : null}
            </PosterFooter>
        </PosterCard>
    );
}
