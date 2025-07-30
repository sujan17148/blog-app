import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
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
import ProtectedRoutes from "./ProtectedRoutes";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
          <Route path="user/:currentUser" element={<UserProfile />} />
          <Route path="article" element={<AllPosts/>} />
          <Route path="search" element={<Search/>} />
          <Route path="article/:id" element={<ArticleDetails />} />
          <Route path="edit/article/:id" element={<EditArticle/>} />
          <Route path="create" element={<CreateArticle />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound/>}/>
    </>
  )
);

  