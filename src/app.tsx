import styled from 'styled-components/macro'
import { Routes } from 'routes'

const Container = styled.div`
  padding: 2em;
`

export function App () {
  return (
    <Container>
      <Routes />
    </Container>
  )
}
