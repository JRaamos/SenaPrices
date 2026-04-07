import { useContext, useEffect, useState } from "react";  

import { CoreContext } from "context/CoreContext";

import { parseStrapiImage } from "utils";

import { ReadMe, UpdateMe } from "services/me";

export default function useController(){  

    const { user, setUser } = useContext(CoreContext)
   
    const [preview, setPreview] = useState(user?.image?.url ? parseStrapiImage(user?.image?.url) : null)
    const [fetching, setFetching] = useState(false)
 

    const takePic = async (result) => { 
        setFetching(true)  
            if(result?.id){
                await UpdateMe({ image: result.id })
                setPreview( parseStrapiImage(result?.url) )
            } 
        setFetching(false) 
    }

    const init = async () => {
        setFetching(true)
        const result = await ReadMe()
        if(result?.id){
            setUser(result)
            if(result?.image?.url){ setPreview(parseStrapiImage(result?.image?.url)); }
        }
        setFetching(false)
    } 

    useEffect(() => {
        init()
    },[])
 

    return {
        preview,
        setPreview,
        takePic,
        fetching,
        user,
    }
    
}