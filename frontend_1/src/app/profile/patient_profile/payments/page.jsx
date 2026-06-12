export default function PaymentsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">My Payments</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 text-center bg-green-100 rounded-xl">
          <p className="text-sm text-slate-600">Last Payment</p>
          <p className="text-2xl font-semibold text-green-700">৳2,000</p>
        </div>

        <div className="p-4 text-center bg-blue-100 rounded-xl">
          <p className="text-sm text-slate-600">This Month</p>
          <p className="text-2xl font-semibold text-blue-700">৳8,000</p>
        </div>

        <div className="p-4 text-center bg-indigo-100 rounded-xl">
          <p className="text-sm text-slate-600">Total Paid</p>
          <p className="text-2xl font-semibold text-indigo-700">৳65,000</p>
        </div>

      </div>
    </div>
  );
}
