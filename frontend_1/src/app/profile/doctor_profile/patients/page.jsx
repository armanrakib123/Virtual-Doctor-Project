"use client"; 
import React from 'react'

export default function page() {
  return (
    <section
      id="patients"
      className="bg-base-100 p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
        <i className="fas fa-users text-primary"></i> Patient Medical Records
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr className="text-gray-700">
              <th>Patient Name</th>
              <th>ID</th>
              <th>Last Visit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>Md. Shariful Islam</td>
              <td>PID-00123</td>
              <td>15 August, 2025</td>
              <td>
                <button className="btn btn-sm btn-outline btn-primary">
                  View Record
                </button>
              </td>
            </tr>
            <tr className="hover">
              <td>Fariha Jahan</td>
              <td>PID-00124</td>
              <td>14 August, 2025</td>
              <td>
                <button className="btn btn-sm btn-outline btn-primary">
                  View Record
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  )
}
