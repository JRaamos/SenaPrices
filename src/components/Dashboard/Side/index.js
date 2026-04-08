import React, { useContext } from "react";  

import { useNavigate } from 'react-router-dom';

import {  

    DashboardMenuContainer,
    DashboardMenu,
    DashboardMenuHeader,
    DashboardMenuHeaderIcon,

    DashboardMenuHeaderUserContent,
    DashboardMenuHeaderUserImage, 
    DashboardMenuContent,
    DashboardMenuFooter,
    
    DashboardVersionContent,
    DashboardVersionText, 

} from "./styled"; 

import { DoLogout } from "services/authentication";
import { CoreContext } from "context/CoreContext";
import DashboardSideCollapse from "../SideCollapse";

export default function DashboardSide({ fluid }){ 
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const { side, setSide } = useContext(CoreContext)
    
    const verifyClose = e => {
        if(!e.target.closest('.menu-contant')){
            setSide(false)
        }
    }

    const exit = async () => {
        await DoLogout()
        navigate('login')
    }

    const menuOptions = [
        { label: 'Home', icon: 'home', path: 'dashboard', border: true },
        { label: 'Criar Preco', icon: 'products', path: 'dashboard/prices/create' },
        { label: 'Criacao Rapida', icon: 'products', path: 'dashboard/prices/quick' },
        { label: 'Impressao em Lote', icon: 'products', path: 'dashboard/prices/batch' },
        { label: 'Historico', icon: 'products', path: 'dashboard/history' },
        { label: 'Promocoes', icon: 'products', path: 'dashboard/promotions' },
        { label: 'Etiquetas', icon: 'products', path: 'dashboard/labels' },
        { label: 'Itens', icon: 'products', path: 'dashboard/items' },
        { label: 'Criar Item', icon: 'products', path: 'dashboard/items/create' },
        { label: 'Importar', icon: 'products', path: 'dashboard/items/import' },
        { label: 'Suporte', icon: 'proposal', path: 'dashboard/support' },
    ]

    const footerOptions = [
        {
            label: 'Minha Conta',
            icon: 'user',
            children: [
                { label: "Meu Perfil", path: `dashboard/me` },
                { label: "Senha e segurança", path: `dashboard/me/password` },
            ]
        },
        // { label: 'Fale conosco', icon: 'contact', action:() => window.open("mailto:contato@company.com") },
        { label: 'Sair', icon: 'exit', action: exit },
    ];

    return ( 
        <>  
            {
                !side && !fluid ? null :
                <DashboardMenuContainer fluid={fluid} opened={side} onClick={verifyClose}>
                    <DashboardMenu fluid={fluid} opened={side}>
                        {
                            fluid ? null : 
                            <DashboardMenuHeader onClick={() => setSide(false)}>
                                <DashboardMenuHeaderIcon src={'/icons/close-white.svg'} />
                                {/* fechar */}
                            </DashboardMenuHeader> 
                        }
                        <DashboardMenuHeaderUserContent fluid={fluid}>
                            <DashboardMenuHeaderUserImage opened={side} /> 
                        </DashboardMenuHeaderUserContent> 
                        <DashboardMenuContent>
                            <DashboardSideCollapse options={menuOptions} fluid={fluid} />
                        </DashboardMenuContent>
                        <DashboardMenuFooter>
                            <DashboardSideCollapse options={footerOptions} fluid={fluid} />
                            <DashboardVersionContent>
                                <DashboardVersionText>1.0.0</DashboardVersionText>
                                <DashboardVersionText>1.10.1.201</DashboardVersionText>
                            </DashboardVersionContent>
                        </DashboardMenuFooter>
                    </DashboardMenu>
                </DashboardMenuContainer>
            } 
        </>
    );
}
