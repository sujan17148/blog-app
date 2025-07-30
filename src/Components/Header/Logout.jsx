import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import {logOut} from "../../store/authSlice"

export default  function Logout(){
    const dispatch=useDispatch()
  async function  handleLogout(e){
    e.preventDefault()
    const logoutResponse=  await authService.logOut()
    if(logoutResponse){
        dispatch(logOut())
        window.location.reload()
    }
    
    }
    return <button onClick={(e)=>handleLogout(e)} className="bg-accent hover:scale-105 active:scale-95 transition duration-300 ease-linear text-white px-3 py-2 font-medium whitespace-nowrap rounded">Logout</button>
}