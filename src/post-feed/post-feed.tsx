import { AuthContext } from 'contexts/auth-context'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { api } from 'services/api'
import BlankUser from 'shared/assets/blank-user.png'
import { ReactComponent as BulbIcon } from './assets/bulb-icon.svg'
import * as S from './styles'

export function PostFeed () {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.common.Authorization = ''
    navigate('/login', { replace: true })
  }

  return (
    <>
      <button onClick={handleLogoutClick}>Log out</button>

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
    </>
  )
}
