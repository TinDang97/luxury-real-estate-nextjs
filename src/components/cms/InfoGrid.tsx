"use client";

interface InfoGridProps {
  title?: string;
  items: { title: string; content: string[] }[];
}

export default function InfoGrid({ title, items }: InfoGridProps) {
  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl font-serif text-slate-900 mb-12 text-center">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items?.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <h4 className="text-xl font-bold text-[#0c1a2c] mb-4 border-l-4 border-[#c5a059] pl-4">
                {item.title}
              </h4>
              <ul className="space-y-3">
                {item.content?.map((point, pIndex) => (
                  <li key={pIndex} className="flex items-start text-slate-600">
                    <span className="text-[#c5a059] mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
