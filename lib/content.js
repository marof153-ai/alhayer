// كل النصوص هنا. عدّل العربية والإنجليزية من هذا الملف فقط.
const ar = {
  lang: "ar", dir: "rtl", other: "en", switchLabel: "English",
  name: "الهير الشرقية", tagline: "نزرع المساحة، ونُنبت لها حياة",
  meta: { title: "الهير الشرقية | تصميم وتنفيذ الحدائق وحلول زراعية متكاملة", desc: "تصميم وتنفيذ الحدائق، أنظمة الري، العشب الطبيعي والصناعي، الأشجار والمسطحات الخضراء في الإمارات. اطلب عرض سعر مجاني." },
  nav: { services: "خدماتنا", projects: "مشاريعنا", process: "كيف نعمل", faq: "الأسئلة الشائعة", cta: "اطلب عرض سعر" },
  hero: { h1: ["مساحتك الخضراء", "تبدأ من هنا"], p: "نصمم وننفذ ونعتني بالحدائق والمشاريع الزراعية في الإمارات، من الفكرة حتى آخر شجرة.", cta1: "ابدأ مشروعك", cta2: "تحدث معنا واتساب" },
  trust: [["معاينة مجانية", "يزور مهندسنا موقعك دون أي التزام."], ["عرض واضح", "مخطط وتكلفة ومدة قبل أن تقرر."], ["نباتات تناسب مناخنا", "أصناف مختارة لحرارة الإمارات."], ["فريق واحد", "من التصميم إلى الصيانة اليومية."]],
  services: { title: "خدمات زراعية متكاملة", lead: "سبع خدمات تغطي مشروعك من التخطيط إلى العناية اليومية.",
    items: {
      design: ["تصميم الحدائق", "ابتكار مخططات تحول مساحتكم إلى لوحات فنية طبيعية فريدة."],
      build: ["تنفيذ الحدائق", "بناء وتنسيق المواقع بأعلى معايير الجودة وبإشراف مهندسين متخصصين."],
      irrigation: ["أنظمة الري", "تركيب وصيانة تقنيات الري الحديثة لترشيد الاستهلاك وضمان صحة النباتات."],
      "natural-grass": ["العشب الطبيعي", "توريد وتركيب أجود أنواع العشب الطبيعي المتلائم مع بيئة الإمارات."],
      "artificial-grass": ["العشب الصناعي", "توريد وتركيب العشب الصناعي عالي الجودة بمظهر طبيعي ودوام طويل."],
      trees: ["الأشجار", "زراعة وصيانة كافة أنواع الأشجار المثمرة وأشجار الزينة بأسلوب علمي."],
      lawns: ["المسطحات الخضراء", "صيانة شاملة للمسطحات الخضراء والملاعب لضمان نضارتها طوال العام."],
    } },
  projects: { title: "مشاريعنا", lead: "نماذج من أعمال نفذناها، من حدائق المنازل إلى المزارع والمساحات العامة.", all: "الكل", unit: "م²", cta: "لديك مشروع مشابه؟", btn: "اطلب عرض سعر" },
  process: { title: "من الطلب إلى التسليم", steps: [["أرسل طلبك", "عبّر عن احتياجك في دقيقتين عبر النموذج."], ["معاينة الموقع", "يزور مهندسنا المساحة ويقيس ويقترح."], ["عرض سعر ومخطط", "تصلك خطة واضحة بالتكلفة والمدة."], ["التنفيذ والتسليم", "نزرع وننفذ ونسلّمك حديقة جاهزة."]] },
  faq: { title: "أسئلة يطرحها عملاؤنا", items: [
    ["هل المعاينة مجانية؟", "نعم، المعاينة وعرض السعر مجانيان دون التزام."],
    ["كم يستغرق تنفيذ حديقة؟", "يعتمد على المساحة ونوع الخدمات. نحدد المدة بدقة في عرض السعر بعد المعاينة."],
    ["هل تقدمون خدمة الصيانة بعد التنفيذ؟", "نعم، نقدم صيانة دورية للحدائق والمسطحات وأنظمة الري."],
    ["أي المدن تخدمون؟", "نخدم جميع إمارات الدولة. اختر مدينتك في النموذج وسنؤكد لك التفاصيل."],
  ] },
  request: { title: "اطلب عرض سعر مجاني", lead: "كلما كانت التفاصيل أدق، كان عرضنا أقرب لما تريد.",
    side: { h: "ماذا يحدث بعد الإرسال؟", list: ["نراجع طلبك ونتواصل معك خلال 24 ساعة.", "نحدد موعد المعاينة في موقعك.", "تستلم عرض السعر والمخطط."], or: "أو تواصل مباشرة" } },
  form: {
    tabs: ["بياناتك", "مشروعك", "التفاصيل"], name: "الاسم الكامل", phone: "رقم الجوال", email: "البريد الإلكتروني (اختياري)", city: "المدينة", choose: "اختر", address: "المنطقة / العنوان",
    space: "نوع المساحة", services: "الخدمات المطلوبة (يمكن اختيار أكثر من خدمة)", area: "المساحة التقريبية (م²)", plans: "لدي مخططات أو صور للموقع",
    budget: "الميزانية التقريبية (درهم)", timeline: "متى تريد البدء؟", notes: "ملاحظات إضافية", notesPh: "مثال: أريد جلسة خارجية مظللة مع نظام ري ذكي…",
    next: "التالي", back: "السابق", send: "أرسل الطلب", sending: "جارٍ الإرسال…",
    e0: "أدخل الاسم ورقم الجوال والمدينة.", e1: "اختر نوع المساحة وخدمة واحدة على الأقل.", eSrv: "تعذر إرسال الطلب. حاول مرة أخرى أو تواصل معنا عبر واتساب.",
    doneT: "وصلنا طلبك", doneP: "سيتواصل معك فريقنا خلال 24 ساعة لتحديد موعد المعاينة.", wa: "تابع معنا على واتساب",
    spaces: [["villa", "فيلا / منزل"], ["farm", "مزرعة / عزبة"], ["commercial", "مشروع تجاري"], ["public", "حديقة عامة / مجمع"], ["other", "أخرى"]],
    budgets: [["b1", "أقل من 20 ألف"], ["b2", "20 – 50 ألف"], ["b3", "50 – 150 ألف"], ["b4", "أكثر من 150 ألف"], ["b5", "لم أحدد بعد"]],
    timelines: [["t1", "فوراً"], ["t2", "خلال شهر"], ["t3", "خلال 3 أشهر"], ["t4", "أستكشف فقط"]],
    cities: [["abudhabi", "أبوظبي"], ["dubai", "دبي"], ["sharjah", "الشارقة"], ["ajman", "عجمان"], ["uaq", "أم القيوين"], ["rak", "رأس الخيمة"], ["fujairah", "الفجيرة"], ["alain", "العين"], ["other", "أخرى"]],
    tagline: "نؤمن بأن الحديقة هي روح المكان، نسخر خبراتنا لتنسيق مساحات خضراء تفيض بالجمال الرائع لتواكب أرقى المعايير والمواصفات.",
    footer: {
      aboutTitle: "الهير الشرقية",
      quickLinksTitle: "روابط سريعة",
      contactTitle: "تواصل معنا",
      location: "أبوظبي، الإمارات العربية المتحدة",
      poBox: "ص.ب: 53064",
      copyright: "جميع الحقوق محفوظة."
      
    },
  },
};

