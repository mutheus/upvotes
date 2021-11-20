import {
  FormEvent,
  useState,
  useContext,
  useEffect,
} from 'react'
import { api } from 'services/api'
import {
  Form,
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

export function Signin () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult({})
    }, 2000)

    return () => clearTimeout(timer)
  }, [result])

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
          setResult('Incorrect username or password')

          return
        }

        setResult({ type: 'error', message: 'Something went wrong' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isObjEmpty(result) && <Alert result={result} />}

      <Wrapper>
        <Form onSubmit={handleLogin}>
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
        </Form>

        <FormNotice>Don’t have an account? <Link to='/'>Sign up</Link></FormNotice>
      </Wrapper>
    </>
  )
}
