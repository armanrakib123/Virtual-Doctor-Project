"use client"; 
import React from 'react'
import { FaCalendarCheck, FaUserPlus, FaWallet } from 'react-icons/fa';

export default function page() {
  return (
    <div className=''>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stats shadow-2xs shadow-accent bg-gray-50">
          <div className="stat">
            <div className="stat-figure text-primary"><FaCalendarCheck className="text-4xl" /></div>
            <div className="stat-title">Today's Appointments</div>
            <div className="stat-value">12</div>
          </div>
        </div>
        <div className="stats shadow-2xs shadow-accent bg-gray-50">
          <div className="stat">
            <div className="stat-figure text-secondary"><FaUserPlus className="text-4xl" /></div>
            <div className="stat-title">New Patients</div>
            <div className="stat-value">3</div>
          </div>
        </div>
        <div className="stats shadow-2xs shadow-accent bg-gray-50">
          <div className="stat">
            <div className="stat-figure text-accent"><FaWallet className="text-4xl" /></div>
            <div className="stat-title">Today's Income</div>
            <div className="stat-value">৳8500</div>
          </div>
        </div>
      </div>
    </div>
  )
}