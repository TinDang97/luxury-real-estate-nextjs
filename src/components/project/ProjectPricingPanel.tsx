'use client';

import { useState, useEffect } from 'react';

interface PricingPanelProps {
  initialPrice: string;
  priceOptions?: { label: string; value: number }[];
}

export default function ProjectPricingPanel({ initialPrice, priceOptions }: PricingPanelProps) {
  const [displayedPrice, setDisplayedPrice] = useState(initialPrice);
  const [selectedOption, setSelectedOption] = useState('');
  const [isFading, setIsFading] = useState(false);

  const formatCurrency = (val: number) => {
    // Determine unit based on value size
    if (val >= 1000000000) {
      return `${(val / 1000000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} Tỷ`;
    }
    return `${(val / 1000000).toLocaleString('vi-VN')} Triệu`;
  };

  useEffect(() => {
    if (priceOptions && priceOptions.length > 0) {
      // Default to the first option
      setSelectedOption(priceOptions[0].value.toString());
      setDisplayedPrice(`Từ ${formatCurrency(priceOptions[0].value)}`);
    } else {
      setDisplayedPrice(initialPrice);
    }
  }, [priceOptions, initialPrice]);

  const handleOptionClick = (value: number) => {
    if (selectedOption === value.toString()) return;

    setSelectedOption(value.toString());
    setIsFading(true);
    
    setTimeout(() => {
      setDisplayedPrice(`Từ ${formatCurrency(value)}`);
      setIsFading(false);
    }, 200); // Wait for fade out before changing text
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg mb-6 sticky-price-panel">
      <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider font-semibold">Giá Khởi Điểm</p>
      
      <div 
        className={`transition-opacity duration-200 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}
      >
        <p className="text-4xl font-serif font-bold text-accent mb-6 leading-tight">
          {displayedPrice}
        </p>
      </div>

      {priceOptions && priceOptions.length > 0 && (
        <div className="flex flex-col gap-2">
          {priceOptions.map((opt) => {
            const isSelected = selectedOption === opt.value.toString();
            return (
              <button
                key={opt.value}
                onClick={() => handleOptionClick(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border ${
                  isSelected 
                    ? 'bg-accent/20 border-accent text-accent' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                }`}
              >
                <span className="font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
