"use client";
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function EPrescriptionsSection() {
  const [showModal, setShowModal] = useState(false);
  const [prescription, setPrescription] = useState({
    patient: "",
    age: "",
    gender: "",
    diagnosis: "",
    medicines: "",
    notes: "",
  });
  const [pdfReady, setPdfReady] = useState(false);
  const pdfRef = useRef(null);

  const handleGeneratePreview = (e) => {
    e.preventDefault();
    setShowModal(false);
    setPdfReady(true);
  };

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;
    const element = pdfRef.current;

    // Fix for "lab()" color parsing issue
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        color-scheme: light !important;
      }
      html, body {
        background: #fff !important;
        color: #000 !important;
      }
    `;
    document.head.appendChild(style);

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      ignoreElements: (el) =>
        el.tagName === "LINK" || el.tagName === "STYLE",
    });

    document.head.removeChild(style);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${prescription.patient || "Prescription"}.pdf`);
  };

  return (
    <div className="">
      <div className="flex  justify-center items-center mb-4">
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 rounded-4xl text-2xl pd-4 px-50 py-3 font-bold  text-white hover:bg-green-700 transition"
        >
          Create Prescription
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <h3 className="text-lg font-semibold mb-4">
              Create New Prescription
            </h3>
            <form onSubmit={handleGeneratePreview} className="space-y-3">
              
              <input
                className="w-full border rounded p-2"
                placeholder="Patient Name"
                value={prescription.patient}
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    patient: e.target.value,
                  })
                }
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full border rounded p-2"
                  placeholder="Age"
                  value={prescription.age}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      age: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full border rounded p-2"
                  placeholder="Gender"
                  value={prescription.gender}
                  onChange={(e) =>
                    setPrescription({
                      ...prescription,
                      gender: e.target.value,
                    })
                  }
                />
              </div>
              <input
                className="w-full border rounded p-2"
                placeholder="Diagnosis"
                value={prescription.diagnosis}
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    diagnosis: e.target.value,
                  })
                }
              />
              <textarea
                className="w-full border rounded p-2"
                rows="3"
                placeholder="Medicines..."
                value={prescription.medicines}
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    medicines: e.target.value,
                  })
                }
              />
              <textarea
                className="w-full border rounded p-2"
                rows="2"
                placeholder="Notes..."
                value={prescription.notes}
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    notes: e.target.value,
                  })
                }
              />
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Generate Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF PREVIEW */}
      {pdfReady && (
        <div className="mt-4">
          <div
            ref={pdfRef}
            style={{
              backgroundColor: "#E1F5F7",
              width: "210mm",
              minHeight: "297mm",
              margin: "0 auto",
              padding: "20mm",
              border: "1px solid #000",
              color: "#000",
              fontFamily: "Arial, sans-serif",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #000",
                paddingBottom: "10px",
                marginBottom: "35px",
              }}
            >
              {/* Logo + Text */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.25rem",
                }}
              >
                <img
                  src="/Assets/Stethoscope.png"
                  alt="logo"
                  style={{ width: "50px", height: "50px" }}
                />
                <span
                  style={{
                    fontWeight: "800",
                    fontSize: "2.375rem",
                    lineHeight: "1",
                  }}
                >
                  Virtual
                  <span style={{ color: "#06b6d4" }}>Doc</span>
                </span>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1
                  style={{
                    color: "#003366",
                    fontSize: "22px",
                    fontWeight: "700",
                  }}
                >
                  Dr. Jane Doe
                </h1>
                <p style={{ color: "#333" }}>MBBS, MD (Cardiology)</p>
                <p style={{ color: "#333" }}>Sunrise Heart Clinic</p>
                <p style={{ color: "#333" }}>Phone: +880 1234-567890</p>
              </div>
            </div>

            {/* Patient Info */}
            <p>
              <strong>Patient Name:</strong> {prescription.patient}
            </p>
            <p>
              <strong>Age:</strong> {prescription.age} &nbsp;&nbsp;
              <strong>Gender:</strong> {prescription.gender}
            </p>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>Diagnosis:</strong> {prescription.diagnosis}
            </p>

            {/* Medicines */}
            <div
              style={{
                border: "1px solid #000",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <h3>🩺 Prescribed Medicines</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {prescription.medicines}
              </pre>
            </div>

            {/* Notes */}
            <div
              style={{
                border: "1px solid #000",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <h3>📋 Notes</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>{prescription.notes}</pre>
            </div>

            {/* Signature */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "60px",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <img
                  src="/Assets/signature.png"
                  alt="Doctor Signature"
                  style={{ width: "120px", height: "auto" }}
                />
                <div
                  style={{
                    borderTop: "1px solid #000",
                    width: "150px",
                    marginTop: "5px",
                  }}
                ></div>
                <p>Signature</p>
              </div>
            </div>

            {/* Footer (Health sentences) */}
            <div
              style={{
                position: "absolute",
                bottom: "20mm",
                left: "20mm",
                right: "20mm",
                textAlign: "center",
                color: "#333",
                fontSize: "12px",
              }}
            >
              <p>“Good health begins with good care.”</p>
              <p>
                “Stay healthy, stay confident — VirtualDoc is always with you.”
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
