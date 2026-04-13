import React from 'react'

import {
    FeatureCard,
    FeatureCardDescription,
    FeatureCardIconWrap,
    FeatureCardTitle,
} from './styled'
import { Icon } from 'ui/styled'

export default function LandpageFeatureCard({ icon, title, description }) {
    return (
        <FeatureCard>
            <FeatureCardIconWrap>
                <Icon icon={ icon } />
            </FeatureCardIconWrap>
            <FeatureCardTitle>{ title }</FeatureCardTitle>
            <FeatureCardDescription>{ description }</FeatureCardDescription>
        </FeatureCard>
    )
}
