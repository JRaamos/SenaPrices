import React, { useState, createContext, useEffect } from 'react'
import { ReadObject, SaveObject } from '../services/storage'
import { ReadMe } from 'services/me'
 
export const CoreContext = createContext({})

const readInitialSideState = () => {
    const persisted = ReadObject('side')
    if (typeof persisted === 'boolean') {
        return persisted
    }

    if (typeof window !== 'undefined') {
        return window.innerWidth >= 1024
    }

    return true
}

export const CoreState = ({ children }) => {
      
	const [ side, setSide ] = useState(readInitialSideState())  
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
