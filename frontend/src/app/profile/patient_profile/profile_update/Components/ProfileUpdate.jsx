
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
import toast from "react-hot-toast"; 

export default function ProfileUpdate({ serviceData = {} }) {
  const data = serviceData || {};

  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const MAX_FILE_BYTES = 2 * 1024 * 1024;   
  const MAX_TOTAL_BYTES = 3 * 1024 * 1024;   

  function handleFileUpload(e) {
    const uploaded = Array.from(e.target.files || []);

    const allowed = uploaded.filter(f =>
      [".pdf", ".jpg", ".jpeg", ".png"].some(ext => f.name.toLowerCase().endsWith(ext))
    );

    const tooBig = allowed.filter(f => f.size > MAX_FILE_BYTES);
    if (tooBig.length) {
      toast.error(`${tooBig.map(f => f.name).join(", ")} is too large (max ${Math.round(MAX_FILE_BYTES/1024/1024)}MB).`);
    }

    const permitted = allowed.filter(f => f.size <= MAX_FILE_BYTES);

    const existingTotal = files.reduce((s, f) => s + f.size, 0);
    const newTotal = permitted.reduce((s, f) => s + f.size, 0);
    if (existingTotal + newTotal > MAX_TOTAL_BYTES) {
      toast.error(`Total file size ${Math.round((existingTotal + newTotal)/1024)} KB exceeds the limit (${Math.round(MAX_TOTAL_BYTES/1024)} KB).`);
      return;
    }

    setFiles(prev => [...prev, ...permitted]);
  }

  function deleteFile(index) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  const handlePatientProfile = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const form = e.target;
      const name = form.name?.value?.trim() || "";
      const dateOfBirth = form.date?.value || "";
      const phone = form.phone?.value?.trim() || "";
      const address = form.address?.value?.trim() || "";
      const email = form.email?.value?.trim() || "";
      const medicalHistory = form.medicalHistory?.value?.trim() || "";

      const totalBytes = files.reduce((s, f) => s + f.size, 0);
      if (totalBytes > MAX_TOTAL_BYTES) {
        toast.error("Files are too large — please upload smaller files.");
        setSubmitting(false);
        return;
      }

      const attachments = [];
      for (const f of files) {
        try {
          const dataUrl = await fileToDataUrl(f);
          attachments.push({
            name: f.name,
            size: f.size,
            type: f.type,
            dataUrl,
          });
        } catch (err) {
          console.warn("Failed to convert file:", f.name, err);
        }
      }

      const channelName = `appointment_${Date.now()}`;

      const bookingPayload = {
        customerName: name,
        email,
        dateOfBirth,
        phone,
        address,
        medicalHistory,
        service_id: data._id || data.id || null,
        service_name: data.title || data.service_name || null,
        service_firstName: data.firstName || null,
        service_img: data.profilePicture || null,
        service_price: data.Consultation_Fee || data.price || null,
        channelName,
        attachments,
        createdAt: new Date().toISOString(),
      };


      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const resJson = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message = resJson?.error || resJson?.message || `Server ${res.status}`;
        toast.error("Save failed: " + message);
        setSubmitting(false);
        return;
      }

      if (resJson.success) {
        toast.success("Patient profile saved successfully!");
        form.reset();
        setFiles([]);
      } else {
        const message = resJson?.error || resJson?.message || "Unknown error";
        toast.error("Error: " + message);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to submit: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Update Patient Profile</h1>

      <form onSubmit={handlePatientProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg border">

        <div>
          <label className="label"><User size={18} /> Full Name</label>
          <input name="name" required className="input" placeholder="Enter full name" />
        </div>

        <div>
          <label className="label"><Mail size={18} /> Email</label>
          <input name="email" className="input" type="email" placeholder="example@gmail.com" />
        </div>

        <div>
          <label className="label"><Phone size={18} /> Phone</label>
          <input name="phone" required className="input" placeholder="01XXXXXXXXX" />
        </div>

        <div>
          <label className="label"><Calendar size={18} /> Date of Birth</label>
          <input name="date" className="input" type="date" />
        </div>

        <div className="md:col-span-2">
          <label className="label"><Home size={18} /> Address</label>
          <input name="address" className="input" placeholder="Enter your address" />
        </div>

        <div className="md:col-span-2">
          <label className="label"><FileText size={18} /> Medical History / Description</label>
          <textarea
            name="medicalHistory"
            className="input min-h-[140px]"
            placeholder="Describe patient symptoms, allergies, chronic diseases, medications..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="label"><Upload size={18} /> Upload Previous Prescription / Files</label>

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

          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="border p-3 rounded-xl bg-gray-50 shadow-sm relative"
                >
                  <p className="font-semibold text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {Math.round(file.size / 1024)} KB
                  </p>

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

        <div className="md:col-span-2">
          <button type="submit" disabled={submitting} className="btn btn-primary btn-block mt-4">
            {submitting ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>

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
