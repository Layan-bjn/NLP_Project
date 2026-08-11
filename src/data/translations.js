export const translations = {
  ar: {
    nav: {
      brand: "شركة وادي مكة للتقنية",
      subBrand: "إحدى شركات جامعة أم القرى",
      home: "الرئيسية",
      subsidiaries: "شركات وادي مكة",
      nlpAnalyzer: "محلل الآراء والإنطباعات",
      aiBot: "المساعد الذكي للاستثمار",
      metrics: "مؤشرات الأداء",
      openAiKey: "إعدادات مفتاح GPT",
      langSwitch: "English",
      dir: "rtl"
    },
    hero: {
      badge: "رؤية السعودية 2030 | اقتصاد المعرفة والابتكار",
      title: "تمكين الابتكار واقتصاد المعرفة في مكة المكرمة",
      subtitle: "منصة ذكية متكاملة تجمع بين تحليل الانطباعات ومشاعر العملاء بمدخلات الذكاء الاصطناعي، ومساعد الاستثمار الذكي لسوق مكة المكرمة وحلول تقنيات الحج والعمرة.",
      pillars: [
        { label: "ابتكار", desc: "حلول تقنية وسيادية سباقة", color: "from-blue-500 to-cyan-400" },
        { label: "جودة", desc: "معايير عالمية في التطوير والتطبيقات", color: "from-purple-500 to-indigo-500" },
        { label: "تحفيز", desc: "تمكين رواد الأعمال والشركات الناشئة", color: "from-emerald-500 to-teal-400" },
        { label: "إثراء", desc: "تعزيز تجربة ضيوف الرحمن والمجتمع", color: "from-amber-500 to-yellow-400" }
      ],
      ctaPrimary: "جرب محلل الآراء (NLP)",
      ctaSecondary: "اسأل مساعد الاستثمار الذكي",
      stats: [
        { value: "+50", label: "شركة ناشئة تحت المظلة" },
        { value: "+500M", label: "ريال استثمارات مستقطبة" },
        { value: "+1.5M", label: "حاج ومعتمر مستفيد من التقنيات" },
        { value: "98.4%", label: "دقة تحليل الانطباعات وتصنيف النصوص" }
      ]
    },
    subsidiaries: {
      badge: "المنظومة الاستثمارية",
      title: "شركات منظومة وادي مكة للتقنية",
      subtitle: "ذراع استثماري وتطويري متكامل يقود التحول التقني والعقاري والمعرفي في العاصمة المقدسة.",
      cards: [
        {
          id: "ventures",
          title: "وادي مكة للاستثمار",
          titleEn: "Wadi Makkah Ventures",
          tag: "الاستثمار الجريء والحاضنات",
          desc: "تمويل وتطوير الشركات الناشئة والابتكارات التقنية في مراحلها الأولية والنمو، مع التركيز على تقنيات الحج والعمرة والحلول الذكية.",
          metrics: "أكثر من 35 شركة ناشئة مدعومة",
          color: "emerald"
        },
        {
          id: "realestate",
          title: "وادي مكة العقارية",
          titleEn: "Wadi Makkah Real Estate",
          tag: "التطوير العقاري والمدن الذكية",
          desc: "تطوير وإدارة الأصول العقارية والمجمعات التقنية والمناطق الابتكارية في مكة المكرمة لتهيئة بيئة الأعمال والمستثمرين.",
          metrics: "أكثر من 100 ألف م² مساحات مبتكرة",
          color: "navy"
        },
        {
          id: "knowledge",
          title: "وادي مكة المعرفة",
          titleEn: "Wadi Makkah Knowledge",
          tag: "الاقتصاد المعرفي والملكية الفكرية",
          desc: "تحويل الأبحاث العلمية وبراءات الاختراع بجامعة أم القرى إلى منتجات تجارية ذات قيمة اقتصادية عالية ودعم برامج التدريب والتأهيل.",
          metrics: "+120 براءة اختراع ونموذج صناعي",
          color: "purple"
        },
        {
          id: "hajjtech",
          title: "تقنيات الحج والعمرة",
          titleEn: "Hajj & Umrah Tech Ventures",
          tag: "حلول خدمة ضيوف الرحمن",
          desc: "ابتكار أنظمة إدارة الحشود، اللوجستيات الذكية، والتطبيقات الرقمية الموجهة لخدمة الحجاج والمعتمرين بالتعاون مع الجهات ذات العلاقة.",
          metrics: "+12 مليون عملية خدمة رقمية",
          color: "gold"
        }
      ]
    },
    nlp: {
      badge: "محرك NLP الذكي",
      title: "محلل انطباعات وآراء العملاء (NLP Simulator)",
      subtitle: "حلل انطباعات الزوار، الحجاج، والمستثمرين فورياً باستخدام نماذج معالجة اللغة الطبيعية للغتين العربية والإنجليزية.",
      inputLabel: "أدخل مراجعة، رأي، أو انطباع عميل (بالعربية أو الإنجليزية):",
      placeholder: "مثال: تجربة التطبيق الإلكتروني لإدارة الحشود في موسم العمرة كانت ممتازة وسلسة جداً، لكن نحتاج تحسين سرعة الحجز بالمواقف...",
      analyzeBtn: "تحليل الانطباع فورياً",
      analyzing: "جاري تحليل النص واستخراج الكلمات المفتاحية...",
      presetsTitle: "أو اختر نماذج تجريبية سريعة:",
      presets: [
        {
          label: "🟢 رأي إيجابي (تقنيات الحج)",
          text: "الخدمات الرقمية وتطبيقات إدارة الحشود المقدمة من شركة وادي مكة ساهمت في تسهيل رحلة العمرة بشكل رائع جداً، والتنظيم الميداني ممتاز."
        },
        {
          label: "🔴 شكوى وحاجة تحسين (عقارات/بنية تحتية)",
          text: "توجد صعوبة في الوصول للمجمع التقني بسبب ازدحام الطريق الدائري، ونأمل توفير مواقف إضافية ومحطات شحن كهربائية وسرعة معالجة الصيانة."
        },
        {
          label: "🟡 استفسار استثماري (وادي مكة للاستثمار)",
          text: "نرغب في معرفة شروط وآليات التقديم على جولة تمويلية من وادي مكة للاستثمار لدعم شركتنا الناشئة في مجال الذكاء الاصطناعي للحافلات."
        },
        {
          label: "🇬🇧 English Positive Review",
          text: "Wadi Makkah's smart mobility solutions for pilgrims were extremely efficient! The interactive AI guide reduced our wait time significantly."
        }
      ],
      resultTitle: "نتائج التحليل الذكي (NLP Output)",
      sentimentLabel: "الانطباع العام (Sentiment):",
      topicLabel: "التصنيف الموضوعي (Topic Category):",
      confidenceLabel: "مستوى الثقة بالنموذج:",
      keywordsLabel: "الكلمات المفتاحية المستخرجة (Extracted Keywords):",
      recommendationLabel: "التوصية التكتيكية للمنشأة:",
      dashboardTitle: "لوحة التحكم وتحليلات الآراء النمطية",
      stats: {
        total: "إجمالي النصوص المحللة",
        positive: "نسبة الإيجابي",
        neutral: "نسبة المحايد",
        negative: "نسبة السلبي"
      },
      historyTitle: "سجل التحليلات الأخيرة",
      clearHistory: "مسح السجل"
    },
    chatbot: {
      badge: "المساعد الذكي الاستثماري (RAG Powered)",
      title: "مساعد سوق الاستثمار بمكة المكرمة (AI Investment Advisor)",
      subtitle: "استفسر باللهجة السعودية/الحجازية أو الإنجليزية عن الفرص الاستثمارية، الحاضنات، تقنيات الحج، ومشروعات وادي مكة.",
      modeStandard: "محرك RAG المعرفي المتقدم (Wadi Makkah Vector Engine)",
      modeLiveGpt: "وضع OpenAI GPT-4o Live API (المفتاح مفعّل)",
      ragActive: "🔍 محرك RAG يسترجع الوثائق الذكية",
      categories: {
        all: "الكل",
        hajjtech: "🚀 تقنيات الحج والعمرة",
        realestate: "🏬 العقارات والأصول",
        knowledge: "💡 المعرفة والملكية الفكرية",
        ventures: "💰 الاستثمار الجريء"
      },
      quickPromptsTitle: "اقتراحات وأسئلة سريعة حسب القطاع:",
      quickPromptsList: [
        { cat: "hajjtech", text: "أنا مستثمر وابغى اسهم في تقنيات الحج والعمرة، كيف اقدر اشتغل مع شركات وادي مكة؟" },
        { cat: "hajjtech", text: "كيف تطور وادي مكة حلول إدارة الحشود واللوجستيات الذكية للحجاج؟" },
        { cat: "realestate", text: "What are the high-yield investment trends in Makkah real estate?" },
        { cat: "realestate", text: "ما هي الأصول العقارية والمجمعات التقنية المتاحة بوادي مكة العقارية؟" },
        { cat: "ventures", text: "ابي تمويل حق شركتي الناشئة، وش شروط وادي مكة للاستثمار؟" },
        { cat: "knowledge", text: "كيف أستفيد من ترخيص براءات الاختراع بجامعة أم القرى؟" }
      ],
      placeholder: "اكتب سؤالك باللهجة السعودية أو العربية أو الإنجليزية (مثال: ابغى تمويل لشركتي)...",
      sendBtn: "إرسال",
      sourcesTitle: "المصادر والمرجعيات:",
      configureApiKey: "تكوين مفتاح OpenAI GPT Live",
      clearChat: "مسح المحادثة",
      exportChat: "تصدير المحادثة",
      helpfulFeedback: "شكراً على التقييم الإيجابي!",
      unhelpfulFeedback: "تم تسجيل ملاحظتك لتحسين النموذج."
    },
    modal: {
      title: "تكوين مفتاح OpenAI GPT API",
      desc: "يمكنك إدخال مفتاح API الخاص بك من OpenAI (اختياري) للاتصال المباشر بنماذج GPT-4o / GPT-4o-mini. في حال عدم إدخاله، سيعمل المساعد بالنموذج الذكي المحلي المخصص لوادي مكة.",
      inputLabel: "OpenAI API Key (sk-...):",
      saveBtn: "حفظ وتفعيل GPT",
      removeBtn: "إزالة المفتاح واستخدام الوضع المحاكي",
      statusActive: "مفتاح API مفعّل وجاهز للاستخدام Live!",
      statusInactive: "يعمل حالياً بوضع المحاكي المتقدم المدمج (Offline / Fast Ready)."
    },
    footer: {
      aboutTitle: "عن شركة وادي مكة للتقنية",
      aboutDesc: "شركة مساهمة مقفلة مملوكة بالكامل لجامعة أم القرى، تعنى بتطوير وتنمية الاقتصاد المعرفي وإنشاء الشراكات الاستثمارية بين الجامعة والقطاع الخاص.",
      quickLinks: "روابط سريعة",
      sectors: "قطاعات المنظومة",
      visionTitle: "شريك في تحقيق رؤية 2030",
      visionDesc: "نحو 30 مليون معتمر وزائر سنوياً باقتصاد معرفي مستدام وتكنولوجيا متطورة.",
      rights: "جميع الحقوق محفوظة © 2026 شركة وادي مكة للتقنية."
    }
  },
  en: {
    nav: {
      brand: "Wadi Makkah Company",
      subBrand: "Umm Al-Qura University Investment Arm",
      home: "Home",
      subsidiaries: "Subsidiaries",
      nlpAnalyzer: "Sentiment & Feedback NLP",
      aiBot: "AI Investment Chatbot",
      metrics: "Metrics",
      openAiKey: "GPT API Settings",
      langSwitch: "العربية",
      dir: "ltr"
    },
    hero: {
      badge: "Saudi Vision 2030 | Knowledge Economy & Innovation",
      title: "Empowering Innovation & Knowledge Economy in Makkah",
      subtitle: "An integrated AI platform combining real-time customer sentiment categorization with an intelligent investment chatbot for Makkah's market & Hajj/Umrah tech ecosystem.",
      pillars: [
        { label: "Innovation", desc: "Pioneering technological solutions", color: "from-blue-500 to-cyan-400" },
        { label: "Quality", desc: "Global engineering & deployment standards", color: "from-purple-500 to-indigo-500" },
        { label: "Motivation", desc: "Empowering entrepreneurs & tech startups", color: "from-emerald-500 to-teal-400" },
        { label: "Enrichment", desc: "Enhancing the journey of Pilgrims & community", color: "from-amber-500 to-yellow-400" }
      ],
      ctaPrimary: "Try NLP Analyzer",
      ctaSecondary: "Ask AI Investment Assistant",
      stats: [
        { value: "+50", label: "Tech Startups Incubated" },
        { value: "+500M", label: "SAR Venture Capital Raised" },
        { value: "+1.5M", label: "Pilgrims Served by Tech" },
        { value: "98.4%", label: "NLP Classification Accuracy" }
      ]
    },
    subsidiaries: {
      badge: "Investment Ecosystem",
      title: "Wadi Makkah Subsidiaries Ecosystem",
      subtitle: "A unified investment and development engine leading technological, real estate, and knowledge transformation in Makkah.",
      cards: [
        {
          id: "ventures",
          title: "Wadi Makkah Ventures",
          titleEn: "Wadi Makkah Ventures",
          tag: "Venture Capital & Incubators",
          desc: "Seed funding, incubators, and venture development for early-stage tech startups, prioritizing Hajj & Umrah tech and smart solutions.",
          metrics: "35+ Portfolio Startups Funded",
          color: "emerald"
        },
        {
          id: "realestate",
          title: "Wadi Makkah Real Estate",
          titleEn: "Wadi Makkah Real Estate",
          tag: "Real Estate & Smart Cities",
          desc: "Developing and managing high-tech parks, innovation hubs, and corporate real estate assets tailored for investors in Holy Makkah.",
          metrics: "100k+ m² Innovation Spaces",
          color: "navy"
        },
        {
          id: "knowledge",
          title: "Wadi Makkah Knowledge",
          titleEn: "Wadi Makkah Knowledge",
          tag: "Knowledge Economy & IP",
          desc: "Commercializing academic research, patents, and scientific discoveries from Umm Al-Qura University into market-ready ventures.",
          metrics: "120+ Patents & Industrial Designs",
          color: "purple"
        },
        {
          id: "hajjtech",
          title: "Hajj & Umrah Tech",
          titleEn: "Hajj & Umrah Tech Ventures",
          tag: "Pilgrim Services Technology",
          desc: "Smart crowd logistics, IoT transport solutions, and digital applications enhancing pilgrim experiences in partnership with authorities.",
          metrics: "12M+ Digital Pilgrim Interactions",
          color: "gold"
        }
      ]
    },
    nlp: {
      badge: "AI NLP Engine",
      title: "Customer Sentiment & Feedback Categorizer",
      subtitle: "Analyze feedback, reviews, and pilgrim sentiments instantly in Arabic and English using natural language processing.",
      inputLabel: "Enter customer review, feedback, or inquiry (Arabic or English):",
      placeholder: "Example: The crowd management app during the Umrah season was super smooth, but we need faster booking for parking slots...",
      analyzeBtn: "Analyze Sentiment Now",
      analyzing: "Processing text & extracting key tags...",
      presetsTitle: "Or try instant sample reviews:",
      presets: [
        {
          label: "🟢 Positive Review (Hajj Tech)",
          text: "The digital services and crowd management apps provided by Wadi Makkah made our Umrah journey extremely organized and seamless!"
        },
        {
          label: "🔴 Constructive Feedback (Real Estate)",
          text: "Heavy traffic near the tech hub entrance makes access difficult. We request adding EV charging stations and expanding parking lots."
        },
        {
          label: "🟡 Investment Query (Ventures)",
          text: "We want to learn about the eligibility criteria for seed funding from Wadi Makkah Ventures for our AI bus dispatching startup."
        },
        {
          label: "🇸🇦 Arabic Sample",
          text: "استثمار وادي مكة في التقنيات الذكية ملموس ورائع، ولكن نحتاج تواصل أسرع مع فريق الدعم الفني."
        }
      ],
      resultTitle: "Intelligent NLP Analysis Output",
      sentimentLabel: "Sentiment Polarity:",
      topicLabel: "Topic Category:",
      confidenceLabel: "Confidence Score:",
      keywordsLabel: "Extracted Key Tags:",
      recommendationLabel: "Strategic Recommendation:",
      dashboardTitle: "Real-time Sentiment Analytics Dashboard",
      stats: {
        total: "Total Analyzed Reviews",
        positive: "Positive Share",
        neutral: "Neutral Share",
        negative: "Negative Share"
      },
      historyTitle: "Recent Analysis History Log",
      clearHistory: "Clear History"
    },
    chatbot: {
      badge: "AI Investment Advisor (RAG Powered)",
      title: "Makkah Investment Market AI Chatbot",
      subtitle: "Ask in natural Arabic, Saudi/Hijazi dialects, or English about investment opportunities, incubators, Hajj tech, and real estate.",
      modeStandard: "Wadi Makkah RAG Vector Engine (Offline Mode)",
      modeLiveGpt: "OpenAI GPT-4o Live API Mode (Key Active)",
      ragActive: "🔍 RAG Vector Document Retrieval Active",
      categories: {
        all: "All",
        hajjtech: "🚀 Hajj & Umrah Tech",
        realestate: "🏬 Real Estate & Assets",
        knowledge: "💡 Knowledge & IP",
        ventures: "💰 Venture Capital & Funding"
      },
      quickPromptsTitle: "Quick Starter Prompts by Category:",
      quickPromptsList: [
        { cat: "hajjtech", text: "How can I invest in Hajj & Umrah tech ventures with Wadi Makkah?" },
        { cat: "hajjtech", text: "What smart crowd management solutions are developed by Wadi Makkah?" },
        { cat: "realestate", text: "What are the high-yield investment trends in Makkah real estate?" },
        { cat: "realestate", text: "What commercial real estate assets are available at High-Tech Park?" },
        { cat: "ventures", text: "How can my tech startup apply for seed funding from Wadi Makkah Ventures?" },
        { cat: "knowledge", text: "How do I license patents registered by Umm Al-Qura University?" }
      ],
      placeholder: "Type your query in Saudi dialect, Arabic, or English (e.g. How to get startup funding?)...",
      sendBtn: "Send",
      sourcesTitle: "Verified RAG References:",
      configureApiKey: "Configure OpenAI GPT Live API Key",
      clearChat: "Clear Chat",
      exportChat: "Export Transcript",
      helpfulFeedback: "Thank you for your feedback!",
      unhelpfulFeedback: "Feedback recorded to refine RAG parameters."
    },
    modal: {
      title: "Configure OpenAI GPT API Key",
      desc: "Optional: Enter your OpenAI API Key (sk-...) to connect live to GPT-4o / GPT-4o-mini. If left blank, the chatbot operates using the built-in Wadi Makkah RAG simulator.",
      inputLabel: "OpenAI API Key (sk-...):",
      saveBtn: "Save & Activate GPT",
      removeBtn: "Remove Key & Use Simulator",
      statusActive: "Live GPT API Key connected!",
      statusInactive: "Operating in Wadi Makkah RAG Knowledge Mode (Offline Ready)."
    },
    footer: {
      aboutTitle: "About Wadi Makkah Company",
      aboutDesc: "A closed joint-stock company wholly owned by Umm Al-Qura University, dedicated to driving the knowledge economy and fostering investment partnerships.",
      quickLinks: "Quick Links",
      sectors: "Ecosystem Sectors",
      visionTitle: "Saudi Vision 2030 Partner",
      visionDesc: "Supporting 30 Million pilgrims annually with a sustainable knowledge economy and high-tech innovation.",
      rights: "All rights reserved © 2026 Wadi Makkah Company for Technology."
    }
  }
};
