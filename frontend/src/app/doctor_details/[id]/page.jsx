



import Link from "next/link";
import React from "react";

import {
  FaVideo,
  FaCalendarCheck,
  FaUserMd,
  FaHospital,
  FaClock,
  FaStar,
  FaRegStar,
  FaBriefcase,
  FaIdCard,
  FaCheckCircle,
  FaArrowRight,
  FaStethoscope,
} from "react-icons/fa";

import { FaBangladeshiTakaSign } from "react-icons/fa6";

import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { IoBagAddOutline } from "react-icons/io5";


export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load doctor details");
  }

  const data = await res.json();

  const doctorName = `${data.title || "Dr."} ${
    data.firstName || ""
  } ${data.lastName || ""}`;

  return (
    <main className="min-h-screen bg-base-200 pt-28 pb-16">

      <div className="mx-auto w-11/12 max-w-7xl">

        {/* =====================================================
            BREADCRUMB
        ====================================================== */}




        {/* =====================================================
            DOCTOR HERO CARD
        ====================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-xl">

          {/* Top Background */}

          <div className="absolute left-0 top-0 h-40 w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-500" />


          {/* Main Content */}

          <div className="relative px-6 pb-8 pt-24 md:px-10">

            <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">


              {/* ================= DOCTOR PROFILE ================= */}

              <div className="flex flex-col gap-6 md:flex-row md:items-center">

                {/* Doctor Image */}

                <div className="relative mx-auto shrink-0 md:mx-0">

                  <div className="absolute -inset-2 rounded-3xl bg-white/30 blur-lg" />

                  <img
                    src={data.profilePicture}
                    alt={doctorName}
                    className="relative h-56 w-56 rounded-3xl border-4 border-base-100 object-cover shadow-2xl md:h-64 md:w-64"
                  />

                  {/* Verified Badge */}

                  <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-base-content/10 bg-base-100 px-4 py-2 text-sm font-semibold text-green-600 shadow-lg">

                    <FaCheckCircle />

                    Verified

                  </div>

                </div>


                {/* Doctor Information */}

                <div className="text-center md:text-left">

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-600">

                    <FaStethoscope />

                    Healthcare Specialist

                  </div>


                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">

                    {doctorName}

                  </h1>


                  <p className="mt-2 text-lg font-semibold text-cyan-600">

                    {data.specialty || "Medical Specialist"}

                  </p>


                  {data.qualifications?.length > 0 && (

                    <p className="mt-2 text-base-content/60">

                      {data.qualifications.join(" • ")}

                    </p>

                  )}


                  {/* Hospital */}

                  <div className="mt-5 flex justify-center gap-3 md:justify-start">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">

                      <FaHospital />

                    </div>

                    <div>

                      <p className="text-xs text-base-content/50">
                        Currently Practicing At
                      </p>

                      <p className="font-semibold">

                        {data.hospitalAffiliation ||
                          "Hospital information unavailable"}

                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* ================= CONSULTATION CARD ================= */}

              <div className="w-full xl:max-w-sm">

                <div className="rounded-3xl border border-base-content/10 bg-base-200 p-6 shadow-lg">

                  <div className="mb-5">

                    <p className="text-sm font-medium text-base-content/50">
                      Consultation Fee
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-4xl font-bold text-cyan-600">

                      <FaBangladeshiTakaSign />

                      {data.Consultation_Fee || "N/A"}

                    </div>

                  </div>


                  {/* Video Call */}

                  <Link
                    href={`/video/${data.channelName}`}
                    className="btn h-14 w-full rounded-2xl border-none bg-gradient-to-r from-cyan-500 to-blue-600 text-base font-bold text-white shadow-lg transition hover:scale-[1.02] hover:from-cyan-600 hover:to-blue-700"
                  >

                    <FaVideo className="text-lg" />

                    Start Video Consultation

                  </Link>


                  {/* Appointment */}

                  <Link
                    href={`/appointments/${data._id}`}
                    className="btn btn-outline mt-3 h-14 w-full rounded-2xl border-cyan-500 text-base font-bold text-cyan-600 hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
                  >

                    <FaCalendarCheck className="text-lg" />

                    Book Appointment

                  </Link>


                  <p className="mt-4 text-center text-xs text-base-content/50">

                    Secure and private healthcare consultation

                  </p>

                </div>

              </div>

            </div>


            {/* =====================================================
                STATISTICS
            ====================================================== */}

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">


              {/* Experience */}

              <div className="rounded-2xl border border-base-content/10 bg-base-200 p-5 transition hover:-translate-y-1 hover:shadow-md">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl text-cyan-600">

                    <FaBriefcase />

                  </div>

                  <div>

                    <p className="text-sm text-base-content/50">
                      Experience
                    </p>

                    <p className="text-lg font-bold">

                      {data.yearsOfExperience || 0}+ Years

                    </p>

                  </div>

                </div>

              </div>


              {/* BMDC */}

              <div className="rounded-2xl border border-base-content/10 bg-base-200 p-5 transition hover:-translate-y-1 hover:shadow-md">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-600">

                    <FaIdCard />

                  </div>

                  <div>

                    <p className="text-sm text-base-content/50">
                      BMDC Registration
                    </p>

                    <p className="font-bold">

                      {data.licensingInfo?.licenseNumber ||
                        "Not Available"}

                    </p>

                  </div>

                </div>

              </div>


              {/* Rating */}

              <div className="rounded-2xl border border-base-content/10 bg-base-200 p-5 transition hover:-translate-y-1 hover:shadow-md">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-xl text-yellow-500">

                    <FaStar />

                  </div>

                  <div>

                    <p className="text-sm text-base-content/50">
                      Patient Rating
                    </p>

                    <div className="flex items-center gap-2">

                      <p className="text-lg font-bold">

                        {data.ratings || "New"}

                      </p>

                      <div className="flex text-yellow-500">

                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaRegStar />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK NAVIGATION
        ====================================================== */}

        <section className="my-8">

          <div className="flex flex-wrap gap-3">

            <a
              href="#about"
              className="btn btn-sm rounded-full border-base-content/10 bg-base-100"
            >
              <BsInfoCircle />

              About

            </a>


            <a
              href="#experience"
              className="btn btn-sm rounded-full border-base-content/10 bg-base-100"
            >
              <IoBagAddOutline />

              Experience

            </a>


            <a
              href="#reviews"
              className="btn btn-sm rounded-full border-base-content/10 bg-base-100"
            >
              <MdOutlineReviews />

              Reviews

            </a>

          </div>

        </section>


        {/* =====================================================
            CONTENT GRID
        ====================================================== */}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">


          {/* ================= LEFT CONTENT ================= */}

          <div className="space-y-6 lg:col-span-2">


            {/* ABOUT */}

            <article
              id="about"
              className="rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-sm md:p-8"
            >

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl text-cyan-600">

                  <BsInfoCircle />

                </div>

                <div>

                  <h2 className="text-xl font-bold">

                    About {doctorName}

                  </h2>

                  <p className="text-sm text-base-content/50">

                    Professional Background

                  </p>

                </div>

              </div>


              <p className="leading-8 text-base-content/70">

                {data.bio ||
                  "Doctor biography is currently unavailable."}

              </p>

            </article>


            {/* EXPERIENCE */}

            <article
              id="experience"
              className="rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-sm md:p-8"
            >

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-600">

                  <IoBagAddOutline />

                </div>

                <div>

                  <h2 className="text-xl font-bold">

                    Professional Experience

                  </h2>

                  <p className="text-sm text-base-content/50">

                    Medical career and expertise

                  </p>

                </div>

              </div>


              <div className="rounded-2xl bg-base-200 p-5">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <p className="text-sm text-base-content/50">
                      Total Medical Experience
                    </p>

                    <p className="mt-1 text-2xl font-bold text-cyan-600">

                      {data.yearsOfExperience || 0}+ Years

                    </p>

                  </div>


                  <FaUserMd className="text-5xl text-cyan-500/20" />

                </div>

              </div>

            </article>


            {/* REVIEWS */}

            <article
              id="reviews"
              className="rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-sm md:p-8"
            >

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-xl text-yellow-500">

                  <MdOutlineReviews />

                </div>

                <div>

                  <h2 className="text-xl font-bold">

                    Patient Reviews

                  </h2>

                  <p className="text-sm text-base-content/50">

                    Feedback from patients

                  </p>

                </div>

              </div>


              <div className="rounded-2xl border border-dashed border-base-content/20 p-8 text-center">

                <FaStar className="mx-auto text-3xl text-yellow-500" />

                <h3 className="mt-4 font-bold">
                  Reviews Coming Soon
                </h3>

                <p className="mt-2 text-sm text-base-content/60">
                  Patient reviews and feedback will appear here.
                </p>

              </div>

            </article>

          </div>


          {/* ================= RIGHT SIDEBAR ================= */}

          <aside className="space-y-6">


            {/* AVAILABILITY */}

            <div className="rounded-3xl border border-base-content/10 bg-base-100 p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600">

                  <FaClock />

                </div>

                <div>

                  <h3 className="font-bold">
                    Availability
                  </h3>

                  <p className="text-xs text-base-content/50">
                    Consultation schedule
                  </p>

                </div>

              </div>


              <div className="rounded-2xl border-l-4 border-cyan-500 bg-cyan-500/5 p-5">

                <p className="text-sm text-base-content/60">
                  Instant Consultation
                </p>

                <p className="mt-2 font-bold">

                  {data.workingHours ||
                    "Schedule not available"}

                </p>

              </div>

            </div>


            {/* QUICK CONSULTATION CTA */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 p-6 text-white shadow-xl">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">

                <FaVideo />

              </div>


              <h3 className="mt-6 text-xl font-bold">

                Need a Doctor Now?

              </h3>


              <p className="mt-2 text-sm leading-6 text-white/80">

                Connect with {doctorName} through a secure video consultation.

              </p>


              <Link
                href={`/video/${data.channelName}`}
                className="btn mt-6 w-full rounded-xl border-none bg-white font-bold text-cyan-700 hover:bg-base-200"
              >

                Start Consultation

                <FaArrowRight />

              </Link>

            </div>


            {/* SECURITY */}

            <div className="rounded-3xl border border-base-content/10 bg-base-100 p-6">

              <div className="flex gap-4">

                <FaCheckCircle className="mt-1 text-xl text-green-500" />

                <div>

                  <h4 className="font-bold">
                    Secure Healthcare
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-base-content/60">

                    Your consultation and personal information are handled securely.

                  </p>

                </div>

              </div>

            </div>

          </aside>

        </section>

      </div>

    </main>
  );
}
