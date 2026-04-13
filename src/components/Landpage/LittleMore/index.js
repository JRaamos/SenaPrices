import React from 'react'

import Button from 'components/Form/Button'
import {
    MoreContainer,
    MoreIcon,
    MoreText,
    MoreTitle,
    MoreWrap,
} from './styled'

export default function LittleMore({ title, description, action }) {
    return (
        <MoreContainer>
            <MoreWrap>
                <MoreIcon src="/icons/bolt-blue.svg" alt="" />
                <MoreTitle>{ title }</MoreTitle>
                <MoreText>{ description }</MoreText>
                <Button fit large shadow nospace color="secondary" rightIcon="chevron" onClick={ action?.onClick }>
                    { action?.label }
                </Button>
            </MoreWrap>
        </MoreContainer>
    )
}
