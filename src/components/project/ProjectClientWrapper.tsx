'use client';

import { useState, ReactNode } from 'react';
import ProjectGallery from '@/components/project/ProjectGallery';
import MortgageCalculator from '@/components/project/MortgageCalculator';
import LeadCaptureForm from '@/components/project/LeadCaptureForm';
import LocationMap from '@/components/project/LocationMap';
import ProjectPricingPanel from '@/components/project/ProjectPricingPanel';

interface ProjectClientWrapperProps {
  project: any; // Using any for simplicity as per existing project structure, ideally explicit type
  children: ReactNode;
}

export default function ProjectClientWrapper({ project, children }: ProjectClientWrapperProps) {
  // Initial price logic can be complex, for now we rely on the component defaults or the first option
  // ideally we match the logic in ProjectPricingPanel
  const [selectedPriceValue, setSelectedPriceValue] = useState<number | null>(null);

  // We pass a handler to the pricing panel to update this state
  const handlePriceSelect = (value: number) => {
    setSelectedPriceValue(value);
  };

  const galleryImages = [
    project.image,
    '/assets/images/global_city_soho.jpg',
    '/assets/images/global_city_fountain.jpg',
    '/assets/images/global_city_park.jpg',
  ].filter(Boolean);

  return (
    <div className="container mx-auto px-5 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 2. Main Content Column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            
            {/* Gallery Section */}
            <ProjectGallery images={galleryImages} />

            <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary 
              prose-p:text-slate-600 prose-p:leading-loose
              prose-li:text-slate-600 prose-li:leading-loose
              prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:object-cover prose-img:my-8
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
              prose-th:bg-slate-100 prose-th:p-4 prose-th:text-left prose-th:font-serif prose-th:text-primary
              prose-td:p-4 prose-td:border-b prose-td:border-slate-50
              bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 space-y-8">
              {children}
            </div>

            {/* Mortgage Calculator */}
            {/* We pass the overridePrice derived from user, OR the default string if not set */}
            <MortgageCalculator 
              priceString={project.price} 
              priceOptions={project.priceOptions}
              paymentSchemes={project.paymentSchemes}
              overridePrice={selectedPriceValue}
            />

            {/* Location Map */}
            <LocationMap 
              address={project.address || project.location}
              projectName={project.title}
              coordinates={project.coordinates}
            />
          </div>

          {/* 3. Sticky Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2 relative">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Pricing Panel with Options */}
              <ProjectPricingPanel 
                initialPrice={project.price} 
                priceOptions={project.priceOptions}
                onPriceSelect={handlePriceSelect}
              />

              {/* Project Quick Info */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg mb-4 text-primary">Thông Tin Nhanh</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-500">Trạng thái</span>
                    <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{project.tag}</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                     <span className="text-slate-500">Quy mô</span>
                     <span className="font-medium text-slate-800 text-right">{project.scale}</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                     <span className="text-slate-500">Chủ đầu tư</span>
                     <span className="font-medium text-slate-800 text-right">{project.investor}</span>
                  </li>
                </ul>
              </div>

              {/* Lead Capture Form */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                 <h3 className="font-serif text-xl font-bold mb-4">Đăng Ký Tư Vấn</h3>
                 <LeadCaptureForm projectName={project.title} />
              </div>

              {/* Contact Info */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="font-serif text-xl font-bold mb-4 text-primary">Hỗ trợ 24/7</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-xl">
                    📞
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Hotline Kinh Doanh</p>
                    <p className="font-bold text-lg text-primary">0909 888 999</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
    </div>
  );
}
