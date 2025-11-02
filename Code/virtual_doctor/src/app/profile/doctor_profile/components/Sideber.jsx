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

const navItems = [
  { href: "/profile/doctor_profile/", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/profile/doctor_profile/profile_update", label: "Profile Management", icon: <FaUserMd /> },
  { href: "/profile/doctor_profile/appointments", label: "Appointment Management", icon: <FaCalendarAlt /> },
  { href: "/profile/doctor_profile/patients", label: "Patient Medical Records", icon: <FaUsers /> },
  { href: "/profile/doctor_profile/prescription", label: "E-Prescription", icon: <FaFilePrescription /> },
  { href: "/profile/doctor_profile/payments", label: "Payment Management", icon: <FaMoneyBillWave /> },
];

export default function Sidebar() {
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
    <aside className="w-64 bg-cyan-300 shadow-md flex flex-col min-h-screen">



{/*////////////////////// Profile Section /////////////////////////////*/}


      <div className="p-6 text-center border-b">
        <div className="avatar online mb-2 flex justify-center">
          <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img src="/Assets/Doc.jpg" alt="Doctor_Image" width={60}
              height={60}
              className="object-cover" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Dr. Arman Rakib</h2>
        <p className="text-sm text-gray-500">Cardiologist</p>
      </div>


{/*/////////////////////// Navigation Menu //////////////////////////*/}


      <nav className="flex-1 overflow-y-auto">
        <ul className="menu p-2 text-[17px] text-base-content space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={navLinkClasses(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className="text-[25px]">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>



{/*///////////////////////////////////// Logout Button //////////////////////*/}




      <div className="p-4 border-t">
        <button
          type="button"
          className="btn btn-accent w-full text-black text-xl justify-start flex items-center gap-3"
          onClick={() => {
            console.log("logout clicked");
          }}
        >
          <FaSignOutAlt /> <span className="font-bold">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
