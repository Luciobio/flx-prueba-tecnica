import { React, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
)
