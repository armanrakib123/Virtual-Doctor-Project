'use client';
import React, { useContext } from 'react'
import { assets } from '../admin_assets/assets'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DoctorContext } from '../admin_context/DoctorContext'
import { AdminContext } from '../admin_context/AdminContext'

const Sidebar = () => {
  const pathname = usePathname();
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-base-100 border-r border-base-content/10 transition-colors'>
      {aToken && <ul className='text-base-content/80 mt-5'>

        <Link href={'/admin/dashboard'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/dashboard' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.home_icon.src || assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </Link>
        <Link href={'/admin/appointments'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/appointments' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.appointment_icon.src || assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </Link>
        <Link href={'/admin/add-doctor'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/add-doctor' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.add_icon.src || assets.add_icon} alt='' />
          <p className='hidden md:block'>Add Doctor</p>
        </Link>
        <Link href={'/admin/doctors-list'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/doctors-list' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.people_icon.src || assets.people_icon} alt='' />
          <p className='hidden md:block'>Doctors List</p>
        </Link>
      </ul>}

      {dToken && <ul className='text-base-content/80 mt-5'>
        <Link href={'/admin/doctor-dashboard'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/doctor-dashboard' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.home_icon.src || assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </Link>
        <Link href={'/admin/doctor-appointments'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/doctor-appointments' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.appointment_icon.src || assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </Link>
        <Link href={'/admin/doctor-profile'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition ${pathname === '/admin/doctor-profile' ? 'bg-primary/10 text-primary border-r-4 border-primary font-semibold' : 'hover:bg-base-200'}`}>
          <img className='min-w-5' src={assets.people_icon.src || assets.people_icon} alt='' />
          <p className='hidden md:block'>Profile</p>
        </Link>
      </ul>}
    </div>
  )
}

export default Sidebar