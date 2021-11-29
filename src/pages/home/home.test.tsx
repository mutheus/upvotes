import { render, screen } from '@testing-library/react'
import { Home } from './home'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const url = 'https://segware-book-api.segware.io/api/feeds'

const feedsRequest = rest.get(url, (req, res, ctx) => {
  return res(ctx.json([
    {
      id: 129,
      author: {
        username: 'joao8899',
      },
      content: 'test',
      likes: 3,
      loves: 1,
      createdAt: '2021-11-26T04:34:15.022Z',
      activeUserLikedIt: 1,
      activeUserLovedIt: 0,
    },
    {
      id: 113,
      author: {
        username: 'test',
      },
      content: 'another test',
      likes: 1,
      loves: 1,
      createdAt: '2021-11-12T11:08:51.767Z',
      activeUserLikedIt: 1,
      activeUserLovedIt: 1,
    },
  ]))
})

const feedsRequestError = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(402))
})

const feedsAuthError = rest.get(url, (req, res, ctx) => {
  return res(ctx.status(401))
})

const handlers = [feedsRequest]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Home page intereaction', () => {
  function renderHomeScreen () {
    const { findByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ThemeProvider>,
    )

    return {
      spinnerEl: screen.getByTestId('spinner'),
      findByText,
    }
  }

  test('a loading spinner is shown', () => {
    const { spinnerEl } = renderHomeScreen()

    expect(spinnerEl).toBeInTheDocument()
  })

  test('it should get the feeds', async () => {
    const { findByText } = renderHomeScreen()

    const username = await findByText('@joao8899')
    const feedContainer = screen.getByTestId('feedContainer')

    expect(username).toBeInTheDocument()
    expect(feedContainer.children.length).toBe(2)
  })

  describe('It should fail to get the feeds', () => {
    test('due to a generic error', async () => {
      server.use(feedsRequestError)
      const { findByText } = renderHomeScreen()

      const message = await findByText('Something went wrong.')

      expect(message).toBeInTheDocument()
    })

    test('due to a authorization error', async () => {
      server.use(feedsAuthError)
      const { findByText } = renderHomeScreen()

      const message = await findByText('Your session has expired.')

      expect(message).toBeInTheDocument()
    })
  })
})
