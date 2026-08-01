// ============================================================
//  api.js  —  Direct OpenAI API calls from React
//  API key: set VITE_OPENAI_API_KEY in Vercel environment variables
// ============================================================

const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// ============================================================
//  FALLBACK: Smart local report when no API key set
// ============================================================
const FALLBACK_REPORTS = {
  'Saree Shop / Textile': {
    title: '🥻 Saree Shop Digital Transformation Report',
    insight: 'Aapki saree shop ke liye online presence bahut zaroori hai. 68% textile buyers ab Instagram aur Google par search karte hain. Varanasi, Surat aur Kanchipuram ki famous shops already online hain — ab aapki baari hai!',
    recommendations: [
      { icon: '🛒', title: 'E-Commerce Website', desc: 'Product catalog, online ordering aur payment gateway ke saath ek professional website banwayein. WhatsApp order button se conversion 40% badhegi. Expected ROI: 3x in 6 months.', priority: 'High' },
      { icon: '📸', title: 'Instagram Shop + Reels', desc: 'Saree showcase ke liye Instagram Shop activate karein. Daily 1-2 Reels se 500+ organic reach milegi aur festival season mein 10x orders possible hain.', priority: 'High' },
      { icon: '🎯', title: 'Google My Business', desc: 'Local SEO ke liye GMB optimize karein. "Saree shop near me" searches se daily 20-30 calls milenge. Photos, reviews aur offers regularly update karein.', priority: 'Medium' },
      { icon: '💌', title: 'WhatsApp Business Catalog', desc: 'WhatsApp Business catalog se customers directly order kar sakein. Broadcast list se festival offers bhejein — 90% message open rate guaranteed!', priority: 'Medium' },
    ],
    quickWins: [
      'Aaj hi Google My Business par free listing banayein',
      'WhatsApp Business app install karein aur catalog add karein',
      '5 best-selling sarees ki photos lekar Instagram par post karein',
      'Existing customers ka WhatsApp group banayein',
    ],
    competitor_insight: 'Aapke area ke top saree shops already Instagram par active hain aur monthly ₹2-3L extra online se kama rahe hain.',
    monthlyBudget: '₹15,000 – ₹25,000',
    expectedRevenue: '₹2L – ₹5L additional per month',
  },
  'Kirana Store': {
    title: '🏪 Kirana Store Digital Growth Report',
    insight: 'Kirana stores ke liye hyperlocal digital presence game-changer hai. Quick Commerce apps se competition badh rahi hai — lekin aapka personal touch aur local trust unse zyada powerful hai.',
    recommendations: [
      { icon: '📱', title: 'WhatsApp Order System', desc: 'WhatsApp Business se daily orders lo. Price list PDF bhejo, customers order karein, aap deliver karein. Zero investment, maximum revenue!', priority: 'High' },
      { icon: '🗺️', title: 'Google Maps Listing', desc: 'Google Maps par apni shop register karein. "Kirana near me" searches se daily 15-25 new customers aa sakte hain.', priority: 'High' },
      { icon: '🎪', title: 'Local Facebook Page', desc: 'Facebook par daily offers post karein. Mohalle ke local groups mein deals share karein — free marketing!', priority: 'Medium' },
      { icon: '💳', title: 'UPI Payment Setup', desc: 'UPI/QR code se payments lo. 35% customers zyada khareedtey hain jab digital payment option ho.', priority: 'Medium' },
    ],
    quickWins: [
      'Google Maps par free business listing create karein',
      'WhatsApp Business install karein aur daily price list share karein',
      'UPI QR code print karvakar counter par lagayein',
      'Regular customers ka loyalty card system shuru karein',
    ],
    competitor_insight: 'Nearby kirana stores jo WhatsApp orders accept karte hain unki monthly revenue 30-40% zyada hai.',
    monthlyBudget: '₹5,000 – ₹10,000',
    expectedRevenue: '₹50,000 – ₹1.5L additional per month',
  },
  'Restaurant / Dhaba': {
    title: '🍽️ Restaurant Digital Marketing Report',
    insight: 'Food delivery apps aur online ordering ka trend explosion par hai. Zomato/Swiggy par registered restaurants ki revenue average 60% zyada hoti hai.',
    recommendations: [
      { icon: '🍕', title: 'Zomato & Swiggy Registration', desc: 'Dono platforms par listing karein. Commission 18-25% hoti hai lekin new customer base milta hai jo pehle nahi aata tha.', priority: 'High' },
      { icon: '📸', title: 'Food Photography + Instagram', desc: 'Professional-looking food photos se Instagram following banao. Reels mein cooking process dikhao — viral hone ka chance 10x badhta hai.', priority: 'High' },
      { icon: '🌐', title: 'Website + Online Menu', desc: 'Simple website mein digital menu, location aur WhatsApp order button add karein.', priority: 'Medium' },
      { icon: '⭐', title: 'Review Management', desc: 'Google, Zomato par 4.5+ star rating maintain karein. Rating se 40% zyada orders aate hain.', priority: 'Medium' },
    ],
    quickWins: [
      'Zomato merchant portal par free registration karein aaj hi',
      '5 best dishes ki professional photos lein',
      'Google My Business mein menu aur photos update karein',
      'Happy customers se Google review maangein',
    ],
    competitor_insight: 'Area ke top restaurants Swiggy/Zomato se 40-60% revenue generate kar rahe hain.',
    monthlyBudget: '₹10,000 – ₹20,000',
    expectedRevenue: '₹1L – ₹3L additional per month',
  },
  default: {
    title: '📊 Personalized Digital Growth Strategy',
    insight: 'Aapke business ke liye digital transformation se 200-400% growth possible hai next 12 months mein. India mein 650M+ internet users hain — aapke potential customers online hain!',
    recommendations: [
      { icon: '🌐', title: 'Professional Website', desc: 'Mobile-first, fast-loading website jo customers ko convert kare. SEO-optimized content, WhatsApp button aur Google Analytics ke saath.', priority: 'High' },
      { icon: '📱', title: 'Social Media Strategy', desc: 'Facebook, Instagram aur YouTube par consistent brand presence banayein. Weekly 3 posts se 1000+ followers 90 days mein.', priority: 'High' },
      { icon: '🎯', title: 'Google Ads + Local SEO', desc: 'Google Ads se targeted customers tak pahunchein. ₹5,000/month budget se start karein. Local SEO se "near me" searches mein top position.', priority: 'Medium' },
      { icon: '📊', title: 'Analytics & Tracking', desc: 'Google Analytics + Search Console setup karein. Monthly reports se exactly pata chalega kya kaam kar raha hai.', priority: 'Low' },
    ],
    quickWins: [
      'Google My Business par free listing banayein',
      'WhatsApp Business account setup karein',
      'Facebook Business Page create karein',
      'Google Search Console se website performance check karein',
    ],
    competitor_insight: 'Aapke competitors jo digital marketing use kar rahe hain unki growth rate 3-5x zyada hai.',
    monthlyBudget: '₹10,000 – ₹20,000',
    expectedRevenue: '₹1L – ₹3L additional per month',
  },
};

