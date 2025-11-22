


"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";

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

const ITEMS_PER_PAGE = 8; // SHOW 8 DOCTORS PER PAGE

export default function DoctorDirectory({ doctors }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const specialties = [
    ...new Set(doctors.flatMap((d) => (d.specialty ? [d.specialty] : []))),
  ];

  function update(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // reset to page 1 when filters change
  }

  // =================== FILTER LOGIC ===================
  const filtered = useMemo(() => {
    return doctors
      .filter((d) => {
        if (d.Consultation_Fee < filters.priceMin) return false;
        if (d.Consultation_Fee > filters.priceMax) return false;

        if (filters.gender && d.gender !== filters.gender) return false;

        if (filters.specialty && d.specialty !== filters.specialty) return false;

        if (d.yearsOfExperience < filters.experienceMin) return false;

        if (d.ratings < filters.ratingMin) return false;

        if (filters.onlineNow && !d.onlineNow) return false;
        if (filters.availableToday && !d.availableToday) return false;

        if (filters.search) {
          const q = filters.search.toLowerCase();
          const name = `${d.title} ${d.firstName} ${d.lastName}`.toLowerCase();
          const specialty = d.specialty?.toLowerCase() || "";
          const workplace = d.hospitalAffiliation?.toLowerCase() || "";
          if (
            !name.includes(q) &&
            !specialty.includes(q) &&
            !workplace.includes(q)
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low-high":
            return a.Consultation_Fee - b.Consultation_Fee;
          case "price-high-low":
            return b.Consultation_Fee - a.Consultation_Fee;
          case "rating":
            return b.ratings - a.ratings;
          case "experience":
            return b.yearsOfExperience - a.yearsOfExperience;
          default:
            return b.ratings - a.ratings;
        }
      });
  }, [filters, doctors]);

  // =================== PAGINATION LOGIC ===================
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedDoctors = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function goToPage(p) {
    if (p >= 1 && p <= totalPages) setPage(p);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* =================== LEFT FILTER SIDEBAR =================== */}
        <aside className="col-span-12 lg:col-span-3 bg-white p-5 rounded-2xl shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <button
              className="text-blue-600 text-sm"
              onClick={() => {
                setFilters(DEFAULT_FILTERS);
                setPage(1);
              }}
            >
              {/* Reset */}
            </button>
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="font-medium">Consultation Fee (৳)</label>
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                value={filters.priceMin}
                onChange={(e) => update("priceMin", e.target.value)}
              />
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                value={filters.priceMax}
                onChange={(e) => update("priceMax", e.target.value)}
              />
            </div>
          </div>

          {/* Gender */}
          {/* <div className="mb-5">
            <label className="font-medium">Gender</label>
            <select
              className="w-full mt-2 p-2 border rounded"
              value={filters.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div> */}

          {/* Specialty */}
          <div className="mb-5">
            <label className="font-medium">Specialty</label>
            <select
              className="w-full mt-2 p-2 border rounded"
              value={filters.specialty}
              onChange={(e) => update("specialty", e.target.value)}
            >
              <option value="">All</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <label className="font-medium">Minimum Experience (Years)</label>
            <input
              type="number"
              className="w-full mt-2 p-2 border rounded"
              value={filters.experienceMin}
              onChange={(e) => update("experienceMin", e.target.value)}
            />
          </div>

          {/* Rating */}
          <div className="mb-5">
            <label className="font-medium">Rating</label>
            <div className="flex gap-2 mt-2">
              {[2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  className={`px-2 py-1 rounded border ${
                    filters.ratingMin === r
                      ? "bg-blue-100 border-blue-400"
                      : ""
                  }`}
                  onClick={() => update("ratingMin", r)}
                >
                  {r}★+
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={filters.onlineNow}
                onChange={(e) => update("onlineNow", e.target.checked)}
              />
              Online Now
            </label>

            <label className="flex gap-2">
              <input
                type="checkbox"
                checked={filters.availableToday}
                onChange={(e) => update("availableToday", e.target.checked)}
              />
              Available Today
            </label>
          </div>
        </aside>

        {/* =================== DOCTOR LIST =================== */}
        <main className="col-span-12 lg:col-span-9">
          {/* Search */}
          <div className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between">
            <div className="text-gray-600">
              {filtered.length} doctors found
            </div>

            <input
              type="search"
              placeholder="Search by name, specialty or hospital"
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              className="p-2 border rounded w-72"
            />
          </div>

          {/* Doctor Cards */}
          <div className="space-y-4">
            {paginatedDoctors.map((doc) => (
              <article
                key={doc._id}
                className="bg-white p-4 rounded-xl shadow flex justify-between"
              >
                <div className="flex gap-4">
                  <img
                    className="w-20 h-20 rounded object-cover border"
                    src={doc.profilePicture}
                  />
                  <div>
                    <h2 className="font-semibold text-lg">
                      {doc.title} {doc.firstName} {doc.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{doc.specialty}</p>
                    <p className="text-sm text-gray-600">
                      Working in{" "}
                      <strong>{doc.hospitalAffiliation}</strong>
                    </p>
                    <div className="text-sm mt-1 text-gray-500">
                      {doc.yearsOfExperience}+ years • ⭐ {doc.ratings}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">৳ {doc.Consultation_Fee}</p>
                  <Link href={`/doctor_details/${doc._id}`}>
                    <button className="mt-2 px-4 py-2 border rounded hover:bg-gray-50">
                      View Profile →
                    </button>
                  </Link>
                </div>
              </article>
            ))}

            {paginatedDoctors.length === 0 && (
              <div className="bg-white p-6 rounded text-center text-gray-500">
                No doctors match your filters.
              </div>
            )}
          </div>

          {/* =================== PAGINATION =================== */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
