import React from 'react'
import UserMenu from '../components/Atoms/userMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

 
  return (
    
    <div className='mx-auto p-3 grid grid-cols-1 lg:grid-cols-12 gap-5'>
      {/* Left for menu */}
      <div className='py-4 sticky bg-white top-24 max-h-[calc(100vh-96px)] overflow-y-auto lg:block hidden col-span-4'>
        <div className='p-4'>
        <UserMenu />
        </div>
       
      </div>
  
      {/* Right for content */}
      <div className='bg-white min-h-[75vh] col-span-8'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard