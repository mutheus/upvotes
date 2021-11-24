import {
  FormEvent,
  useState,
  useContext,
} from 'react'
import { api } from 'services/api'
import { Wrapper } from 'shared/styles'
import { AuthContext } from 'contexts/auth-context'
import { useNavigate } from 'react-router'
import { Alert } from 'alert'
import { isObjEmpty } from 'services/utils'
import useRequestMessage from 'hooks/useRequestMessage'
import { Form } from 'form'

export function Signin () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [requestResult, setRequestResult] = useRequestMessage()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: token } = await api.post('/sign-in', {
        username,
        password,
      })

      localStorage.setItem('token', JSON.stringify(token))

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setIsAuthenticated(true)

      navigate('/home')
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('401')) {
          setRequestResult({ type: 'error', message: 'Incorrect username or password' })

          return
        }

        setRequestResult({ type: 'error', message: 'Something went wrong' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
  }

  return (
    <>
      {!isObjEmpty(requestResult) && <Alert result={requestResult} />}

      <Wrapper>
        <Form
          username={username}
          password={password}
          isLoading={isLoading}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
          title='Login'
          description='Welcome back! Please login to your account.'
          notice={
            {
              text: 'Don’t have an account?',
              to: 'Sign up',
              path: '/',
            }
          }
        />
      </Wrapper>
    </>
  )
}
