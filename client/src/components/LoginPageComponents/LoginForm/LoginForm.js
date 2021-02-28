import React, { useState } from 'react'
import classes from './LoginForm.module.scss'

import axios from 'axios'
import { useHistory } from 'react-router-dom'

import Loader from '../../Shared/Loader/Loader'
import { useAuth } from '../../../context/auth'

const LoginForm = () => {
  const history = useHistory()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setToken, setId } = useAuth()

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const submitHandler = event => {
    event.preventDefault()
    setLoading(true)
    axios
      .post('/api/account/login', {
        email: form.email.toLowerCase(),
        password: form.password,
      })
      .then(response => {
        if (response.status === 200) {
          setLoading(false)
          setToken(response.data.token)
          setId(response.data.userId)

          history.push('/dashboard')
        }
      })
      .catch(e => {
        setErrorMessage(e.response.data.message)
        setLoading(false)
      })
  }

  return (
    <div className={classes.Wrapper}>
      <h2 className={classes.Title}>
        Insta<span>Project</span>
      </h2>
      <h4>Login</h4>
      <form onSubmit={submitHandler} className={classes.Form}>
        <div className={classes.InputField}>
          <label htmlFor=''>Email</label>
          <input value={form.email} onChange={changeHandler} name='email' type='text' />
        </div>

        <div className={classes.InputField}>
          <label htmlFor=''>Password</label>
          <input value={form.password} onChange={changeHandler} name='password' type='password' />
        </div>

        <div className={classes.ButtonsContainer}>
          <button onClick={() => history.push('/signup')} type='button'>
            Sign Up
          </button>
          <button type='submit'>Login</button>
        </div>

        <p className={classes.ErrorMessage}>{errorMessage}</p>
      </form>
      {loading && <Loader />}
    </div>
  )
}

export default LoginForm
