"use client"; 
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

export default function page() {
  return (
    <div>
      <section className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt /> Appointment Management
        </h2>
        <p className="mb-4 text-gray-600">Set your online consultation schedule.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label>Select Day</label>
            <select className="select select-bordered w-full">
              <option>Saturday</option>
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>
          <div>
            <label>Start Time</label>
            <input type="time" className="input input-bordered w-full" defaultValue="10:00" />
          </div>
          <div>
            <label>End Time</label>
            <input type="time" className="input input-bordered w-full" defaultValue="12:00" />
          </div>
        </div>
        <button className="btn btn-primary mt-4">Add Schedule</button>
      </section>
    </div>
  )
}
