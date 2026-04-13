import React from 'react'

import Button from 'components/Form/Button'
import { Icon } from 'ui/styled'
import {
    BannerActions,
    BannerBadge,
    BannerBrand,
    BannerBrandEyebrow,
    BannerBrandText,
    BannerContent,
    BannerDescription,
    BannerFeature,
    BannerFeatures,
    BannerHero,
    BannerSubtitle,
    BannerTitle,
    BannerVerticalLine,
} from './styled'

export default function Banner({
    subtitle,
    title,
    description,
    primaryAction,
    secondaryAction,
    features = [],
}) {
    return (
        <BannerHero>
            <BannerContent>
                <BannerBrand>
                    <BannerBrandText>
                        <span>Sena</span>
                        <span>Prices</span>
                    </BannerBrandText>
                    <BannerBrandEyebrow>Sistema Promocional</BannerBrandEyebrow>
                </BannerBrand>

                <BannerBadge>
                    <Icon icon="sparkle-blue" />
                    <span>{subtitle}</span>
                </BannerBadge>

                <BannerTitle>{title}</BannerTitle>
                <BannerDescription>{description}</BannerDescription>

                <BannerActions>
                    <Button fit large shadow nospace color="secondary" rightIcon="chevron" onClick={primaryAction?.onClick}>
                        {primaryAction?.label}
                    </Button>
                    <Button fit large nospace color="ghostDark" outline onClick={secondaryAction?.onClick}>
                        {secondaryAction?.label}
                    </Button>
                </BannerActions>

                <BannerFeatures>
                    {features.map((feature) => (
                        <BannerFeature key={feature}>
                            <Icon icon="check-pill" />
                            <span>{feature}</span>
                        </BannerFeature>
                    ))}
                </BannerFeatures>
                <BannerVerticalLine />
            </BannerContent>
        </BannerHero>
    )
}
