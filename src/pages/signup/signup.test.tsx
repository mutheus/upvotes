import { render, screen, fireEvent } from '@testing-library/react'
import { Signup } from './signup'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const url = 'https://segware-book-api.segware.io/api/sign-up'

const signupRequest = rest.post(url, (req, res, ctx) => {
  return res(ctx.json({ success: true }))
})

const signupRequestError = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(402))
})

const handlers = [signupRequest]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
    test('the form legend is shown', () => {
      const { headingEl } = renderSignupScreen()

      expect(headingEl).toBeInTheDocument()
    })

    test('the sign up button is shown', () => {
      const { buttonEl } = renderSignupScreen()

      expect(buttonEl).toBeInTheDocument()
    })

    test('a sign in link is shown', () => {
      const { linkEl } = renderSignupScreen()

      expect(linkEl).toBeInTheDocument()
    })
  })

  describe('When the form shows up,', () => {
    test('the submit button is disabled', () => {
      const { buttonEl } = renderSignupScreen()

      expect(buttonEl).toBeDisabled()
    })

    test('at least three characters is required to enable the submit button', () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSignupScreen()

      fireEvent.change(inputUsernameEl, { target: { value: 'ggg' } })
      fireEvent.change(inputPasswordEl, { target: { value: '123' } })
      expect(buttonEl).not.toHaveAttribute('disabled')

      fireEvent.change(inputUsernameEl, { target: { value: 'ggg' } })
      fireEvent.change(inputPasswordEl, { target: { value: '12' } })
      expect(buttonEl).toHaveAttribute('disabled')

      fireEvent.change(inputUsernameEl, { target: { value: 'gg' } })
      fireEvent.change(inputPasswordEl, { target: { value: '123' } })
      expect(buttonEl).toHaveAttribute('disabled')
    })

    test('the user can create an account', async () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSignupScreen()

      fireEvent.change(inputUsernameEl, { target: { value: 'test1' } })
      fireEvent.change(inputPasswordEl, { target: { value: '1234' } })
      fireEvent.click(buttonEl)

      const message = await screen.findByText('Well done! Now you can log in')

      expect(message).toBeInTheDocument()
    })

    test('the request to create an account fails', async () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSignupScreen()
      server.use(signupRequestError)

      fireEvent.change(inputUsernameEl, { target: { value: 'test1' } })
      fireEvent.change(inputPasswordEl, { target: { value: '1234' } })
      fireEvent.click(buttonEl)

      const message = await screen.findByText('Something went wrong')

      expect(message).toBeInTheDocument()
    })
  })
})
