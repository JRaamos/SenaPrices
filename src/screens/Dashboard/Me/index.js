import React, { useEffect, useMemo, useState } from "react";

import ContainerAuthenticated from "containers/Authenticated";
import DashboardIconGlyph from "components/Dashboard/IconGlyph";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardSectionMenu from "components/Dashboard/SectionMenu";
import { SectionMenuContent, SectionMenuLayout } from "components/Dashboard/SectionMenu/styled";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
    DashboardActionButton,
    DashboardActionRow,
    DashboardCard,
    DashboardFeatureBadge,
    DashboardFeatureCard,
    DashboardFeatureGrid,
    DashboardFeatureHeader,
    DashboardFeatureText,
    DashboardFeatureTitle,
    DashboardField,
    DashboardFieldGrid,
    DashboardFieldLabel,
    DashboardGrid,
    DashboardIdentifier,
    DashboardInfoGrid,
    DashboardInfoLabel,
    DashboardInfoNote,
    DashboardInfoValue,
    DashboardInput,
    DashboardMain,
    DashboardNotice,
    DashboardQuickActionButton,
    DashboardQuickActionCard,
    DashboardQuickActionGrid,
    DashboardQuickActionIcon,
    DashboardQuickActionText,
    DashboardQuickActionTitle,
    DashboardSectionText,
    DashboardSectionTitle,
    DashboardSelect,
    DashboardSidebar,
    DashboardStack,
    DashboardSummaryGrid,
    DashboardSummaryItem,
    DashboardSummaryLabel,
    DashboardSummaryValue,
    DashboardUserBadge,
    DashboardUserHeader,
    DashboardUserList,
    DashboardUserMeta,
    DashboardUserName,
    DashboardUserRow,
    StyledCore,
} from "./styled";

