"use client";
import EPrescriptionsSection from '@/app/More/Components/Prescriptions';
import React from 'react';

export default function page() {
  return (
    <div className="mt-6">

      <div className="bg-base-100 border border-base-content/10 shadow-md rounded-2xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-base-content mb-3">
          E-Prescription Management
        </h1>

        <p className="text-base-content/80 leading-relaxed text-[15px]">
          The E-Prescription system allows doctors to create, preview, and 
          download digitally formatted prescriptions with ease. This digital 
          solution ensures faster documentation, accurate patient data handling, 
          and a more organized medical workflow. You can add patient details, 
          diagnosis, prescribed medicines, and clinical notes — and instantly 
          generate a clean, printable PDF prescription.
        </p>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-base-200 border border-base-content/10 rounded-xl">
            <h3 className="text-lg font-semibold text-cyan-600">📄 Create Prescription</h3>
            <p className="text-base-content/70 text-sm mt-1">
              Enter patient information, diagnosis, medicines, and notes.
            </p>
          </div>

          <div className="p-4 bg-base-200 border border-base-content/10 rounded-xl">
            <h3 className="text-lg font-semibold text-emerald-500">🔍 Live Preview</h3>
            <p className="text-base-content/70 text-sm mt-1">
              See exactly how the final prescription will look.
            </p>
          </div>

          <div className="p-4 bg-base-200 border border-base-content/10 rounded-xl">
            <h3 className="text-lg font-semibold text-indigo-400">📥 Download as PDF</h3>
            <p className="text-base-content/70 text-sm mt-1">
              Export the E-Prescription in one click.
            </p>
          </div>
        </div>

        <p className="text-base-content/80 text-[15px] mt-5 border-l-4 border-cyan-500 pl-3">
          This system makes medical documentation smarter, faster, and fully digital.
        </p>
      </div>

      <EPrescriptionsSection />

    </div>
  );
}
