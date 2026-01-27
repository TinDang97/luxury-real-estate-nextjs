"use client";

interface InfoTableProps {
  title?: string;
  rows: { label: string; value: string }[];
}

export default function InfoTable({ title, rows }: InfoTableProps) {
  return (
    <section className="py-16 px-4 md:px-12 xl:px-24 max-w-[1800px] mx-auto">
      {title && (
        <h3 className="text-2xl md:text-3xl xl:text-4xl font-serif text-slate-900 mb-8 border-b-2 border-[#c5a059] inline-block pb-1 uppercase tracking-widest">
          {title}
        </h3>
      )}
      <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 font-semibold text-slate-900 border-b border-slate-200 w-1/3">Category</th>
              <th className="p-4 font-semibold text-slate-900 border-b border-slate-200">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="p-4 font-medium text-slate-700 border-b border-slate-100">{row.label}</td>
                <td className="p-4 text-slate-600 border-b border-slate-100">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
