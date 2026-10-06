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
          <div className="bg-base-100 border border-base-content/10 shadow-md rounded-2xl p-6 hover:shadow-xl transition-all">
            <h3 className="text-xl font-semibold mb-4 text-base-content">Profile Summary</h3>
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
                <h4 className="text-lg font-medium text-base-content">{session?.user?.name}</h4>
                <p className="text-sm text-base-content/70">Patient • Rangpur</p>
                <div className="mt-3 flex gap-3">
                  <Link href="/profile/patient_profile/profile_update" className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm shadow hover:bg-sky-700">Edit Profile</Link>
                  <Link href="/profile/patient_profile/appointments" className="px-4 py-2 rounded-lg border border-base-content/20 text-base-content text-sm hover:bg-base-200">Appointments</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-base-100 border border-base-content/10 p-4 rounded-xl shadow hover:shadow-md transition-all">
              <p className="text-sm text-base-content/60">Total Visits</p>
              <p className="text-2xl font-bold text-teal-500">12</p>
            </div>
            <div className="bg-base-100 border border-base-content/10 p-4 rounded-xl shadow hover:shadow-md transition-all">
              <p className="text-sm text-base-content/60">Prescriptions</p>
              <p className="text-2xl font-bold text-sky-500">7</p>
            </div>
            <div className="bg-base-100 border border-base-content/10 p-4 rounded-xl shadow hover:shadow-md transition-all">
              <p className="text-sm text-base-content/60">Lab Reports</p>
              <p className="text-2xl font-bold text-amber-500">4</p>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-base-100 border border-base-content/10 rounded-2xl shadow-md p-6">
            <h3 className="font-semibold mb-4 text-base-content">Recent Activities</h3>
            <ul className="space-y-3 text-sm text-base-content/80">
              <li>✔ Appointment confirmed with <b>Dr. Shafi</b> (Cardiology)</li>
              <li>✔ Uploaded Lab Report: <b>Blood CBC</b></li>
              <li>✔ New Prescription added by <b>Dr. Nadia</b></li>
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-base-100 border border-base-content/10 rounded-2xl shadow p-5">
            <h3 className="text-lg font-semibold mb-4 text-base-content">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <Link href="/all_doctors" className="py-3 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition">Book Appointment</Link>
              <Link href="/profile/patient_profile/payments" className="py-3 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition">Payments</Link>
              <Link href="/profile/patient_profile" className="py-3 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition">My Reviews</Link>
              <Link href="/profile/patient_profile/specialists" className="py-3 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition">Find Specialists</Link>
              <Link href="/profile/patient_profile" className="py-3 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-base-content transition">Medical Records</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

