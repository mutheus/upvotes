import { useEffect, useState } from 'react'
import { api } from 'services/api'
import * as S from './styles'
import { PostFeed } from 'post-feed'
import { FeedItem } from 'feed-item'
import { FeedType } from 'feeds'

export function Home () {
  const [feeds, setFeeds] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/feeds')

      setFeeds(data)
    })()
  })

  if (feeds.length === 0) return <h1>Loading...</h1>

  return (
    <S.HomeContainer>
      <PostFeed />

      <S.FeedWrapper>
        {
          feeds.map((feed: FeedType) => (
            <FeedItem key={feed.id} feed={feed} />
          ))
        }
      </S.FeedWrapper>
    </S.HomeContainer>
  )
}
