import {
  FormEvent,
  useState,
  useContext,
} from 'react'
import { api } from 'services/api'
import {
  FormEl,
  FormTitle,
  FormDesc,
  FormInputWrapper,
  FormNotice,
} from 'ui/form-styles'
import { Wrapper, Button, SpinnerBtn } from 'shared/styles'
import { AuthContext } from 'contexts/auth-context'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Alert } from 'alert'
import { isObjEmpty } from 'services/utils'
import useRequestMessage from 'hooks/useRequestMessage'

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

  return (
    <>
      {!isObjEmpty(requestResult) && <Alert result={requestResult} />}

      <Wrapper>
        <FormEl onSubmit={handleLogin}>
          <FormTitle>Login</FormTitle>

          <FormDesc>Welcome back! Please login to your account.</FormDesc>

          <FormInputWrapper>
            <label htmlFor='username'>Username:</label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id='username'
              type='text'
              name='username'
              placeholder='e.g. name_lastname'
            />
          </FormInputWrapper>

          <FormInputWrapper>
            <label htmlFor='password'>Password:</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              type='password'
              name='password'
              placeholder='at least 4 characters'
            />
          </FormInputWrapper>

          <Button
            disabled={(username.length === 0 || password.length === 0) && true}
            type='submit'
          >
            {isLoading ? <SpinnerBtn /> : 'Login'}
          </Button>
        </FormEl>

        <FormNotice>Don’t have an account? <Link to='/'>Sign up</Link></FormNotice>
      </Wrapper>
    </>
  )
}
