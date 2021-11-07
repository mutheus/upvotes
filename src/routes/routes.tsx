import { Routes as Switch, Route, Navigate } from 'react-router-dom'
import { Signin } from 'pages/signin'
import { Signup } from 'pages/signup'
import { Home } from 'pages/home'
import { ReactNode, useContext } from 'react'
import { AuthContext } from 'contexts/auth-context'

type RequireAuthProps = {
  children: ReactNode
  redirectTo: string
}

function RequireAuth ({ children, redirectTo }: RequireAuthProps) {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />
}

export function Routes () {
  const { isLoading } = useContext(AuthContext)

  if (isLoading) return null

  return (
    <Switch>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Signin />} />
      <Route
        path='/home'
        element={
          <RequireAuth redirectTo='/login'>
            <Home />
          </RequireAuth>
        }
      />
    </Switch>
  )
}
