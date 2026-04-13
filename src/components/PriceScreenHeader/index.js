import React from "react";

import Button from "components/Form/Button";

import {
    PriceHeaderContainer,
    PriceHeaderText,
    PriceHeaderTitle,
    PriceHeaderSubtitle,
    PriceHeaderActions,
} from "./styled";

export default function PriceScreenHeader({ title, subtitle, actions }) {
    return (
        <PriceHeaderContainer>
            <PriceHeaderText>
                <PriceHeaderTitle>{title}</PriceHeaderTitle>
                <PriceHeaderSubtitle>{subtitle}</PriceHeaderSubtitle>
            </PriceHeaderText>

            <PriceHeaderActions>
                {(actions || []).map((action) => (
                    <Button
                        key={action.label}
                        color={action.color}
                        fit
                        small
                        nospace
                        leftIcon={action.icon}
                        onClick={action.action}
                    >
                        {action.label}
                    </Button>
                ))}
            </PriceHeaderActions>
        </PriceHeaderContainer>
    );
}
