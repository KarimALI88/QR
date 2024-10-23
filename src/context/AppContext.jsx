import React, {createContext, useState} from 'react'

export const AppContext = createContext()

const ContextProvider = (props) => {
    const [mode,setMode] = useState("light")
    return (
        <AppContext.Provider value={{mode, setMode}}>
            {props.children}
        </AppContext.Provider>
    )
}


export default ContextProvider