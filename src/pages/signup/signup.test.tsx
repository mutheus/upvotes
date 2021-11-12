import { render, screen } from '@testing-library/react'
import { Signup } from './signup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'

describe('First user interaction', () => {
  function renderSignupScreen() {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </ThemeProvider>,
    )

    return {
      headingEl: screen.getByRole('heading', { name: 'Sign up' }),
      buttonEl: screen.getByRole('button', { name: 'Sign up' }),
      linkEl: screen.getByRole('link', { name: 'Sign in' }),
    }
  }

  describe('When the page loads,', () => {
    it('the form legend is shown', () => {
      const { headingEl } = renderSignupScreen()

      expect(headingEl).toBeInTheDocument()
    })

    it('the sign up button is shown', () => {
      const { buttonEl } = renderSignupScreen()

      expect(buttonEl).toBeInTheDocument()
    })

    it('a sign in link is shown', () => {
      const { linkEl } = renderSignupScreen()

      expect(linkEl).toBeInTheDocument()
    })
  })
})
