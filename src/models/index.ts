export interface Login {
  token: string | undefined
  user: User | undefined
}

export interface User {
  _id: string
  username: string
  name: string
  email: string
  avatar: null
  createdAt: string
  followers: number
  following: number
  desc: null
  siteWeb: null
}

export interface Post {
  postedBy: Pick<User, '_id' | 'avatar' | 'username'>
  text?: string
  _id: string
  createdAt: string
  photo: string
  likes: Pick<User, '_id' | 'avatar' | 'username'>[]
}

// Graphql request
export interface ErrorGraphql {
  errors: Error[]
  data: null
  status: number
  headers: Headers
}

export interface Error {
  message: string
  extensions: Extensions
}

export interface Extensions {
  code: string
  response: Response
}

export interface Response {
  statusCode: number
  message: string
  error: string
}

export interface Headers {
  map: Map
}

export interface Map {
  'content-length': string
  'content-type': string
}
