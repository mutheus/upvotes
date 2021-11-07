import {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react'
import { api } from 'services/api'

type AuthContextData = {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`
      setIsAuthenticated(true)
      setIsLoading(true)
    }

    setIsLoading(false)
  }, [])

  if (isLoading) return <h5>Loading...</h5>

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
