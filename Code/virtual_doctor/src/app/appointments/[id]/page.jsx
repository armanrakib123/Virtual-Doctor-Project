import Appoint_Booking_Form from '@/Components/AllForm/Appoint_Booking_Form';
import React from 'react'

export default async function AppointmentPage({ params }) {
  const res = await fetch(`http://localhost:3000/api/doctor/${params.id}`);
  const data = await res.json();

  return (
    <div className='mt-28'>
      <Appoint_Booking_Form data={data}></Appoint_Booking_Form>
    </div>
  )
}
