import React from 'react'
import classes from './InstagramUserCard.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InstagramUserCard = ({ user, operation, icon, saved }) => {
  const isSaved = saved ? '#546de5' : '#2f3640'
  return (
    <>
      <div onClick={() => operation(user)} className={classes.Card}>
        <div className={classes.InfoField}>
          <img className={classes.Avatar} src={user.image} alt='user profile' />
          <h2>@{user.username}</h2>
          <FontAwesomeIcon size='3x' icon={icon} color={isSaved} />
        </div>
      </div>
    </>
  )
}

export default InstagramUserCard
