import React from 'react'
import ListPostFeed from '../../components/listPostFeed'

const data = {
  _id: '615f3fe632535d1bf2d94e9d',
  postedBy: {
    _id: '61520999ae9933fe2f278087',
    username: 'nuevo3',
    avatar: null
  },
  text: 'Mi post 1 - Nuevo 3',
  photo:
    'http://res.cloudinary.com/dlsuecuz3/image/upload/v1633632229/Legends-Profile_Cristiano-Ronaldo1523460877263_eexacx.jpg',
  likes: [],
  createdAt: '2021-10-07T18:43:50.172Z'
}

const Home = () => {
  return (
    <div className="">
      <ListPostFeed />
    </div>
  )
}

export default Home
