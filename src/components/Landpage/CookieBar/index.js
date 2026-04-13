import React from 'react'

import Button from 'components/Form/Button'
import { Icon } from 'ui/styled'
import {
    CookieActions,
    CookieBarWrap,
    CookieClose,
    CookieContent,
    CookieText,
} from './styled'

export default function CookieBar({ text, onAccept, onReject, onClose }) {
    return (
        <CookieBarWrap>
            <CookieContent>
                <Icon icon="info-outline" />
                <CookieText>{ text }</CookieText>
                <CookieClose onClick={ onClose }>
                    <Icon icon="close-white" />
                </CookieClose>
            </CookieContent>
            <CookieActions>
                <Button fit small nospace color="secondary" onClick={ onAccept }>
                    Aceitar e continuar
                </Button>
                <Button fit small nospace color="ghostDark" outline onClick={ onReject }>
                    Rejeitar
                </Button>
            </CookieActions>
        </CookieBarWrap>
    )
}
