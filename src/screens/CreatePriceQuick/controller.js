import { useMemo, useRef, useState } from "react";

const PRICE_TYPES = [
    { id: 'avista', label: 'À Vista' },
    { id: 'depor', label: 'De / Por' },
    { id: 'clube', label: 'Clube' },
    { id: 'especial', label: 'Oferta Especial' },
];

const OFFER_TYPES = [
    { id: 'none', title: 'Nenhum' },
    { id: 'leve3', title: 'Leve 3' },
    { id: 'leve4', title: 'Leve 4' },
];

const buildLine = (id) => ({
    id,
    product: '',
    price: '',
});

export default function useController() {
    const nextLineIdRef = useRef(2);
    const productInputRefs = useRef({});
    const filtersFormRef = useRef(null);

    const [priceType, setPriceType] = useState('avista');
    const [lines, setLines] = useState([buildLine(1)]);

    const updateLine = (id, field, value) => {
        setLines((current) => current.map((line) => (
            line.id === id ? { ...line, [field]: value } : line
        )));
    };

    const focusProductInput = (id) => {
        window.requestAnimationFrame(() => {
            productInputRefs.current[id]?.focus?.();
        });
    };

    const addLine = () => {
        const nextId = nextLineIdRef.current;
        nextLineIdRef.current += 1;
        setLines((current) => [...current, buildLine(nextId)]);
        focusProductInput(nextId);
    };

    const removeLine = (id) => {
        setLines((current) => {
            if (current.length === 1) {
                return [buildLine(current[0].id)];
            }

            return current.filter((line) => line.id !== id);
        });
    };

    const clearLines = () => {
        const nextId = nextLineIdRef.current;
        nextLineIdRef.current += 1;
        setLines([buildLine(nextId)]);
        focusProductInput(nextId);
    };

    const handlePriceSubmit = (id) => {
        const currentLine = lines.find((line) => line.id === id);

        if (!currentLine?.product?.trim() || !currentLine?.price?.trim()) {
            return;
        }

        addLine();
    };

    const readyLines = useMemo(() => (
        lines.filter((line) => line.product.trim() && line.price.trim())
    ), [lines]);

    const actionButtons = useMemo(() => ([
        {
            id: 'save',
            label: `Salvar (${readyLines.length})`,
            icon: 'check-neutral',
            disabled: readyLines.length === 0,
        },
        {
            id: 'print',
            label: `Imprimir (${readyLines.length})`,
            icon: 'side-batch-print',
            disabled: readyLines.length === 0,
        },
        {
            id: 'clear',
            label: 'Limpar',
            icon: 'trash-red',
            disabled: false,
            danger: true,
            action: clearLines,
        },
    ]), [readyLines.length]);

    const filtersRegister = useMemo(() => ({
        validFrom: '',
        validTo: '',
        offerType: 'none',
        note: '',
    }), []);

    const filterFormItems = useMemo(() => ([
        {
            ref: 'validFrom',
            label: 'Válido de',
            type: 'date',
            quarter: true,
            dense: true,
            surface: 'white',
        },
        {
            ref: 'validTo',
            label: 'Válido até',
            type: 'date',
            quarter: true,
            dense: true,
            surface: 'white',
        },
        {
            ref: 'offerType',
            label: 'Oferta',
            options: OFFER_TYPES,
            quarter: true,
            dense: true,
            surface: 'white',
        },
        {
            ref: 'note',
            label: 'Observação',
            placeholder: 'Rodapé opcional...',
            quarter: true,
            dense: true,
            surface: 'white',
        },
    ]), []);

    return {
        title: 'Criação Rápida de Preços',
        subtitle: 'Crie múltiplos preços. Use Tab e Enter para navegar rapidamente entre os campos.',
        priceTypes: PRICE_TYPES,
        priceType,
        setPriceType,
        filtersFormRef,
        filtersRegister,
        filterFormItems,
        lines,
        updateLine,
        addLine,
        removeLine,
        actionButtons,
        handlePriceSubmit,
        productInputRefs,
        tip: 'Dica: Enter no produto seleciona o item quando há apenas 1 resultado. Enter no preço adiciona nova linha. Tab navega entre campos.',
    };
}
