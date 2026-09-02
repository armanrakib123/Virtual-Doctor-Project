
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Star,
  MapPin,
  BriefcaseBusiness,
  Stethoscope,
  Video,
  CalendarDays,
  Clock,
  UserRound,
  ChevronRight,
  CircleDollarSign,
  Users,
  Award,
  CheckCircle2,
  Wifi,
  HeartPulse,
  X,
} from "lucide-react";

const MOCK_DOCTORS = [
  {
    id: 1,
    name: "Dr. Tanzina Ahmed",
    gender: "female",
    specialties: ["Gynae & Obs", "General Physician"],
    workingIn: "Dhaka Medical College And Hospital",
    experience: 7,
    rating: 5,
    reviews: 923,
    price: 320,
    onlineNow: false,
    availableNext2: false,
    availableToday: true,
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 2,
    name: "Asst. Prof. Dr. Mehedi Hasan",
    gender: "male",
    specialties: [
      "Pediatric Hematologist",
      "Oncologist",
      "General Physician",
    ],
    workingIn: "Satkhira Medical College Hospital",
    experience: 13,
    rating: 4.9,
    reviews: 381,
    price: 600,
    onlineNow: true,
    availableNext2: true,
    availableToday: true,
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: 3,
    name: "Dr. Mamunur Rashid",
    gender: "male",
    specialties: ["Orthopedist", "General Physician"],
    workingIn: "Kurmitola General Hospital, Dhaka Cantonment",
    experience: 15,
    rating: 5,
    reviews: 203,
    price: 499,
    onlineNow: false,
    availableNext2: false,
    availableToday: false,
    avatar: "https://i.pravatar.cc/300?img=5",
  },
  {
    id: 4,
    name: "Dr. Raihan Ahmad",
    gender: "male",
    specialties: ["Medicine Specialist", "Neurology"],
    workingIn: "Special Clinic, Dhaka",
    experience: 12,
    rating: 5,
    reviews: 667,
    price: 840,
    onlineNow: true,
    availableNext2: false,
    availableToday: true,
    avatar: "https://i.pravatar.cc/300?img=7",
  },
];

const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 1000,
  onlineNow: false,
  availableNext2: false,
  availableToday: false,
  femaleOnly: false,
  ratingMin: 0,
  search: "",
  sortBy: "relevance",
};

