import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"
import {router} from "./Router.jsx"
import { RouterProvider } from 'react-router-dom'
import ThemeContextProvider from './Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
    <RouterProvider router={router}/>
      </ThemeContextProvider>
    </Provider>
  </StrictMode>,
)
