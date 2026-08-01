import { useState } from 'react';
import './Referral.css';
import { registerPartner } from '../api';

const STEPS = [
  { step: '01', icon: '📋', title: 'Register Karein', desc: 'Free mein partner bano — koi fees nahi, koi degree required nahi.' },
  { step: '02', icon: '🤝', title: 'Clients Refer Karein', desc: 'Apne network mein JhaTech ke services recommend karein.' },
  { step: '03', icon: '✅', title: 'Sale Confirm Ho', desc: 'Aapke referred client ka sale confirm hone par aapko notification milega.' },
  { step: '04', icon: '💰', title: '₹1,000 Earn Karein', desc: 'Har successful sale par seedha aapke account mein ₹1,000 transfer.' },
];

const FAQS = [
  { q: 'Kya koi qualification chahiye?', a: 'Bilkul nahi! Koi bhi join kar sakta hai — student, housewife, retired person, ya working professional. Sirf ek smartphone chahiye.' },
  { q: 'Paise kab milenge?', a: 'Sale confirm hone ke 7 business days ke andar direct bank transfer ya UPI se payment milti hai.' },
  { q: 'Kitne clients refer kar sakta hoon?', a: 'Unlimited! Jitne zyada clients refer karenge, utna zyada kamayenge. Koi cap nahi hai.' },
  { q: 'Kya training milegi?', a: 'Haan! Aapko AI-powered guidance, product training materials, aur dedicated WhatsApp support group milega.' },
  { q: 'Minimum kitna kama sakte hain?', a: '5 referrals per month = ₹5,000. Many partners earn ₹20,000–₹50,000 per month working part-time.' },
];

const AI_TIPS = [
  { icon: '🎯', tip: 'Local saree shops aur boutiques target karein — unhein sabse zyada online presence ki zaroorat hoti hai.' },
  { icon: '💡', tip: '"Aapka competitor online hai, aap nahi" — yeh line 80% business owners ko convince karti hai.' },
  { icon: '📱', tip: 'WhatsApp status par success stories share karein. Visual proof sabse powerful hota hai.' },
  { icon: '🏪', tip: 'Apne mohalle ke 10 dukaan waalon se personally milein. Face-to-face conversion rate 5x zyada hoti hai.' },
  { icon: '📊', tip: 'Free AI analysis offer karein — jab report milti hai, clients 70% of the time service buy karte hain.' },
];

