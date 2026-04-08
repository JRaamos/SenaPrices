import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";  
import moment from "moment";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { exposeStrapiError } from "utils";
import { DoLogout } from "services/authentication";
import { ReadMe, RemoveMe, UpdateMe } from "services/me";

export default function useController(){  
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${ to }`), [n]); 
    const goBack = useCallback(() => n(-1), [n]);

    const { user, setUser, setModal, reloadMe } = useContext(CoreContext)
   
    const [loading, setLoading] = useState(false)

    const formRef = useRef()
    
    const exit = useCallback(async () => {  
        await DoLogout() 
        navigate('login');
    }, [navigate]) 
 
    const init = useCallback(async () => {
        setLoading(true)

        try{
            const result = await ReadMe()
            if(result?.id){
                setUser(result)
            }
        } finally {
            setLoading(false)
        }
    }, [setUser])

    const removeAccount = useCallback(async () => {
        setLoading(true)

        try{
            const result = await RemoveMe()

            if(!exposeStrapiError(result)){
                toast.success('Conta excluída com sucesso')
                await exit()
            }
        } finally {
            setLoading(false)
        }
    }, [exit])

    const confirmRemove = useCallback(() => {
        setModal({
            type: "confirm",
            title: "Deseja realmente excluir sua conta?",
            text: "Após a exclusão não será possível recuperar seu perfil, acessos nem histórico vinculado.",
            action: () => removeAccount()
        })
    }, [removeAccount, setModal])

    const handleSave = useCallback(async () => {
        const form = formRef?.current?.getForm()
        if(!form || loading) return;

        const nextName = `${ form?.name || '' }`.trim()
        if(!nextName){
            toast.error("Informe um nome válido")
            return;
        }

        if(nextName === `${ user?.name || '' }`.trim()){
            toast.info("Nenhuma alteração para salvar")
            return;
        }

        setLoading(true)

        try{
            const result = await UpdateMe({ name: nextName })

            if(!exposeStrapiError(result)){
                toast.success("Perfil atualizado com sucesso")
                await reloadMe()
            }
        } finally {
            setLoading(false)
        }
    }, [loading, reloadMe, user])

    const goToSecurity = useCallback(() => navigate('dashboard/me/password'), [navigate])
    const goToSupport = useCallback(() => navigate('dashboard/support/create'), [navigate])

    const formItems = useMemo(() => ([
        { ref:"name", label:"Nome de exibição", placeholder:"Digite o nome que aparecerá na conta", required:true, full:true },
        { ref:"email", label:"E-mail de acesso", placeholder:"Email", disabled:true, full:true },
    ]), [])

    const header = useMemo(() => ({
        title: 'Minha Conta',
        breadcrumbs: [
            { label: 'Home', to: '/dashboard' },
            { label: 'Minha Conta' }
        ],
        actions: [
            { label: 'Senha e segurança', icon: 'password', rounded: true, outline: true, color: 'primary', action: goToSecurity },
            { label: 'Abrir suporte', icon: 'proposal', rounded: true, color: 'secondary', action: goToSupport },
        ]
    }), [goToSecurity, goToSupport])

    const actions = useMemo(() => ([
        { label:"Excluir conta", color:"error", rounded:true, left:true, outline:true, action: confirmRemove },
        { label:"Voltar", color:"primary", rounded:true, outline:true, action: goBack },
        { label:"Salvar alterações", color:"primary", rounded:true, loadable:true, action: handleSave }
    ]), [confirmRemove, goBack, handleSave])

    const summaryItems = useMemo(() => ([
        { label: 'Nome cadastrado', value: user?.name || '--' },
        { label: 'Email principal', value: user?.email || '--' },
        { label: 'Membro desde', value: formatDate(user?.createdAt || user?.created_at) },
        { label: 'Última atualização', value: formatDate(user?.updatedAt || user?.updated_at, true) },
    ]), [user])

    const quickActions = useMemo(() => ([
        {
            key: 'security',
            icon: '/icons/password.svg',
            title: 'Senha e segurança',
            description: 'Atualize sua senha e mantenha o acesso da conta protegido.',
            buttonLabel: 'Gerenciar senha',
            action: goToSecurity,
        },
        {
            key: 'support',
            icon: '/icons/proposal.svg',
            title: 'Suporte',
            description: 'Abra um ticket para solicitar ajuda, ajustes ou correções no sistema.',
            buttonLabel: 'Abrir ticket',
            action: goToSupport,
        },
    ]), [goToSecurity, goToSupport])

    const profile = useMemo(() => ({
        displayName: user?.name || 'Usuário SenaPrices',
        email: user?.email || 'email@nao-informado.com',
        memberSince: formatDate(user?.createdAt || user?.created_at),
        accountId: user?.documentId || user?.id || '--',
    }), [user])

    useEffect(() => {
        init()
    }, [init])

    return {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
        quickActions
    }
    
}

function formatDate(value, includeTime = false){
    if(!value){ return '--'; }

    const parsed = moment(value)
    if(!parsed.isValid()){ return '--'; }

    return includeTime ? parsed.format('L [às] LT') : parsed.format('L')
}
