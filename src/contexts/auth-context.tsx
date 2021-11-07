import {
  useState,
  createContext,
  ReactNode,
} from 'react'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({})

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
