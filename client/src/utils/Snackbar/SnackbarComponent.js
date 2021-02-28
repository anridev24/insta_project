import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const SnackbarComponent = ({ show, text }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(show)

  const closeSaveSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }
  return <></>
}

export default SnackbarComponent
