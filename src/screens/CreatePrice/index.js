import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import PriceScreenHeader from "components/PriceScreenHeader";
import PriceFormCard from "components/PriceFormCard";
import PriceSearchLookup from "components/PriceSearchLookup";
import PricePreview from "components/PricePreview";

import useController from "./controller";

import {
    CreatePriceScreen,
    CreatePriceLayout,
    CreatePriceMain,
    CreatePriceRow,
    CreatePriceSearchCard,
    CreatePriceSearchHeader,
    CreatePriceSearchStep,
    CreatePriceSearchTitle,
    CreatePriceAside,
} from "./styled";

export default function DashboardCreatePrice() {
    const {
        title,
        subtitle,
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
    } = useController();

    return (
        <ContainerAuthenticated>
            <CreatePriceScreen>
                <PriceScreenHeader title={title} subtitle={subtitle} actions={headerActions} />

                <CreatePriceLayout>
                    <CreatePriceMain>
                        <PriceFormCard
                            title="Configuração do Cartaz"
                            step="1"
                            formItems={configFormItems}
                            register={configRegister}
                            formRef={configFormRef}
                        />

                        <CreatePriceRow>
                            <CreatePriceSearchCard>
                                <CreatePriceSearchHeader>
                                    <CreatePriceSearchStep>{searchCard.step}</CreatePriceSearchStep>
                                    <CreatePriceSearchTitle>{searchCard.title}</CreatePriceSearchTitle>
                                </CreatePriceSearchHeader>
                                <PriceSearchLookup
                                    value={searchValue}
                                    onChange={setSearchValue}
                                    resultItem={mockItem}
                                    selectedItem={selectedItem}
                                    onSelect={setSelectedItem}
                                />
                            </CreatePriceSearchCard>

                            <PriceFormCard
                                title="Preço"
                                step="3"
                                formItems={priceFormItems}
                                register={priceRegister}
                                formRef={priceFormRef}
                            />
                        </CreatePriceRow>

                        <PricePreview
                            preview={previewData}
                            ready={previewReady}
                            hidden={previewHidden}
                        />
                    </CreatePriceMain>

                    <CreatePriceAside>
                        <PriceFormCard
                            title="Informações Adicionais"
                            step="4"
                            formItems={additionalInfoFormItems}
                            register={additionalRegister}
                            formRef={additionalInfoFormRef}
                        />
                    </CreatePriceAside>
                </CreatePriceLayout>
            </CreatePriceScreen>
        </ContainerAuthenticated>
    );
}
