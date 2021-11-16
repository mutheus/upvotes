export const disableFormButton = (usernameLength: number, passwordLength: number) => {
  if (usernameLength < 3 || passwordLength < 3) {
    return true
  }
}
