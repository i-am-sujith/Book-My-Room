import React, { useContext, useState } from 'react'
import { userContext } from '../UserContext'
import { Navigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'

export default function AccountPage() {

  const { ready, user, setUser } = useContext(userContext)
  const [redirect, setRedirect] = useState(null)

  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }

  async function logout() {
    await axios.post('/logout')  // function for logout
    setRedirect('/')
    setUser(null)
  }

  function linkClass(type = null) {
    let classes = "py-2 px-6 bg-gray-100 rounded-full"
    if (type === subpage) {
      classes = "py-2 px-6 text-white bg-red-500 rounded-full "
      console.log(subpage);
    }
    return classes;
  }


  if (!ready) {
    return 'loading...'
  }

  if (ready && !user && !redirect) {

    return <Navigate to={'/login'} />

  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (

    <div>
      <nav className='w-full flex justify-around mt-8'>

        <div><Link className={linkClass('profile')} to={'/account'}> My profile </Link></div>
        <div><Link className={linkClass('bookings')} to={'/account/bookings'}>My bookings</Link></div>
        <div><Link className={linkClass('places')} to={'/account/places'}>My accomadotion</Link></div>

      </nav>

      {subpage === 'profile' && (
        <div className='flex-col mt-10 max-w-xl justify-center mx-auto text-center'>

          <p>logged in as {user.username} ({user.email})</p>

          <button onClick={logout} className='primary mt-8'>logout</button>
        </div>

      )}

      {subpage === 'places' && (
        <PlacesPage />
      )}


    </div>
  )
}
