// ============================================================
//  api.js  —  Centralized API calls to PHP backend
//  Falls back to smart local simulation when PHP is unavailable
// ============================================================

const BASE = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : '/api';

// Check if PHP backend is reachable
async function post(endpoint, data) {
  const url = BASE.endsWith('/')
    ? `${BASE}${endpoint}`
    : `${BASE}/${endpoint}`;

  const res = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || `Server error (${res.status})`);
  }

  return json.data;
}

// ============================================================
//  FALLBACK: Smart local AI report generator
//  Used when PHP backend / XAMPP is not running
// ============================================================

const FALLBACK_REPORTS = {
  'Saree Shop / Textile': {
    title: '🥻 Saree Shop Digital Transformation Report',
    insight: 'Aapki saree shop ke liye online presence bahut zaroori hai. 68% textile buyers ab Instagram aur Google par search karte hain. Varanasi, Surat, aur Kanchipuram ki famous shops already online hain — ab aapki baari hai!',
    recommendations: [
      { icon: '🛒', title: 'E-Commerce Website', desc: 'Product catalog, online ordering aur payment gateway ke saath ek professional website banwayein. WhatsApp order button se conversion 40% badhegi. Expected ROI: 3x in 6 months.', priority: 'High' },
      { icon: '📸', title: 'Instagram Shop + Reels', desc: 'Saree showcase ke liye Instagram Shop activate karein. Daily 1-2 Reels se 500+ organic reach milegi. Trending audio use karein — cost zero, reach unlimited!', priority: 'High' },
      { icon: '🎯', title: 'Google My Business', desc: 'Local SEO ke liye GMB optimize karein. "Saree shop near me" searches se daily 20-30 calls milenge. Photos, reviews, aur offers regularly update karein.', priority: 'Medium' },
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
      { icon: '📱', title: 'WhatsApp Order System', desc: 'WhatsApp Business se daily orders lo. Price list PDF bhejo, customers WhatsApp par order karein, aap deliver karein. Zero investment, maximum revenue!', priority: 'High' },
      { icon: '🗺️', title: 'Google Maps Listing', desc: 'Google Maps par apni shop register karein. "Kirana near me" searches se daily 15-25 new customers aa sakte hain. Star ratings collect karein.', priority: 'High' },
      { icon: '🎪', title: 'Local Facebook Page', desc: 'Facebook par daily offers post karein. Mohalle ke local groups mein join ho kar deals share karein — free marketing!', priority: 'Medium' },
      { icon: '💳', title: 'Digital Payment Setup', desc: 'UPI/QR code se payments lo. 35% customers zyada khareedtey hain jab digital payment option ho. PhonePe/Paytm merchant account free mein banao.', priority: 'Medium' },
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
      { icon: '🍕', title: 'Zomato & Swiggy Registration', desc: 'Dono platforms par free listing karein. Commission 18-25% hoti hai lekin new customer base milta hai jo pehle nahi aata tha.', priority: 'High' },
      { icon: '📸', title: 'Food Photography + Instagram', desc: 'Professional-looking food photos se Instagram following banao. Reels mein cooking process dikhao — viral hone ka chance 10x badhta hai.', priority: 'High' },
      { icon: '🌐', title: 'Website + Online Menu', desc: 'Simple website mein digital menu, location, aur WhatsApp order button add karein. Table reservation feature se premium customers attract karein.', priority: 'Medium' },
      { icon: '⭐', title: 'Review Management', desc: 'Google, Zomato par 4.5+ star rating maintain karein. Har customer ko review dene ke liye politely request karein — rating se 40% zyada orders aate hain.', priority: 'Medium' },
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
    insight: 'Aapke business ke liye digital transformation se 200-400% growth possible hai next 12 months mein. India mein 650M+ internet users hain — aapke potential customers online hain, sirf aapko wahan milna hai!',
    recommendations: [
      { icon: '🌐', title: 'Professional Website', desc: 'Mobile-first, fast-loading website jo customers ko convert kare. SEO-optimized content, WhatsApp button, aur Google Analytics ke saath. Expected ROI: 5x in 8 months.', priority: 'High' },
      { icon: '📱', title: 'Social Media Strategy', desc: 'Facebook, Instagram, aur YouTube par consistent brand presence banayein. Weekly content calendar follow karein — 3 posts/week se 1000+ followers 90 days mein.', priority: 'High' },
      { icon: '🎯', title: 'Google Ads + Local SEO', desc: 'Google Ads se targeted customers tak pahunchein. ₹5,000/month budget se start karein. Local SEO se "near me" searches mein top position paayein.', priority: 'Medium' },
      { icon: '📊', title: 'Analytics & Growth Tracking', desc: 'Data-driven decisions ke liye Google Analytics + Search Console setup karein. Monthly reports se kya kaam kar raha hai exactly pata chalega.', priority: 'Low' },
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

// Challenge ID → label map for personalizing the report
const CHALLENGE_LABELS = {
  no_website:   'No website',
  low_sales:    'Low sales',
  no_customers: 'Not getting customers',
  competition:  'High competition',
  no_social:    'No social media',
  no_ads:       'No advertising',
  inventory:    'Inventory issues',
  branding:     'Poor branding',
};

function buildFallbackReport(formData) {
  const base = FALLBACK_REPORTS[formData.businessType] || FALLBACK_REPORTS.default;

  // Personalize the title and insight with the actual business name + city
  return {
    ...base,
    title: base.title.replace('Report', `Report for ${formData.businessName}`),
    insight: `${formData.businessName}, ${formData.city} ke liye: ${base.insight}`,
  };
}

// ============================================================
//  Public API functions — auto-fallback when PHP is down
// ============================================================

/**
 * Send business form data → PHP → OpenAI → real AI report
 * Falls back to smart local report if PHP unavailable
 */
export async function generateAIReport(formData) {
  try {
    return await post('ai-analysis.php', formData);
  } catch (err) {
    // Network error (XAMPP not running) → use smart fallback
    if (err instanceof TypeError || err.message === 'Failed to fetch' || err.message.includes('fetch')) {
      // Simulate a brief delay so loading animation plays naturally
      await new Promise(r => setTimeout(r, 2000));
      return buildFallbackReport(formData);
    }
    // Real server errors (4xx/5xx) → re-throw
    throw err;
  }
}

/**
 * Register a new referral partner
 * Falls back to local success simulation if PHP unavailable
 */
export async function registerPartner(partnerData) {
  try {
    return await post('referral-register.php', partnerData);
  } catch (err) {
    if (err instanceof TypeError || err.message.includes('fetch')) {
      await new Promise(r => setTimeout(r, 800));
      // Generate a local partner ID so UI still works
      const pid = 'JT' + Math.random().toString(36).slice(2, 8).toUpperCase();
      return {
        partner_id: pid,
        name:       partnerData.name,
        city:       partnerData.city,
        status:     'active',
      };
    }
    throw err;
  }
}

/**
 * Save a contact / WhatsApp inquiry lead
 * Silently succeeds if PHP unavailable (no disruption to user)
 */
export async function saveContactInquiry(contactData) {
  try {
    return await post('contact.php', contactData);
  } catch {
    // Silently ignore — contact fallback is WhatsApp button anyway
    return null;
  }
}
