"use client";
import { usePathname } from "next/navigation";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navber";
import Loading from "./LayoutLoading/Loading";
import NextAuthProviders from "@/Providers/NextAuthProviders";



export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideOn = ["/Auth_login","/Login/patient","/Login/doctor", "/signup", ];
  const hide = hideOn.includes(pathname);

  return (
    <>
    <NextAuthProviders>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </NextAuthProviders>
      <Loading />
    </>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// import Footer from "./layout/Footer";
// import Navbar from "./layout/Navber";
// import Loading from "./LayoutLoading/Loading";
// import NextAuthProviders from "@/Providers/NextAuthProviders";

// export default function ClientLayout({ children }) {
//   const pathname = usePathname();

//   const hideOn = [
//     "/Auth_login",
//     "/Login/patient",
//     "/Login/doctor",
//     "/signup",
//   ];

//   const hide = hideOn.includes(pathname);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <NextAuthProviders>
//       {!hide && <Navbar />}
//       {children}
//       {!hide && <Footer />}
//     </NextAuthProviders>
//   );
// }