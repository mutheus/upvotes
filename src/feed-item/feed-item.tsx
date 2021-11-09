import { ReactComponent as HeartIcon } from './assets/heart-icon.svg'
import { ReactComponent as LikeIcon } from './assets/like-icon.svg'
import { ReactComponent as HeartIconFilled } from './assets/heart-icon-filled.svg'
import { ReactComponent as LikeIconFilled } from './assets/like-icon-filled.svg'
import BlankUser from 'shared/assets/blank-user.png'
import { FeedType } from 'feeds'
import * as S from './styles'

type FeedItemProps = {
  feed: FeedType
}

export function FeedItem ({ feed }: FeedItemProps) {
  return (
    <S.FeedItemContainer>
      <S.UserAvatar src={BlankUser} alt='Blank user' />

      <S.UserInfo>
        <S.UserName>@{feed.author.username.replace(/[@.]/g, '')}</S.UserName>

        <S.Content>{feed.content}</S.Content>

        <S.CreatedAt>{feed.createdAt}</S.CreatedAt>

        <S.Interactions>
          <div>
            <S.LikeBtn activeUserLikedIt={feed.activeUserLikedIt}>
              {
                feed.activeUserLikedIt === 1
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
            <S.LoveBtn activeUserLovedIt={feed.activeUserLovedIt}>
              {
                feed.activeUserLovedIt === 1
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
