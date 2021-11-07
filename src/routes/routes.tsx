import { Routes as Switch, Route } from 'react-router-dom'
import { Signin } from 'pages/signin'
import { Signup } from 'pages/signup'
import { Feeds } from 'pages/feeds'

export function Routes () {
  return (
    <Switch>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Signin />} />
      <Route path='/feeds' element={<Feeds />} />
    </Switch>
  )
}
