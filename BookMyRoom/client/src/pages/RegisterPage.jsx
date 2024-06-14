import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function RegisterPage() {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(ev) {

    ev.preventDefault()
    try {
      await axios.post('/register', {
        username,
        email,
        password
      })
      alert('Registered successfully')
    } catch (e) {
      alert('email used already')
    }

  }

  return (
    <div className='grow flex items-center justify-around '>
      <div className='mb-68'>

        <h1 className='text-4xl text-center'>Register</h1>
        <form className='max-w-md m-auto' onSubmit={registerUser}>

          <input type="text"
            placeholder='Name'
            autoComplete='on'
            value={username}
            onChange={ev => setUserName(ev.target.value)} />


          <input type="email"
            autoComplete='on'
            placeholder='your@email.com' value={email}
            onChange={ev => setEmail(ev.target.value)} />


          <input type="password"
            autoComplete='on'
            placeholder='password' value={password}
            onChange={ev => setPassword(ev.target.value)} />

          <button className='primary'>Register</button>

          <div className='text-center p-2 m-auto'>
            already have an account? <Link to={'/login'} >Login now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