export default function DashboardMe() {
    const controller = useController();
    const {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        quickActions,
        summaryItems,
        subscriptionItems,
        planFeatureItems,
        supportChannels,
        sectionItems,
        canManageUsers,
        managedUsers,
        managementSummaryItems,
        userForm,
        userRoleOptions,
        editingUserId,
        applyUserFormPatch,
        handleSave,
        resetUserForm,
        startEditingUser,
        handleSaveUser,
        handleToggleUserActive,
    } = controller;

    const firstSectionKey = sectionItems[0]?.key || "overview";
    const [activeSection, setActiveSection] = useState(firstSectionKey);

    useEffect(() => {
        if (!sectionItems.some(item => item.key === activeSection)) {
            setActiveSection(firstSectionKey);
        }
    }, [activeSection, firstSectionKey, sectionItems]);

    const content = useMemo(() => {
        if (activeSection === "plan") {
            return (
                <DashboardGrid>
                    <DashboardSidebar>
                        <DashboardCard>
                            <DashboardSectionTitle>Minha assinatura</DashboardSectionTitle>
                            <DashboardSectionText>
                                Visao resumida do plano vinculado a conta, do status atual e da renovacao configurada.
                            </DashboardSectionText>

                            <DashboardSummaryGrid>
                                {subscriptionItems.map(item => (
                                    <DashboardSummaryItem key={item.label}>
                                        <DashboardSummaryLabel>{item.label}</DashboardSummaryLabel>
                                        <DashboardSummaryValue>{item.value}</DashboardSummaryValue>
                                    </DashboardSummaryItem>
                                ))}
                            </DashboardSummaryGrid>

                            <DashboardNotice>
                                O plano define quais modulos operacionais ficam disponiveis no dashboard e como a conta evolui para recursos mais avancados.
                            </DashboardNotice>
                        </DashboardCard>

                        <DashboardCard>
                            <DashboardSectionTitle>Contato e apoio</DashboardSectionTitle>
                            <DashboardSectionText>
                                Canais centrais para suporte comercial ou orientacao sobre renovacao e capacidade da conta.
                            </DashboardSectionText>

                            <DashboardSummaryGrid>
                                {supportChannels.map(item => (
                                    <DashboardSummaryItem key={item.label}>
                                        <DashboardSummaryLabel>{item.label}</DashboardSummaryLabel>
                                        <DashboardSummaryValue>{item.value}</DashboardSummaryValue>
                                    </DashboardSummaryItem>
                                ))}
                            </DashboardSummaryGrid>
                        </DashboardCard>
                    </DashboardSidebar>

                    <DashboardMain>
                        <DashboardCard>
                            <DashboardSectionTitle>Recursos do plano</DashboardSectionTitle>
                            <DashboardSectionText>
                                Leitura direta do que esta liberado para a sua conta hoje, sem precisar cruzar menu por menu.
                            </DashboardSectionText>

                            <DashboardFeatureGrid>
                                {planFeatureItems.map(item => (
                                    <DashboardFeatureCard key={item.key} $active={item.active}>
                                        <DashboardFeatureHeader>
                                            <DashboardFeatureTitle>{item.label}</DashboardFeatureTitle>
                                            <DashboardFeatureBadge $active={item.active}>{item.statusLabel}</DashboardFeatureBadge>
                                        </DashboardFeatureHeader>
                                        <DashboardFeatureText>{item.description}</DashboardFeatureText>
                                    </DashboardFeatureCard>
                                ))}
                            </DashboardFeatureGrid>
                        </DashboardCard>

                        <DashboardCard>
                            <DashboardSectionTitle>Acoes relacionadas</DashboardSectionTitle>
                            <DashboardSectionText>
                                Atalhos que fazem sentido quando a conta esta em revisao de acesso, seguranca ou suporte.
                            </DashboardSectionText>

                            <DashboardQuickActionGrid>
                                {quickActions.map(item => (
                                    <DashboardQuickActionCard key={item.key}>
                                        <DashboardQuickActionIcon>
                                            <DashboardIconGlyph name={item.iconToken} size={18} color="#2563eb" />
                                        </DashboardQuickActionIcon>
                                        <DashboardQuickActionTitle>{item.title}</DashboardQuickActionTitle>
                                        <DashboardQuickActionText>{item.description}</DashboardQuickActionText>
                                        <DashboardQuickActionButton type="button" onClick={item.action}>
                                            {item.buttonLabel}
                                        </DashboardQuickActionButton>
                                    </DashboardQuickActionCard>
                                ))}
                            </DashboardQuickActionGrid>
                        </DashboardCard>
                    </DashboardMain>
                </DashboardGrid>
            );
        }

        if (activeSection === "security") {
            return (
                <DashboardGrid>
                    <DashboardSidebar>
                        <DashboardCard>
                            <DashboardSectionTitle>Seguranca da conta</DashboardSectionTitle>
                            <DashboardSectionText>
                                Concentre aqui as acoes sensiveis de acesso para nao depender de atalhos espalhados pelo dashboard.
                            </DashboardSectionText>

                            <DashboardSummaryGrid>
                                <DashboardSummaryItem>
                                    <DashboardSummaryLabel>E-mail protegido</DashboardSummaryLabel>
                                    <DashboardSummaryValue>{profile.email}</DashboardSummaryValue>
                                </DashboardSummaryItem>
                                <DashboardSummaryItem>
                                    <DashboardSummaryLabel>Perfil atual</DashboardSummaryLabel>
                                    <DashboardSummaryValue>{summaryItems[0]?.value || "--"}</DashboardSummaryValue>
                                </DashboardSummaryItem>
                            </DashboardSummaryGrid>

                            <DashboardNotice>
                                A troca de senha continua isolada em um fluxo proprio, mas agora a entrada fica agrupada dentro da conta, no mesmo padrao visual das definicoes.
                            </DashboardNotice>
                        </DashboardCard>
                    </DashboardSidebar>

                    <DashboardMain>
                        <DashboardCard>
                            <DashboardSectionTitle>Credenciais e apoio</DashboardSectionTitle>
                            <DashboardSectionText>
                                Abra o fluxo de senha, revise o contexto da conta e acione suporte quando precisar validar acesso.
                            </DashboardSectionText>

                            <DashboardQuickActionGrid>
                                {quickActions.map(item => (
                                    <DashboardQuickActionCard key={item.key}>
                                        <DashboardQuickActionIcon>
                                            <DashboardIconGlyph name={item.iconToken} size={18} color="#2563eb" />
                                        </DashboardQuickActionIcon>
                                        <DashboardQuickActionTitle>{item.title}</DashboardQuickActionTitle>
                                        <DashboardQuickActionText>{item.description}</DashboardQuickActionText>
                                        <DashboardQuickActionButton type="button" onClick={item.action}>
                                            {item.buttonLabel}
                                        </DashboardQuickActionButton>
                                    </DashboardQuickActionCard>
                                ))}
                            </DashboardQuickActionGrid>
                        </DashboardCard>
                    </DashboardMain>
                </DashboardGrid>
            );
        }

        if (activeSection === "users" && canManageUsers) {
            return (
                <DashboardGrid>
                    <DashboardSidebar>
                        <DashboardCard>
                            <DashboardSectionTitle>Governanca local</DashboardSectionTitle>
                            <DashboardSectionText>
                                Gerencie os usuarios locais desta base com o mesmo criterio visual de organizacao aplicado em Definicoes.
                            </DashboardSectionText>

                            <DashboardSummaryGrid>
                                {managementSummaryItems.map(item => (
                                    <DashboardSummaryItem key={item.label}>
                                        <DashboardSummaryLabel>{item.label}</DashboardSummaryLabel>
                                        <DashboardSummaryValue>{item.value}</DashboardSummaryValue>
                                    </DashboardSummaryItem>
                                ))}
                            </DashboardSummaryGrid>

                            <DashboardNotice>
                                Esta area escreve apenas na governanca local do dispositivo. A leitura remota continua centralizada nas definicoes globais.
                            </DashboardNotice>
                        </DashboardCard>
                    </DashboardSidebar>

                    <DashboardMain>
                        <DashboardCard>
                            <DashboardSectionTitle>{editingUserId ? "Editar usuario" : "Novo usuario"}</DashboardSectionTitle>
                            <DashboardSectionText>
                                Crie contas operacionais, ajuste perfil, status, senha e PIN sem sair da area de conta.
                            </DashboardSectionText>

                            <DashboardFieldGrid>
                                <DashboardField>
                                    <DashboardFieldLabel>Nome</DashboardFieldLabel>
                                    <DashboardInput
                                        value={userForm.name}
                                        placeholder="Ex: Maria Santos"
                                        onChange={event => applyUserFormPatch({ name: event.target.value })}
                                    />
                                </DashboardField>

                                <DashboardField>
                                    <DashboardFieldLabel>E-mail</DashboardFieldLabel>
                                    <DashboardInput
                                        value={userForm.email}
                                        placeholder="usuario@sistema.com"
                                        onChange={event => applyUserFormPatch({ email: event.target.value })}
                                    />
                                </DashboardField>

                                <DashboardField>
                                    <DashboardFieldLabel>Perfil</DashboardFieldLabel>
                                    <DashboardSelect
                                        value={userForm.role}
                                        onChange={event => applyUserFormPatch({ role: event.target.value })}
                                    >
                                        {userRoleOptions.map(item => (
                                            <option key={item.value} value={item.value}>{item.label}</option>
                                        ))}
                                    </DashboardSelect>
                                </DashboardField>

                                <DashboardField>
                                    <DashboardFieldLabel>Status</DashboardFieldLabel>
                                    <DashboardSelect
                                        value={userForm.active ? "active" : "inactive"}
                                        onChange={event => applyUserFormPatch({ active: event.target.value === "active" })}
                                    >
                                        <option value="active">Ativo</option>
                                        <option value="inactive">Inativo</option>
                                    </DashboardSelect>
                                </DashboardField>

                                <DashboardField>
                                    <DashboardFieldLabel>PIN de 8 digitos</DashboardFieldLabel>
                                    <DashboardInput
                                        value={userForm.pin}
                                        maxLength={8}
                                        placeholder={editingUserId ? "Deixe em branco para manter" : "12341234"}
                                        onChange={event => applyUserFormPatch({ pin: event.target.value.replace(/\D/g, "").slice(0, 8) })}
                                    />
                                </DashboardField>

                                <DashboardField>
                                    <DashboardFieldLabel>Senha</DashboardFieldLabel>
                                    <DashboardInput
                                        type="password"
                                        value={userForm.password}
                                        placeholder={editingUserId ? "Deixe em branco para manter" : "Senha provisoria"}
                                        onChange={event => applyUserFormPatch({ password: event.target.value })}
                                    />
                                </DashboardField>
                            </DashboardFieldGrid>

                            <DashboardActionRow>
                                <DashboardActionButton $primary onClick={handleSaveUser}>
                                    {editingUserId ? "Salvar usuario" : "Criar usuario"}
                                </DashboardActionButton>
                                <DashboardActionButton onClick={resetUserForm}>
                                    {editingUserId ? "Cancelar edicao" : "Limpar formulario"}
                                </DashboardActionButton>
                            </DashboardActionRow>
                        </DashboardCard>

                        <DashboardCard>
                            <DashboardSectionTitle>Diretorio local</DashboardSectionTitle>
                            <DashboardSectionText>
                                Leitura direta das contas locais com acoes rapidas de edicao e ativacao.
                            </DashboardSectionText>

                            {!managedUsers.length ? (
                                <DashboardNotice>
                                    Nenhum usuario local disponivel nesta base no momento.
                                </DashboardNotice>
                            ) : (
                                <DashboardUserList>
                                    {managedUsers.map(item => (
                                        <DashboardUserRow key={item.id}>
                                            <DashboardUserHeader>
                                                <div>
                                                    <DashboardUserName>{item.name}</DashboardUserName>
                                                    <DashboardUserMeta>{item.email || "E-mail nao informado"}</DashboardUserMeta>
                                                </div>
                                                <DashboardUserBadge $tone={item.active === false ? "orange" : item.role === "admin" ? "blue" : "green"}>
                                                    {item.active === false ? "Inativo" : item.role}
                                                </DashboardUserBadge>
                                            </DashboardUserHeader>

                                            <DashboardUserMeta>Perfil: {item.role}</DashboardUserMeta>
                                            <DashboardUserMeta>Assinatura: {item.subscription?.plan || "none"} - {item.subscription?.status || "none"}</DashboardUserMeta>
                                            <DashboardUserMeta>Atualizado em {item.updatedAt ? new Date(item.updatedAt).toLocaleString("pt-BR") : "--"}</DashboardUserMeta>

                                            <DashboardActionRow>
                                                <DashboardActionButton onClick={() => startEditingUser(item)}>
                                                    Editar
                                                </DashboardActionButton>
                                                {item.role !== "master" ? (
                                                    <DashboardActionButton onClick={() => handleToggleUserActive(item)}>
                                                        {item.active === false ? "Reativar" : "Desativar"}
                                                    </DashboardActionButton>
                                                ) : null}
                                            </DashboardActionRow>
                                        </DashboardUserRow>
                                    ))}
                                </DashboardUserList>
                            )}
                        </DashboardCard>
                    </DashboardMain>
                </DashboardGrid>
            );
        }

        return (
            <DashboardGrid>
                <DashboardSidebar>
                    <DashboardStack>
                        <DashboardCard>
                            <DashboardSectionTitle>Resumo da conta</DashboardSectionTitle>
                            <DashboardSectionText>
                                Informacoes centrais para identificacao, rastreabilidade e suporte da sua conta no SenaPrices.
                            </DashboardSectionText>

                            <DashboardInfoGrid>
                                <div>
                                    <DashboardInfoLabel>Nome</DashboardInfoLabel>
                                    <DashboardInfoValue>{profile.displayName}</DashboardInfoValue>
                                </div>
                                <div>
                                    <DashboardInfoLabel>E-mail</DashboardInfoLabel>
                                    <DashboardInfoValue>{profile.email}</DashboardInfoValue>
                                </div>
                                <div>
                                    <DashboardInfoLabel>Codigo de identificacao</DashboardInfoLabel>
                                    <DashboardIdentifier>{profile.accountId}</DashboardIdentifier>
                                </div>
                            </DashboardInfoGrid>

                            <DashboardInfoNote>
                                Este codigo aparece nos registros vinculados a sua conta para reforcar a rastreabilidade operacional do sistema.
                            </DashboardInfoNote>

                            <DashboardSummaryGrid>
                                {summaryItems.map(item => (
                                    <DashboardSummaryItem key={item.label}>
                                        <DashboardSummaryLabel>{item.label}</DashboardSummaryLabel>
                                        <DashboardSummaryValue>{item.value}</DashboardSummaryValue>
                                    </DashboardSummaryItem>
                                ))}
                            </DashboardSummaryGrid>
                        </DashboardCard>

                        <DashboardCard>
                            <DashboardSectionTitle>Acesso rapido</DashboardSectionTitle>
                            <DashboardSectionText>
                                Acesse seguranca e suporte sem sair do fluxo principal da conta.
                            </DashboardSectionText>

                            <DashboardQuickActionGrid>
                                {quickActions.map(item => (
                                    <DashboardQuickActionCard key={item.key}>
                                        <DashboardQuickActionIcon>
                                            <DashboardIconGlyph name={item.iconToken} size={18} color="#2563eb" />
                                        </DashboardQuickActionIcon>
                                        <DashboardQuickActionTitle>{item.title}</DashboardQuickActionTitle>
                                        <DashboardQuickActionText>{item.description}</DashboardQuickActionText>
                                        <DashboardQuickActionButton type="button" onClick={item.action}>
                                            {item.buttonLabel}
                                        </DashboardQuickActionButton>
                                    </DashboardQuickActionCard>
                                ))}
                            </DashboardQuickActionGrid>
                        </DashboardCard>
                    </DashboardStack>
                </DashboardSidebar>

                <DashboardMain>
                    <DashboardCard>
                        <DashboardSectionTitle>Dados do perfil</DashboardSectionTitle>
                        <DashboardSectionText>
                            Ajuste apenas o nome exibido da conta. O e-mail permanece protegido como identificador principal de acesso.
                        </DashboardSectionText>

                        <StyledCore register={user} ref={formRef} formItems={formItems} />

                        <DashboardActionRow>
                            <DashboardActionButton $primary onClick={handleSave}>
                                Salvar alteracoes
                            </DashboardActionButton>
                        </DashboardActionRow>
                    </DashboardCard>
                </DashboardMain>
            </DashboardGrid>
        );
    }, [
        activeSection,
        applyUserFormPatch,
        canManageUsers,
        editingUserId,
        formItems,
        formRef,
        handleSave,
        handleSaveUser,
        handleToggleUserActive,
        managedUsers,
        managementSummaryItems,
        planFeatureItems,
        profile,
        quickActions,
        startEditingUser,
        subscriptionItems,
        summaryItems,
        supportChannels,
        user,
        userForm,
        userRoleOptions,
        resetUserForm,
    ]);

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <SectionMenuLayout>
                    <DashboardSectionMenu
                        title="Conta"
                        items={sectionItems}
                        activeKey={activeSection}
                        onChange={setActiveSection}
                    />

                    <SectionMenuContent>
                        {content}
                    </SectionMenuContent>
                </SectionMenuLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
