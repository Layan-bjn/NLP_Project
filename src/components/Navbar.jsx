import React, { useState } from 'react';
import { Globe, Key, Sparkles, Menu, X, ChevronDown, Building2, Brain, Bot, BarChart3 } from 'lucide-react';

export default function Navbar({ lang, setLang, t, openApiKeyModal, apiKey }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const navLinks = [
    { href: '#home', label: t.nav.home, icon: Building2 },
    { href: '#subsidiaries', label: t.nav.subsidiaries, icon: Building2 },
    { href: '#nlp-analyzer', label: t.nav.nlpAnalyzer, icon: Brain },
    { href: '#ai-chatbot', label: t.nav.aiBot, icon: Bot },
    { href: '#metrics', label: t.nav.metrics, icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Brand Multi-Color Wave Accent Bar */}
      <div className="brand-wave-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-makkah-navy-800 to-makkah-navy-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* SVG Mini Brand Wave */}
                <img src="/logo.jpg" alt="Company Logo" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-makkah-navy-800 tracking-tight leading-tight group-hover:text-makkah-emerald-500 transition-colors">
                {t.nav.brand}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {t.nav.subBrand}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-makkah-emerald-500 hover:bg-emerald-50/60 rounded-lg transition-all"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-makkah-emerald-500" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* OpenAI API Key Settings Button */}
            <button
              onClick={openApiKeyModal}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                apiKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Configure OpenAI GPT API Key"
            >
              <Key className={`w-3.5 h-3.5 ${apiKey ? 'text-emerald-600 animate-pulse' : 'text-slate-500'}`} />
              <span>{t.nav.openAiKey}</span>
              {apiKey ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-makkah-navy-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all"
            >
              <Globe className="w-4 h-4 text-makkah-emerald-500" />
              <span>{t.nav.langSwitch}</span>
            </button>

            {/* CTA CTA */}
            <a
              href="#nlp-analyzer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-makkah-navy-800 to-makkah-navy-600 hover:from-makkah-emerald-500 hover:to-makkah-emerald-600 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-makkah-gold-400" />
              <span>{t.hero.ctaPrimary}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-xs font-bold text-makkah-navy-800 bg-slate-100 rounded-lg"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-makkah-navy-800 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-lg"
              >
                <Icon className="w-5 h-5 text-makkah-emerald-500" />
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openApiKeyModal();
              }}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-700 bg-slate-100 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Key className="w-4 h-4 text-makkah-gold-500" />
                {t.nav.openAiKey}
              </span>
              <span className="text-xs px-2 py-0.5 bg-white rounded border">
                {apiKey ? 'Live GPT' : 'Simulator'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
