// export default function AppointmentsPage() {
//   const appointments = [
//     { id: 1, doctor: 'Dr. Jane Doe', date: '2025-11-12 10:00', status: 'Upcoming' },
//     { id: 2, doctor: 'Dr. Hasan Ali', date: '2025-10-25 09:30', status: 'Completed' }
//   ];

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-indigo-700 mb-4">My Appointments</h2>
//       <div className="space-y-3">

//         {appointments.map((a) => (
//           <div key={a.id} className="p-4 border rounded-xl bg-indigo-50 flex justify-between">
//             <div>
//               <div className="font-medium">{a.doctor}</div>
//               <div className="text-sm text-slate-500">{a.date}</div>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm 
//               ${a.status === 'Upcoming' ? 'bg-green-200 text-green-700' : 'bg-slate-200 text-slate-700'}
//             `}>
//               {a.status}
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }







import MY_bookings_Table from '@/Components/MY_Bookings/MY_bookings_Table';
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