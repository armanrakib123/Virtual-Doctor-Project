import DeleteBooking from "@/app/My_Bookings/Components/DeleteBooking";
import Image from "next/image";
import Link from "next/link";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaVideo,
  FaRegEdit,
  FaUserMd,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";

const MY_bookings_Table = ({ data }) => {
  return (
    <section className="min-h-screen bg-base-200 py-10 md:py-16">

      <div className="mx-auto w-11/12 max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10 text-center">

          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-3xl text-white shadow-lg">
              <FaCalendarAlt />
            </div>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            My <span className="text-cyan-600">Appointments</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base-content/60">
            Manage your upcoming appointments and connect with your doctor
            through secure video consultation.
          </p>

          {/* Appointment Count */}

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-600">
            <FaCalendarAlt />

            {data?.length || 0} Appointment
            {data?.length !== 1 ? "s" : ""}
          </div>

        </div>


        {/* ================= EMPTY STATE ================= */}

        {(!data || data.length === 0) && (

          <div className="rounded-3xl border border-base-content/10 bg-base-100 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10 text-4xl text-cyan-600">
              <FaCalendarAlt />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No Appointments Found
            </h2>

            <p className="mt-3 text-base-content/60">
              You haven't booked any appointments yet.
            </p>

            <Link
              href="/all_doctors"
              className="btn mt-6 rounded-full border-none bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-white hover:from-cyan-600 hover:to-blue-700"
            >
              Find a Doctor

              <FaArrowRight />
            </Link>

          </div>

        )}


        {/* ================= APPOINTMENT GRID ================= */}

        {data?.length > 0 && (

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {data.map((item) => (

              <article
                key={item._id}
                className="group relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Top Gradient */}

                <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />


                <div className="p-6">

                  {/* ================= STATUS ================= */}

                  <div className="mb-5 flex items-center justify-between">

                    <span className="rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-600">
                      ● Confirmed
                    </span>

                    <span className="text-xs text-base-content/50">
                      Appointment
                    </span>

                  </div>


                  {/* ================= DOCTOR INFO ================= */}

                  <div className="flex items-center gap-4">

                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-500/20 shadow-md">

                      <Image
                        src={item.service_img}
                        alt={item.service_firstName || "Doctor"}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                    </div>


                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <FaUserMd className="text-cyan-600" />

                        <span className="text-xs font-medium text-base-content/50">
                          Your Doctor
                        </span>

                      </div>


                      <h3 className="mt-1 truncate text-xl font-bold">
                        Dr. {item.service_firstName}
                      </h3>


                      <p className="mt-1 text-sm text-base-content/60">
                        {item.service_name}
                      </p>

                    </div>

                  </div>


                  {/* ================= DIVIDER ================= */}

                  <div className="my-6 border-t border-base-content/10" />


                  {/* ================= APPOINTMENT DETAILS ================= */}

                  <div className="space-y-4">


                    {/* Date */}

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600">
                        <FaCalendarAlt />
                      </div>

                      <div>

                        <p className="text-xs text-base-content/50">
                          Appointment Date
                        </p>

                        <p className="font-semibold">
                          {item.date}
                        </p>

                      </div>

                    </div>


                    {/* Phone */}

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                        <FaPhoneAlt />
                      </div>

                      <div>

                        <p className="text-xs text-base-content/50">
                          Contact Number
                        </p>

                        <p className="font-semibold">
                          {item.phone}
                        </p>

                      </div>

                    </div>


                    {/* Address */}

                    <div className="flex items-center gap-4">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                        <FaMapMarkerAlt />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs text-base-content/50">
                          Address
                        </p>

                        <p className="truncate font-semibold">
                          {item.address}
                        </p>

                      </div>

                    </div>


                    {/* Fee */}

                    <div className="flex items-center justify-between rounded-2xl bg-base-200 p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                          <FaMoneyBillWave />
                        </div>

                        <div>

                          <p className="text-xs text-base-content/50">
                            Consultation Fee
                          </p>

                          <p className="font-bold text-cyan-600">
                            ৳ {item.service_price}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* ================= ACTION BUTTONS ================= */}

                  <div className="mt-6 space-y-3">


                    {/* VIDEO CALL BUTTON */}

                    <Link
                      href={`/room/room_${item._id}`}
                      className="btn h-12 w-full rounded-xl border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-base font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg"
                    >

                      <FaVideo className="text-lg" />

                      Join Video Consultation

                    </Link>


                    {/* EDIT + DELETE */}

                    <div className="grid grid-cols-2 gap-3">

                      <Link
                        href={`/My_Bookings/Edit/${item._id}`}
                        className="btn h-11 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500 hover:text-white"
                      >

                        <FaRegEdit />

                        Edit

                      </Link>


                      <div className="flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5">

                        <DeleteBooking
                          id={item._id}
                          email={item.email}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default MY_bookings_Table;

