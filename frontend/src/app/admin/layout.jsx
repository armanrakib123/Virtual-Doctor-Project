'use client';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../admin_components/Navbar';
import Sidebar from '../../admin_components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from '../../admin_context/AdminContext';
import { DoctorContext } from '../../admin_context/DoctorContext';
import AdminProviders from '../../admin_context/AdminProviders';

function AdminLayoutInner({ children }) {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <ToastContainer />
        {children}
      </>
    );
  }

  return dToken || aToken ? (
    <div className='bg-base-200 text-base-content min-h-screen mt-40 transition-colors'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <div className="flex-1 w-full">
            {children}
        </div>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default function AdminLayout({ children }) {
    return (
        <AdminProviders>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminProviders>
    )
}

