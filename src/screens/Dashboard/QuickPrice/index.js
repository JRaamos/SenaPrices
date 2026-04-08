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
    DraftNotice,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
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
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
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
    ShortcutItem,
    ShortcutKey,
    ShortcutList,
    ShortcutText,
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
        recentItems,
        shortcuts,
        errorSummary,
        guidelines,
        priceTypeOptions,
        paperSizeOptions,
        orientationOptions,
        applyPatch,
        updateRow,
        addRow,
        removeRow,
        setActiveRowId,
        handleRestoreBatch,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <QuickPriceLayout>
                    <QuickPriceMain>
                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Configuracao</QuickCardEyebrow>
                                <QuickCardTitle>Lote rapido de cartazes</QuickCardTitle>
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
                                    <QuickLabel>Titulo da oferta</QuickLabel>
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

                                <QuickField>
                                    <QuickLabel>Valido ate</QuickLabel>
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
                                    <QuickLabel>Orientacao</QuickLabel>
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
                                    <QuickLabel>Observacao do lote</QuickLabel>
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

                            <DraftNotice>
                                Esta versao trabalha com entrada manual segura e nao depende de catalogo externo. Use descricao curta para nome do produto ou EAN-13 completo quando estiver operando com codigo.
                            </DraftNotice>
                        </QuickCard>

                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Linhas</QuickCardEyebrow>
                                <QuickCardTitle>Montagem rapida do lote</QuickCardTitle>
                                <QuickCardText>
                                    Cada linha representa um cartaz. O lote so e liberado quando todas as linhas estao consistentes.
                                </QuickCardText>
                            </QuickCardHeader>

                            <RowList>
                                {draft.rows.map((row, index) => {
                                    const rowErrors = validation.rowErrors[row.id] || [];
                                    const isActive = activeRowId === row.id;
                                    const isValid = rowErrors.length === 0;

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
                                                        placeholder="Ex: Cafe Pilao 500g ou 7891234567890"
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
                                                        placeholder="Ex: Torracao media"
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
                                                            <QuickLabel>Preco promocional</QuickLabel>
                                                            <QuickInput
                                                                value={row.cashPrice}
                                                                inputMode="decimal"
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
                                                                <QuickLabel>Preco original</QuickLabel>
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
                                                                <QuickLabel>Preco promocional</QuickLabel>
                                                                <QuickInput
                                                                    value={row.toPrice}
                                                                    inputMode="decimal"
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
                                                                <QuickLabel>Preco da oferta</QuickLabel>
                                                                <QuickInput
                                                                    value={row.specialPrice}
                                                                    inputMode="decimal"
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
                                                    {rowErrors.length ? rowErrors.join(" ") : "Linha pronta para entrar no lote."}
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

                        {errorSummary.length ? (
                            <ErrorSummary>
                                <ErrorSummaryTitle>Pendencias do lote</ErrorSummaryTitle>
                                {errorSummary.map(item => (
                                    <ErrorSummaryItem key={item.key}>{item.message}</ErrorSummaryItem>
                                ))}
                            </ErrorSummary>
                        ) : null}

                        {validation.warningList.length ? (
                            <QuickCard>
                                <QuickCardHeader>
                                    <QuickCardEyebrow>Melhorias</QuickCardEyebrow>
                                    <QuickCardTitle>Ajustes recomendados</QuickCardTitle>
                                    <QuickCardText>
                                        Mesmo com lote valido, estes pontos ajudam a manter padrao superior de operacao.
                                    </QuickCardText>
                                </QuickCardHeader>

                                <WarningList>
                                    {validation.warningList.map(item => (
                                        <WarningItem key={item}>{item}</WarningItem>
                                    ))}
                                </WarningList>
                            </QuickCard>
                        ) : null}

                        <PreviewCard>
                            <QuickCardHeader>
                                <PreviewBadge>{activePreview?.offerTitle || "Linha ativa"}</PreviewBadge>
                                <PreviewTitle>{activePreview?.title || "Selecione uma linha"}</PreviewTitle>
                                {activePreview?.subtitle ? <PreviewSubtitle>{activePreview.subtitle}</PreviewSubtitle> : null}
                            </QuickCardHeader>

                            <PreviewPrice>{activePreview?.primaryPrice || "R$ --,--"}</PreviewPrice>

                            {activePreview?.supportingPrice ? (
                                <PreviewSupportPrice $strike={draft.priceType === "depor"}>
                                    {activePreview.supportingPrice}
                                </PreviewSupportPrice>
                            ) : null}

                            {activePreview?.specialLabel ? (
                                <PreviewSpecialLabel>{activePreview.specialLabel}</PreviewSpecialLabel>
                            ) : null}

                            <PreviewMetaList>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Formato</PreviewMetaLabel>
                                    <PreviewMetaValue>{activePreview?.paperLabel || "--"}</PreviewMetaValue>
                                </PreviewMetaItem>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Codigo</PreviewMetaLabel>
                                    <PreviewMetaValue>{activePreview?.barcodeLabel || "Nao exibido"}</PreviewMetaValue>
                                </PreviewMetaItem>
                                <PreviewMetaItem>
                                    <PreviewMetaLabel>Validade</PreviewMetaLabel>
                                    <PreviewMetaValue>{activePreview?.validityLabel || "Sem validade"}</PreviewMetaValue>
                                </PreviewMetaItem>
                                {activePreview?.observation ? (
                                    <PreviewMetaItem>
                                        <PreviewMetaLabel>Observacao</PreviewMetaLabel>
                                        <PreviewMetaValue>{activePreview.observation}</PreviewMetaValue>
                                    </PreviewMetaItem>
                                ) : null}
                            </PreviewMetaList>
                        </PreviewCard>

                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Boas praticas</QuickCardEyebrow>
                                <QuickCardTitle>Checklist de operacao</QuickCardTitle>
                                <QuickCardText>
                                    Diretrizes de mercado para manter velocidade sem perder controle no lote rapido.
                                </QuickCardText>
                            </QuickCardHeader>

                            <ChecklistList>
                                {guidelines.map(item => (
                                    <ChecklistItem key={item.title}>
                                        <ChecklistTitle>{item.title}</ChecklistTitle>
                                        <ChecklistText>{item.description}</ChecklistText>
                                    </ChecklistItem>
                                ))}
                            </ChecklistList>
                        </QuickCard>

                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Historico local</QuickCardEyebrow>
                                <QuickCardTitle>Lotes recentes</QuickCardTitle>
                                <QuickCardText>
                                    Restauracao rapida de lotes validos salvos com a infraestrutura atual de storage criptografado.
                                </QuickCardText>
                            </QuickCardHeader>

                            <RecentList>
                                {!recentItems.length ? (
                                    <RecentItem>
                                        <RecentTitle>Nenhum lote salvo ainda</RecentTitle>
                                        <RecentMeta>Use "Salvar lote" para criar um ponto de restauracao local.</RecentMeta>
                                    </RecentItem>
                                ) : recentItems.map(item => (
                                    <RecentItem key={item.id}>
                                        <RecentHeader>
                                            <div>
                                                <RecentTitle>{item.offerTitle || "Lote rapido"}</RecentTitle>
                                                <RecentMeta>{item.helper}</RecentMeta>
                                                <RecentMeta>{item.relativeDate}</RecentMeta>
                                            </div>
                                            <RecentButton type="button" onClick={() => handleRestoreBatch(item)}>
                                                Restaurar
                                            </RecentButton>
                                        </RecentHeader>
                                    </RecentItem>
                                ))}
                            </RecentList>
                        </QuickCard>

                        <QuickCard>
                            <QuickCardHeader>
                                <QuickCardEyebrow>Atalhos</QuickCardEyebrow>
                                <QuickCardTitle>Produtividade</QuickCardTitle>
                                <QuickCardText>
                                    Atalhos seguros para acelerar a digitacao sem abrir mao da validacao completa do lote.
                                </QuickCardText>
                            </QuickCardHeader>

                            <ShortcutList>
                                {shortcuts.map(item => (
                                    <ShortcutItem key={item.label}>
                                        <ShortcutKey>{item.label}</ShortcutKey>
                                        <ShortcutText>{item.description}</ShortcutText>
                                    </ShortcutItem>
                                ))}
                            </ShortcutList>
                        </QuickCard>
                    </QuickPriceSidebar>
                </QuickPriceLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
