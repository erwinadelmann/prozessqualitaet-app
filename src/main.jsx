import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import logoMental from './assets/logo_mental.png'

let favicon = document.querySelector("link[rel~='icon']")
if (!favicon) {
  favicon = document.createElement('link')
  favicon.rel = 'icon'
  document.head.appendChild(favicon)
}
favicon.type = 'image/png'
favicon.href = logoMental

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
