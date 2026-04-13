import React from 'react'

import { Col, Container, Row } from 'reactstrap'

import LandpageAccessCard from 'components/cards/LandpageAccessCard'
import {
    MoreInfosContainer,
    MoreInfosGrid,
    MoreInfosText,
    MoreInfosTitle,
} from './styled'

export default function MoreInfos({ cards = [] }) {
    return (
        <MoreInfosContainer>
            <Container>
                <MoreInfosGrid>
                    <Row className="justify-content-center">
                        {cards.map((card) => (
                            <Col key={ card.title } md={{ size: 6 }}>
                                <LandpageAccessCard { ...card } />
                            </Col>
                        ))}
                    </Row>
                </MoreInfosGrid>
            </Container>
        </MoreInfosContainer>
    )
}
