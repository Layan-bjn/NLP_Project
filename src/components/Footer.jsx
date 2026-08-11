import React from 'react';
import { ShieldCheck, Heart, MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function Footer({ t, lang }) {
  return (
    <footer className="bg-makkah-navy-900 text-slate-300 relative overflow-hidden border-t border-makkah-navy-700">
      {/* Top Brand Wave Accent */}
      <div className="brand-wave-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center">
               <img class="rounded-xl" src="/logo.jpg" alt="logo" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">
                  {t.nav.brand}
                </h3>
                <span className="text-xs text-makkah-gold-400 font-semibold">
                  {t.nav.subBrand}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.footer.aboutDesc}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-makkah-emerald-400" />
                مكة المكرمة - جامعة أم القرى
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                wadmakkah.sa
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><a href="#home" className="hover:text-makkah-emerald-400 transition-colors">{t.nav.home}</a></li>
              <li><a href="#subsidiaries" className="hover:text-makkah-emerald-400 transition-colors">{t.nav.subsidiaries}</a></li>
              <li><a href="#nlp-analyzer" className="hover:text-makkah-emerald-400 transition-colors">{t.nav.nlpAnalyzer}</a></li>
              <li><a href="#ai-chatbot" className="hover:text-makkah-emerald-400 transition-colors">{t.nav.aiBot}</a></li>
            </ul>
          </div>

          {/* Vision 2030 Partner Card (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-makkah-gold-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-makkah-emerald-400" />
              <span>{t.footer.visionTitle}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.footer.visionDesc}
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
              <span>Kingdom of Saudi Arabia</span>
              <span className="font-extrabold text-white">VISION 2030</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Holy Makkah Knowledge & AI Innovation</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
