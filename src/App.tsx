import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import { VechaiProvider, Input } from '@vechaiui/react'
import Router from './routes.routes'

const queryClient = new QueryClient()

function App() {
  const [logged, setLogged] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
      <VechaiProvider>
        <Router />
      </VechaiProvider>
    </QueryClientProvider>
  )
}

export default App
