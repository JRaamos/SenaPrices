import React, { useEffect } from "react";  
 
import Header from 'components/Dashboard/Header'  
  
import {
    DashboardPage,
    DashboardBody,
    DashboardBodyContent,
    Content,
    DashboardBodyContainer
} from "./styled";
import { ReadObject } from "services/storage";
import { useNavigate } from "react-router-dom";
import { ThemedComponent } from "ui/theme";
import DashboardSide from "components/Dashboard/Side";
import PageActions from "components/Dashboard/PageActions";
import { hasAuthenticatedSession } from "services/authentication";
import { getElementById, scrollToTop } from "services/runtime";

export default function ContainerAuthenticated({ children, actions, loading }){  

    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const LAYOUT_FLUID = true // side fixado

    const init = () => {
        const authentication = ReadObject('authentication')
        if (!hasAuthenticatedSession(authentication)) {
            completeNext()
        }
    }
 
    const completeNext = () => {
        navigate('login')
    }

    useEffect(() => {  
        init()
        const scrollHost = getElementById("body-scroll");
        if (scrollHost?.scrollTo) {
            scrollHost.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollToTop({ behavior: "smooth" });
        }
    }, [])

    return ( 
        <>
            <ThemedComponent>
                <Content>
                    <DashboardPage>
                        <Header /> 
                        <DashboardBody> 
                            <DashboardSide fluid={LAYOUT_FLUID} />  
                            <DashboardBodyContainer fluid={LAYOUT_FLUID}>
                                <DashboardBodyContent>                     
                                    { children }
                                </DashboardBodyContent>
                                { actions?.length ? <PageActions actions={actions} loading={loading} /> : null }
                            </DashboardBodyContainer>
                        </DashboardBody>  
                    </DashboardPage> 
                </Content>
            </ThemedComponent>
        </>
    );
}
