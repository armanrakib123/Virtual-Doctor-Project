// 'use client'
// import { signOut, useSession } from 'next-auth/react'
// import Image from 'next/image';
// import Link from 'next/link'
// import { FaSignOutAlt } from 'react-icons/fa';

// const NAV = [
//   { href: '/profile/patient_profile', label: 'Overview' },
//   { href: '/profile/patient_profile/profile_update', label: 'Update Profile' },
//   { href: '/profile/patient_profile/appointments', label: 'Appointments' },
//   { href: '/profile/patient_profile/payments', label: 'Payments' },
//   { href: '/profile/patient_profile/specialists', label: 'Specialists' },
// ]

// export default function Sidebar() {
//   const { data: session } = useSession();

//   return (
//     <div className="h-screen p-6 bg-sky-200 border-r shadow-sm flex flex-col justify-between">

//       {/* TOP CONTENT */}
//       <div>
//         <div className='pb-8'>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold">
//               {session?.user?.image ? (
//                 <Image
//                   src={session.user.image}
//                   width={40}
//                   height={40}
//                   alt="User image"
//                   className="rounded-full object-cover"
//                 />
//               ) : (
//                 <span>
//                   {session?.user?.name
//                     ? session.user.name.charAt(0).toUpperCase()
//                     : "U"}
//                 </span>
//               )}
//             </div>
//             <div>
//               <div className="text-sm font-semibold">Patient</div>
//               <div className="text-xs text-slate-500">{session?.user?.name}</div>
//             </div>
//           </div>

//           <div>{session?.user?.email}</div>
//         </div>

//         <nav className="space-y-1">
//           {NAV.map(i => (
//             <Link
//               key={i.href}
//               href={i.href}
//               className="block p-3 rounded-lg hover:bg-slate-50 text-sm"
//             >
//               {i.label}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* BOTTOM LOGOUT BUTTON */}
//       <div className="pt-6 border-t">
//         <button
//           type="button"
//           className="btn btn-accent w-full text-black text-xl flex items-center gap-3"
//           onClick={() => signOut()}
//         >
//           <FaSignOutAlt /> <span className="font-bold">Log Out</span>
//         </button>
//       </div>

//     </div>
//   );
// }
















"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaUser,
  FaUserEdit,
  FaCalendarCheck,
  FaCreditCard,
  FaUserMd,
  FaSignOutAlt,
  FaHeartbeat,
} from "react-icons/fa";

const NAV = [
  {
    href: "/profile/patient_profile",
    label: "Overview",
    icon: FaUser,
  },
  {
    href: "/profile/patient_profile/profile_update",
    label: "Update Profile",
    icon: FaUserEdit,
  },
  {
    href: "/profile/patient_profile/appointments",
    label: "Appointments",
    icon: FaCalendarCheck,
  },
  {
    href: "/profile/patient_profile/payments",
    label: "Payments",
    icon: FaCreditCard,
  },
  {
    href: "/profile/patient_profile/specialists",
    label: "Specialists",
    icon: FaUserMd,
  },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const userInitial =
    session?.user?.name?.charAt(0)?.toUpperCase() || "P";

  return (
    <aside className="sticky top-0 flex h-screen w-full flex-col border-r border-base-content/10 bg-base-100 shadow-xl">

      {/* ================= HEADER ================= */}

      <div className="border-b border-base-content/10 bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white">

        {/* Logo / Title */}

        <div className="mb-8 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
            <FaHeartbeat />
          </div>

          <div>
            <h2 className="text-lg font-bold">
              Patient Portal
            </h2>

            <p className="text-xs text-white/70">
              VirtualDoc Healthcare
            </p>
          </div>

        </div>


        {/* Patient Profile */}

        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">

          {/* Avatar */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/50 bg-white/20 text-lg font-bold">

            {session?.user?.image ? (

              <Image
                src={session.user.image}
                width={56}
                height={56}
                alt="Patient Profile"
                className="h-full w-full object-cover"
              />

            ) : (

              <span>
                {userInitial}
              </span>

            )}

          </div>


          {/* User Information */}

          <div className="min-w-0">

            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              Patient
            </p>

            <h3 className="truncate font-semibold">
              {session?.user?.name || "Patient"}
            </h3>

            <p className="truncate text-xs text-white/70">
              {session?.user?.email || "No email available"}
            </p>

          </div>

        </div>

      </div>


      {/* ================= NAVIGATION ================= */}

      <div className="flex-1 overflow-y-auto p-4">

        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-base-content/40">
          Dashboard
        </p>


        <nav className="space-y-2">

          {NAV.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-base-content/70 hover:bg-cyan-500/10 hover:text-cyan-600"
                }`}
              >

                {/* Icon */}

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                    isActive
                      ? "bg-white/20"
                      : "bg-base-200 group-hover:bg-cyan-500/20"
                  }`}
                >
                  <Icon />
                </div>


                {/* Label */}

                <span>
                  {item.label}
                </span>

              </Link>
            );
          })}

        </nav>

      </div>


      {/* ================= BOTTOM SECTION ================= */}

      <div className="border-t border-base-content/10 p-4">

        <div className="mb-4 rounded-xl bg-cyan-500/10 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-600">
              <FaHeartbeat />
            </div>

            <div>

              <p className="text-sm font-semibold">
                Need Help?
              </p>

              <p className="text-xs text-base-content/60">
                We're here for your healthcare needs.
              </p>

            </div>

          </div>

        </div>


        {/* Logout */}

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn h-12 w-full rounded-xl border-none bg-red-500/10 text-red-600 transition-all hover:bg-red-500 hover:text-white"
        >

          <FaSignOutAlt className="text-lg" />

          <span className="font-semibold">
            Log Out
          </span>

        </button>

      </div>

    </aside>
  );
}
