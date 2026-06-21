"use client";
import EPrescriptionsSection from '@/app/More/Components/Prescriptions';
import React from 'react';

export default function page() {
  return (
    <div className="mt-6">

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          E-Prescription Management
        </h1>

        <p className="text-gray-600 leading-relaxed text-[15px]">
          The E-Prescription system allows doctors to create, preview, and 
          download digitally formatted prescriptions with ease. This digital 
          solution ensures faster documentation, accurate patient data handling, 
          and a more organized medical workflow. You can add patient details, 
          diagnosis, prescribed medicines, and clinical notes — and instantly 
          generate a clean, printable PDF prescription.
        </p>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-700">📄 Create Prescription</h3>
            <p className="text-gray-600 text-sm mt-1">
              Enter patient information, diagnosis, medicines, and notes.
            </p>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <h3 className="text-lg font-semibold text-green-700">🔍 Live Preview</h3>
            <p className="text-gray-600 text-sm mt-1">
              See exactly how the final prescription will look.
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <h3 className="text-lg font-semibold text-purple-700">📥 Download as PDF</h3>
            <p className="text-gray-600 text-sm mt-1">
              Export the E-Prescription in one click.
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-[15px] mt-5 border-l-4 border-blue-500 pl-3">
          This system makes medical documentation smarter, faster, and fully digital.
        </p>
      </div>

      <EPrescriptionsSection />

    </div>
  );
}
