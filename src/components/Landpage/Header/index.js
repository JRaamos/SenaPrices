import React, { useState } from 'react'

import { Row, Col, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import {
    HeaderContainer,
    RowCenter,
    RowEnd,
    AppLogo,
    HeaderLeftMenu,
    HeaderMenuItem,
    HeaderMobile,
    MenuIcon,
    HeaderMobileMenu,
    HeaderMobileItem,
    HeaderContainerExtend
} from './styled';

import {
    Touch,
    ButtonWhite,
    Icon
} from 'ui/styled';
import Button from 'components/Form/Button';

export default function Header() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const n = useNavigate();
    const navigate = to => n(`/${to}`);

    const options = {
        left: [
            { title: 'Inicio', active: true, action: () => navigate('') },
            { title: 'Sobre', action: () => navigate('about') }
        ],
        right: [
            { title: 'Planos', color: 'lightgrey', outline: true, button: true, action: () => navigate('login') },
            { title: 'Acessar o sistema', color: 'secondary', rightIcon: 'chevron', button: true, action: () => navigate('register') },
        ]
    }

    return (
        <>
            <HeaderContainer>
                <HeaderContainerExtend fluid>
                    <Row>
                        <Col md={{ size: 7 }}>
                            <RowCenter>
                                <Icon icon='logo' />
                                {/* <HeaderLeftMenu>
                                    {
                                        options?.left?.map((item, key) => item.button ?
                                            <Button key={key} nospace outline={item.outline} onClick={item.action}>{item.title}</Button>
                                            :
                                            <HeaderMenuItem key={key} active={item.active} onClick={item.action}>{item.title}</HeaderMenuItem>
                                        )
                                    }
                                </HeaderLeftMenu> */}
                                <HeaderMobile>
                                    <Touch className="touch" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                        <MenuIcon />
                                    </Touch>
                                    {
                                        mobileMenuOpen ?
                                            <HeaderMobileMenu>
                                                {
                                                    [...options?.right]?.map((item, key) => item.button ?
                                                        <HeaderMobileItem key={key} centred>
                                                            <Button nospace outline={item.outline} rightIcon={item?.rightIcon} color={item?.color} nomargin onClick={item.action}>{item.title}</Button>
                                                        </HeaderMobileItem>
                                                        :
                                                        <HeaderMobileItem key={key} active={item.active} color={item?.color} onClick={item.action}>{item.title}</HeaderMobileItem>
                                                    )
                                                }
                                            </HeaderMobileMenu>
                                            : null
                                    }
                                </HeaderMobile>
                            </RowCenter>
                        </Col>
                        <Col md={{ size: 5 }}>
                            <RowEnd>
                                {
                                    options?.right?.map((item, key) => <div key={key}>
                                        {
                                            item.button ?
                                                <Button nospace color={item?.color} rightIcon={item?.rightIcon} small outline={item.outline} onClick={item.action}>{item.title}</Button>
                                                :
                                                <HeaderMenuItem className={item.active ? "active" : ""} onClick={item.action}>{item.title}</HeaderMenuItem>
                                        }
                                    </div>)
                                }
                            </RowEnd>
                        </Col>
                    </Row>
                </HeaderContainerExtend>
            </HeaderContainer>
        </>
    )
}
