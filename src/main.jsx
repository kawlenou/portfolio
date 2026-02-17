import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContentProvider } from './contexts/ContentContext'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ContentProvider>
  </StrictMode>,
)
