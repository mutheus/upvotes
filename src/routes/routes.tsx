import { Routes as Switch, Route } from 'react-router-dom'
import { Login } from 'pages/login'
import { Signup } from 'pages/signup'

export function Routes () {
  return (
    <Switch>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Switch>
  )
}
