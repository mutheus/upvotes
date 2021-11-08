import { FormEvent, useState } from 'react'
import { api } from 'services/api'
import {
  Form,
  FormTitle,
  FormDesc,
  FormInputWrapper,
  FormNotice,
} from 'ui/form-styles'
import { Wrapper, Button } from 'shared/styles'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export function Signup () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await api.post('/sign-up', {
      username,
      password,
    })

    navigate('/login')
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSignup}>
        <FormTitle>Sign up</FormTitle>

        <FormDesc>Welcome! Join us today creating your account.</FormDesc>

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

        <Button type='submit'>Sign up</Button>
      </Form>

      <FormNotice>Already have an account? <Link to='/login'>Sign in</Link></FormNotice>
    </Wrapper>
  )
}
