import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Si quieres un poco de estilo base sin instalar nada extra:
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)