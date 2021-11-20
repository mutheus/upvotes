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
import { disableFormButton, isObjEmpty } from 'services/utils'
import { ResultType } from 'feeds'

export function Signup () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<ResultType>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult({})
    }, 2000)

    return () => clearTimeout(timer)
  }, [result])

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/sign-up', {
        username,
        password,
      })

      setResult({ type: 'success', message: 'Well done! Now you can log in' })

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err: unknown) {
      if (err instanceof Error) {
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
              placeholder='at least 3 characters'
            />
          </FormInputWrapper>

          <Button
            {...disableFormButton(username.length, password.length)}
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
