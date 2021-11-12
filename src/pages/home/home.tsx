import { useCallback, useEffect, useState } from 'react'
import { api } from 'services/api'
import * as S from './styles'
import { PostFeed } from 'post-feed'
import { FeedItem } from 'feed-item'
import { FeedType } from 'feeds'

export function Home () {
  const [feeds, setFeeds] = useState([])

  const fetchAndSetData = useCallback(async () => {
    const { data } = await api.get('/feeds')

    setFeeds(data)
  }, [])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const onInteraction = () => {
    fetchAndSetData()
  }

  if (feeds.length === 0) return <h1>Loading...</h1>

  return (
    <S.HomeContainer>
      <PostFeed onInteraction={onInteraction} />

      <S.FeedWrapper>
        {
          feeds.map((feed: FeedType) => (
            <FeedItem
              key={feed.id}
              feed={feed}
              onInteraction={onInteraction}
            />
          ))
        }
      </S.FeedWrapper>
    </S.HomeContainer>
  )
}
