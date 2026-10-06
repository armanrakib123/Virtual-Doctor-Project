export default function PaymentsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-cyan-600 mb-4">My Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 text-center bg-base-100 border border-base-content/10 rounded-xl shadow-sm">
          <p className="text-sm text-base-content/60">Last Payment</p>
          <p className="text-2xl font-semibold text-emerald-500">৳2,000</p>
        </div>

        <div className="p-4 text-center bg-base-100 border border-base-content/10 rounded-xl shadow-sm">
          <p className="text-sm text-base-content/60">This Month</p>
          <p className="text-2xl font-semibold text-sky-500">৳8,000</p>
        </div>

        <div className="p-4 text-center bg-base-100 border border-base-content/10 rounded-xl shadow-sm">
          <p className="text-sm text-base-content/60">Total Paid</p>
          <p className="text-2xl font-semibold text-indigo-400">৳65,000</p>
        </div>

      </div>
    </div>
  );
}
