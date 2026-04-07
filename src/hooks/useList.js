import { useCallback, useContext, useMemo, useState, useEffect } from "react";
import { CoreContext } from "context/CoreContext";
import { Delete, Read } from "services/core";
import { exposeStrapiError, normalizeStrapiList } from "utils";

export default function useList({ table, adapter, populate, filters, sort, paginate }){

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [total, setTotal] = useState(0)

    const { searchExpression } = useContext(CoreContext)

    const pagination = useMemo(() => {
        return {
            pageSize,
            page,
            pageCount,
            total,
            setPage,
            setPageSize
        }
    }, [ pageSize, page, pageCount, total, setPage, setPageSize ])

    const loadRegisters = useCallback(async () => {
         
        const pop = (populate || [
            // "profile.image"
        ]).map((m,k) => `populate[${k}]=${m}`)?.join("&")
        
        const fil = Object.entries((filters || {
            // "user": 1
        })).map(([key, value]) => `filters[${key}]=${value}`).join("&")
        
        const srt = (sort || [
            // "id:desc"
        ]).map((m,k) => `sort[${k}]=${m}`)?.join("&")

        const pag = paginate ? `pagination[pageSize]=${pageSize}&pagination[page]=${page + 1}` : ``

        const result = await Read(table, pop, fil, srt, pag)
        if(result && !exposeStrapiError(result)){
            const normalresult = normalizeStrapiList(result)
            setData(normalresult)

            const pageMeta = result?.meta?.pagination;
            setPageCount(pageMeta?.pageCount || 0)
            setTotal(pageMeta?.total || 0)
        }
    }, [table, populate, filters, page, pageSize])

    const init = useCallback(async () => {
        setLoading(true)
        await loadRegisters()
        setLoading(false)
    }, [loadRegisters])

    const filterExpression = useCallback(item => {
        return ( !searchExpression || Object.keys(item).filter(k => `${ item[k] }`.toLowerCase().indexOf(searchExpression.toLowerCase()) !== -1 ).length > 0)
    }, [searchExpression])

    const remove = useCallback(async (item) => {
        setLoading(true)
        const result = await Delete(table, item?.documentId)
        if(!(result && !exposeStrapiError(result))){
            setLoading(false)
            return;
        }
        init()
    }, [init, table])

    useEffect(() => { 
        init() ;
    }, [ init ])

    const registers = useMemo(() => {
        return (data||[])?.filter(filterExpression)?.map(adapter ? adapter : m => ({
            ...m
        }))
    }, [data, adapter, filterExpression])

    return {
        loading,
        registers,
        remove,
        pagination
    }
}