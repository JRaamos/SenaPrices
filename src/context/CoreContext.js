import React, { useState, createContext, useEffect } from 'react'
import { ReadObject, SaveObject } from '../services/storage'
import { ReadMe } from 'services/me'
 
export const CoreContext = createContext({})

export const CoreState = ({ children }) => {
      
	const [ side, setSide ] = useState(ReadObject('side') ? ReadObject('side') : false)  
	const [ sideFilter, setSideFilter ] = useState(false)  
	const [ modal, setModal ] = useState(null)  
	const [ user, setUser ] = useState( ReadObject('user') ? ReadObject('user') : [])  

    const reloadMe = async () => {
        const result = await ReadMe()
        if(result?.id){
            setUser(result)
        } 
		return result
    }

	const contextValue = {  
		user, setUser,
		modal, setModal,
		side, setSide,
		sideFilter, setSideFilter,
		reloadMe
	}

	// to persist state when app reload  
    useEffect(() => { SaveObject('user', user) ;}, [user]) 
    useEffect(() => { SaveObject('side', side) ;}, [side]) 

	return <CoreContext.Provider value={contextValue}>{children}</CoreContext.Provider>
}
