import { useMemo, useState } from "react";

const MOCK_ITEMS = [
    {
        id: "cartaz-1",
        name: "ARROZ PARBOILIZADO 5KG",
        ean: "7896060720992",
        unit: "cada",
        priceType: "À Vista",
        size: "A6",
        orientation: "↕",
        code: "ADM5AXYZ1",
        validFrom: "14/10/2026",
        validTo: "28/10/2026",
    },
    {
        id: "cartaz-2",
        name: "FEIJÃO CARIOCA 1KG",
        ean: "7891902302034",
        unit: "cada",
        priceType: "À Vista",
        size: "A5",
        orientation: "↕",
        code: "ADM4AXYZ1",
        validFrom: "14/10/2026",
        validTo: "28/10/2026",
    },
    {
        id: "cartaz-3",
        name: "LEITE INTEGRAL SACO 1L",
        ean: "7898264500029",
        unit: "cada",
        priceType: "À Vista",
        size: "A5",
        orientation: "↕",
        code: "ADM4AXYZ1",
        validFrom: "14/10/2026",
        validTo: "28/10/2026",
    },
    {
        id: "cartaz-4",
        name: "LEITE INTEGRAL SACO 1L",
        ean: "7898264500029",
        unit: "cada",
        priceType: "À Vista",
        size: "A5",
        orientation: "↕",
        code: "ADM4AXYZ1",
        validFrom: "14/10/2026",
        validTo: "28/10/2026",
    },
    {
        id: "cartaz-5",
        name: "LEITE INTEGRAL SACO 1L",
        ean: "7898264500029",
        unit: "cada",
        priceType: "À Vista",
        size: "A5",
        orientation: "↕",
        code: "ADM4AXYZ1",
        validFrom: "14/10/2026",
        validTo: "28/10/2026",
    },
];

export default function useController() {
    const [searchValue, setSearchValue] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);

    const items = useMemo(() => (
        MOCK_ITEMS.filter((item) => (
            `${item.name} ${item.ean} ${item.code}`.toLowerCase().includes(searchValue.trim().toLowerCase())
        ))
    ), [searchValue]);

    const selectedCount = selectedIds.length;
    const allVisibleSelected = !!items.length && items.every((item) => selectedIds.includes(item.id));

    const toggleItem = (id) => {
        setSelectedIds((current) => (
            current.includes(id)
                ? current.filter((itemId) => itemId !== id)
                : [...current, id]
        ));
    };

    const toggleAllVisible = () => {
        setSelectedIds((current) => (
            allVisibleSelected
                ? current.filter((id) => !items.some((item) => item.id === id))
                : Array.from(new Set([...current, ...items.map((item) => item.id)]))
        ));
    };

    const clearSelection = () => {
        setSelectedIds([]);
    };

    const handlePreview = () => {};
    const handlePromotions = () => {};
    const handlePrint = () => {
        window.print();
    };

    return {
        header: {
            title: "Impressão em Lote",
            subtitle: "Selecione e imprima múltiplos cartazes — cada um no seu tamanho de papel",
        },
        searchValue,
        setSearchValue,
        items,
        selectedIds,
        selectedCount,
        allVisibleSelected,
        toggleItem,
        toggleAllVisible,
        clearSelection,
        handlePreview,
        handlePromotions,
        handlePrint,
    };
}
