
import react, {createContext, useContext, useState, useEffect} from "react";



const DarkModeContext = createContext();


export const useDarkMode = () => {
    return useContext(DarkModeContext);
}


export default function DarkModeProvider({children}){

    const [darkMode, setDarkMode] = useState(false);



    const ContextValues = {
        darkMode, setDarkMode
    }
    
    return <DarkModeContext.Provider value={ContextValues}>
        {children}
    </DarkModeContext.Provider>
}



