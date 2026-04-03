import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Assicurati che il rendering avvenga dopo che il DOM è completamente caricato
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)