import React from 'react'

import { Col, Container, Row } from 'reactstrap'

import LandpageFeatureCard from 'components/cards/LandpageFeatureCard'
import {
    CommomContainer,
    CommomGrid,
    CommomHint,
    CommomSubtitle,
    CommomTitle,
} from './styled'

export default function CommomCases({ title, subtitle, hint, items = [] }) {
    return (
        <CommomContainer>
            <Container>
                <CommomTitle>{ title }</CommomTitle>
                <CommomSubtitle>{ subtitle }</CommomSubtitle>

                <CommomGrid>
                    <Row>
                        {items.map((item) => (
                            <Col key={ item.title } md={{ size: 3 }}>
                                <LandpageFeatureCard { ...item } />
                            </Col>
                        ))}
                    </Row>
                </CommomGrid>

                <CommomHint>
                    <span>*</span>
                    <span>{ hint }</span>
                </CommomHint>
            </Container>
        </CommomContainer>
    )
}
