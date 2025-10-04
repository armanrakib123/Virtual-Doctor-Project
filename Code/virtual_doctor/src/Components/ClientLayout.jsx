"use client";
import { usePathname } from "next/navigation";
import Footer from "./Homepage/Footer";
import Navbar from "./Homepage/Navber";



export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideOn = ["/login", "/signup", "/d"];
  const hide = hideOn.includes(pathname);

  return (
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </>
  );
}