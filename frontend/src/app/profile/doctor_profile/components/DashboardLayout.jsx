"use client"; 

import Sidebar from "./Sideber";
import Top_Dashbord from "./Top_Dashbord";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-base-200 min-h-screen transition-colors">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10">
        <div className="py-6"><Top_Dashbord></Top_Dashbord></div>
        <div>{children}</div>
      </main>
    </div>
  );
}
