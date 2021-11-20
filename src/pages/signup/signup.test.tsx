import { render, screen, fireEvent } from '@testing-library/react'
import { Signup } from './signup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'
import { disableFormButton } from 'services/utils'

describe('First user interaction', () => {
  function renderSignupScreen () {
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
      inputUsernameEl: screen.getByRole('textbox', { name: 'Username:' }),
      inputPasswordEl: screen.getByLabelText('Password:'),
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

  describe('When the form shows up,', () => {
    it('the submit button is disabled', () => {
      const { buttonEl } = renderSignupScreen()

      expect(buttonEl).toBeDisabled()
    })

    it('at least three characters is required to enable the submit button', () => {
      const { buttonEl } = renderSignupScreen()
      const usernameLength = [3, 2, 3]
      const passwordLength = [3, 3, 2]

      expect(disableFormButton(usernameLength[0], passwordLength[0])).toBeUndefined()
      expect(buttonEl).toHaveAttribute('disabled', '')
      expect(disableFormButton(usernameLength[1], passwordLength[1])).toBeTruthy()
      expect(buttonEl).toHaveAttribute('disabled')
      expect(disableFormButton(usernameLength[2], passwordLength[2])).toBeTruthy()
      expect(buttonEl).toHaveAttribute('disabled')
    })

    it('the user can create an account', () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSignupScreen()
      fireEvent.change(inputUsernameEl, { target: { value: 'test1' } })
      fireEvent.change(inputPasswordEl, { target: { value: '1234' } })
      fireEvent.click(buttonEl)
    })
  })
})
