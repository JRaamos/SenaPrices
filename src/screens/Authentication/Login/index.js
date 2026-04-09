import React from "react";

import ContainerUnauthenticated from "containers/Unauthenticated";
import useController from "./controller";
import {
    BackAction,
    BrandList,
    BrandListItem,
    BrandPanel,
    BrandText,
    BrandTitle,
    CredentialCard,
    CredentialGrid,
    CredentialMeta,
    CredentialTitle,
    DividerText,
    Field,
    FieldErrorBox,
    FieldGrid,
    FieldHint,
    FieldInput,
    FieldLabel,
    LoginActions,
    LoginCaption,
    LoginCard,
    LoginCardText,
    LoginCardTitle,
    LoginGrid,
    LoginLogoAccent,
    LoginLogoRow,
    LoginLogoText,
    LoginShell,
    LoginTab,
    LoginTabs,
    LoginTopBar,
    LoginTopButton,
    LoginWrapper,
    PrimaryButton,
    SecondaryButton,
} from "./styled";

export default function Login() {
    const {
        loading,
        mode,
        stage,
        error,
        credentials,
        pin,
        demoCredentials,
        handleModeChange,
        handleCredentialsChange,
        handleSubmit,
        handleBackToCredentials,
        setPin,
        goPresentation,
        goRegister,
        goForgotPassword,
    } = useController();

    const isPinFlow = mode === "pin" || stage === "verify-pin";

    return (
        <ContainerUnauthenticated simple>
            <LoginShell>
                <LoginTopBar>
                    <LoginTopButton onClick={goPresentation} type="button">
                        <BackAction>\u2190</BackAction>
                        Voltar \u00e0 apresenta\u00e7\u00e3o
                    </LoginTopButton>
                </LoginTopBar>

                <LoginWrapper>
                    <LoginGrid>
                        <BrandPanel>
                            <LoginLogoRow>
                                <LoginLogoText>Sena</LoginLogoText>
                                <LoginLogoAccent>Prices</LoginLogoAccent>
                            </LoginLogoRow>
                            <LoginCaption>Sistema promocional para varejo</LoginCaption>
                            <BrandTitle>Autentica\u00e7\u00e3o segura para opera\u00e7\u00e3o, gest\u00e3o e conta master.</BrandTitle>
                            <BrandText>
                                O acesso respeita papel, plano e segunda etapa por PIN nas contas governadas localmente, sem misturar navega\u00e7\u00e3o p\u00fablica e \u00e1rea operacional.
                            </BrandText>
                            <BrandList>
                                <BrandListItem>Admin e subadmin governam cat\u00e1logo, impress\u00e3o, relat\u00f3rios e configura\u00e7\u00f5es operacionais.</BrandListItem>
                                <BrandListItem>Usu\u00e1rios operacionais entram com menu enxuto para criar, consultar, imprimir e receber campanhas.</BrandListItem>
                                <BrandListItem>A conta master fica isolada para governan\u00e7a da plataforma, temas sazonais e planos.</BrandListItem>
                            </BrandList>
                        </BrandPanel>

                        <LoginCard>
                            <LoginCardTitle>{stage === "verify-pin" ? "Confirme o PIN" : "Entrar na sua conta"}</LoginCardTitle>
                            <LoginCardText>
                                {stage === "verify-pin"
                                    ? "As credenciais foram aceitas. Falta a confirma\u00e7\u00e3o do PIN de 8 d\u00edgitos para liberar a sess\u00e3o."
                                    : "Escolha o fluxo de entrada mais adequado para sua opera\u00e7\u00e3o."}
                            </LoginCardText>

                            {stage !== "verify-pin" ? (
                                <LoginTabs>
                                    <LoginTab $active={mode === "credentials"} onClick={() => handleModeChange("credentials")} type="button">
                                        E-mail e senha
                                    </LoginTab>
                                    <LoginTab $active={mode === "pin"} onClick={() => handleModeChange("pin")} type="button">
                                        Acesso por PIN
                                    </LoginTab>
                                </LoginTabs>
                            ) : null}

                            <FieldGrid>
                                {!isPinFlow ? (
                                    <>
                                        <Field>
                                            <FieldLabel>E-mail ou nome</FieldLabel>
                                            <FieldInput
                                                value={credentials.identifier}
                                                placeholder="seu@email.com ou nome completo"
                                                onChange={event => handleCredentialsChange("identifier", event.target.value)}
                                                onKeyDown={event => event.key === "Enter" && handleSubmit()}
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Senha</FieldLabel>
                                            <FieldInput
                                                type="password"
                                                value={credentials.password}
                                                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                                                onChange={event => handleCredentialsChange("password", event.target.value)}
                                                onKeyDown={event => event.key === "Enter" && handleSubmit()}
                                            />
                                            <FieldHint>Se sua conta estiver mapeada com governan\u00e7a local, o PIN ser\u00e1 solicitado na segunda etapa.</FieldHint>
                                        </Field>
                                    </>
                                ) : (
                                    <Field>
                                        <FieldLabel>PIN de 8 d\u00edgitos</FieldLabel>
                                        <FieldInput
                                            value={pin}
                                            inputMode="numeric"
                                            maxLength={8}
                                            placeholder="00000000"
                                            onChange={event => setPin(event.target.value.replace(/\D/g, "").slice(0, 8))}
                                            onKeyDown={event => event.key === "Enter" && handleSubmit()}
                                        />
                                        <FieldHint>
                                            {mode === "pin"
                                                ? "Use este fluxo para entrada local r\u00e1pida quando a conta possuir PIN governado."
                                                : "Digite o PIN vinculado a esta conta para concluir a autentica\u00e7\u00e3o."}
                                        </FieldHint>
                                    </Field>
                                )}
                            </FieldGrid>

                            {error ? <FieldErrorBox>{error}</FieldErrorBox> : null}

                            <LoginActions>
                                <PrimaryButton onClick={handleSubmit} type="button">
                                    {loading ? "Validando..." : stage === "verify-pin" ? "Liberar sess\u00e3o" : mode === "pin" ? "Entrar com PIN" : "Entrar"}
                                </PrimaryButton>
                                {stage === "verify-pin" ? (
                                    <SecondaryButton onClick={handleBackToCredentials} type="button">Voltar</SecondaryButton>
                                ) : (
                                    <SecondaryButton onClick={goPresentation} type="button">Ver apresenta\u00e7\u00e3o</SecondaryButton>
                                )}
                            </LoginActions>

                            {stage !== "verify-pin" ? (
                                <LoginActions>
                                    <SecondaryButton onClick={goForgotPassword} type="button">Esqueci minha senha</SecondaryButton>
                                    <SecondaryButton onClick={goRegister} type="button">Criar conta</SecondaryButton>
                                </LoginActions>
                            ) : null}

                            <DividerText>Credenciais de homologa\u00e7\u00e3o</DividerText>
                            <CredentialGrid>
                                {demoCredentials.map(item => (
                                    <CredentialCard
                                        key={item.email}
                                        onClick={() => {
                                            if (stage === "verify-pin" || mode === "pin") {
                                                setPin(item.pin);
                                                return;
                                            }

                                            handleCredentialsChange("identifier", item.email);
                                            handleCredentialsChange("password", item.password);
                                        }}
                                        type="button"
                                    >
                                        <CredentialTitle>{item.title}</CredentialTitle>
                                        <CredentialMeta>{item.subtitle}</CredentialMeta>
                                    </CredentialCard>
                                ))}
                            </CredentialGrid>
                        </LoginCard>
                    </LoginGrid>
                </LoginWrapper>
            </LoginShell>
        </ContainerUnauthenticated>
    );
}
