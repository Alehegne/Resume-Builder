export default function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 text-left">
            {headers.map((header) => (
              <th key={header} className="p-3 text-sm font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-slate-50">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="p-3 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
