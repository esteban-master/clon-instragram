import React from 'react'
import { useFeed } from '../../gql/post'
import PostItem from './Post'
import InfiniteScroll from 'react-infinite-scroll-component'

const ListPostFeed = () => {
  const feed = useFeed()

  if (feed.isLoading) {
    return <div>Cargando posts...</div>
  }

  const dataLength = feed.data?.pages.reduce((counter, page) => {
    return counter + page.data.length
  }, 0)

  return (
    <div className="flex justify-center ">
      {feed.status === 'success' && (
        <InfiniteScroll
          dataLength={dataLength!}
          next={feed.fetchNextPage}
          hasMore={!!feed.hasNextPage}
          loader={<div>Cargando infinite...</div>}
          // endMessage={<p>Se acabo todo !!!!</p>}
        >
          <div className="space-y-5">
            {feed.data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.data.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ListPostFeed
