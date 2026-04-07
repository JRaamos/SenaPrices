import React from "react"; 

import { 
    BackAction,
    BackActionBottom,
    CredentialsBox,
    CredentialsDescription,
    CredentialsItem,
    CredentialsTitle,
    LoginActions,
    LoginCard,
    LoginCardTitle,
    LoginLogo,
    LoginLogoAccent,
    LoginLogoBlock,
    LoginLogoCaption,
    LoginLogoText,
    LoginShell,
    LoginTab,
    LoginTabs,
    LoginTopBar,
    LoginTopButton,
    LoginWrapper,
    StyledCore,
    StyledPrimaryButton,
} from './styled' 

import ContainerUnauthenticated from "containers/Unauthenticated";

import useController from "./controller";

export default function Login(){ 
    
    const {
        formRef,
        formItems,
        navigate,
        loading,
        login,
        goPresentation
    } = useController()
 
    return ( 
        <ContainerUnauthenticated simple> 
            <LoginShell>
                <LoginTopBar>
                    <LoginTopButton onClick={goPresentation} type="button">
                        <BackAction />
                        Voltar à apresentação
                    </LoginTopButton>
                </LoginTopBar>

                <LoginWrapper>
                    <LoginLogoBlock>
                        <LoginLogo>
                            <LoginLogoText>Sena</LoginLogoText>
                            <LoginLogoAccent>Prices</LoginLogoAccent>
                        </LoginLogo>
                        <LoginLogoCaption>Sistema Promocional</LoginLogoCaption>
                    </LoginLogoBlock>

                    <LoginCard>
                        <LoginCardTitle>Entrar na sua conta</LoginCardTitle>

                        <LoginTabs>
                            <LoginTab $active type="button">Email e Senha</LoginTab>
                            <LoginTab type="button">Acesso por PIN</LoginTab>
                        </LoginTabs>

                        <StyledCore ref={formRef} formItems={formItems} flat />

                        <LoginActions>
                            <StyledPrimaryButton color="primary" loading={loading} onClick={login}>
                                Entrar
                            </StyledPrimaryButton>
                        </LoginActions>

                        <CredentialsBox>
                            <CredentialsTitle>Acesso padrão:</CredentialsTitle>
                            <CredentialsItem>Admin: admin@sistema.com / admin123 (PIN: 12341234)</CredentialsItem>
                            <CredentialsItem>Usuário: João Silva / user123 (PIN: 11112222)</CredentialsItem>
                            <CredentialsDescription onClick={() => navigate('forgot')} type="button">
                                Esqueceu sua senha?
                            </CredentialsDescription>
                        </CredentialsBox>
                    </LoginCard>

                    <BackActionBottom onClick={goPresentation} type="button">
                        <BackAction />
                        Voltar à página de apresentação
                    </BackActionBottom>
                </LoginWrapper>
            </LoginShell>
        </ContainerUnauthenticated> 
    );
}
