import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './Header'

export default function () {
  return (
    <div className='p-2 flex flex-col h-screen'>
   <Header/>
   <Outlet/>
    </div>
  )
}
