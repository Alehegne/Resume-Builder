export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      {children}
    </div>
  );
}
