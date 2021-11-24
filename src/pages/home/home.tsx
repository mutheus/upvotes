import { useCallback, useEffect, useState } from 'react'
import { api } from 'services/api'
import * as S from './styles'
import { PostFeed } from 'post-feed'
import { FeedItem } from 'feed-item'
import { FeedType } from 'feeds'
import { Alert } from 'alert'
import { Spinner } from 'ui/spinner'
import { isObjEmpty } from 'services/utils'
import useRequestMessage from 'hooks/useRequestMessage'

export function Home () {
  const [feeds, setFeeds] = useState([])
  const [requestResult, setRequestResult] = useRequestMessage()
  const [isLoading, setIsLoading] = useState(false)

  const fetchAndSetData = useCallback(async () => {
    try {
      const { data } = await api.get('/feeds')

      setFeeds(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setRequestResult({ type: 'error', message: 'Something went wrong. Try reloading the page.' })
      }
    } finally {
      setIsLoading(false)
    }
  }, [setRequestResult])

  useEffect(() => {
    setIsLoading(true)
    fetchAndSetData()
  }, [fetchAndSetData])

  const onInteraction = () => {
    fetchAndSetData()
  }

  return (
    <>
      {!isObjEmpty(requestResult) && <Alert result={requestResult} />}

      {isLoading
        ? (
          <Spinner />
          )
        : (
            !isObjEmpty(requestResult) || feeds.length === 0
              ? (
                <h6>Try again</h6>
                )
              : (
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
          )}
    </>
  )
}
