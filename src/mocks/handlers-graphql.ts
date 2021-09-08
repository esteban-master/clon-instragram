import { graphql } from 'msw'

export const handlers = [
  graphql.mutation('loginUser', (req, res, ctx) => {
    const { email } = req.variables
    return res(
      ctx.data({
        login: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsIl9pZCI6IjYxMmU1MDVmNDhlYWVkYWI5OWJkZGIyYSIsImlhdCI6MTYzMTAzNDI2NywiZXhwIjoxNjMxMDQxNDY3fQ.YcI5QI-BtSe94V9WHrIMYse_p7AllS1u0VqF3ZF5ChM',
          user: {
            _id: '612e505f48eaedab99bddb2a',
            username: 'user_mock',
            name: 'User MOCK',
            email: email,
            avatar: null,
            createdAt: '1630425183433',
            desc: null,
            siteWeb: null
          }
        }
      })
    )
  }),
  graphql.mutation('createUser', (req, res, ctx) => {
    const { email, name } = req.variables.createUserData
    return res(
      ctx.data({
        createUser: {
          name,
          email
        }
      })
    )
  }),
  graphql.query('getUserByUsername', (req, res, ctx) => {
    const { username } = req.variables
    return res(
      ctx.data({
        userByUsername: {
          _id: '612e505f48eaedab99bddb2a',
          name: 'Usuario Mock',
          email: `${username}@gmail.com`,
          siteWeb: 'https://github.com',
          desc: 'Desc de usuario mock',
          avatar:
            'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'
        }
      })
    )
  })
]
