'use client';
import React, { useContext, useEffect } from 'react'
import { assets } from '../../../admin_assets/assets'
import { AdminContext } from '../../../admin_context/AdminContext'
import { AppContext } from '../../../admin_context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-3 bg-base-100 border border-base-content/10 p-5 min-w-56 rounded-2xl cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-2xl font-bold text-base-content'>{dashData.doctors}</p>
            <p className='text-sm text-base-content/60'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-3 bg-base-100 border border-base-content/10 p-5 min-w-56 rounded-2xl cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-2xl font-bold text-base-content'>{dashData.appointments}</p>
            <p className='text-sm text-base-content/60'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-3 bg-base-100 border border-base-content/10 p-5 min-w-56 rounded-2xl cursor-pointer hover:scale-105 transition-all shadow-sm'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-2xl font-bold text-base-content'>{dashData.patients}</p>
            <p className='text-sm text-base-content/60'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden mt-8 shadow-sm'>
        <div className='flex items-center gap-2.5 px-6 py-4 border-b border-base-content/10 text-base-content'>
          <img src={assets.list_icon} alt="" />
          <p className='font-bold text-lg'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-base-content/10'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-base-200 transition' key={index}>
              <img className='rounded-full w-11 h-11 object-cover' src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-base-content font-semibold text-base'>{item.docData.name}</p>
                <p className='text-base-content/60'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? <p className='text-red-400 text-xs font-semibold'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-semibold'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-9 cursor-pointer hover:opacity-80 transition' src={assets.cancel_icon} alt="" />}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard

