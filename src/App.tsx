import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import { VechaiProvider } from '@vechaiui/react'
import Router from './routes.routes'

const queryClient = new QueryClient()

function App() {
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
