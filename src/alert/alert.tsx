import styled from 'styled-components'

type AlertProps = {
  message: string
}

const ErrorWrapper = styled.div`
  position: fixed;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.lightPurple};
  color: #fff;
  padding: 1em 2em;
  border-radius: 6px;
  box-shadow: 0px 10px 50px rgb(0 0 0 / 10%);
  text-align: center;

  p {
    margin: 0;
  }
`

export function Alert ({ message }: AlertProps) {
  return (
    <ErrorWrapper>
      <p>{message}</p>
    </ErrorWrapper>
  )
}
