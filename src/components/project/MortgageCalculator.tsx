'use client';

import { useState, useEffect } from 'react';

interface MortgageCalculatorProps {
  priceString: string; // e.g., "From 36 billion", "150 million/m2"... basic parsing needed or just manual input default
}

export default function MortgageCalculator({ priceString }: MortgageCalculatorProps) {
  // Simple check to extract a numeric default if possible, else 10 billion default
  const defaultPrice = 10000000000; 

  const [price, setPrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  useEffect(() => {
    if (!priceString) return;

    // Normalizing string: "Từ 36 tỷ (SOHO)" -> "36 tỷ"
    const lowerPrice = priceString.toLowerCase();
    
    // Check for "tỷ" (billions)
    const billionMatch = lowerPrice.match(/(\d+(?:\.\d+)?)\s*tỷ/);
    if (billionMatch) {
      setPrice(parseFloat(billionMatch[1]) * 1000000000);
      return;
    }

    // Check for "triệu" (millions) - ONLY if not per m2 to avoid huge errors, or set a standard size?
    // For now, let's just parse millions if it's a total price.
    if (!lowerPrice.includes('/m2')) {
       const millionMatch = lowerPrice.match(/(\d+(?:\.\d+)?)\s*triệu/);
       if (millionMatch) {
         setPrice(parseFloat(millionMatch[1]) * 1000000);
       }
    }
  }, [priceString]);

  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  // Amortization Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-12 reveal-on-load">
      <h3 className="font-serif text-2xl font-bold text-primary mb-6">Tính Toán Khoản Vay</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Giá trị Bất Động Sản (VND)</label>
            <input 
              type="text" 
              value={new Intl.NumberFormat('vi-VN').format(price)}
              onChange={(e) => {
                const numericValue = Number(e.target.value.replace(/[^0-9]/g, ''));
                if (!isNaN(numericValue)) {
                  setPrice(numericValue);
                }
              }}
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Trả trước ({downPaymentPercent}%)</label>
            <input 
              type="range" 
              min="10" 
              max="90" 
              step="5"
              value={downPaymentPercent} 
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="text-right text-sm text-slate-500 mt-1">{formatCurrency(downPayment)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Thời hạn (Năm)</label>
              <input 
                type="number" 
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Lãi suất (%)</label>
              <input 
                type="number" 
                value={interestRate}
                step="0.1"
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 p-6 rounded-xl flex flex-col justify-center">
          <p className="text-slate-500 text-sm mb-2">Thanh toán hàng tháng ước tính</p>
          <div className="text-3xl md:text-4xl font-bold text-accent mb-6">
            {formatCurrency(monthlyPayment)}
          </div>
          
          <div className="space-y-3 text-sm text-slate-600 border-t border-slate-200 pt-4">
            <div className="flex justify-between">
              <span>Gốc vay:</span>
              <span className="font-medium">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
               <span>Thuế trước bạ (est. 0.5%):</span>
               <span className="font-medium">{formatCurrency(price * 0.005)}</span>
            </div>
             <div className="flex justify-between">
               <span>Phí môi giới/Khác:</span>
               <span className="font-medium">Liên hệ</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 mt-6 italic">
            *Kết quả chỉ mang tính chất tham khảo. Lãi suất thực tế có thể thay đổi tùy ngân hàng.
          </p>
        </div>
      </div>
    </div>
  );
}
