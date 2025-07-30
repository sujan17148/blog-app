import { useContext, useEffect } from "react"
import { ThemeContext } from "../Context/ThemeContext"
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";

export default function ThemeButton(){
 const {theme,setTheme}=useContext(ThemeContext)
 useEffect(()=>{
  if(document.documentElement.classList.contains("light") && theme=="dark"){
       document.documentElement.classList.remove("light")
       document.documentElement.classList.add("dark")
  }
  else if(document.documentElement.classList.contains("dark") && theme=="light"){
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
  }
 },[theme])
 return theme=="light"? <LuMoon  className="h-10 w-10 rounded-full p-2 hover:bg-accent hover:text-white" onClick={()=>setTheme("dark")} />:<MdOutlineWbSunny className="h-10 w-10 rounded-full p-2 hover:bg-accent hover:text-white" onClick={()=>setTheme("light")} />
}