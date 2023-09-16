import React,{createContext,useContext,useState} from 'react';

const ParamContext = createContext();

export const ParamProvider = ({children}) => {
    const [sharedParams,setSharedParams] = useState({});

    return(
        <ParamContext.Provider value={{sharedParams,setSharedParams}}>
            {children}
        </ParamContext.Provider>
    );
};

export const useSharedParams =() =>{
    return useContext(ParamContext);
};