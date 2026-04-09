import React from "react";

import Button from "components/Form/Button";
import Core from "components/Form/Core";
import ContainerUnauthenticated from "containers/Unauthenticated";

import useController from "./controller";
import {
    ActionRow,
    FormSpacer,
    FormText,
    FormTitle,
    PlanCard,
    PlanEyebrow,
    PlanText,
    PlanTitle,
    RegisterCall,
} from "./styled";

export default function Register() {
    const {
        formRef,
        formItems,
        loading,
        action,
        navigate,
        planLabel,
        billingLabel,
        goCheckout,
    } = useController();

    return (
        <ContainerUnauthenticated keep>
            <FormTitle>Crie sua conta SenaPrices</FormTitle>
            <FormText>
                Cadastre os dados iniciais da operação para seguir com a jornada comercial e liberar o acesso correto ao sistema.
            </FormText>

            {planLabel ? (
                <PlanCard>
                    <PlanEyebrow>Plano selecionado</PlanEyebrow>
                    <PlanTitle>{planLabel}</PlanTitle>
                    <PlanText>
                        {billingLabel
                            ? `Cobrança ${billingLabel.toLowerCase()} já registrada nesta jornada comercial.`
                            : "A contratação iniciada na etapa anterior continua vinculada a esta conta."}
                    </PlanText>
                    <ActionRow>
                        <Button color="primary" outline onClick={goCheckout}>Revisar contratação</Button>
                    </ActionRow>
                </PlanCard>
            ) : null}

            <Core ref={formRef} formItems={formItems} />
            <Button color="primary" loading={loading} onClick={action}>Criar conta</Button>
            <RegisterCall>Já possui uma conta?</RegisterCall>
            <Button color="primary" outline onClick={() => navigate("/login")}>Fazer login</Button>

            <FormSpacer />
        </ContainerUnauthenticated>
    );
}
