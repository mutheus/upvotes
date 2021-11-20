export const disableFormButton = (usernameLength: number, passwordLength: number) => {
  if (usernameLength < 3 || passwordLength < 3) return { disabled: true }
}

export const isObjEmpty = (obj: {}) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
