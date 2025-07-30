import { NavLink, Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Logout from "./Logout"
import SearchBar from "../SearchBar"

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const currentUser=useSelector(state=>state.auth.userData)
  return (
    <div className="h-[70px]  bg-light-primary shadow-xl dark:bg-dark-primary text-black dark:text-white p-5 md:px-10 flex items-cente justify-between">
      <div className="top-left flex items-center gap-20">
      <Link to="/" className="font-bold text-2xl md:text2xl text-accent">
        BlogSpace
      </Link>
      <ul className="links text-base font-medium lg:flex gap-5 hidden">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            Create Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/article"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            About
          </NavLink>
        </li>
      </ul>
      </div>
      <div className="top-right flex items-center  gap-2.5">
          <div className="searchbar max-w72 hidden sm:inline-block">
          <SearchBar/>
          </div>
          <MobileSearchBar/>
          <ThemeButton/>
          <MobileNavbar  authStatus={authStatus} currentUser={currentUser}/>
      <div className="authentication hidden lg:flex">
      {!authStatus ? (
          <div>
            <Link
              to="/login"
              className="dark:text-light-primary font-medium text-dark-primary  px-3 py-1.5 rounded whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-accent hover:bg-dark-accent text-white px-3 py-2 font-medium whitespace-nowrap rounded"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex gap-2.5 items-center">
            <Logout/>
            <Link to={`/user/${currentUser.name}`} className="bg-accent hover:bg-[#5b21b6] hover:scale-105 transition duration-300 ease-linear capitalize text-nowrap h-10 w-10 rounded-full flex items-center justify-center text-xl text-center text-white font-bold">{currentUser.name[0]}</Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

function MobileNavbar({authStatus,currentUser}) {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(true);
  return (
    <div className="lg:hidden relative">
      <RxHamburgerMenu
        className="text-2xl font-black"
        onClick={() => setIsMobileMenuVisible(false)}
      />
      <div 
        
        className={`mobile-menu p-5 absolute  z-10 -top-5.75 -right-5 bg-light-primary  dark:bg-dark-primary w-screen min-h-screen transition duration-300 ease-linear ${
          isMobileMenuVisible ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <RxCross2
          className="text-3xl font-bold absolute top-5 right-5"
          onClick={() => setIsMobileMenuVisible(true)}
        />
        <Link to="/" className="font-bold text-2xl md:text2xl text-accent">
          BlogSpace
        </Link>
        <ul className="links text-base font-medium space-y-2 mt-3"onClick={() => setIsMobileMenuVisible(true)} >
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            Create Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/article"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-accent border-b-2 pb-0.5 border-b-accent" : ""
            }
          >
            About
          </NavLink>
        </li>
      </ul>
          
        <div  onClick={() => setIsMobileMenuVisible(true)} className="top-right  items-center flex gap-2.5 my-4">
        {!authStatus ? (
          <div>
            <Link
              to="/login"
              className="dark:text-light-primary font-medium text-dark-primary  px-3 py-1.5 rounded whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-accent hover:bg-dark-accent text-white px-3 py-2 font-medium whitespace-nowrap rounded"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex gap-2.5 items-center">
            <Logout/>
            <Link to={`/user/${currentUser.name}`} className="bg-accent capitalize text-nowrap h-10 w-10 rounded-full flex items-center justify-center text-xl text-center text-white font-bold">{currentUser.name[0]}</Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

import { IoSearch } from "react-icons/io5";
import ThemeButton from "../ThemeButton";
function MobileSearchBar(){
  const [isSearchBarVisible,setIsSearchBarVisible]=useState(false)
  const location =useLocation()
  useEffect(()=>{
setIsSearchBarVisible(false)
  },[location])
  const searchBarRef=useRef()
  return <div className="relative sm:hidden">
           <IoSearch onClick={()=>{
            setIsSearchBarVisible(prev=>!prev)
            setTimeout(() => {
              searchBarRef.current.focus()
            }, 0);
           }} className="h-10 w-10 p-2 rounded-full hover:bg-accent"/>
            <div className={`search-bar absolute top-10 -right-4  w-66 ${isSearchBarVisible ? "":"hidden"}`}>
            <SearchBar ref={searchBarRef}/>
            </div>
  </div>
}
