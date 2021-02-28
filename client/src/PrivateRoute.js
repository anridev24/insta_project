import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from './context/auth'
import { ValidateToken } from './utils/'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory()
  const { authToken, setToken } = useAuth()

  if (!ValidateToken(authToken)) {
    setToken(null)
    history.push('/login')
  }

  return <Route {...rest} render={props => (authToken ? <Component {...props} /> : <Redirect to='/login' />)} />
}

export default PrivateRoute
