"use client";

import React, { useState, useRef } from "react";
import { Camera, ChevronDown, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DoctorProfileForm({ initialData = null, onSubmit }) {
  const sample = initialData || {
    id: "",
    firstName: "",
    lastName: "",
    title: "Dr.",
    specialty: "",
    qualifications: [],
    licensingInfo: { licenseNumber: "", issuingAuthority: "", expirationDate: "" },
    email: "",
    phone: "",
    address: { street: "", city: "", postalCode: "", country: "" },
    hospitalAffiliation: "",
    yearsOfExperience: "",
    workingHours: "",
    appointmentInfo: "",
    bio: "",
    profilePicture: "",
    ratings: "",
    education: { university: "", degree: "", yearOfGraduation: "" },
    Consultation_Fee: "",
  };

  const [preview, setPreview] = useState("");
  const [form, setForm] = useState(sample);
  const [errors, setErrors] = useState({});
  const [qualInput, setQualInput] = useState("");
  const [picturePreview, setPicturePreview] = useState(sample.profilePicture || "");
  const fileRef = useRef(null);


  function handleImageUpload(e) {
    const file = e?.target?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setPicturePreview(url);
 
    setForm((f) => ({ ...f, _profileFile: file }));
  }

  const handleClearImage = () => {
    setPreview("");
    setPicturePreview("");
    if (fileRef.current) fileRef.current.value = null;

    setForm((f) => {
      const copy = { ...f };
      delete copy._profileFile;
      copy.profilePicture = "";
      return copy;
    });
  };

  const REQUIRED = [
    "firstName",
    "lastName",
    "title",
    "specialty",
    "email",
    "phone",
    "licensingInfo.licenseNumber",
    "licensingInfo.issuingAuthority",
    "hospitalAffiliation",
    "yearsOfExperience",
    "Consultation_Fee",
  ];

  const professionalInput =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all";

  function setNested(key, value) {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      setForm((f) => ({ ...f, [parent]: { ...f[parent], [child]: value } }));
    } else {
      setForm((f) => ({ ...f, [key]: value }));
    }
  }

  function validate() {
    const e = {};
    for (const k of REQUIRED) {
      if (k.includes(".")) {
        const [p, c] = k.split(".");
        if (!form[p] || !form[p][c] || String(form[p][c]).trim() === "")
          e[k] = "This field is required.";
      } else {
        if (!form[k] || String(form[k]).trim() === "") e[k] = "This field is required.";
      }
    }

    if (form.email && !/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email))
      e.email = "Enter a valid email.";

    if (form.phone && !/^[+0-9() -]{8,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleAddQualification() {
    const val = qualInput.trim();
    if (!val) return;
    setForm((f) => ({ ...f, qualifications: [...(f.qualifications || []), val] }));
    setQualInput("");
  }

  function handleRemoveQualification(i) {
    setForm((f) => ({
      ...f,
      qualifications: f.qualifications.filter((_, idx) => idx !== i),
    }));
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    try {
      const payload = { ...form };


      if (form._profileFile) {
        const dataUrl = await fileToDataUrl(form._profileFile);
        payload.profilePicture = dataUrl; 
      } else if (payload.profilePicture && payload.profilePicture.startsWith("blob:")) {

        payload.profilePicture = "";
      } else {

        payload.profilePicture = payload.profilePicture || "";
      }


      if (payload.id !== "") payload.id = Number(payload.id);
      if (payload.yearsOfExperience !== "") payload.yearsOfExperience = Number(payload.yearsOfExperience);
      if (payload.Consultation_Fee !== "") payload.Consultation_Fee = Number(payload.Consultation_Fee);
      if (payload.ratings !== "") payload.ratings = Number(payload.ratings);
      if (payload.education && payload.education.yearOfGraduation !== "")
        payload.education.yearOfGraduation = Number(payload.education.yearOfGraduation);


      if (!Array.isArray(payload.qualifications)) {

        payload.qualifications = payload.qualifications ? String(payload.qualifications).split(",").map(s => s.trim()).filter(Boolean) : [];
      }

      delete payload._profileFile;


      if (onSubmit) {
        await onSubmit(payload);
      } else {

        const res = await fetch("http://localhost:3000/api/doctor/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.success) {
          toast.success("Doctor Profile Saved Successfully!");

          setForm(sample);
          setPreview("");
          setPicturePreview(sample.profilePicture || "");
          if (fileRef.current) fileRef.current.value = null;
          setErrors({});
        } else {
          toast.error("Error: " + (data.error || data.message || "Unknown error"));
        }
      }
    } catch (err) {
     
      toast.error("Error while saving profile: " + err.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-6">Doctor Profile Form</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm">Title *</label>
              <select
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={professionalInput}
              >
                <option>Dr.</option>
                <option>Prof.</option>
                <option>Mr.</option>
                <option>Ms.</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-sm">First Name *</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className={professionalInput}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="font-medium text-sm">Last Name *</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={professionalInput}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col relative">
              <label className="font-medium text-sm">Specialty *</label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className={`${professionalInput} appearance-none`}
              >
                <option value="">Select specialty</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Dermatology</option>
                <option>Gastroenterology</option>
                <option>Neurology</option>
                <option>Nephrology</option>
                <option>Psychiatry</option>
                <option>Pediatrics</option>
                <option>General Surgery</option>
                <option>ENT</option>
                <option>Gynecology</option>
              </select>
              <ChevronDown className="absolute right-4 bottom-3 text-gray-400 pointer-events-none" />
            </div>

            <div>
              <label className="font-medium text-sm">Hospital Affiliation *</label>
              <input
                value={form.hospitalAffiliation}
                onChange={(e) => setForm({ ...form, hospitalAffiliation: e.target.value })}
                className={professionalInput}
              />
              {errors["hospitalAffiliation"] && (
                <p className="text-red-500 text-xs mt-1">{errors["hospitalAffiliation"]}</p>
              )}
            </div>
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm">Years of Experience *</label>
              <input
                type="number"
                min="0"
                value={form.yearsOfExperience}
                onChange={(e) => setForm({ ...form, yearsOfExperience: e.target.value })}
                className={professionalInput}
              />
              {errors["yearsOfExperience"] && (
                <p className="text-red-500 text-xs mt-1">{errors["yearsOfExperience"]}</p>
              )}
            </div>

            <div>
              <label className="font-medium text-sm">Consultation Fee (BDT) *</label>
              <input
                type="number"
                min="0"
                value={form.Consultation_Fee}
                onChange={(e) => setForm({ ...form, Consultation_Fee: e.target.value })}
                className={professionalInput}
              />
              {errors["Consultation_Fee"] && (
                <p className="text-red-500 text-xs mt-1">{errors["Consultation_Fee"]}</p>
              )}
            </div>

            <div>
              <label className="font-medium text-sm">Ratings (Optional)</label>
              <input
                type="number"
                step="0.1"
                max="5"
                min="0"
                value={form.ratings}
                onChange={(e) => setForm({ ...form, ratings: e.target.value })}
                className={professionalInput}
              />
            </div>
          </div>

  
          <div>
            <label className="font-medium text-sm">Bio *</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className={professionalInput}
              placeholder="Write a short professional bio..."
            />
          </div>

    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-sm">Email *</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={professionalInput}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="font-medium text-sm">Phone *</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={professionalInput}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>


          <div className="bg-gray-50 p-5 rounded-xl border">
            <h4 className="font-medium mb-2">Licensing (Required)</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-medium text-sm">License Number *</label>
                <input
                  value={form.licensingInfo.licenseNumber}
                  onChange={(e) => setNested("licensingInfo.licenseNumber", e.target.value)}
                  className={professionalInput}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Issuing Authority *</label>
                <input
                  value={form.licensingInfo.issuingAuthority}
                  onChange={(e) => setNested("licensingInfo.issuingAuthority", e.target.value)}
                  className={professionalInput}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Expiration Date</label>
                <input
                  type="date"
                  value={form.licensingInfo.expirationDate}
                  onChange={(e) => setNested("licensingInfo.expirationDate", e.target.value)}
                  className={professionalInput}
                />
              </div>
            </div>
          </div>


          <div className="bg-gray-50 p-5 rounded-xl border">
            <h4 className="font-medium mb-3">Qualifications (Optional)</h4>

            <div className="flex gap-3">
              <input
                value={qualInput}
                onChange={(e) => setQualInput(e.target.value)}
                placeholder="MBBS, FCPS, MS, MD..."
                className={professionalInput}
              />
              <button
                type="button"
                onClick={handleAddQualification}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {(form.qualifications || []).map((q, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2"
                >
                  {q}
                  <button
                    type="button"
                    onClick={() => handleRemoveQualification(i)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-sm">Street Address</label>
              <input
                value={form.address.street}
                onChange={(e) => setNested("address.street", e.target.value)}
                className={professionalInput}
              />
            </div>

            <div>
              <label className="font-medium text-sm">City</label>
              <input
                value={form.address.city}
                onChange={(e) => setNested("address.city", e.target.value)}
                className={professionalInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="font-medium text-sm">Postal Code</label>
              <input
                value={form.address.postalCode}
                onChange={(e) => setNested("address.postalCode", e.target.value)}
                className={professionalInput}
              />
            </div>

            <div>
              <label className="font-medium text-sm">Country</label>
              <input
                value={form.address.country}
                onChange={(e) => setNested("address.country", e.target.value)}
                className={professionalInput}
              />
            </div>

            <div className="flex flex-col items-start gap-6">
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-gray-100 bg-gray-50">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition">
                  <Camera size={16} />
                  Upload
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleClearImage}
                  className="px-3 py-2 border rounded-xl hover:bg-gray-50 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          </div>

      
          <div className="flex items-center justify-between pt-5">
            <p className="text-sm text-gray-500">* Required fields</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setForm(sample);
                  setPicturePreview(sample.profilePicture || "");
                  setPreview("");
                  setErrors({});
                  if (fileRef.current) fileRef.current.value = null;
                }}
                className="px-5 py-2 border rounded-xl hover:bg-gray-50 transition"
              >
                Reset
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
        </form>


        <aside className="lg:col-span-1">
          <div className="sticky top-10 bg-white p-6 shadow-xl rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 shadow-md">
                {picturePreview ? (
                  <img src={picturePreview} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Photo
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {form.title} {form.firstName} {form.lastName}
                </h3>
                <p className="text-sm text-gray-500">{form.specialty || "—"}</p>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-medium">Hospital:</span> {form.hospitalAffiliation || "—"}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {form.yearsOfExperience ? `${form.yearsOfExperience} yrs` : "—"}
              </p>
              <p>
                <span className="font-medium">Fee:</span>{" "}
                {form.Consultation_Fee ? `৳ ${form.Consultation_Fee}` : "—"}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {form.phone || "—"}
              </p>

              <div>
                <span className="font-medium">Bio:</span>
                <p className="text-gray-600 mt-1">{form.bio || "—"}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <p className="font-medium">Qualifications</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(form.qualifications || []).length ? (
                  form.qualifications.map((q, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {q}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No qualifications added</p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
