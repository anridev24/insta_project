import React, { useState } from 'react'
import classes from './SearchForm.module.scss'
import axios from 'axios'
const SearchForm = ({ setLoading, setSearchResults }) => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const changeHandler = event => {
    setSearchKeyword(event.target.value)
  }
  const searchHandler = event => {
    event.preventDefault()
    if (!searchKeyword.trim()) return

    setLoading(true)
    axios
      .get(`/api/search/search/${searchKeyword}`)
      .then(response => {
        setSearchResults(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className={classes.Wrapper}>
      <form onSubmit={searchHandler} className={classes.SearchBox}>
        <input onChange={changeHandler} value={searchKeyword} placeholder='Search for a user or #tag' type='text' />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
