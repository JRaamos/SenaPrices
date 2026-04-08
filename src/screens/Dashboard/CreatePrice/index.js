import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CreatePriceLayout,
    CreatePriceMain,
    CreatePriceSidebar,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineGrid,
    InlineNotice,
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
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
    ShortcutItem,
    ShortcutKey,
    ShortcutList,
    ShortcutText,
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
    StudioGrid,
    StudioInput,
    StudioLabel,
    StudioSelect,
    StudioTextarea,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    ToggleGrid,
    ToggleInput,
    ToggleItem,
    ToggleText,
    WarningItem,
    WarningList,
} from "./styled";

export default function DashboardCreatePrice() {
    const {
        loading,
        header,
        actions,
        form,
        preview,
        validation,
        statusCard,
        summaryItems,
        recentItems,
        shortcuts,
        guidelines,
        priceTypeOptions,
        paperSizeOptions,
        orientationOptions,
        unitOptions,
        specialLayoutOptions,
        pdvPolicy,
        pdvSuggestion,
        pdvLockedFields,
        applyPatch,
        handleRestoreComposition,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <CreatePriceLayout>
                    <CreatePriceMain>
                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Produto</StudioCardEyebrow>
                                <StudioCardTitle>Base da composicao</StudioCardTitle>
                                <StudioCardText>
                                    Estruture os dados principais do item de forma limpa para que o cartaz fique legivel e facil de manter.
                                </StudioCardText>
                            </StudioCardHeader>

                            <StudioGrid>
                                <StudioField $full>
                                    <StudioLabel>Descrição principal</StudioLabel>
                                    <StudioInput
                                        value={form.productName}
                                        maxLength={80}
                                        placeholder="Ex: Cafe torrado e moido 500g"
                                        onChange={event => applyPatch({ productName: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.productName || ""}</FieldError>
                                        <FieldCounter>{form.productName.length}/80</FieldCounter>
                                    </FieldMeta>
                                </StudioField>

                                <StudioField $full>
                                    <StudioLabel>Descrição complementar</StudioLabel>
                                    <StudioInput
                                        value={form.productSubtitle}
                                        maxLength={80}
                                        placeholder="Ex: Embalagem almofada - Torracao media"
                                        onChange={event => applyPatch({ productSubtitle: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.productSubtitle.length}/80</FieldCounter>
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>Secao</StudioLabel>
                                    <StudioInput
                                        value={form.sectionName}
                                        maxLength={40}
                                        placeholder="Ex: Mercearia"
                                        onChange={event => applyPatch({ sectionName: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.sectionName.length}/40</FieldCounter>
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>Unidade</StudioLabel>
                                    <StudioSelect
                                        value={form.unitLabel}
                                        onChange={event => applyPatch({ unitLabel: event.target.value })}
                                    >
                                        {unitOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </StudioSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>Codigo interno</StudioLabel>
                                    <StudioInput
                                        value={form.internalCode}
                                        maxLength={24}
                                        placeholder="Ex: CAFE-500"
                                        onChange={event => applyPatch({ internalCode: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.internalCode.length}/24</FieldCounter>
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>EAN-13</StudioLabel>
                                    <StudioInput
                                        value={form.eanCode}
                                        maxLength={13}
                                        inputMode="numeric"
                                        placeholder="7891234567890"
                                        onChange={event => applyPatch({ eanCode: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.eanCode || ""}</FieldError>
                                        <FieldCounter>{form.eanCode.length}/13</FieldCounter>
                                    </FieldMeta>
                                </StudioField>
                            </StudioGrid>
                        </StudioCard>

                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Oferta</StudioCardEyebrow>
                                <StudioCardTitle>Regra comercial do cartaz</StudioCardTitle>
                                <StudioCardText>
                                    Escolha o modelo promocional e preencha somente os campos coerentes com o tipo selecionado.
                                </StudioCardText>
                            </StudioCardHeader>

                            <PriceTypeGrid>
                                {priceTypeOptions.map(item => (
                                    <PriceTypeButton
                                        key={item.value}
                                        type="button"
                                        $active={form.priceType === item.value}
                                        onClick={() => applyPatch({ priceType: item.value })}
                                    >
                                        <PriceTypeButtonTitle>{item.label}</PriceTypeButtonTitle>
                                        <PriceTypeButtonText>{item.helper}</PriceTypeButtonText>
                                    </PriceTypeButton>
                                ))}
                            </PriceTypeGrid>

                            {pdvPolicy.integrationEnabled ? (
                                <InlineNotice>
                                    {pdvSuggestion
                                        ? `${pdvSuggestion.priceLabel} sugerido pelo ${pdvPolicy.sourceLabel}. ${pdvSuggestion.lockSuggestedField
                                            ? "O campo principal fica protegido para este perfil."
                                            : "Você pode ajustar manualmente se necessário."}`
                                        : pdvPolicy.canSeeSuggestedPrice
                                            ? "Quando houver preço rastreável por EAN-13, código interno ou item já precificado, o sistema pré-preenche o campo principal para acelerar a operação."
                                            : "A integração PDV está ativa, mas a política atual não exibe preço sugerido para este perfil."}
                                </InlineNotice>
                            ) : null}

                            {form.priceType === "avista" ? (
                                <InlineGrid>
                                    <StudioField $full>
                                        <StudioLabel>Preco promocional</StudioLabel>
                                        <StudioInput
                                            value={form.cashPrice}
                                            inputMode="decimal"
                                            disabled={pdvLockedFields.includes("cashPrice")}
                                            placeholder="Ex: 12,99"
                                            onChange={event => applyPatch({ cashPrice: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.cashPrice || ""}</FieldError>
                                            <FieldCounter>{pdvLockedFields.includes("cashPrice") ? "Protegido pela política PDV" : "Use vírgula para centavos"}</FieldCounter>
                                        </FieldMeta>
                                    </StudioField>
                                </InlineGrid>
                            ) : null}

                            {form.priceType === "depor" ? (
                                <InlineGrid>
                                    <StudioField>
                                        <StudioLabel>Preco original</StudioLabel>
                                        <StudioInput
                                            value={form.fromPrice}
                                            inputMode="decimal"
                                            placeholder="Ex: 15,90"
                                            onChange={event => applyPatch({ fromPrice: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.fromPrice || ""}</FieldError>
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>

                                    <StudioField>
                                        <StudioLabel>Preco promocional</StudioLabel>
                                        <StudioInput
                                            value={form.toPrice}
                                            inputMode="decimal"
                                            disabled={pdvLockedFields.includes("toPrice")}
                                            placeholder="Ex: 12,99"
                                            onChange={event => applyPatch({ toPrice: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.toPrice || ""}</FieldError>
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>
                                </InlineGrid>
                            ) : null}

                            {form.priceType === "clube" ? (
                                <InlineGrid>
                                    <StudioField>
                                        <StudioLabel>Valor normal</StudioLabel>
                                        <StudioInput
                                            value={form.clubRegularPrice}
                                            inputMode="decimal"
                                            placeholder="Ex: 18,90"
                                            onChange={event => applyPatch({ clubRegularPrice: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.clubRegularPrice || ""}</FieldError>
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>

                                    <StudioField>
                                        <StudioLabel>Valor clube</StudioLabel>
                                        <StudioInput
                                            value={form.clubPrice}
                                            inputMode="decimal"
                                            disabled={pdvLockedFields.includes("clubPrice")}
                                            placeholder="Ex: 15,90"
                                            onChange={event => applyPatch({ clubPrice: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.clubPrice || ""}</FieldError>
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>

                                    <StudioField $full>
                                        <StudioLabel>Chamada do clube</StudioLabel>
                                        <StudioInput
                                            value={form.clubLabel}
                                            maxLength={28}
                                            placeholder="Ex: Clube de vantagens"
                                            onChange={event => applyPatch({ clubLabel: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError />
                                            <FieldCounter>{form.clubLabel.length}/28</FieldCounter>
                                        </FieldMeta>
                                    </StudioField>
                                </InlineGrid>
                            ) : null}

                            {form.priceType === "ofertaespecial" ? (
                                <InlineGrid>
                                    <StudioField>
                                        <StudioLabel>Quantidade</StudioLabel>
                                        <StudioInput
                                            value={form.specialQuantity}
                                            inputMode="numeric"
                                            placeholder="Ex: 3"
                                            onChange={event => applyPatch({ specialQuantity: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.specialQuantity || ""}</FieldError>
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>

                                    <StudioField>
                                        <StudioLabel>Preco da oferta</StudioLabel>
                                        <StudioInput
                                            value={form.specialPrice}
                                            inputMode="decimal"
                                            disabled={pdvLockedFields.includes("specialPrice")}
                                            placeholder="Ex: 10,00"
                                            onChange={event => applyPatch({ specialPrice: event.target.value })}
                                        />
                                        <FieldMeta>
                                            <FieldError>{validation.errors.specialPrice || ""}</FieldError>
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>

                                    <StudioField $full>
                                        <StudioLabel>Layout da chamada</StudioLabel>
                                        <StudioSelect
                                            value={form.specialLayout}
                                            onChange={event => applyPatch({ specialLayout: event.target.value })}
                                        >
                                            {specialLayoutOptions.map(item => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))}
                                        </StudioSelect>
                                        <FieldMeta>
                                            <FieldError />
                                            <FieldCounter />
                                        </FieldMeta>
                                    </StudioField>
                                </InlineGrid>
                            ) : null}
                        </StudioCard>

                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Apresentacao</StudioCardEyebrow>
                                <StudioCardTitle>Formato, validade e comunicacao</StudioCardTitle>
                                <StudioCardText>
                                    Configure o contexto visual do cartaz pensando na impressao, leitura rapida e padronizacao operacional.
                                </StudioCardText>
                            </StudioCardHeader>

                            <StudioGrid>
                                <StudioField>
                                    <StudioLabel>Titulo da oferta</StudioLabel>
                                    <StudioInput
                                        value={form.offerTitle}
                                        maxLength={30}
                                        placeholder="Ex: Oferta do dia"
                                        onChange={event => applyPatch({ offerTitle: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.offerTitle.length}/30</FieldCounter>
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>Valido ate</StudioLabel>
                                    <StudioInput
                                        type="date"
                                        value={form.validUntil}
                                        onChange={event => applyPatch({ validUntil: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError>{validation.errors.validUntil || ""}</FieldError>
                                        <FieldCounter />
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>Tamanho do papel</StudioLabel>
                                    <StudioSelect
                                        value={form.paperSize}
                                        onChange={event => applyPatch({ paperSize: event.target.value })}
                                    >
                                        {paperSizeOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </StudioSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </StudioField>

                                <StudioField>
                                    <StudioLabel>Orientacao</StudioLabel>
                                    <StudioSelect
                                        value={form.orientation}
                                        onChange={event => applyPatch({ orientation: event.target.value })}
                                    >
                                        {orientationOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </StudioSelect>
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter />
                                    </FieldMeta>
                                </StudioField>

                                <StudioField $full>
                                    <StudioLabel>Observacao visivel no cartaz</StudioLabel>
                                    <StudioTextarea
                                        value={form.observation}
                                        maxLength={60}
                                        placeholder="Ex: Oferta valida enquanto durarem os estoques."
                                        onChange={event => applyPatch({ observation: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.observation.length}/60</FieldCounter>
                                    </FieldMeta>
                                </StudioField>
                            </StudioGrid>

                            <ToggleGrid>
                                <ToggleItem>
                                    <ToggleInput
                                        checked={form.showBarcode}
                                        onChange={event => applyPatch({ showBarcode: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Exibir codigo no cartaz</strong>
                                        Mostra o EAN-13 ou o codigo interno no rodape para facilitar conferencia durante a operacao.
                                    </ToggleText>
                                </ToggleItem>

                                <ToggleItem>
                                    <ToggleInput
                                        checked={form.showValidity}
                                        onChange={event => applyPatch({ showValidity: event.target.checked })}
                                    />
                                    <ToggleText>
                                        <strong>Exibir validade da oferta</strong>
                                        Recomendado para evitar ambiguidades e reforcar governanca na impressao de campanhas.
                                    </ToggleText>
                                </ToggleItem>
                            </ToggleGrid>
                        </StudioCard>
                    </CreatePriceMain>

                    <CreatePriceSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Validado" : "Revisao"}
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

                        {!validation.isValid ? (
                            <ErrorSummary>
                                <ErrorSummaryTitle>Pendencias obrigatorias</ErrorSummaryTitle>
                                {validation.errorList.map(item => (
                                    <ErrorSummaryItem key={item}>{item}</ErrorSummaryItem>
                                ))}
                            </ErrorSummary>
                        ) : null}

                        {validation.warnings.length ? (
                            <StudioCard>
                                <StudioCardHeader>
                                    <StudioCardEyebrow>Melhorias</StudioCardEyebrow>
                                    <StudioCardTitle>Refinamentos recomendados</StudioCardTitle>
                                    <StudioCardText>
                                        O cartaz ja pode estar valido, mas estas melhorias elevam padrao e rastreabilidade.
                                    </StudioCardText>
                                </StudioCardHeader>

                                <WarningList>
                                    {validation.warnings.map(item => (
                                        <WarningItem key={item}>{item}</WarningItem>
                                    ))}
                                </WarningList>
                            </StudioCard>
                        ) : null}

                        <PreviewCard>
                            <StudioCardHeader>
                                <PreviewBadge>{preview.offerTitle}</PreviewBadge>
                                <PreviewTitle>{preview.title}</PreviewTitle>
                                {preview.subtitle ? <PreviewSubtitle>{preview.subtitle}</PreviewSubtitle> : null}
                            </StudioCardHeader>

                            <PreviewPrice>{preview.primaryPrice}</PreviewPrice>

                            {preview.supportingPrice ? (
                                <PreviewSupportPrice $strike={form.priceType === "depor"}>
                                    {preview.supportingPrice}
                                </PreviewSupportPrice>
                            ) : null}

                            {preview.specialLabel ? (
                                <PreviewSpecialLabel>{preview.specialLabel}</PreviewSpecialLabel>
                            ) : null}

                            <PreviewMetaList>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Formato</PreviewMetaLabel>
                                    <PreviewMetaValue>{preview.paperLabel}</PreviewMetaValue>
                                </PreviewMetaItem>

                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Codigo</PreviewMetaLabel>
                                    <PreviewMetaValue>{preview.barcodeLabel || "Nao exibido"}</PreviewMetaValue>
                                </PreviewMetaItem>

                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Validade</PreviewMetaLabel>
                                    <PreviewMetaValue>{preview.validityLabel || "Sem validade"}</PreviewMetaValue>
                                </PreviewMetaItem>

                                {preview.observation ? (
                                    <PreviewMetaItem>
                                        <PreviewMetaLabel>Observacao</PreviewMetaLabel>
                                        <PreviewMetaValue>{preview.observation}</PreviewMetaValue>
                                    </PreviewMetaItem>
                                ) : null}
                            </PreviewMetaList>
                        </PreviewCard>

                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Boas praticas</StudioCardEyebrow>
                                <StudioCardTitle>Checklist de qualidade</StudioCardTitle>
                                <StudioCardText>
                                    Diretrizes de mercado aplicadas para manter padrão profissional na comunicação de preço.
                                </StudioCardText>
                            </StudioCardHeader>

                            <ChecklistList>
                                {guidelines.map(item => (
                                    <ChecklistItem key={item.title}>
                                        <ChecklistTitle>{item.title}</ChecklistTitle>
                                        <ChecklistText>{item.description}</ChecklistText>
                                    </ChecklistItem>
                                ))}
                            </ChecklistList>
                        </StudioCard>

                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Histórico local</StudioCardEyebrow>
                                <StudioCardTitle>Composicoes recentes</StudioCardTitle>
                                <StudioCardText>
                                    Versoes validas salvas neste navegador com criptografia da base atual do projeto.
                                </StudioCardText>
                            </StudioCardHeader>

                            <RecentList>
                                {!recentItems.length ? (
                                    <RecentItem>
                                        <RecentTitle>Nenhuma composicao salva ainda</RecentTitle>
                                        <RecentMeta>Use "Salvar versao" para criar um ponto de restauracao local.</RecentMeta>
                                    </RecentItem>
                                ) : recentItems.map(item => (
                                    <RecentItem key={item.id}>
                                        <RecentHeader>
                                            <div>
                                                <RecentTitle>{item.title}</RecentTitle>
                                                <RecentMeta>{item.helper}</RecentMeta>
                                                <RecentMeta>{item.relativeDate}</RecentMeta>
                                            </div>
                                            <RecentButton type="button" onClick={() => handleRestoreComposition(item)}>
                                                Restaurar
                                            </RecentButton>
                                        </RecentHeader>
                                    </RecentItem>
                                ))}
                            </RecentList>
                        </StudioCard>

                        <StudioCard>
                            <StudioCardHeader>
                                <StudioCardEyebrow>Atalhos</StudioCardEyebrow>
                                <StudioCardTitle>Produtividade da tela</StudioCardTitle>
                                <StudioCardText>
                                    Os atalhos reduzem fricção operacional e ajudam a manter o fluxo rápido durante a criação de cartazes.
                                </StudioCardText>
                            </StudioCardHeader>

                            <ShortcutList>
                                {shortcuts.map(item => (
                                    <ShortcutItem key={item.label}>
                                        <ShortcutKey>{item.label}</ShortcutKey>
                                        <ShortcutText>{item.description}</ShortcutText>
                                    </ShortcutItem>
                                ))}
                            </ShortcutList>
                        </StudioCard>
                    </CreatePriceSidebar>
                </CreatePriceLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
