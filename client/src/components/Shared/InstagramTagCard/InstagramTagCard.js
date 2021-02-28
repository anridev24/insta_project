import React from 'react'
import classes from './InstagramTagCard.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InstagramTagCard = ({ hashtag, operation, icon, saved }) => {
  const isSaved = saved ? '#546de5' : '#2f3640'

  return (
    <>
      <div onClick={() => operation(hashtag)} className={classes.Card}>
        <div className={classes.InfoField}>
          <img className={classes.Avatar} src={hashtag.image} alt='user profile' />
          <div className={classes.HashtagInfocontainer}>
            <h2>#{hashtag.name}</h2>
            <p>
              <span>Media Count : </span> {hashtag.mediaCount}{' '}
            </p>
          </div>

          <FontAwesomeIcon color={isSaved} size='3x' icon={icon} />
        </div>
      </div>
    </>
  )
}

export default InstagramTagCard
