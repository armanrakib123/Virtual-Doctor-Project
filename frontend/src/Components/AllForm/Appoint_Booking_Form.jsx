
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaVideo,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaStethoscope,
} from "react-icons/fa";

import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Appoint_Booking_Form = ({ data }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const doctorName = `${data?.title || "Dr."} ${
    data?.firstName || ""
  } ${data?.lastName || ""}`;

  const handleBookService = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first to book an appointment.");
      router.push("/login");
      return;
    }

    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;

    // Unique Video Consultation Room
    const channelName = `appointment_${data?._id}_${Date.now()}`;

    const bookingPayload = {
      customerName: name,
      email,
      date,
      phone,
      address,

      // Doctor Information
      service_id: data._id,
      service_name: data.specialty || data.title,
      service_firstName: data.firstName,
      service_lastName: data.lastName,
      service_img: data.profilePicture,
      service_price: data.Consultation_Fee,

      // Video Call Room
      channelName,

      // Booking Status
      status: "pending",
      paymentStatus: "unpaid",
    };

    try {
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

      if (!res.ok) {
        throw new Error("Failed to book appointment");
      }

      await res.json();

      toast.success("Appointment booked successfully!");

      setTimeout(() => {
        router.push("/My_Bookings");
      }, 1000);

    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200 pb-16">

      <div className="mx-auto w-11/12 max-w-6xl">

        {/* ================= BACK BUTTON ================= */}


        {/* ================= PAGE HEADER ================= */}

        <div className="mb-10 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl text-white shadow-lg">

            <FaCalendarAlt />

          </div>

          <h1 className="text-3xl font-bold md:text-4xl">

            Book Your
            <span className="ml-2 text-cyan-600">
              Appointment
            </span>

          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base-content/60">

            Complete the form below to schedule your consultation
            with your doctor.

          </p>

        </div>


        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">


          {/* =====================================================
              LEFT SIDE - DOCTOR INFORMATION
          ====================================================== */}

          <aside className="lg:col-span-1">

            <div className="sticky top-28 overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-xl">


              {/* Top Background */}

              <div className="h-28 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />


              {/* Doctor Image */}

              <div className="-mt-16 flex justify-center">

                <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-4 border-base-100 bg-base-200 shadow-xl">

                  {data?.profilePicture ? (

                    <Image
                      src={data.profilePicture}
                      alt={doctorName}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />

                  ) : (

                    <div className="flex h-full w-full items-center justify-center text-4xl text-cyan-600">

                      <FaUser />

                    </div>

                  )}

                </div>

              </div>


              {/* Doctor Details */}

              <div className="px-6 pb-6 pt-5 text-center">

                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-600">

                  <FaStethoscope />

                  Your Doctor

                </div>


                <h2 className="text-2xl font-bold">

                  {doctorName}

                </h2>


                <p className="mt-2 font-medium text-cyan-600">

                  {data?.specialty || "Medical Specialist"}

                </p>


                {data?.hospitalAffiliation && (

                  <p className="mt-2 text-sm text-base-content/60">

                    {data.hospitalAffiliation}

                  </p>

                )}


                {/* Divider */}

                <div className="my-6 border-t border-base-content/10" />


                {/* Fee */}

                <div className="rounded-2xl bg-cyan-500/10 p-5">

                  <p className="text-sm text-base-content/60">

                    Consultation Fee

                  </p>


                  <div className="mt-2 flex items-center justify-center gap-1 text-3xl font-bold text-cyan-600">

                    <FaBangladeshiTakaSign />

                    {data?.Consultation_Fee || 0}

                  </div>

                </div>


                {/* Video Consultation */}

                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-blue-500/10 p-4 text-left">

                  <div className="mt-1 text-blue-600">

                    <FaVideo />

                  </div>

                  <div>

                    <p className="text-sm font-semibold">

                      Video Consultation

                    </p>

                    <p className="mt-1 text-xs leading-5 text-base-content/60">

                      After booking, you can join your secure
                      online consultation room.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </aside>


          {/* =====================================================
              RIGHT SIDE - BOOKING FORM
          ====================================================== */}

          <section className="lg:col-span-2">

            <div className="rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-xl md:p-10">


              {/* Form Header */}

              <div className="mb-8">

                <h2 className="text-2xl font-bold">

                  Appointment Information

                </h2>

                <p className="mt-2 text-base-content/60">

                  Please provide your information to confirm
                  your appointment.

                </p>

              </div>


              <form
                onSubmit={handleBookService}
                className="space-y-6"
              >


                {/* ================= PATIENT INFORMATION ================= */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <FaUser className="text-cyan-600" />

                    <h3 className="font-bold">

                      Patient Information

                    </h3>

                  </div>


                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                    {/* Name */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold">

                        Full Name

                      </label>

                      <div className="relative">

                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                        <input
                          defaultValue={session?.user?.name || ""}
                          readOnly
                          name="name"
                          className="input input-bordered h-12 w-full rounded-xl pl-11"
                        />

                      </div>

                    </div>


                    {/* Email */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold">

                        Email Address

                      </label>

                      <div className="relative">

                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                        <input
                          defaultValue={session?.user?.email || ""}
                          readOnly
                          name="email"
                          className="input input-bordered h-12 w-full rounded-xl pl-11"
                        />

                      </div>

                    </div>

                  </div>

                </div>


                {/* Divider */}

                <div className="border-t border-base-content/10" />


                {/* ================= APPOINTMENT DETAILS ================= */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <FaCalendarAlt className="text-cyan-600" />

                    <h3 className="font-bold">

                      Appointment Details

                    </h3>

                  </div>


                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                    {/* Date */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold">

                        Appointment Date

                      </label>

                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="input input-bordered h-12 w-full rounded-xl"
                      />

                    </div>


                    {/* Fee */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold">

                        Consultation Fee

                      </label>

                      <div className="flex h-12 items-center gap-2 rounded-xl border border-base-content/20 bg-base-200 px-4 font-bold text-cyan-600">

                        <FaBangladeshiTakaSign />

                        {data?.Consultation_Fee || 0}

                      </div>

                    </div>

                  </div>

                </div>


                {/* Divider */}

                <div className="border-t border-base-content/10" />


                {/* ================= CONTACT INFORMATION ================= */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <FaPhoneAlt className="text-cyan-600" />

                    <h3 className="font-bold">

                      Contact Information

                    </h3>

                  </div>


                  <div className="space-y-5">


                    {/* Phone */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold">

                        Phone Number

                      </label>

                      <div className="relative">

                        <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                        <input
                          type="tel"
                          name="phone"
                          placeholder="01XXXXXXXXX"
                          required
                          className="input input-bordered h-12 w-full rounded-xl pl-11"
                        />

                      </div>

                    </div>


                    {/* Address */}

                    <div>

                      <label className="mb-2 block text-sm font-semibold">

                        Present Address

                      </label>

                      <div className="relative">

                        <FaMapMarkerAlt className="absolute left-4 top-4 text-base-content/40" />

                        <textarea
                          name="address"
                          placeholder="Enter your current address"
                          required
                          rows={4}
                          className="textarea textarea-bordered w-full rounded-xl pl-11 pt-3"
                        />

                      </div>

                    </div>

                  </div>

                </div>


                {/* ================= SECURITY INFO ================= */}

                <div className="flex gap-4 rounded-2xl bg-green-500/10 p-5">

                  <FaShieldAlt className="mt-1 text-xl text-green-600" />

                  <div>

                    <h4 className="font-semibold text-green-700">

                      Secure Appointment Booking

                    </h4>

                    <p className="mt-1 text-sm leading-6 text-base-content/60">

                      Your personal information is securely stored
                      and used only for managing your healthcare
                      appointment.

                    </p>

                  </div>

                </div>


                {/* ================= SUBMIT BUTTON ================= */}

                <button
                  type="submit"
                  disabled={loading || status === "loading"}
                  className="btn h-14 w-full rounded-2xl border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold text-white shadow-lg transition hover:scale-[1.01] hover:from-cyan-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (

                    <>
                      <span className="loading loading-spinner" />

                      Confirming Appointment...

                    </>

                  ) : (

                    <>
                      <FaCheckCircle />

                      Confirm Appointment

                    </>

                  )}

                </button>


                <p className="text-center text-xs text-base-content/50">

                  By confirming, you agree to the appointment
                  booking terms and healthcare privacy policy.

                </p>

              </form>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
};

export default Appoint_Booking_Form;

