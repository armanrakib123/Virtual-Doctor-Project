"use client"; 
import React from 'react'

export default function page() {
  return (
    <section
      id="payments"
      className="bg-base-100 p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <i className="fas fa-money-bill-wave text-primary"></i>
        Payment Management
      </h2>

      {/* Total Income Card */}
      <div className="flex items-center gap-4 bg-base-200 p-4 rounded-lg mb-6 shadow-sm">
        <div className="text-3xl text-primary">
          <i className="fas fa-wallet"></i>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-600">Total Income (This Month)</h4>
          <span className="text-2xl font-bold text-success">৳ 65,200</span>
        </div>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="text-gray-700">
              <th>Date</th>
              <th>Patient Name</th>
              <th>Fee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>29 August, 2025</td>
              <td>Md. Shariful Islam</td>
              <td>৳ 800</td>
              <td>
                <span className="badge badge-success badge-outline">Paid</span>
              </td>
            </tr>
            <tr className="hover">
              <td>28 August, 2025</td>
              <td>Fariha Jahan</td>
              <td>৳ 800</td>
              <td>
                <span className="badge badge-success badge-outline">Paid</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  )
}
