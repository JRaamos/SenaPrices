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
    EmptyState,
    FieldCounter,
    FieldError,
    FieldMeta,
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
        orders,
        archivedOrders,
        availableSources,
        assignableUsers,
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
                                        <CatalogCardEyebrow>Nova promoção</CatalogCardEyebrow>
                                        <CatalogCardTitle>Promoções programadas</CatalogCardTitle>
                                        <CatalogCardText>
                                            Crie campanhas, atribua aos usuários responsáveis e controle a vigência da fila.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    <CatalogGrid>
                                        <CatalogField $full>
                                            <CatalogLabel>Nome da promoção</CatalogLabel>
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
                                            <CatalogLabel>Descrição da oferta programada</CatalogLabel>
                                            <CatalogInput
                                                value={form.description}
                                                maxLength={200}
                                                placeholder="Ex: Campanha liberada para reposição entre sexta e domingo"
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
                                            <CatalogLabel>Orientação base</CatalogLabel>
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
                                            <CatalogLabel>Usuários destinatários</CatalogLabel>
                                            {!assignableUsers.length ? (
                                                <EmptyState>Nenhum usuário elegível foi encontrado para receber a campanha.</EmptyState>
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
                                        <CatalogCardEyebrow>Seleção</CatalogCardEyebrow>
                                        <CatalogCardTitle>Cartazes disponíveis no histórico</CatalogCardTitle>
                                        <CatalogCardText>
                                            Escolha os registros que entram na campanha e serão enviados para a fila.
                                        </CatalogCardText>
                                    </CatalogCardHeader>

                                    <SelectionToolbar>
                                        <CatalogField>
                                            <CatalogLabel>Buscar no histórico</CatalogLabel>
                                            <CatalogInput
                                                value={selectionSearch}
                                                placeholder="Buscar por título, oferta ou resumo"
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
                                                <FieldCounter>{availableSources.length} disponível(is)</FieldCounter>
                                            </FieldMeta>
                                        </CatalogField>
                                    </SelectionToolbar>

                                    {!availableSources.length ? (
                                        <EmptyState>Nenhum registro do histórico foi encontrado com os filtros atuais.</EmptyState>
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
                                <CatalogCardTitle>{canManage ? "Promoções programadas" : "Cartazes enviados para você"}</CatalogCardTitle>
                                <CatalogCardText>
                                    {canManage
                                        ? "Acompanhe campanhas preparadas, usuários atribuídos e vigência de cada cartaz."
                                        : "Consulte as promoções recebidas, confirme a descrição programada e imprima o material liberado para o seu usuário."}
                                </CatalogCardText>
                            </CatalogCardHeader>

                            {!orders.length ? (
                                <EmptyState>
                                    {canManage
                                        ? "Nenhuma promoção foi criada ainda. Use o formulário acima para montar a primeira fila programada."
                                        : "Nenhuma promoção está atribuída ao seu usuário neste momento."}
                                </EmptyState>
                            ) : (
                                <OrderList>
                                    {orders.map(order => (
                                        <OrderCard key={order.id} $expired={order.isExpired}>
                                            <OrderHeader>
                                                <div>
                                                    <OrderTitle>{order.name}</OrderTitle>
                                                    <OrderText>{order.description || "Sem descrição adicional"}</OrderText>
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
                                                    <OrderDetailLabel>Descrição programada</OrderDetailLabel>
                                                    <OrderDetailValue>{order.description || "Sem descrição adicional"}</OrderDetailValue>
                                                </OrderDetail>
                                                <OrderDetail>
                                                    <OrderDetailLabel>Vigência</OrderDetailLabel>
                                                    <OrderDetailValue>{order.periodLabel}</OrderDetailValue>
                                                </OrderDetail>
                                                <OrderDetail>
                                                    <OrderDetailLabel>{canManage ? "Destinatários" : "Formato"}</OrderDetailLabel>
                                                    <OrderDetailValue>
                                                        {canManage
                                                            ? (order.assignedUserNames.join(", ") || `${order.assignedUserIds.length} usuário(s)`)
                                                            : (order.paperLabel || "--")}
                                                    </OrderDetailValue>
                                                </OrderDetail>
                                                <OrderDetail>
                                                    <OrderDetailLabel>{canManage ? "Origem" : "Origem dos cartazes"}</OrderDetailLabel>
                                                    <OrderDetailValue>{order.entryTitles.join(" - ") || "Sem títulos resolvidos"}</OrderDetailValue>
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
                                    <CatalogCardTitle>Promoções fora da fila operacional</CatalogCardTitle>
                                    <CatalogCardText>
                                        Quando a vigência termina, a campanha sai da fila dos usuários e permanece apenas na visão administrativa.
                                    </CatalogCardText>
                                </CatalogCardHeader>

                                <OrderList>
                                    {archivedOrders.map(order => (
                                        <OrderCard key={order.id} $expired>
                                            <OrderHeader>
                                                <div>
                                                    <OrderTitle>{order.name}</OrderTitle>
                                                    <OrderText>{order.description || "Sem descrição adicional"}</OrderText>
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
                                {statusCard.tone === "green" ? "Ativa" : "Atenção"}
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
                    </PromotionsSidebar>
                </PromotionsLayout>
            </PageContent>
        </ContainerAuthenticated>
    );
}
