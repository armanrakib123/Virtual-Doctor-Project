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
    <div className='min-h-screen bg-white border-r'>
      {aToken && <ul className='text-[#515151] mt-5'>

        <Link href={'/admin/dashboard'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/dashboard' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.home_icon.src || assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </Link>
        <Link href={'/admin/appointments'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/appointments' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.appointment_icon.src || assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </Link>
        <Link href={'/admin/add-doctor'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/add-doctor' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.add_icon.src || assets.add_icon} alt='' />
          <p className='hidden md:block'>Add Doctor</p>
        </Link>
        <Link href={'/admin/doctors-list'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/doctors-list' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.people_icon.src || assets.people_icon} alt='' />
          <p className='hidden md:block'>Doctors List</p>
        </Link>
      </ul>}

      {dToken && <ul className='text-[#515151] mt-5'>
        <Link href={'/admin/doctor-dashboard'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/doctor-dashboard' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.home_icon.src || assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </Link>
        <Link href={'/admin/doctor-appointments'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/doctor-appointments' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.appointment_icon.src || assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </Link>
        <Link href={'/admin/doctor-profile'} className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${pathname === '/admin/doctor-profile' ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
          <img className='min-w-5' src={assets.people_icon.src || assets.people_icon} alt='' />
          <p className='hidden md:block'>Profile</p>
        </Link>
      </ul>}
    </div>
  )
}

export default Sidebar