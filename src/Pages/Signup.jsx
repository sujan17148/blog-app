import Input from "../Components/Input";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logOut } from "../store/authSlice";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";
import userDataService from "../appwrite/userDataService"
import {mutateLikedPost} from "../store/userDataSlice"
export default function Signup() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError]=useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  async function signUp(data) {
     try {
      const session= await authService.createAccount(data)
     if(session){
         const currentUser=await authService.getCurrentUser()
         if(currentUser){
          const newUserDoc = {
            userId: currentUser.$id,
            email: currentUser.email,
            likedPost: [],
          }

          const customUserCreateResponse= await userDataService.createUser(newUserDoc)
           if(customUserCreateResponse){
           const userData= await userDataService.getUser(currentUser.$id)
             mutateLikedPost(userData?.likedPost || [])
            dispatch(login(currentUser))
            reset()
            setError("")
            navigate("/")
           }
        }else{
          dispatch(logOut())
        }
     }
     } catch (error) {
      setError(error.message || "Something went wrong during sign up.");
     }
  }
  return (
    <div className="min-h-[100vh] flex justify-center items-center dark:bg-neutral-800 bg-primary px-4">
    <form
      onSubmit={handleSubmit(signUp)}
      className="bg-white dark:bg-dark-primary w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col gap-6"
      noValidate
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h1>

      <Input
        type="text"
        placeholder="Enter your username"
        label="Username"
        {...register("username", { required: "Username is required" })}
        inputError={errors?.username?.message}
      />

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
            validate: {
              hasUppercase: (val) =>
                /[A-Z]/.test(val) || "Must contain an uppercase letter",
              hasNumber: (val) =>
                /\d/.test(val) || "Must contain a number",
              hasSymbol: (val) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(val) || "Must contain a symbol",
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
        className="bg-accent active:scale-95 hover:scale-105 transition ease-linear duration-300 text-white font-semibold py-3 rounded"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>

         {!!error && <p className="text-red-500 line-clamp-2 -mt-3 font-normal text-sm">*{error}</p>}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-accent hover:underline font-medium">
          Login here
        </Link>
      </p>
    </form>
  </div>
  );
}
