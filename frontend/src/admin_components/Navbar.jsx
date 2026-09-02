'use client';
import React, { useContext } from 'react'
import { assets } from '../admin_assets/assets'
import { DoctorContext } from '../admin_context/DoctorContext'
import { AdminContext } from '../admin_context/AdminContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const router = useRouter()

  const logout = () => {
    router.push('/admin')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <span className="hidden lg:block font-bold text-3xl">
          Virtual<span className="text-cyan-600">Doc</span>
        </span>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={() => logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar