'use client';

import { useState } from 'react';

export default function LeadCaptureForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  if (formState === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          ✓
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Đăng Ký Thành Công!</h3>
        <p className="text-slate-600">Chuyên viên tư vấn sẽ liên hệ với quý khách trong vòng 30 phút.</p>
        <button 
          onClick={() => setFormState('idle')} 
          className="mt-6 text-accent font-medium hover:underline"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên</label>
        <input 
          type="text" 
          id="name" 
          required 
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
          placeholder="Nhập họ tên..."
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Số Điện Thoại</label>
        <input 
          type="tel" 
          id="phone" 
          required 
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
          placeholder="0909..."
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input 
          type="email" 
          id="email" 
          required 
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
          placeholder="email@example.com"
        />
      </div>
      <button 
        type="submit" 
        disabled={formState === 'submitting'}
        className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-2 disabled:opacity-70 disabled:transform-none"
      >
        {formState === 'submitting' ? 'Đang Gửi...' : 'Nhận Báo Giá Chi Tiết'}
      </button>
      <p className="text-center text-xs text-slate-400">
        Thông tin của quý khách được bảo mật tuyệt đối.
      </p>
    </form>
  );
}
