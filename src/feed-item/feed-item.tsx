import { ReactComponent as HeartIcon } from './assets/heart-icon.svg'
import { ReactComponent as LikeIcon } from './assets/like-icon.svg'
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

      <div>
        <S.UserName>@{feed.author.username.replace(/[@.]/g, '')}</S.UserName>

        <p>{feed.content}</p>

        <S.CreatedAt>{feed.createdAt}</S.CreatedAt>

        <S.Interactions>
          <div>
            <S.LikeBtn>
              <LikeIcon />
            </S.LikeBtn>

            <span>
              {feed.likes > 1 ? `${feed.likes} Likes` : `${feed.likes} Like`}
            </span>
          </div>

          <div>
            <S.LoveBtn>
              <HeartIcon />
            </S.LoveBtn>

            <span>
              {feed.loves > 1 ? `${feed.loves} Loves` : `${feed.loves} Love`}
            </span>
          </div>
        </S.Interactions>
      </div>
    </S.FeedItemContainer>
  )
}
