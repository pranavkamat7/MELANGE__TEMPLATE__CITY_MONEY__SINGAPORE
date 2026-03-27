import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import '@/styles/index.css'

// Remove prerender animation freeze injected by prerender.mjs
const prerenderFreeze = document.querySelector('style[data-prerender-freeze]')
if (prerenderFreeze) {
  prerenderFreeze.remove()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)