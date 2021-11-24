import { Wrapper } from 'shared/styles'
import styled from 'styled-components'
import { Spinner } from 'ui/spinner'

export const HomeContainer = styled(Wrapper)`
  max-width: 35em;
  padding: 0;
`
export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4em;
  padding: 2em 0;
  gap: 2em;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;

  > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }

  > *:last-child {
    padding-bottom: 0;
  }
`

export const FeedSpinner = styled(Spinner)`
  position: initial;
  margin: 0 auto;
  width: 40px;
  height: 40px;
`

export const ReloadBtn = styled.button`
  width: max-content;
  margin: 0 auto;
  background-color: transparent;
  border: none;
  padding: 0;
`
