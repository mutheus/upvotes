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
  const navigate = useNavigate()

  const fetchAndSetData = useCallback(async () => {
    try {
      const { data } = await api.get('/feeds')

      setFeeds(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('401')) {
          setRequestResult({ type: 'error', message: 'Your session has expired.' })

          navigate('/login', { replace: true })

          return
        }

        setRequestResult({ type: 'error', message: 'Something went wrong. Try reloading the page.' })
      }
    }
  }, [setRequestResult, navigate])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const onInteraction = () => {
    fetchAndSetData()
  }

  if (feeds.length === 0) return <Spinner />

  return (
    <>
      {!isObjEmpty(requestResult) && <Alert result={requestResult} />}

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
