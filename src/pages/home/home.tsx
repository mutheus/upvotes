import { useCallback, useEffect, useState } from 'react'
import { api } from 'services/api'
import * as S from './styles'
import { PostFeed } from 'post-feed'
import { FeedItem } from 'feed-item'
import { FeedType } from 'feeds'
import { Alert } from 'alert'
import { Spinner } from 'ui/spinner'
import { isObjEmpty } from 'services/utils'

export function Home () {
  const [feeds, setFeeds] = useState([])
  const [result, setResult] = useState({})

  const fetchAndSetData = useCallback(async () => {
    try {
      const { data } = await api.get('/feeds')

      setFeeds(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResult({ type: 'error', message: 'Something went wrong' })
      }
    }
  }, [])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult({})
    }, 2000)

    return () => clearTimeout(timer)
  }, [result])

  const onInteraction = () => {
    fetchAndSetData()
  }

  if (feeds.length === 0) return <Spinner />

  return (
    <>
      {!isObjEmpty(result) && <Alert result={result} />}

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
