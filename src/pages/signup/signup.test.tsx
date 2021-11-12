import { render, screen } from '@testing-library/react'
import { Signup } from './signup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'

describe('First user interaction', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    </ThemeProvider>,
  )

  it('Show the form legend', () => {
    expect(screen.getAllByText('Sign up')[0]).toBeInTheDocument()
  })
})
