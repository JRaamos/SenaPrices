import React from "react";

import {
    PricePreviewContainer,
    PricePreviewHeading,
    PricePreviewTitle,
    PricePreviewFormat,
    PricePreviewReady,
    PricePreviewPlaceholder,
    PricePreviewCard,
    PricePreviewTop,
    PricePreviewTopLine,
    PricePreviewProduct,
    PricePreviewPrice,
    PricePreviewPriceCurrency,
    PricePreviewPriceDecimals,
    PricePreviewUnit,
    PricePreviewBarcode,
    PricePreviewCode,
    PricePreviewBadge,
} from "./styled";

export default function PricePreview({ preview, ready, hidden }) {
    return (
        <PricePreviewContainer>
            <PricePreviewHeading>
                <PricePreviewTitle>Preview</PricePreviewTitle>
                <PricePreviewFormat>(A5 Retrato)</PricePreviewFormat>
                {ready ? <PricePreviewReady>✓</PricePreviewReady> : null}
            </PricePreviewHeading>

            {ready && !hidden ? (
                <PricePreviewCard>
                    <PricePreviewTop>
                        <PricePreviewTopLine>{preview.brand}</PricePreviewTopLine>
                        <PricePreviewProduct>{preview.name}</PricePreviewProduct>
                    </PricePreviewTop>

                    <PricePreviewPrice>
                        <PricePreviewPriceCurrency>R$</PricePreviewPriceCurrency>
                        {preview.integer}
                        <PricePreviewPriceDecimals>,{preview.decimals}</PricePreviewPriceDecimals>
                    </PricePreviewPrice>

                    <PricePreviewUnit>{preview.unit}</PricePreviewUnit>
                    <PricePreviewCode>{preview.code}</PricePreviewCode>

                    <PricePreviewBadge />
                    <PricePreviewBarcode />
                </PricePreviewCard>
            ) : (
                <PricePreviewPlaceholder>
                    Preencha item e preço para ver o cartaz
                </PricePreviewPlaceholder>
            )}
        </PricePreviewContainer>
    );
}
