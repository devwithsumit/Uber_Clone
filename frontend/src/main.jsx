import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContextHook.jsx'
import CaptainContextHook from './context/CaptainContextHook.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContextHook>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContextHook>
  </StrictMode>,
)
