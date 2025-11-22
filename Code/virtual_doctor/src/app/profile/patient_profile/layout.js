import React from 'react'
import DashboardLayout from './components/DashboardLayout'



export default function ProfileLayout({ children }) {
return (
  <div className='mt-28'>
    <DashboardLayout>{children}</DashboardLayout>
  </div>
)
}