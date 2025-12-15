'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

/////////////////////////////// All items////////////////////////////

const navItems = [
  // {
  //   name: "Home",
  //   promo: {
  //     title: "Build with AI",
  //     desc: "Power your Android apps with the latest Gemini APIs.",
  //     cta: "Get Started",
  //     imgSrc: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=764&auto=format&fit=crop"
  //   },
  //   columns: [
  //     {
  //       title: "Get Started",
  //       links: [
  //         { text: "A", href: "/docs/hello-world" },
  //         { text: "B", href: "/courses" },
  //         { text: "C", href: "/tutorials" }
  //       ]
  //     },
  //     {
  //       title: "By Device",
  //       links: [
  //         { text: "D", href: "/docs/device/adaptive" },
  //         { text: "E", href: "/docs/device/xr" },
  //         { text: "F", href: "/docs/device/wear-os" },
  //         { text: "G", href: "/docs/device/chromeos" }

  //       ]
  //     }
  //   ]
  // },

  {
    name: "Features",
    promo: {
      title: "Excellent Experiences",
      desc: "Create beautiful, user-centric designs for every user.",
      cta: "Learn More",
      imgSrc: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=764&auto=format&fit=crop"
    },
    columns: [
      {
        title: "UI Design",
        links: [
          { text: "Design for Android", href: "/design/android" },
          { text: "Mobile", href: "/design/mobile" },
          { text: "Adaptive UI", href: "/design/adaptive" },
          { text: "Widgets", href: "/design/widgets" }
        ]
      },
      {
        title: "Architecture",
        links: [
          { text: "Introduction", href: "/architecture/intro" },
          { text: "Libraries", href: "/architecture/libraries" },
          { text: "Navigation", href: "/architecture/navigation" },
          { text: "Testing", href: "/architecture/testing" }
        ]
      },
    ]
  },
  {
    name: "About",
    promo: {
      title: "Excellent Experiences",
      desc: "Create beautiful, user-centric designs for every user.",
      cta: "Learn More",
      imgSrc: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=764&auto=format&fit=crop"
    },
    columns: [
      {
        title: "UI Design",
        links: [
          { text: "Design for Android", href: "/design/android" },
          { text: "Mobile", href: "/design/mobile" },
          { text: "Adaptive UI", href: "/design/adaptive" },
          { text: "Widgets", href: "/design/widgets" }
        ]
      },
      {
        title: "Architecture",
        links: [
          { text: "Introduction", href: "/architecture/intro" },
          { text: "Libraries", href: "/architecture/libraries" },
          { text: "Navigation", href: "/architecture/navigation" },
          { text: "Testing", href: "/architecture/testing" }
        ]
      },
    ]
  },
  // {
  //   name: "Contact",
  //   promo: {
  //     title: "Excellent Experiences",
  //     desc: "Create beautiful, user-centric designs for every user.",
  //     cta: "Learn More",
  //     imgSrc: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=764&auto=format&fit=crop"
  //   },
  //   columns: [
  //     {
  //       title: "UI Design",
  //       links: [
  //         { text: "Design for Android", href: "/design/android" },
  //         { text: "Mobile", href: "/design/mobile" },
  //         { text: "Adaptive UI", href: "/design/adaptive" },
  //         { text: "Widgets", href: "/design/widgets" }
  //       ]
  //     },
  //     {
  //       title: "Architecture",
  //       links: [
  //         { text: "Introduction", href: "/architecture/intro" },
  //         { text: "Libraries", href: "/architecture/libraries" },
  //         { text: "Navigation", href: "/architecture/navigation" },
  //         { text: "Testing", href: "/architecture/testing" }
  //       ]
  //     },
  //   ]
  // }
];
////////////////////////////////////////////////////////////////////






/////////////////// Theme Section/////////////////////////////////////
export default function Navbar() {

  const { data: session, status } = useSession();
  console.log(session)


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
  /////////////////////////////////////////////////////////////////





  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scroll Down
        setShowNavbar(false);
      } else {
        // Scroll Up
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


  /////////////////////////////////////////////////////////////




  return (
    <div
      className={`fixed top-0 flex z-50 w-full transition-transform duration-300 py-8 px-22 bg-base-300/80 backdrop-blur-sm shadow-md ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="navbar-start flex justify-between">
        <div>
          <Link href="/" className="flex gap-1 btn-ghost text-xl">
            <div className='w-12'><img src="/Assets/Stethoscope.png" alt="Stethoscope_icon" /></div>
            <span className="font-bold text-3xl">Virtual<span className="text-cyan-600">Doc</span></span>
          </Link>
        </div>

      </div>
      <div>
        <ul className="ml-4 gap-2 hidden lg:flex">
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


      <div className="navbar-end gap-2">
        <div className='justify-center items-center flex'>
          {/* <div className="dropdown dropdown-hover dropdown-center">
            <div tabIndex={0} className=""><GrLanguage className='w-5 h-5' /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-20 p-2 shadow-sm">
              <li><a>English</a></li>
              <li><a>বাংলা</a></li>
            </ul>
          </div> */}
        </div>

        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" onChange={handleThemeChange} checked={theme === 'dark'} />
          <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22a10.14,10.14,0,0,0,9.53,9.53A8.14,8.14,0,0,1,12.14,19.69Z" /></svg>
          <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41l-.71.71a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
        </label>

        <div className="hidden sm:flex gap-5">

          {status === "authenticated" ? (
            <>
              <div className="dropdown dropdown-center">
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
                        <button className="btn" onClick={() => signOut()}>
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
                        <button className="btn" onClick={() => signOut()}>
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




          {/* {status == "authenticated" ? (<>

            <div className="dropdown dropdown-center">
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
              <div>
                

              </div>
              <div>
                <ul tabIndex="-1" className="dropdown-content menu mt-2 bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
                  <Link href={"/profile/patient_profile"}><li className='mb-3'><button className='btn'>View Profile</button></li></Link>
                  <li><button className='btn' onClick={() => signOut()}>Logout</button></li>
                </ul>
                
              </div>
              <div>
                <ul tabIndex="-1" className="dropdown-content menu mt-2 bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
                  <Link href={"/profile/patient_profile"}><li className='mb-3'><button className='btn'>View Profile</button></li></Link>
                  <li><button className='btn' onClick={() => signOut()}>Logout</button></li>
                </ul>
                
              </div>
            </div>


          </>) : (<><div className="dropdown dropdown-center">

            <div tabIndex={0} className=""><Link href="/login" className="btn rounded-4xl btn-ghost">Log In</Link></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-20 p-2 shadow-sm">
              <Link className='pb-4' href={"/Login/doctor "}><button className="btn btn-sm btn-soft btn-info text-black">Doctor</button></Link>
              <Link href={"/Login/patient"}><button className="btn btn-sm btn-soft btn-info text-black">Patient</button></Link>

            </ul>
          </div></>)} */}



          <Link href="/all_doctors" className="btn text-[15px] font-bold rounded-4xl px-8 bg-gradient-to-br from-green-300 to-blue-600 hover:bg-gradient-to-bl">Get Started</Link>
        </div>
      </div>

    </div>
  );
};
