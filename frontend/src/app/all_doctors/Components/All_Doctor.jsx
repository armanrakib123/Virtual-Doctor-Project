"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
Search,
SlidersHorizontal,
RotateCcw,
Star,
MapPin,
BriefcaseMedical,
CircleDollarSign,
ChevronLeft,
ChevronRight,
UserRound,
Clock3,
BadgeCheck,
Stethoscope,
X,
ArrowUpDown,
} from "lucide-react";

const DEFAULT_FILTERS = {
priceMin: 0,
priceMax: 2000,
gender: "",
specialty: "",
experienceMin: 0,
ratingMin: 0,
onlineNow: false,
availableToday: false,
search: "",
sortBy: "relevance",
};

const ITEMS_PER_PAGE = 8;

export default function DoctorDirectory({ doctors = [] }) {
const [filters, setFilters] = useState(DEFAULT_FILTERS);
const [page, setPage] = useState(1);
const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

// ===============================
// UNIQUE SPECIALTIES
// ===============================
const specialties = useMemo(() => {
return [
...new Set(
doctors
.map((doctor) => doctor.specialty)
.filter(Boolean)
),
].sort();
}, [doctors]);

// ===============================
// UPDATE FILTER
// ===============================
function update(key, value) {
setFilters((prev) => ({
...prev,
[key]: value,
}));


setPage(1);


}

// ===============================
// RESET FILTERS
// ===============================
function resetFilters() {
setFilters(DEFAULT_FILTERS);
setPage(1);
}

// ===============================
// FILTER + SORT LOGIC
// ===============================
const filteredDoctors = useMemo(() => {
const priceMin = Number(filters.priceMin) || 0;
const priceMax = Number(filters.priceMax) || Infinity;
const experienceMin = Number(filters.experienceMin) || 0;


return doctors
  .filter((doctor) => {
    const consultationFee =
      Number(doctor.Consultation_Fee) || 0;

    const experience =
      Number(doctor.yearsOfExperience) || 0;

    const rating =
      Number(doctor.ratings) || 0;

    // Price
    if (consultationFee < priceMin) return false;
    if (consultationFee > priceMax) return false;

    // Gender
    if (
      filters.gender &&
      doctor.gender?.toLowerCase() !==
        filters.gender.toLowerCase()
    ) {
      return false;
    }

    // Specialty
    if (
      filters.specialty &&
      doctor.specialty !== filters.specialty
    ) {
      return false;
    }

    // Experience
    if (experience < experienceMin) return false;

    // Rating
    if (rating < filters.ratingMin) return false;

    // Online Now
    if (filters.onlineNow && !doctor.onlineNow) {
      return false;
    }

    // Available Today
    if (
      filters.availableToday &&
      !doctor.availableToday
    ) {
      return false;
    }

    // Search
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();

      const fullName =
        `${doctor.title || ""} ${
          doctor.firstName || ""
        } ${doctor.lastName || ""}`.toLowerCase();

      const specialty =
        doctor.specialty?.toLowerCase() || "";

      const hospital =
        doctor.hospitalAffiliation?.toLowerCase() || "";

      if (
        !fullName.includes(query) &&
        !specialty.includes(query) &&
        !hospital.includes(query)
      ) {
        return false;
      }
    }

    return true;
  })
  .sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low-high":
        return (
          (Number(a.Consultation_Fee) || 0) -
          (Number(b.Consultation_Fee) || 0)
        );

      case "price-high-low":
        return (
          (Number(b.Consultation_Fee) || 0) -
          (Number(a.Consultation_Fee) || 0)
        );

      case "rating":
        return (
          (Number(b.ratings) || 0) -
          (Number(a.ratings) || 0)
        );

      case "experience":
        return (
          (Number(b.yearsOfExperience) || 0) -
          (Number(a.yearsOfExperience) || 0)
        );

      case "relevance":
      default:
        return (
          (Number(b.ratings) || 0) -
            (Number(a.ratings) || 0) ||
          (Number(b.yearsOfExperience) || 0) -
            (Number(a.yearsOfExperience) || 0)
        );
    }
  });


}, [doctors, filters]);

// ===============================
// PAGINATION
// ===============================
const totalPages = Math.max(
1,
Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE)
);

