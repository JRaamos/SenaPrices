import React, { useContext, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
    DashboardMenuContainer,
    DashboardMenuShell,
    DashboardMenuBrand,
    DashboardMenuBrandText,
    DashboardMenuBrandTitle,
    DashboardMenuBrandSubtitle,
    DashboardCollapseButton,
    DashboardMenuList,
    DashboardMenuItem,
    DashboardMenuItemLabel,
    DashboardMenuFooter,
    DashboardUserCard,
    DashboardUserCardAvatar,
    DashboardUserCardContent,
    DashboardUserCardTitle,
    DashboardUserCardCode,
    DashboardUserCardAction,
    DashboardMenuVersion,
} from "./styled";

import { DoLogout } from "services/authentication";
import { CoreContext } from "context/CoreContext";
import { Icon } from "ui/styled";

const menuOptions = [
    { label: 'Criar Preço', icon: 'side-create-price', path: '/dashboard/create-price' },
    { label: 'Criação Rápida', icon: 'side-quick-create', path: '/dashboard/create-price/quick' },
    { label: 'Impressão em Lote', icon: 'side-batch-print', path: '/dashboard/print-batch', disabled: true },
    { label: 'Promoções', icon: 'side-promotions', path: '/dashboard/promotions', disabled: true },
    { label: 'Histórico', icon: 'side-history', path: '/dashboard/history', disabled: true },
    { label: 'Etiquetas', icon: 'side-labels', path: '/dashboard/labels', disabled: true },
    { label: 'Criar Item', icon: 'side-create-item', path: '/dashboard/items/create', disabled: true },
    { label: 'Itens', icon: 'side-items', path: '/dashboard/items', disabled: true },
    { label: 'Importar', icon: 'side-import', path: '/dashboard/import', disabled: true },
    { label: 'Relatórios', icon: 'side-reports', path: '/dashboard/reports', disabled: true },
    { label: 'Integração PDV', icon: 'side-pdv', path: '/dashboard/pdv', disabled: true },
    { label: 'Definições', icon: 'side-settings', path: '/dashboard/settings', disabled: true },
    { label: 'Log de Suporte', icon: 'side-support', path: '/dashboard/support', disabled: true },
    { label: 'Minha Conta', icon: 'side-account', path: '/dashboard/me' },
]

export default function DashboardSide({ fluid, }) {
    const n = useNavigate();
    const navigate = to => n(to);
    const { pathname } = useLocation();

    const { side, setSide, user } = useContext(CoreContext);

    const verifyClose = (event) => {
        if (!event.target.closest('.menu-contant')) {
            setSide(false);
        }
    };

    const exit = async () => {
        await DoLogout();
        navigate('/login');
    };

    const initials = useMemo(() => {
        return user?.name?.trim()?.[0]?.toUpperCase() || 'M';
    }, [user]);

    const userName = useMemo(() => {
        return user?.name || 'Master SenaPrices';
    }, [user]);

    const userCode = useMemo(() => {
        return user?.code || 'MASTER001';
    }, [user]);

    return (
        <>
            {!side && !fluid ? null :
                <DashboardMenuContainer fluid={fluid} opened={side} onClick={verifyClose}>
                    <DashboardMenuShell fluid={fluid} opened={side} >
                        <DashboardMenuBrand opened={side}>
                            {side ? (
                                <DashboardMenuBrandText>
                                    <DashboardMenuBrandTitle>
                                        <span>Sena</span>
                                        <strong>Prices</strong>
                                    </DashboardMenuBrandTitle>
                                    <DashboardMenuBrandSubtitle>Sistema promocional</DashboardMenuBrandSubtitle>
                                </DashboardMenuBrandText>
                            ) : (
                                <DashboardUserCardAvatar opened={side}>SP</DashboardUserCardAvatar>
                            )}
                            <DashboardCollapseButton onClick={() => setSide(!side)}>
                                <Icon icon="side-collapse" nomargin />
                            </DashboardCollapseButton>
                        </DashboardMenuBrand>

                        <DashboardMenuList>
                            {menuOptions.map((item) => (
                                <DashboardMenuItem
                                    key={item.label}
                                    opened={side}
                                    active={pathname === item.path}
                                    disabled={item.disabled}
                                    onClick={() => item.disabled ? null : navigate(item.path)}
                                >
                                    <Icon icon={item.icon} nomargin />
                                    {!side ? null : <DashboardMenuItemLabel active={pathname === item.path}>{item.label}</DashboardMenuItemLabel>}
                                </DashboardMenuItem>
                            ))}
                        </DashboardMenuList>

                        <DashboardMenuFooter opened={side}>
                            {side ? (
                                <>
                                    <DashboardUserCard onClick={() => navigate('/dashboard/me')}>
                                        <DashboardUserCardAvatar opened={side}>{initials}</DashboardUserCardAvatar>
                                        <DashboardUserCardContent>
                                            <DashboardUserCardTitle>{userName}</DashboardUserCardTitle>
                                            <DashboardUserCardCode>{userCode}</DashboardUserCardCode>
                                        </DashboardUserCardContent>
                                        <DashboardUserCardAction onClick={(event) => {
                                            event.stopPropagation();
                                            exit();
                                        }}>
                                            <Icon icon="side-logout" nomargin />
                                        </DashboardUserCardAction>
                                    </DashboardUserCard>
                                    <DashboardMenuVersion>SenaPrices v1.0.0</DashboardMenuVersion>
                                </>
                            ) : (
                                <DashboardUserCardAction onClick={exit}>
                                    <Icon icon="side-logout" nomargin />
                                </DashboardUserCardAction>
                            )}
                        </DashboardMenuFooter>
                    </DashboardMenuShell>
                </DashboardMenuContainer>
            }
        </>
    );
}
