export default function SpecialistsPage() {
  const doctors = [
    { id: 1, name: "Dr. Jane Doe", specialty: "Cardiologist", rating: 5 },
    { id: 2, name: "Dr. Kamal Hossain", specialty: "Dermatologist", rating: 4 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-cyan-600 mb-4">My Specialists</h2>

      <div className="grid gap-3">
        {doctors.map((d) => (
          <div key={d.id} className="p-4 border border-base-content/10 rounded-xl bg-base-100 flex justify-between shadow-sm">
            <div>
              <div className="font-medium text-base-content">{d.name}</div>
              <div className="text-sm text-base-content/60">{d.specialty}</div>
            </div>
            <div className="text-amber-400">
              {"★".repeat(d.rating)}{"☆".repeat(5 - d.rating)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
