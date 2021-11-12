import { ReactComponent as HeartIcon } from './assets/heart-icon.svg'
import { ReactComponent as LikeIcon } from './assets/like-icon.svg'
import { ReactComponent as HeartIconFilled } from './assets/heart-icon-filled.svg'
import { ReactComponent as LikeIconFilled } from './assets/like-icon-filled.svg'
import BlankUser from 'shared/assets/blank-user.png'
import { FeedType } from 'feeds'
import * as S from './styles'
import { api } from 'services/api'
import { useEffect, useState } from 'react'
import { Alert } from 'alert'

type FeedItemProps = {
  feed: FeedType
  onInteraction: () => void
}

export function FeedItem ({ feed, onInteraction }: FeedItemProps) {
  const [message, setMessage] = useState('')
  const isLikedTrue = !!feed.activeUserLikedIt
  const isLovedTrue = !!feed.activeUserLovedIt

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 2000)

    return () => clearTimeout(timer)
  }, [message])

  const handleLikeClick = async (id: number) => {
    try {
      await api.post('/reaction', {
        feedId: id,
        like: !isLikedTrue,
      })

      onInteraction()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message)
      }
    }
  }

  const handleLoveClick = async (id: number) => {
    try {
      await api.post('/reaction', {
        feedId: id,
        love: !isLovedTrue,
      })

      onInteraction()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message)
      }
    }
  }

  return (
    <>
      {message.length > 0 && <Alert message={message} />}

      <S.FeedItemContainer>
        <S.UserAvatar src={BlankUser} alt='Blank user' />

        <S.UserInfo>
          <S.UserName>@{feed.author.username.replace(/[@.]/g, '')}</S.UserName>

          <S.Content>{feed.content}</S.Content>

          <S.CreatedAt>{feed.createdAt}</S.CreatedAt>

          <S.Interactions>
            <div>
              <S.LikeBtn
                onClick={() => handleLikeClick(feed.id)}
                isLikedTrue={isLikedTrue}
              >
                {
                  isLikedTrue
                    ? (
                      <LikeIconFilled />
                      )
                    : (
                      <LikeIcon />
                      )
                }
              </S.LikeBtn>

              <span>
                {feed.likes > 1 ? `${feed.likes} Likes` : `${feed.likes} Like`}
              </span>
            </div>

            <div>
              <S.LoveBtn
                onClick={() => handleLoveClick(feed.id)}
                isLovedTrue={isLovedTrue}
              >
                {
                  isLovedTrue
                    ? (
                      <HeartIconFilled />
                      )
                    : (
                      <HeartIcon />
                      )
                }
              </S.LoveBtn>

              <span>
                {feed.loves > 1 ? `${feed.loves} Loves` : `${feed.loves} Love`}
              </span>
            </div>
          </S.Interactions>
        </S.UserInfo>
      </S.FeedItemContainer>
    </>
  )
}
