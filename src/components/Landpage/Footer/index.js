import React from 'react'

import {
    FooterContainer,
    FooterCopy,
    FooterDescription,
    FooterLegal,
    FooterLinks,
    FooterLogo,
    FooterLogoEyebrow,
    FooterLogoRow,
    FooterLogoText,
} from './styled'

export default function Footer({ description, lgpdText }) {
    return (
        <FooterContainer>
            <FooterLogo>
                <FooterLogoRow>
                    <span>Sena</span>
                    <span>Prices</span>
                </FooterLogoRow>
                <FooterLogoEyebrow>Sistema Promocional</FooterLogoEyebrow>
            </FooterLogo>

            <FooterLinks>
                <a href="#privacidade">Politica de Privacidade</a>
                <a href="#termos">Termos de Uso</a>
            </FooterLinks>

            <FooterDescription>{ description }</FooterDescription>
            <FooterLegal>{ lgpdText }</FooterLegal>
            <FooterCopy />
        </FooterContainer>
    )
}
