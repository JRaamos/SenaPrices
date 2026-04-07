import { useMemo } from "react";  
import { useNavigate } from 'react-router-dom';

import useList from "hooks/useList";
import moment from "moment/moment";
import { ButtonContainer, Icon, IconButton, TableLabelColor, TableLabelContainer } from "ui/styled";
import { optionsSupport } from "utils/options";

export default function useController(){  
    const n = useNavigate();
    const navigate = to => n(`/${ to }`);
    const goBack = () => n(-1);

    const { registers, pagination } = useList({ table:"supports", paginate:true })

    const formPage = 'dashboard/support/create'

    const header = {
        title: 'Suporte',
        breadcrumbs: [
            { label: 'Home', to: '/dashboard' },
            { label: 'Suporte' }
        ],
        actions: [
            { label: 'Novo ticket', rounded: true, color: 'primary', action: () => navigate(formPage) },
        ]
    }

    const columns =  useMemo(() => {
        return [
            { title: 'ID', ref: 'id' },
            { title: 'Data', ref: 'date' },
            { title: 'Título', ref: 'title' },
            { 
                title: 'Status', 
                renderCell: ({ row }) => (
                    <TableLabelContainer>
                        <TableLabelColor color={ row?.statusColor }>
                            { optionsSupport?.find(f => f.id === row?.status)?.title }
                        </TableLabelColor>
                    </TableLabelContainer>
                )
            },
            { 
                title: ' ', 
                renderCell: ({ row }) => (
                    <ButtonContainer  onClick={() => navigate(`${formPage}/${row?.id}`)} >
                        <IconButton>
                            <Icon icon="chevron-right" pointer />
                        </IconButton>
                    </ButtonContainer>
                )  
            },
        ];  
    }, [])

    const rows = useMemo(() => {
        const colors = { "opened": "blue", "pending": "yellow", "answered": "green", "closed": "red" }
        return (registers||[])?.map(m => ({ 
            id: m?.documentId, 
            date: moment(m?.createdAt)?.format("L"), 
            title: m?.title, 
            status: m?.support_status, 
            statusColor: colors?.[m?.support_status]
        }))
    }, [registers])

    const table = useMemo(() => {
        return {
            rows,
            columns,
            config: { 
                tabs: { // opcional
                    all: "Todos", // opcional
                    ref: 'status',
                    options: optionsSupport,
                },
                search: { placeholder: "Pesquisar" }, // opcional
                filter: { placeholder: "Filtros" }, // opcional
                pagination
            }
        }
    }, [rows, columns])  
    
    return {
        header,
        table
    }
}