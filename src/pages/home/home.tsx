import { useCallback, useEffect, useState } from 'react'
import { api } from 'services/api'
import * as S from './styles'
import { PostFeed } from 'post-feed'
import { FeedItem } from 'feed-item'
import { FeedType } from 'feeds'
import { Alert } from 'alert'
import { Spinner } from 'ui/spinner'

export function Home () {
  const [feeds, setFeeds] = useState([])
  const [message, setMessage] = useState('')

  const fetchAndSetData = useCallback(async () => {
    try {
      const { data } = await api.get('/feeds')

      setFeeds(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message)
      }
    }
  }, [])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 2000)

    return () => clearTimeout(timer)
  }, [message])

  const onInteraction = () => {
    fetchAndSetData()
  }

  if (feeds.length === 0) return <Spinner />

  return (
    <>
      {message.length > 0 && <Alert message={message} />}

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
    </>
  )
}
