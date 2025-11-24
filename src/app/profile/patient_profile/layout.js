import React from 'react'
import DashboardLayout from './components/DashboardLayout'



export default function ProfileLayout({ children }) {
return (
  <div className='mt-28 bg-sky-100'>
    <DashboardLayout>{children}</DashboardLayout>
  </div>
)
}