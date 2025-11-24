'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
  FaFilePrescription,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { href: "/profile/doctor_profile/", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/profile/doctor_profile/profile_update", label: "Profile Management", icon: <FaUserMd /> },
  { href: "/profile/doctor_profile/appointments", label: "Appointment Management", icon: <FaCalendarAlt /> },
  { href: "/profile/doctor_profile/prescription", label: "E-Prescription", icon: <FaFilePrescription /> },
  { href: "/profile/doctor_profile/patients", label: "Patient Medical Records", icon: <FaUsers /> },
  { href: "/profile/doctor_profile/payments", label: "Payment Management", icon: <FaMoneyBillWave /> },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname() || "/";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const navLinkClasses = (href) =>
    isActive(href)
      ? "flex items-center gap-3 px-3 py-2 rounded-md bg-primary text-white"
      : "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200";

  return (
    <aside className="w-64 bg-cyan-200 shadow-md flex flex-col justify-between min-h-screen">


      <div>

        <div className="p-6 text-center border-b">
          <div className="flex justify-center mb-3">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-400 to-sky-400 flex items-center justify-center text-white text-3xl font-bold shadow-md overflow-hidden">
              {session?.user?.image ? (

                <Image
                  src={session.user.image}
                  width={120}
                  height={120}
                  alt={session.user.name ? `${session.user.name} avatar` : "User image"}
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                </span>
              )}
            </div>
          </div>

          <h2 className="text-xl font-semibold">Dr. {session?.user?.name || "Doctor"}</h2>
          <p className="text-sm text-gray-500">Cardiologist</p>
        </div>

 
        <nav className="flex-1 overflow-y-auto">
          <ul className="menu p-2 text-[17px] text-base-content space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={navLinkClasses(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className="text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          type="button"
          className="btn btn-accent w-full text-black text-lg flex items-center gap-3 justify-center"
          onClick={() => signOut()}
        >
          <FaSignOutAlt /> <span className="font-semibold">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
