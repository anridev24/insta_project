import React, { useState, useEffect } from 'react'
import classes from './SavedItemsContainer.module.scss'

import axios from 'axios'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../../context/auth'
import Loader from '../../Shared/Loader/Loader'
import InstagramUserCard from '../../Shared/InstagramUserCard/InstagramUserCard'
import InstagramTagCard from '../../Shared/InstagramTagCard/InstagramTagCard'

const SavedItemsContainer = () => {
  const { accountId } = useAuth()
  const [savedContent, setSavedContent] = useState(null)
  const [selectedType, setSelectedType] = useState('user')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.post('/api/account/saved_content', { accountId }).then(response => {
      setSavedContent(response.data)
      setLoading(false)
    })
  }, [accountId])

  const deleteItem = item => {
    const data = {
      type: item.type,
      InstagramObject: { ...item },
      accountId: accountId,
    }
    axios
      .post('/api/account/delete', data)
      .then(response => {
        if (response.status === 200) {
          if (item.type === 'user') {
            const newSavedContent = {
              ...savedContent,
              users: savedContent.users.filter(savedItem => savedItem.username !== item.username),
            }
            setSavedContent(prevState => newSavedContent)
          } else {
            const newSavedContent = {
              ...savedContent,
              users: savedContent.hashtags.filter(savedItem => savedItem.name !== item.name),
            }
            setSavedContent(prevState => newSavedContent)
          }
        }
      })
      .catch(e => {})
  }

  return (
    <div className={classes.Wrapper}>
      <h3>Saved Items</h3>
      <div>
        <button disabled={!savedContent} onClick={() => setSelectedType('user')}>
          Users
        </button>
        <button disabled={!savedContent} onClick={() => setSelectedType('hashtag')}>
          Hashtags
        </button>
      </div>

      {!savedContent ? <p className={classes.PlaceholderText}>Search for something</p> : null}
      {loading && <Loader />}
      {savedContent ? (
        <div className={classes.CardsWrapper}>
          {selectedType === 'user'
            ? savedContent.users.map(user => (
                <InstagramUserCard
                  key={user.username}
                  accountId={accountId}
                  user={user}
                  operation={deleteItem}
                  icon={faTrash}
                />
              ))
            : savedContent.hashtags.map(hashtag => (
                <InstagramTagCard
                  key={hashtag.name}
                  accountId={accountId}
                  hashtag={hashtag}
                  operation={deleteItem}
                  icon={faTrash}
                />
              ))}
        </div>
      ) : null}
    </div>
  )
}

export default SavedItemsContainer
