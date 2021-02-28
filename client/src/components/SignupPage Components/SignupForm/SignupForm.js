import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import classes from './SignupForm.module.scss'

import axios from 'axios'

import Loader from '../../Shared/Loader/Loader'
const SignupForm = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

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
      .post('/api/account/register', {
        ...form,
      })
      .then(response => {
        if (response.status === 201) {
          setLoading(false)
          history.push('/login')
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

      <h4>Sign up</h4>
      <form onSubmit={submitHandler} className={classes.Form}>
        <div className={classes.InputField}>
          <label htmlFor=''>First Name</label>
          <input value={form.firstName} onChange={changeHandler} name='firstName' type='text' />
        </div>
        <div className={classes.InputField}>
          <label htmlFor=''>Last Name</label>
          <input value={form.lastName} onChange={changeHandler} name='lastName' type='text' />
        </div>

        <div className={classes.InputField}>
          <label htmlFor=''>Email</label>
          <input value={form.email} onChange={changeHandler} name='email' type='email' />
        </div>

        <div className={classes.InputField}>
          <label htmlFor=''>Password</label>
          <input value={form.password} onChange={changeHandler} name='password' type='password' />
        </div>

        <div className={classes.ButtonsContainer}>
          <button onClick={() => history.push('/login')} className={classes.GoBackButton} type='button'>
            Back
          </button>
          <button type='submit'>Confirm</button>
        </div>
        <p className={classes.ErrorMessage}>{errorMessage}</p>
      </form>
      {loading && <Loader />}
    </div>
  )
}

export default SignupForm
