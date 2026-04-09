import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import { getPermissionTone } from "./helpers";
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
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineForm,
    InlineNotice,
    MatrixCard,
    MatrixCell,
    MatrixGrid,
    MatrixLabel,
    MatrixRow,
    MatrixTitle,
    PermissionBadge,
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
    SettingsSidebar,
    ShortcutCard,
    ShortcutGrid,
    ShortcutText,
    ShortcutTitle,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
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
    ["showDescription2", "Exibir descricao secundaria", "Leva a linha complementar do item para a etiqueta."],
    ["showSection", "Exibir secao", "Ajuda a operacao a conferir a gondola correta."],
    ["showUnit", "Exibir unidade", "Mantem a leitura da unidade vendida visivel."],
    ["showBarcode", "Exibir codigo de barras", "Imprime o bloco grafico quando o item tiver EAN-13 valido."],
    ["showEan", "Exibir EAN em texto", "Mostra o numero em texto alem do codigo grafico."],
    ["showInternalCode", "Exibir codigo interno", "Ajuda a conciliar item interno e etiqueta emitida."],
];

export default function DashboardSettings() {
    const controller = useController();

    return (
        <ContainerAuthenticated actions={controller.actions} loading={controller.loading}>
            <PageContent>
                <PageHeader header={controller.header} loading={controller.loading} />
                <FormSpacer />
                <SettingsLayout>
                    <SettingsMain>{renderMain(controller)}</SettingsMain>
                    <SettingsSidebar>{renderSidebar(controller)}</SettingsSidebar>
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
                    <CatalogCardTitle>Governanca central restrita</CatalogCardTitle>
                    <CatalogCardText>
                        Apenas admin, subadmin e a conta master podem alterar os parametros centrais do SenaPrices.
                    </CatalogCardText>
                </CatalogCardHeader>
                <InlineNotice>Seu perfil continua consumindo os parametros salvos aqui, mas em modo somente leitura.</InlineNotice>
                <ActionRow>
                    <ActionButton $primary onClick={() => controller.navigate("dashboard/me")}>Abrir minha conta</ActionButton>
                    <ActionButton onClick={() => controller.navigate("dashboard/support")}>Falar com suporte</ActionButton>
                </ActionRow>
            </CatalogCard>
        );
    }

    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Navegacao</CatalogCardEyebrow>
                    <CatalogCardTitle>{controller.isMaster ? "Painel master da plataforma" : "Definicoes ativas do SenaPrices"}</CatalogCardTitle>
                    <CatalogCardText>
                        {controller.isMaster
                            ? "Landing, planos e tema sazonal ficam governados aqui."
                            : "Padronize impressao, catalogo, etiquetas e acesso sem duplicar regra em cada modulo."}
                    </CatalogCardText>
                </CatalogCardHeader>
                <TabsGrid>
                    {controller.tabItems.map(item => (
                        <TabButton key={item.key} $active={item.active} onClick={() => controller.setActiveTab(item.key)}>
                            <TabHeader>
                                <TabIcon src={item.icon} alt={`${item.label}-icon`} />
                                <TabTitle>{item.label}</TabTitle>
                            </TabHeader>
                            <TabText>{item.description}</TabText>
                        </TabButton>
                    ))}
                </TabsGrid>
            </CatalogCard>
            {controller.activeTab === "platform" ? renderPlatformCard(controller) : null}
            {!controller.isMaster && controller.activeTab === "print" ? renderPrintCard(controller) : null}
            {!controller.isMaster && controller.activeTab === "sections" ? renderSectionsCards(controller) : null}
            {!controller.isMaster && controller.activeTab === "labels" ? renderLabelsCard(controller) : null}
            {!controller.isMaster && controller.activeTab === "access" ? renderAccessCards(controller) : null}
        </>
    );
}

