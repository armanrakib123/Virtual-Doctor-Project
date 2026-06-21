
import Appointment_Booking_Update from '@/Components/AllForm/Appointment_Booking_Update';
import { headers } from 'next/headers';
import React from 'react'


export default async function Update_Booking_Page({ params }) {
  const p = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointment_Update/${p.id}`, {
    headers: new Headers(await headers()),
  });
  const data = await res.json();



  return (
    <div className='mt-30'>
      <Appointment_Booking_Update data={data}></Appointment_Booking_Update>
    </div>
  )
}
