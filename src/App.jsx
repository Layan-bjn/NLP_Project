import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectorsShowcase from './components/SectorsShowcase';
import SentimentAnalyzer from './components/SentimentAnalyzer';
import AIChatbot from './components/AIChatbot';
import ApiKeyModal from './components/ApiKeyModal';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen flex flex-col font-${lang === 'ar' ? 'cairo' : 'inter'}`}>
      
      {/* Header Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        openApiKeyModal={() => setIsApiKeyModalOpen(true)}
        apiKey={apiKey}
      />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        <Hero t={t} lang={lang} />
        <SectorsShowcase t={t} lang={lang} />
        <SentimentAnalyzer t={t} lang={lang} />
        <AIChatbot
          t={t}
          lang={lang}
          apiKey={apiKey}
          openApiKeyModal={() => setIsApiKeyModalOpen(true)}
        />
      </main>

      {/* OpenAI API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        t={t}
      />

      {/* Footer */}
      <Footer t={t} lang={lang} />

    </div>
  );
}
