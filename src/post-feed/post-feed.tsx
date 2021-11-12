import { AuthContext } from 'contexts/auth-context'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { api } from 'services/api'
import BlankUser from 'shared/assets/blank-user.png'
import { ReactComponent as BulbIcon } from './assets/bulb-icon.svg'
import * as S from './styles'

type PostFeedProps = {
  onInteraction: () => void
}

export function PostFeed ({ onInteraction }: PostFeedProps) {
  const { setIsAuthenticated } = useContext(AuthContext)
  const [textAreaValue, setTextAreaValue] = useState('')
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    setIsAuthenticated(false)

    localStorage.removeItem('token')

    api.defaults.headers.common.Authorization = ''

    navigate('/login', { replace: true })
  }

  const handleFeedSubmit = async () => {
    await api.post('/feed', {
      content: textAreaValue,
    })

    setTextAreaValue('')
    onInteraction()
  }

  return (
    <>
      <button onClick={handleLogoutClick}>Log out</button>

      <S.HomeTitle>Home</S.HomeTitle>

      <S.UserWrapper>
        <S.UserAvatar src={BlankUser} alt='User' />

        <S.FeedForm>
          <S.FeedTextArea
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            placeholder='What’s happening?'
          />

          <S.FieldFooter>
            <S.HintWrapper>
              <BulbIcon />

              <S.Hint>Share your thoughts</S.Hint>
            </S.HintWrapper>

            <S.FeedButton onClick={handleFeedSubmit}>Send to Feed</S.FeedButton>
          </S.FieldFooter>
        </S.FeedForm>
      </S.UserWrapper>
    </>
  )
}
