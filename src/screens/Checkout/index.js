import React from "react";

import ContainerUnauthenticated from "containers/Unauthenticated";

import useController from "./controller";
import {
    ActionButton,
    ActionRow,
    CheckoutBadge,
    CheckoutCard,
    CheckoutEyebrow,
    CheckoutLayout,
    CheckoutShell,
    CheckoutText,
    CheckoutTitle,
    GuideCard,
    GuideItem,
    GuideItemText,
    GuideItemTitle,
    GuideList,
    GuideText,
    GuideTitle,
    HighlightItem,
    HighlightList,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "./styled";

export default function Checkout() {
    const {
        guidelines,
        planHighlights,
        priceLabel,
        quickActions,
        statusCard,
        summaryItems,
        billingLabel,
    } = useController();

    return (
        <ContainerUnauthenticated keep simple>
            <CheckoutShell>
                <CheckoutLayout>
                    <CheckoutCard $tone={statusCard.tone}>
                        <CheckoutBadge $tone={statusCard.tone}>{statusCard.badge}</CheckoutBadge>
                        <CheckoutEyebrow>{statusCard.eyebrow}</CheckoutEyebrow>
                        <CheckoutTitle>Checkout SenaPrices</CheckoutTitle>
                        <CheckoutText>{statusCard.description}</CheckoutText>

                        <SummaryGrid>
                            {summaryItems.map(item => (
                                <SummaryItem key={item.label}>
                                    <SummaryLabel>{item.label}</SummaryLabel>
                                    <SummaryValue>{item.value}</SummaryValue>
                                </SummaryItem>
                            ))}
                        </SummaryGrid>

                        <GuideTitle>{`Resumo da contratação ${billingLabel.toLowerCase()}`}</GuideTitle>
                        <GuideText>{`Valor de referência: ${priceLabel}. Revise os pontos centrais abaixo antes de seguir para cadastro ou alinhamento comercial.`}</GuideText>
                        <HighlightList>
                            {planHighlights.map(item => (
                                <HighlightItem key={item}>{item}</HighlightItem>
                            ))}
                        </HighlightList>

                        <ActionRow>
                            {quickActions.map(item => (
                                <ActionButton
                                    key={item.key}
                                    $primary={item.primary}
                                    onClick={item.action}
                                    type="button"
                                >
                                    {item.label}
                                </ActionButton>
                            ))}
                        </ActionRow>
                    </CheckoutCard>

                    <GuideCard>
                        <GuideTitle>Como esta etapa foi estruturada</GuideTitle>
                        <GuideText>
                            A página de checkout organiza a contratação de forma clara, sem simular pagamento e sem acoplar a jornada comercial diretamente ao navegador.
                        </GuideText>

                        <GuideList>
                            {guidelines.map(item => (
                                <GuideItem key={item.title}>
                                    <GuideItemTitle>{item.title}</GuideItemTitle>
                                    <GuideItemText>{item.description}</GuideItemText>
                                </GuideItem>
                            ))}
                        </GuideList>
                    </GuideCard>
                </CheckoutLayout>
            </CheckoutShell>
        </ContainerUnauthenticated>
    );
}
