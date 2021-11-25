import { render, screen, fireEvent } from '@testing-library/react'
import { Signin } from './signin'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const url = 'https://segware-book-api.segware.io/api/sign-in'

const signinRequestError = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(402))
})

const signinAuthorizationError = rest.post(url, (req, res, ctx) => {
  return res(ctx.status(401))
})

const handlers = [signinRequestError]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login page interaction', () => {
  function renderSigninScreen () {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </ThemeProvider>,
    )

    return {
      headingEl: screen.getByRole('heading', { name: 'Login' }),
      buttonEl: screen.getByRole('button', { name: 'Login' }),
      linkEl: screen.getByRole('link', { name: 'Sign up' }),
      inputUsernameEl: screen.getByRole('textbox', { name: 'Username:' }),
      inputPasswordEl: screen.getByLabelText('Password:'),
    }
  }

  describe('When the page loads,', () => {
    test('the form legend is shown', () => {
      const { headingEl } = renderSigninScreen()

      expect(headingEl).toBeInTheDocument()
    })

    test('the login button is shown', () => {
      const { buttonEl } = renderSigninScreen()

      expect(buttonEl).toBeInTheDocument()
    })

    test('a sign up link is shown', () => {
      const { linkEl } = renderSigninScreen()

      expect(linkEl).toBeInTheDocument()
    })
  })

  describe('When the form shows up,', () => {
    test('the submit button is disabled', () => {
      const { buttonEl } = renderSigninScreen()

      expect(buttonEl).toBeDisabled()
    })

    test('at least three characters is required to enable the submit button', () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSigninScreen()

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
  })

  describe('When the user trys to access his account and fails,', () => {
    test('a generic error message is shown', async () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSigninScreen()

      fireEvent.change(inputUsernameEl, { target: { value: 'test1' } })
      fireEvent.change(inputPasswordEl, { target: { value: '1234' } })
      fireEvent.click(buttonEl)

      const message = await screen.findByText('Something went wrong.')

      expect(message).toBeInTheDocument()
    })

    test('a authorization error is shown', async () => {
      const { inputUsernameEl, inputPasswordEl, buttonEl } = renderSigninScreen()

      server.use(signinAuthorizationError)

      fireEvent.change(inputUsernameEl, { target: { value: 'test1' } })
      fireEvent.change(inputPasswordEl, { target: { value: '1234' } })
      fireEvent.click(buttonEl)

      const message = await screen.findByText('Unknown user or incorrect username or password.')

      expect(message).toBeInTheDocument()
    })
  })
})
