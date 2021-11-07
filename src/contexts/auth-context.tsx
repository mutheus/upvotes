import { createContext, ReactNode } from 'react'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({})

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
