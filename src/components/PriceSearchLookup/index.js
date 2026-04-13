import React from "react";

import Input from "components/Form/Input";

import {
    PriceSearchLookupContainer,
    PriceSearchLookupResult,
    PriceSearchLookupResultLabel,
    PriceSearchLookupResultMeta,
    PriceSearchLookupEmpty,
} from "./styled";

export default function PriceSearchLookup({ value, onChange, selectedItem, resultItem, onSelect }) {
    const visibleItem = selectedItem || (value ? resultItem : null);

    return (
        <PriceSearchLookupContainer>
            <Input
                placeholder="Nome, código ou EAN13..."
                value={value}
                onChange={event => onChange(event.target.value)}
                icon="search"
                dense
                surface="white"
            />

            {visibleItem ? (
                <PriceSearchLookupResult onClick={() => onSelect(visibleItem)}>
                    <PriceSearchLookupResultLabel>
                        {visibleItem.name}
                        <span>{visibleItem.brand}</span>
                    </PriceSearchLookupResultLabel>
                    <PriceSearchLookupResultMeta>
                        {visibleItem.code}/{visibleItem.ean} • {visibleItem.unit}
                    </PriceSearchLookupResultMeta>
                </PriceSearchLookupResult>
            ) : (
                <PriceSearchLookupEmpty>Nenhum item selecionado</PriceSearchLookupEmpty>
            )}
        </PriceSearchLookupContainer>
    );
}
