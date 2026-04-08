import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
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
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CodeBlock,
    CompatibilityGrid,
    CompatibilityItem,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    HistoryHeader,
    HistoryItem,
    HistoryList,
    HistoryMeta,
    HistoryTitle,
    InlineNotice,
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
    SyncBadge,
    ToggleButton,
    TypeCard,
    TypeGrid,
    TypeIcon,
    TypeText,
    TypeTitle,
} from "./styled";

export default function DashboardPDVIntegration() {
    const {
        loading,
        header,
        actions,
        form,
        validation,
        statusCard,
        summaryItems,
        typeSummary,
        policyRows,
        steps,
        recentSyncs,
        compatibilityOptions,
        guidelines,
        typeOptions,
        syncIntervalOptions,
        coverage,
        policy,
        applyPatch,
        handleTogglePolicy,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <PdvLayout>
                    <PdvMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Origem</CatalogCardEyebrow>
                                <CatalogCardTitle>Política de integração com PDV</CatalogCardTitle>
                                <CatalogCardText>
                                    Esta tela governa como o SenaPrices passa a consumir referência externa ou rastreada de preço sem quebrar catálogo, histórico e operação de loja.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!policy.canConfigure ? (
                                <InlineNotice>
                                    Você está vendo o status da integração em modo leitura. Apenas admin e subadmin podem alterar configuração, política por perfil e validação técnica.
                                </InlineNotice>
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
                                        <TypeIcon src={item.icon} alt={`${item.label}-icon`} />
                                        <TypeTitle $active={form.type === item.value}>{item.label}</TypeTitle>
                                        <TypeText>{item.description}</TypeText>
                                    </TypeCard>
                                ))}
                            </TypeGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Configuração</CatalogCardEyebrow>
                                <CatalogCardTitle>Conexão, frequência e visibilidade</CatalogCardTitle>
                                <CatalogCardText>
                                    O objetivo aqui é deixar a origem do PDV previsível, auditável e segura para os fluxos de criação de cartaz já ativos.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {validation.errorList.length ? (
                                <ErrorSummary>
                                    <ErrorSummaryTitle>Pendências da integração</ErrorSummaryTitle>
                                    {validation.errorList.map(item => (
                                        <ErrorSummaryItem key={item}>{item}</ErrorSummaryItem>
                                    ))}
                                </ErrorSummary>
                            ) : null}

                            <CatalogGrid>
                                <CatalogField $full>
                                    <CatalogLabel>Endpoint, conexão ou caminho principal</CatalogLabel>
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
                                                        : "Selecione um tipo de integração"
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
                                        placeholder="Preencha apenas quando a origem exigir autenticação"
                                        onChange={event => applyPatch({ apiKey: event.target.value })}
                                    />
                                    <FieldMeta>
                                        <FieldError />
                                        <FieldCounter>{form.apiKey ? "Valor protegido" : "Opcional"}</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>

                                <CatalogField>
                                    <CatalogLabel>Intervalo automático</CatalogLabel>
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
                                        <SwitchTitle>Integração ativa</SwitchTitle>
                                        <SwitchText>Liga ou desliga a política PDV para o restante do sistema.</SwitchText>
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
                                        <SwitchTitle>Sincronização automática</SwitchTitle>
                                        <SwitchText>Define se a rotina de integração deve rodar por agenda quando houver infraestrutura disponível.</SwitchText>
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Política</CatalogCardEyebrow>
                                <CatalogCardTitle>Governança por perfil</CatalogCardTitle>
                                <CatalogCardText>
                                    Defina como os preços sugeridos do PDV aparecem para a equipe e quanto de autonomia operacional cada perfil recebe.
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

                            <InlineNotice>
                                Com a política atual, admin e subadmin {form.showPdvPricesForAdmin ? "recebem" : "não recebem"} preço sugerido. Usuários comuns {form.allowUserPriceEdit ? "podem editar" : "ficam protegidos por bloqueio"} quando a integração estiver ativa.
                            </InlineNotice>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Implantação</CatalogCardEyebrow>
                                <CatalogCardTitle>Passo a passo recomendado</CatalogCardTitle>
                                <CatalogCardText>
                                    O fluxo abaixo foi pensado para implantar a integração sem criar dependência frágil entre navegador, infraestrutura e operação de loja.
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
                                        {item.code ? <CodeBlock>{item.code}</CodeBlock> : null}
                                    </StepCard>
                                ))}
                            </StepList>
                        </CatalogCard>
                    </PdvMain>

                    <PdvSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Operando" : "Revisão"}
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

                        {validation.warnings.length ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Alertas</CatalogCardEyebrow>
                                    <CatalogCardTitle>Ajustes recomendados</CatalogCardTitle>
                                    <CatalogCardText>
                                        A configuração pode estar utilizável, mas estes pontos ainda merecem atenção antes de depender dela em escala.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <ChecklistList>
                                    {validation.warnings.map(item => (
                                        <ChecklistItem key={item}>
                                            <ChecklistText>{item}</ChecklistText>
                                        </ChecklistItem>
                                    ))}
                                </ChecklistList>
                            </CatalogCard>
                        ) : null}

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Cobertura</CatalogCardEyebrow>
                                <CatalogCardTitle>Quanto a base atual aproveita</CatalogCardTitle>
                                <CatalogCardText>
                                    Este recorte mostra quanto do catálogo já consegue reaproveitar preço rastreado pelas telas que já implementamos.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <SummaryGrid>
                                <SummaryItem>
                                    <SummaryLabel>Itens no catálogo</SummaryLabel>
                                    <SummaryValue>{coverage.catalogItems}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Com identificador</SummaryLabel>
                                    <SummaryValue>{coverage.identifiedItems}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Com preço rastreado</SummaryLabel>
                                    <SummaryValue>{coverage.pricedItems}</SummaryValue>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryLabel>Cobertura</SummaryLabel>
                                    <SummaryValue>{coverage.coveragePercent}%</SummaryValue>
                                </SummaryItem>
                            </SummaryGrid>

                            <ChecklistList>
                                {typeSummary.map(item => (
                                    <ChecklistItem key={item.label}>
                                        <ChecklistTitle>{item.label}</ChecklistTitle>
                                        <ChecklistText>{item.value}</ChecklistText>
                                    </ChecklistItem>
                                ))}
                            </ChecklistList>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Validações</CatalogCardEyebrow>
                                <CatalogCardTitle>Últimos eventos da integração</CatalogCardTitle>
                                <CatalogCardText>
                                    Cada salvamento ou teste técnico deixa um rastro simples para apoiar manutenção e auditoria do ambiente.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentSyncs.length ? (
                                <InlineNotice>
                                    Assim que a integração for salva ou validada, o histórico operacional aparecerá aqui.
                                </InlineNotice>
                            ) : (
                                <HistoryList>
                                    {recentSyncs.map(item => (
                                        <HistoryItem key={item.id}>
                                            <HistoryHeader>
                                                <HistoryTitle>{item.message}</HistoryTitle>
                                                <SyncBadge $tone={item.tone}>{item.label}</SyncBadge>
                                            </HistoryHeader>
                                            <HistoryMeta>{item.details}</HistoryMeta>
                                            <HistoryMeta>{item.actor} • {item.createdLabel}</HistoryMeta>
                                        </HistoryItem>
                                    ))}
                                </HistoryList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Compatibilidade</CatalogCardEyebrow>
                                <CatalogCardTitle>Fontes normalmente integradas</CatalogCardTitle>
                                <CatalogCardText>
                                    A lista abaixo não substitui homologação, mas ajuda a orientar os cenários mais comuns de implantação.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CompatibilityGrid>
                                {compatibilityOptions.map(item => (
                                    <CompatibilityItem key={item}>{item}</CompatibilityItem>
                                ))}
                            </CompatibilityGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Boas práticas</CatalogCardEyebrow>
                                <CatalogCardTitle>Diretrizes da integração</CatalogCardTitle>
                                <CatalogCardText>
                                    O desenho desta tela já considera segurança, governança por perfil e manutenção futura da plataforma.
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
                    </PdvSidebar>
                </PdvLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
