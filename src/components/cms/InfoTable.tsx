"use client";

interface InfoTableProps {
  title?: string;
  rows: { label: string; value: string }[];
}

export default function InfoTable({ title, rows }: InfoTableProps) {
  return (
    <section className="py-24 px-4 md:px-12 xl:px-24 max-w-[1400px] mx-auto">
      {title && (
        <div className="flex items-center gap-6 mb-12">
          <h3 className="text-3xl md:text-4xl xl:text-5xl font-serif text-slate-900 uppercase tracking-tight">
            {title}
          </h3>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-[#c5a059] to-transparent opacity-30" />
        </div>
      )}
      <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-8 font-serif text-lg tracking-wide uppercase border-none w-1/3">Thông số</th>
                <th className="p-8 font-serif text-lg tracking-wide uppercase border-none">Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {rows?.map((row, index) => (
                <tr 
                  key={index} 
                  className={`group transition-colors ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-[#c5a059]/5`}
                >
                  <td className="p-8 font-bold text-slate-900 border-b border-slate-100/60 transition-colors group-hover:text-[#c5a059]">{row.label}</td>
                  <td className="p-8 text-slate-700 border-b border-slate-100/60 font-light leading-relaxed">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
