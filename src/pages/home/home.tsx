import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'contexts/auth-context'
import { useNavigate } from 'react-router'
import { api } from 'services/api'
import BlankUser from './assets/blank-user.png'
import { ReactComponent as BulbIcon } from './assets/bulb-icon.svg'
import * as S from './styles'

type FeedType = {
  id: number,
  author: {
    username: string
  }
  content: string
  likes: number
  loves: number
  createdAt: string
}

export function Home () {
  const [feeds, setFeeds] = useState([])
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/feeds')

      setFeeds(data)
    })()
  }, [])

  if (feeds.length === 0) return <h1>Loading...</h1>

  const handleLogoutClick = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.common.Authorization = ''
    navigate('/login')
  }

  return (
    <S.HomeContainer>
      <S.HomeTitle>Home</S.HomeTitle>

      <S.UserWrapper>
        <S.UserAvatar src={BlankUser} alt='User' />

        <S.TextFieldWrapper>
          <S.FeedTextArea placeholder='What’s happening?' />

          <S.FieldFooter>
            <S.HintWrapper>
              <BulbIcon />

              <S.Hint>Share your thoughts</S.Hint>
            </S.HintWrapper>

            <S.FeedButton>Send to Feed</S.FeedButton>
          </S.FieldFooter>
        </S.TextFieldWrapper>
      </S.UserWrapper>

      <button onClick={handleLogoutClick}>Log out</button>

      {
        feeds.map((feed: FeedType) => (
          <div key={feed.id}>
            <small>{feed.author.username}</small>

            <p>{feed.content}</p>

            <span>{feed.likes}</span>

            <span>{feed.loves}</span>

            <span>{feed.createdAt}</span>
          </div>
        ))
      }
    </S.HomeContainer>
  )
}
