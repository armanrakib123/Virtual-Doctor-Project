'use client';

import { useState } from "react";
import {
    Upload,
    FileText,
    User,
    Phone,
    Calendar,
    Home,
    Mail,
    Trash2
} from "lucide-react";

export default function ProfileUpdate() {


    const handlePatientProfile = async (e) => {
        toast("Submitting Booking...");
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const email = form.email.value;
        const channelName = `appointment_${Date.now()}`;



        const bookingPayload = {
            // Session
            customerName: name,
            email,

            // User Inputs
            date,
            phone,
            address,

            // Extra information
            service_id: data._id,
            service_name: data.title,
            service_firstName: data.firstName,
            service_img: data.profilePicture,
            service_price: data.Consultation_Fee,
            channelName,
        };

        console.log(bookingPayload);

        const res = await fetch("http://localhost:3000/api/patient", {
            method: "POST",
            body: JSON.stringify(bookingPayload),
        })

    };









    const [files, setFiles] = useState([]);

    function handleFileUpload(e) {
        const uploaded = Array.from(e.target.files);
        setFiles(prev => [...prev, ...uploaded]);
    }


    function deleteFile(index) {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">Update Patient Profile</h1>

            <form onSubmit={handlePatientProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg border">

                {/* Full Name */}
                <div>
                    <label className="label"><User size={18} /> Full Name</label>
                    <input className="input" placeholder="Enter full name" />
                </div>

                {/* Email */}
                <div>
                    <label className="label"><Mail size={18} /> Email</label>
                    <input className="input" type="email" placeholder="example@gmail.com" />
                </div>

                {/* Phone */}
                <div>
                    <label className="label"><Phone size={18} /> Phone</label>
                    <input className="input" placeholder="01XXXXXXXXX" />
                </div>

                {/* DOB */}
                <div>
                    <label className="label"><Calendar size={18} /> Date of Birth</label>
                    <input className="input" type="date" />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className="label"><Home size={18} /> Address</label>
                    <input className="input" placeholder="Enter your address" />
                </div>

                {/* Medical History */}
                <div className="md:col-span-2">
                    <label className="label"><FileText size={18} /> Medical History / Description</label>
                    <textarea
                        className="input min-h-[140px]"
                        placeholder="Describe patient symptoms, allergies, chronic diseases, medications..."
                    ></textarea>
                </div>

                {/* File Upload Section */}
                <div className="md:col-span-2">
                    <label className="label"><Upload size={18} /> Upload Previous Prescription / Files</label>

                    {/* Custom Choose Files Button */}
                    <label className="choose-btn">
                        Choose Files
                        <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>

                    {/* Files Preview */}
                    {files.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="border p-3 rounded-xl bg-gray-50 shadow-sm relative"
                                >
                                    {/* File Info */}
                                    <p className="font-semibold text-sm truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {Math.round(file.size / 1024)} KB
                                    </p>

                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => deleteFile(index)}
                                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button type="submit" className="btn btn-primary btn-block mt-4">
                        Save Profile
                    </button>
                </div>

            </form>

            {/* Styles */}
            <style>{`
        .input {
          width: 100%;
          padding: 12px;
          margin-top: 4px;
          border-radius: 12px;
          border: 1px solid #ddd;
          background: #f9f9f9;
        }
        .input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
        }
        .label {
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .choose-btn {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          margin-top: 8px;
          cursor: pointer;
          transition: 0.2s;
          font-weight: 600;
        }
        .choose-btn:hover {
          background: #2563eb;
        }
      `}</style>

        </div>
    );
}
