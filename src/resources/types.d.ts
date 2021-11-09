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
  }
}
