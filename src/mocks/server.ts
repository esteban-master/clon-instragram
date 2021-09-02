import { setupServer } from 'msw/node'
import { handlersRest } from './handlers-rest'

const mockServer = setupServer(...handlersRest)

export { mockServer }
