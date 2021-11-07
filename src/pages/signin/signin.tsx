import {
  FormEvent,
  useState,
  useContext,
} from 'react'
import { api } from 'services/api'
import { Form } from 'shared/styles'
import { AuthContext } from 'contexts/auth-context'
import { useNavigate } from 'react-router'

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
    navigate('/feeds')
  }

  return (
    <Form onSubmit={handleLogin}>
      <h4>Sign in</h4>

      <label htmlFor='username'>
        Username:
        <br />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id='username'
          type='text'
          name='username'
        />
      </label>

      <label htmlFor='password'>
        Password:
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          type='password'
          name='password'
        />
      </label>

      <button type='submit'>Sign in</button>
    </Form>
  )
}
