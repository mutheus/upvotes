import {
  FormEvent,
  useState,
  useContext,
} from 'react'
import { api } from 'services/api'
import {
  Form,
  FormTitle,
  FormDesc,
  FormInputWrapper,
  FormNotice,
} from 'ui/form-styles'
import { Wrapper, Button } from 'shared/styles'
import { AuthContext } from 'contexts/auth-context'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export function Signin () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data: token } = await api.post('/sign-in', {
      username,
      password,
    })

    localStorage.setItem('token', JSON.stringify(token))
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setIsAuthenticated(true)
    navigate('/home')
  }

  return (
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
            placeholder='name@domain.com'
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

        <Button type='submit'>Login</Button>
      </Form>

      <FormNotice>Don’t have an account? <Link to='/'>Sign up</Link></FormNotice>
    </Wrapper>
  )
}
