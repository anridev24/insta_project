import React, { useState } from 'react'
import classes from './InstagramUserCard.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InstagramUserCard = ({ user, operation, icon, saved }) => {
  const [uiSaved, setUiSaved] = useState(false)
  const isSaved = saved || uiSaved ? '#546de5' : '#2f3640'
  const isSavedCard = saved || uiSaved ? classes.SavedCard : ''
  const saveHandler = () => {
    setUiSaved(true)
  }
  return (
    <>
      <div
        onClick={() => {
          saveHandler()
          operation(user)
        }}
        className={[classes.Card, isSavedCard].join(' ')}>
        <div className={classes.InfoField}>
          <img className={classes.Avatar} src={user.image} alt='user profile' />
          <h2>@{user.username}</h2>
          <FontAwesomeIcon className={classes.OperationIcon} size='3x' icon={icon} color={isSaved} />
        </div>
      </div>
    </>
  )
}

export default InstagramUserCard
