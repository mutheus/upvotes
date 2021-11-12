import { render, screen } from '@testing-library/react'
import { Signup } from './signup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'

describe('First user interaction', () => {
  describe('When the page loads,', () => {
    it('the form legend is shown', () => {
      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Signup />
          </MemoryRouter>
        </ThemeProvider>,
      )

      const headingEl = screen.getByRole('heading', { name: 'Sign up' })
      expect(headingEl).toBeInTheDocument()
    })

    it('the sign up button is shown', () => {
      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Signup />
          </MemoryRouter>
        </ThemeProvider>,
      )

      const buttonEl = screen.getByRole('button', { name: 'Sign up' })
      expect(buttonEl).toBeInTheDocument()
    })

    it('a sign in link is shown', () => {
      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Signup />
          </MemoryRouter>
        </ThemeProvider>,
      )

      const buttonEl = screen.getByRole('link', { name: 'Sign in' })
      expect(buttonEl).toBeInTheDocument()
    })
  })
})
