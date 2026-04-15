import React from "react";

import Button from "components/Form/Button";
import Input from "components/Form/Input";
import ContainerAuthenticated from "containers/Authenticated";
import { Icon, PageContent } from "ui/styled";

import useController from "./controller";

import {
    PrintBatchPage,
    PrintBatchHeader,
    PrintBatchHeaderIcon,
    PrintBatchTitle,
    PrintBatchSubtitle,
    PrintBatchBody,
    PrintBatchMain,
    PrintBatchSearchRow,
    PrintBatchSelectAllButton,
    PrintBatchListCard,
    PrintBatchListEmpty,
    PrintBatchListItem,
    PrintBatchCheckbox,
    PrintBatchItemContent,
    PrintBatchItemTitle,
    PrintBatchItemMeta,
    PrintBatchItemTags,
    PrintBatchTypeBadge,
    PrintBatchSizeBadge,
    PrintBatchCode,
    PrintBatchAside,
    PrintBatchAsideCount,
    PrintBatchAsideActions,
    PrintBatchAsideHint,
    PrintBatchBottomBar,
    PrintBatchBottomCount,
    PrintBatchBottomActions,
} from "./styled";

export default function DashboardPrintBatch() {
    const {
        header,
        searchValue,
        setSearchValue,
        items,
        selectedIds,
        selectedCount,
        allVisibleSelected,
        toggleItem,
        toggleAllVisible,
        handlePreview,
        handlePromotions,
        handlePrint,
    } = useController();

    return (
        <ContainerAuthenticated plainContent>
            <PrintBatchPage>
                <PageContent>
                    <PrintBatchHeader>
                        <PrintBatchHeaderIcon>
                            <Icon icon="printer-red" nomargin />
                        </PrintBatchHeaderIcon>

                        <div>
                            <PrintBatchTitle>{header.title}</PrintBatchTitle>
                            <PrintBatchSubtitle>{header.subtitle}</PrintBatchSubtitle>
                        </div>
                    </PrintBatchHeader>

                    <PrintBatchBody>
                        <PrintBatchMain>
                            <PrintBatchSearchRow>
                                <Input
                                    value={searchValue}
                                    onChange={(event) => setSearchValue(event.target.value)}
                                    placeholder="Buscar preços..."
                                    icon="search"
                                    dense
                                    surface="white"
                                />

                                <PrintBatchSelectAllButton
                                    type="button"
                                    onClick={toggleAllVisible}
                                    disabled={!items.length}
                                >
                                    {allVisibleSelected ? "Limpar visíveis" : "Selecionar todos"}
                                </PrintBatchSelectAllButton>
                            </PrintBatchSearchRow>

                            <PrintBatchListCard>
                                {!items.length ? (
                                    <PrintBatchListEmpty>Nenhum cartaz encontrado para esta busca.</PrintBatchListEmpty>
                                ) : items.map((item) => (
                                    <PrintBatchListItem key={item.id}>
                                        <PrintBatchCheckbox
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => toggleItem(item.id)}
                                        />

                                        <PrintBatchItemContent>
                                            <div>
                                                <PrintBatchItemTitle>{item.name}</PrintBatchItemTitle>
                                                <PrintBatchItemMeta>
                                                    {item.ean} · {item.unit} · {item.validFrom} - {item.validTo}
                                                </PrintBatchItemMeta>
                                            </div>

                                            <PrintBatchItemTags>
                                                <PrintBatchTypeBadge>{item.priceType}</PrintBatchTypeBadge>
                                                <PrintBatchSizeBadge>
                                                    {item.size} {item.orientation}
                                                </PrintBatchSizeBadge>
                                                <PrintBatchCode>{item.code}</PrintBatchCode>
                                            </PrintBatchItemTags>
                                        </PrintBatchItemContent>
                                    </PrintBatchListItem>
                                ))}
                            </PrintBatchListCard>
                        </PrintBatchMain>

                        <PrintBatchAside>
                            <PrintBatchAsideCount>
                                {selectedCount} cartaz(es) selecionado(s)
                            </PrintBatchAsideCount>

                            <PrintBatchAsideActions>
                                <Button
                                    small
                                    nospace
                                    color="slateSoft"
                                    leftIcon="eye"
                                    disabled={!selectedCount}
                                    onClick={handlePreview}
                                >
                                    Ver Preview
                                </Button>

                                <Button
                                    small
                                    nospace
                                    color="primary"
                                    leftIcon="side-batch-print"
                                    disabled={!selectedCount}
                                    onClick={handlePrint}
                                >
                                    Imprimir
                                </Button>

                                <Button
                                    small
                                    nospace
                                    color="slateSoft"
                                    leftIcon="side-promotions"
                                    disabled={!selectedCount}
                                    onClick={handlePromotions}
                                >
                                    Enviar para Promoções
                                </Button>
                            </PrintBatchAsideActions>

                            <PrintBatchAsideHint>
                                Cada cartaz imprime em seu tamanho de papel original. Use &quot;Imprimir em PDF&quot; no diálogo do navegador para gerar arquivo.
                            </PrintBatchAsideHint>
                        </PrintBatchAside>
                    </PrintBatchBody>
                </PageContent>

                <PrintBatchBottomBar>
                    <PrintBatchBottomCount>
                        {selectedCount ? `${selectedCount} selecionado(s)` : "Nenhum selecionado"}
                    </PrintBatchBottomCount>

                    <PrintBatchBottomActions>
                        <Button
                            fit
                            small
                            nospace
                            color="slateSoft"
                            leftIcon="eye"
                            disabled={!selectedCount}
                            onClick={handlePreview}
                        >
                            Ver Preview
                        </Button>

                        <Button
                            fit
                            small
                            nospace
                            color="slateSoft"
                            leftIcon="side-promotions"
                            disabled={!selectedCount}
                            onClick={handlePromotions}
                        >
                            Promoções
                        </Button>

                        <Button
                            fit
                            small
                            nospace
                            color="primary"
                            leftIcon="side-batch-print"
                            disabled={!selectedCount}
                            onClick={handlePrint}
                        >
                            Imprimir
                        </Button>
                    </PrintBatchBottomActions>
                </PrintBatchBottomBar>
            </PrintBatchPage>
        </ContainerAuthenticated>
    );
}
