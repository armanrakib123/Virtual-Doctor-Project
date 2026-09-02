'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaBars, FaHome, FaPhoneAlt, FaUserMd } from "react-icons/fa";
const navItems = [{ name: "Services", promo: { title: "Better Healthcare Experience", desc: "Connect with trusted doctors and healthcare professionals online.", cta: "Find a Doctor", href: "/all_doctors", imgSrc: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop", }, columns: [{ title: "Healthcare Services", links: [{ text: "Find Doctors", href: "/all_doctors", }, { text: "Online Consultation", href: "/consultation", }, { text: "Book Appointment", href: "/appointments", }, { text: "Medical Specialists", href: "/specialists", },], }, { title: "Patient Services", links: [{ text: "My Appointments", href: "/My_Bookings", }, { text: "Medical Records", href: "/medical-records", }, { text: "Health Support", href: "/support", }, { text: "Emergency Help", href: "/emergency", },], },], }, { name: "Resources", promo: { title: "Your Health Matters", desc: "Explore helpful healthcare resources and expert information.", cta: "Explore Resources", href: "/blog", imgSrc: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop", }, columns: [{ title: "Learn", links: [{ text: "Health Blog", href: "/blog", }, { text: "Health Tips", href: "/health-tips", }, { text: "Medical Information", href: "/resources", }, { text: "FAQ", href: "/faq", },], }, { title: "Company", links: [{ text: "About VirtualDoc", href: "/about", }, { text: "Contact Us", href: "/contact", }, { text: "Help Center", href: "/help", }, { text: "Privacy Policy", href: "/privacy-policy", },], },], },];

