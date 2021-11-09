import styled from 'styled-components/macro'

export const FeedItemContainer = styled.div`
  display: flex;
  padding: 0 2em 2em;
  gap: 1em;

  img {
    width: 32px;
    height: 32px;
  }

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      word-break: break-all;
    }
  }
`

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

export const UserName = styled.p`
  margin: .3em 0;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: .95rem;
  font-weight: 600;
`

export const CreatedAt = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: .95rem;
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

export const LikeBtn = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;

  path {
    fill: ${({ theme }) => theme.colors.text};
    stroke: ${({ theme }) => theme.colors.text};
    stroke-width: .6px;
  }
`

export const LoveBtn = styled(LikeBtn)`
  path {
    stroke-width: 0;
  }
`
