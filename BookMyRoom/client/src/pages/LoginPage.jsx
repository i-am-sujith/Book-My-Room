import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { userContext } from '../UserContext'

export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser}=useContext(userContext)

    async function loginUser(ev) {
        ev.preventDefault()
        try {
         const {data} =   await axios.post('/login', {
                email,
                password
            })
            setUser(data)
            alert('login successfully')
            setRedirect(true)
        } catch (e) {
            alert('wrong email or password')
        }
    }

    if(redirect){
       return <Navigate to={'/'} />
    }

    return (
        <div className='grow flex items-center justify-around '>
            <div className='mb-68'>

                <h1 className='text-4xl text-center'>Login</h1>

                <form className='max-w-md m-auto' onSubmit={loginUser}>

                    <input type="email" placeholder='your@email.com'
                        value={email} onChange={ev => setEmail(ev.target.value)}
                        autoComplete='on' />

                    <input type="password" placeholder='password'
                        value={password} onChange={ev => setPassword(ev.target.value)}
                        autoComplete='on' />

                    <button className='primary'>login</button>

                    <div className='text-center p-2'>don't have an account?
                        <Link to={'/register'} >Register now</Link></div>
                </form>
            </div>
        </div>
    )
}
