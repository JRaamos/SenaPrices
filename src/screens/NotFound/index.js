import React from "react";

import ContainerUnauthenticated from "containers/Unauthenticated";

import useController from "./controller";
import {
    GuideItem,
    GuideList,
    GuideText,
    GuideTitle,
    NotFoundActions,
    NotFoundButton,
    NotFoundCard,
    NotFoundCode,
    NotFoundEyebrow,
    NotFoundLayout,
    NotFoundShell,
    NotFoundText,
    NotFoundTitle,
} from "./styled";

export default function NotFound() {
    const {
        hero,
        actions,
        guidelines,
    } = useController();

    return (
        <ContainerUnauthenticated keep simple>
            <NotFoundShell>
                <NotFoundLayout>
                    <NotFoundCard>
                        <NotFoundCode>404</NotFoundCode>
                        <NotFoundEyebrow>{hero.eyebrow}</NotFoundEyebrow>
                        <NotFoundTitle>{hero.title}</NotFoundTitle>
                        <NotFoundText>{hero.description}</NotFoundText>

                        <NotFoundActions>
                            {actions.map(item => (
                                <NotFoundButton
                                    key={item.key}
                                    $primary={item.primary}
                                    onClick={item.action}
                                >
                                    {item.label}
                                </NotFoundButton>
                            ))}
                        </NotFoundActions>
                    </NotFoundCard>

                    <NotFoundCard>
                        <NotFoundTitle>O que fazer agora</NotFoundTitle>
                        <NotFoundText>
                            Use um dos caminhos sugeridos para voltar a um fluxo válido do SenaPrices sem perder contexto.
                        </NotFoundText>

                        <GuideList>
                            {guidelines.map(item => (
                                <GuideItem key={item.title}>
                                    <GuideTitle>{item.title}</GuideTitle>
                                    <GuideText>{item.description}</GuideText>
                                </GuideItem>
                            ))}
                        </GuideList>
                    </NotFoundCard>
                </NotFoundLayout>
            </NotFoundShell>
        </ContainerUnauthenticated>
    );
}
