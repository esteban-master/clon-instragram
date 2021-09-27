import React from 'react'
import { useParams } from 'react-router'
import { useUserByUsername } from '../../gql/user'
import { useAuth } from '../../redux/store'
import { UserNotFound } from '../usernotfound'
import UserHeader from '../../components/userHeader'
import ListPosts from '../../components/listPosts'
import { usePostsUsername } from '../../gql/post'

const User = () => {
  const auth = useAuth()
  const { username } = useParams<{ username: string }>()
  const user = useUserByUsername(username, auth.login.user?._id)
  const posts = usePostsUsername(username)

  if (user.isError) return <UserNotFound />
  if (user.isLoading || posts.isLoading) return <p>Cargando</p>

  return (
    <>
      {user.data && (
        <>
          <UserHeader data={user.data} idUserLogged={auth.login.user?._id} />

          {posts.data && <ListPosts posts={posts.data} />}
        </>
      )}
    </>
  )
}

export default User