export default function Navbar() {

  const { data: session, status } = useSession();
  console.log(session)

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') || 'light';
    setTheme(localTheme);
    document.documentElement.setAttribute('data-theme', localTheme);
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };


  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {

        setShowNavbar(false);
      } else {

        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);


  return (
    <div
      className={`fixed top-0 flex z-50 w-full transition-transform duration-300 py-8 px-22 bg-base-300/80 backdrop-blur-sm shadow-md ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="navbar-start flex justify-between">
        <div>
          <Link href="/" className="flex gap-1 btn-ghost text-xl">
            <div className='w-12'><img src="/Assets/Stethoscope.png" alt="Stethoscope_icon" /></div>
            <span className="hidden lg:block font-bold text-3xl">
              Virtual<span className="text-cyan-600">Doc</span>
            </span>
          </Link>
        </div>

      </div>
      <div>
        <ul className="ml-4 gap-2 hidden items-center lg:flex">
          <Link href="/"><div role="button" className="btn btn-ghost text-base-content/70">
            Home
          </div></Link>

          {navItems.map((item) => (
            <li key={item.name}>
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn btn-ghost text-base-content/70">
                  {item.name}
                </div>
                <div tabIndex={0} className="dropdown-content z-[1] mt-4 w-[40rem] animate-fade-in-up rounded-box bg-base-100/95 p-6 shadow-2xl backdrop-blur-lg">
                  <div className="flex gap-6">



                    <div className="card w-1/2 shadow-xl image-full">
                      <figure><img src={item.promo.imgSrc} alt="promo image" className="object-cover" /></figure>
                      <div className="card-body justify-end">
                        <h2 className="card-title text-white">{item.promo.title}</h2>
                        <p className="text-white/80">{item.promo.desc}</p>
                        <div className="card-actions">




                          <Link href="/get-started" className="btn btn-primary btn-sm">{item.promo.cta}</Link>
                        </div>
                      </div>
                    </div>

                    <div className="grid flex-grow grid-cols-2 gap-4">
                      {item.columns.map(col => (
                        <div key={col.title}>
                          <h4 className="mb-2 font-bold text-base-content ">{col.title}</h4>
                          <ul className="space-y-1">
                            {col.links.map(link => (
                              <li key={link.text}>
                                <Link href={link.href} className="link-hover text-base-content/70">
                                  {link.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <div role="button" className="btn btn-ghost text-base-content/70">
            Contact
          </div>
          {/* <li>
            <Link href="/My_Bookings" className="btn btn-ghost text-base-content/70">My Appointments</Link>
          </li> */}
        </ul>
      </div>

      <div
        className={`fixed inset-0 z-50 transition
        ${drawerOpen ? "visible" : "invisible"}`}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity
          ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        />

        <div
          className={`absolute left-0 top-0  w-[280px] bg-base-100 p-6
          transition-transform duration-300
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            onClick={() => setDrawerOpen(false)}
            className="btn btn-sm btn-error mb-6"
          >
            Close
          </button>

          <ul className="space-y-4 text-lg">
            <li><Link href="/" onClick={() => setDrawerOpen(false)} className="flex gap-3"><FaHome /> Home</Link></li>
            <li><Link href="/all_doctors" onClick={() => setDrawerOpen(false)} className="flex gap-3"><FaUserMd /> Doctors</Link></li>
            <li><Link href="/contact" onClick={() => setDrawerOpen(false)} className="flex gap-3"><FaPhoneAlt /> Contact</Link></li>

            <li>
              {status === "authenticated" ? (
                <>
                  <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
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
                    </div>

                    {session?.user?.role === "doctor" ? (
                      <div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu mt-2 bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
                        >
                          <Link href={"/profile/doctor_profile"}>
                            <li className="mb-3">
                              <button className="btn">Doctor Profile</button>
                            </li>
                          </Link>
                          <li>
                            <button className="btn btn-info" onClick={() => signOut()}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (

                      <div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu mt-2 bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm"
                        >
                          <Link href={"/profile/patient_profile"}>
                            <li className="mb-3">
                              <button className="btn">Patient Profile</button>
                            </li>
                          </Link>
                          <li>
                            <button className="btn btn-info" onClick={() => signOut()}>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>

                  <div className="dropdown dropdown-center">
                    <div tabIndex={0}>
                      <Link href="/login" className="btn btn-info rounded-4xl px-6">
                        Log In
                      </Link>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-20 p-2 shadow-sm"
                    >
                      <Link href={"/Login/doctor"} className="pb-4">
                        <button className="btn btn-sm btn-soft btn-info text-black">
                          Doctor
                        </button>
                      </Link>
                      <Link href={"/Login/patient"}>
                        <button className="btn btn-sm btn-soft btn-info text-black">
                          Patient
                        </button>
                      </Link>
                    </ul>
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end gap-2">

        <div className='hidden lg:block'>
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" onChange={handleThemeChange} checked={theme === 'dark'} />
            <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22a10.14,10.14,0,0,0,9.53,9.53A8.14,8.14,0,0,1,12.14,19.69Z" /></svg>
            <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          </label>
        </div>

        <div className="hidden sm:flex gap-5">












          <div className='hidden lg:block'>
            {status === "authenticated" ? (
              <div className="dropdown dropdown-end">
                {/* Profile Trigger */}
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-2 py-1.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-cyan-400 cursor-pointer"
                >
                  {/* User Image */}
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-cyan-500 ring-offset-base-100 ring-offset-2">
                      {session?.user?.image ? (
                        <Image
                          src={session.user.image}
                          width={40}
                          height={40}
                          alt={session?.user?.name || "User"}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {session?.user?.name
                            ? session.user.name.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Information */}
                  <div className="hidden xl:block text-left leading-tight">
                    <p className="max-w-[130px] truncate text-sm font-bold text-base-content">
                      {session?.user?.name || "VirtualDoc User"}
                    </p>

                    <p className="text-xs font-medium text-cyan-600 capitalize">
                      {session?.user?.role === "doctor"
                        ? "Healthcare Professional"
                        : "Patient Account"}
                    </p>
                  </div>

                  {/* Dropdown Arrow */}
                  <svg
                    className="hidden sm:block w-4 h-4 text-base-content/60"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                <div
                  tabIndex={0}
                  className="dropdown-content z-[100] mt-4 w-72 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-2xl"
                >
                  {/* User Header */}
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-xl overflow-hidden">
                        {session?.user?.image ? (
                          <Image
                            src={session.user.image}
                            width={48}
                            height={48}
                            alt="User"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span>
                            {session?.user?.name
                              ? session.user.name.charAt(0).toUpperCase()
                              : "U"}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold truncate">
                          {session?.user?.name || "VirtualDoc User"}
                        </h3>

                        <p className="text-xs text-white/80 truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

                      {session?.user?.role === "doctor"
                        ? "Doctor Account"
                        : "Patient Account"}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="mt-3 space-y-1">

                    {/* Profile */}
                    <Link
                      href={
                        session?.user?.role === "doctor"
                          ? "/profile/doctor_profile"
                          : "/profile/patient_profile"
                      }
                      className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all hover:bg-cyan-50 hover:text-cyan-700"
                    >
                      {/* Profile Icon */}
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A7 7 0 0112 15c2.5 0 4.7 1.3 5.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <div>
                        <p className="text-sm font-semibold">
                          My Profile
                        </p>

                        <p className="text-xs text-base-content/50">
                          Manage your account
                        </p>
                      </div>
                    </Link>

                    {/* My Appointments - Patient Only */}
                    {session?.user?.role !== "doctor" && (
                      <Link
                        href="/My_Bookings"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all hover:bg-cyan-50 hover:text-cyan-700"
                      >
                        {/* Calendar Icon */}
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                          />
                        </svg>

                        <div>
                          <p className="text-sm font-semibold">
                            My Appointments
                          </p>

                          <p className="text-xs text-base-content/50">
                            View your consultations
                          </p>
                        </div>
                      </Link>
                    )}

                    {/* Doctor Dashboard */}
                    {session?.user?.role === "doctor" && (
                      <Link
                        href="/profile/doctor_profile"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all hover:bg-cyan-50 hover:text-cyan-700"
                      >
                        {/* Dashboard Icon */}
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z"
                          />
                        </svg>

                        <div>
                          <p className="text-sm font-semibold">
                            Doctor Dashboard
                          </p>

                          <p className="text-xs text-base-content/50">
                            Manage your practice
                          </p>
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-base-300"></div>

                  {/* Logout */}
                  <button
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-semibold text-red-500 transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    {/* Logout Icon */}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                      />
                    </svg>

                    <div>
                      <p className="text-sm">
                        Sign Out
                      </p>

                      <p className="text-xs font-normal text-base-content/50">
                        Securely logout from VirtualDoc
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>

                <div className="dropdown dropdown-center">
                  <div tabIndex={0}>
                    <Link href="/login" className="btn rounded-4xl btn-ghost">
                      Log In
                    </Link>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-20 p-2 shadow-sm"
                  >
                    <Link href={"/Login/doctor"} className="pb-4">
                      <button className="btn btn-sm btn-soft btn-info text-black">
                        Doctor
                      </button>
                    </Link>
                    <Link href={"/Login/patient"}>
                      <button className="btn btn-sm btn-soft btn-info text-black">
                        Patient
                      </button>
                    </Link>
                  </ul>
                </div>
              </>
            )}
          </div>














          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden text-2xl"
          >
            <FaBars />
          </button>

          <Link href="/all_doctors" className="btn text-[15px] font-bold rounded-4xl px-8 bg-gradient-to-br from-green-300 to-blue-600 hover:bg-gradient-to-bl">Get Started</Link>
        </div>
      </div>

    </div>
  );
};