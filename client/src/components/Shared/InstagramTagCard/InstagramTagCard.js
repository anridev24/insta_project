import React, { useState } from 'react'
import classes from './InstagramTagCard.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InstagramTagCard = ({ hashtag, operation, icon, saved }) => {
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
          operation(hashtag)
        }}
        className={[classes.Card, isSavedCard].join(' ')}>
        <div className={classes.InfoField}>
          <img className={classes.Avatar} src={hashtag.image} alt='user profile' />
          <div className={classes.HashtagInfocontainer}>
            <h2>#{hashtag.name}</h2>
            <p>
              <span>Media Count : </span> {hashtag.mediaCount}{' '}
            </p>
          </div>

          <FontAwesomeIcon className={classes.OperationIcon} color={isSaved} size='3x' icon={icon} />
        </div>
      </div>
    </>
  )
}

export default InstagramTagCard
