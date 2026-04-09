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

export default function DashboardPDVIntegration() {
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

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <PdvLayout>
                    <PdvMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Integração</CatalogCardEyebrow>
                                <CatalogCardTitle>Tipo de origem do PDV</CatalogCardTitle>
                                <CatalogCardText>
                                    Defina de onde o SenaPrices deve ler produtos e preços quando a integração estiver ativa.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!policy.canConfigure ? (
                                <CatalogCardText>
                                    Seu perfil visualiza esta configuração em modo somente leitura.
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Conexão</CatalogCardEyebrow>
                                <CatalogCardTitle>Endpoint, credenciais e sincronização</CatalogCardTitle>
                                <CatalogCardText>
                                    Configure apenas o necessário para conectar o PDV sem sobrecarregar a operação.
                                </CatalogCardText>
                            </CatalogCardHeader>

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
                                        <SwitchText>Agenda atualizações periódicas quando houver infraestrutura disponível.</SwitchText>
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
                                <CatalogCardTitle>Como cada perfil usa o preço do PDV</CatalogCardTitle>
                                <CatalogCardText>
                                    Defina quem pode visualizar, pré-preencher ou editar preços vindos da integração.
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Passo a passo</CatalogCardEyebrow>
                                <CatalogCardTitle>Implantação recomendada</CatalogCardTitle>
                                <CatalogCardText>
                                    Use esta sequência para ativar a integração com previsibilidade técnica e operacional.
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
                    </PdvSidebar>
                </PdvLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
