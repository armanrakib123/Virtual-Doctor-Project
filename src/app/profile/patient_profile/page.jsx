'use client'
import React from 'react'
import Top_Dashboard from './components/Top_Dashboard'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function ProfileHome() {

  const { data: session, status } = useSession();


  return (
    <div className="space-y-6 p-6">
      <Top_Dashboard
        title="Patient Dashboard"
        subtitle="Complete overview of your health information"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold mb-4">Profile Summary</h3>
            <div className="flex gap-6 items-center">

              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    width={120}
                    height={120}
                    alt="User image"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span>
                    {session?.user?.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                )}
              </div>
              <div>
                <h4 className="text-lg font-medium">{session?.user?.name}</h4>
                <p className="text-sm text-slate-600">Patient • Rangpur</p>
                <div className="mt-3 flex gap-3">
                  <Link href="/profile/patient_profile/profile_update" className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm shadow hover:bg-sky-700">Edit Profile</Link>
                  <Link href="/profile/patient_profile/appointments" className="px-4 py-2 rounded-lg border text-sm">Appointments</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-teal-50 p-4 rounded-xl shadow hover:shadow-md transition-all">
              <p className="text-sm text-slate-600">Total Visits</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-sky-50 p-4 rounded-xl shadow hover:shadow-md transition-all">
              <p className="text-sm text-slate-600">Prescriptions</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl shadow hover:shadow-md transition-all">
              <p className="text-sm text-slate-600">Lab Reports</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li>✔ Appointment confirmed with <b>Dr. Shafi</b> (Cardiology)</li>
              <li>✔ Uploaded Lab Report: <b>Blood CBC</b></li>
              <li>✔ New Prescription added by <b>Dr. Nadia</b></li>
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <Link href="/all_doctors" className="py-3 px-4 rounded-lg bg-teal-50 hover:bg-teal-100">Book Appointment</Link>
              <Link href="/profile/patient_profile/payments" className="py-3 px-4 rounded-lg bg-sky-50 hover:bg-sky-100">Payments</Link>
              <Link href="/profile/patient_profile" className="py-3 px-4 rounded-lg bg-amber-50 hover:bg-amber-100">My Reviews</Link>
              <Link href="/profile/patient_profile/specialists" className="py-3 px-4 rounded-lg bg-indigo-50 hover:bg-indigo-100">Find Specialists</Link>
              <Link href="/profile/patient_profile" className="py-3 px-4 rounded-lg bg-rose-50 hover:bg-rose-100">Medical Records</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
