import React, { useState } from 'react';
import { analyzeFeedback } from '../utils/nlpSimulator';
import confetti from 'canvas-confetti';
import { 
  Brain, Sparkles, AlertCircle, CheckCircle, HelpCircle, 
  Tag, PieChart, BarChart3, RefreshCw, Trash2, ArrowRight,
  TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, Zap
} from 'lucide-react';

export default function SentimentAnalyzer({ t, lang }) {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  
  // History state with initial sample entries
  const [history, setHistory] = useState([
    {
      id: 1,
      text: "الخدمات الرقمية وتطبيقات إدارة الحشود المقدمة من شركة وادي مكة ساهمت في تسهيل رحلة العمرة بشكل رائع جداً.",
      sentiment: "Positive",
      sentimentAr: "إيجابي",
      confidence: 96,
      badgeColor: "emerald",
      topic: { ar: "تقنيات الحج والعمرة", en: "Hajj & Umrah Tech" },
      keywords: ["إدارة الحشود", "تطبيق العمرة", "تسهيل الخدمات"],
      recommendation: "توسيع نطاق تطبيق إدارة الحشود ليشمل كافة المواسم."
    },
    {
      id: 2,
      text: "نواجه ازدحاماً مرورياً وصعوبة بالوصول للمجمع التقني، نأمل توسعة الطريق وتطوير المواقف.",
      sentiment: "Negative",
      sentimentAr: "سلبي / حاجة لتحسين",
      confidence: 89,
      badgeColor: "rose",
      topic: { ar: "العقارات والبنية التحتية", en: "Real Estate & Infrastructure" },
      keywords: ["الازدحام المروري", "المواقف الذكية", "المجمع التقني"],
      recommendation: "إرسال تقرير عاجل لوادي مكة العقارية لتطوير المواقف."
    }
  ]);

  const handleAnalyze = (textToAnalyze = inputText) => {
    if (!textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setCurrentResult(null);

    setTimeout(() => {
      const result = analyzeFeedback(textToAnalyze, lang);
      setCurrentResult(result);
      setIsAnalyzing(false);

      if (result) {
        setHistory(prev => [result, ...prev]);

        // Trigger confetti for positive feedback
        if (result.sentiment === 'Positive') {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }, 600);
  };

  const handlePresetClick = (presetText) => {
    setInputText(presetText);
    handleAnalyze(presetText);
  };

  // Stats calculation
  const totalCount = history.length;
  const posCount = history.filter(h => h.sentiment === 'Positive').length;
  const negCount = history.filter(h => h.sentiment === 'Negative').length;
  const neuCount = history.filter(h => h.sentiment === 'Neutral').length;

  const posPct = totalCount ? Math.round((posCount / totalCount) * 100) : 0;
  const neuPct = totalCount ? Math.round((neuCount / totalCount) * 100) : 0;
  const negPct = totalCount ? Math.round((negCount / totalCount) * 100) : 0;

  return (
    <section id="nlp-analyzer" className="py-20 bg-white relative border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-extrabold text-makkah-navy-800 bg-cyan-100/80 rounded-full border border-cyan-300">
            <Brain className="w-4 h-4 text-cyan-600 animate-pulse" />
            {t.nlp.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-makkah-navy-800">
            {t.nlp.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.nlp.subtitle}
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Main Form Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <label className="block text-sm font-extrabold text-makkah-navy-800">
                {t.nlp.inputLabel}
              </label>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.nlp.placeholder}
                rows={4}
                className="w-full p-4 rounded-xl bg-white border border-slate-300 focus:border-makkah-emerald-500 focus:ring-2 focus:ring-makkah-emerald-200 text-slate-800 text-sm font-medium resize-none transition-all shadow-inner"
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => handleAnalyze()}
                  disabled={isAnalyzing || !inputText.trim()}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl shadow-md transition-all ${
                    isAnalyzing || !inputText.trim()
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-makkah-emerald-500 to-teal-600 hover:from-makkah-emerald-600 hover:to-teal-700 hover:scale-105 shadow-emerald-glow'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.nlp.analyzing}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-makkah-gold-400" />
                      <span>{t.nlp.analyzeBtn}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => { setInputText(''); setCurrentResult(null); }}
                  className="text-xs text-slate-500 hover:text-slate-700 underline font-medium"
                >
                  {lang === 'ar' ? 'إعادة ضبط' : 'Clear Text'}
                </button>
              </div>

              {/* Preset Sample Buttons */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-500 mb-2">
                  {t.nlp.presetsTitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.nlp.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePresetClick(preset.text)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-makkah-emerald-700 transition-all text-start"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Output Display */}
            {currentResult && (
              <div className="bg-gradient-to-br from-makkah-navy-800 to-makkah-navy-900 text-white p-6 rounded-2xl border border-makkah-navy-700 shadow-2xl space-y-6 animate-fadeIn">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="flex items-center gap-2 font-bold text-sm text-makkah-gold-400">
                    <Zap className="w-4 h-4" />
                    {t.nlp.resultTitle}
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentResult.timestamp}
                  </span>
                </div>

                {/* Grid for Sentiment & Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Sentiment Badge Card */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs text-slate-400 block font-semibold">
                      {t.nlp.sentimentLabel}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                        currentResult.sentiment === 'Positive'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : currentResult.sentiment === 'Negative'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {currentResult.sentiment === 'Positive' && <ThumbsUp className="w-3.5 h-3.5" />}
                        {currentResult.sentiment === 'Negative' && <ThumbsDown className="w-3.5 h-3.5" />}
                        {lang === 'ar' ? currentResult.sentimentAr : currentResult.sentiment}
                      </span>
                      <span className="text-xs font-bold text-makkah-gold-400">
                        {currentResult.confidence}% {t.nlp.confidenceLabel}
                      </span>
                    </div>

                    {/* Sentiment Meter Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mt-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          currentResult.sentiment === 'Positive' ? 'bg-emerald-400' : currentResult.sentiment === 'Negative' ? 'bg-rose-500' : 'bg-amber-400'
                        }`}
                        style={{ width: `${currentResult.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Topic Category Card */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs text-slate-400 block font-semibold">
                      {t.nlp.topicLabel}
                    </span>
                    <span className="text-sm font-bold text-cyan-300 block">
                      {lang === 'ar' ? currentResult.topic.ar : currentResult.topic.en}
                    </span>
                  </div>

                </div>

                {/* Keywords Tags List */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-makkah-gold-400" />
                    {t.nlp.keywordsLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentResult.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/10 text-slate-200 border border-white/10"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategic Recommendation */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">{t.nlp.recommendationLabel}</span>
                    {currentResult.recommendation}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Column: Analytics Dashboard & History Log */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Summary Dashboard Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-makkah-navy-800 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-makkah-emerald-500" />
                  {t.nlp.dashboardTitle}
                </h3>
                <span className="text-xs font-extrabold px-2.5 py-1 bg-white rounded-md border text-slate-600">
                  {totalCount} {lang === 'ar' ? 'سجلات' : 'Items'}
                </span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>{t.nlp.stats.total}: {totalCount}</span>
                  <span className="text-emerald-600">{posPct}% Positive</span>
                </div>

                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  <div className="bg-emerald-500 h-full transition-all" style={{ width: `${posPct}%` }} title={`Positive: ${posPct}%`} />
                  <div className="bg-amber-400 h-full transition-all" style={{ width: `${neuPct}%` }} title={`Neutral: ${neuPct}%`} />
                  <div className="bg-rose-500 h-full transition-all" style={{ width: `${negPct}%` }} title={`Negative: ${negPct}%`} />
                </div>
              </div>

              {/* 3 Metric Mini Cards */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-700 block">{t.nlp.stats.positive}</span>
                  <span className="text-lg font-black text-emerald-800">{posPct}%</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-xs font-bold text-amber-700 block">{t.nlp.stats.neutral}</span>
                  <span className="text-lg font-black text-amber-800">{neuPct}%</span>
                </div>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                  <span className="text-xs font-bold text-rose-700 block">{t.nlp.stats.negative}</span>
                  <span className="text-lg font-black text-rose-800">{negPct}%</span>
                </div>
              </div>

            </div>

            {/* History Table Log */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-makkah-navy-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-makkah-gold-500" />
                  {t.nlp.historyTitle}
                </h4>
                {history.length > 0 && (
                  <button
                    onClick={() => { setHistory([]); setCurrentResult(null); }}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t.nlp.clearHistory}
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {history.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    {lang === 'ar' ? 'لا يوجد سجلات حالياً' : 'No recent analysis logs'}
                  </p>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setCurrentResult(item)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-extrabold px-2 py-0.5 rounded-full ${
                          item.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-700' : item.sentiment === 'Negative' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {lang === 'ar' ? item.sentimentAr : item.sentiment} ({item.confidence}%)
                        </span>
                        <span className="text-slate-400 text-[10px]">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-700 line-clamp-2 font-medium">
                        "{item.text}"
                      </p>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
