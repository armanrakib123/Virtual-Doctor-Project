"use client"
import React from 'react'
import { FaUserMd } from 'react-icons/fa'

export default function page() {
  return (
    <div>
      <section className="bg-base-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <FaUserMd /> প্রোফাইল ম্যানেজমেন্ট
            </h2>
            <form className="space-y-4">
              <div>
                <label className="font-semibold">Name</label>
                <input className="input input-bordered w-full" defaultValue="" />
              </div>
              <div>
                <label className="font-semibold">ডিগ্রি</label>
                <input className="input input-bordered w-full" defaultValue="" />
              </div>
              <div>
                <label className="font-semibold">অভিজ্ঞতা</label>
                <input className="input input-bordered w-full" defaultValue="" />
              </div>
              <div>
                <label className="font-semibold">চেম্বারের তথ্য</label>
                <textarea className="textarea textarea-bordered w-full">
                  
                </textarea>
              </div>
              <button className="btn btn-primary">Update profile</button>
            </form>
          </section>
    </div>
  )
}
