import React, { useState } from "react"; 

import { 
    Brand,
    BrandHeading,
    BrandHighlight,
    BrandSubheading,
    ScreenContent,
    Card,
    Title,
    Tabs,
    TabButton,
    CredentialsForm,
    PrimaryActionWrapper,
    SupportBox,
    SupportTitle,
    SupportItem,
    SupportLabel,
    SupportValue,
    BackLink,
    BackLinkText,
    PinIntro,
    PinInputShell,
    PinInput,
    PinVisibilityButton
} from './styled' 

import Button from "components/Form/Button";
import { Icon } from "ui/styled";
import ContainerUnauthenticated from "containers/Unauthenticated";
import Core from "components/Form/Core";
import useController from "./controller";

export default function Login(){ 
    const [loginMode, setLoginMode] = useState('credentials')
    const [pin, setPin] = useState('')
    const [pinVisible, setPinVisible] = useState(false)
    
    const {
        formRef,
        formItems,
        navigate,
        loading,
        login
    } = useController()

    const topAction = (
        <BackLink onClick={() => navigate('')}>
            <Icon icon="chevron-grey" inverted />
            <BackLinkText>Voltar à apresentação</BackLinkText>
        </BackLink>
    )

    const bottomAction = (
        <BackLink onClick={() => navigate('')}>
            <Icon icon="chevron-grey" inverted />
            <BackLinkText>Voltar à página de apresentação</BackLinkText>
        </BackLink>
    )
 
    return ( 
        <ContainerUnauthenticated minimal topAction={topAction} bottomAction={bottomAction}> 
            <ScreenContent>
                <Brand>
                    <BrandHeading>
                        Sena<BrandHighlight>Prices</BrandHighlight>
                    </BrandHeading>
                    <BrandSubheading>Sistema Promocional</BrandSubheading>
                </Brand>

                <Card>
                    <Title>Entrar na sua conta</Title>

                    <Tabs>
                        <TabButton
                            active={loginMode === 'credentials'}
                            onClick={() => setLoginMode('credentials')}
                            type="button"
                        >
                            Email e Senha
                        </TabButton>
                        <TabButton
                            active={loginMode === 'pin'}
                            onClick={() => setLoginMode('pin')}
                            type="button"
                        >
                            Acesso por PIN
                        </TabButton>
                    </Tabs>

                    { loginMode === 'credentials' ? (
                        <>
                            <CredentialsForm>
                                <Core
                                    ref={formRef}
                                    formItems={formItems.map(item => ({
                                        ...item,
                                        label: item.ref === 'identifier' ? 'EMAIL OU NOME' : 'SENHA',
                                        placeholder: item.ref === 'identifier' ? 'master@senaprices.com' : 'Master@2025!',
                                    }))}
                                />
                            </CredentialsForm>
                            <PrimaryActionWrapper>
                                <Button color="primary" large rounded nospace loading={loading} onClick={login}>
                                    Entrar
                                </Button>
                            </PrimaryActionWrapper>
                        </>
                    ) : (
                        <>
                            <PinIntro>Digite seu PIN de acesso</PinIntro>
                            <PinInputShell>
                                <PinInput
                                    inputMode="numeric"
                                    maxLength={8}
                                    onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 8))}
                                    type={pinVisible ? 'text' : 'password'}
                                    value={pin}
                                />
                                <PinVisibilityButton onClick={() => setPinVisible(!pinVisible)} type="button">
                                    <Icon icon="eye" />
                                </PinVisibilityButton>
                            </PinInputShell>
                            <PrimaryActionWrapper>
                                <Button color="primary" large rounded nospace onClick={() => {}}>
                                    Entrar com PIN
                                </Button>
                            </PrimaryActionWrapper>
                        </>
                    )}

                    <SupportBox>
                        <SupportTitle>Acesso padrão:</SupportTitle>
                        <SupportItem color="violet">
                            <SupportLabel color="violet">Master:</SupportLabel>
                            <SupportValue>master@senaprices.com / Master@2025! (PIN: 00000000)</SupportValue>
                        </SupportItem>
                        <SupportItem color="yellow">
                            <SupportLabel color="yellow">Admin:</SupportLabel>
                            <SupportValue>admin@sistema.com / admin123 (PIN: 12341234)</SupportValue>
                        </SupportItem>
                        <SupportItem color="purple">
                            <SupportLabel color="purple">Sub-Admin:</SupportLabel>
                            <SupportValue>subadmin@sistema.com / subadmin123 (PIN: 99998888)</SupportValue>
                        </SupportItem>
                        <SupportItem color="blue">
                            <SupportLabel color="blue">Usuário:</SupportLabel>
                            <SupportValue>João Silva / user123 (PIN: 11112222)</SupportValue>
                        </SupportItem>
                    </SupportBox>
                </Card>
            </ScreenContent>
        </ContainerUnauthenticated>
    );
}
