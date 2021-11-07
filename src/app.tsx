import styled from 'styled-components/macro'
import { Routes } from 'routes'
import { BrowserRouter as Router } from 'react-router-dom'

const Container = styled.div`
  padding: 2em;
`

export function App () {
  return (
    <Container>
      <Router>
        <Routes />
      </Router>
    </Container>
  )
}
