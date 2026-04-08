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

export default function DashboardSettings() {
    const {
        loading,
        header,
        actions,
        canManage,
        roleLabel,
        activeTab,
        activeTabLabel,
        lastUpdatedLabel,
        tabItems,
        appSettings,
        labelSettings,
        sections,
        newSectionName,
        editingSectionId,
        editingSectionName,
        usersState,
        accessMatrix,
        guidelines,
        shortcuts,
        labelPresetOptions,
        labelDpiOptions,
        statusCard,
        summaryItems,
        setActiveTab,
        setNewSectionName,
        setEditingSectionName,
        handlePrintPatch,
        handleLabelPatch,
        handleLabelPresetChange,
        startEditingSection,
        cancelEditingSection,
        handleSavePrint,
        handleSaveLabels,
        handleResetPrint,
        handleAddSection,
        handleSaveSection,
        handleDeleteSection,
        refreshUsers,
        navigate,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <SettingsLayout>
                    <SettingsMain>
                        {!canManage ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Acesso</CatalogCardEyebrow>
                                    <CatalogCardTitle>Governança central restrita</CatalogCardTitle>
                                    <CatalogCardText>
                                        Esta área concentra defaults operacionais, diretivas de catálogo e regras de acesso. Apenas admin e subadmin podem editar essa governança.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <InlineNotice>
                                    Seu perfil continua usando os parâmetros salvos aqui, mas sem permissão para alterá-los diretamente.
                                </InlineNotice>

                                <ActionRow>
                                    <ActionButton $primary onClick={() => navigate("dashboard/me")}>
                                        Abrir minha conta
                                    </ActionButton>
                                    <ActionButton onClick={() => navigate("dashboard/support")}>
                                        Falar com suporte
                                    </ActionButton>
                                </ActionRow>
                            </CatalogCard>
                        ) : (
                            <>
                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Navegação</CatalogCardEyebrow>
                                        <CatalogCardTitle>Definições ativas do SenaPrices</CatalogCardTitle>
                                        <CatalogCardText>
                                            Use esta central para padronizar impressão, catálogo, etiquetas e leitura de acesso sem duplicar configuração em cada módulo.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    <TabsGrid>
                                        {tabItems.map(item => (
                                            <TabButton
                                                key={item.key}
                                                $active={item.active}
                                                onClick={() => setActiveTab(item.key)}
                                            >
                                                <TabHeader>
                                                    <TabIcon src={item.icon} alt={`${item.label}-icon`} />
                                                    <TabTitle>{item.label}</TabTitle>
                                                </TabHeader>
                                                <TabText>{item.description}</TabText>
                                            </TabButton>
                                        ))}
                                    </TabsGrid>
                                </CatalogCard>

                                {activeTab === "print" ? (
                                    <CatalogCard>
                                        <CatalogCardHeader>
                                            <CatalogCardEyebrow>Impressão</CatalogCardEyebrow>
                                            <CatalogCardTitle>Defaults dos novos cartazes</CatalogCardTitle>
                                            <CatalogCardText>
                                                Essas preferências abastecem Criar Preço e Criação Rápida, reduzindo retrabalho e mantendo consistência visual da operação.
                                            </CatalogCardText>
                                        </CatalogCardHeader>

                                        <CatalogGrid>
                                            <CatalogField $full>
                                                <CatalogLabel>Título padrão da oferta</CatalogLabel>
                                                <CatalogInput
                                                    value={appSettings.print.defaultOfferTitle}
                                                    placeholder="Ex: Oferta da semana"
                                                    onChange={event => handlePrintPatch({ defaultOfferTitle: event.target.value })}
                                                />
                                                <FieldMeta>
                                                    <FieldError />
                                                    <FieldCounter>{appSettings.print.defaultOfferTitle.length}/30</FieldCounter>
                                                </FieldMeta>
                                            </CatalogField>

                                            <CatalogField $full>
                                                <CatalogLabel>Título padrão do modo rápido</CatalogLabel>
                                                <CatalogInput
                                                    value={appSettings.print.defaultQuickOfferTitle}
                                                    placeholder="Ex: Oferta rápida"
                                                    onChange={event => handlePrintPatch({ defaultQuickOfferTitle: event.target.value })}
                                                />
                                                <FieldMeta>
                                                    <FieldError />
                                                    <FieldCounter>{appSettings.print.defaultQuickOfferTitle.length}/30</FieldCounter>
                                                </FieldMeta>
                                            </CatalogField>

                                            <CatalogField>
                                                <CatalogLabel>Papel padrão</CatalogLabel>
                                                <CatalogSelect
                                                    value={appSettings.print.defaultPaperSize}
                                                    onChange={event => handlePrintPatch({ defaultPaperSize: event.target.value })}
                                                >
                                                    <option value="A6">A6</option>
                                                    <option value="A5">A5</option>
                                                    <option value="A4">A4</option>
                                                    <option value="A3">A3</option>
                                                </CatalogSelect>
                                            </CatalogField>

                                            <CatalogField>
                                                <CatalogLabel>Orientação padrão</CatalogLabel>
                                                <CatalogSelect
                                                    value={appSettings.print.defaultOrientation}
                                                    onChange={event => handlePrintPatch({ defaultOrientation: event.target.value })}
                                                >
                                                    <option value="portrait">Retrato</option>
                                                    <option value="landscape">Paisagem</option>
                                                </CatalogSelect>
                                            </CatalogField>
                                        </CatalogGrid>

                                        <ToggleList>
                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={appSettings.print.defaultShowBarcode}
                                                    onChange={event => handlePrintPatch({ defaultShowBarcode: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir código de barras por padrão</ToggleTitle>
                                                    <ToggleText>
                                                        Útil para conferência em loja e reaproveitamento da mesma configuração em cartazes rastreáveis.
                                                    </ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>

                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={appSettings.print.defaultShowValidity}
                                                    onChange={event => handlePrintPatch({ defaultShowValidity: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir validade por padrão</ToggleTitle>
                                                    <ToggleText>
                                                        Ajuda a padronizar campanhas temporárias e evita que a operação esqueça o campo em novas composições.
                                                    </ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>
                                        </ToggleList>

                                        <ActionRow>
                                            <ActionButton onClick={handleResetPrint}>
                                                Restaurar padrão recomendado
                                            </ActionButton>
                                            <ActionButton $primary onClick={handleSavePrint}>
                                                Salvar defaults
                                            </ActionButton>
                                        </ActionRow>
                                    </CatalogCard>
                                ) : null}

                                {activeTab === "sections" ? (
                                    <>
                                        <CatalogCard>
                                            <CatalogCardHeader>
                                                <CatalogCardEyebrow>Seções</CatalogCardEyebrow>
                                                <CatalogCardTitle>Base central de classificação</CatalogCardTitle>
                                                <CatalogCardText>
                                                    As seções cadastradas aqui passam a sustentar item, criação de preço, histórico e filtros gerenciais usando a mesma referência.
                                                </CatalogCardText>
                                            </CatalogCardHeader>

                                            <InlineForm>
                                                <CatalogInput
                                                    value={newSectionName}
                                                    placeholder="Ex: Mercearia"
                                                    onChange={event => setNewSectionName(event.target.value)}
                                                />
                                                <ActionButton $primary onClick={handleAddSection}>
                                                    Adicionar seção
                                                </ActionButton>
                                            </InlineForm>
                                        </CatalogCard>

                                        <CatalogCard>
                                            <CatalogCardHeader>
                                                <CatalogCardEyebrow>Cadastro atual</CatalogCardEyebrow>
                                                <CatalogCardTitle>Seções em uso pela operação</CatalogCardTitle>
                                                <CatalogCardText>
                                                    Renomear uma seção reflete a mudança nos itens vinculados. Exclusão direta só é permitida quando ela não possui uso atual.
                                                </CatalogCardText>
                                            </CatalogCardHeader>

                                            {!sections.length ? (
                                                <EmptyState>
                                                    Nenhuma seção cadastrada até o momento. Crie a primeira classificação para padronizar o catálogo.
                                                </EmptyState>
                                            ) : (
                                                <SectionList>
                                                    {sections.map(section => (
                                                        <SectionRow key={section.id}>
                                                            {editingSectionId === section.id ? (
                                                                <>
                                                                    <InlineForm>
                                                                        <CatalogInput
                                                                            value={editingSectionName}
                                                                            placeholder="Informe o novo nome da seção"
                                                                            onChange={event => setEditingSectionName(event.target.value)}
                                                                        />
                                                                        <ActionButton $primary onClick={() => handleSaveSection(section.id)}>
                                                                            Salvar
                                                                        </ActionButton>
                                                                    </InlineForm>
                                                                    <SectionActions>
                                                                        <ActionButton onClick={cancelEditingSection}>
                                                                            Cancelar
                                                                        </ActionButton>
                                                                    </SectionActions>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <SectionHeader>
                                                                        <SectionMain>
                                                                            <SectionTitle>{section.name}</SectionTitle>
                                                                            <SectionMeta>
                                                                                {section.usageCount} item(ns) vinculado(s) • Atualizada em {section.updatedAt ? new Date(section.updatedAt).toLocaleDateString("pt-BR") : "--"}
                                                                            </SectionMeta>
                                                                        </SectionMain>
                                                                        <SectionBadge $tone={section.usageCount > 0 ? "orange" : "blue"}>
                                                                            {section.usageCount > 0 ? "Em uso" : "Disponível"}
                                                                        </SectionBadge>
                                                                    </SectionHeader>

                                                                    <SectionActions>
                                                                        <ActionButton onClick={() => startEditingSection(section)}>
                                                                            Renomear
                                                                        </ActionButton>
                                                                        <ActionButton onClick={() => handleDeleteSection(section)}>
                                                                            Excluir
                                                                        </ActionButton>
                                                                    </SectionActions>
                                                                </>
                                                            )}
                                                        </SectionRow>
                                                    ))}
                                                </SectionList>
                                            )}
                                        </CatalogCard>
                                    </>
                                ) : null}

                                {activeTab === "labels" ? (
                                    <CatalogCard>
                                        <CatalogCardHeader>
                                            <CatalogCardEyebrow>Etiquetas</CatalogCardEyebrow>
                                            <CatalogCardTitle>Preset operacional da emissão</CatalogCardTitle>
                                            <CatalogCardText>
                                                O módulo de etiquetas lê estas preferências para reduzir ajustes repetitivos e manter padrão entre impressão HTML e Zebra ZPL.
                                            </CatalogCardText>
                                        </CatalogCardHeader>

                                        <CatalogGrid>
                                            <CatalogField>
                                                <CatalogLabel>Preset</CatalogLabel>
                                                <CatalogSelect
                                                    value={labelSettings.preset}
                                                    onChange={event => handleLabelPresetChange(event.target.value)}
                                                >
                                                    {labelPresetOptions.map(item => (
                                                        <option key={item.value} value={item.value}>{item.label}</option>
                                                    ))}
                                                </CatalogSelect>
                                            </CatalogField>

                                            <CatalogField>
                                                <CatalogLabel>DPI</CatalogLabel>
                                                <CatalogSelect
                                                    value={labelSettings.dpi}
                                                    onChange={event => handleLabelPatch({ dpi: Number(event.target.value) })}
                                                >
                                                    {labelDpiOptions.map(item => (
                                                        <option key={item.value} value={item.value}>{item.label}</option>
                                                    ))}
                                                </CatalogSelect>
                                            </CatalogField>

                                            <CatalogField>
                                                <CatalogLabel>Largura (mm)</CatalogLabel>
                                                <CatalogInput
                                                    type="number"
                                                    min="20"
                                                    max="120"
                                                    value={labelSettings.widthMm}
                                                    disabled={labelSettings.preset !== "custom"}
                                                    onChange={event => handleLabelPatch({ widthMm: Number(event.target.value) })}
                                                />
                                            </CatalogField>

                                            <CatalogField>
                                                <CatalogLabel>Altura (mm)</CatalogLabel>
                                                <CatalogInput
                                                    type="number"
                                                    min="20"
                                                    max="120"
                                                    value={labelSettings.heightMm}
                                                    disabled={labelSettings.preset !== "custom"}
                                                    onChange={event => handleLabelPatch({ heightMm: Number(event.target.value) })}
                                                />
                                            </CatalogField>

                                            <CatalogField>
                                                <CatalogLabel>Cópias padrão</CatalogLabel>
                                                <CatalogInput
                                                    type="number"
                                                    min="1"
                                                    max="99"
                                                    value={labelSettings.defaultCopies}
                                                    onChange={event => handleLabelPatch({ defaultCopies: Number(event.target.value) })}
                                                />
                                            </CatalogField>
                                        </CatalogGrid>

                                        <ToggleList>
                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={labelSettings.showDescription2}
                                                    onChange={event => handleLabelPatch({ showDescription2: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir descrição secundária</ToggleTitle>
                                                    <ToggleText>Leva a linha complementar do item para a etiqueta sempre que houver espaço útil.</ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>

                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={labelSettings.showSection}
                                                    onChange={event => handleLabelPatch({ showSection: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir seção</ToggleTitle>
                                                    <ToggleText>Ajuda a operação a conferir a gôndola correta no momento da troca.</ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>

                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={labelSettings.showUnit}
                                                    onChange={event => handleLabelPatch({ showUnit: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir unidade</ToggleTitle>
                                                    <ToggleText>Útil para itens vendidos por kg, litro, pacote ou unidade específica.</ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>

                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={labelSettings.showBarcode}
                                                    onChange={event => handleLabelPatch({ showBarcode: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir código de barras</ToggleTitle>
                                                    <ToggleText>Define se o bloco principal de leitura deve ser impresso quando o item possuir EAN-13 válido.</ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>

                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={labelSettings.showEan}
                                                    onChange={event => handleLabelPatch({ showEan: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir EAN em texto</ToggleTitle>
                                                    <ToggleText>Mantém o número do EAN visível em texto, mesmo quando a etiqueta também imprime o código gráfico.</ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>

                                            <ToggleRow>
                                                <ToggleInput
                                                    checked={labelSettings.showInternalCode}
                                                    onChange={event => handleLabelPatch({ showInternalCode: event.target.checked })}
                                                />
                                                <ToggleMain>
                                                    <ToggleTitle>Exibir código interno</ToggleTitle>
                                                    <ToggleText>Ajuda a conciliar itens do catálogo interno com a etiqueta gerada para reposição.</ToggleText>
                                                </ToggleMain>
                                            </ToggleRow>
                                        </ToggleList>

                                        <ActionRow>
                                            <ActionButton $primary onClick={handleSaveLabels}>
                                                Salvar etiquetas
                                            </ActionButton>
                                        </ActionRow>
                                    </CatalogCard>
                                ) : null}

                                {activeTab === "access" ? (
                                    <>
                                        <CatalogCard>
                                            <CatalogCardHeader>
                                                <CatalogCardEyebrow>Acessos</CatalogCardEyebrow>
                                                <CatalogCardTitle>Matriz operacional por perfil</CatalogCardTitle>
                                                <CatalogCardText>
                                                    A tabela abaixo resume o desenho atual de permissões do produto, deixando explícito o que é gerencial, operacional ou restrito.
                                                </CatalogCardText>
                                            </CatalogCardHeader>

                                            <MatrixGrid>
                                                {accessMatrix.map(item => (
                                                    <MatrixCard key={item.title}>
                                                        <MatrixTitle>{item.title}</MatrixTitle>
                                                        <MatrixRow>
                                                            <MatrixCell>
                                                                <MatrixLabel>Admin</MatrixLabel>
                                                                <PermissionBadge $tone={getPermissionTone(item.admin)}>
                                                                    {item.admin}
                                                                </PermissionBadge>
                                                            </MatrixCell>
                                                            <MatrixCell>
                                                                <MatrixLabel>Subadmin</MatrixLabel>
                                                                <PermissionBadge $tone={getPermissionTone(item.subadmin)}>
                                                                    {item.subadmin}
                                                                </PermissionBadge>
                                                            </MatrixCell>
                                                            <MatrixCell>
                                                                <MatrixLabel>Usuário</MatrixLabel>
                                                                <PermissionBadge $tone={getPermissionTone(item.user)}>
                                                                    {item.user}
                                                                </PermissionBadge>
                                                            </MatrixCell>
                                                        </MatrixRow>
                                                    </MatrixCard>
                                                ))}
                                            </MatrixGrid>
                                        </CatalogCard>

                                        <CatalogCard>
                                            <CatalogCardHeader>
                                                <CatalogCardEyebrow>Diretório</CatalogCardEyebrow>
                                                <CatalogCardTitle>Usuários lidos da base autenticada</CatalogCardTitle>
                                                <CatalogCardText>
                                                    Este recorte ajuda a validar os perfis que já existem no ambiente. O gerenciamento profundo de contas continua dependendo da camada autenticada da API.
                                                </CatalogCardText>
                                            </CatalogCardHeader>

                                            {usersState.error ? (
                                                <InlineNotice>{usersState.error}</InlineNotice>
                                            ) : null}

                                            {!usersState.error && !usersState.items.length ? (
                                                <EmptyState>
                                                    Nenhum usuário autenticado foi retornado nesta etapa. Atualize o diretório quando a API estiver disponível.
                                                </EmptyState>
                                            ) : null}

                                            {usersState.items.length ? (
                                                <UserList>
                                                    {usersState.items.map(item => (
                                                        <UserRow key={item.id}>
                                                            <UserName>{item.name}</UserName>
                                                            <UserMeta>{item.email || "E-mail não informado"}</UserMeta>
                                                            <UserMeta>Perfil: {getRoleLabel(item.role)}</UserMeta>
                                                        </UserRow>
                                                    ))}
                                                </UserList>
                                            ) : null}

                                            <ActionRow>
                                                <ActionButton $primary onClick={refreshUsers}>
                                                    Atualizar diretório
                                                </ActionButton>
                                            </ActionRow>
                                        </CatalogCard>
                                    </>
                                ) : null}
                            </>
                        )}
                    </SettingsMain>

                    <SettingsSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Ativo" : "Restrito"}
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
                                <CatalogCardEyebrow>Contexto</CatalogCardEyebrow>
                                <CatalogCardTitle>Leitura rápida da tela</CatalogCardTitle>
                                <CatalogCardText>
                                    Este bloco resume o perfil atual, a aba em foco e quando os defaults foram atualizados pela última vez.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <SummaryGrid>
                                <SummaryItem>
                                    <SummaryLabel>Perfil atual</SummaryLabel>
                                    <SummaryValue>{roleLabel}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Aba ativa</SummaryLabel>
                                    <SummaryValue>{activeTabLabel}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Última atualização</SummaryLabel>
                                    <SummaryValue>{lastUpdatedLabel}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Modo</SummaryLabel>
                                    <SummaryValue>{canManage ? "Governança" : "Consulta"}</SummaryValue>
                                </SummaryItem>
                            </SummaryGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Atalhos</CatalogCardEyebrow>
                                <CatalogCardTitle>Validação cruzada dos defaults</CatalogCardTitle>
                                <CatalogCardText>
                                    Depois de salvar uma definição, use estes atalhos para validar o efeito diretamente nos módulos que dependem dela.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <ShortcutGrid>
                                {shortcuts.map(item => (
                                    <ShortcutCard key={item.key}>
                                        <ShortcutTitle>{item.title}</ShortcutTitle>
                                        <ShortcutText>{item.description}</ShortcutText>
                                        <ActionButton onClick={() => navigate(item.route)}>
                                            {item.buttonLabel}
                                        </ActionButton>
                                    </ShortcutCard>
                                ))}
                            </ShortcutGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Diretrizes</CatalogCardEyebrow>
                                <CatalogCardTitle>Boas práticas desta central</CatalogCardTitle>
                                <CatalogCardText>
                                    A proposta da tela é padronizar o produto sem inflar complexidade ou prometer recursos ainda não seguros para produção.
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
                    </SettingsSidebar>
                </SettingsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}

function getRoleLabel(role) {
    if (role === "admin") return "Administrador";
    if (role === "subadmin") return "Subadministrador";
    if (role === "master") return "Master";
    return "Usuário";
}
