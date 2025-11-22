"use client";
import { usePathname } from "next/navigation";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navber";
import Loading from "./LayoutLoading/Loading";
import NextAuthProviders from "@/Providers/NextAuthProviders";



export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideOn = ["/Auth_login","/Login/patient","/Login/doctor", "/signup", "/d"];
  const hide = hideOn.includes(pathname);

  return (
    <>
    <NextAuthProviders>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
    </NextAuthProviders>
      <Loading>
      </Loading>
    </>
  );
}
