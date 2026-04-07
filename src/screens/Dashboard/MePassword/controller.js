import { useContext, useEffect, useRef, useState } from "react";

import { CoreContext } from "context/CoreContext";

import { exposeStrapiError, parseStrapiImage } from "utils";

import { ReadMe, RemoveMe, UpdateMe, UpdateMePassword } from "services/me";
import { toast } from 'react-toastify';
import { DoLogout } from "services/authentication";
import { useNavigate } from "react-router-dom";

export default function useController() {
    const n = useNavigate();
    const navigate = to => n(`/${to}`);
    const goBack = () => n(-1);

    const { user } = useContext(CoreContext)
    const [loading, setLoading] = useState(false)
    const formRef = useRef()

    const formItems = [
        { ref: "password", placeholder: "********", label: "Nova senha", type: "password", required: true, half: true },
        { ref: "cpassword", placeholder: "********", label: "Repita a nova senha", type: "password", required: true, half: true, onSubmitEditing: () => handleSave() },
        { passwordValidation: true, full: true },
    ]

    const header = {
        title: 'Senha e segurança',
        breadcrumbs: [
            { label: 'Home', to: '/dashboard' },
            { label: 'Senha e segurança' }
        ]
    }

    const actions = [
        { label:"Voltar", color:"primary", rounded:true, outline:true, action:() => goBack() },
        { label:"Salvar", color:"primary", rounded:true, loadable:true, action:() => handleSave() }
    ] 
    
    const handleSave = async () => {
        const form = formRef?.current?.getForm()
        if(!form) return;
        if(form.password !== form?.cpassword){ toast.error("Senha e confirmação precisam ser iguais"); return;}

        setLoading(true)
        const datapayload = {
            password: form?.password,
        }

        const result = await UpdateMePassword(datapayload)

        if(!exposeStrapiError(result)){
            toast.success("Atualizado com sucesso")
            goBack()
        }

        setLoading(false)
    }

    return {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions
    }

}