const en = {
  lang: "en", dir: "ltr", other: "ar", switchLabel: "العربية",
  name: "Alhayer Eastern", tagline: "We plant the space, and bring it to life",
  meta: { title: "Alhayer Eastern | Landscaping & Complete Agricultural Solutions", desc: "Garden design and construction, irrigation systems, natural and artificial grass, trees and lawns across the UAE. Request a free quote." },
  nav: { services: "Services", projects: "Our work", process: "How we work", faq: "FAQ", cta: "Get a quote" },
  hero: { h1: ["Your green space", "starts here"], p: "We design, build and care for gardens and agricultural projects across the UAE, from the first sketch to the last tree.", cta1: "Start your project", cta2: "Chat on WhatsApp" },
  trust: [["Free site visit", "Our engineer visits your site, no commitment."], ["A clear offer", "Plan, cost and timeline before you decide."], ["Plants for our climate", "Species chosen for UAE heat."], ["One team", "From design to daily upkeep."]],
  services: { title: "Complete agricultural solutions", lead: "Seven services that cover your project from planning to daily care.",
    items: {
      design: ["Garden design", "Layouts that turn your space into a one-of-a-kind natural canvas."],
      build: ["Garden construction", "Built and finished to the highest standards, supervised by specialist engineers."],
      irrigation: ["Irrigation systems", "Modern irrigation installed and maintained to save water and keep plants healthy."],
      "natural-grass": ["Natural grass", "Supply and installation of premium grass suited to the UAE climate."],
      "artificial-grass": ["Artificial grass", "High-quality artificial turf that looks natural and lasts."],
      trees: ["Trees", "Planting and care for fruit and ornamental trees, done the scientific way."],
      lawns: ["Green lawns", "Full upkeep of lawns and fields so they stay lush all year."],
    } },
  projects: { title: "Our work", lead: "A selection of projects we delivered, from home gardens to farms and public spaces.", all: "All", unit: "m²", cta: "Have a similar project?", btn: "Get a quote" },
  process: { title: "From request to handover", steps: [["Send your request", "Tell us what you need in two minutes."], ["Site visit", "Our engineer measures and proposes."], ["Quote and plan", "A clear plan with cost and timeline."], ["Build and handover", "We plant, build and hand over a finished garden."]] },
  faq: { title: "What clients ask us", items: [
    ["Is the site visit free?", "Yes. The visit and the quote are free and carry no obligation."],
    ["How long does a garden take?", "It depends on size and services. We give an exact timeline in your quote after the visit."],
    ["Do you offer maintenance after construction?", "Yes, we offer regular upkeep for gardens, lawns and irrigation systems."],
    ["Which cities do you cover?", "All emirates. Pick your city in the form and we will confirm the details."],
  ] },
  request: { title: "Request a free quote", lead: "The more detail you give, the closer our offer will be to what you want.",
    side: { h: "What happens next?", list: ["We review your request and call you within 24 hours.", "We schedule a visit at your site.", "You receive the quote and plan."], or: "Or reach us directly" } },
  form: {
    tabs: ["About you", "Your project", "Details"], name: "Full name", phone: "Mobile number", email: "Email (optional)", city: "City", choose: "Select", address: "Area / address",
    space: "Type of space", services: "Services you need (select all that apply)", area: "Approximate area (m²)", plans: "I have plans or photos of the site",
    budget: "Approximate budget (AED)", timeline: "When do you want to start?", notes: "Additional notes", notesPh: "e.g. I want a shaded outdoor seating area with smart irrigation…",
    next: "Next", back: "Back", send: "Send request", sending: "Sending…",
    e0: "Enter your name, mobile number and city.", e1: "Choose a type of space and at least one service.", eSrv: "We couldn't send your request. Try again or reach us on WhatsApp.",
    doneT: "We got your request", doneP: "Our team will contact you within 24 hours to schedule the site visit.", wa: "Continue on WhatsApp",
    spaces: [["villa", "Villa / home"], ["farm", "Farm"], ["commercial", "Commercial project"], ["public", "Public park / compound"], ["other", "Other"]],
    budgets: [["b1", "Under 20k"], ["b2", "20k – 50k"], ["b3", "50k – 150k"], ["b4", "Over 150k"], ["b5", "Not decided"]],
    timelines: [["t1", "Right away"], ["t2", "Within a month"], ["t3", "Within 3 months"], ["t4", "Just exploring"]],
    cities: [["abudhabi", "Abu Dhabi"], ["dubai", "Dubai"], ["sharjah", "Sharjah"], ["ajman", "Ajman"], ["uaq", "Umm Al Quwain"], ["rak", "Ras Al Khaimah"], ["fujairah", "Fujairah"], ["alain", "Al Ain"], ["other", "Other"]],
    
  },
  tagline: "We believe a garden is the soul of a place. We harness our expertise to design green spaces overflowing with beauty to meet the highest standards.",
    footer: {
      aboutTitle: "Al Hayer Eastern",
      quickLinksTitle: "Quick Links",
      contactTitle: "Contact Us",
      location: "Abu Dhabi, United Arab Emirates",
      poBox: "P.O.Box: 53064",
      copyright: "All rights reserved."
      },
};

export const content = { ar, en };
export const LANGS = ["ar", "en"];
