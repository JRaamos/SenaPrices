import React from "react";

import DashboardIconGlyph from "components/Dashboard/IconGlyph";
import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import { getPermissionTone } from "./helpers";
import { buildPriceDisplayParts, buildPreviewInfoGroups, withAlpha } from "../CreatePrice/helpers";
import {
    ActionButton,
    ActionRow,
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
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineForm,
    LabelPreviewCard,
    LabelPreviewMeta,
    LabelPreviewPrice,
    LabelPreviewText,
    LabelPreviewTitle,
    MatrixCard,
    MatrixCell,
    MatrixGrid,
    MatrixLabel,
    MatrixRow,
    MatrixTitle,
    PermissionBadge,
    PreviewBadge,
    PreviewBadgeMeta,
    PreviewBadgeMetaList,
    PreviewBadgeRow,
    PreviewCard,
    PreviewCentsGroup,
    PreviewCurrencySymbol,
    PreviewFooterMetaList,
    PreviewGrid,
    PreviewHeaderMetaItem,
    PreviewHeaderMetaList,
    PreviewMetaItem,
    PreviewMetaLabel,
    PreviewMetaList,
    PreviewMetaValue,
    PreviewPrice,
    PreviewPriceBlock,
    PreviewPriceCents,
    PreviewPriceComma,
    PreviewPriceInteger,
    PreviewPriceLine,
    PreviewPriceStack,
    PreviewPriceTopRow,
    PreviewPriceUnit,
    PreviewSheetFrame,
    PreviewSheetSlot,
    PreviewSheetStage,
    PreviewSpecialLabel,
    PreviewSubtitle,
    PreviewSupportPrice,
    PreviewTitle,
    SectionActions,
    SectionBadge,
    SectionHeader,
    SectionList,
    SectionMain,
    SectionMeta,
    SectionRow,
    SectionTitle,
    SettingsLayout,
    SettingsMain,
    SettingsNavButton,
    SettingsNavIconWrap,
    SettingsNavLabel,
    SettingsNavList,
    SettingsNavTitle,
    SettingsSidebar,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    TabButton,
    TabHeader,
    TabIcon,
    TabsGrid,
    TabText,
    TabTitle,
    ToggleInput,
    ToggleList,
    ToggleMain,
    ToggleRow,
    ToggleText,
    ToggleTitle,
    UserList,
    UserMeta,
    UserName,
    UserRow,
} from "./styled";

const LABEL_TOGGLES = [
    ["showDescription2", "Exibir descrição secundária", "Leva a linha complementar do item para a etiqueta."],
    ["showDescription3", "Exibir descrição adicional", "Permite uma terceira linha quando a operação exigir mais contexto."],
    ["showSection", "Exibir seção", "Ajuda a operação a conferir a gôndola correta."],
    ["showUnit", "Exibir unidade", "Mantém a leitura da unidade vendida visível."],
    ["showBarcode", "Exibir código de barras", "Imprime o bloco gráfico quando o item tiver EAN-13 válido."],
    ["showEan", "Exibir EAN em texto", "Mostra o número em texto além do código gráfico."],
    ["showInternalCode", "Exibir código interno", "Ajuda a conciliar item interno e etiqueta emitida."],
    ["showPrice", "Exibir preço principal", "Permite templates técnicos quando a etiqueta não deve mostrar o valor."],
];

