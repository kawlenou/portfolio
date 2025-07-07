import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <App />
    <Footer/>
  </BrowserRouter>
  </StrictMode>,
)
