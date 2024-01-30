import 'macro-css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './assets/styles/global.css'
import './assets/styles/null.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
