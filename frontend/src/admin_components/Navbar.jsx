'use client';
import React, { useContext } from 'react'
import { assets } from '../admin_assets/assets'
import { DoctorContext } from '../admin_context/DoctorContext'
import { AdminContext } from '../admin_context/AdminContext'
import { useRouter } from 'next/navigation'

import ThemeToggle from '@/Components/layout/ThemeToggle';

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
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-base-content/10 bg-base-100 text-base-content transition-colors'>
      <div className='flex items-center gap-2 text-xs'>
        <span className="hidden lg:block font-bold text-3xl">
          Virtual<span className="text-cyan-600">Doc</span>
        </span>
        <p className='border px-2.5 py-0.5 rounded-full border-base-content/20 text-base-content/70'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button onClick={() => logout()} className='bg-primary text-white text-sm px-8 py-2 rounded-full font-medium hover:opacity-90 transition'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar