import { ResultType } from 'feeds'
import styled, { css } from 'styled-components'

type AlertProps = {
  result: ResultType
}

type AlertWrapperProps = {
  type?: string
}

const AlertWrapper = styled.div<AlertWrapperProps>`${({ type, theme }) => css`
  position: fixed;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${type === 'success' ? theme.colors.lightPurple : theme.colors.error};
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
    <AlertWrapper type={result.type}>
      <p>{result.message}</p>
    </AlertWrapper>
  )
}
