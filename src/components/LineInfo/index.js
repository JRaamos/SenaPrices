import React from 'react'
import { LineInfoContainer, LineInfoText } from './styled'
import { Icon } from 'ui/styled'

export default function LineInfo({ text, icon }) {
    return (
        <LineInfoContainer>
            <Icon icon={icon} />
            <LineInfoText>{text}</LineInfoText>
        </LineInfoContainer>
    )
}
