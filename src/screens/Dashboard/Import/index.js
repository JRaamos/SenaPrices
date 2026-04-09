import React, { useMemo, useRef, useState } from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PageHeader from "components/Dashboard/PageHeader";
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
} from "./styled";

export default function DashboardImport() {
    const fileInputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

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
            label: "Inválidas",
            value: `${importPlan.summary.invalid}`,
            tone: importPlan.summary.invalid ? "danger" : "neutral",
        },
    ]), [importPlan.summary.create, importPlan.summary.invalid, importPlan.summary.skip, importPlan.summary.update]);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileAccepted(file);
        }
        event.target.value = "";
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        const file = event.dataTransfer?.files?.[0];
        if (file) {
            handleFileAccepted(file);
        }
    };

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

                <ImportLayout $singleColumn>
                    <ImportMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Entrada</CatalogCardEyebrow>
                                <CatalogCardTitle>Importação da base de itens</CatalogCardTitle>
                                <CatalogCardText>
                                    Carregue um arquivo CSV ou XLSX para revisar o mapeamento antes de atualizar o catálogo.
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
                                    Arraste o arquivo para esta área ou clique para selecionar.
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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Mapeamento</CatalogCardEyebrow>
                                <CatalogCardTitle>Relacionamento das colunas</CatalogCardTitle>
                                <CatalogCardText>
                                    Defina como cada coluna entra na estrutura do catálogo antes de processar a carga.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <CatalogField>
                                <CatalogLabel>Estratégia de conflito</CatalogLabel>
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
                                        {mappingSummary.requiredMappedCount}/{mappingSummary.requiredCount} obrigatórios
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
                                                    ? "Campo obrigatório para gravar um item consistente no catálogo."
                                                    : "Campo opcional, mas importante para busca, filtro ou manutenção futura."}
                                            </MappingText>
                                        </div>

                                        <CatalogField>
                                            <CatalogLabel>Coluna do arquivo</CatalogLabel>
                                            <CatalogSelect
                                                value={mapping?.[field.key] || ""}
                                                onChange={event => applyMappingPatch({ [field.key]: event.target.value })}
                                                disabled={!dataset}
                                            >
                                                <option value="">Não mapear</option>
                                                {(dataset?.columns || []).map(column => (
                                                    <option key={column.key} value={column.key}>{column.label}</option>
                                                ))}
                                            </CatalogSelect>
                                            <FieldMeta>
                                                <FieldError>
                                                    {field.required && !mapping?.[field.key] ? "Obrigatório para importação." : ""}
                                                </FieldError>
                                                <FieldCounter>{field.required ? "Obrigatório" : "Opcional"}</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>
                                    </MappingRow>
                                ))}
                            </MappingGrid>
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Prévia</CatalogCardEyebrow>
                                <CatalogCardTitle>Plano de importação</CatalogCardTitle>
                                <CatalogCardText>
                                    Revise o que será criado, atualizado, ignorado ou bloqueado antes de confirmar a carga.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            <DropzoneMeta>
                                {importCounters.map(item => (
                                    <MetaBadge key={item.label} $tone={item.tone}>{item.label}: {item.value}</MetaBadge>
                                ))}
                            </DropzoneMeta>

                            {!dataset ? (
                                <CatalogCardText>Carregue um arquivo para visualizar o plano de importação.</CatalogCardText>
                            ) : null}

                            {!previewRows.length ? null : (
                                <ImportTable>
                                    <ImportTableHeader>
                                        <ImportTableHeaderCell>Linha</ImportTableHeaderCell>
                                        <ImportTableHeaderCell>Ação</ImportTableHeaderCell>
                                        <ImportTableHeaderCell>Descrição</ImportTableHeaderCell>
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
                                                    <ImportCellTitle>{row.values.description1 || "Sem descrição"}</ImportCellTitle>
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
                                                        <ImportMessage>{row.warnings.join(" • ")}</ImportMessage>
                                                    ) : null}
                                                </ImportCell>
                                            </ImportTableRow>
                                        );
                                    })}
                                </ImportTable>
                            )}
                        </CatalogCard>

                        {!lastImportResult ? null : (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Resultado</CatalogCardEyebrow>
                                    <CatalogCardTitle>Última importação</CatalogCardTitle>
                                    <CatalogCardText>
                                        Resumo persistido da última carga processada nesta sessão.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <ResultList>
                                    <ResultItem>Criados: {lastImportResult.created}</ResultItem>
                                    <ResultItem>Atualizados: {lastImportResult.updated}</ResultItem>
                                    <ResultItem>Ignorados: {lastImportResult.skipped}</ResultItem>
                                    <ResultItem $tone={lastImportResult.invalid ? "danger" : "neutral"}>
                                        Pendências: {lastImportResult.invalid}
                                    </ResultItem>
                                </ResultList>
                            </CatalogCard>
                        )}
                    </ImportMain>
                </ImportLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
