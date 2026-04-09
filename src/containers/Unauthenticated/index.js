import React, { useEffect } from "react";  
import { useNavigate } from 'react-router-dom';

import { Row, Col } from 'reactstrap';   
import { ReadObject } from "services/storage"; 
import { getDefaultAuthenticatedPath } from "services/access";
import { hasAuthenticatedSession } from "services/authentication";
import { scrollToTop } from "services/runtime";
import { ThemedComponent } from "ui/theme";

import {
    SideBackgroundImageContainer,
    SideBackgroundImage,
    SideBackgroundImageDegree,

    FormContent,
    AppLogo,
    Content,
    Touch,
    SimpleContent,
} from './styled'
 

export default function ContainerUnauthenticated({ children, keep, simple }){   
    
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 

    const init = () => {
        const authentication = ReadObject('authentication')
        if (hasAuthenticatedSession(authentication) && !keep) {
            completeNext()
        }
    }
 
    const completeNext = () => {
        const currentUser = ReadObject("user") || {};
        const nextPath = getDefaultAuthenticatedPath(currentUser);
        n(nextPath);
    }

    useEffect(() => {  
        init()
        scrollToTop({ behavior: 'smooth' })
    }, [])

    return ( 
        <> 
            <ThemedComponent>
                {
                    simple ? (
                        <SimpleContent>{ children }</SimpleContent>
                    ) : (
                        <Content>
                            <Row>
                                <Col md={{ size:7 }}>
                                    <SideBackgroundImageContainer>
                                        <SideBackgroundImage />
                                        <SideBackgroundImageDegree />
                                    </SideBackgroundImageContainer>
                                </Col>
                                <Col md={{ size:5 }}>
                                    <FormContent>
                                        <Touch onClick={() => navigate('')}>
                                            <AppLogo /> 
                                        </Touch>
                                        { children }
                                    </FormContent>
                                </Col>
                            </Row>  
                        </Content>
                    )
                }
            </ThemedComponent>
        </>
    );
}
