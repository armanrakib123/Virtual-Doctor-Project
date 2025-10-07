"use client"; 
import React from 'react'

export default function page() {
  return (
    <section
  id="prescription"
  className="bg-base-100 p-6 rounded-xl shadow"
>
  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
    <i className="fas fa-file-prescription text-primary"></i>
    Create E-Prescription
  </h2>

  <form className="space-y-6">
    {/* Patient Search */}
    <div className="form-control">
      <label htmlFor="patient-search" className="label">
        <span className="label-text font-medium">Search Patient (Name or ID)</span>
      </label>
      <input
        type="text"
        id="patient-search"
        placeholder="Enter patient name..."
        className="input input-bordered w-full"
      />
    </div>

    {/* Chief Complaint */}
    <div className="form-control">
      <label htmlFor="chief-complaint" className="label">
        <span className="label-text font-medium">Chief Complaint</span>
      </label>
      <textarea
        id="chief-complaint"
        rows={3}
        className="textarea textarea-bordered w-full"
        placeholder="Describe the main complaint..."
      ></textarea>
    </div>

    {/* Medication */}
    <div className="form-control">
      <label htmlFor="medication" className="label">
        <span className="label-text font-medium">Medication</span>
      </label>
      <textarea
        id="medication"
        rows={5}
        className="textarea textarea-bordered w-full"
        placeholder="Medicine Name - Dose - Duration (e.g., Napa Extra - 1+0+1 - 7 days)"
      ></textarea>
    </div>

    {/* Digital Signature */}
    <div className="mt-8">
      <p className="text-sm font-semibold mb-2 text-gray-600">Digital Signature</p>
      <div className="border border-dashed border-gray-400 rounded-lg p-4 bg-base-200 text-sm leading-relaxed">
        Dr. Abdullah Al Mamun<br />
        MBBS, FCPS (Cardiology)<br />
        BMDC Reg No: 12345
      </div>
    </div>

    {/* Submit Button */}
    <button type="submit" className="btn btn-primary w-full mt-6">
      Submit Prescription
    </button>
  </form>
</section>

  )
}
