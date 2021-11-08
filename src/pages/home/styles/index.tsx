import { Button } from 'shared/styles'
import styled from 'styled-components'

export const HomeTitle = styled.h1`
  margin-bottom: 1.4em;
`

export const UserWrapper = styled.div`
  display: flex;
  gap: 2em;
`

export const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
`

export const FieldFooter = styled.div`
  display: flex;
  align-items: center;

  *:last-child {
    margin-left: auto;
  }
`

export const HintWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  path {
    fill: ${({ theme }) => theme.colors.darkGray};
  }
`

export const Hint = styled.div`
  margin: 0;
  font-size: .9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGray};
`

export const UserAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`

export const FeedTextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 1em;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.text};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.purple};
  }
`

export const FeedButton = styled(Button)`
  border-radius: 100px;
`