function buildFallbackReport(formData) {
  const base = FALLBACK_REPORTS[formData.businessType] || FALLBACK_REPORTS.default;
  return {
    ...base,
    title: base.title.replace('Report', `Report for ${formData.businessName}`),
    insight: `${formData.businessName}, ${formData.city} ke liye: ${base.insight}`,
  };
}

// ============================================================
//  Direct OpenAI API call
// ============================================================
async function callOpenAI(formData) {
  const challengeMap = {
    no_website:   'No website or online presence',
    low_sales:    'Low sales and revenue',
    no_customers: 'Not getting new customers',
    competition:  'High local competition',
    no_social:    'No social media presence',
    no_ads:       'Does not know how to advertise',
    inventory:    'Inventory management issues',
    branding:     'Poor branding and identity',
  };

  const challenges = (formData.challenges || [])
    .map(id => challengeMap[id] || id)
    .join(', ');

  const prompt = `You are an expert digital marketing consultant for Indian SMEs.
Analyze this business and generate a personalized digital growth report in Hinglish (mix of Hindi and English).

Business: ${formData.businessName}
Type: ${formData.businessType}
City: ${formData.city}
Monthly Revenue: ${formData.monthlyRevenue || 'Not specified'}
Challenges: ${challenges}
Additional Info: ${formData.description || 'None'}

Respond with ONLY valid JSON in this exact format:
{
  "title": "Report title mentioning business name",
  "insight": "2-3 sentence market insight in Hinglish",
  "recommendations": [
    {"icon": "emoji", "title": "title", "desc": "2-3 sentence detailed advice in Hinglish with ROI numbers", "priority": "High"}
  ],
  "quickWins": ["action 1", "action 2", "action 3", "action 4"],
  "competitor_insight": "one sentence about competitors",
  "monthlyBudget": "₹X,XXX – ₹X,XXX",
  "expectedRevenue": "₹X,XXX – ₹X,XXX additional per month"
}
Provide exactly 4 recommendations. Only JSON, no markdown.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1200,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';

  // Strip markdown fences if present
  const clean = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const report = JSON.parse(clean);
  return report;
}

// ============================================================
//  Public API functions
// ============================================================

/**
 * Generate AI business report
 * - If VITE_OPENAI_API_KEY is set → calls OpenAI directly
 * - Otherwise → returns smart fallback report
 */
export async function generateAIReport(formData) {
  if (OPENAI_KEY) {
    try {
      return await callOpenAI(formData);
    } catch (err) {
      console.warn('OpenAI call failed, using fallback:', err.message);
      await new Promise(r => setTimeout(r, 1000));
      return buildFallbackReport(formData);
    }
  }
  // No API key — use smart fallback
  await new Promise(r => setTimeout(r, 2000));
  return buildFallbackReport(formData);
}

/**
 * Register referral partner (local simulation — no PHP needed)
 */
export async function registerPartner(partnerData) {
  await new Promise(r => setTimeout(r, 800));
  const pid = 'JT' + Math.random().toString(36).slice(2, 8).toUpperCase();
  return {
    partner_id: pid,
    name:       partnerData.name,
    city:       partnerData.city,
    status:     'active',
  };
}

/**
 * Save contact inquiry (no-op without PHP — WhatsApp button handles this)
 */
export async function saveContactInquiry() {
  return null;
}
