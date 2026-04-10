import React, { useMemo, useRef, useState } from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
import DashboardSectionMenu from "components/Dashboard/SectionMenu";
import { SectionMenuContent, SectionMenuLayout } from "components/Dashboard/SectionMenu/styled";
import { FormSpacer, PageContent } from "ui/styled";

import useController from "./controller";
import { getImportActionMeta } from "./helpers";
import {
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogLabel,
    CatalogSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    ColumnBadge,
    DatasetColumns,
    DatasetMetaCard,
    DatasetMetaGrid,
    DatasetMetaLabel,
    DatasetMetaValue,
    Dropzone,
    DropzoneMeta,
    DropzoneText,
    DropzoneTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    ImportCell,
    ImportCellText,
    ImportCellTitle,
    ImportLayout,
    ImportMain,
    ImportSidebar,
    ImportMessage,
    ImportTable,
    ImportTableHeader,
    ImportTableHeaderCell,
    ImportTableRow,
    MappingGrid,
    MappingRow,
    MappingText,
    MappingTitle,
    MetaBadge,
    ResultItem,
    ResultList,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "./styled";

const SECTION_ITEMS = [
    { key: "file", label: "Arquivo", iconToken: "import" },
    { key: "mapping", label: "Mapeamento", iconToken: "settings" },
    { key: "preview", label: "Previa", iconToken: "labels" },
    { key: "result", label: "Resultado", iconToken: "history" },
];

export default function DashboardImport() {
    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [activeSection, setActiveSection] = useState("file");

    const {
        loading,
        header,
        actions,
        dataset,
        mapping,
        mappingSummary,
        conflictMode,
        conflictOptions,
        targetFields,
        importPlan,
        lastImportResult,
        handleFileAccepted,
        applyMappingPatch,
        setConflictMode,
    } = useController();

    const previewRows = importPlan.previewRows || [];
    const importCounters = useMemo(() => ([
        {
            label: "Criar",
            value: `${importPlan.summary.create}`,
            tone: importPlan.summary.create ? "blue" : "neutral",
        },
        {
            label: "Atualizar",
            value: `${importPlan.summary.update}`,
            tone: importPlan.summary.update ? "green" : "neutral",
        },
        {
            label: "Ignorar",
            value: `${importPlan.summary.skip}`,
            tone: "neutral",
        },
        {
            label: "Invalidas",
            value: `${importPlan.summary.invalid}`,
            tone: importPlan.summary.invalid ? "danger" : "neutral",
        },
    ]), [importPlan.summary.create, importPlan.summary.invalid, importPlan.summary.skip, importPlan.summary.update]);

    const sidebarStatus = useMemo(() => {
        if (activeSection === "mapping") {
            return {
                tone: mappingSummary.requiredMissing.length ? "orange" : "green",
                badge: mappingSummary.requiredMissing.length ? "Ajuste" : "Pronto",
                title: "Cobertura do mapeamento",
                description: "Confira se os campos obrigatorios ja estao ligados antes de seguir para a previa.",
                items: [
                    { label: "Mapeados", value: `${mappingSummary.mappedCount}/${mappingSummary.totalCount}` },
                    { label: "Obrigatorios", value: `${mappingSummary.requiredMappedCount}/${mappingSummary.requiredCount}` },
                    { label: "Conflito", value: conflictOptions.find(option => option.value === conflictMode)?.label || "--" },
                    { label: "Linhas prontas", value: `${readyRowsCount}` },
                ],
            };
        }

        if (activeSection === "preview") {
            return {
                tone: importPlan.canImport ? "green" : "orange",
                badge: importPlan.canImport ? "Validado" : "Revisao",
                title: "Resultado previsto",
                description: "Acompanhe o impacto da carga antes de escrever no catalogo.",
                items: importCounters.map(item => ({
                    label: item.label,
                    value: item.value,
                })),
            };
        }

        if (activeSection === "result") {
            return {
                tone: lastImportResult && !lastImportResult.invalid ? "green" : "orange",
                badge: lastImportResult ? "Sessao" : "Aguardando",
                title: "Ultima execucao",
                description: "Resumo persistido da ultima carga concluida nesta sessao autenticada.",
                items: [
                    { label: "Criados", value: `${lastImportResult?.created || 0}` },
                    { label: "Atualizados", value: `${lastImportResult?.updated || 0}` },
                    { label: "Ignorados", value: `${lastImportResult?.skipped || 0}` },
                    { label: "Pendencias", value: `${lastImportResult?.invalid || 0}` },
                ],
            };
        }

        return {
            tone: dataset ? "green" : "orange",
            badge: dataset ? "Arquivo pronto" : "Entrada",
            title: "Leitura da base",
            description: "A sessao de importacao mostra o arquivo ativo e o volume inicial antes do mapeamento.",
            items: [
                { label: "Arquivo", value: dataset?.fileName || "Nao carregado" },
                { label: "Linhas", value: `${dataset?.rows?.length || 0}` },
                { label: "Colunas", value: `${dataset?.columns?.length || 0}` },
                { label: "Catalogo atual", value: `${dataset ? "Pronto para revisar" : "Aguardando arquivo"}` },
            ],
        };
    }, [
        activeSection,
        conflictMode,
        conflictOptions,
        dataset,
        importCounters,
        importPlan.canImport,
        lastImportResult,
        mappingSummary.mappedCount,
        mappingSummary.requiredCount,
        mappingSummary.requiredMappedCount,
        mappingSummary.requiredMissing.length,
        mappingSummary.totalCount,
        readyRowsCount,
    ]);

    const sidebarChecklist = useMemo(() => {
        if (activeSection === "mapping") {
            return [
                {
                    title: "Priorize identificadores",
                    text: "Mapeie codigo interno e EAN sempre que existirem para reduzir duplicidade e facilitar conciliacao futura.",
                },
                {
                    title: "Feche os obrigatorios",
                    text: "Descricao principal e unidade precisam estar cobertos antes de validar a previa final.",
                },
            ];
        }

        if (activeSection === "preview") {
            return [
                {
                    title: "Revise linhas invalidas",
                    text: "Tudo que aparecer como pendencia deve ser corrigido antes da escrita definitiva no catalogo.",
                },
                {
                    title: "Confirme a estrategia",
                    text: "Cheque se criar, atualizar ou ignorar esta coerente com a politica de conflito escolhida.",
                },
            ];
        }

        if (activeSection === "result") {
            return [
                {
                    title: "Leia o saldo da sessao",
                    text: "Use o resumo para entender se houve criacao, atualizacao ou residuos que exigem nova rodada.",
                },
                {
                    title: "Prepare a proxima carga",
                    text: "Se necessario, volte para o arquivo, limpe a sessao e inicie outro ciclo com os ajustes feitos.",
                },
            ];
        }

        return [
            {
                title: "Use o modelo oficial",
                text: "Baixar o CSV ou XLSX do sistema reduz erro de cabecalho e agiliza o mapeamento automatico.",
            },
            {
                title: "Suba o arquivo mais limpo possivel",
                text: "Quanto melhor vierem descricao, unidade e identificadores, menor o retrabalho nas etapas seguintes.",
            },
        ];
    }, [activeSection]);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileAccepted(file);
            setActiveSection("mapping");
        }
        event.target.value = "";
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        const file = event.dataTransfer?.files?.[0];
        if (file) {
            handleFileAccepted(file);
            setActiveSection("mapping");
        }
    };

    const content = useMemo(() => {
        if (activeSection === "mapping") {
            return (
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Mapeamento</CatalogCardEyebrow>
                        <CatalogCardTitle>Relacionamento das colunas</CatalogCardTitle>
                        <CatalogCardText>
                            Defina como cada coluna entra na estrutura do catalogo antes de processar a carga.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    <CatalogField>
                        <CatalogLabel>Estrategia de conflito</CatalogLabel>
                        <CatalogSelect
                            value={conflictMode}
                            onChange={event => setConflictMode(event.target.value)}
                        >
                            {conflictOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </CatalogSelect>
                        <FieldMeta>
                            <FieldError>
                                {conflictOptions.find(option => option.value === conflictMode)?.helper || ""}
                            </FieldError>
                            <FieldCounter>
                                {mappingSummary.requiredMappedCount}/{mappingSummary.requiredCount} obrigatorios
                            </FieldCounter>
                        </FieldMeta>
                    </CatalogField>

                    <MappingGrid>
                        {targetFields.map(field => (
                            <MappingRow
                                key={field.key}
                                $required={field.required}
                                $mapped={!!mapping?.[field.key]}
                            >
                                <div>
                                    <MappingTitle>{field.label}</MappingTitle>
                                    <MappingText>
                                        {field.required
                                            ? "Campo obrigatorio para gravar um item consistente no catalogo."
                                            : "Campo opcional, mas importante para busca, filtro ou manutencao futura."}
                                    </MappingText>
                                </div>

                                <CatalogField>
                                    <CatalogLabel>Coluna do arquivo</CatalogLabel>
                                    <CatalogSelect
                                        value={mapping?.[field.key] || ""}
                                        onChange={event => applyMappingPatch({ [field.key]: event.target.value })}
                                        disabled={!dataset}
                                    >
                                        <option value="">Nao mapear</option>
                                        {(dataset?.columns || []).map(column => (
                                            <option key={column.key} value={column.key}>{column.label}</option>
                                        ))}
                                    </CatalogSelect>
                                    <FieldMeta>
                                        <FieldError>
                                            {field.required && !mapping?.[field.key] ? "Obrigatorio para importacao." : ""}
                                        </FieldError>
                                        <FieldCounter>{field.required ? "Obrigatorio" : "Opcional"}</FieldCounter>
                                    </FieldMeta>
                                </CatalogField>
                            </MappingRow>
                        ))}
                    </MappingGrid>
                </CatalogCard>
            );
        }

        if (activeSection === "preview") {
            return (
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Previa</CatalogCardEyebrow>
                        <CatalogCardTitle>Plano de importacao</CatalogCardTitle>
                        <CatalogCardText>
                            Revise o que sera criado, atualizado, ignorado ou bloqueado antes de confirmar a carga.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    <DropzoneMeta>
                        {importCounters.map(item => (
                            <MetaBadge key={item.label} $tone={item.tone}>{item.label}: {item.value}</MetaBadge>
                        ))}
                    </DropzoneMeta>

                    {!dataset ? (
                        <CatalogCardText>Carregue um arquivo para visualizar o plano de importacao.</CatalogCardText>
                    ) : null}

                    {!previewRows.length ? null : (
                        <ImportTable>
                            <ImportTableHeader>
                                <ImportTableHeaderCell>Linha</ImportTableHeaderCell>
                                <ImportTableHeaderCell>Acao</ImportTableHeaderCell>
                                <ImportTableHeaderCell>Descricao</ImportTableHeaderCell>
                                <ImportTableHeaderCell>Identificadores</ImportTableHeaderCell>
                                <ImportTableHeaderCell>Resultado</ImportTableHeaderCell>
                            </ImportTableHeader>

                            {previewRows.map(row => {
                                const actionMeta = getImportActionMeta(row.action);
                                const identifiers = [row.values.internalCode, row.values.ean13].filter(Boolean).join(" - ");

                                return (
                                    <ImportTableRow key={row.id} $tone={actionMeta.tone}>
                                        <ImportCell>
                                            <ImportCellTitle>#{row.lineNumber}</ImportCellTitle>
                                            <ImportCellText>Arquivo fonte</ImportCellText>
                                        </ImportCell>

                                        <ImportCell>
                                            <MetaBadge $tone={actionMeta.tone}>{actionMeta.label}</MetaBadge>
                                            <ImportCellText>{row.action}</ImportCellText>
                                        </ImportCell>

                                        <ImportCell>
                                            <ImportCellTitle>{row.values.description1 || "Sem descricao"}</ImportCellTitle>
                                            <ImportCellText>
                                                {[row.values.description2, row.values.description3, row.values.section].filter(Boolean).join(" - ") || "Sem complemento adicional"}
                                            </ImportCellText>
                                        </ImportCell>

                                        <ImportCell>
                                            <ImportCellText>{identifiers || "Sem identificadores"}</ImportCellText>
                                            <ImportCellText>Unidade {row.values.unit || "unidade"}</ImportCellText>
                                        </ImportCell>

                                            <ImportCell>
                                                <ImportMessage>{row.message}</ImportMessage>
                                                {row.warnings?.length ? (
                                                    <ImportMessage>{row.warnings.join(" - ")}</ImportMessage>
                                                ) : null}
                                            </ImportCell>
                                        </ImportTableRow>
                                    );
                                })}
                        </ImportTable>
                    )}
                </CatalogCard>
            );
        }

        if (activeSection === "result") {
            return (
                <CatalogCard>
                    <CatalogCardHeader>
                        <CatalogCardEyebrow>Resultado</CatalogCardEyebrow>
                        <CatalogCardTitle>Ultima importacao</CatalogCardTitle>
                        <CatalogCardText>
                            Resumo persistido da ultima carga processada nesta sessao.
                        </CatalogCardText>
                    </CatalogCardHeader>

                    {!lastImportResult ? (
                        <CatalogCardText>Nenhuma importacao foi concluida ainda nesta sessao.</CatalogCardText>
                    ) : (
                        <ResultList>
                            <ResultItem>Criados: {lastImportResult.created}</ResultItem>
                            <ResultItem>Atualizados: {lastImportResult.updated}</ResultItem>
                            <ResultItem>Ignorados: {lastImportResult.skipped}</ResultItem>
                            <ResultItem $tone={lastImportResult.invalid ? "danger" : "neutral"}>
                                Pendencias: {lastImportResult.invalid}
                            </ResultItem>
                        </ResultList>
                    )}
                </CatalogCard>
            );
        }

        return (
            <CatalogCard>
                <CatalogCardHeader>
                    <CatalogCardEyebrow>Entrada</CatalogCardEyebrow>
                    <CatalogCardTitle>Importacao da base de itens</CatalogCardTitle>
                    <CatalogCardText>
                        Carregue um arquivo CSV ou XLSX para revisar o mapeamento antes de atualizar o catalogo.
                    </CatalogCardText>
                </CatalogCardHeader>

                <Dropzone
                    $dragging={dragging}
                    onClick={openFilePicker}
                    onDragEnter={() => setDragging(true)}
                    onDragOver={event => {
                        event.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    <DropzoneTitle>
                        {dataset ? "Substituir arquivo atual" : "Carregar CSV ou XLSX"}
                    </DropzoneTitle>
                    <DropzoneText>
                        Arraste o arquivo para esta area ou clique para selecionar.
                    </DropzoneText>
                    <DropzoneMeta>
                        <MetaBadge $tone="blue">CSV</MetaBadge>
                        <MetaBadge $tone="blue">XLSX</MetaBadge>
                        <MetaBadge $tone="neutral">TXT delimitado</MetaBadge>
                    </DropzoneMeta>
                </Dropzone>

                <DatasetMetaGrid>
                    <DatasetMetaCard>
                        <DatasetMetaLabel>Arquivo atual</DatasetMetaLabel>
                        <DatasetMetaValue>{dataset?.fileName || "Nenhum arquivo carregado"}</DatasetMetaValue>
                    </DatasetMetaCard>
                    <DatasetMetaCard>
                        <DatasetMetaLabel>Colunas lidas</DatasetMetaLabel>
                        <DatasetMetaValue>{dataset?.columns?.length || 0}</DatasetMetaValue>
                    </DatasetMetaCard>
                    <DatasetMetaCard>
                        <DatasetMetaLabel>Linhas do arquivo</DatasetMetaLabel>
                        <DatasetMetaValue>{dataset?.rows?.length || 0}</DatasetMetaValue>
                    </DatasetMetaCard>
                </DatasetMetaGrid>

                {!dataset?.columns?.length ? null : (
                    <DatasetColumns>
                        {dataset.columns.map(column => (
                            <ColumnBadge key={column.key}>{column.label}</ColumnBadge>
                        ))}
                    </DatasetColumns>
                )}
            </CatalogCard>
        );
    }, [
        activeSection,
        applyMappingPatch,
        conflictMode,
        conflictOptions,
        dataset,
        dragging,
        handleFileAccepted,
        importCounters,
        lastImportResult,
        mapping,
        mappingSummary.requiredCount,
        mappingSummary.requiredMappedCount,
        previewRows,
        setConflictMode,
        targetFields,
    ]);

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt,.xlsx,.xls"
                    data-testid="import-file-input"
                    onChange={handleInputChange}
                    style={{ display: "none" }}
                />

                <SectionMenuLayout>
                    <DashboardSectionMenu
                        title="Importacao"
                        items={SECTION_ITEMS}
                        activeKey={activeSection}
                        onChange={setActiveSection}
                    />

                    <SectionMenuContent>
                        <ImportLayout>
                            <ImportMain>{content}</ImportMain>
                            <ImportSidebar>
                                <StatusCard $tone={sidebarStatus.tone}>
                                    <StatusBadge $tone={sidebarStatus.tone}>{sidebarStatus.badge}</StatusBadge>
                                    <StatusTitle>{sidebarStatus.title}</StatusTitle>
                                    <StatusText>{sidebarStatus.description}</StatusText>

                                    <SummaryGrid>
                                        {sidebarStatus.items.map(item => (
                                            <SummaryItem key={item.label}>
                                                <SummaryLabel>{item.label}</SummaryLabel>
                                                <SummaryValue>{item.value}</SummaryValue>
                                            </SummaryItem>
                                        ))}
                                    </SummaryGrid>
                                </StatusCard>

                                <CatalogCard>
                                    <CatalogCardEyebrow>Checklist</CatalogCardEyebrow>
                                    <CatalogCardTitle>Orientacao da etapa</CatalogCardTitle>
                                    <CatalogCardText>
                                        Cada fase da importacao agora tem um apoio lateral para manter o fluxo mais previsivel e proximo do restante do dashboard.
                                    </CatalogCardText>

                                    <ChecklistList>
                                        {sidebarChecklist.map(item => (
                                            <ChecklistItem key={item.title}>
                                                <ChecklistTitle>{item.title}</ChecklistTitle>
                                                <ChecklistText>{item.text}</ChecklistText>
                                            </ChecklistItem>
                                        ))}
                                    </ChecklistList>
                                </CatalogCard>
                            </ImportSidebar>
                        </ImportLayout>
                    </SectionMenuContent>
                </SectionMenuLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
