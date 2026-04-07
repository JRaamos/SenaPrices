import { useContext } from "react";  
import { useNavigate } from 'react-router-dom';

import { CoreContext } from "context/CoreContext";

export default function useController(){  
    const n = useNavigate();
    const navigate = to => n(`/${ to }`); 
    const goBack = () => n(-1);

    const { setModal } = useContext(CoreContext)

    const header = {
        title: 'Estado vazio',
        breadcrumbs: [
            { label: 'Home', to: '/dashboard' },
            { label: 'Estado vazio' }
        ],
        actions: [
            { label: 'Abrir Modal', rounded: true,  loadable:true, color: 'primary', action: () => handleOpenModal() },
        ]
    }
    
    const handleOpenModal = () => {
        setModal({
            type:'sample',
            // ...anything you need
        })
    }
    
    return {
        header
    }

}