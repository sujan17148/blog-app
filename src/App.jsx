import { Outlet } from "react-router-dom"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { ToastContainer} from "react-toastify"

function App(){
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
