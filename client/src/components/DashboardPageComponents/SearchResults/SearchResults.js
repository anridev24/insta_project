import React, { useState, useEffect } from 'react'
import classes from './SearchResults.module.scss'
import axios from 'axios'
import Loader from '../../Shared/Loader/Loader'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import InstagramUserCard from '../../Shared/InstagramUserCard/InstagramUserCard'
import InstagramTagCard from '../../Shared/InstagramTagCard/InstagramTagCard'

const SearchResults = ({ loading, setSearchResults, searchResults, savedContent, accountId }) => {
  const [selectedType, setSelectedType] = useState(null)

  const saveItem = item => {
    const data = {
      type: item.type,
      InstagramObject: { ...item },
      accountId: accountId,
    }
    axios
      .post('/api/account/save', data)
      .then(response => {
        if (response.status === 201) {
        }
      })
      .catch(e => {})
  }

  const checkAlreadySavedUsers = () => {
    const alreadySavedUsers = searchResults.users.map(user => {
      if (savedContent.users.find(savedUser => savedUser.username === user.username)) {
        return { ...user, saved: true }
      } else {
        return { ...user, saved: false }
      }
    })
    console.log(alreadySavedUsers)
    setSearchResults({ ...searchResults, users: alreadySavedUsers })
  }

  const checkAlreadySavedHashtags = () => {
    const alreadySavedHashtags = searchResults.hashtags.map(hashtag => {
      if (savedContent.hashtags.find(savedHashtag => savedHashtag.name === hashtag.name)) {
        return { ...hashtag, saved: true }
      } else {
        return { ...hashtag, saved: false }
      }
    })

    console.log(alreadySavedHashtags)
    setSearchResults({ ...searchResults, hashtags: alreadySavedHashtags })
  }

  return (
    <div className={classes.Wrapper}>
      <div>
        <button
          disabled={!searchResults && savedContent}
          onClick={() => {
            checkAlreadySavedUsers()
            setSelectedType('user')
          }}>
          Users
        </button>
        <button
          disabled={!searchResults && savedContent}
          onClick={() => {
            checkAlreadySavedHashtags()
            setSelectedType('hashtag')
          }}>
          Hashtags
        </button>
      </div>
      {!searchResults ? (
        <p className={classes.PlaceholderText}>Search for something</p>
      ) : (
        <div className={classes.ResultsBox}>
          <h4>
            We found <span>{searchResults.users.length}</span> Users and <span>{searchResults.hashtags.length}</span>
            Hashtags
          </h4>

          <p className={classes.PlaceholderText}>Select the type and enjoy stalking 🔍</p>
        </div>
      )}
      {loading && <Loader />}
      {selectedType ? (
        <div className={classes.CardsWrapper}>
          {selectedType === 'user'
            ? searchResults.users.map(user => (
                <InstagramUserCard
                  key={user.username}
                  accountId={accountId}
                  user={user}
                  icon={faSave}
                  operation={saveItem}
                  saved={user.saved}
                />
              ))
            : searchResults.hashtags.map(hashtag => (
                <InstagramTagCard
                  key={hashtag.name}
                  accountId={accountId}
                  hashtag={hashtag}
                  icon={faSave}
                  operation={saveItem}
                  saved={hashtag.saved}
                />
              ))}
        </div>
      ) : null}
    </div>
  )
}

export default SearchResults
