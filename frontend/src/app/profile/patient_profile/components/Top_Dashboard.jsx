'use client'
import React from 'react'
import ThemeToggle from '@/Components/layout/ThemeToggle'

export default function Top_Dashboard({ title, subtitle }) {
  return (
    <div className="bg-base-100 border border-base-content/10 rounded-2xl shadow p-5 flex items-center justify-between transition-colors">
      <div>
        <h2 className="text-xl font-semibold text-base-content">{title}</h2>
        <p className="text-sm text-base-content/60">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="px-4 py-2 rounded-lg border border-base-content/20 text-base-content text-sm hover:bg-base-200 transition">Notifications</button>
        <div className="w-10 h-10 rounded-full bg-base-300 text-base-content flex items-center justify-center font-bold">AR</div>
      </div>
    </div>
  )
}
