export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-600">admin@gmail.com</div>

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
}
