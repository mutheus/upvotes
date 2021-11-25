import { FormEvent, useState } from 'react'
import { api } from 'services/api'
import { Wrapper } from 'shared/styles'
import { useNavigate } from 'react-router'
import { Alert } from 'alert'
import { isObjEmpty } from 'services/utils'
import useRequestMessage from 'hooks/useRequestMessage'
import { Form } from 'form'

export function Signup () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [requestResult, setRequestResult] = useRequestMessage()

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/sign-up', {
        username,
        password,
      })

      setRequestResult({ type: 'success', message: 'Well done! Now you can log in.' })

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setRequestResult({ type: 'error', message: 'Something went wrong.' })
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
          handleSubmit={handleSignup}
          title='Sign up'
          description='Welcome! Join us today creating your account.'
          notice={
            {
              text: 'Already have an account?',
              to: 'Sign in',
              path: '/login',
            }
          }
        />
      </Wrapper>
    </>
  )
}
