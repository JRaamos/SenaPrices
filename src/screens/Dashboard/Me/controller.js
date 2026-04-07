import { useContext, useEffect, useRef, useState } from "react";  

import { CoreContext } from "context/CoreContext";

import { exposeStrapiError } from "utils";

import { ReadMe, RemoveMe, UpdateMe } from "services/me";
import { toast } from 'react-toastify';
import { DoLogout } from "services/authentication";
import { useNavigate } from "react-router-dom";

export default function useController(){  
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 
    const goBack = () => n(-1);

    const { user, setUser, setModal, reloadMe } = useContext(CoreContext)
   
    const [loading, setLoading] = useState(false)

    const formRef = useRef()
    const formItems = [
        { ref:"name", placeholder:"Nome", required:true, full:true },
        { ref:"email", placeholder:"Email", disabled:true, full:true },
    ]

    const header = {
        title: 'Meu Perfil',
        breadcrumbs: [
            { label: 'Home', to: '/dashboard' },
            { label: 'Meu Perfil' }
        ]
    }

    const actions = [
        { label:"Excluir", color:"error", rounded:true, left:true, outline:true, action:() => confirmRemove() },
        { label:"Voltar", color:"primary", rounded:true, outline:true, action:() => goBack() },
        { label:"Salvar", color:"primary", rounded:true, loadable:true, action:() => handleSave() }
    ] 
    
    const exit = async () => {  
        await DoLogout() 
        navigate('login');
    }  
 
    const init = async () => {
        setLoading(true)
        const result = await ReadMe()
        if(result?.id){ setUser(result) ;}
        setLoading(false)
    }

    const removeAccount = async () => {
        setLoading(true)
        await RemoveMe();
        toast.error('Conta excluida com sucesso')
        exit();
        setLoading(false)
    }

    const confirmRemove = () => {
        setModal({
            type: "confirm",
            title: "Deseja realmente excluir?",
            text: "Após a exclusão não será possível recuperar sua conta",
            action: () => removeAccount()
        })
    }

    const handleSave = async () => {
        const form = formRef?.current?.getForm()
        if(!form) return;

        setLoading(true)
        const datapayload = {
            name: form?.name
        }

        const result = await UpdateMe(datapayload)

        if(!exposeStrapiError(result)){
            toast.success("Atualizado com sucesso")
            await reloadMe()
            goBack()
        }

        setLoading(false)
    }

    useEffect(() => {
        init()
    },[])

    return {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions
    }
    
}