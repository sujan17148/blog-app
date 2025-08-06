import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import App from "./App";
import Home from "./Pages/Home";
import ArticleDetails from "./Pages/ArticleDetails";
import EditArticle from "./Pages/EditArticle";
import CreateArticle from "./Pages/CreateArticle";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import UserProfile from "./Pages/UserProfile"
import AllPosts from "./Pages/AllPosts";
import Search from "./Pages/Search"
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="article" element={<AllPosts/>} />
          <Route path="search" element={<Search/>} />
          <Route path="article/:id" element={<ArticleDetails/>} />
          <Route path="about" element={<About />} />
      <Route element={<ProtectedRoutes/>}>
          <Route path="user/:currentUser" element={<UserProfile />} />
          <Route path="edit/article/:id" element={<EditArticle/>} />
          <Route path="create" element={<CreateArticle />} />
        </Route>
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound/>}/>
    </>
  )
);


 function ProtectedRoutes(){
    const isAuthenticated=useSelector(state=>state.auth.status)
    const navigate =useNavigate()
    return isAuthenticated ? <Outlet/> :   <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 px-4">
    <div className="bg-white dark:bg-dark-primary shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000] rounded-xl p-8 max-w-md text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You must be logged in to view this page.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-accent font-semibold text-white px-6 py-2 rounded-md hover:scale-105 active:scale-95  transition duration-200"
      >
        Go to Login
      </button>
    </div>
  </div>
  }