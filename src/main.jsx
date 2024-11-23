import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ToDo from './pages/todo.jsx'

createRoot(document.getElementById('_to-do-list')).render(
  <StrictMode>
    <ToDo />
  </StrictMode>,
)
