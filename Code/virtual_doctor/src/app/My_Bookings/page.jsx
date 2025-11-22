import MY_bookings_Table from '@/Components/MY_Bookings/MY_bookings_Table'
import { headers } from 'next/headers';

const fetchMyBookings = async () => {
      const res = await fetch(`http://localhost:3000/api/doctor`,{
        headers: await headers(),
      });
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











// import MY_bookings_Table from '@/Components/MY_Bookings/MY_bookings_Table'
// import { headers } from 'next/headers'

// export default async function My_Booking_Page() {
//   const hdr = await headers(); 
  
//   const headerObj = Object.fromEntries(hdr.entries());
//   const base = process.env.NEXTAUTH_URL

//   const res = await fetch(`${base}/api/doctor`, {
//     headers: headerObj
//   });

//   const data = await res.json();

//   return (
//     <div className='mt-28'>
//       Mybookings
//       <MY_bookings_Table data={data} />
//     </div>
//   );
// }
