import { setupWorker } from 'msw'
import { handlers } from './handlers-graphql'

const worker = setupWorker(...handlers)

export { worker }
