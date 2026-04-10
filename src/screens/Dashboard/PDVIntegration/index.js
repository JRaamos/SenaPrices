import React, { useMemo, useState } from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardSectionMenu from "components/Dashboard/SectionMenu";
import { SectionMenuContent, SectionMenuLayout } from "components/Dashboard/SectionMenu/styled";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import {
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
    FieldCounter,
    FieldError,
    FieldMeta,
    PdvLayout,
    PdvMain,
    PdvSidebar,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    StepCard,
    StepHeader,
    StepList,
    StepMain,
    StepNumber,
    StepText,
    StepTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    SwitchList,
    SwitchMain,
    SwitchRow,
    SwitchText,
    SwitchTitle,
    ToggleButton,
    TypeCard,
    TypeGrid,
    TypeIcon,
    TypeText,
    TypeTitle,
} from "./styled";

const SECTION_ITEMS = [
    { key: "type", label: "Origem", iconToken: "integration" },
    { key: "connection", label: "Conexao", iconToken: "settings" },
    { key: "policy", label: "Politica", iconToken: "users" },
    { key: "steps", label: "Implantacao", iconToken: "support" },
];

export default function DashboardPDVIntegration() {
    const [activeSection, setActiveSection] = useState("type");
    const {
        loading,
        header,
        actions,
        form,
        validation,
        statusCard,
        summaryItems,
        policyRows,
        steps,
        typeOptions,
        syncIntervalOptions,
        policy,
        applyPatch,
        handleTogglePolicy,
    } = useController();

    const sidebarGuide = useMemo(() => {
        if (activeSection === "connection") {
            return {
                title: "Conexao sob controle",
                text: "Esta etapa concentra endpoint, chave e cadencia automatica para deixar a base pronta sem excesso de campos.",
                steps: [
                    {
                        title: "Preencha so o necessario",
                        text: "Evite manter credenciais e endpoints duplicados para cada tipo de origem configurado.",
                    },
                    {
                        title: "Valide antes de ativar",
                        text: "Salve e use a validacao de conexao para confirmar se a politica pode entrar em operacao.",
                    },
                ],
            };
        }

        if (activeSection === "policy") {
            return {
                title: "Politica por perfil",
                text: "A leitura de preco do PDV precisa seguir a governanca da operacao para nao abrir edicoes indevidas.",
                steps: [
                    {
                        title: "Comece por admin e subadmin",
                        text: "Libere primeiro os perfis de gestao e depois expanda a visualizacao para o restante da equipe, se fizer sentido.",
                    },
                    {
                        title: "Proteja a escrita",
                        text: "Se o usuario comum nao pode editar preco, mantenha tambem a exposicao do valor sob controle.",
                    },
                ],
            };
        }

        if (activeSection === "steps") {
            return {
                title: "Implantacao orientada",
                text: "A sequencia lateral ajuda a manter o rollout tecnico alinhado com a operacao da loja.",
                steps: [
                    {
                        title: "Documente a origem",
                        text: "Registre onde a integracao le os dados e quem responde por esse ponto de manutencao.",
                    },
                    {
                        title: "Revise o historico recente",
                        text: "Use o status lateral para entender se as ultimas validacoes estao coerentes com a etapa atual.",
                    },
                ],
            };
        }

        return {
            title: "Escolha da origem",
            text: "O tipo selecionado define que campos tecnicos serao exigidos nas proximas etapas da configuracao.",
            steps: [
                {
                    title: "Prefira a fonte mais estavel",
                    text: "Se a operacao ja exporta arquivo consistente, comecar por CSV pode ser mais seguro do que API mal documentada.",
                },
                {
                    title: "Mantenha o modo none util",
                    text: "Quando ainda nao houver integracao homologada, deixar a politica desativada evita comportamento ambiguo no sistema.",
                },
            ],
        };
    }, [activeSection]);

    const content = useMemo(() => {
        if (activeSection === "connection") {
            return (
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Conexao</CatalogCardEyebrow>
                        <CatalogCardTitle>Endpoint, credenciais e sincronizacao</CatalogCardTitle>
                        <CatalogCardText>
                            Configure apenas o necessario para conectar o PDV sem sobrecarregar a operacao.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    <CatalogGrid>
                        <CatalogField $full>
                            <CatalogLabel>Endpoint, conexao ou caminho principal</CatalogLabel>
                            <CatalogInput
                                value={form.endpoint}
                                disabled={!policy.canConfigure || form.type === "none"}
                                placeholder={
                                    form.type === "api"
                                        ? "https://seu-pdv.exemplo.com/api/produtos"
                                        : form.type === "database"
                                            ? "mysql://usuario:senha@host:3306/base"
                                            : form.type === "csv"
                                                ? "\\\\servidor\\share\\export.csv"
                                                : "Selecione um tipo de integracao"
                                }
                                onChange={event => applyPatch({ endpoint: event.target.value })}
                            />
                            <FieldMeta>
                                <FieldError>{validation.errors.endpoint || ""}</FieldError>
                                <FieldCounter>{form.endpoint.length}/260</FieldCounter>
                            </FieldMeta>
                        </CatalogField>

                        <CatalogField>
                            <CatalogLabel>Token / chave de API</CatalogLabel>
                            <CatalogInput
                                type="password"
                                value={form.apiKey}
                                disabled={!policy.canConfigure || form.type !== "api"}
                                placeholder="Preencha apenas quando a origem exigir autenticacao"
                                onChange={event => applyPatch({ apiKey: event.target.value })}
                            />
                            <FieldMeta>
                                <FieldError />
                                <FieldCounter>{form.apiKey ? "Valor protegido" : "Opcional"}</FieldCounter>
                            </FieldMeta>
                        </CatalogField>

                        <CatalogField>
                            <CatalogLabel>Intervalo automatico</CatalogLabel>
                            <CatalogSelect
                                value={form.syncInterval}
                                disabled={!policy.canConfigure || !form.autoSync || form.type === "none"}
                                onChange={event => applyPatch({ syncInterval: Number(event.target.value) })}
                            >
                                {syncIntervalOptions.map(item => (
                                    <option key={item.value} value={item.value}>{item.label}</option>
                                ))}
                            </CatalogSelect>
                            <FieldMeta>
                                <FieldError>{validation.errors.syncInterval || ""}</FieldError>
                                <FieldCounter>{form.autoSync ? "Ativo" : "Desligado"}</FieldCounter>
                            </FieldMeta>
                        </CatalogField>
                    </CatalogGrid>

                    <SwitchList>
                        <SwitchRow>
                            <SwitchMain>
                                <SwitchTitle>Integracao ativa</SwitchTitle>
                                <SwitchText>Liga ou desliga a politica PDV para o restante do sistema.</SwitchText>
                            </SwitchMain>
                            <ToggleButton
                                $active={form.active}
                                disabled={!policy.canConfigure || form.type === "none"}
                                onClick={() => {
                                    if (!policy.canConfigure || form.type === "none") return;
                                    applyPatch({ active: !form.active });
                                }}
                            />
                        </SwitchRow>

                        <SwitchRow $last>
                            <SwitchMain>
                                <SwitchTitle>Sincronizacao automatica</SwitchTitle>
                                <SwitchText>Agenda atualizacoes periodicas quando houver infraestrutura disponivel.</SwitchText>
                            </SwitchMain>
                            <ToggleButton
                                $active={form.autoSync}
                                disabled={!policy.canConfigure || form.type === "none"}
                                onClick={() => {
                                    if (!policy.canConfigure || form.type === "none") return;
                                    applyPatch({ autoSync: !form.autoSync });
                                }}
                            />
                        </SwitchRow>
                    </SwitchList>
                </CatalogCard>
            );
        }

        if (activeSection === "policy") {
            return (
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Politica</CatalogCardEyebrow>
                        <CatalogCardTitle>Como cada perfil usa o preco do PDV</CatalogCardTitle>
                        <CatalogCardText>
                            Defina quem pode visualizar, pre-preencher ou editar precos vindos da integracao.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    <SwitchList>
                        {policyRows.map((item, index) => (
                            <SwitchRow key={item.key} $disabled={item.disabled} $last={index === policyRows.length - 1}>
                                <SwitchMain>
                                    <SwitchTitle>{item.label}</SwitchTitle>
                                    <SwitchText>{item.description}</SwitchText>
                                </SwitchMain>
                                <ToggleButton
                                    $active={item.active}
                                    disabled={item.disabled}
                                    onClick={() => {
                                        if (item.disabled) return;
                                        handleTogglePolicy(item.key);
                                    }}
                                />
                            </SwitchRow>
                        ))}
                    </SwitchList>
                </CatalogCard>
            );
        }

        if (activeSection === "steps") {
            return (
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Implantacao</CatalogCardEyebrow>
                        <CatalogCardTitle>Passo a passo recomendado</CatalogCardTitle>
                        <CatalogCardText>
                            Use esta sequencia para ativar a integracao com previsibilidade tecnica e operacional.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    <StepList>
                        {steps.map((item, index) => (
                            <StepCard key={item.title}>
                                <StepHeader>
                                    <StepNumber>{index + 1}</StepNumber>
                                    <StepMain>
                                        <StepTitle>{item.title}</StepTitle>
                                        <StepText>{item.text}</StepText>
                                    </StepMain>
                                </StepHeader>
                            </StepCard>
                        ))}
                    </StepList>
                </CatalogCard>
            );
        }

        return (
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Integracao</CatalogCardEyebrow>
                    <CatalogCardTitle>Tipo de origem do PDV</CatalogCardTitle>
                    <CatalogCardText>
                        Defina de onde o SenaPrices deve ler produtos e precos quando a integracao estiver ativa.
                    </CatalogCardText>
                </CatalogCardHeader>

                {!policy.canConfigure ? (
                    <CatalogCardText>
                        Seu perfil visualiza esta configuracao em modo somente leitura.
                    </CatalogCardText>
                ) : null}

                <TypeGrid>
                    {typeOptions.map(item => (
                        <TypeCard
                            key={item.value}
                            $active={form.type === item.value}
                            disabled={!policy.canConfigure}
                            onClick={() => {
                                if (!policy.canConfigure) return;

                                applyPatch({
                                    type: item.value,
                                    active: item.value === "none" ? false : form.active,
                                });
                            }}
                        >
                            <TypeIcon src={item.icon} alt="" />
                            <TypeTitle $active={form.type === item.value}>{item.label}</TypeTitle>
                            <TypeText>{item.description}</TypeText>
                        </TypeCard>
                    ))}
                </TypeGrid>
            </CatalogCard>
        );
    }, [
        activeSection,
        applyPatch,
        form.active,
        form.apiKey,
        form.autoSync,
        form.endpoint,
        form.syncInterval,
        form.type,
        handleTogglePolicy,
        policy.canConfigure,
        policyRows,
        steps,
        syncIntervalOptions,
        typeOptions,
        validation.errors.endpoint,
        validation.errors.syncInterval,
    ]);

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <SectionMenuLayout>
                    <DashboardSectionMenu
                        title="Integracao"
                        items={SECTION_ITEMS}
                        activeKey={activeSection}
                        onChange={setActiveSection}
                    />

                    <SectionMenuContent>
                        <PdvLayout>
                            <PdvMain>{content}</PdvMain>

                            <PdvSidebar>
                                <StatusCard $tone={statusCard.tone}>
                                    <StatusBadge $tone={statusCard.tone}>
                                        {statusCard.tone === "green" ? "Operando" : "Revisao"}
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
                                    <CatalogCardEyebrow>Orientacao</CatalogCardEyebrow>
                                    <CatalogCardTitle>{sidebarGuide.title}</CatalogCardTitle>
                                    <CatalogCardText>{sidebarGuide.text}</CatalogCardText>

                                    <StepList>
                                        {sidebarGuide.steps.map((item, index) => (
                                            <StepCard key={item.title}>
                                                <StepHeader>
                                                    <StepNumber>{index + 1}</StepNumber>
                                                    <StepMain>
                                                        <StepTitle>{item.title}</StepTitle>
                                                        <StepText>{item.text}</StepText>
                                                    </StepMain>
                                                </StepHeader>
                                            </StepCard>
                                        ))}
                                    </StepList>
                                </CatalogCard>
                            </PdvSidebar>
                        </PdvLayout>
                    </SectionMenuContent>
                </SectionMenuLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
