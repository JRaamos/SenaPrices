import React from "react";

import { Row, Col, Container } from 'reactstrap';

import CardSelect from 'components/Landpage/Card/Select'

import {
    BannerImage,
    BannerOut,
    BannerContent,
    TextContainer
} from "./styled";
import { Icon, Title } from "ui/styled";
import LineInfo from "components/LineInfo";

export default function Banner() {
    return (
        <>
            <BannerImage>
                <Icon icon='logo2' />
                <LineInfo text={'Sistema profissional para supermercados e varejos'} icon={'star'} />
                <TextContainer>
                    <Title centred>Crie cartazes promocionais em segundos</Title>
                </TextContainer>
            </BannerImage>
        </>
    );
}
