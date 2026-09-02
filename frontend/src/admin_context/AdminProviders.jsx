'use client';
import React from 'react'
import AdminContextProvider from './AdminContext'
import DoctorContextProvider from './DoctorContext'
import AppContextProvider from './AppContext'

export default function AdminProviders({ children }) {
  return (
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  )
}
