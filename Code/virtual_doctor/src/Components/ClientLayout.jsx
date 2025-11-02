"use client";
import { usePathname } from "next/navigation";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navber";
import Loading from "./LayoutLoading/Loading";



export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideOn = ["/login", "/signup", "/d"];
  const hide = hideOn.includes(pathname);

  return (
    <>
      {!hide && <Navbar />}
      {children}
      {!hide && <Footer />}
      <Loading>
      </Loading>
    </>
  );
}