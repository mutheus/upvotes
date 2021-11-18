import { render } from '@testing-library/react'
import { FeedItem } from './feed-item'
import { ThemeProvider } from 'styled-components'
import { theme } from 'resources/theme'

describe('Feed item component', () => {
  const feed = {
    id: 123,
    author: {
      username: 'jõao',
    },
    content: 'A test',
    likes: 2,
    loves: 1,
    createdAt: '2021-11-12T18:22:12.720Z',
    activeUserLikedIt: 0,
    activeUserLovedIt: 1,
  }

  it('The component´s snapshot should exactly match', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <FeedItem
          feed={feed}
          onInteraction={() => {}}
        />
      </ThemeProvider>)

    expect(container.firstChild).toMatchSnapshot()
  })
})
