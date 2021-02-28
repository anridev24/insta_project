import React from 'react'
import classes from './Navbar.module.scss'

import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../../context/auth'

const NavBar = () => {
  const { setToken, setId } = useAuth()

  const Logout = () => {
    localStorage.removeItem('user-id')
    localStorage.removeItem('auth-token')

    setToken(null)
    setId(null)
  }

  return (
    <ul>
      <li>
        <NavLink activeClassName={classes.ActiveLink} to='/dashboard'>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName={classes.ActiveLink} to='/saved_items'>
          Saved Items
        </NavLink>
      </li>

      <li className={classes.logoutButton} style={{ float: 'right' }}>
        <NavLink onClick={Logout} to='/login'>
          <span style={{ marginRight: '15px' }}>Logout</span>
          <FontAwesomeIcon size='lg' icon={faArrowCircleRight} />
        </NavLink>
      </li>
    </ul>
  )
}

export default NavBar
