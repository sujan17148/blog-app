import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import Input from "../Components/Input";
import authService from "../appwrite/auth";
import {login, logOut} from "../store/authSlice"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import userDataService from "../appwrite/userDataService"
import {mutateLikedPost} from "../store/userDataSlice"
export default function Login() {
    const navigate=useNavigate()
    const dispatch =useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

 async function onSubmit(data) {
    try {
        const session =await authService.login(data)
        if(session){
           authService.getCurrentUser().then(currentuser=>{
               if(currentuser){
                   userDataService.getUser(currentuser.$id).then(userData=>dispatch(mutateLikedPost(userData?.likedPost || [])))
                   dispatch(login(currentuser))
                    reset()
                    navigate("/")
               }else{
                dispatch(logOut())
               }
           })
        }
    } catch (error) {
      toast.error("failed to login")
      console.log("login failed")
    }
  }

  return (
    <div className="min-h-[100vh] flex justify-center items-center bg-white dark:bg-slate-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-dark-primary w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col gap-6"
        noValidate
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Login</h1>

        <Input
          type="email"
          placeholder="Enter your email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address",
            },
          })}
          inputError={errors?.email?.message}
        />

        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            inputError={errors?.password?.message}
          />
          <button
            type="button"
            className="absolute top-[38px] right-3 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent hover:scale-105 active:scale-95 transition ease-linear duration-300 text-white font-semibold py-3 rounded"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
