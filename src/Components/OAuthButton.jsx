import authService from "../appwrite/auth"
import {login,logOut,} from "../store/authSlice"

export default function OAuthButton({label="Continue with google"}){
        function OAuthLogin(){
            authService.loginWithOAuth2().then(session=>setUser(session)).then(dispatch(login(session))).catch(()=>dispatch(logOut))
        }
   return <button onClick={OAuthLogin} className="whitespace-nowrap px-4 py-2 rounded text-white font-semibold bg-accent hover:scale-105 active:scale-95 transition duration-300 ease-linear">{label}</button>
}