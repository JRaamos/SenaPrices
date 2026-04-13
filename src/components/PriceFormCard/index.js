import React from "react";

import Core from "components/Form/Core";

import {
    PriceFormCardContainer,
    PriceFormCardHeader,
    PriceFormCardStep,
    PriceFormCardTitle,
    PriceFormCardBody,
} from "./styled";

export default function PriceFormCard({ title, step, formItems, register, formRef }) {
    return (
        <PriceFormCardContainer>
            <PriceFormCardHeader>
                <PriceFormCardStep>{step}</PriceFormCardStep>
                <PriceFormCardTitle>{title}</PriceFormCardTitle>
            </PriceFormCardHeader>

            <PriceFormCardBody>
                <Core register={register} ref={formRef} formItems={formItems} />
            </PriceFormCardBody>
        </PriceFormCardContainer>
    );
}