export default function Referral() {
  const [openFaq,   setOpenFaq]   = useState(null);
  const [tipIndex,  setTipIndex]  = useState(0);
  const [showForm,  setShowForm]  = useState(false);
  const [regForm,   setRegForm]   = useState({ name: '', phone: '', city: '', howHeard: '' });
  const [submitted, setSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError,   setRegError]   = useState('');
  const [partnerData, setPartnerData] = useState(null);

  const handleRegChange = (e) => setRegForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError('');
    try {
      const result = await registerPartner(regForm);
      setPartnerData(result);
      setSubmitted(true);
    } catch (err) {
      setRegError(err.message || 'Registration failed. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <section id="referral" className="section referral-section section-alt">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🤝 Partner Program</div>
          <h2 className="section-title">
            Referral Partner Program —
            <span> ₹1,000 Per Sale</span>
          </h2>
          <p className="section-subtitle">
            Ghar baithe paise kamayein! Koi investment nahi, koi qualification nahi.
            Bas JhaTech ki services recommend karein aur earn karein.
          </p>
        </div>

        {/* Earnings Calculator Banner */}
        <div className="referral-banner">
          <div className="referral-banner__left">
            <div className="referral-banner__emoji">💸</div>
            <div>
              <div className="referral-banner__title">Kitna Kama Sakte Hain?</div>
              <div className="referral-banner__subtitle">Part-time mein bhi achha income possible hai</div>
            </div>
          </div>
          <div className="referral-banner__calc">
            {[
              { ref: 2, earn: '₹2,000' },
              { ref: 5, earn: '₹5,000' },
              { ref: 10, earn: '₹10,000' },
              { ref: 20, earn: '₹20,000' },
            ].map(item => (
              <div key={item.ref} className="calc-item">
                <div className="calc-ref">{item.ref} Sales</div>
                <div className="calc-earn">{item.earn}</div>
                <div className="calc-label">per month</div>
              </div>
            ))}
          </div>
          <button className="btn btn-gold btn-lg" onClick={() => setShowForm(true)}>
            🚀 Join Now — Free!
          </button>
        </div>

        {/* How It Works */}
        <div className="referral-steps">
          <h3 className="referral-steps__title">How It Works</h3>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
                {i < STEPS.length - 1 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Two Columns: AI Tips + FAQs */}
        <div className="referral-bottom grid-2">
          {/* AI Sales Tips */}
          <div className="ai-tips-box">
            <div className="ai-tips__header">
              <span>🤖</span>
              <div>
                <h3>AI Sales Guidance</h3>
                <p>Intelligent tips to help you sell better</p>
              </div>
            </div>
            <div className="ai-tip-card">
              <div className="ai-tip-icon">{AI_TIPS[tipIndex].icon}</div>
              <p className="ai-tip-text">{AI_TIPS[tipIndex].tip}</p>
            </div>
            <div className="ai-tips__nav">
              {AI_TIPS.map((_, i) => (
                <button
                  key={i}
                  className={`tip-dot ${i === tipIndex ? 'tip-dot--active' : ''}`}
                  onClick={() => setTipIndex(i)}
                  aria-label={`Tip ${i + 1}`}
                />
              ))}
            </div>
            <div className="ai-tips__actions">
              <button className="btn btn-secondary btn-sm" onClick={() => setTipIndex(i => (i - 1 + AI_TIPS.length) % AI_TIPS.length)}>
                ← Previous
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setTipIndex(i => (i + 1) % AI_TIPS.length)}>
                Next Tip →
              </button>
            </div>

            <div className="ai-tips__perks">
              <div className="perk-item"><span>✅</span> No qualification needed</div>
              <div className="perk-item"><span>✅</span> Free training materials</div>
              <div className="perk-item"><span>✅</span> WhatsApp support group</div>
              <div className="perk-item"><span>✅</span> Unlimited earning potential</div>
            </div>
          </div>

          {/* FAQs */}
          <div className="referral-faqs">
            <h3 className="faq-title">❓ Frequently Asked Questions</h3>
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Modal */}
        {showForm && !submitted && (
          <div className="referral-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
            <div className="referral-modal">
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
              <div className="modal-header">
                <div className="modal-emoji">🤝</div>
                <h3>Partner Registration</h3>
                <p>Free mein join karein aur earning shuru karein!</p>
              </div>
              <form onSubmit={handleRegSubmit} className="modal-form">
                <div className="form-group">
                  <label className="form-label">Aapka Naam *</label>
                  <input className="form-input" name="name" value={regForm.name} onChange={handleRegChange} placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number *</label>
                  <input className="form-input" name="phone" value={regForm.phone} onChange={handleRegChange} placeholder="+91 XXXXX XXXXX" type="tel" required />
                </div>
                <div className="form-group">
                  <label className="form-label">City / Town *</label>
                  <input className="form-input" name="city" value={regForm.city} onChange={handleRegChange} placeholder="Aapka city" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Aapko JhaTech ke baare mein kaise pata chala?</label>
                  <select className="form-select" name="howHeard" value={regForm.howHeard} onChange={handleRegChange}>
                    <option value="">Select...</option>
                    <option>Friend / Family</option>
                    <option>Social Media</option>
                    <option>Google Search</option>
                    <option>WhatsApp Forward</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={regLoading}>
                  {regLoading ? '⏳ Registering...' : '🚀 Register as Partner — Free!'}
                </button>
                {regError && <div className="reg-error-msg">{regError}</div>}
              </form>
            </div>
          </div>
        )}

        {/* Success State */}
        {submitted && showForm && (
          <div className="referral-modal-overlay" onClick={() => { setShowForm(false); setSubmitted(false); }}>
            <div className="referral-modal referral-modal--success">
              <div className="success-emoji">🎉</div>
              <h3>Registration Successful!</h3>
              {partnerData?.partner_id && (
                <div className="partner-id-box">
                  Your Partner ID: <strong>{partnerData.partner_id}</strong>
                </div>
              )}
              <p>
                Badhai ho <strong>{regForm.name}</strong>! Aap JhaTech Partner Program mein welcome hain.
                {partnerData?.already_exists
                  ? ' Aap pehle se registered hain!'
                  : ' Hum aapko WhatsApp par training materials bhejenge.'}
              </p>
              <a
                href={`https://wa.me/919999999999?text=Hi!%20Maine%20Partner%20Program%20ke%20liye%20register%20kiya%20hai.%20Mera%20naam%20${regForm.name}%20hai,%20Partner%20ID:%20${partnerData?.partner_id ?? ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%' }}
              >
                💬 WhatsApp par Connect Karein
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
