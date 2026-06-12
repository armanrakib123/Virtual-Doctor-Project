// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const Appointment_Booking_Update = ({ data }) => {
//     const { data: session } = useSession();
    
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);


//     const handleBookService = async (e) => {
//         toast("Submitting Booking...");
//         e.preventDefault();

//         setLoading(true);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         toast.success("Order Update Successfully!");

//         const form = e.target;
       
//         const date = form.date.value;
//         const phone = form.phone.value;
//         const address = form.address.value;
        
//         const bookingPayload = {

//             date,
//             phone,
//             address,

//         };


//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointment_Update/${data._id}`,{
//             method: "PATCH",
//             body: JSON.stringify(bookingPayload),
//         }) 

//         const postedResponse = await res.json()

//         router.push("/My_Bookings");



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
//                                 defaultValue={data?.service_price}
//                                 readOnly
//                                 name="price"
//                                 className="input input-bordered"
//                             />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Date</span>
//                             </label>
//                             <input
//                              defaultValue={data?.data}
//                              type="date"
//                               name="date"
//                                className="input input-bordered" />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Phone</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 defaultValue={data?.phone}
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
//                                 defaultValue={data?.address}
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

// export default Appointment_Booking_Update;







"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Appointment_Booking_Update = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBookService = async (e) => {
    e.preventDefault();
    toast.loading("Updating Appointment...");
    setLoading(true);

    const form = e.target;
    const bookingPayload = {
      date: form.date.value,
      phone: form.phone.value,
      address: form.address.value,
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Appointment_Update/${data._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(bookingPayload),
      }
    );

    toast.dismiss();
    toast.success("Appointment Updated Successfully!");
    router.push("/profile/patient_profile/appointments");
  };

  return (
    <div className="my-10 px-3">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-primary">
          Update Appointment
        </h2>

        <form onSubmit={handleBookService} className="space-y-6">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Name */}
            <div className="form-control">
              <label className="label font-semibold">Name</label>
              <input
                defaultValue={session?.user?.name}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                defaultValue={session?.user?.email}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label font-semibold">Due Amount</label>
              <input
                defaultValue={data?.service_price}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label font-semibold">Appointment Date</label>
              <input
                type="date"
                name="date"
                defaultValue={data?.date}
                className="input input-bordered"
                required
              />
            </div>

            {/* Phone (Mobile Optimized) */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                defaultValue={data?.phone}
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
                inputMode="numeric"
                required
              />
            </div>

            {/* Address */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">Present Address</label>
              <input
                type="text"
                name="address"
                defaultValue={data?.address}
                placeholder="Enter your address"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="btn btn-primary w-full text-lg rounded-xl"
          >
            {loading ? "Updating..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment_Booking_Update;
