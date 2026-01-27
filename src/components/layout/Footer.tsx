import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <Link href="/" className="text-2xl font-extrabold text-accent uppercase tracking-wider mb-6 block">
              VN Luxury Realty
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('aboutDesc')}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-accent">{t('links')}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">{t('projects')}</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">{t('news')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 text-accent">{t('address')}</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('addressText')}<br />
              Email: contact@vnluxuryrealty.com<br />
              Hotline: 0909 888 999
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-xs text-white/40 tracking-widest uppercase">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
