'use client'
import React from 'react'

export default function Top_Dashboard({ title, subtitle }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-lg border text-sm">Notifications</button>
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">AR</div>
      </div>
    </div>
  )
}
