import styled from 'styled-components'

export const Wrapper = styled.div`
  max-width: 20em;
  margin: 0 auto;
  padding: 4em 0;
`

export const Button = styled.button`
  height: 48px;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 6px;
  padding: 0 1.5em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #FFF;
  font-size: .9rem;
`
