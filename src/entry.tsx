import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './entry.css'

import App from './App'

const root = createRoot(document.getElementById('react-exercises-container') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
