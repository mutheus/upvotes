import { FormEvent, useState } from 'react'
import { api } from 'services/api'
import { Form } from 'shared/styles'
import { useNavigate } from 'react-router'

export function Signup () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await api.post('/sign-up', {
      username,
      password,
    })

    navigate('/login')
  }

  return (
    <Form onSubmit={register}>
      <h4>Sign up</h4>

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

      <button type='submit'>Sign up</button>
    </Form>
  )
}
