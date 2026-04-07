import { GET, POST, PUT, DELETE } from './api'

const prepareQs = (populate, filters, sort, pagination) => {
    return `?${ populate ? populate : `populate=*` }${ filters ? `&${filters}` : `` }${ sort ? `&${sort}` : `&sort[0]=id:desc` }${ pagination ? `&${pagination}` : `` }`
}

export const Create = async (table, params) => {
    return await POST(`/${ table }`, params, true);
}

export const Read = async (table, populate, filters, sort, pagination) => {
    const qs = prepareQs(populate, filters, sort, pagination)
    return await GET(`/${ table }${qs}`, true);
}

export const ReadOne = async (table, id, populate, filters, sort, pagination) => {
    const qs = prepareQs(populate, filters, sort, pagination)
    return await GET(`/${ table }/${id}${qs}`, true);
}

export const Update = async (table, params, id) => {
    return await PUT(`/${ table }/${id}`, params, true);
}

export const Delete = async (table, id) => {
    return await DELETE(`/${ table }/${ id }`, true);
} 
 