import React, { useState } from 'react';
import { Landmark, Building, Lightbulb, Compass, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function SectorsShowcase({ t, lang }) {
  const [activeTab, setActiveTab] = useState(null);

  const getIcon = (id) => {
    switch (id) {
      case 'ventures': return Landmark;
      case 'realestate': return Building;
      case 'knowledge': return Lightbulb;
      default: return Compass;
    }
  };

  return (
    <section id="subsidiaries" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-extrabold text-makkah-emerald-600 bg-emerald-100 rounded-full border border-emerald-200">
            {t.subsidiaries.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-makkah-navy-800">
            {t.subsidiaries.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.subsidiaries.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.subsidiaries.cards.map((card) => {
            const Icon = getIcon(card.id);
            const isSelected = activeTab === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(isSelected ? null : card.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-makkah-navy-800 text-white border-makkah-emerald-500 shadow-2xl scale-105'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-makkah-emerald-300 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Header Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      isSelected ? 'bg-makkah-emerald-500 text-white' : 'bg-slate-100 text-makkah-emerald-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isSelected ? 'bg-white/10 text-makkah-gold-400' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className={`text-xl font-black mb-1 ${isSelected ? 'text-white' : 'text-makkah-navy-800'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-xs font-semibold mb-3 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {card.titleEn}
                  </p>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isSelected ? 'text-slate-200' : 'text-slate-600'}`}>
                    {card.desc}
                  </p>
                </div>

                {/* Card Footer Metric */}
                <div className={`pt-4 border-t flex items-center justify-between text-xs font-bold ${
                  isSelected ? 'border-white/10 text-makkah-emerald-400' : 'border-slate-100 text-makkah-navy-800'
                }`}>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-makkah-gold-500" />
                    {card.metrics}
                  </span>
                  <ArrowUpRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
