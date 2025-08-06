import authService from "./appwrite/auth";
import databaseService from "./appwrite/databaseService.js"
import userDataService from "./appwrite/userDataService.js"
import { login, logOut } from "./store/authSlice";
import { mutatePost } from "./store/postSlice"
import { mutateLikedPost } from "./store/userDataSlice.js";
import { useState,useEffect } from "react";
import { useDispatch,} from "react-redux";
import Loader from "./Components/Loader"

import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { ToastContainer} from "react-toastify"

function App(){
  const [isLoading,setIsLoading]=useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    databaseService
    .getAllPost()
    .then((posts) => dispatch(mutatePost(posts.documents)))
    authService?.getCurrentUser().then((user)=>{
     if(user){
     userDataService.getUser(user.$id).then(userData=>dispatch(mutateLikedPost(userData?.likedPost || [])))
    dispatch(login(user))
     }
     else{
       dispatch(logOut())
     }
    })
    .finally(()=>setIsLoading(false))
 },[])
 if(isLoading)return <div className="min-h-screen w-full flex justify-center items-center">
   <Loader/>
 </div>
  return <>
    <ToastContainer
         position="top-right"
         autoClose={1000}
         hideProgressBar={false}
         oldestOnTop
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         toastClassName="max-w-[90%] m-1"/>
   <Header/>
   <Outlet/>
   <Footer/>
  </>
  
}

export default App
