import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import Router from './routes.routes'
import { graphqlClient } from './api/graphql'
import { useAuth } from './redux/store'

const queryClient = new QueryClient()

function App() {
  const { logged, login } = useAuth()
  useEffect(() => {
    if (logged) {
      console.log('Se llamo!!!! setHeader Graphql')
      graphqlClient.setHeader('Authorization', `Bearer ${login.token}`)
    }
  }, [logged])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
      <Router />
    </QueryClientProvider>
  )
}

export default App
