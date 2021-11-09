import { Wrapper } from 'shared/styles'
import styled from 'styled-components'

export const HomeContainer = styled(Wrapper)`
  max-width: 35em;
  padding: 0;
`

export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4em;
  padding-top: 2em;
  gap: 2em;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 6px;

  > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }
`
