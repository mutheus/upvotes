import { ResultType } from 'feeds'
import styled, { css } from 'styled-components/macro'

type AlertProps = {
  result: ResultType
}

type AlertWrapperProps = {
  statusType?: string
}

const AlertWrapper = styled.div<AlertWrapperProps>`${({ statusType, theme }) => css`
  position: fixed;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${statusType === 'success' ? theme.colors.lightPurple : theme.colors.error};
  color: #fff;
  padding: 1em 2em;
  border-radius: 6px;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  text-align: center;

  p {
    margin: 0;
  }
`}`

export function Alert ({ result }: AlertProps) {
  return (
    <AlertWrapper statusType={result.type}>
      <p>{result.message}</p>
    </AlertWrapper>
  )
}