export default function DashboardSettings() {
    const controller = useController();

    return (
        <ContainerAuthenticated actions={controller.actions} loading={controller.loading}>
            <PageContent>
                <PageHeader header={controller.header} loading={controller.loading} />
                <FormSpacer />
                <SettingsLayout>
                    <SettingsSidebar>{renderSidebar(controller)}</SettingsSidebar>
                    <SettingsMain>{renderMain(controller)}</SettingsMain>
                </SettingsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}

function renderMain(controller) {
    if (!controller.canAccessSettings) {
        return (
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Acesso</CatalogCardEyebrow>
                    <CatalogCardTitle>Governança central restrita</CatalogCardTitle>
                    <CatalogCardText>
                        Apenas admin, subadmin e a conta master podem alterar os parâmetros centrais do SenaPrices.
                    </CatalogCardText>
                </CatalogCardHeader>
                <EmptyState>Os parâmetros seguem ativos no seu acesso, mas esta área está liberada apenas para perfis de governança.</EmptyState>
            </CatalogCard>
        );
    }

    if (controller.activeTab === "platform") return renderMasterPlatformCard(controller);
    if (controller.activeTab === "billing") return renderBillingCard(controller);
    if (controller.activeTab === "print") return renderPrintCard(controller);
    if (controller.activeTab === "users") return renderAccessCards(controller);
    if (controller.activeTab === "groups") return renderGroupsCard(controller);
    if (controller.activeTab === "offertypes") return renderOfferTypesCard(controller);
    if (controller.activeTab === "special") return renderSpecialOffersCard(controller);
    if (controller.activeTab === "sections") return renderSectionsCards(controller);
    if (controller.activeTab === "backgrounds") return renderBackgroundsCard(controller);
    if (controller.activeTab === "custompages") return renderCustomPagesCard(controller);
    if (controller.activeTab === "labels") return renderLabelsCard(controller);
    if (controller.activeTab === "support") return renderSupportCard(controller);

    return null;
}

function renderSidebar(controller) {
    return (
        <>
            <SettingsNavTitle>Definições</SettingsNavTitle>
            <SettingsNavList>
                {controller.tabItems.map(item => (
                    <SettingsNavButton key={item.key} $active={item.active} onClick={() => controller.setActiveTab(item.key)}>
                        <SettingsNavIconWrap>
                            <DashboardIconGlyph
                                name={item.iconToken}
                                size={18}
                                color={item.active ? "#3b82f6" : "#64748b"}
                            />
                        </SettingsNavIconWrap>
                        <SettingsNavLabel>{item.label}</SettingsNavLabel>
                    </SettingsNavButton>
                ))}
            </SettingsNavList>
        </>
    );
}

function renderPlatformCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Master</CatalogCardEyebrow>
                <CatalogCardTitle>Parametros globais da plataforma</CatalogCardTitle>
                <CatalogCardText>Esses dados abastecem a landing, os planos comerciais e o tema sazonal.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField $full>
                    <CatalogLabel>Email de contato</CatalogLabel>
                    <CatalogInput value={controller.masterConfig.contactEmail} onChange={event => controller.handleMasterPatch({ contactEmail: event.target.value })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Telefone</CatalogLabel>
                    <CatalogInput value={controller.masterConfig.contactPhone} onChange={event => controller.handleMasterPatch({ contactPhone: event.target.value })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>WhatsApp</CatalogLabel>
                    <CatalogInput value={controller.masterConfig.contactWhatsApp} onChange={event => controller.handleMasterPatch({ contactWhatsApp: event.target.value })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Tema sazonal</CatalogLabel>
                    <CatalogSelect value={controller.masterConfig.seasonalTheme} onChange={event => controller.handleMasterPatch({ seasonalTheme: event.target.value })}>
                        {controller.seasonalThemeOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Trial padrão (dias)</CatalogLabel>
                    <CatalogInput type="number" min="0" max="90" value={controller.masterConfig.planConfig.trialDays} onChange={event => controller.handleMasterPatch({ planConfig: { trialDays: Number(event.target.value) } })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Moeda</CatalogLabel>
                    <CatalogInput value={controller.masterConfig.planConfig.currency} onChange={event => controller.handleMasterPatch({ planConfig: { currency: event.target.value } })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Essencial mensal</CatalogLabel>
                    <CatalogInput type="number" min="0" step="0.01" value={controller.masterConfig.planConfig.essencialMonthlyPrice} onChange={event => controller.handleMasterPatch({ planConfig: { essencialMonthlyPrice: Number(event.target.value) } })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Profissional mensal</CatalogLabel>
                    <CatalogInput type="number" min="0" step="0.01" value={controller.masterConfig.planConfig.profissionalMonthlyPrice} onChange={event => controller.handleMasterPatch({ planConfig: { profissionalMonthlyPrice: Number(event.target.value) } })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Início do tema</CatalogLabel>
                    <CatalogInput type="date" value={controller.masterConfig.seasonalThemeStart} onChange={event => controller.handleMasterPatch({ seasonalThemeStart: event.target.value })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Fim do tema</CatalogLabel>
                    <CatalogInput type="date" value={controller.masterConfig.seasonalThemeEnd} onChange={event => controller.handleMasterPatch({ seasonalThemeEnd: event.target.value })} />
                </CatalogField>
            </CatalogGrid>
            <ToggleList>
                <ToggleRow>
                    <ToggleInput checked={controller.masterConfig.seasonalThemeActive} onChange={event => controller.handleMasterPatch({ seasonalThemeActive: event.target.checked })} />
                    <ToggleMain>
                        <ToggleTitle>Ativar tema sazonal</ToggleTitle>
                        <ToggleText>Aplica o tema escolhido somente dentro da janela configurada.</ToggleText>
                    </ToggleMain>
                </ToggleRow>
            </ToggleList>
            <ActionRow>
                <ActionButton $primary onClick={controller.handleSavePlatform}>Salvar plataforma</ActionButton>
            </ActionRow>
        </CatalogCard>
    );
}

function renderMasterPlatformCard(controller) {
    const directoryPreview = controller.usersState.items.slice(0, 8);

    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Conta master</CatalogCardEyebrow>
                    <CatalogCardTitle>Governança central da plataforma</CatalogCardTitle>
                    <CatalogCardText>
                        Organize tudo que é global do SenaPrices em um único fluxo: contatos públicos, contas, planos, suporte e ativos compartilhados.
                    </CatalogCardText>
                </CatalogCardHeader>

                <SummaryGrid>
                    {controller.summaryItems.map(item => (
                        <SummaryItem key={item.label}>
                            <SummaryLabel>{item.label}</SummaryLabel>
                            <SummaryValue>{item.value}</SummaryValue>
                        </SummaryItem>
                    ))}
                </SummaryGrid>

                <SummaryGrid>
                    {[...controller.roleSummaryItems, ...controller.billingSummaryItems].map(item => (
                        <SummaryItem key={item.label}>
                            <SummaryLabel>{item.label}</SummaryLabel>
                            <SummaryValue>{item.value}</SummaryValue>
                        </SummaryItem>
                    ))}
                </SummaryGrid>

            </CatalogCard>

            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Plataforma</CatalogCardEyebrow>
                    <CatalogCardTitle>Contato público, identidade comercial e calendário sazonal</CatalogCardTitle>
                    <CatalogCardText>
                        Os dados desta área abastecem a landing, o suporte comercial e a apresentação institucional do produto.
                    </CatalogCardText>
                </CatalogCardHeader>

                <CatalogGrid>
                    <CatalogField $full>
                        <CatalogLabel>E-mail de contato</CatalogLabel>
                        <CatalogInput value={controller.masterConfig.contactEmail} onChange={event => controller.handleMasterPatch({ contactEmail: event.target.value })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Telefone</CatalogLabel>
                        <CatalogInput value={controller.masterConfig.contactPhone} onChange={event => controller.handleMasterPatch({ contactPhone: event.target.value })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>WhatsApp</CatalogLabel>
                        <CatalogInput value={controller.masterConfig.contactWhatsApp} onChange={event => controller.handleMasterPatch({ contactWhatsApp: event.target.value })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Tema sazonal</CatalogLabel>
                        <CatalogSelect value={controller.masterConfig.seasonalTheme} onChange={event => controller.handleMasterPatch({ seasonalTheme: event.target.value })}>
                            {controller.seasonalThemeOptions.map(item => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </CatalogSelect>
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Início da vigência</CatalogLabel>
                        <CatalogInput type="date" value={controller.masterConfig.seasonalThemeStart} onChange={event => controller.handleMasterPatch({ seasonalThemeStart: event.target.value })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Fim da vigência</CatalogLabel>
                        <CatalogInput type="date" value={controller.masterConfig.seasonalThemeEnd} onChange={event => controller.handleMasterPatch({ seasonalThemeEnd: event.target.value })} />
                    </CatalogField>
                </CatalogGrid>

                <ToggleList>
                    <ToggleRow>
                        <ToggleInput checked={controller.masterConfig.seasonalThemeActive} onChange={event => controller.handleMasterPatch({ seasonalThemeActive: event.target.checked })} />
                        <ToggleMain>
                            <ToggleTitle>Ativar tema sazonal automaticamente</ToggleTitle>
                            <ToggleText>Troca a identidade visual pública dentro da janela configurada sem exigir nova publicação manual.</ToggleText>
                        </ToggleMain>
                    </ToggleRow>
                </ToggleList>
            </CatalogCard>

            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Governança</CatalogCardEyebrow>
                    <CatalogCardTitle>Diretório resumido de contas da plataforma</CatalogCardTitle>
                    <CatalogCardText>
                        A conta master concentra a leitura global de quem está na base, quais perfis estão ativos e quais frentes já exigem ação administrativa.
                    </CatalogCardText>
                </CatalogCardHeader>

                {!directoryPreview.length ? (
                    <EmptyState>Nenhuma conta disponível nesta leitura. Atualize a base para recarregar o diretório da plataforma.</EmptyState>
                ) : (
                    <UserList>
                        {directoryPreview.map(item => (
                            <UserRow key={item.id || item.email}>
                                <UserName>{item.name || "Conta sem nome"}</UserName>
                                <UserMeta>{item.email || "E-mail não informado"}</UserMeta>
                                <UserMeta>Código: {item.documentId || item.id || "--"}</UserMeta>
                                <UserMeta>Perfil: {getRoleLabel(item.role)}</UserMeta>
                                <UserMeta>Status: {item.active === false ? "Inativo" : "Ativo"}</UserMeta>
                                <UserMeta>{formatSubscriptionLabel(item.subscription)}</UserMeta>
                            </UserRow>
                        ))}
                    </UserList>
                )}

            </CatalogCard>
        </>
    );
}

function renderBillingCard(controller) {
    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Planos e cobrança</CatalogCardEyebrow>
                    <CatalogCardTitle>Configuração comercial compartilhada com a landing</CatalogCardTitle>
                    <CatalogCardText>
                        Ajuste preços, descontos anuais, trial, moeda e credenciais públicas do Stripe mantendo a jornada comercial alinhada com o produto.
                    </CatalogCardText>
                </CatalogCardHeader>

                <SummaryGrid>
                    {controller.billingSummaryItems.map(item => (
                        <SummaryItem key={item.label}>
                            <SummaryLabel>{item.label}</SummaryLabel>
                            <SummaryValue>{item.value}</SummaryValue>
                        </SummaryItem>
                    ))}
                </SummaryGrid>

                <SummaryGrid>
                    {controller.planSummaryItems.map(item => (
                        <SummaryItem key={item.label}>
                            <SummaryLabel>{item.label}</SummaryLabel>
                            <SummaryValue>{item.value}</SummaryValue>
                        </SummaryItem>
                    ))}
                </SummaryGrid>
            </CatalogCard>

            <CatalogCard>
                <CatalogGrid>
                    <CatalogField $full>
                        <CatalogLabel>Stripe publishable key</CatalogLabel>
                        <CatalogInput value={controller.masterConfig.stripePublishableKey} onChange={event => controller.handleMasterPatch({ stripePublishableKey: event.target.value })} />
                    </CatalogField>
                    <CatalogField $full>
                        <CatalogLabel>Referência da secret key</CatalogLabel>
                        <CatalogInput value={controller.masterConfig.stripeSecretKeyHint} onChange={event => controller.handleMasterPatch({ stripeSecretKeyHint: event.target.value })} />
                        <FieldMeta>Guarde apenas a referência operacional. A chave secreta real deve permanecer fora do frontend.</FieldMeta>
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Moeda</CatalogLabel>
                        <CatalogInput value={controller.masterConfig.planConfig.currency} onChange={event => controller.handleMasterPatch({ planConfig: { currency: event.target.value } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Trial padrão (dias)</CatalogLabel>
                        <CatalogInput type="number" min="0" max="90" value={controller.masterConfig.planConfig.trialDays} onChange={event => controller.handleMasterPatch({ planConfig: { trialDays: Number(event.target.value) } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Essencial mensal</CatalogLabel>
                        <CatalogInput type="number" min="0" step="0.01" value={controller.masterConfig.planConfig.essencialMonthlyPrice} onChange={event => controller.handleMasterPatch({ planConfig: { essencialMonthlyPrice: Number(event.target.value) } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Essencial anual</CatalogLabel>
                        <CatalogInput type="number" min="0" step="0.01" value={controller.masterConfig.planConfig.essencialYearlyPrice} onChange={event => controller.handleMasterPatch({ planConfig: { essencialYearlyPrice: Number(event.target.value) } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Desconto anual Essencial (%)</CatalogLabel>
                        <CatalogInput type="number" min="0" max="100" value={controller.masterConfig.planConfig.essencialAnnualDiscountPercent} onChange={event => controller.handleMasterPatch({ planConfig: { essencialAnnualDiscountPercent: Number(event.target.value) } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Profissional mensal</CatalogLabel>
                        <CatalogInput type="number" min="0" step="0.01" value={controller.masterConfig.planConfig.profissionalMonthlyPrice} onChange={event => controller.handleMasterPatch({ planConfig: { profissionalMonthlyPrice: Number(event.target.value) } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Profissional anual</CatalogLabel>
                        <CatalogInput type="number" min="0" step="0.01" value={controller.masterConfig.planConfig.profissionalYearlyPrice} onChange={event => controller.handleMasterPatch({ planConfig: { profissionalYearlyPrice: Number(event.target.value) } })} />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Desconto anual Profissional (%)</CatalogLabel>
                        <CatalogInput type="number" min="0" max="100" value={controller.masterConfig.planConfig.profissionalAnnualDiscountPercent} onChange={event => controller.handleMasterPatch({ planConfig: { profissionalAnnualDiscountPercent: Number(event.target.value) } })} />
                    </CatalogField>
                </CatalogGrid>
            </CatalogCard>
        </>
    );
}

function renderPrintCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Impressão</CatalogCardEyebrow>
                <CatalogCardTitle>Defaults dos novos cartazes</CatalogCardTitle>
                <CatalogCardText>Essas preferências abastecem Criar Preço, Criação Rápida, histórico, promoções e lote.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField $full>
                    <CatalogLabel>Título padrão da oferta</CatalogLabel>
                    <CatalogInput value={controller.appSettings.print.defaultOfferTitle} onChange={event => controller.handlePrintPatch({ defaultOfferTitle: event.target.value })} />
                    <FieldMeta><FieldError /><FieldCounter>{controller.appSettings.print.defaultOfferTitle.length}/30</FieldCounter></FieldMeta>
                </CatalogField>
                <CatalogField $full>
                    <CatalogLabel>Título padrão do modo rápido</CatalogLabel>
                    <CatalogInput value={controller.appSettings.print.defaultQuickOfferTitle} onChange={event => controller.handlePrintPatch({ defaultQuickOfferTitle: event.target.value })} />
                    <FieldMeta><FieldError /><FieldCounter>{controller.appSettings.print.defaultQuickOfferTitle.length}/30</FieldCounter></FieldMeta>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Papel padrão</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.defaultPaperSize} onChange={event => controller.handlePrintPatch({ defaultPaperSize: event.target.value })}>
                        <option value="A6">A6</option><option value="A5">A5</option><option value="A4">A4</option><option value="A3">A3</option>
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Orientação padrão</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.defaultOrientation} onChange={event => controller.handlePrintPatch({ defaultOrientation: event.target.value })}>
                        <option value="portrait">Retrato</option><option value="landscape">Paisagem</option>
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Saída do A5</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.a5SheetMode} onChange={event => controller.handlePrintPatch({ a5SheetMode: event.target.value })}>
                        {controller.a5SheetModeOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Saída do A6</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.a6SheetMode} onChange={event => controller.handlePrintPatch({ a6SheetMode: event.target.value })}>
                        {controller.a6SheetModeOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Fonte do título</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.titleFontFamily} onChange={event => controller.handlePrintPatch({ titleFontFamily: event.target.value })}>
                        {controller.printFontOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Fonte do preço</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.priceFontFamily} onChange={event => controller.handlePrintPatch({ priceFontFamily: event.target.value })}>
                        {controller.printFontOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Fonte de apoio</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.infoFontFamily} onChange={event => controller.handlePrintPatch({ infoFontFamily: event.target.value })}>
                        {controller.printFontOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Transformação do título</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.titleTransform} onChange={event => controller.handlePrintPatch({ titleTransform: event.target.value })}>
                        {controller.titleTransformOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Alinhamento da descrição</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.titleAlign} onChange={event => controller.handlePrintPatch({ titleAlign: event.target.value })}>
                        {controller.alignOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Alinhamento do preço</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.priceAlign} onChange={event => controller.handlePrintPatch({ priceAlign: event.target.value })}>
                        {controller.alignOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Escala da descrição (%)</CatalogLabel>
                    <CatalogInput type="number" min="80" max="140" value={controller.appSettings.print.descriptionScale} onChange={event => controller.handlePrintPatch({ descriptionScale: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Escala do preço (%)</CatalogLabel>
                    <CatalogInput type="number" min="80" max="180" value={controller.appSettings.print.priceScale} onChange={event => controller.handlePrintPatch({ priceScale: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Cor principal</CatalogLabel>
                    <CatalogInput type="color" value={controller.appSettings.print.accentColor} onChange={event => controller.handlePrintPatch({ accentColor: event.target.value })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Cor de destaque</CatalogLabel>
                    <CatalogInput type="color" value={controller.appSettings.print.highlightColor} onChange={event => controller.handlePrintPatch({ highlightColor: event.target.value })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Posição do símbolo R$</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.priceSymbolPosition} onChange={event => controller.handlePrintPatch({ priceSymbolPosition: event.target.value })}>
                        {controller.priceSymbolPositionOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste X do símbolo</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.priceSymbolOffsetX} onChange={event => controller.handlePrintPatch({ priceSymbolOffsetX: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste Y do símbolo</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.priceSymbolOffsetY} onChange={event => controller.handlePrintPatch({ priceSymbolOffsetY: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Alinhamento dos centavos</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.centsAlign} onChange={event => controller.handlePrintPatch({ centsAlign: event.target.value })}>
                        {controller.priceCentsAlignOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste X dos centavos</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.centsOffsetX} onChange={event => controller.handlePrintPatch({ centsOffsetX: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste Y dos centavos</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.centsOffsetY} onChange={event => controller.handlePrintPatch({ centsOffsetY: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste X da vírgula</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.commaOffsetX} onChange={event => controller.handlePrintPatch({ commaOffsetX: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste Y da vírgula</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.commaOffsetY} onChange={event => controller.handlePrintPatch({ commaOffsetY: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Posição da unidade</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.unitPosition} onChange={event => controller.handlePrintPatch({ unitPosition: event.target.value })}>
                        {controller.priceUnitPositionOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste X da unidade</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.unitOffsetX} onChange={event => controller.handlePrintPatch({ unitOffsetX: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Ajuste Y da unidade</CatalogLabel>
                    <CatalogInput type="number" min="-48" max="48" value={controller.appSettings.print.unitOffsetY} onChange={event => controller.handlePrintPatch({ unitOffsetY: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Posição do código</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.barcodePosition} onChange={event => controller.handlePrintPatch({ barcodePosition: event.target.value })}>
                        {controller.infoPositionOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Posição da validade</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.validityPosition} onChange={event => controller.handlePrintPatch({ validityPosition: event.target.value })}>
                        {controller.validityPositionOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Posição da observação</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.observationPosition} onChange={event => controller.handlePrintPatch({ observationPosition: event.target.value })}>
                        {controller.infoPositionOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Layout dos metadados</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.metaLayout} onChange={event => controller.handlePrintPatch({ metaLayout: event.target.value })}>
                        {controller.metaLayoutOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Padding interno</CatalogLabel>
                    <CatalogInput type="number" min="18" max="40" value={controller.appSettings.print.framePadding} onChange={event => controller.handlePrintPatch({ framePadding: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Raio do cartaz</CatalogLabel>
                    <CatalogInput type="number" min="12" max="32" value={controller.appSettings.print.frameRadius} onChange={event => controller.handlePrintPatch({ frameRadius: Number(event.target.value) })} />
                </CatalogField>
            </CatalogGrid>
            <ToggleList>
                <ToggleRow>
                    <ToggleInput checked={controller.appSettings.print.defaultShowBarcode} onChange={event => controller.handlePrintPatch({ defaultShowBarcode: event.target.checked })} />
                    <ToggleMain><ToggleTitle>Exibir código de barras</ToggleTitle><ToggleText>Ajuda a operação a validar o item correto.</ToggleText></ToggleMain>
                </ToggleRow>
                <ToggleRow>
                    <ToggleInput checked={controller.appSettings.print.defaultShowValidity} onChange={event => controller.handlePrintPatch({ defaultShowValidity: event.target.checked })} />
                    <ToggleMain><ToggleTitle>Exibir validade</ToggleTitle><ToggleText>Mantém campanhas temporárias mais seguras.</ToggleText></ToggleMain>
                </ToggleRow>
            </ToggleList>
            <ActionRow>
                <ActionButton onClick={controller.handleResetPrint}>Restaurar padrão</ActionButton>
                <ActionButton $primary onClick={controller.handleSavePrint}>Salvar defaults</ActionButton>
            </ActionRow>
            {renderPrintPreview(controller)}
        </CatalogCard>
    );
}

function renderPrintPreview(controller) {
    const preview = controller.printPreview;
    const previewPriceParts = buildPriceDisplayParts(preview.primaryPrice, preview.unitLabel, preview.mode);
    const previewInfoGroups = buildPreviewInfoGroups(preview);
    const compactMode = preview.sheetLayout.copies >= 4 ? "dense" : preview.sheetLayout.copies > 1 ? "compact" : "full";
    const compactFactor = compactMode === "dense" ? 0.5 : compactMode === "compact" ? 0.68 : 1;
    const visibleInfoGroups = resolveVisiblePreviewGroups(previewInfoGroups, compactMode);
    const previewStyle = resolvePrintPreviewStyle(preview.style, compactFactor);

    return (
        <PreviewGrid>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                <CatalogCardTitle>Leitura simultânea do cartaz</CatalogCardTitle>
                <CatalogCardText>O ajuste aplicado acima já aparece aqui com símbolo, vírgula, centavos, unidade e informações posicionadas dinamicamente.</CatalogCardText>
            </CatalogCardHeader>

            <PreviewSheetStage>
                <PreviewSheetFrame
                    $aspectRatio={preview.sheetAspectRatio}
                    $columns={preview.sheetLayout.columns}
                    $rows={preview.sheetLayout.rows}
                    $orientation={preview.sheetLayout.sheetOrientation}
                >
                    {Array.from({ length: preview.sheetLayout.copies }).map((_, index) => (
                        <PreviewSheetSlot key={`${preview.sheetLayout.mode}-${index}`}>
                            {renderPrintPreviewPoster({
                                preview,
                                previewPriceParts,
                                previewInfoGroups: visibleInfoGroups,
                                previewStyle,
                                compactMode,
                            })}
                        </PreviewSheetSlot>
                    ))}
                </PreviewSheetFrame>
            </PreviewSheetStage>
        </PreviewGrid>
    );
}

function renderPrintPreviewPoster({ preview, previewPriceParts, previewInfoGroups, previewStyle, compactMode }) {
    const isCompact = compactMode !== "full";

    return (
        <PreviewCard
            $accentColor={previewStyle?.accentColor}
            $padding={previewStyle?.framePadding}
            $radius={previewStyle?.frameRadius}
            style={{ height: "100%", minHeight: 0, alignContent: "space-between" }}
        >
            <PreviewBadgeRow>
                <PreviewBadge>{preview.offerTitle}</PreviewBadge>
                {!previewInfoGroups.badgeItems.length ? null : (
                    <PreviewBadgeMetaList>
                        {previewInfoGroups.badgeItems.map(item => (
                            <PreviewBadgeMeta key={`${item.label}-${item.value}`}>{item.value}</PreviewBadgeMeta>
                        ))}
                    </PreviewBadgeMetaList>
                )}
            </PreviewBadgeRow>

            <PreviewTitle
                $fontFamily={previewStyle?.titleFontFamily}
                $fontSize={previewStyle?.titleSizePx}
                $align={previewStyle?.titleAlign}
                $transform={previewStyle?.titleTransform}
            >
                {preview.title}
            </PreviewTitle>

            {preview.subtitle ? (
                <PreviewSubtitle
                    $fontFamily={previewStyle?.infoFontFamily}
                    $fontSize={previewStyle?.subtitleSizePx}
                    $align={previewStyle?.titleAlign}
                >
                    {preview.subtitle}
                </PreviewSubtitle>
            ) : null}

            {!previewInfoGroups.headerItems.length ? null : (
                <PreviewHeaderMetaList>
                    {previewInfoGroups.headerItems.map(item => (
                        <PreviewHeaderMetaItem key={`${item.label}-${item.value}`}>
                            <PreviewMetaLabel>{item.label}</PreviewMetaLabel>
                            <PreviewMetaValue>{item.value}</PreviewMetaValue>
                        </PreviewHeaderMetaItem>
                    ))}
                </PreviewHeaderMetaList>
            )}

            {!previewPriceParts.structured ? (
                <PreviewPrice
                    $fontFamily={previewStyle?.priceFontFamily}
                    $fontSize={previewStyle?.priceSizePx}
                    $align={previewStyle?.priceAlign}
                    $accentColor={previewStyle?.accentColor}
                >
                    {preview.primaryPrice}
                </PreviewPrice>
            ) : (
                <PreviewPriceBlock $align={previewStyle?.priceAlign}>
                    <PreviewPriceStack>
                        {previewStyle?.priceSymbolPosition === "top" ? (
                            <PreviewPriceTopRow>
                                <PreviewCurrencySymbol
                                    $accentColor={previewStyle?.accentColor}
                                    $fontFamily={previewStyle?.priceFontFamily}
                                    $fontSize={Math.round((previewStyle?.priceSizePx || 60) * 0.26)}
                                    $offsetX={previewStyle?.priceSymbolOffsetX}
                                    $offsetY={previewStyle?.priceSymbolOffsetY}
                                >
                                    {previewPriceParts.symbol}
                                </PreviewCurrencySymbol>
                            </PreviewPriceTopRow>
                        ) : null}

                        <PreviewPriceLine>
                            {previewStyle?.priceSymbolPosition === "left" ? (
                                <PreviewCurrencySymbol
                                    $accentColor={previewStyle?.accentColor}
                                    $fontFamily={previewStyle?.priceFontFamily}
                                    $fontSize={Math.round((previewStyle?.priceSizePx || 60) * 0.26)}
                                    $offsetX={previewStyle?.priceSymbolOffsetX}
                                    $offsetY={previewStyle?.priceSymbolOffsetY}
                                >
                                    {previewPriceParts.symbol}
                                </PreviewCurrencySymbol>
                            ) : null}

                            <PreviewPriceInteger
                                $accentColor={previewStyle?.accentColor}
                                $fontFamily={previewStyle?.priceFontFamily}
                                $fontSize={previewStyle?.priceSizePx}
                            >
                                {previewPriceParts.integer}
                            </PreviewPriceInteger>

                            <PreviewCentsGroup
                                $align={previewStyle?.centsAlign}
                                $offsetX={previewStyle?.centsOffsetX}
                                $offsetY={previewStyle?.centsOffsetY}
                            >
                                <PreviewPriceComma
                                    $accentColor={previewStyle?.accentColor}
                                    $fontFamily={previewStyle?.priceFontFamily}
                                    $fontSize={Math.round((previewStyle?.priceSizePx || 60) * 0.3)}
                                    $offsetX={previewStyle?.commaOffsetX}
                                    $offsetY={previewStyle?.commaOffsetY}
                                >
                                    {previewPriceParts.comma}
                                </PreviewPriceComma>
                                <PreviewPriceCents
                                    $accentColor={previewStyle?.accentColor}
                                    $fontFamily={previewStyle?.priceFontFamily}
                                    $fontSize={Math.round((previewStyle?.priceSizePx || 60) * 0.34)}
                                >
                                    {previewPriceParts.cents}
                                </PreviewPriceCents>
                            </PreviewCentsGroup>

                            {previewStyle?.unitPosition === "inline" && previewPriceParts.unitLabel ? (
                                <PreviewPriceUnit
                                    $fontFamily={previewStyle?.infoFontFamily}
                                    $fontSize={Math.round((previewStyle?.supportSizePx || 20) * 0.92)}
                                    $offsetX={previewStyle?.unitOffsetX}
                                    $offsetY={previewStyle?.unitOffsetY}
                                >
                                    {previewPriceParts.unitLabel}
                                </PreviewPriceUnit>
                            ) : null}
                        </PreviewPriceLine>

                        {previewStyle?.unitPosition === "below" && previewPriceParts.unitLabel ? (
                            <PreviewPriceTopRow>
                                <PreviewPriceUnit
                                    $fontFamily={previewStyle?.infoFontFamily}
                                    $fontSize={Math.round((previewStyle?.supportSizePx || 20) * 0.92)}
                                    $offsetX={previewStyle?.unitOffsetX}
                                    $offsetY={previewStyle?.unitOffsetY}
                                >
                                    {previewPriceParts.unitLabel}
                                </PreviewPriceUnit>
                            </PreviewPriceTopRow>
                        ) : null}
                    </PreviewPriceStack>
                </PreviewPriceBlock>
            )}

            {preview.supportingPrice ? (
                <PreviewSupportPrice
                    $strike={preview.mode === "compare"}
                    $fontFamily={previewStyle?.infoFontFamily}
                    $fontSize={previewStyle?.supportSizePx}
                    $align={previewStyle?.priceAlign}
                >
                    {preview.supportingPrice}
                </PreviewSupportPrice>
            ) : null}

            {preview.specialLabel ? (
                <PreviewSpecialLabel
                    $fontFamily={previewStyle?.infoFontFamily}
                    $color={previewStyle?.highlightColor}
                    $backgroundColor={withAlpha(previewStyle?.highlightColor, 0.14)}
                >
                    {preview.specialLabel}
                </PreviewSpecialLabel>
            ) : null}

            {!previewInfoGroups.metaItems.length ? null : (
                <PreviewMetaList $layout={previewStyle?.metaLayout}>
                    {previewInfoGroups.metaItems.map(item => (
                        <PreviewMetaItem key={`${item.label}-${item.value}`}>
                            <PreviewMetaLabel>{item.label}</PreviewMetaLabel>
                            <PreviewMetaValue>{item.value}</PreviewMetaValue>
                        </PreviewMetaItem>
                    ))}
                </PreviewMetaList>
            )}

            {!previewInfoGroups.footerItems.length || compactMode === "dense" ? null : (
                <PreviewFooterMetaList>
                    {previewInfoGroups.footerItems.map(item => (
                        <PreviewMetaItem key={`${item.label}-${item.value}`}>
                            <PreviewMetaLabel>{item.label}</PreviewMetaLabel>
                            <PreviewMetaValue>{item.value}</PreviewMetaValue>
                        </PreviewMetaItem>
                    ))}
                </PreviewFooterMetaList>
            )}

            {isCompact ? (
                <PreviewMetaValue style={{ opacity: 0.7 }}>
                    {preview.paperLabel}
                </PreviewMetaValue>
            ) : null}
        </PreviewCard>
    );
}

function resolveVisiblePreviewGroups(groups, compactMode) {
    if (compactMode === "dense") {
        return {
            badgeItems: groups.badgeItems.slice(0, 1),
            headerItems: groups.headerItems.slice(0, 1),
            metaItems: groups.metaItems.slice(0, 2),
            footerItems: groups.footerItems.slice(0, 1),
        };
    }

    if (compactMode === "compact") {
        return {
            badgeItems: groups.badgeItems.slice(0, 2),
            headerItems: groups.headerItems.slice(0, 2),
            metaItems: groups.metaItems.slice(0, 3),
            footerItems: groups.footerItems.slice(0, 2),
        };
    }

    return groups;
}

function resolvePrintPreviewStyle(style, compactFactor) {
    const safeStyle = style || {};

    return {
        ...safeStyle,
        titleSizePx: Math.max(16, Math.round((safeStyle.titleSizePx || 34) * compactFactor)),
        subtitleSizePx: Math.max(10, Math.round((safeStyle.subtitleSizePx || 14) * Math.min(1, compactFactor + 0.08))),
        priceSizePx: Math.max(28, Math.round((safeStyle.priceSizePx || 60) * compactFactor)),
        supportSizePx: Math.max(11, Math.round((safeStyle.supportSizePx || 18) * Math.min(1, compactFactor + 0.12))),
        framePadding: Math.max(12, Math.round((safeStyle.framePadding || 28) * Math.min(1, compactFactor + 0.08))),
        frameRadius: Math.max(14, Math.round((safeStyle.frameRadius || 24) * Math.min(1, compactFactor + 0.16))),
    };
}

function renderSectionsCards(controller) {
    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                <CatalogCardEyebrow>Seções</CatalogCardEyebrow>
                <CatalogCardTitle>Base central de classificação</CatalogCardTitle>
                <CatalogCardText>Renomear ou criar seções aqui reflete o catálogo inteiro.</CatalogCardText>
                </CatalogCardHeader>
                <InlineForm>
                    <CatalogInput value={controller.newSectionName} placeholder="Ex: Mercearia" onChange={event => controller.setNewSectionName(event.target.value)} />
                    <ActionButton $primary onClick={controller.handleAddSection}>Adicionar seção</ActionButton>
                </InlineForm>
            </CatalogCard>
            <CatalogCard>
                {!controller.sections.length ? (
                    <EmptyState>Nenhuma seção cadastrada até o momento.</EmptyState>
                ) : (
                    <SectionList>
                        {controller.sections.map(section => (
                            <SectionRow key={section.id}>
                                {controller.editingSectionId === section.id ? (
                                    <>
                                        <InlineForm>
                                            <CatalogInput value={controller.editingSectionName} onChange={event => controller.setEditingSectionName(event.target.value)} />
                                            <ActionButton $primary onClick={() => controller.handleSaveSection(section.id)}>Salvar</ActionButton>
                                        </InlineForm>
                                        <SectionActions><ActionButton onClick={controller.cancelEditingSection}>Cancelar</ActionButton></SectionActions>
                                    </>
                                ) : (
                                    <>
                                        <SectionHeader>
                                            <SectionMain>
                                                <SectionTitle>{section.name}</SectionTitle>
                                                <SectionMeta>{section.usageCount} item(ns) vinculado(s)</SectionMeta>
                                            </SectionMain>
                                            <SectionBadge $tone={section.usageCount > 0 ? "orange" : "blue"}>{section.usageCount > 0 ? "Em uso" : "Disponível"}</SectionBadge>
                                        </SectionHeader>
                                        <SectionActions>
                                            <ActionButton onClick={() => controller.startEditingSection(section)}>Renomear</ActionButton>
                                            <ActionButton onClick={() => controller.handleDeleteSection(section)}>Excluir</ActionButton>
                                        </SectionActions>
                                    </>
                                )}
                            </SectionRow>
                        ))}
                    </SectionList>
                )}
            </CatalogCard>
        </>
    );
}

function renderLabelsCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Etiquetas</CatalogCardEyebrow>
                <CatalogCardTitle>Preset operacional da emissão</CatalogCardTitle>
                <CatalogCardText>O módulo de etiquetas lê estas preferências automaticamente.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField>
                    <CatalogLabel>Preset</CatalogLabel>
                    <CatalogSelect value={controller.labelSettings.preset} onChange={event => controller.handleLabelPresetChange(event.target.value)}>
                        {controller.labelPresetOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>DPI</CatalogLabel>
                    <CatalogSelect value={controller.labelSettings.dpi} onChange={event => controller.handleLabelPatch({ dpi: Number(event.target.value) })}>
                        {controller.labelDpiOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Largura (mm)</CatalogLabel>
                    <CatalogInput type="number" min="20" max="120" value={controller.labelSettings.widthMm} disabled={controller.labelSettings.preset !== "custom"} onChange={event => controller.handleLabelPatch({ widthMm: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Altura (mm)</CatalogLabel>
                    <CatalogInput type="number" min="20" max="120" value={controller.labelSettings.heightMm} disabled={controller.labelSettings.preset !== "custom"} onChange={event => controller.handleLabelPatch({ heightMm: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Cópias padrão</CatalogLabel>
                    <CatalogInput type="number" min="1" max="99" value={controller.labelSettings.defaultCopies} onChange={event => controller.handleLabelPatch({ defaultCopies: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Fonte principal</CatalogLabel>
                    <CatalogSelect value={controller.labelSettings.fontFamily} onChange={event => controller.handleLabelPatch({ fontFamily: event.target.value })}>
                        {controller.printFontOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Alinhamento do conteúdo</CatalogLabel>
                    <CatalogSelect value={controller.labelSettings.textAlign} onChange={event => controller.handleLabelPatch({ textAlign: event.target.value })}>
                        {controller.alignOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Escala do título (%)</CatalogLabel>
                    <CatalogInput type="number" min="80" max="140" value={controller.labelSettings.titleScale} onChange={event => controller.handleLabelPatch({ titleScale: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Escala do preço (%)</CatalogLabel>
                    <CatalogInput type="number" min="80" max="180" value={controller.labelSettings.priceScale} onChange={event => controller.handleLabelPatch({ priceScale: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Escala dos metadados (%)</CatalogLabel>
                    <CatalogInput type="number" min="80" max="140" value={controller.labelSettings.metaScale} onChange={event => controller.handleLabelPatch({ metaScale: Number(event.target.value) })} />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Cor de destaque</CatalogLabel>
                    <CatalogInput type="color" value={controller.labelSettings.accentColor} onChange={event => controller.handleLabelPatch({ accentColor: event.target.value })} />
                </CatalogField>
            </CatalogGrid>
            <ToggleList>
                {LABEL_TOGGLES.map(([key, title, description]) => (
                    <ToggleRow key={key}>
                        <ToggleInput checked={controller.labelSettings[key]} onChange={event => controller.handleLabelPatch({ [key]: event.target.checked })} />
                        <ToggleMain><ToggleTitle>{title}</ToggleTitle><ToggleText>{description}</ToggleText></ToggleMain>
                    </ToggleRow>
                ))}
            </ToggleList>
            <ActionRow>
                <ActionButton $primary onClick={controller.handleSaveLabels}>Salvar etiquetas</ActionButton>
            </ActionRow>
            {renderLabelPreview(controller)}
        </CatalogCard>
    );
}

function renderLabelPreview(controller) {
    const item = controller.labelPreviewItem;
    const style = controller.labelPreviewStyle;
    const subtitleParts = [
        controller.labelSettings.showDescription2 ? item.description2 : "",
        controller.labelSettings.showDescription3 ? item.description3 : "",
        controller.labelSettings.showSection ? item.section : "",
        controller.labelSettings.showUnit ? item.unit : "",
    ].filter(Boolean);
    const metaParts = [
        controller.labelSettings.showInternalCode ? item.internalCode : "",
        controller.labelSettings.showEan ? item.ean13 : "",
    ].filter(Boolean);

    return (
        <PreviewGrid>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                <CatalogCardTitle>Etiqueta dinâmica e simultânea</CatalogCardTitle>
                <CatalogCardText>As mudanças de preset, fonte, escalas, cor e campos exibidos já aparecem nesta amostra operacional.</CatalogCardText>
            </CatalogCardHeader>

            <LabelPreviewCard
                $heightMm={controller.labelSettings.heightMm}
                $textAlign={style.textAlign}
            >
                    <LabelPreviewTitle
                        $fontFamily={style.fontFamily}
                        $fontSize={style.titleSizePx}
                    >
                        {item.description1}
                    </LabelPreviewTitle>

                    {subtitleParts.length ? (
                        <LabelPreviewText
                            $fontFamily={style.fontFamily}
                            $fontSize={style.subtitleSizePx}
                        >
                            {subtitleParts.join(" · ")}
                        </LabelPreviewText>
                    ) : null}

                    {controller.labelSettings.showPrice ? (
                        <LabelPreviewPrice
                            $fontFamily={style.fontFamily}
                            $fontSize={style.priceSizePx}
                            $accentColor={style.accentColor}
                        >
                            {item.priceLabel}
                        </LabelPreviewPrice>
                    ) : null}

                    {metaParts.length ? (
                        <LabelPreviewMeta
                            $fontFamily={style.fontFamily}
                            $fontSize={style.metaSizePx}
                        >
                            {metaParts.join(" · ")}
                        </LabelPreviewMeta>
                    ) : null}

                    {controller.labelSettings.showBarcode ? (
                        <LabelPreviewMeta
                            $fontFamily={style.fontFamily}
                            $fontSize={Math.max(9, style.metaSizePx)}
                        >
                            ||| {item.ean13} |||
                        </LabelPreviewMeta>
                    ) : null}
            </LabelPreviewCard>
        </PreviewGrid>
    );
}

function renderGroupsCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Grupos</CatalogCardEyebrow>
                <CatalogCardTitle>Distribuição operacional de promoções</CatalogCardTitle>
                <CatalogCardText>Use grupos para organizar setores, turnos ou lojas e acelerar a distribuição programada.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField>
                    <CatalogLabel>Nome do grupo</CatalogLabel>
                    <CatalogInput
                        value={controller.groupForm.name}
                        placeholder="Ex: Mercearia, Açougue, Loja Centro"
                        onChange={event => controller.applyGroupFormPatch({ name: event.target.value })}
                    />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Descrição</CatalogLabel>
                    <CatalogInput
                        value={controller.groupForm.description}
                        placeholder="Ex: Equipe responsável pelas promoções semanais"
                        onChange={event => controller.applyGroupFormPatch({ description: event.target.value })}
                    />
                </CatalogField>
            </CatalogGrid>
            <ActionRow>
                <ActionButton $primary onClick={controller.handleCreateGroup}>Salvar grupo</ActionButton>
            </ActionRow>
            {!controller.groups.length ? (
                <EmptyState>Nenhum grupo criado ainda. Os grupos cadastrados aqui ficam prontos para apoiar o envio operacional nas promoções.</EmptyState>
            ) : (
                <SectionList>
                    {controller.groups.map(group => (
                        <SectionRow key={group.id}>
                            <SectionHeader>
                                <SectionMain>
                                    <SectionTitle>{group.name}</SectionTitle>
                                    <SectionMeta>{group.description || "Sem descrição adicional."}</SectionMeta>
                                </SectionMain>
                                <SectionBadge $tone="blue">{`${group.members?.length || 0} usuário(s)`}</SectionBadge>
                            </SectionHeader>
                            <SectionActions>
                                <ActionButton onClick={() => controller.handleDeleteGroup(group)}>Excluir</ActionButton>
                            </SectionActions>
                        </SectionRow>
                    ))}
                </SectionList>
            )}
        </CatalogCard>
    );
}

function renderOfferTypesCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Tipos de oferta</CatalogCardEyebrow>
                <CatalogCardTitle>Rótulos comerciais reaproveitáveis</CatalogCardTitle>
                <CatalogCardText>Padronize chamadas sazonais e variações promocionais sem reescrever a comunicação em cada cartaz.</CatalogCardText>
            </CatalogCardHeader>
            <InlineForm>
                <CatalogInput
                    value={controller.offerTypeName}
                    placeholder="Novo tipo de oferta (ex: Liquidação de Verão)"
                    onChange={event => controller.setOfferTypeName(event.target.value)}
                />
                <ActionButton $primary onClick={controller.handleCreateOfferType}>Adicionar</ActionButton>
            </InlineForm>
            {!controller.offerTypes.length ? (
                <EmptyState>Nenhum tipo de oferta disponível nesta base.</EmptyState>
            ) : (
                <SectionList>
                    {controller.offerTypes.map(item => (
                    <SectionRow key={item.id}>
                        <SectionHeader>
                            <SectionMain>
                                <SectionTitle>{item.name}</SectionTitle>
                                <SectionMeta>{item.locked ? "Tipo padrão do sistema." : "Tipo customizado salvo nesta operação."}</SectionMeta>
                            </SectionMain>
                            <SectionBadge $tone={item.active ? "blue" : "orange"}>
                                {item.active ? "Ativo" : "Pausado"}
                            </SectionBadge>
                        </SectionHeader>
                        <SectionActions>
                            <ActionButton onClick={() => controller.handleToggleOfferType(item)}>
                                {item.active ? "Desativar" : "Ativar"}
                            </ActionButton>
                            {!item.locked ? (
                                <ActionButton onClick={() => controller.handleDeleteOfferType(item)}>Excluir</ActionButton>
                            ) : null}
                        </SectionActions>
                    </SectionRow>
                    ))}
                </SectionList>
            )}
        </CatalogCard>
    );
}

function renderSpecialOffersCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Ofertas especiais</CatalogCardEyebrow>
                <CatalogCardTitle>Templates promocionais avançados</CatalogCardTitle>
                <CatalogCardText>Ative as ofertas especiais que fazem sentido para a campanha atual e mantenha o catálogo de modelos sob controle.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField>
                    <CatalogLabel>Nome da oferta</CatalogLabel>
                    <CatalogInput
                        value={controller.specialOfferForm.name}
                        placeholder="Ex: Queima de estoque"
                        onChange={event => controller.applySpecialOfferFormPatch({ name: event.target.value })}
                    />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Template dinâmico</CatalogLabel>
                    <CatalogInput
                        value={controller.specialOfferForm.template}
                        placeholder="Ex: Leve {qtd_leve}, pague {qtd_pague}"
                        onChange={event => controller.applySpecialOfferFormPatch({ template: event.target.value })}
                    />
                    <FieldMeta>Use variáveis entre chaves para preencher o conteúdo automaticamente no cartaz.</FieldMeta>
                </CatalogField>
            </CatalogGrid>
            <ActionRow>
                <ActionButton $primary onClick={controller.handleCreateSpecialOffer}>Salvar oferta especial</ActionButton>
            </ActionRow>
            {!controller.specialOffers.length ? (
                <EmptyState>Nenhuma oferta especial cadastrada ainda.</EmptyState>
            ) : (
                <SectionList>
                    {controller.specialOffers.map(item => (
                    <SectionRow key={item.id}>
                        <SectionHeader>
                            <SectionMain>
                                <SectionTitle>{item.name}</SectionTitle>
                                <SectionMeta>{item.template}</SectionMeta>
                            </SectionMain>
                            <SectionBadge $tone={item.active ? "orange" : "blue"}>{item.active ? "Ativa" : "Pausada"}</SectionBadge>
                        </SectionHeader>
                        <FieldMeta>{renderTemplateVariables(item.template)}</FieldMeta>
                        <SectionActions>
                            <ActionButton onClick={() => controller.handleToggleSpecialOffer(item)}>
                                {item.active ? "Desativar" : "Ativar"}
                            </ActionButton>
                            {!item.locked ? (
                                <ActionButton onClick={() => controller.handleDeleteSpecialOffer(item)}>Excluir</ActionButton>
                            ) : null}
                        </SectionActions>
                    </SectionRow>
                    ))}
                </SectionList>
            )}
        </CatalogCard>
    );
}

function renderBackgroundsCard(controller) {
    const assetItems = [
        {
            key: "portraitBackground",
            title: "Fundo retrato",
            description: "Aplicado nos cartazes verticais e na prévia de impressão correspondente.",
        },
        {
            key: "landscapeBackground",
            title: "Fundo paisagem",
            description: "Aplicado nos cartazes horizontais e materiais de frente de gôndola.",
        },
        {
            key: "portraitClubLogo",
            title: "Logo do clube · retrato",
            description: "Usado nos cartazes do tipo clube em orientação vertical.",
        },
        {
            key: "landscapeClubLogo",
            title: "Logo do clube · paisagem",
            description: "Usado nos cartazes do tipo clube em orientação horizontal.",
        },
    ];

    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Imagens de fundo</CatalogCardEyebrow>
                <CatalogCardTitle>Assets visuais do cartaz e do clube</CatalogCardTitle>
                <CatalogCardText>Centralize URLs públicas e uploads do dispositivo para manter a identidade visual da operação consistente.</CatalogCardText>
            </CatalogCardHeader>
            <SectionList>
                {assetItems.map(item => {
                    const value = controller.backgroundAssets[item.key] || "";
                    const isDataAsset = value.startsWith("data:");

                    return (
                        <SectionRow key={item.key}>
                            <SectionHeader>
                                <SectionMain>
                                    <SectionTitle>{item.title}</SectionTitle>
                                    <SectionMeta>{item.description}</SectionMeta>
                                </SectionMain>
                                <SectionBadge $tone={value ? "blue" : "orange"}>{value ? "Configurado" : "Vazio"}</SectionBadge>
                            </SectionHeader>
                            <CatalogField $full>
                                <CatalogLabel>Link público</CatalogLabel>
                                <CatalogInput
                                    value={isDataAsset ? "" : value}
                                    placeholder="https://exemplo.com/imagem.png"
                                    onChange={event => controller.handleBackgroundPatch({ [item.key]: event.target.value })}
                                />
                                <FieldMeta>{isDataAsset ? "Arquivo local carregado neste dispositivo." : "PNG, JPG, WEBP ou SVG com acesso público."}</FieldMeta>
                            </CatalogField>
                            <CatalogField $full>
                                <CatalogLabel>Arquivo do dispositivo</CatalogLabel>
                                <CatalogInput
                                    as="input"
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                    onChange={event => controller.handleBackgroundFileSelect(item.key, event.target.files?.[0])}
                                />
                            </CatalogField>
                            <SectionActions>
                                <ActionButton onClick={() => controller.handleBackgroundPatch({ [item.key]: "" })}>Limpar asset</ActionButton>
                            </SectionActions>
                            {value ? (
                                <div style={{ display: "grid", gap: 8 }}>
                                    <FieldMeta>Prévia carregada</FieldMeta>
                                    <div
                                        style={{
                                            width: 168,
                                            height: 104,
                                            borderRadius: 16,
                                            overflow: "hidden",
                                            border: "1px solid rgba(203,213,225,0.9)",
                                            background: "rgba(248,250,252,0.92)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            src={value}
                                            alt={item.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </SectionRow>
                    );
                })}
            </SectionList>
            <ActionRow>
                <ActionButton $primary onClick={controller.handleSaveBackgroundAssets}>Salvar assets</ActionButton>
            </ActionRow>
        </CatalogCard>
    );
}

function renderCustomPagesCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Páginas</CatalogCardEyebrow>
                <CatalogCardTitle>Páginas personalizadas para impressão</CatalogCardTitle>
                <CatalogCardText>Defina tamanhos de cartaz além dos padrões A6, A5, A4 e A3 quando a operação precisar de um formato próprio.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField>
                    <CatalogLabel>Nome</CatalogLabel>
                    <CatalogInput
                        value={controller.customPageForm.name}
                        placeholder="Ex: Açougue balcão"
                        onChange={event => controller.applyCustomPageFormPatch({ name: event.target.value })}
                    />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Tipo de preço</CatalogLabel>
                    <CatalogSelect
                        value={controller.customPageForm.priceType}
                        onChange={event => controller.applyCustomPageFormPatch({ priceType: event.target.value })}
                    >
                        {controller.customPagePriceTypeOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Largura (cm)</CatalogLabel>
                    <CatalogInput
                        type="number"
                        min="1"
                        step="0.1"
                        value={controller.customPageForm.widthCm}
                        onChange={event => controller.applyCustomPageFormPatch({ widthCm: event.target.value })}
                    />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Altura (cm)</CatalogLabel>
                    <CatalogInput
                        type="number"
                        min="1"
                        step="0.1"
                        value={controller.customPageForm.heightCm}
                        onChange={event => controller.applyCustomPageFormPatch({ heightCm: event.target.value })}
                    />
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Orientação sugerida</CatalogLabel>
                    <CatalogSelect
                        value={controller.customPageForm.orientation}
                        onChange={event => controller.applyCustomPageFormPatch({ orientation: event.target.value })}
                    >
                        {controller.customPageOrientationOptions.map(item => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))}
                    </CatalogSelect>
                </CatalogField>
                <CatalogField $full>
                    <CatalogLabel>Descrição operacional</CatalogLabel>
                    <CatalogInput
                        value={controller.customPageForm.description}
                        placeholder="Ex: Formato menor para ponta de gôndola refrigerada"
                        onChange={event => controller.applyCustomPageFormPatch({ description: event.target.value })}
                    />
                </CatalogField>
            </CatalogGrid>
            <ActionRow>
                <ActionButton $primary onClick={controller.handleCreateCustomPage}>Salvar página</ActionButton>
            </ActionRow>
            {!controller.customPages.length ? (
                <EmptyState>Nenhuma página personalizada cadastrada ainda. A base já está pronta para crescer sem impactar os tamanhos padrão ativos.</EmptyState>
            ) : (
                <SectionList>
                    {controller.customPages.map(item => (
                        <SectionRow key={item.id}>
                            <SectionHeader>
                                <SectionMain>
                                    <SectionTitle>{item.name}</SectionTitle>
                                    <SectionMeta>
                                        {`${item.widthCm} × ${item.heightCm} cm · ${getOrientationLabel(item.orientation)} · ${getPriceTypeLabel(item.priceType)}`}
                                    </SectionMeta>
                                </SectionMain>
                                <SectionBadge $tone="blue">Custom</SectionBadge>
                            </SectionHeader>
                            {item.description ? <FieldMeta>{item.description}</FieldMeta> : null}
                            <SectionActions>
                                <ActionButton onClick={() => controller.handleDeleteCustomPage(item)}>Excluir</ActionButton>
                            </SectionActions>
                        </SectionRow>
                    ))}
                </SectionList>
            )}
        </CatalogCard>
    );
}

function renderSupportCard(controller) {
    if (controller.isMaster) {
        const recentLogs = controller.supportAccessLogs.slice(0, 5);

        return (
            <>
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Suporte e auditoria</CatalogCardEyebrow>
                        <CatalogCardTitle>Governança do atendimento da plataforma</CatalogCardTitle>
                        <CatalogCardText>
                            Centralize chamados, auditoria de acessos administrativos e acompanhamento do que exige ação do time responsável pela plataforma.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    <SummaryGrid>
                        {controller.supportAccessSummaryItems.map(item => (
                            <SummaryItem key={item.label}>
                                <SummaryLabel>{item.label}</SummaryLabel>
                                <SummaryValue>{item.value}</SummaryValue>
                            </SummaryItem>
                        ))}
                    </SummaryGrid>
                </CatalogCard>

                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Últimos acessos</CatalogCardEyebrow>
                        <CatalogCardTitle>Auditoria recente do suporte</CatalogCardTitle>
                        <CatalogCardText>
                            A leitura abaixo ajuda a validar quais contas foram acessadas, por qual justificativa e com qual ticket associado.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    {!recentLogs.length ? (
                        <EmptyState>Nenhum acesso administrativo foi registrado até agora.</EmptyState>
                    ) : (
                        <UserList>
                            {recentLogs.map(item => (
                                <UserRow key={item.id}>
                                    <UserName>{item.adminName}</UserName>
                                    <UserMeta>Conta alvo: {item.targetUser}</UserMeta>
                                    <UserMeta>Data: {item.accessDate}</UserMeta>
                                    <UserMeta>Ticket: {item.ticketCode || "--"}</UserMeta>
                                    <UserMeta>{item.justification}</UserMeta>
                                </UserRow>
                            ))}
                        </UserList>
                    )}
                </CatalogCard>
            </>
        );
    }

    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Suporte</CatalogCardEyebrow>
                <CatalogCardTitle>Central de suporte SenaPrices</CatalogCardTitle>
                <CatalogCardText>Gerencie chamados abertos, acompanhe solicitações operacionais e valide o que precisa de apoio técnico.</CatalogCardText>
            </CatalogCardHeader>
            <EmptyState>Nenhum chamado em destaque nesta visão. Use o módulo de suporte para acompanhar o histórico completo.</EmptyState>
        </CatalogCard>
    );
}

function renderAccessCards(controller) {
    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>{controller.isMaster ? "Governança" : "Acessos"}</CatalogCardEyebrow>
                    <CatalogCardTitle>{controller.isMaster ? "Papéis operacionais administrados pela plataforma" : "Matriz operacional por perfil"}</CatalogCardTitle>
                    <CatalogCardText>
                        {controller.isMaster
                            ? "A conta master governa os perfis operacionais e garante que a plataforma entregue o menu correto para cada papel."
                            : "A tabela abaixo resume o desenho atual de permissões do produto."}
                    </CatalogCardText>
                </CatalogCardHeader>
                <MatrixGrid>
                    {controller.accessMatrix.map(item => (
                        <MatrixCard key={item.title}>
                            <MatrixTitle>{item.title}</MatrixTitle>
                            <MatrixRow>
                                <MatrixCell><MatrixLabel>Admin</MatrixLabel><PermissionBadge $tone={getPermissionTone(item.admin)}>{item.admin}</PermissionBadge></MatrixCell>
                                <MatrixCell><MatrixLabel>Subadmin</MatrixLabel><PermissionBadge $tone={getPermissionTone(item.subadmin)}>{item.subadmin}</PermissionBadge></MatrixCell>
                                <MatrixCell><MatrixLabel>Usuário</MatrixLabel><PermissionBadge $tone={getPermissionTone(item.user)}>{item.user}</PermissionBadge></MatrixCell>
                            </MatrixRow>
                        </MatrixCard>
                    ))}
                </MatrixGrid>
            </CatalogCard>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Usuários</CatalogCardEyebrow>
                    <CatalogCardTitle>{controller.isMaster ? "Diretório governado da plataforma" : "Diretório operacional e governança local"}</CatalogCardTitle>
                    <CatalogCardText>
                        {controller.isMaster
                            ? "Crie contas locais, revise perfis, acompanhe status e mantenha a leitura remota separada enquanto a escrita segura não estiver homologada."
                            : "Crie perfis locais, revise permissões e mantenha a leitura remota separada quando a integração ainda não expuser escrita segura."}
                    </CatalogCardText>
                </CatalogCardHeader>
                <CatalogGrid>
                    <CatalogField>
                        <CatalogLabel>Nome</CatalogLabel>
                        <CatalogInput
                            value={controller.userForm.name}
                            placeholder="Ex: Maria Santos"
                            onChange={event => controller.applyUserFormPatch({ name: event.target.value })}
                        />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>E-mail</CatalogLabel>
                        <CatalogInput
                            value={controller.userForm.email}
                            placeholder="usuario@sistema.com"
                            onChange={event => controller.applyUserFormPatch({ email: event.target.value })}
                        />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Perfil</CatalogLabel>
                        <CatalogSelect
                            value={controller.userForm.role}
                            onChange={event => controller.applyUserFormPatch({ role: event.target.value })}
                        >
                            {controller.userRoleOptions.map(item => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </CatalogSelect>
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>PIN de 8 dígitos</CatalogLabel>
                        <CatalogInput
                            value={controller.userForm.pin}
                            maxLength={8}
                            placeholder={controller.editingUserId ? "Deixe em branco para manter" : "12341234"}
                            onChange={event => controller.applyUserFormPatch({ pin: event.target.value.replace(/\D/g, "").slice(0, 8) })}
                        />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Senha</CatalogLabel>
                        <CatalogInput
                            type="password"
                            value={controller.userForm.password}
                            placeholder={controller.editingUserId ? "Deixe em branco para manter" : "Senha provisória"}
                            onChange={event => controller.applyUserFormPatch({ password: event.target.value })}
                        />
                    </CatalogField>
                    <CatalogField>
                        <CatalogLabel>Status</CatalogLabel>
                        <CatalogSelect
                            value={controller.userForm.active ? "active" : "inactive"}
                            onChange={event => controller.applyUserFormPatch({ active: event.target.value === "active" })}
                        >
                            <option value="active">Ativo</option>
                            <option value="inactive">Inativo</option>
                        </CatalogSelect>
                    </CatalogField>
                </CatalogGrid>
                <ActionRow>
                    <ActionButton $primary onClick={controller.handleSaveUser}>
                        {controller.editingUserId ? "Salvar usuário" : "Criar usuário"}
                    </ActionButton>
                    <ActionButton onClick={controller.resetUserForm}>
                        {controller.editingUserId ? "Cancelar edição" : "Limpar formulário"}
                    </ActionButton>
                    <ActionButton onClick={controller.refreshUsers}>Atualizar diretório</ActionButton>
                </ActionRow>
                {!controller.usersState.items.length ? (
                    <EmptyState>Nenhum usuário retornado nesta etapa.</EmptyState>
                ) : (
                    <UserList>
                        {controller.usersState.items.map(item => {
                            const isLocalUser = item.source === "local";

                            return (
                                <UserRow key={item.id || item.email}>
                                    <UserName>{item.name}</UserName>
                                    <UserMeta>{item.email || "E-mail não informado"}</UserMeta>
                                    <UserMeta>Perfil: {getRoleLabel(item.role)}</UserMeta>
                                    <UserMeta>{formatSubscriptionLabel(item.subscription)}</UserMeta>
                                    <UserMeta>Origem: {isLocalUser ? "Governança local" : "Diretório remoto (somente leitura)"}</UserMeta>
                                    <UserMeta>Status: {item.active === false ? "Inativo" : "Ativo"}</UserMeta>
                                    <ActionRow>
                                        {isLocalUser ? (
                                            <>
                                                <ActionButton onClick={() => controller.startEditingUser(item)}>Editar</ActionButton>
                                                {item.role !== "master" ? (
                                                    <ActionButton onClick={() => controller.handleToggleUserActive(item)}>
                                                        {item.active === false ? "Reativar" : "Desativar"}
                                                    </ActionButton>
                                                ) : null}
                                            </>
                                        ) : (
                                            <ActionButton disabled>Somente leitura</ActionButton>
                                        )}
                                    </ActionRow>
                                </UserRow>
                            );
                        })}
                    </UserList>
                )}
            </CatalogCard>
        </>
    );
}

function getRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuário";
}

function getPriceTypeLabel(value) {
    if (value === "depor") return "De / Por";
    if (value === "clube") return "Clube";
    if (value === "ofertaespecial") return "Oferta especial";
    return "À vista";
}

function getOrientationLabel(value) {
    return value === "portrait" ? "Retrato" : "Paisagem";
}

function formatSubscriptionLabel(subscription = {}) {
    const planMap = {
        none: "Sem plano",
        essencial: "Essencial",
        profissional: "Profissional",
        personalizado: "Personalizado",
    };

    const statusMap = {
        none: "Sem assinatura",
        active: "Ativa",
        trial: "Em teste",
        cancelled: "Cancelada",
        expired: "Expirada",
        overdue: "Em atraso",
    };

    const planLabel = planMap[subscription?.plan] || "Plano não definido";
    const statusLabel = statusMap[subscription?.status] || "Status não definido";

    return `Assinatura: ${planLabel} · ${statusLabel}`;
}

function renderTemplateVariables(template = "") {
    const variables = Array.from(new Set(`${template || ""}`.match(/\{[^}]+\}/g) || []));

    if (!variables.length) {
        return "Sem variáveis dinâmicas neste template.";
    }

    return `Variáveis disponíveis: ${variables.join(", ")}`;
}
