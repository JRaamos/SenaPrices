import React, { useEffect } from "react";

import Header from 'components/Landpage/Header'
import Footer from 'components/Landpage/Footer'

import {
    Content,
    ContentBody
} from "./styled";
import { ThemedComponent } from "ui/theme";

export default function ContainerLandpage({ children }) {
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [])
    return (
        <ThemedComponent>
            <Content>
                <Header />
                <ContentBody>
                    {children}
                    {/* <Footer />  */}
                </ContentBody>
            </Content>
        </ThemedComponent>
    );
}
