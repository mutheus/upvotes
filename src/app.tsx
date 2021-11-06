import { FormEvent, useState } from 'react'
import styled from 'styled-components/macro'
import { api } from 'services/api'

const FormWrapper = styled.div`
  padding: 2em;
  display: flex;
  gap: 2em;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-width: 20em;
  margin: 0 auto;

  h4 {
    margin: 0;
  }

  input {
    width: 100%;
  }
`

export function App () {
  const [regUsername, setRegUsername] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await api.post('/sign-up', {
      username: regUsername,
      password: regPassword,
    })

    setRegUsername('')
    setRegPassword('')
  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data: token } = await api.post('/sign-in', {
      username,
      password,
    })

    localStorage.setItem('token', JSON.stringify(token))
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return (
    <FormWrapper>
      <Form onSubmit={register}>
        <h4>Sign up</h4>

        <label htmlFor='username'>
          Username:<br />

          <input
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            id='username'
            type='text'
            name='username'
          />
        </label>

        <label htmlFor='password'>
          Password:<br />
          <input
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            id='password'
            type='password'
            name='password'
          />
        </label>

        <button type='submit'>Sign up</button>
      </Form>

      <Form onSubmit={login}>
        <h4>Sign in</h4>

        <label htmlFor='username'>
          Username:<br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id='username'
            type='text'
            name='username'
          />
        </label>

        <label htmlFor='password'>
          Password:<br />
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
    </FormWrapper>
  )
}
