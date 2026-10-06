'use client'
import React from 'react'
import Sidebar from './Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-200 transition-colors">
      <div className="flex">
        <aside className="w-72 hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}