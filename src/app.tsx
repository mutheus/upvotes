import styled from 'styled-components/macro'

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
  return (
    <FormWrapper>
      <Form>
        <h4>Sign up</h4>

        <label htmlFor='username'>
          Username:<br />
          <input id='username' type='text' name='username' />
        </label>

        <label htmlFor='password'>
          Password:<br />
          <input id='password' type='password' name='password' />
        </label>

        <button type='submit'>Sign up</button>
      </Form>

      <Form>
        <h4>Sign in</h4>

        <label htmlFor='username'>
          Username:<br />
          <input id='username' type='text' name='username' />
        </label>

        <label htmlFor='password'>
          Password:<br />
          <input id='password' type='password' name='password' />
        </label>

        <button type='submit'>Sign in</button>
      </Form>
    </FormWrapper>
  )
}
