import React from "react";

import Banner from "components/Landpage/Banner";
import MoreInfos from 'components/Landpage/MoreInfos'
import CommomCases from 'components/Landpage/CommomCases'
import KnowMore from 'components/Landpage/KnowMore'
import LittleMore from 'components/Landpage/LittleMore'
import Footer from 'components/Landpage/Footer'
import CookieBar from 'components/Landpage/CookieBar'

import ContainerLandpage from "containers/Landpage";
import useController from "./controller";

export default function Landpage() {

    const {
        hero,
        accessCards,
        featureSection,
        plans,
        finalCta,
        footer,
        cookie,
        cookieVisible,
        plansFooterNote,
    } = useController()

    return (
        <ContainerLandpage>
            <Banner { ...hero } />
            <MoreInfos cards={ accessCards } />
            <CommomCases { ...featureSection } />
            <KnowMore title="Planos e precos" subtitle="Escolha o plano ideal para sua operacao. Valores mensais sem fidelidade minima." plans={ plans } footerNote={ plansFooterNote } />
            <LittleMore { ...finalCta } />
            <Footer { ...footer } />
            {cookieVisible ? <CookieBar { ...cookie } /> : null}
        </ContainerLandpage>
    );
}
