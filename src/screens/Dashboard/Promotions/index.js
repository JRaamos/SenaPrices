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
    EmptyState,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineNotice,
    MetaBadge,
    OrderActionButton,
    OrderActions,
    OrderCard,
    OrderDetail,
    OrderDetailLabel,
    OrderDetailValue,
    OrderDetails,
    OrderHeader,
    OrderList,
    OrderText,
    OrderTitle,
    PromotionsLayout,
    PromotionsMain,
    PromotionsSidebar,
    RecentButton,
    RecentHeader,
    RecentItem,
    RecentList,
    RecentMeta,
    RecentTitle,
    RecipientButton,
    RecipientList,
    SelectionHeader,
    SelectionList,
    SelectionMarker,
    SelectionMeta,
    SelectionRow,
    SelectionText,
    SelectionTitle,
    SelectionToolbar,
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
} from "./styled";

function getOrderStatusTone(order) {
    if (order?.isExpired) return "neutral";
    if (order?.isUpcoming) return "blue";
    return "green";
}

export default function DashboardPromotions() {
    const {
        loading,
        canManage,
        header,
        actions,
        form,
        validation,
        statusCard,
        summaryItems,
        recentOrders,
        orders,
        archivedOrders,
        availableSources,
        assignableUsers,
        guidelines,
        sourceOptions,
        paperSizeOptions,
        orientationOptions,
        selectionSearch,
        selectionSource,
        setSelectionSearch,
        setSelectionSource,
        applyPatch,
        handleToggleEntry,
        handleToggleAssignedUser,
        handleUseOrderAsTemplate,
        handlePrintOrder,
        handleDeleteOrder,
    } = useController();

    return (
        <ContainerAuthenticated actions={actions} loading={loading}>
            <PageContent>
                <PageHeader header={header} loading={loading} />
                <FormSpacer />

                <PromotionsLayout>
                    <PromotionsMain>
                        {canManage ? (
                            <>
                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Nova promocao</CatalogCardEyebrow>
                                        <CatalogCardTitle>Promocoes programadas</CatalogCardTitle>
                                        <CatalogCardText>
                                            Crie campanhas, atribua aos usuarios responsaveis e controle a vigencia da fila.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    {validation.errorList.length ? (
                                        <ErrorSummary>
                                            <ErrorSummaryTitle>Revisar antes de enviar</ErrorSummaryTitle>
                                            {validation.errorList.map(error => (
                                                <ErrorSummaryItem key={error}>{error}</ErrorSummaryItem>
                                            ))}
                                        </ErrorSummary>
                                    ) : null}

                                    {validation.warnings.length ? (
                                        <WarningList>
                                            {validation.warnings.map(item => (
                                                <WarningItem key={item}>{item}</WarningItem>
                                            ))}
                                        </WarningList>
                                    ) : null}

                                    <InlineNotice>
                                        {`${form.selectedEntryIds.length} registro(s) escolhidos para ${form.assignedUserIds.length} usuario(s). Monte a fila aqui e use a acao superior para efetivar a promocao.`}
                                    </InlineNotice>

                                    <CatalogGrid>
                                        <CatalogField $full>
                                            <CatalogLabel>Nome da promocao</CatalogLabel>
                                            <CatalogInput
                                                value={form.name}
                                                maxLength={80}
                                                placeholder="Ex: Ofertas do fim de semana"
                                                onChange={event => applyPatch({ name: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError>{validation.errors.name || ""}</FieldError>
                                                <FieldCounter>{form.name.length}/80</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField $full>
                                            <CatalogLabel>Descricao da oferta programada</CatalogLabel>
                                            <CatalogInput
                                                value={form.description}
                                                maxLength={200}
                                                placeholder="Ex: Campanha liberada para reposicao entre sexta e domingo"
                                                onChange={event => applyPatch({ description: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter>{form.description.length}/200</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Data inicial</CatalogLabel>
                                            <CatalogInput
                                                type="date"
                                                value={form.validFrom}
                                                onChange={event => applyPatch({ validFrom: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter />
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Data final</CatalogLabel>
                                            <CatalogInput
                                                type="date"
                                                value={form.validTo}
                                                onChange={event => applyPatch({ validTo: event.target.value })}
                                            />
                                            <FieldMeta>
                                                <FieldError>{validation.errors.validTo || ""}</FieldError>
                                                <FieldCounter />
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Tamanho base</CatalogLabel>
                                            <CatalogSelect
                                                value={form.paperSize}
                                                onChange={event => applyPatch({ paperSize: event.target.value })}
                                            >
                                                {paperSizeOptions.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </CatalogSelect>
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter />
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Orientacao base</CatalogLabel>
                                            <CatalogSelect
                                                value={form.orientation}
                                                onChange={event => applyPatch({ orientation: event.target.value })}
                                            >
                                                {orientationOptions.map(option => (
                                                    <option key={option.value} value={option.value}>{option.label}</option>
                                                ))}
                                            </CatalogSelect>
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter />
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField $full>
                                            <CatalogLabel>Usuarios destinatarios</CatalogLabel>
                                            {!assignableUsers.length ? (
                                                <EmptyState>Nenhum usuario elegivel foi encontrado para receber a campanha.</EmptyState>
                                            ) : (
                                                <RecipientList>
                                                    {assignableUsers.map(item => (
                                                        <RecipientButton
                                                            key={item.id}
                                                            $selected={form.assignedUserIds.includes(item.id)}
                                                            onClick={() => handleToggleAssignedUser(item.id)}
                                                        >
                                                            {item.email ? `${item.name} - ${item.email}` : item.name}
                                                        </RecipientButton>
                                                    ))}
                                                </RecipientList>
                                            )}
                                            <FieldMeta>
                                                <FieldError>{validation.errors.assignedUserIds || ""}</FieldError>
                                                <FieldCounter>{form.assignedUserIds.length} selecionado(s)</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>
                                    </CatalogGrid>
                                </CatalogCard>

                                <CatalogCard>
                                    <CatalogCardHeader>
                                        <CatalogCardEyebrow>Selecao</CatalogCardEyebrow>
                                        <CatalogCardTitle>Cartazes disponiveis no historico</CatalogCardTitle>
                                        <CatalogCardText>
                                            Escolha os registros que entram na campanha e serao enviados para a fila.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    <SelectionToolbar>
                                        <CatalogField>
                                            <CatalogLabel>Buscar no historico</CatalogLabel>
                                            <CatalogInput
                                                value={selectionSearch}
                                                placeholder="Buscar por titulo, oferta ou resumo"
                                                onChange={event => setSelectionSearch(event.target.value)}
                                            />
                                            <FieldMeta>
                                                <FieldError>{validation.errors.selectedEntryIds || ""}</FieldError>
                                                <FieldCounter>{form.selectedEntryIds.length} selecionado(s)</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>

                                        <CatalogField>
                                            <CatalogLabel>Fonte</CatalogLabel>
                                            <CatalogSelect
                                                value={selectionSource}
                                                onChange={event => setSelectionSource(event.target.value)}
                                            >
                                                {sourceOptions.map(option => (
                                                    <option key={option.value || "all"} value={option.value}>{option.label}</option>
                                                ))}
                                            </CatalogSelect>
                                            <FieldMeta>
                                                <FieldError />
                                                <FieldCounter>{availableSources.length} disponivel(is)</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>
                                    </SelectionToolbar>

                                    {!availableSources.length ? (
                                        <EmptyState>Nenhum registro do historico foi encontrado com os filtros atuais.</EmptyState>
                                    ) : (
                                        <SelectionList>
                                            {availableSources.map(entry => (
                                                <SelectionRow
                                                    key={entry.id}
                                                    $selected={entry.isSelected}
                                                    onClick={() => handleToggleEntry(entry.id)}
                                                >
                                                    <SelectionHeader>
                                                        <div>
                                                            <SelectionTitle>{entry.title}</SelectionTitle>
                                                            <SelectionText>{entry.summaryLabel || entry.offerTitle || "Registro sem resumo adicional"}</SelectionText>
                                                        </div>
                                                        <SelectionMarker $selected={entry.isSelected} />
                                                    </SelectionHeader>

                                                    <SelectionMeta>
                                                        <MetaBadge $tone="blue">{entry.sourceLabel}</MetaBadge>
                                                        <MetaBadge>{entry.cardsLabel}</MetaBadge>
                                                        <MetaBadge>{entry.paperLabel || "--"}</MetaBadge>
                                                        <MetaBadge $tone={entry.printedAt ? "green" : "neutral"}>
                                                            {entry.printedAt ? "Impresso" : "Salvo"}
                                                        </MetaBadge>
                                                        <MetaBadge>{entry.savedLabel}</MetaBadge>
                                                    </SelectionMeta>
                                                </SelectionRow>
                                            ))}
                                        </SelectionList>
                                    )}
                                </CatalogCard>
                            </>
                        ) : null}

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>{canManage ? "Fila ativa" : "Fila recebida"}</CatalogCardEyebrow>
                                <CatalogCardTitle>{canManage ? "Promocoes programadas" : "Cartazes enviados para voce"}</CatalogCardTitle>
                                <CatalogCardText>
                                    {canManage
                                        ? "Acompanhe campanhas preparadas, usuarios atribuidos e vigencia de cada cartaz."
                                        : "Consulte as promocoes recebidas e imprima o material liberado para o seu usuario."}
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!orders.length ? (
                                <EmptyState>
                                    {canManage
                                        ? "Nenhuma promocao foi criada ainda. Use o formulario acima para montar a primeira fila programada."
                                        : "Nenhuma promocao esta atribuida ao seu usuario neste momento."}
                                </EmptyState>
                            ) : (
                                <OrderList>
                                    {orders.map(order => (
                                        <OrderCard key={order.id} $expired={order.isExpired}>
                                            <OrderHeader>
                                                <div>
                                                    <OrderTitle>{order.name}</OrderTitle>
                                                    <OrderText>{order.description || "Sem descricao adicional"}</OrderText>
                                                    <SelectionMeta>
                                                        <MetaBadge $tone={getOrderStatusTone(order)}>{order.statusLabel}</MetaBadge>
                                                        <MetaBadge>{order.cardsLabel}</MetaBadge>
                                                        <MetaBadge>{order.sourceLabel}</MetaBadge>
                                                    </SelectionMeta>
                                                </div>

                                                <OrderActions>
                                                    {canManage ? (
                                                        <>
                                                            <OrderActionButton onClick={() => handleUseOrderAsTemplate(order)}>
                                                                Usar como base
                                                            </OrderActionButton>
                                                            <OrderActionButton onClick={() => handlePrintOrder(order)}>
                                                                Imprimir
                                                            </OrderActionButton>
                                                            <OrderActionButton $tone="danger" onClick={() => handleDeleteOrder(order)}>
                                                                Remover
                                                            </OrderActionButton>
                                                        </>
                                                    ) : (
                                                        <OrderActionButton onClick={() => handlePrintOrder(order)}>
                                                            Imprimir
                                                        </OrderActionButton>
                                                    )}
                                                </OrderActions>
                                            </OrderHeader>

                                            <OrderDetails>
                                                <OrderDetail>
                                                    <OrderDetailLabel>Descricao programada</OrderDetailLabel>
                                                    <OrderDetailValue>{order.description || "Sem descricao adicional"}</OrderDetailValue>
                                                </OrderDetail>
                                                <OrderDetail>
                                                    <OrderDetailLabel>Vigencia</OrderDetailLabel>
                                                    <OrderDetailValue>{order.periodLabel}</OrderDetailValue>
                                                </OrderDetail>
                                                <OrderDetail>
                                                    <OrderDetailLabel>{canManage ? "Destinatarios" : "Formato"}</OrderDetailLabel>
                                                    <OrderDetailValue>
                                                        {canManage
                                                            ? (order.assignedUserNames.join(", ") || `${order.assignedUserIds.length} usuario(s)`)
                                                            : (order.paperLabel || "--")}
                                                    </OrderDetailValue>
                                                </OrderDetail>
                                                <OrderDetail>
                                                    <OrderDetailLabel>{canManage ? "Origem" : "Origem dos cartazes"}</OrderDetailLabel>
                                                    <OrderDetailValue>{order.entryTitles.join(" - ") || "Sem titulos resolvidos"}</OrderDetailValue>
                                                </OrderDetail>
                                            </OrderDetails>
                                        </OrderCard>
                                    ))}
                                </OrderList>
                            )}
                        </CatalogCard>

                        {canManage && archivedOrders.length ? (
                            <CatalogCard>
                                <CatalogCardHeader>
                                    <CatalogCardEyebrow>Encerradas</CatalogCardEyebrow>
                                    <CatalogCardTitle>Promocoes fora da fila operacional</CatalogCardTitle>
                                    <CatalogCardText>
                                        Quando a vigencia termina, a campanha sai da fila dos usuarios e permanece apenas na visao administrativa.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <OrderList>
                                    {archivedOrders.map(order => (
                                        <OrderCard key={order.id} $expired>
                                            <OrderHeader>
                                                <div>
                                                    <OrderTitle>{order.name}</OrderTitle>
                                                    <OrderText>{order.description || "Sem descricao adicional"}</OrderText>
                                                    <SelectionMeta>
                                                        <MetaBadge>{order.statusLabel}</MetaBadge>
                                                        <MetaBadge>{order.cardsLabel}</MetaBadge>
                                                        <MetaBadge>{order.sourceLabel}</MetaBadge>
                                                    </SelectionMeta>
                                                </div>

                                                <OrderActions>
                                                    <OrderActionButton onClick={() => handleUseOrderAsTemplate(order)}>
                                                        Reaproveitar
                                                    </OrderActionButton>
                                                    <OrderActionButton $tone="danger" onClick={() => handleDeleteOrder(order)}>
                                                        Remover
                                                    </OrderActionButton>
                                                </OrderActions>
                                            </OrderHeader>
                                        </OrderCard>
                                    ))}
                                </OrderList>
                            </CatalogCard>
                        ) : null}
                    </PromotionsMain>

                    <PromotionsSidebar>
                        <StatusCard $tone={statusCard.tone}>
                            <StatusBadge $tone={statusCard.tone}>
                                {statusCard.tone === "green" ? "Ativa" : "Atencao"}
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

                        <InlineNotice>
                            {canManage
                                ? "Centralizar a impressao na fila promocional ajuda a manter vigencia, destinatarios e origem dos cartazes sob o mesmo controle."
                                : "As promocoes recebidas aqui ja foram preparadas pela administracao e podem ser impressas sem reconfigurar a base."}
                        </InlineNotice>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Ultimas promocoes</CatalogCardEyebrow>
                                <CatalogCardTitle>{canManage ? "Modelos reaproveitaveis" : "Fila pronta para voce"}</CatalogCardTitle>
                                <CatalogCardText>
                                    {canManage
                                        ? "Reutilize uma campanha recente como base para acelerar novas programacoes."
                                        : "Consulte rapidamente as campanhas ativas atribuidas ao seu usuario."}
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!recentOrders.length ? (
                                <CatalogCardText>
                                    Nenhuma promocao recente esta disponivel nesta visao.
                                </CatalogCardText>
                            ) : (
                                <RecentList>
                                    {recentOrders.map(order => (
                                        <RecentItem key={order.id}>
                                            <RecentHeader>
                                                <div>
                                                    <RecentTitle>{order.name}</RecentTitle>
                                                    <RecentMeta>{order.statusLabel} - {order.cardsLabel}</RecentMeta>
                                                </div>
                                                <RecentButton
                                                    onClick={() => (
                                                        canManage
                                                            ? handleUseOrderAsTemplate(order)
                                                            : handlePrintOrder(order)
                                                    )}
                                                >
                                                    {canManage ? "Usar base" : "Imprimir"}
                                                </RecentButton>
                                            </RecentHeader>
                                            <RecentMeta>{order.periodLabel}</RecentMeta>
                                            <RecentMeta>{order.entryTitles.join(" - ") || "Sem cartazes resolvidos"}</RecentMeta>
                                        </RecentItem>
                                    ))}
                                </RecentList>
                            )}
                        </CatalogCard>

                        <CatalogCard>
                            <CatalogCardHeader>
                                <CatalogCardEyebrow>Boas praticas</CatalogCardEyebrow>
                                <CatalogCardTitle>Disciplina da fila</CatalogCardTitle>
                                <CatalogCardText>
                                    A promocao programada funciona melhor quando a selecao, a vigencia e a impressao seguem a mesma regra operacional.
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
                    </PromotionsSidebar>
                </PromotionsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
