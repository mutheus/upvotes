declare module 'feeds' {
  export type FeedType = {
    id: number,
    author: {
      username: string
    }
    content: string
    likes: number
    loves: number
    createdAt: string
    activeUserLikedIt: number
    activeUserLovedIt: number
  }

  export type ResultType = {
    type?: 'error' | 'success'
    message?: string
  }
}