export default function DoctorDirectory() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    const low = Number(filters.priceMin) || 0;
    const high = Number(filters.priceMax) || 100000;

    return MOCK_DOCTORS.filter((doctor) => {
      if (doctor.price < low || doctor.price > high) return false;

      if (filters.onlineNow && !doctor.onlineNow) return false;

      if (
        filters.availableNext2 &&
        !doctor.availableNext2
      )
        return false;

      if (
        filters.availableToday &&
        !doctor.availableToday
      )
        return false;

      if (
        filters.femaleOnly &&
        doctor.gender !== "female"
      )
        return false;

      if (doctor.rating < filters.ratingMin)
        return false;

      if (filters.search) {
        const query = filters.search.toLowerCase();

        const inName = doctor.name
          .toLowerCase()
          .includes(query);

        const inSpecialty = doctor.specialties
          .join(" ")
          .toLowerCase()
          .includes(query);

        const inHospital = doctor.workingIn
          .toLowerCase()
          .includes(query);

        if (
          !inName &&
          !inSpecialty &&
          !inHospital
        )
          return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low-high":
          return a.price - b.price;

        case "price-high-low":
          return b.price - a.price;

        case "rating":
          return b.rating - a.rating;

        case "experience":
          return b.experience - a.experience;

        case "popularity":
          return b.reviews - a.reviews;

        case "relevance":
        default:
          return (
            b.rating - a.rating ||
            b.reviews - a.reviews
          );
      }
    });
  }, [filters]);

  const update = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/40 to-blue-50">

      {/* ================= HERO SECTION ================= */}

      <section className="border-b bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 mb-5">
              <HeartPulse size={16} />

              VirtualDoc Healthcare Network
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Find the Right Doctor
              <span className="block text-cyan-600 mt-1">
                For Your Healthcare Needs
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-8 text-slate-600">
              Connect with experienced healthcare professionals,
              compare consultation fees, check availability,
              and book your appointment with confidence.
            </p>

          </div>


          {/* ================= SEARCH ================= */}

          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-3">

            <div className="flex flex-col lg:flex-row gap-3">

              <div className="relative flex-1">

                <Search
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  placeholder="Search doctor, specialty, or hospital..."
                  value={filters.search}
                  onChange={(e) =>
                    update("search", e.target.value)
                  }
                  className="w-full rounded-2xl bg-slate-50 border border-transparent py-4 pl-12 pr-4 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />

                {filters.search && (
                  <button
                    onClick={() =>
                      update("search", "")
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                )}

              </div>

              <button
                onClick={() =>
                  setMobileFilterOpen(true)
                }
                className="lg:hidden flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-white font-semibold"
              >
                <SlidersHorizontal size={19} />

                Filters
              </button>

            </div>

          </div>


          {/* ================= STATS ================= */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">

            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <Users className="text-cyan-600 mb-2" size={22} />

              <p className="text-2xl font-bold text-slate-900">
                {MOCK_DOCTORS.length}+
              </p>

              <p className="text-sm text-slate-500">
                Available Doctors
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <Stethoscope
                className="text-blue-600 mb-2"
                size={22}
              />

              <p className="text-2xl font-bold text-slate-900">
                50+
              </p>

              <p className="text-sm text-slate-500">
                Specialties
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <Video
                className="text-purple-600 mb-2"
                size={22}
              />

              <p className="text-2xl font-bold text-slate-900">
                24/7
              </p>

              <p className="text-sm text-slate-500">
                Online Support
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-4">
              <Award
                className="text-amber-500 mb-2"
                size={22}
              />

              <p className="text-2xl font-bold text-slate-900">
                4.9/5
              </p>

              <p className="text-sm text-slate-500">
                Patient Rating
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-12 gap-8">


          {/* ================= FILTER SIDEBAR ================= */}

          <aside className="hidden lg:block col-span-3">

            <div className="sticky top-28 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">

              {/* Filter Header */}

              <div className="flex items-center justify-between p-6 border-b">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <SlidersHorizontal size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Filters
                    </h2>

                    <p className="text-xs text-slate-500">
                      Refine your search
                    </p>
                  </div>

                </div>

                <button
                  onClick={resetFilters}
                  className="text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  Reset
                </button>

              </div>


              <div className="p-6 space-y-8">


                {/* Consultation Fee */}

                <div>

                  <div className="flex items-center gap-2 mb-4">

                    <CircleDollarSign
                      size={18}
                      className="text-cyan-600"
                    />

                    <h3 className="font-semibold text-slate-800">
                      Consultation Fee
                    </h3>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    <div>
                      <label className="text-xs text-slate-500">
                        Minimum
                      </label>

                      <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) =>
                          update(
                            "priceMin",
                            e.target.value
                          )
                        }
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      />

                    </div>

                    <div>
                      <label className="text-xs text-slate-500">
                        Maximum
                      </label>

                      <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) =>
                          update(
                            "priceMax",
                            e.target.value
                          )
                        }
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      />

                    </div>

                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    Choose a budget range for your consultation.
                  </p>

                </div>


                {/* Availability */}

                <div>

                  <div className="flex items-center gap-2 mb-4">

                    <CalendarDays
                      size={18}
                      className="text-cyan-600"
                    />

                    <h3 className="font-semibold text-slate-800">
                      Availability
                    </h3>

                  </div>

                  <div className="space-y-3">

                    <FilterCheckbox
                      label="Online Now"
                      checked={filters.onlineNow}
                      onChange={(value) =>
                        update("onlineNow", value)
                      }
                    />

                    <FilterCheckbox
                      label="Available in next 2 hours"
                      checked={filters.availableNext2}
                      onChange={(value) =>
                        update("availableNext2", value)
                      }
                    />

                    <FilterCheckbox
                      label="Available Today"
                      checked={filters.availableToday}
                      onChange={(value) =>
                        update("availableToday", value)
                      }
                    />

                    <FilterCheckbox
                      label="Female Doctors Only"
                      checked={filters.femaleOnly}
                      onChange={(value) =>
                        update("femaleOnly", value)
                      }
                    />

                  </div>

                </div>


                {/* Rating */}

                <div>

                  <div className="flex items-center gap-2 mb-4">

                    <Star
                      size={18}
                      className="text-amber-500"
                    />

                    <h3 className="font-semibold text-slate-800">
                      Minimum Rating
                    </h3>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {[0, 1, 2, 3, 4, 5].map(
                      (rating) => (

                        <button
                          key={rating}
                          onClick={() =>
                            update(
                              "ratingMin",
                              rating
                            )
                          }
                          className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
                            filters.ratingMin ===
                            rating
                              ? "bg-amber-400 text-white shadow-md"
                              : "bg-slate-100 text-slate-600 hover:bg-amber-50"
                          }`}
                        >
                          {rating === 0
                            ? "All"
                            : `${rating}★+`}
                        </button>

                      )
                    )}

                  </div>

                </div>


                {/* Sort */}

                <div>

                  <h3 className="font-semibold text-slate-800 mb-4">
                    Sort Results
                  </h3>

                  <div className="space-y-3">

                    <SortRadio
                      label="Recommended"
                      value="relevance"
                      current={filters.sortBy}
                      onChange={(value) =>
                        update("sortBy", value)
                      }
                    />

                    <SortRadio
                      label="Most Popular"
                      value="popularity"
                      current={filters.sortBy}
                      onChange={(value) =>
                        update("sortBy", value)
                      }
                    />

                    <SortRadio
                      label="Lowest Fee"
                      value="price-low-high"
                      current={filters.sortBy}
                      onChange={(value) =>
                        update("sortBy", value)
                      }
                    />

                    <SortRadio
                      label="Highest Fee"
                      value="price-high-low"
                      current={filters.sortBy}
                      onChange={(value) =>
                        update("sortBy", value)
                      }
                    />

                    <SortRadio
                      label="Highest Rating"
                      value="rating"
                      current={filters.sortBy}
                      onChange={(value) =>
                        update("sortBy", value)
                      }
                    />

                    <SortRadio
                      label="Most Experienced"
                      value="experience"
                      current={filters.sortBy}
                      onChange={(value) =>
                        update("sortBy", value)
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

          </aside>


          {/* ================= RESULTS ================= */}

          <main className="col-span-12 lg:col-span-9">

            {/* Results Header */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>

                <p className="text-sm font-semibold text-cyan-600">
                  DOCTOR DIRECTORY
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Healthcare Professionals
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Showing{" "}
                  <span className="font-bold text-slate-800">
                    {filtered.length}
                  </span>{" "}
                  doctors matching your preferences.
                </p>

              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">

                <span className="font-semibold">
                  {filters.sortBy === "relevance" &&
                    "Recommended"}

                  {filters.sortBy === "popularity" &&
                    "Most Popular"}

                  {filters.sortBy === "price-low-high" &&
                    "Lowest Fee"}

                  {filters.sortBy === "price-high-low" &&
                    "Highest Fee"}

                  {filters.sortBy === "rating" &&
                    "Highest Rated"}

                  {filters.sortBy === "experience" &&
                    "Most Experienced"}
                </span>

              </div>

            </div>


            {/* Doctor Cards */}

            <div className="space-y-5">

              {filtered.map((doctor) => (

                <article
                  key={doctor.id}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">


                    {/* Doctor Image */}

                    <div className="relative shrink-0">

                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-slate-50 shadow-md"
                      />

                      {doctor.onlineNow && (
                        <div className="absolute -right-1 -bottom-1 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 border-4 border-white">

                          <Wifi
                            size={13}
                            className="text-white"
                          />

                        </div>
                      )}

                    </div>


                    {/* Doctor Information */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                              {doctor.name}
                            </h3>

                            {doctor.onlineNow && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

                                Online Now
                              </span>
                            )}

                          </div>


                          {/* Specialty */}

                          <div className="flex flex-wrap gap-2 mt-3">

                            {doctor.specialties
                              .slice(0, 3)
                              .map((specialty) => (

                                <span
                                  key={specialty}
                                  className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700"
                                >
                                  {specialty}
                                </span>

                              ))}

                          </div>

                        </div>

                      </div>


                      {/* Hospital */}

                      <div className="flex items-start gap-2 mt-4 text-sm text-slate-600">

                        <MapPin
                          size={17}
                          className="text-slate-400 mt-0.5 shrink-0"
                        />

                        <span>
                          Working at{" "}

                          <strong className="text-slate-800">
                            {doctor.workingIn}
                          </strong>
                        </span>

                      </div>


                      {/* Statistics */}

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-5">

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <BriefcaseBusiness
                            size={17}
                            className="text-cyan-600"
                          />

                          <span>
                            <strong className="text-slate-900">
                              {doctor.experience}+
                            </strong>{" "}
                            Years Experience
                          </span>

                        </div>


                        <div className="flex items-center gap-2 text-sm">

                          <div className="flex items-center">

                            {Array.from({
                              length: 5,
                            }).map((_, index) => (

                              <Star
                                key={index}
                                size={16}
                                className={
                                  index <
                                  Math.round(
                                    doctor.rating
                                  )
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-200"
                                }
                              />

                            ))}

                          </div>

                          <strong className="text-slate-900">
                            {doctor.rating}
                          </strong>

                          <span className="text-slate-400">
                            ({doctor.reviews} reviews)
                          </span>

                        </div>

                      </div>


                      {/* Availability */}

                      <div className="flex flex-wrap gap-2 mt-5">

                        {doctor.availableToday && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">

                            <CalendarDays size={14} />

                            Available Today

                          </span>
                        )}

                        {doctor.availableNext2 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">

                            <Clock size={14} />

                            Available in 2 Hours

                          </span>
                        )}

                        {doctor.onlineNow && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">

                            <Video size={14} />

                            Video Consultation

                          </span>
                        )}

                      </div>

                    </div>


                    {/* Price + Actions */}

                    <div className="lg:w-48 lg:border-l lg:border-slate-200 lg:pl-6 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4">

                      <div className="text-left lg:text-right">

                        <p className="text-xs text-slate-400 mb-1">
                          Consultation Fee
                        </p>

                        <div className="text-3xl font-bold text-slate-900">
                          ৳ {doctor.price}
                        </div>

                        <p className="text-xs text-slate-400 mt-1">
                          Per consultation
                        </p>

                      </div>


                      <div className="flex flex-col gap-2 w-full">

                        <Link
                          href={`/doctor_details/${doctor.id}`}
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700"
                        >
                          View Profile

                          <ChevronRight size={17} />

                        </Link>

                        {doctor.onlineNow && (
                          <Link
                            href={`/room/doctor_${doctor.id}`}
                            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition hover:scale-[1.02]"
                          >
                            <Video size={17} />

                            Consult Now
                          </Link>
                        )}

                      </div>

                    </div>

                  </div>

                </article>

              ))}


              {/* Empty State */}

              {filtered.length === 0 && (

                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">

                  <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">

                    <UserRound size={30} />

                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-800">
                    No Doctors Found
                  </h3>

                  <p className="mt-2 text-slate-500">
                    We couldn't find any doctors matching your
                    current filters.
                  </p>

                  <button
                    onClick={resetFilters}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <RotateCcw size={17} />

                    Reset All Filters
                  </button>

                </div>

              )}

            </div>

          </main>

        </div>

      </div>


      {/* ================= MOBILE FILTER MODAL ================= */}

      {mobileFilterOpen && (

        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            onClick={() =>
              setMobileFilterOpen(false)
            }
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                  <SlidersHorizontal size={20} />
                </div>

                <h2 className="text-xl font-bold">
                  Filters
                </h2>

              </div>

              <button
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>

            </div>


            <div className="space-y-6">

              <div>

                <h3 className="font-semibold mb-3">
                  Consultation Fee
                </h3>

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="number"
                    placeholder="Minimum"
                    value={filters.priceMin}
                    onChange={(e) =>
                      update(
                        "priceMin",
                        e.target.value
                      )
                    }
                    className="rounded-xl border p-3"
                  />

                  <input
                    type="number"
                    placeholder="Maximum"
                    value={filters.priceMax}
                    onChange={(e) =>
                      update(
                        "priceMax",
                        e.target.value
                      )
                    }
                    className="rounded-xl border p-3"
                  />

                </div>

              </div>


              <div>

                <h3 className="font-semibold mb-3">
                  Availability
                </h3>

                <div className="space-y-3">

                  <FilterCheckbox
                    label="Online Now"
                    checked={filters.onlineNow}
                    onChange={(value) =>
                      update("onlineNow", value)
                    }
                  />

                  <FilterCheckbox
                    label="Available Today"
                    checked={filters.availableToday}
                    onChange={(value) =>
                      update(
                        "availableToday",
                        value
                      )
                    }
                  />

                  <FilterCheckbox
                    label="Female Doctors Only"
                    checked={filters.femaleOnly}
                    onChange={(value) =>
                      update(
                        "femaleOnly",
                        value
                      )
                    }
                  />

                </div>

              </div>


              <button
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-4 font-bold text-white"
              >
                Apply Filters
              </button>

              <button
                onClick={resetFilters}
                className="w-full rounded-xl border border-slate-200 py-4 font-bold text-slate-600"
              >
                Reset Filters
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* ================= REUSABLE COMPONENTS ================= */


function FilterCheckbox({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between rounded-xl border border-transparent px-3 py-2 transition hover:bg-slate-50">

      <span className="text-sm font-medium text-slate-600">
        {label}
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
        className="checkbox checkbox-sm checkbox-info"
      />

    </label>
  );
}


function SortRadio({
  label,
  value,
  current,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">

      <input
        type="radio"
        name="sort"
        checked={current === value}
        onChange={() => onChange(value)}
        className="radio radio-sm radio-info"
      />

      <span
        className={`text-sm ${
          current === value
            ? "font-semibold text-cyan-700"
            : "text-slate-600"
        }`}
      >
        {label}
      </span>

    </label>
  );
}

