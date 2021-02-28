import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'

import { AuthContext } from './context/auth'
import PrivateRoute from './PrivateRoute'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SavedItemsPage from './pages/SavedItemsPage'
function App() {
  const existingToken = JSON.parse(localStorage.getItem('auth-token')) || null
  const [authToken, setAuthToken] = useState(existingToken)

  const existingId = JSON.parse(localStorage.getItem('account-id')) || null
  const [accountId, setaccountId] = useState(existingId)

  const setId = data => {
    localStorage.setItem('account-id', JSON.stringify(data))
    setaccountId(data)
  }

  const setToken = data => {
    localStorage.setItem('auth-token', JSON.stringify(data))
    setAuthToken(data)
  }

  return (
    <AuthContext.Provider value={{ authToken, setToken, accountId, setId }}>
      <Router>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <PrivateRoute path='/dashboard' component={DashboardPage} />
          <PrivateRoute path='/saved_items' component={SavedItemsPage} />
          <Redirect to='/login' />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
