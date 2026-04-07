import { useContext, useMemo } from "react";  
import { useNavigate } from 'react-router-dom';

import useForm from "hooks/useForm";
import { Title } from "ui/styled";
import { optionsSupport } from "utils/options";
import { CoreContext } from "context/CoreContext";

export default function useController(){  
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 
    const goBack = () => n(-1);

    const { id, loading, register, formRef, save, remove } = useForm({ table:"supports" })

    const { setModal } = useContext(CoreContext)

    const header = useMemo(() => {
        return {
            title: 'Criar Ticket de Suporte',
            breadcrumbs: [
                { label: 'Home', to: '/dashboard' },
                { label: 'Suporte', to: '/dashboard/support' },
                { label: 'Ticket' }
            ],
            actions: [
                { label: 'Voltar', outline: true, rounded: true, color: 'primary', action: () => goBack() },
                { label: 'Salvar', rounded: true, color: 'primary', loadable: true, action: () => save() },
            ]
        }
    }, [])

    const formItems = useMemo(() => {
        return [
            { custom:<Title>Abrir ticket</Title>, full:true },
            { separator: true },
            { ref: 'title', label:"Título", placeholder:'Digite o título', half: true },
            { ref: 'support_status', label:"Status", placeholder:'Selecione o status', half: true, options: optionsSupport },
            { ref: 'description', type:'textarea', label:"Descrição", placeholder:"Digite a descrição", placeholder:'Digite a descrição', full: true },
        ]
    }, [])

    const actions = useMemo(() => [
        !id ? null : { label:"Excluir", color:"error", rounded:true, left:true, outline:true, action:() => confirmRemove() },
        { label:"Voltar", color:"primary", rounded:true, outline:true, action:() => goBack() },
        { label:"Salvar", color:"primary", rounded:true, loadable:true, action:() => save() }
    ]?.filter(f => f), [id])
    
    const confirmRemove = () => {
        setModal({
            type: "confirm",
            title: "Deseja realmente excluir?",
            text: "Após a exclusão não será possível recuperar o registro",
            action: () => remove()
        })
    }
    
    return {
        header, loading, register, formRef, formItems, actions
    }

}