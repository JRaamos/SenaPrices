import { useMemo, useRef, useState } from "react";

const mockItem = {
    name: 'Feijão Preto',
    brand: 'EXTRA - 1kg',
    unit: 'pacote',
    code: 'MASTER001',
    ean: '7891234567891',
};

export default function useController() {
    const configFormRef = useRef(null);
    const priceFormRef = useRef(null);
    const additionalInfoFormRef = useRef(null);

    const [searchValue, setSearchValue] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [previewHidden, setPreviewHidden] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const configRegister = useMemo(() => ({
        priceType: 'avista',
        size: 'a5',
        orientation: 'portrait',
    }), []);

    const priceRegister = useMemo(() => ({
        price: '',
    }), []);

    const additionalRegister = useMemo(() => ({
        validFrom: '',
        validTo: '',
        offerType: 'none',
        note: '',
        showBarcode: true,
    }), []);

    const configFormItems = useMemo(() => [
        {
            ref: 'priceType',
            label: 'Tipo de Preço',
            options: [
                { id: 'avista', title: 'À Vista' },
                { id: 'prazo', title: 'À Prazo' },
            ],
            surface: 'white',
            dense: true,
            full: true,
        },
        {
            ref: 'size',
            label: 'Tamanho',
            options: [
                { id: 'a5', title: 'A5' },
                { id: 'a4', title: 'A4' },
            ],
            surface: 'white',
            dense: true,
            half: true,
        },
        {
            ref: 'orientation',
            label: 'Orientação',
            options: [
                { id: 'portrait', title: 'Retrato' },
                { id: 'landscape', title: 'Paisagem' },
            ],
            surface: 'white',
            dense: true,
            half: true,
        },
    ], []);

    const priceFormItems = useMemo(() => [
        {
            ref: 'price',
            label: 'Valor (R$)',
            placeholder: '0,00',
            type: 'money',
            surface: 'white',
            dense: true,
            full: true,
        },
    ], []);

    const additionalInfoFormItems = useMemo(() => [
        {
            ref: 'validFrom',
            label: 'Válido de',
            placeholder: 'dd/mm/aaaa',
            mask: '99/99/9999',
            surface: 'white',
            dense: true,
            full: true,
        },
        {
            ref: 'validTo',
            label: 'Válido até',
            placeholder: 'dd/mm/aaaa',
            mask: '99/99/9999',
            surface: 'white',
            dense: true,
            full: true,
        },
        {
            ref: 'offerType',
            label: 'Tipo de Oferta',
            options: [
                { id: 'none', title: 'Nenhum' },
                { id: 'leve3', title: 'Leve 3' },
                { id: 'leve4', title: 'Leve 4' },
            ],
            surface: 'white',
            dense: true,
            full: true,
        },
        {
            ref: 'note',
            label: 'Observação',
            placeholder: 'Texto no rodapé...',
            surface: 'white',
            dense: true,
            full: true,
        },
        {
            ref: 'showBarcode',
            type: 'checkbox',
            label: 'Exibir código de barras',
            full: true,
        },
    ], []);

    const searchCard = useMemo(() => ({
        title: 'Buscar Item',
        step: '2',
    }), []);

    const previewReady = !!previewData;

    const handleSave = () => {
        const priceForm = priceFormRef.current?.getForm(true) || {};
        const additionalForm = additionalInfoFormRef.current?.getForm(true) || {};
        const priceValue = `${priceForm?.price || ''}`.replace(',', '.');
        const numericPrice = Number(priceValue);

        if (!selectedItem || !numericPrice) {
            setPreviewData(null);
            setPreviewHidden(false);
            return;
        }

        const [integer, decimals = '00'] = numericPrice.toFixed(2).split('.');
        setPreviewHidden(false);
        setPreviewData({
            ...selectedItem,
            integer,
            decimals,
            note: additionalForm?.note,
            showBarcode: additionalForm?.showBarcode,
        });
    };

    const headerActions = useMemo(() => [
        { label: previewHidden ? 'Mostrar' : 'Ocultar', color: 'slateSoft', icon: 'eye', action: () => setPreviewHidden(value => !value) },
        !previewData ? null : { label: 'Imprimir', color: 'skySoft', icon: 'side-batch-print', action: () => window.print() },
        { label: 'Salvar', color: 'primary', icon: 'check-blue', action: () => handleSave() },
    ].filter(Boolean), [previewData, previewHidden]);

    return {
        title: 'Criar Preço',
        subtitle: 'Cartazes de preço promocional',
        headerActions,
        searchValue,
        setSearchValue,
        mockItem,
        selectedItem,
        setSelectedItem,
        configRegister,
        priceRegister,
        additionalRegister,
        configFormItems,
        priceFormItems,
        additionalInfoFormItems,
        configFormRef,
        priceFormRef,
        additionalInfoFormRef,
        searchCard,
        previewData,
        previewReady,
        previewHidden,
    };
}
