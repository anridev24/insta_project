import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { BASE_API_URL } from '../src/constants/'

import axios from 'axios'

import './index.scss'

axios.defaults.baseURL = BASE_API_URL

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
