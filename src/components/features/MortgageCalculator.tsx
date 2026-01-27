"use client";

import { useState, useEffect } from "react";

interface MortgageCalculatorProps {
  title?: string;
  defaultPrice?: number;
}

export default function MortgageCalculator({ title, defaultPrice = 5000000000 }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(defaultPrice);
  const [interest, setInterest] = useState(7.5); // Fixed for Vietnam market estimate
  const [term, setTerm] = useState(20);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const r = interest / 100 / 12;
    const n = term * 12;
    const p = price;
    
    if (r === 0) {
      setMonthly(p / n);
    } else {
      const calculation = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      setMonthly(calculation);
    }
  }, [price, interest, term]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <section className="py-32 bg-slate-50 px-4 md:px-12 xl:px-24">
      <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto bg-white p-8 md:p-16 lg:p-20 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/5 blur-3xl rounded-full -mr-32 -mt-32" />
        
        <h2 className="text-3xl md:text-5xl xl:text-6xl font-serif text-slate-900 mb-16 text-center tracking-tight">
          {title || "Mortgage Calculator"}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 relative z-10">
          <div className="space-y-10">
            <div>
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                Project Price (VND)
              </label>
              <input
                type="number"
                className="w-full bg-slate-50 border-b-2 border-slate-200 rounded-none p-4 text-xl md:text-2xl font-serif focus:border-[#c5a059] focus:outline-none transition-colors"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <p className="text-xs md:text-sm text-slate-400 mt-4 font-light tracking-wide">{formatCurrency(price)}</p>
            </div>
            
            <div className="pt-4">
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                Interest Rate (%)
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                value={interest}
                onChange={(e) => setInterest(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 mt-6 tracking-widest uppercase">
                <span>Current: <span className="text-[#c5a059] font-bold">{interest}%</span></span>
                <span>Vietnam Average: 7-9%</span>
              </div>
            </div>
            
            <div className="pt-4">
              <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                Loan Term (Years)
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[5, 10, 15, 20, 25, 30].map(yr => (
                  <button
                    key={yr}
                    onClick={() => setTerm(yr)}
                    className={`py-3 text-xs font-bold transition-all rounded-lg border ${term === yr ? 'bg-[#0c1a2c] text-white border-[#0c1a2c] shadow-lg scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-[#c5a059]'}`}
                  >
                    {yr}Y
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-[#0c1a2c] rounded-3xl p-10 md:p-16 text-white flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <p className="text-[#c5a059] uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-8">Estimated Monthly Payment</p>
            <h3 className="text-4xl md:text-6xl xl:text-7xl font-serif text-white mb-8 tracking-tighter">
              {formatCurrency(monthly)}
            </h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light max-w-xs uppercase tracking-widest">
              * Reference estimate only. Actual bank rates may vary per profile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
