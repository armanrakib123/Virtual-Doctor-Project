export default function SpecialistsPage() {
  const doctors = [
    { id: 1, name: "Dr. Jane Doe", specialty: "Cardiologist", rating: 5 },
    { id: 2, name: "Dr. Kamal Hossain", specialty: "Dermatologist", rating: 4 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">My Specialists</h2>

      <div className="grid gap-3">
        {doctors.map((d) => (
          <div key={d.id} className="p-4 border rounded-xl bg-blue-50 flex justify-between">
            <div>
              <div className="font-medium">{d.name}</div>
              <div className="text-sm text-slate-500">{d.specialty}</div>
            </div>
            <div className="text-yellow-500">
              {"★".repeat(d.rating)}{"☆".repeat(5 - d.rating)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
