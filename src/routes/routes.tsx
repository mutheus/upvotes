import { Routes as Switch, Route, Navigate } from 'react-router-dom'
import { Signin } from 'pages/signin'
import { Signup } from 'pages/signup'
import { Feeds } from 'pages/feeds'
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

  if (isLoading) return <h5>Loading...</h5>

  return (
    <Switch>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Signin />} />
      <Route
        path='/feeds'
        element={
          <RequireAuth redirectTo='/login'>
            <Feeds />
          </RequireAuth>
        }
      />
    </Switch>
  )
}
