import React, { useContext, useEffect } from "react";

import Header from 'components/Dashboard/Header'

import {
    DashboardPage,
    DashboardBody,
    DashboardBodyContent,
    Content,
    DashboardBodyContainer
} from "./styled";
import { ReadObject } from "services/storage";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemedComponent } from "ui/theme";
import DashboardSide from "components/Dashboard/Side";
import PageActions from "components/Dashboard/PageActions";
import { CoreContext } from "context/CoreContext";

export default function ContainerAuthenticated({ children, actions, loading, hideHeader, plainContent }) {

    const n = useNavigate();
    const navigate = to => n(`/${to}`);
    const { pathname } = useLocation();

    const LAYOUT_FLUID = true // side fixado
    const { side, setSide } = useContext(CoreContext)

    const init = () => {
        const authentication = ReadObject('authentication')
        if (!authentication?.jwt) {
            completeNext()
        }
    }

    const completeNext = () => {
        navigate('login')
    }

    useEffect(() => {
        init()
        document.getElementById("body-scroll").scrollTo({ top: 0, behavior: 'smooth' })
    }, [])


    return (
        <>
            <ThemedComponent>
                <Content>
                    <DashboardPage>
                        {/* {<Header />} */}
                        <DashboardBody >
                            <DashboardSide fluid={LAYOUT_FLUID} />
                            <DashboardBodyContainer fluid={LAYOUT_FLUID}>
                                <DashboardBodyContent >
                                    {children}
                                </DashboardBodyContent>
                                {actions?.length ? <PageActions actions={actions} loading={loading} /> : null}
                            </DashboardBodyContainer>
                        </DashboardBody>
                    </DashboardPage>
                </Content>
            </ThemedComponent>
        </>
    );
}
