import React from 'react'

import Profile from '../components/SavedItemsPageComponents/Profile/Profile'
import SavedItemsContainer from '../components/SavedItemsPageComponents/SavedItemsContainer/SavedItemsContainer'
import Navbar from '../components/Shared/Navbar/Navbar'
const SavedItemsPage = () => {
  return (
    <>
      <Navbar />

      <Profile />
      <SavedItemsContainer />
    </>
  )
}

export default SavedItemsPage
