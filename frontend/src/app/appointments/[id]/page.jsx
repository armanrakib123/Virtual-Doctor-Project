import Appoint_Booking_Form from '@/Components/AllForm/Appoint_Booking_Form';
import React from 'react'

export default async function AppointmentPage({ params }) {
  
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${id}`,
    { cache: "no-store" });
  const data = await res.json();



  return (
    <div className='mt-28'>
      <Appoint_Booking_Form data={data}></Appoint_Booking_Form>
    </div>
  )
}
