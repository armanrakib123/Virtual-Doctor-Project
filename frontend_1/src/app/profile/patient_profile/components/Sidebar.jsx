'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link'
import { FaSignOutAlt } from 'react-icons/fa';

const NAV = [
  { href: '/profile/patient_profile', label: 'Overview' },
  { href: '/profile/patient_profile/profile_update', label: 'Update Profile' },
  { href: '/profile/patient_profile/appointments', label: 'Appointments' },
  { href: '/profile/patient_profile/payments', label: 'Payments' },
  { href: '/profile/patient_profile/specialists', label: 'Specialists' },
]

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="h-screen p-6 bg-sky-200 border-r shadow-sm flex flex-col justify-between">

      {/* TOP CONTENT */}
      <div>
        <div className='pb-8'>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  width={40}
                  height={40}
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
              <div className="text-sm font-semibold">Patient</div>
              <div className="text-xs text-slate-500">{session?.user?.name}</div>
            </div>
          </div>

          <div>{session?.user?.email}</div>
        </div>

        <nav className="space-y-1">
          {NAV.map(i => (
            <Link
              key={i.href}
              href={i.href}
              className="block p-3 rounded-lg hover:bg-slate-50 text-sm"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* BOTTOM LOGOUT BUTTON */}
      <div className="pt-6 border-t">
        <button
          type="button"
          className="btn btn-accent w-full text-black text-xl flex items-center gap-3"
          onClick={() => signOut()}
        >
          <FaSignOutAlt /> <span className="font-bold">Log Out</span>
        </button>
      </div>

    </div>
  );
}
