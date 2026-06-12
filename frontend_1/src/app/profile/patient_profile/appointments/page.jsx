import MY_bookings_Table from '@/Components/MY_Bookings/MY_bookings_Table';
import { headers } from 'next/headers';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const fetchMyBookings = async () => {
      const session = await getServerSession(authOptions);
      if (!session || !session.user?.email) return [];
      const email = session.user.email;
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointment_Update?email=${email}`,{
        cache: 'no-store'
      });
      if (!res.ok) return [];
      const d = await res.json();
      return d;
    };

export default async function My_Booking_Page() {
  const data = await fetchMyBookings();

  return (
    <div className='mt-28'>
      <MY_bookings_Table data={data}></MY_bookings_Table>
    </div>
  )
}