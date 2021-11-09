import { ReactComponent as HeartIcon } from './assets/heart-icon.svg'
import { ReactComponent as LikeIcon } from './assets/like-icon.svg'
import { ReactComponent as HeartIconFilled } from './assets/heart-icon-filled.svg'
import { ReactComponent as LikeIconFilled } from './assets/like-icon-filled.svg'
import BlankUser from 'shared/assets/blank-user.png'
import { FeedType } from 'feeds'
import * as S from './styles'
import { api } from 'services/api'

type FeedItemProps = {
  feed: FeedType
  onInteraction: () => void
}

export function FeedItem ({ feed, onInteraction }: FeedItemProps) {
  const isLikedTrue = !!feed.activeUserLikedIt
  const isLovedTrue = !!feed.activeUserLovedIt

  const handleLikeClick = async (id: number) => {
    await api.post('/reaction', {
      feedId: id,
      like: !isLikedTrue,
    })

    onInteraction()
  }

  const handleLoveClick = async (id: number) => {
    await api.post('/reaction', {
      feedId: id,
      love: !isLovedTrue,
    })

    onInteraction()
  }

  return (
    <S.FeedItemContainer>
      <S.UserAvatar src={BlankUser} alt='Blank user' />

      <S.UserInfo>
        <S.UserName>@{feed.author.username.replace(/[@.]/g, '')}</S.UserName>

        <S.Content>{feed.content}</S.Content>

        <S.CreatedAt>{feed.createdAt}</S.CreatedAt>

        <S.Interactions>
          <div>
            <S.LikeBtn onClick={() => handleLikeClick(feed.id)} isLikedTrue={isLikedTrue}>
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
            <S.LoveBtn onClick={() => handleLoveClick(feed.id)} isLovedTrue={isLovedTrue}>
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
  )
}
