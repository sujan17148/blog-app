import { createContext, useState } from "react";
export const ThemeContext=createContext()
export default function ThemeContextProvider({children}){
    const [theme,setTheme]=useState("light")
    document.documentElement.classList.add(theme)
         return <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
         </ThemeContext.Provider>
}