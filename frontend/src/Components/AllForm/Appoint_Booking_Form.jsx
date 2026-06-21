// "use client";

// import { useSession } from "next-auth/react";
// import React from "react";
// import toast from "react-hot-toast";

// const Appoint_Booking_Form = ({ data }) => {
//     const { data: session } = useSession();


//     const handleBookService = async (e) => {
//         toast("Submitting Booking...");
//         e.preventDefault();

//         const form = e.target;
//         const name = form.name.value;
//         const date = form.date.value;
//         const phone = form.phone.value;
//         const address = form.address.value;
//         const email = form.email.value;
//         const channelName = `appointment_${Date.now()}`;



//         const bookingPayload = {
//             // Session
//             customerName: name,
//             email,

//             // User Inputs
//             date,
//             phone,
//             address,

//             // Extra information
//             service_id: data._id,
//             service_name: data.title,
//             service_firstName: data.firstName,
//             service_img: data.profilePicture,
//             service_price: data.Consultation_Fee,
//             channelName,
//         };

//         console.log(bookingPayload);

//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor`,
//             {
//                 method: "POST",
//                 body: JSON.stringify(bookingPayload),
//             })






//         const postedResponse = await res.json()
//         window.location.href = `/video/${postedResponse.channelName}`;
//         console.log("POSTED DATA", postedResponse);
//     };

//     return (
//         <div className="my-10">
//             <div className="w-11/12 mx-auto">
//                 <h2 className="text-center text-3xl mb-4">
//                     Appointment Book : {data?.title} Name
//                 </h2>

//                 <form onSubmit={handleBookService}>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Name</span>
//                             </label>
//                             <input
//                                 defaultValue={session?.user?.name}
//                                 readOnly
//                                 type="text"
//                                 name="name"
//                                 className="input input-bordered"
//                             />
//                         </div>

//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email</span>
//                             </label>
//                             <input
//                                 defaultValue={session?.user?.email}
//                                 readOnly
//                                 type="text"
//                                 name="email"
//                                 placeholder="email"
//                                 className="input input-bordered"
//                             />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Due amount</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 defaultValue={data?.Consultation_Fee}
//                                 readOnly
//                                 name="price"
//                                 className="input input-bordered"
//                             />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Date</span>
//                             </label>
//                             <input type="date" name="date" className="input input-bordered" />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Phone</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 placeholder="Your Phone"
//                                 className="input input-bordered"
//                             />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Present Address</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 placeholder="Your Address"
//                                 className="input input-bordered"
//                             />
//                         </div>
//                     </div>
//                     <div className="form-control mt-6">
//                         <input
//                             className="btn btn-primary btn-block"
//                             type="submit"
//                             value="Confirm Appointment"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Appoint_Booking_Form;


















"use client";

import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

const Appoint_Booking_Form = ({ data }) => {
  const { data: session } = useSession();

  const handleBookService = async (e) => {
    toast("Submitting Booking...");
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;
    const channelName = `appointment_${Date.now()}`;

    const bookingPayload = {
      customerName: name,
      email,
      date,
      phone,
      address,
      service_id: data._id,
      service_name: data.title,
      service_firstName: data.firstName,
      service_img: data.profilePicture,
      service_price: data.Consultation_Fee,
      channelName,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointment_Update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      }
    );

    const postedResponse = await res.json();
    window.location.href = "/all_doctors";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Book Appointment
          </h2>
          <p className="text-slate-600 mt-2">
            {data?.title} {data?.firstName} {data?.lastName}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleBookService} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                defaultValue={session?.user?.name}
                readOnly
                name="name"
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                defaultValue={session?.user?.email}
                readOnly
                name="email"
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100 focus:outline-none"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Consultation Fee
              </label>
              <input
                defaultValue={`৳ ${data?.Consultation_Fee}`}
                readOnly
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 bg-slate-100 font-semibold"
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Appointment Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="01XXXXXXXXX"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Present Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your current address"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appoint_Booking_Form;
