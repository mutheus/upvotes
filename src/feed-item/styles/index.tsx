import styled, { css } from 'styled-components/macro'

type BtnProps = {
  activeUserLikedIt?: number
  activeUserLovedIt?: number
}

export const FeedItemContainer = styled.div`
  display: flex;
  padding: 0 2em 2em;
  gap: 1em;
  font-size: .938rem;
`

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Content = styled.p`
  overflow-wrap: anywhere;
  line-height: 20px;
`

export const UserName = styled.p`
  margin: .3em 0;
  color: ${({ theme }) => theme.colors.darkGray};
  font-weight: 600;
`

export const CreatedAt = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: .9rem;
`

export const Interactions = styled.div`
  font-size: .9rem;
  display: flex;
  gap: 2em;
  font-weight: 500;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoveBtn = styled(Button)<BtnProps>`${({ activeUserLikedIt, theme }) => css`
  svg {
    path {
      fill: ${activeUserLikedIt === 1 ? theme.colors.purple : theme.colors.text};
    }
  }
`}`

export const LikeBtn = styled(Button)<BtnProps>`${({ activeUserLovedIt, theme }) => css`
  svg {
    path {
      fill: ${activeUserLovedIt === 1 ? theme.colors.purple : theme.colors.text};
    }
  }
`}`
