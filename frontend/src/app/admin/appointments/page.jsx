'use client';
import React, { useEffect } from 'react'
import { assets } from '../../../admin_assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../../admin_context/AdminContext'
import { AppContext } from '../../../admin_context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-xl font-bold text-base-content'>All Appointments</p>

      <div className='bg-base-100 border border-base-content/10 rounded-2xl text-sm max-h-[80vh] overflow-y-scroll shadow-sm text-base-content'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3.5 px-6 border-b border-base-content/10 font-semibold bg-base-200/50'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-base-content/80 py-3.5 px-6 border-b border-base-content/10 hover:bg-base-200 transition' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 h-8 rounded-full object-cover' alt="" /> <p className="font-medium text-base-content">{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} className='w-8 h-8 rounded-full object-cover bg-base-200' alt="" /> <p className="font-medium text-base-content">{item.docData.name}</p>
            </div>
            <p className="font-semibold">{currency}{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-semibold'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-semibold'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-9 cursor-pointer hover:opacity-80 transition' src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments

