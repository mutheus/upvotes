import { FormEvent, useEffect, useState } from 'react'
import { api } from 'services/api'
import {
  Form,
  FormTitle,
  FormDesc,
  FormInputWrapper,
  FormNotice,
} from 'ui/form-styles'
import { Wrapper, Button, SpinnerBtn } from 'shared/styles'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Alert } from 'alert'

export function Signup () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 2000)

    return () => clearTimeout(timer)
  }, [message])

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/sign-up', {
        username,
        password,
      })

      navigate('/login')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {message.length > 0 && <Alert message={message} />}

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
            {isLoading ? <SpinnerBtn /> : 'Sign up'}
          </Button>
        </Form>

        <FormNotice>Already have an account? <Link to='/login'>Sign in</Link></FormNotice>
      </Wrapper>
    </>
  )
}
