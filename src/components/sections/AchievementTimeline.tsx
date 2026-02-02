'use client';
import { useTranslations } from 'next-intl';

interface Achievement {
  year: string;
  title: string;
  description: string;
}

interface AchievementTimelineProps {
  achievements: Achievement[];
}

export default function AchievementTimeline({ achievements }: AchievementTimelineProps) {
  const t = useTranslations('InvestorDetailPage');
  if (!achievements || achievements.length === 0) return null;

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="text-center mb-24">
          <p className="text-accent font-black uppercase tracking-[0.4em] text-[12px] mb-4">{t('milestones')}</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">{t('legacyTitle')}</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-slate-200 hidden md:block"></div>

          <div className="space-y-24 relative">
            {achievements.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Content Side */}
                <div className="md:w-1/2 px-5 md:px-12 text-center md:text-right group">
                  <div className={`p-10 bg-slate-50 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:border-accent/20 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                    <span className="text-accent font-black text-4xl mb-4 block">{item.year}</span>
                    <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                    <p className="text-slate-500 font-light leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="relative z-10 w-12 h-12 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-accent ring-8 ring-accent/10"></div>
                </div>

                {/* Empty Side for balance */}
                <div className="md:w-1/2 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
