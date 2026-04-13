import React from 'react'

import { Col, Container, Row } from 'reactstrap'

import LandpagePlanCard from 'components/cards/LandpagePlanCard'
import {
    KnowContent,
    MoreText,
    MoreTitle,
    PlansToggle,
    PlansToggleBullet,
    PlansToggleLabel,
} from './styled'
import Toggle from 'components/Form/Toggle'

export default function KnowMore({ title, subtitle, plans = [], footerNote }) {
    return (
        <KnowContent id="planos">
            <Container>
                <MoreTitle>{title}</MoreTitle>
                <MoreText>{subtitle}</MoreText>

                <PlansToggle>
                    <PlansToggleLabel>Mensal</PlansToggleLabel>
                    <Toggle label={'Anual'} />
                    <PlansToggleLabel active>Economia de 10%</PlansToggleLabel>
                </PlansToggle>

                <Row className="justify-content-center">
                    {plans.map((plan) => (
                        <Col key={plan.title} md={{ size: 4 }}>
                            <LandpagePlanCard {...plan} />
                        </Col>
                    ))}
                </Row>

                <MoreText footer>{footerNote}</MoreText>
            </Container>
        </KnowContent>
    )
}
