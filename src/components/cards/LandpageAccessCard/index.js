import React from 'react'

import {
    AccessCard,
    AccessCardBadge,
    AccessCardDescription,
    AccessCardEyebrow,
    AccessCardHeader,
    AccessCardIconWrap,
    AccessCardItem,
    AccessCardItemText,
    AccessCardList,
    AccessCardTitle,
} from './styled'
import { Icon } from 'ui/styled'

export default function LandpageAccessCard({
    icon,
    title,
    badge,
    eyebrow,
    description,
    items = [],
    tone = 'green',
}) {
    return (
        <AccessCard tone={ tone }>
            <AccessCardHeader>
                <AccessCardIconWrap>
                    <Icon icon={ icon } />
                </AccessCardIconWrap>
            </AccessCardHeader>

            <AccessCardHeader>
                <AccessCardTitle>{ title }</AccessCardTitle>
                <AccessCardBadge tone={ tone }>{ badge }</AccessCardBadge>
            </AccessCardHeader>

            <AccessCardEyebrow>{ eyebrow }</AccessCardEyebrow>
            <AccessCardDescription>{ description }</AccessCardDescription>

            <AccessCardList>
                {items.map((item) => (
                    <AccessCardItem key={ item }>
                        <Icon icon={ tone === 'green' ? 'check-green' : 'check-blue' } />
                        <AccessCardItemText>{ item }</AccessCardItemText>
                    </AccessCardItem>
                ))}
            </AccessCardList>
        </AccessCard>
    )
}
