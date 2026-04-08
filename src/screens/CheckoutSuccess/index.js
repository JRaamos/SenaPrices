import React from "react";

import ContainerUnauthenticated from "containers/Unauthenticated";

import useController from "./controller";
import {
    GuideCard,
    GuideItem,
    GuideItemText,
    GuideItemTitle,
    GuideList,
    GuideText,
    GuideTitle,
    SuccessActionButton,
    SuccessActionRow,
    SuccessBadge,
    SuccessCard,
    SuccessEyebrow,
    SuccessLayout,
    SuccessShell,
    SuccessText,
    SuccessTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
} from "./styled";

export default function CheckoutSuccess() {
    const {
        statusCard,
        summaryItems,
        quickActions,
        guidelines,
    } = useController();

    return (
        <ContainerUnauthenticated keep simple>
            <SuccessShell>
                <SuccessLayout>
                    <SuccessCard $tone={statusCard.tone}>
                        <SuccessBadge $tone={statusCard.tone}>{statusCard.badge}</SuccessBadge>
                        <SuccessEyebrow>{statusCard.eyebrow}</SuccessEyebrow>
                        <SuccessTitle>{statusCard.title}</SuccessTitle>
                        <SuccessText>{statusCard.description}</SuccessText>

                        <SummaryGrid>
                            {summaryItems.map(item => (
                                <SummaryItem key={item.label}>
                                    <SummaryLabel>{item.label}</SummaryLabel>
                                    <SummaryValue>{item.value}</SummaryValue>
                                </SummaryItem>
                            ))}
                        </SummaryGrid>

                        <SuccessActionRow>
                            {quickActions.map(item => (
                                <SuccessActionButton
                                    key={item.key}
                                    $primary={item.primary}
                                    onClick={item.action}
                                >
                                    {item.label}
                                </SuccessActionButton>
                            ))}
                        </SuccessActionRow>
                    </SuccessCard>

                    <GuideCard>
                        <GuideTitle>Como essa confirmação se encaixa no produto</GuideTitle>
                        <GuideText>
                            A tela foi desenhada para ficar pública, sem sidebar e sem assumir integrações que ainda não estejam confirmadas no ambiente.
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
                </SuccessLayout>
            </SuccessShell>
        </ContainerUnauthenticated>
    );
}
