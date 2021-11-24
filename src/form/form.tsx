import {
  FormEl,
  FormTitle,
  FormDesc,
  FormInputWrapper,
  FormNotice,
} from 'ui/form-styles'
import { Button, SpinnerBtn } from 'shared/styles'
import { Link } from 'react-router-dom'
import { disableFormButton } from 'services/utils'
import { FormEvent } from 'react'

type NoticeType = {
  text: string
  to: string
  path: string
}

type FormProps = {
  username: string
  password: string
  isLoading: boolean
  handleUsernameChange: (value: string) => void
  handlePasswordChange: (value: string) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  title: string
  description: string
  notice: NoticeType
}

export function Form ({
  username,
  password,
  isLoading,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
  title,
  description,
  notice,
}: FormProps) {
  return (
    <>
      <FormEl onSubmit={handleSubmit}>
        <FormTitle>{title}</FormTitle>

        <FormDesc>{description}</FormDesc>

        <FormInputWrapper>
          <label htmlFor='username'>Username:</label>

          <input
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
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
            onChange={(e) => handlePasswordChange(e.target.value)}
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
          {isLoading ? <SpinnerBtn /> : title}
        </Button>
      </FormEl>

      <FormNotice>{notice.text} <Link to={notice.path}>{notice.to}</Link></FormNotice>
    </>
  )
}
