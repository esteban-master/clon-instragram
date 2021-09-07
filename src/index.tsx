import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

if (process.env.NODE_ENV === 'development') {
  const modules = import.meta.glob('./mocks/browser.ts')
  for (const path in modules) {
    modules[path]().then((mod) => {
      if ('worker' in mod) {
        const { worker } = mod
        worker.start()
      }
    })
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
