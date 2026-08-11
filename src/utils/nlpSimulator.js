/**
 * Real-time NLP Simulator Engine for Arabic & English Feedback Analysis
 */

const ARABIC_POSITIVE_WORDS = [
  'ممتاز', 'رائع', 'ممتازة', 'سلس', 'سلسة', 'سهل', 'مبدع', 'ابتكار', 'ناجح', 
  'تسهيل', 'تيسير', 'إيجابي', 'جودة', 'شكراً', 'أفضل', 'تطور', 'متميز', 'منظم'
];

const ARABIC_NEGATIVE_WORDS = [
  'سيء', 'صعوبة', 'ازدحام', 'مشكلة', 'تأخير', 'بطيء', 'عطل', 'سلبية', 'معقد',
  'صعب', 'فشل', 'ضعيف', 'نقص', 'خطأ', 'عدم', 'ازدحامات', 'ازدحام'
];

const ENGLISH_POSITIVE_WORDS = [
  'excellent', 'great', 'awesome', 'smooth', 'easy', 'innovative', 'successful',
  'best', 'helpful', 'efficient', 'positive', 'quality', 'thank', 'perfect', 'organized'
];

const ENGLISH_NEGATIVE_WORDS = [
  'bad', 'difficult', 'traffic', 'crowded', 'problem', 'delay', 'slow', 'crash',
  'issue', 'hard', 'failed', 'poor', 'lacking', 'disappointed', 'terrible'
];

export function analyzeFeedback(text, lang = 'ar') {
  if (!text || text.trim().length === 0) {
    return null;
  }

  const lowerText = text.toLowerCase();
  
  // 1. Sentiment Calculation
  let posCount = 0;
  let negCount = 0;

  ARABIC_POSITIVE_WORDS.forEach(word => { if (lowerText.includes(word)) posCount += 1.5; });
  ARABIC_NEGATIVE_WORDS.forEach(word => { if (lowerText.includes(word)) negCount += 1.5; });
  ENGLISH_POSITIVE_WORDS.forEach(word => { if (lowerText.includes(word)) posCount += 1.5; });
  ENGLISH_NEGATIVE_WORDS.forEach(word => { if (lowerText.includes(word)) negCount += 1.5; });

  let sentiment = 'Neutral';
  let sentimentAr = 'محايد';
  let badgeColor = 'amber';
  let confidence = 75 + Math.floor(Math.random() * 18);

  if (posCount > negCount) {
    sentiment = 'Positive';
    sentimentAr = 'إيجابي';
    badgeColor = 'emerald';
    confidence = Math.min(99, 85 + Math.round((posCount / (posCount + negCount + 1)) * 14));
  } else if (negCount > posCount) {
    sentiment = 'Negative';
    sentimentAr = 'سلبي / حاجة لتحسين';
    badgeColor = 'rose';
    confidence = Math.min(99, 82 + Math.round((negCount / (posCount + negCount + 1)) * 15));
  }

  // 2. Topic Categorization
  let topic = {
    key: 'hajjtech',
    ar: 'تقنيات الحج والعمرة والحلول الذكية',
    en: 'Hajj & Umrah Tech & Smart Mobility'
  };

  if (/عقار|مبنى|مجمع|مواقف|طريق|بنية تحتية|مرور|real estate|building|parking|traffic|hub|space/i.test(lowerText)) {
    topic = {
      key: 'realestate',
      ar: 'العقارات والبنية التحتية والمدن الذكية',
      en: 'Real Estate, Infrastructure & Smart Hubs'
    };
  } else if (/استثمار|تمويل|شركات ناشئة|استثمار جريء|رأس مال|حاضنة|venture|capital|funding|investment|startup|roi/i.test(lowerText)) {
    topic = {
      key: 'ventures',
      ar: 'خدمات الاستثمار الجريء ودعم الشركات الناشئة',
      en: 'Venture Capital & Startup Incubators'
    };
  } else if (/معرفة|أبحاث|جامعة|براءة اختراع|تدريب|ملكية فكرية|research|university|patent|knowledge|ip|training/i.test(lowerText)) {
    topic = {
      key: 'knowledge',
      ar: 'الاقتصاد المعرفي والملكية الفكرية والتدريب',
      en: 'Knowledge Economy, Patents & Training'
    };
  }

  // 3. Keyword Extraction
  const rawWords = text.split(/[\s,،.!-]+/);
  const stopWords = ['في', 'من', 'على', 'عن', 'مع', 'هذا', 'هذه', 'تم', 'كان', 'كانت', 'ان', 'أن', 'the', 'and', 'is', 'to', 'for', 'in', 'of', 'with', 'a', 'an'];
  
  const filteredWords = rawWords
    .map(w => w.trim().replace(/[^\w\u0600-\u06FF]/g, ''))
    .filter(w => w.length > 3 && !stopWords.includes(w.toLowerCase()));

  const uniqueKeywords = Array.from(new Set(filteredWords)).slice(0, 6);

  // Fallback default keywords if text is short
  const defaultKeywords = topic.key === 'hajjtech' 
    ? ['إدارة الحشود', 'تطبيق العمرة', 'خدمات ضيوف الرحمن', 'اللوجستيات الرقمية']
    : topic.key === 'realestate'
    ? ['المجمع التقني', 'البنية التحتية', 'المواقف الذكية', 'التطوير العقاري']
    : topic.key === 'ventures'
    ? ['الاستثمار الجريء', 'وادي مكة للاستثمار', 'تمويل الشركات الناشئة', 'النمو']
    : ['براءات الاختراع', 'الاقتصاد المعرفي', 'جامعة أم القرى', 'البحوث العلمية'];

  const keywords = uniqueKeywords.length >= 2 ? uniqueKeywords : defaultKeywords;

  // 4. Strategic Business Recommendation
  let recommendationAr = "";
  let recommendationEn = "";

  if (sentiment === 'Positive') {
    recommendationAr = `توصية استراتيجية: توثيق هذا الانطباع الإيجابي ضمن قصة نجاح ${topic.ar} والتسويق لنموذج العمل المستقبلي.`;
    recommendationEn = `Strategic Insight: Showcase this positive sentiment in upcoming ${topic.en} impact reports and investor presentations.`;
  } else if (sentiment === 'Negative') {
    recommendationAr = `توصية عاجلة: إحالة الملاحظة فورياً لفريق تشغيل ${topic.ar} لوضع خطة تحسين خلال 48 ساعة.`;
    recommendationEn = `Action Item: Immediately flag issue to the ${topic.en} operations team for rapid resolution within 48 hours.`;
  } else {
    recommendationAr = `توصية متابعة: إجراء استبيان تفصيلي لاستيضاح متطلبات العميل وتوفير الدعم المعرفي المباشر.`;
    recommendationEn = `Follow-up Suggestion: Reach out to user with a detailed survey to capture granular requirements.`;
  }

  return {
    id: Date.now(),
    text,
    timestamp: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    sentiment,
    sentimentAr,
    confidence,
    badgeColor,
    topic,
    keywords,
    recommendation: lang === 'ar' ? recommendationAr : recommendationEn,
    scores: {
      satisfaction: sentiment === 'Positive' ? 92 : sentiment === 'Neutral' ? 65 : 30,
      urgency: sentiment === 'Negative' ? 88 : sentiment === 'Neutral' ? 45 : 15,
      trust: sentiment === 'Positive' ? 95 : sentiment === 'Neutral' ? 70 : 40
    }
  };
}
