import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { userContext } from './UserContext'

export default function Header() {

    const { user } = useContext(userContext)
    return (
        <header className="p-3 flex  justify-between rounded-lg">

            <Link to={'/'} href="/" className="no-underline p-2 shadow-md border  border-gray-400 rounded-full hover:bg-gray-100">
                <i className="fi fi-sr-home"></i>
                <span className="font-bold">FindMyRoom</span>
            </Link>

            <div className="flex  ps-2 pe-2 border border-gray-400 rounded-full shadow-md hover:bg-gray-200 overflow-hidden">
                <div className="font-bold p-2 rounded-s-full  hover:bg-gray-50 ">Anywhere</div>
                <div className="font-bold p-2  border-l  border-gray-400 hover:bg-gray-50">Any week</div>
                <div className="font-bold p-2 border-l border-gray-400  hover:bg-gray-50">Add guests</div>

                <button className=" p-2 border-l border-gray-400">
                    <i className="fi fi-bs-search"></i>
                </button>

            </div>
            <Link to={user ? '/account' : '/login'}>
                <div className="flex shadow-md border  border-gray-400 rounded-full hover:bg-gray-100">
                    <div className="px-3 py-2 "><i className="fi fi-bs-menu-burger"></i></div>
                    <div className="px-3 py-2 rounded-full"><i className="fi fi-sr-circle-user"></i></div>
                    <div className="px-3 py-2 rounded-full"> {!!user && (
                        <div className='text-blue-600'>
                            {user.username}
                        </div>
                    )}
                    </div>
                </div>

            </Link>
        </header>
    )
}
