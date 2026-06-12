"use client";

import React, { useState } from "react";

const features = [
  {
    title: "Instant Booking",
    desc: "Find specialists, pick a slot, confirm in seconds.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 
          00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "HD Video Call",
    desc: "Stable WebRTC calls with chat & files.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A1 1 0 0121 
          8.618v6.764a1 1 0 01-1.447.894L15 
          14M4 7h8v10H4z"
        />
      </svg>
    ),
  },
  {
    title: "e-Prescription",
    desc: "Doctor-signed PDF saved to your account.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v8m0-8l3 3m-3-3l-3 
          3M21 12a9 9 0 11-18 0 9 9 
          0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Secure by Design",
    desc: "Auth, audit logs & encrypted storage.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0-1.657 1.343-3 
          3-3s3 1.343 3 3v3a3 3 0 01-3 
          3H9a3 3 0 01-3-3v-3c0-1.657 
          1.343-3 3-3s3 1.343 3 3z"
        />
      </svg>
    ),
  },
];

export default function ServiceCard({ items = features }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openModal = (item) => {
    setActive(item);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActive(null);
  };

  const handleKeyDown = (e, item) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(item);
    }
  };

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((f, idx) => (
              <article
                key={idx}
                className="card bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm p-5 hover:shadow-lg transition-shadow duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-300"
                role="button"
                tabIndex={0}
                onClick={() => openModal(f)}
                onKeyDown={(e) => handleKeyDown(e, f)}
                aria-haspopup="dialog"
                aria-controls="feature-modal"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/60 border border-emerald-100">
                    <div className="text-emerald-700">{f.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-emerald-900">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs text-emerald-700">{f.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      <div
        id="feature-modal"
        className={`modal ${open ? "modal-open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >

        <div className="modal-box max-w-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 border border-emerald-100">
              <div className="text-emerald-700">{active?.icon}</div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-emerald-900">
                {active?.title}
              </h3>
              <p className="py-2 text-sm text-emerald-700">{active?.desc}</p>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <p>
              {active ? `More details about "${active.title}" can go here.` : null}
            </p>
          </div>

          <div className="modal-action">
            <button className="btn btn-ghost rounded-4xl" onClick={closeModal}>
              Close
            </button>
            {/* <button
              className="btn btn-emerald"
              onClick={() => {
                closeModal();
              }}
            >
              Take Action
            </button> */}
          </div>
        </div>
        <div
          className="modal-backdrop"
          onClick={closeModal}
          aria-hidden="true"
        />
      </div>
    </>
  );
}
