import authService from "./appwrite/auth";
import databaseService from "./appwrite/databaseService.js"
import userDataService from "./appwrite/userDataService.js"
import { login, logOut } from "./store/authSlice";
import { mutatePost } from "./store/postSlice"
import { mutateLikedPost } from "./store/userDataSlice.js";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Components/Loader"
import { Outlet,Navigate } from "react-router-dom";

export default function ProtectedRoutes(){
    const [isLoading,setIsLoading]=useState(true)
    const [currentUser,setCurrentUser]=useState(null)
    const dispatch=useDispatch()
    useEffect(()=>{
       authService?.getCurrentUser().then((user)=>{
        if(user){
        userDataService.getUser(user.$id).then(userData=>dispatch(mutateLikedPost(userData?.likedPost || [])))
       dispatch(login(user))
       setCurrentUser(user)
       databaseService
       .getAllPost()
       .then((posts) => dispatch(mutatePost(posts.documents))).finally(()=>setIsLoading(false))
        }
        else{
          dispatch(logOut())
          setCurrentUser(null)
        }
       })
       .finally(()=>setIsLoading(false))
    },[])
    if(isLoading)return <div className="min-h-screen w-full flex justify-center items-center">
      <Loader/>
    </div>
    return currentUser ? <Outlet/> : <Navigate to="/login"/>
  }
