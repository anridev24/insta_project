import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from '../components/DashboardPageComponents/SearchForm/SearchForm'
import SearchResults from '../components/DashboardPageComponents/SearchResults/SearchResults'
import Navbar from '../components/Shared/Navbar/Navbar'
import { useAuth } from '../context/auth'
const DashboardPage = () => {
  const [loading, setLoading] = useState(false)
  const [savedContent, setSavedContent] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const { accountId } = useAuth()

  useEffect(() => {
    axios
      .post('/api/account/saved_content', { accountId })
      .then(response => setSavedContent(prevSavedContent => response.data))
  }, [accountId])

  return (
    <>
      <Navbar />
      <SearchForm setLoading={setLoading} setSearchResults={setSearchResults} />

      <SearchResults
        setSearchResults={setSearchResults}
        accountId={accountId}
        savedContent={savedContent}
        searchResults={searchResults}
        loading={loading}
      />
    </>
  )
}

export default DashboardPage
