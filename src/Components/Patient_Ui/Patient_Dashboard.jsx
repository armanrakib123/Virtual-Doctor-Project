// File: pages/doctor-dashboard.jsx
// Next.js page (Pages Router). Requires: Tailwind CSS and lucide-react installed.
// Install: npm install lucide-react

import React, { useState } from 'react'
import {
  User,
  Calendar,
  Users,
  FileText,
  CreditCard,
  Star,
  Bell,
  LogOut,
  Menu
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'appointments', label: 'My Appointments', icon: Calendar },
  { id: 'patients', label: 'My Patients', icon: Users },
  { id: 'eprescriptions', label: 'E-Prescriptions', icon: FileText },
  { id: 'earnings', label: 'Earnings / Payments', icon: CreditCard },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'announcements', label: 'Announcements', icon: Bell },
  { id: 'logout', label: 'Log out', icon: LogOut }
]

export default function DoctorDashboard() {
  const [active, setActive] = useState('appointments')
  const [mobileOpen, setMobileOpen] = useState(false)

  const ActiveIcon = (Icon, isActive) => (
    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`} />
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>
          <button
            className="md:hidden p-2 rounded-md bg-white shadow"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`bg-white rounded-xl shadow p-4 w-72 md:block ${mobileOpen ? 'block' : 'hidden md:block'}`}
          >
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = active === item.id
                const itemClasses = `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`
                return (
                  <div
                    key={item.id}
                    className={itemClasses}
                    onClick={() => {
                      if (item.id === 'logout') {
                        // placeholder logout behavior
                        alert('Logged out (placeholder)')
                      } else {
                        setActive(item.id)
                        setMobileOpen(false)
                      }
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                )
              })}
            </nav>

            <div className="border-t mt-4 pt-4 text-xs text-slate-500">
              Version 1.0 • Last synced: {new Date().toLocaleString()}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow p-6 min-h-[60vh]">
              <SectionRenderer active={active} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function SectionRenderer({ active }) {
  switch (active) {
    case 'profile':
      return <ProfileSection />
    case 'appointments':
      return <AppointmentsSection />
    case 'patients':
      return <PatientsSection />
    case 'eprescriptions':
      return <EPrescriptionsSection />
    case 'earnings':
      return <EarningsSection />
    case 'reviews':
      return <ReviewsSection />
    case 'announcements':
      return <AnnouncementsSection />
    default:
      return <div>Select a menu item</div>
  }
}

function ProfileSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Name</label>
          <input className="w-full border rounded p-2" defaultValue="Dr. Jane Doe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Specialty</label>
          <input className="w-full border rounded p-2" defaultValue="Cardiology" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Qualification</label>
          <input className="w-full border rounded p-2" defaultValue="MBBS, MD" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Experience (years)</label>
          <input className="w-full border rounded p-2" defaultValue="10" />
        </div>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Profile</button>
      </div>
    </div>
  )
}

function AppointmentsSection() {
  const sample = [
    { id: 1, name: 'Rafi Ahmed', time: '2025-11-12 10:00', status: 'Upcoming' },
    { id: 2, name: 'Mina Akter', time: '2025-11-10 14:00', status: 'Completed' },
    { id: 3, name: 'Jamal Hossain', time: '2025-11-09 09:00', status: 'Cancelled' }
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 bg-slate-100 rounded">Upcoming</button>
        <button className="px-3 py-1 bg-slate-100 rounded">Completed</button>
        <button className="px-3 py-1 bg-slate-100 rounded">Cancelled</button>
      </div>
      <div className="space-y-3">
        {sample.map((s) => (
          <div key={s.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-slate-500">{s.time}</div>
            </div>
            <div className="text-sm px-3 py-1 rounded-full {s.status === 'Upcoming' ? 'bg-green-100' : 'bg-slate-100'}">{s.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PatientsSection() {
  const patients = [
    { id: 1, name: 'Rafi Ahmed', lastVisit: '2025-10-12' },
    { id: 2, name: 'Mina Akter', lastVisit: '2025-11-10' }
  ]
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Patients</h2>
      <div className="grid gap-3">
        {patients.map((p) => (
          <div key={p.id} className="p-3 border rounded flex justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-slate-500">Last visit: {p.lastVisit}</div>
            </div>
            <div>
              <button className="px-3 py-1 border rounded">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EPrescriptionsSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">E-Prescriptions</h2>
      <p className="text-slate-600 mb-4">Create, view or download prescriptions for patients.</p>
      <div className="space-y-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded">Create Prescription</button>
      </div>
    </div>
  )
}

function EarningsSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Earnings / Payments</h2>
      <p className="text-slate-600 mb-4">Overview of earnings. (This is placeholder data.)</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Today: ৳2,000</div>
        <div className="p-4 border rounded">This Month: ৳56,000</div>
        <div className="p-4 border rounded">Total: ৳1,200,000</div>
      </div>
    </div>
  )
}

function ReviewsSection() {
  const reviews = [
    { id: 1, patient: 'Rafi', rating: 5, comment: 'Excellent care.' },
    { id: 2, patient: 'Mina', rating: 4, comment: 'Very helpful.' }
  ]
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="p-3 border rounded">
            <div className="flex justify-between items-center">
              <div className="font-medium">{r.patient}</div>
              <div className="text-sm text-slate-500">{Array.from({ length: r.rating }).map((_, i) => '★').join('')}</div>
            </div>
            <div className="text-slate-600">{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnnouncementsSection() {
  const notes = [
    { id: 1, text: 'System maintenance on 2025-11-15' },
    { id: 2, text: 'New teleconsultation feature released' }
  ]
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <ul className="space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="p-3 border rounded">{n.text}</li>
        ))}
      </ul>
    </div>
  )
}
