import styled from 'styled-components/macro'
import { Routes } from 'routes'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from 'contexts/auth-context'

const Container = styled.div`
  padding: 2em;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
`

export function App () {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Routes />
        </Router>
      </Container>
    </AuthProvider>
  )
}
