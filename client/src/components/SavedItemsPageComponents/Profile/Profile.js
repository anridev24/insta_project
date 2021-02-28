import React, { useEffect, useState } from 'react'
import classes from './Profile.module.scss'

import axios from 'axios'

import { useAuth } from '../../../context/auth'

const Profile = () => {
  const [currentAccount, setCurrentAccount] = useState({ firstName: '', lastName: '', email: '' })
  const { accountId } = useAuth()

  useEffect(() => {
    axios.post('/api/account/account_info', { accountId }).then(response => setCurrentAccount(response.data))
  }, [accountId])
  return (
    <div className={classes.Wrapper}>
      <h4>Profile</h4>

      <div className={classes.AccountInfo}>
        <img src='https://iupac.org/wp-content/uploads/2018/05/default-avatar.png' alt='' />
        <div className={classes.InfoFields}>
          <h4>{currentAccount.firstName + ' ' + currentAccount.lastName}</h4>
          <h4>{currentAccount.email}</h4>
        </div>
      </div>
    </div>
  )
}

export default Profile