const paginatedDoctors = filteredDoctors.slice(
(page - 1) * ITEMS_PER_PAGE,
page * ITEMS_PER_PAGE
);

function goToPage(nextPage) {
if (nextPage >= 1 && nextPage <= totalPages) {
setPage(nextPage);


  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


}

// ===============================
// PAGINATION NUMBERS
// ===============================
const pageNumbers = useMemo(() => {
const pages = [];


if (totalPages <= 5) {
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
} else {
  if (page <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPages);
  } else if (page >= totalPages - 2) {
    pages.push(
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pages.push(
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      totalPages
    );
  }
}

return pages;


}, [page, totalPages]);

// ===============================
// FILTER SIDEBAR
// ===============================
const FilterContent = () => ( <div className="space-y-7">

```
  {/* Filter Header */}
  <div className="flex items-center justify-between border-b border-slate-100 pb-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
        <SlidersHorizontal size={19} />
      </div>

      <div>
        <h2 className="font-bold text-slate-900">
          Filters
        </h2>

        <p className="text-xs text-slate-500">
          Find your ideal doctor
        </p>
      </div>
    </div>

    <button
      onClick={resetFilters}
      className="flex items-center gap-1.5 text-sm font-medium text-cyan-600 transition hover:text-cyan-700"
    >
      <RotateCcw size={15} />
      Reset
    </button>
  </div>

  {/* Consultation Fee */}
  <div>
    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
      <CircleDollarSign size={16} className="text-cyan-600" />
      Consultation Fee
    </label>

    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="mb-1.5 text-xs text-slate-500">
          Minimum
        </p>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ৳
          </span>

          <input
            type="number"
            min="0"
            value={filters.priceMin}
            onChange={(e) =>
              update("priceMin", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-7 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
          />
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs text-slate-500">
          Maximum
        </p>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ৳
          </span>

          <input
            type="number"
            min="0"
            value={filters.priceMax}
            onChange={(e) =>
              update("priceMax", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-7 pr-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Specialty */}
  <div>
    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
      <Stethoscope size={16} className="text-cyan-600" />
      Specialty
    </label>

    <select
      value={filters.specialty}
      onChange={(e) =>
        update("specialty", e.target.value)
      }
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
    >
      <option value="">All Specialties</option>

      {specialties.map((specialty) => (
        <option
          key={specialty}
          value={specialty}
        >
          {specialty}
        </option>
      ))}
    </select>
  </div>

  {/* Gender */}
  <div>
    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
      <UserRound size={16} className="text-cyan-600" />
      Doctor Gender
    </label>

    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "All", value: "" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ].map((item) => (
        <button
          key={item.label}
          onClick={() =>
            update("gender", item.value)
          }
          className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
            filters.gender === item.value
              ? "border-cyan-600 bg-cyan-600 text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>

  {/* Experience */}
  <div>
    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
      <BriefcaseMedical
        size={16}
        className="text-cyan-600"
      />
      Minimum Experience
    </label>

    <div className="relative">
      <input
        type="number"
        min="0"
        value={filters.experienceMin}
        onChange={(e) =>
          update(
            "experienceMin",
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
      />

      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
        Years
      </span>
    </div>
  </div>

  {/* Rating */}
  <div>
    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
      <Star size={16} className="text-amber-500" />
      Minimum Rating
    </label>

    <div className="flex flex-wrap gap-2">
      {[0, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() =>
            update("ratingMin", rating)
          }
          className={`flex items-center gap-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
            filters.ratingMin === rating
              ? "border-amber-400 bg-amber-50 text-amber-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"
          }`}
        >
          {rating === 0 ? (
            "Any"
          ) : (
            <>
              {rating}
              <Star
                size={13}
                fill="currentColor"
              />
              +
            </>
          )}
        </button>
      ))}
    </div>
  </div>

  {/* Availability */}
  <div className="border-t border-slate-100 pt-5">
    <p className="mb-3 text-sm font-semibold text-slate-800">
      Availability
    </p>

    <div className="space-y-3">

      <label className="flex cursor-pointer items-center justify-between">
        <span className="flex items-center gap-3 text-sm text-slate-600">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          Online Now
        </span>

        <input
          type="checkbox"
          checked={filters.onlineNow}
          onChange={(e) =>
            update(
              "onlineNow",
              e.target.checked
            )
          }
          className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
        />
      </label>

      <label className="flex cursor-pointer items-center justify-between">
        <span className="flex items-center gap-3 text-sm text-slate-600">
          <Clock3
            size={16}
            className="text-cyan-600"
          />

          Available Today
        </span>

        <input
          type="checkbox"
          checked={filters.availableToday}
          onChange={(e) =>
            update(
              "availableToday",
              e.target.checked
            )
          }
          className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
        />
      </label>

    </div>
  </div>
</div>

);

return ( <div className="min-h-screen bg-slate-50">

  {/* ================= HERO HEADER ================= */}
  <section className="border-b border-slate-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-lg shadow-cyan-600/20">
              <Stethoscope size={20} />
            </div>

            <span className="text-sm font-semibold tracking-wide text-cyan-600">
              VIRTUALDOC HEALTHCARE
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find the Right Doctor
            <span className="text-cyan-600">
              {" "}for Your Health
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Discover experienced healthcare professionals and
            book secure online consultations with VirtualDoc.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-cyan-600 shadow-sm">
            <UserRound size={19} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Healthcare Professionals
            </p>

            <p className="text-xl font-bold text-slate-900">
              {doctors.length}+
            </p>
          </div>
        </div>

      </div>

      {/* SEARCH */}
      <div className="mt-8">
        <div className="relative max-w-4xl">

          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={21}
          />

          <input
            type="search"
            placeholder="Search doctors, specialties or hospitals..."
            value={filters.search}
            onChange={(e) =>
              update("search", e.target.value)
            }
            className="h-15 w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-12 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
          />

          {filters.search && (
            <button
              onClick={() =>
                update("search", "")
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}

        </div>
      </div>

    </div>
  </section>

  {/* ================= MAIN CONTENT ================= */}
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

    <div className="grid grid-cols-12 gap-7">

      {/* ================= DESKTOP FILTER ================= */}
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <FilterContent />
        </div>
      </aside>

      {/* ================= RESULTS ================= */}
      <main className="col-span-12 lg:col-span-9">

        {/* MOBILE FILTER */}
        <div className="mb-5 flex lg:hidden">
          <button
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* RESULTS HEADER */}
        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-lg font-bold text-slate-900">
              Available Doctors
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-cyan-600">
                {filteredDoctors.length}
              </span>{" "}
              healthcare professionals
            </p>
          </div>

          <div className="flex items-center gap-3">

            <ArrowUpDown
              size={17}
              className="text-slate-400"
            />

            <select
              value={filters.sortBy}
              onChange={(e) =>
                update("sortBy", e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 outline-none focus:border-cyan-500"
            >
              <option value="relevance">
                Sort: Recommended
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="experience">
                Most Experienced
              </option>

              <option value="price-low-high">
                Fee: Low to High
              </option>

              <option value="price-high-low">
                Fee: High to Low
              </option>
            </select>

          </div>

        </div>

        {/* ================= DOCTOR CARDS ================= */}
        <div className="space-y-5">

          {paginatedDoctors.map((doctor) => {
            const fullName =
              `${doctor.title || ""} ${
                doctor.firstName || ""
              } ${doctor.lastName || ""}`.trim();

            const rating =
              Number(doctor.ratings) || 0;

            const experience =
              Number(
                doctor.yearsOfExperience
              ) || 0;

            return (
              <article
                key={doctor._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-slate-200/60"
              >

                {/* TOP ACCENT */}
                <div className="absolute left-0 top-0 h-full w-1 bg-transparent transition group-hover:bg-cyan-500" />

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  {/* DOCTOR INFO */}
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* IMAGE */}
                    <div className="relative shrink-0">

                      <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-white bg-slate-100 shadow-md">

                        {doctor.profilePicture ? (
                          <Image
                            src={
                              doctor.profilePicture
                            }
                            alt={fullName}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
                            <UserRound
                              size={34}
                              className="text-cyan-500"
                            />
                          </div>
                        )}

                      </div>

                      {/* ONLINE BADGE */}
                      {doctor.onlineNow && (
                        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500">
                          <span className="h-2 w-2 rounded-full bg-white" />
                        </span>
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-xl font-bold text-slate-900">
                          {fullName ||
                            "Doctor Name"}
                        </h2>

                        {doctor.isVerified && (
                          <BadgeCheck
                            size={19}
                            className="text-cyan-600"
                          />
                        )}

                      </div>

                      <p className="mt-1 font-medium text-cyan-600">
                        {doctor.specialty ||
                          "Medical Specialist"}
                      </p>

                      {/* HOSPITAL */}
                      {doctor.hospitalAffiliation && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-slate-400"
                          />

                          <span>
                            {doctor.hospitalAffiliation}
                          </span>
                        </div>
                      )}

                      {/* STATS */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">

                        <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                          <BriefcaseMedical
                            size={15}
                            className="text-cyan-600"
                          />

                          {experience}+ Years
                        </div>

                        <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                          <Star
                            size={15}
                            fill="currentColor"
                          />

                          {rating > 0
                            ? rating.toFixed(1)
                            : "New"}
                        </div>

                        {doctor.availableToday && (
                          <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                            <Clock3 size={14} />
                            Available Today
                          </div>
                        )}

                      </div>

                    </div>

                  </div>

                  {/* PRICE + ACTION */}
                  <div className="flex shrink-0 flex-row items-center justify-between gap-5 border-t border-slate-100 pt-5 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">

                    <div className="text-right">

                      <p className="text-xs text-slate-400">
                        Consultation Fee
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        ৳{" "}
                        {doctor.Consultation_Fee ||
                          0}
                      </p>

                      <p className="text-xs text-slate-400">
                        Per consultation
                      </p>

                    </div>

                    <Link
                      href={`/doctor_details/${doctor._id}`}
                      className="inline-flex"
                    >
                      <button className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:scale-[1.02] hover:shadow-cyan-600/30 active:scale-[0.98]">
                        View Profile
                        <span className="ml-2">→</span>
                      </button>
                    </Link>

                  </div>

                </div>

              </article>
            );
          })}

          {/* EMPTY STATE */}
          {paginatedDoctors.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                No Doctors Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                We couldn't find doctors matching your
                current filters. Try adjusting your search
                criteria.
              </p>

              <button
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Reset All Filters
              </button>

            </div>
          )}

        </div>

        {/* ================= PAGINATION ================= */}
        {filteredDoctors.length > 0 &&
          totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

              {/* PREVIOUS */}
              <button
                onClick={() =>
                  goToPage(page - 1)
                }
                disabled={page === 1}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-cyan-300 hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              {/* PAGE NUMBERS */}
              <div className="flex items-center gap-2">

                {pageNumbers.map(
                  (pageNumber, index) =>
                    pageNumber === "..." ? (
                      <span
                        key={`${pageNumber}-${index}`}
                        className="px-2 text-slate-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNumber}
                        onClick={() =>
                          goToPage(pageNumber)
                        }
                        className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                          page === pageNumber
                            ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/25"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                )}

              </div>

              {/* NEXT */}
              <button
                onClick={() =>
                  goToPage(page + 1)
                }
                disabled={
                  page === totalPages
                }
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-cyan-300 hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={17} />
              </button>

            </div>
          )}

      </main>

    </div>

  </div>

  {/* ================= MOBILE FILTER DRAWER ================= */}
  {mobileFiltersOpen && (
    <div className="fixed inset-0 z-[100] lg:hidden">

      {/* BACKDROP */}
      <button
        aria-label="Close filters"
        onClick={() =>
          setMobileFiltersOpen(false)
        }
        className="absolute inset-0 h-full w-full bg-slate-950/50 backdrop-blur-sm"
      />

      {/* DRAWER */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Search Filters
            </h2>

            <p className="text-sm text-slate-500">
              Customize your doctor search
            </p>
          </div>

          <button
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="rounded-xl bg-slate-100 p-2 text-slate-600"
          >
            <X size={20} />
          </button>

        </div>

        <FilterContent />

        <button
          onClick={() =>
            setMobileFiltersOpen(false)
          }
          className="mt-8 w-full rounded-xl bg-cyan-600 py-3.5 font-semibold text-white shadow-lg shadow-cyan-600/20"
        >
          Show {filteredDoctors.length} Doctors
        </button>

      </div>

    </div>
  )}

</div>

);
}
