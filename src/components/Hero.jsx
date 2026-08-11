import React from 'react';
import { Sparkles, Bot, ShieldCheck, TrendingUp, Award, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

export default function Hero({ t, lang }) {
  const isRtl = lang === 'ar';

  return (
    <section id="home" className="relative overflow-hidden bg-makkah-navy-800 text-white py-16 sm:py-24">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-makkah-emerald-500/20 via-makkah-navy-800/80 to-makkah-navy-900 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-wave-gradient opacity-80" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-makkah-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-makkah-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Vision Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-makkah-gold-400 mb-8 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-makkah-emerald-400" />
          <span>{t.hero.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-makkah-emerald-400 animate-ping" />
        </div>

        {/* Main Headline & Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#nlp-analyzer"
                className="group flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-makkah-emerald-500 to-makkah-emerald-600 hover:from-makkah-emerald-600 hover:to-teal-700 rounded-xl shadow-emerald-glow hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4 text-makkah-gold-400 group-hover:rotate-12 transition-transform" />
                <span>{t.hero.ctaPrimary}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>

              <a
                href="#ai-chatbot"
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl backdrop-blur-md hover:scale-105 transition-all"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </div>
          </div>

          {/* Right Slogan Pillars Grid (Official Brand Identity: ابتكار | جودة | تحفيز | إثراء) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {t.hero.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all shadow-xl hover:-translate-y-1"
              >
                {/* Colored Top Accent Wave */}
                <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${pillar.color} mb-3`} />
                <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-makkah-gold-400 transition-colors">
                  {pillar.label}
                </h3>
                <p className="text-xs text-slate-300 leading-snug">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div id="metrics" className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.hero.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-start p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-makkah-gold-400 via-makkah-emerald-300 to-cyan-300">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
