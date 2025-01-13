import React,{createContext,useContext,useState} from "react";

export const LoggedinContext = createContext(null);

export const useLogginContext = () => {
    const LogginDetails = useContext(LoggedinContext);
    return LogginDetails
}

export const LoggedinProvider = (props) => {

    const [isLoggedin , setIsLoggedin] = useState(false);

    return(
        <LoggedinContext.Provider value={{isLoggedin , setIsLoggedin}}>
            {props.children}
        </LoggedinContext.Provider>
    )
}