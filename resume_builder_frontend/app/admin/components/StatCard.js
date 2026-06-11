export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border">
      <p className="text-slate-500 text-sm mb-2">{title}</p>

      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}
