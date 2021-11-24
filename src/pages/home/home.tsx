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
import { useNavigate } from 'react-router'

export function Home () {
  const [feeds, setFeeds] = useState([])
  const [requestResult, setRequestResult] = useRequestMessage()
  const [initialLoading, setinitialLoading] = useState(false)
  const [feedLoading, setFeedLoading] = useState(false)
  const navigate = useNavigate()

  const fetchAndSetData = useCallback(async () => {
    try {
      setTimeout(() => {
        setinitialLoading(false)
      }, 2000)

      const { data } = await api.get('/feeds')

      setFeeds(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('401')) {
          setRequestResult({ type: 'error', message: 'Your session has expired.' })

          setTimeout(() => {
            navigate('/login', { replace: true })
          }, 2000)

          return
        }

        setRequestResult({ type: 'error', message: 'Something went wrong.' })
      }
    } finally {
      setTimeout(() => {
        setFeedLoading(false)
      }, 2000)
    }
  }, [setRequestResult, navigate])

  useEffect(() => {
    setinitialLoading(true)
    setFeedLoading(true)
    fetchAndSetData()
  }, [fetchAndSetData])

  const onInteraction = () => {
    fetchAndSetData()
  }

  const handleReloadClick = () => {
    setFeedLoading(true)
    fetchAndSetData()
  }

  return (
    <>
      {!isObjEmpty(requestResult) && <Alert result={requestResult} />}

      {initialLoading
        ? (
          <Spinner />
          )
        : (
          <S.HomeContainer>
            <PostFeed onInteraction={onInteraction} />

            <S.FeedWrapper>
              {feedLoading
                ? (
                  <S.FeedSpinner />
                  )
                : (
                    feeds.length === 0
                      ? (
                        <S.ReloadBtn onClick={handleReloadClick}>Try again</S.ReloadBtn>
                        )
                      : (
                          feeds.map((feed: FeedType) => (
                            <FeedItem
                              key={feed.id}
                              feed={feed}
                              onInteraction={onInteraction}
                            />
                          ))
                        )
                  )}
            </S.FeedWrapper>
          </S.HomeContainer>
          )}
    </>
  )
}