function renderSidebar(controller) {
    return (
        <>
            <StatusCard $tone={controller.statusCard.tone}>
                <StatusBadge $tone={controller.statusCard.tone}>
                    {controller.statusCard.tone === "green" ? "Ativo" : "Restrito"}
                </StatusBadge>
                <StatusTitle>{controller.statusCard.title}</StatusTitle>
                <StatusText>{controller.statusCard.description}</StatusText>
                <SummaryGrid>
                    {controller.summaryItems.map(item => (
                        <SummaryItem key={item.label}>
                            <SummaryLabel>{item.label}</SummaryLabel>
                            <SummaryValue>{item.value}</SummaryValue>
                        </SummaryItem>
                    ))}
                </SummaryGrid>
            </StatusCard>

            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Contexto</CatalogCardEyebrow>
                    <CatalogCardTitle>Leitura rapida da tela</CatalogCardTitle>
                    <CatalogCardText>Resumo do perfil atual, da aba em foco e da ultima atualizacao.</CatalogCardText>
                </CatalogCardHeader>
                <SummaryGrid>
                    <SummaryItem><SummaryLabel>Perfil atual</SummaryLabel><SummaryValue>{controller.roleLabel}</SummaryValue></SummaryItem>
                    <SummaryItem><SummaryLabel>Aba ativa</SummaryLabel><SummaryValue>{controller.activeTabLabel}</SummaryValue></SummaryItem>
                    <SummaryItem><SummaryLabel>Ultima atualizacao</SummaryLabel><SummaryValue>{controller.lastUpdatedLabel}</SummaryValue></SummaryItem>
                    <SummaryItem><SummaryLabel>Modo</SummaryLabel><SummaryValue>{controller.isMaster ? "Master" : controller.canManage ? "Governanca" : "Consulta"}</SummaryValue></SummaryItem>
                </SummaryGrid>
            </CatalogCard>

            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Atalhos</CatalogCardEyebrow>
                    <CatalogCardTitle>Validacao cruzada</CatalogCardTitle>
                    <CatalogCardText>Use estes atalhos para validar o efeito das definicoes nos modulos dependentes.</CatalogCardText>
                </CatalogCardHeader>
                <ShortcutGrid>
                    {controller.shortcuts.map(item => (
                        <ShortcutCard key={item.key}>
                            <ShortcutTitle>{item.title}</ShortcutTitle>
                            <ShortcutText>{item.description}</ShortcutText>
                            <ActionButton onClick={() => controller.navigate(item.route)}>{item.buttonLabel}</ActionButton>
                        </ShortcutCard>
                    ))}
                </ShortcutGrid>
            </CatalogCard>

            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Diretrizes</CatalogCardEyebrow>
                    <CatalogCardTitle>Boas praticas desta central</CatalogCardTitle>
                    <CatalogCardText>A proposta da tela e padronizar o produto sem inflar complexidade.</CatalogCardText>
                </CatalogCardHeader>
                <ChecklistList>
                    {controller.guidelines.map(item => (
                        <ChecklistItem key={item.title}>
                            <ChecklistTitle>{item.title}</ChecklistTitle>
                            <ChecklistText>{item.description}</ChecklistText>
                        </ChecklistItem>
                    ))}
                </ChecklistList>
            </CatalogCard>
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
                    <CatalogLabel>Trial padrao (dias)</CatalogLabel>
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
                    <CatalogLabel>Inicio do tema</CatalogLabel>
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

function renderPrintCard(controller) {
    return (
        <CatalogCard>
            <CatalogCardHeader>
                <CatalogCardEyebrow>Impressao</CatalogCardEyebrow>
                <CatalogCardTitle>Defaults dos novos cartazes</CatalogCardTitle>
                <CatalogCardText>Essas preferencias abastecem Criar Preco e Criacao Rapida.</CatalogCardText>
            </CatalogCardHeader>
            <CatalogGrid>
                <CatalogField $full>
                    <CatalogLabel>Titulo padrao da oferta</CatalogLabel>
                    <CatalogInput value={controller.appSettings.print.defaultOfferTitle} onChange={event => controller.handlePrintPatch({ defaultOfferTitle: event.target.value })} />
                    <FieldMeta><FieldError /><FieldCounter>{controller.appSettings.print.defaultOfferTitle.length}/30</FieldCounter></FieldMeta>
                </CatalogField>
                <CatalogField $full>
                    <CatalogLabel>Titulo padrao do modo rapido</CatalogLabel>
                    <CatalogInput value={controller.appSettings.print.defaultQuickOfferTitle} onChange={event => controller.handlePrintPatch({ defaultQuickOfferTitle: event.target.value })} />
                    <FieldMeta><FieldError /><FieldCounter>{controller.appSettings.print.defaultQuickOfferTitle.length}/30</FieldCounter></FieldMeta>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Papel padrao</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.defaultPaperSize} onChange={event => controller.handlePrintPatch({ defaultPaperSize: event.target.value })}>
                        <option value="A6">A6</option><option value="A5">A5</option><option value="A4">A4</option><option value="A3">A3</option>
                    </CatalogSelect>
                </CatalogField>
                <CatalogField>
                    <CatalogLabel>Orientacao padrao</CatalogLabel>
                    <CatalogSelect value={controller.appSettings.print.defaultOrientation} onChange={event => controller.handlePrintPatch({ defaultOrientation: event.target.value })}>
                        <option value="portrait">Retrato</option><option value="landscape">Paisagem</option>
                    </CatalogSelect>
                </CatalogField>
            </CatalogGrid>
            <ToggleList>
                <ToggleRow>
                    <ToggleInput checked={controller.appSettings.print.defaultShowBarcode} onChange={event => controller.handlePrintPatch({ defaultShowBarcode: event.target.checked })} />
                    <ToggleMain><ToggleTitle>Exibir codigo de barras</ToggleTitle><ToggleText>Ajuda a operacao a validar o item correto.</ToggleText></ToggleMain>
                </ToggleRow>
                <ToggleRow>
                    <ToggleInput checked={controller.appSettings.print.defaultShowValidity} onChange={event => controller.handlePrintPatch({ defaultShowValidity: event.target.checked })} />
                    <ToggleMain><ToggleTitle>Exibir validade</ToggleTitle><ToggleText>Mantem campanhas temporarias mais seguras.</ToggleText></ToggleMain>
                </ToggleRow>
            </ToggleList>
            <ActionRow>
                <ActionButton onClick={controller.handleResetPrint}>Restaurar padrao</ActionButton>
                <ActionButton $primary onClick={controller.handleSavePrint}>Salvar defaults</ActionButton>
            </ActionRow>
        </CatalogCard>
    );
}

function renderSectionsCards(controller) {
    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Secoes</CatalogCardEyebrow>
                    <CatalogCardTitle>Base central de classificacao</CatalogCardTitle>
                    <CatalogCardText>Renomear ou criar secoes aqui reflete o catalogo inteiro.</CatalogCardText>
                </CatalogCardHeader>
                <InlineForm>
                    <CatalogInput value={controller.newSectionName} placeholder="Ex: Mercearia" onChange={event => controller.setNewSectionName(event.target.value)} />
                    <ActionButton $primary onClick={controller.handleAddSection}>Adicionar secao</ActionButton>
                </InlineForm>
            </CatalogCard>
            <CatalogCard>
                {!controller.sections.length ? (
                    <EmptyState>Nenhuma secao cadastrada ate o momento.</EmptyState>
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
                                            <SectionBadge $tone={section.usageCount > 0 ? "orange" : "blue"}>{section.usageCount > 0 ? "Em uso" : "Disponivel"}</SectionBadge>
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
                <CatalogCardTitle>Preset operacional da emissao</CatalogCardTitle>
                <CatalogCardText>O modulo de etiquetas le estas preferencias automaticamente.</CatalogCardText>
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
                    <CatalogLabel>Copias padrao</CatalogLabel>
                    <CatalogInput type="number" min="1" max="99" value={controller.labelSettings.defaultCopies} onChange={event => controller.handleLabelPatch({ defaultCopies: Number(event.target.value) })} />
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
        </CatalogCard>
    );
}

function renderAccessCards(controller) {
    return (
        <>
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Acessos</CatalogCardEyebrow>
                    <CatalogCardTitle>Matriz operacional por perfil</CatalogCardTitle>
                    <CatalogCardText>A tabela abaixo resume o desenho atual de permissoes do produto.</CatalogCardText>
                </CatalogCardHeader>
                <MatrixGrid>
                    {controller.accessMatrix.map(item => (
                        <MatrixCard key={item.title}>
                            <MatrixTitle>{item.title}</MatrixTitle>
                            <MatrixRow>
                                <MatrixCell><MatrixLabel>Admin</MatrixLabel><PermissionBadge $tone={getPermissionTone(item.admin)}>{item.admin}</PermissionBadge></MatrixCell>
                                <MatrixCell><MatrixLabel>Subadmin</MatrixLabel><PermissionBadge $tone={getPermissionTone(item.subadmin)}>{item.subadmin}</PermissionBadge></MatrixCell>
                                <MatrixCell><MatrixLabel>Usuario</MatrixLabel><PermissionBadge $tone={getPermissionTone(item.user)}>{item.user}</PermissionBadge></MatrixCell>
                            </MatrixRow>
                        </MatrixCard>
                    ))}
                </MatrixGrid>
            </CatalogCard>
            <CatalogCard>
                {controller.usersState.error ? <InlineNotice>{controller.usersState.error}</InlineNotice> : null}
                {!controller.usersState.error && !controller.usersState.items.length ? (
                    <EmptyState>Nenhum usuario autenticado foi retornado nesta etapa.</EmptyState>
                ) : null}
                {controller.usersState.items.length ? (
                    <UserList>
                        {controller.usersState.items.map(item => (
                            <UserRow key={item.id}>
                                <UserName>{item.name}</UserName>
                                <UserMeta>{item.email || "E-mail nao informado"}</UserMeta>
                                <UserMeta>Perfil: {getRoleLabel(item.role)}</UserMeta>
                            </UserRow>
                        ))}
                    </UserList>
                ) : null}
                <ActionRow>
                    <ActionButton $primary onClick={controller.refreshUsers}>Atualizar diretorio</ActionButton>
                </ActionRow>
            </CatalogCard>
        </>
    );
}

function getRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuario";
}
