import { Wrapper } from 'shared/styles'
import styled from 'styled-components'
import { ReactComponent as SpinnerSvg } from '../assets/spinner.svg'

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

export const Spinner = styled(SpinnerSvg)`
  animation: rotate 2s linear infinite;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  .path {
    stroke: ${({ theme }) => theme.colors.lightPurple};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
