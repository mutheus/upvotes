import { AuthContext } from 'contexts/auth-context'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoutMenuRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (
        logoutMenuRef.current &&
        !logoutMenuRef.current.contains(e.target as Node) &&
        !avatarRef.current?.contains(e.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    })
  }, [])

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
      <S.HomeTitle>Home</S.HomeTitle>

      <S.UserWrapper>
        <S.UserAvatar
          ref={avatarRef}
          onClick={() => setIsMenuOpen(open => !open)}
          src={BlankUser}
          alt='User'
        />

        {isMenuOpen && (
          <S.LogoutMenu ref={logoutMenuRef}>
            <Link to=''>Visit Profile</Link>
            <Link to=''>Account Settings</Link>

            <Link
              to='/login'
              onClick={handleLogoutClick}
            >
              Log out
            </Link>
          </S.LogoutMenu>
        )}

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

            <S.FeedButton
              onClick={handleFeedSubmit}
              disabled={textAreaValue.length === 0 && true}
            >
              Send to Feed
            </S.FeedButton>
          </S.FieldFooter>
        </S.FeedForm>
      </S.UserWrapper>
    </>
  )
}
