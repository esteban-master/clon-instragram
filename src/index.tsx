import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'

// if (process.env.NODE_ENV === 'development') {
//   const modules = import.meta.glob('./mocks/browser.ts')
//   for (const path in modules) {
//     modules[path]().then((mod) => {
//       if ('worker' in mod) {
//         const { worker } = mod
//         worker.start()
//       }
//     })
//   }
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
