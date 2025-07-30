import { useEffect, useState } from "react";
export default function useDebounce(value){
    const [debouncedValue,setDebouncedValue]=useState("")
    useEffect(()=>{
      let timeOutId=setTimeout(() => {
         setDebouncedValue(value.toLowerCase())
      }, 500);
      return ()=>clearTimeout(timeOutId)
    },[value])
    return {debouncedValue,setDebouncedValue}
}