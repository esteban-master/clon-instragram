import { rest } from 'msw'

const fakeData = {
  total_count: 2,
  items: [
    { id: 1, name: 'Cristiano Ronaldo' },
    { id: 2, name: 'Lionel Messi' }
  ]
}

const handlersRest = [
  rest.get('/jugadores', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakeData))
  })
]

export { handlersRest, fakeData }
