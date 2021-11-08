import styled from 'styled-components/macro'

export const FormWrapper = styled.div`
  max-width: 20em;
  margin: 0 auto;
  padding: 4em 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`

export const FormTitle = styled.h4`
  margin: 0;
  font-size: 2rem;
`

export const FormDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray};
`

export const FormInputWrapper = styled.p`
  display: flex;
  flex-direction: column;
  gap: .8em;
  font-weight: 700;
  margin: 0 0 1em;
  font-size: .9rem;
  color: ${({ theme }) => theme.colors.darkGray};

  input {
    height: 37px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 6px;
    padding: 1.7em 1.5em;
    font-size: .9rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.purple};
    }
  }
`

export const FormButton = styled.button`
  height: 48px;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 6px;
  padding: 0 1.5em;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #FFF;
  font-size: .9rem;
`

export const FormNotice = styled.p`
  color: ${({ theme }) => theme.colors.gray};

  a {
    color: ${({ theme }) => theme.colors.lightPurple};
    font-weight: 700;
  }
`
