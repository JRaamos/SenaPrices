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
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    DatasetColumns,
    DatasetMetaCard,
    DatasetMetaGrid,
    DatasetMetaLabel,
    DatasetMetaValue,
    Dropzone,
    DropzoneMeta,
    DropzoneText,
    DropzoneTitle,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    ImportCell,
    ImportCellText,
    ImportCellTitle,
    ImportLayout,
    ImportMain,
    ImportMessage,
    ImportSidebar,
    ImportTable,
    ImportTableHeader,
    ImportTableHeaderCell,
    ImportTableRow,
    InlineNotice,
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
    WarningItem,
    WarningList,
    ColumnBadge,
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
        statusCard,
        summaryItems,
        lastImportResult,
        guidelines,
        handleFileAccepted,
        applyMappingPatch,
        setConflictMode,
    } = useController();

    const previewRows = importPlan.previewRows || [];
    const missingRequiredMappings = mappingSummary.requiredMissing || [];
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

                <ImportLayout>
                    <ImportMain>
                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Entrada</CatalogCardEyebrow>
                                <CatalogCardTitle>Importacao da base de itens</CatalogCardTitle>
                                <CatalogCardText>
                                    Esta tela alimenta a mesma base ja usada por cadastro, listagem e criacao de preco. Importe com revisao e estrategia de conflito bem definida.
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
                                    Arraste o arquivo para esta area ou clique para selecionar. O preview sempre passa por mapeamento e validacao antes de gravar qualquer linha no catalogo.
                                </DropzoneText>
                                <DropzoneMeta>
                                    <MetaBadge $tone="blue">CSV</MetaBadge>
                                    <MetaBadge $tone="blue">XLSX</MetaBadge>
                                    <MetaBadge $tone="neutral">TXT delimitado</MetaBadge>
                                </DropzoneMeta>
                            </Dropzone>

                            <InlineNotice>
                                Arquivos importados aqui nunca pulam a validacao do catalogo. EAN, codigo interno e descricao principal continuam protegidos pelas mesmas regras ja adotadas no cadastro manual.
                            </InlineNotice>

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
                                    <DatasetMetaLabel>Linhas validas no arquivo</DatasetMetaLabel>
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
                                    Confirme como cada coluna do arquivo entra na estrutura do catalogo. Isso evita importacao parcial, ambigua ou dificil de manter depois.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!dataset ? (
                                <InlineNotice>
                                    Carregue um arquivo para liberar o mapeamento automatico e revisar os campos antes da carga.
                                </InlineNotice>
                            ) : null}

                            {missingRequiredMappings.length ? (
                                <ErrorSummary>
                                    <ErrorSummaryTitle>Campos obrigatorios sem origem</ErrorSummaryTitle>
                                    {missingRequiredMappings.map(field => (
                                        <ErrorSummaryItem key={field.key}>
                                            {field.label} ainda nao foi mapeado para nenhuma coluna do arquivo.
                                        </ErrorSummaryItem>
                                    ))}
                                </ErrorSummary>
                            ) : null}

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

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Preview</CatalogCardEyebrow>
                                <CatalogCardTitle>Plano de importacao</CatalogCardTitle>
                                <CatalogCardText>
                                    O sistema simula cada linha contra a base atual antes de escrever no catalogo. Assim evitamos surpresas e mantemos a operacao rastreavel.
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!dataset ? (
                                <InlineNotice>
                                    Quando um arquivo for carregado, esta area vai mostrar o que sera criado, atualizado, ignorado ou bloqueado.
                                </InlineNotice>
                            ) : null}

                            <DropzoneMeta>
                                {importCounters.map(item => (
                                    <MetaBadge key={item.label} $tone={item.tone}>{item.label}: {item.value}</MetaBadge>
                                ))}
                            </DropzoneMeta>

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
                                                        <WarningList>
                                                            {row.warnings.map(warning => (
                                                                <WarningItem key={`${row.id}-${warning}`}>{warning}</WarningItem>
                                                            ))}
                                                        </WarningList>
                                                    ) : null}
                                                </ImportCell>
                                            </ImportTableRow>
                                        );
                                    })}
                                </ImportTable>
                            )}

                            {dataset?.rows?.length > previewRows.length ? (
                                <InlineNotice>
                                    O preview mostra as primeiras {previewRows.length} linha(s) para manter a leitura objetiva. O processamento final continua considerando o arquivo completo.
                                </InlineNotice>
                            ) : null}
                        </CatalogCard>
                    </ImportMain>

                    <ImportSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Pronto" : "Revisao"}
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

                        {lastImportResult ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Resultado</CatalogCardEyebrow>
                                    <CatalogCardTitle>Ultima importacao</CatalogCardTitle>
                                    <CatalogCardText>
                                        Resumo persistido da ultima carga processada nesta sessao.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <ResultList>
                                    <ResultItem>Criados: {lastImportResult.created}</ResultItem>
                                    <ResultItem>Atualizados: {lastImportResult.updated}</ResultItem>
                                    <ResultItem>Ignorados: {lastImportResult.skipped}</ResultItem>
                                    <ResultItem $tone={lastImportResult.invalid ? "danger" : "neutral"}>
                                        Pendencias: {lastImportResult.invalid}
                                    </ResultItem>
                                </ResultList>

                                {lastImportResult.errors?.length ? (
                                    <ErrorSummary>
                                        <ErrorSummaryTitle>Falhas registradas</ErrorSummaryTitle>
                                        {lastImportResult.errors.map(item => (
                                            <ErrorSummaryItem key={item}>{item}</ErrorSummaryItem>
                                        ))}
                                    </ErrorSummary>
                                ) : null}
                            </CatalogCard>
                        ) : null}

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Checklist</CatalogCardEyebrow>
                                <CatalogCardTitle>Boas praticas da carga</CatalogCardTitle>
                                <CatalogCardText>
                                    O objetivo aqui e manter a base central consistente para que os proximos modulos se comuniquem sem retrabalho.
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
                    </ImportSidebar>
                </ImportLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
