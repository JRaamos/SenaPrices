import React from 'react'

import Button from 'components/Form/Button'
import { Icon } from 'ui/styled'
import {
    PlanBadge,
    PlanCard,
    PlanCardBody,
    PlanCardHeader,
    PlanCardHeadline,
    PlanCardNote,
    PlanFeature,
    PlanFeatureDot,
    PlanFeatureText,
    PlanFooter,
    PlanHeadline,
    PlanLabel,
    PlanPill,
    PlanPillMeta,
    PlanPillPrimary,
    PlanPrice,
    PlanPriceCurrency,
    PlanPriceLine,
    PlanPriceSuffix,
    PlanSeparator,
    PlanTag,
    PlanText,
    PlanWebHint,
} from './styled'

export default function LandpagePlanCard({
    accent = 'default',
    title,
    label,
    labelIcon,
    description,
    price,
    badge,
    badgeMeta,
    features = [],
    buttonText,
    buttonColor,
    buttonOutline,
    buttonIcon,
    topTag,
}) {
    return (
        <PlanCard accent={accent}>
            {topTag ? <PlanTag accent={accent}>{topTag}</PlanTag> : null}

            <PlanCardHeader>
                <PlanHeadline>
                    <PlanLabel accent={accent}>{title}</PlanLabel>
                    <PlanPill accent={accent}>
                        <Icon icon={labelIcon} />
                        <span>{label}</span>
                    </PlanPill>
                </PlanHeadline>

                <PlanText accent={accent}>{description}</PlanText>

                <PlanPriceLine>
                    {price === 'Sob consulta' ? (
                        <PlanPrice accent={accent} consultation>
                            {price}
                        </PlanPrice>
                    ) : (
                        <>
                            <PlanPriceCurrency accent={accent}>R$</PlanPriceCurrency>
                            <PlanPrice accent={accent}>{price}</PlanPrice>
                            <PlanPriceSuffix accent={accent}>/mes</PlanPriceSuffix>
                        </>
                    )}
                </PlanPriceLine>

                <PlanBadge accent={accent}>
                    <Icon icon="accounts-badge" />
                    <PlanPillPrimary accent={accent}>{badge}</PlanPillPrimary>
                    <PlanPillMeta accent={accent}>{badgeMeta}</PlanPillMeta>
                </PlanBadge>
            </PlanCardHeader>

            <PlanSeparator accent={accent} />

            <PlanCardBody>
                {features.map((feature) => (
                    <PlanFeature key={feature.text}>
                        <PlanFeatureDot>
                            <Icon icon={feature.enabled ? (accent === 'featured' ? 'check-violet' : 'check-neutral') : 'close-muted'} />
                        </PlanFeatureDot>
                        <PlanFeatureText accent={accent} enabled={feature.enabled}>
                            {feature.text}
                            {feature.hint ? <PlanWebHint>{feature.hint}</PlanWebHint> : null}
                        </PlanFeatureText>
                    </PlanFeature>
                ))}
            </PlanCardBody>

            <PlanFooter>
                <Button
                    fit={false}
                    nospace
                    color={buttonColor}
                    outline={buttonOutline}
                    rightIcon={buttonIcon === 'mail-blue' ? null : buttonIcon}
                    leftIcon={buttonIcon === 'mail-blue' ? buttonIcon : null}
                    fontSize="13px"
                >
                    {buttonText}
                </Button>
            </PlanFooter>

            {accent === 'custom' ? <PlanCardNote>Plano personalizado sob consulta</PlanCardNote> : null}
        </PlanCard>
    )
}
