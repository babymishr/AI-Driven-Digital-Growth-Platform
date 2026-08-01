import { useState } from 'react';
import './PainAnalysis.css';
import { generateAIReport } from '../api';

const BUSINESS_TYPES = [
  'Saree Shop / Textile', 'Kirana Store', 'Restaurant / Dhaba', 'Jewellery Shop',
  'Coaching / Education', 'Medical / Pharmacy', 'Electronics Store', 'Clothing Boutique',
  'Real Estate', 'Salon / Beauty Parlour', 'Agriculture / Farming', 'Other',
];

const CHALLENGES = [
  { id: 'no_website',     label: '🌐 No Website / Online Presence' },
  { id: 'low_sales',      label: '📉 Low Sales / Revenue'           },
  { id: 'no_customers',   label: '👥 Not Getting New Customers'     },
  { id: 'competition',    label: '⚔️ High Local Competition'        },
  { id: 'no_social',      label: '📱 No Social Media Presence'     },
  { id: 'no_ads',         label: '📢 Don\'t Know How to Advertise'  },
  { id: 'inventory',      label: '📦 Inventory Management Issues'  },
  { id: 'branding',       label: '🎨 Poor Branding / Identity'      },
];

export default function PainAnalysis() {
  const [step,    setStep]    = useState(1); // 1=form, 2=loading, 3=report, 4=error
  const [report,  setReport]  = useState(null);
  const [apiError, setApiError] = useState('');
  const [form,    setForm]    = useState({
    ownerName: '', phone: '', businessName: '',
    businessType: '', city: '', monthlyRevenue: '',
    challenges: [], description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const toggleChallenge = (id) => {
    setForm(prev => ({
      ...prev,
      challenges: prev.challenges.includes(id)
        ? prev.challenges.filter(c => c !== id)
        : [...prev.challenges, id],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.ownerName.trim())    e.ownerName    = 'Naam zaroori hai';
    if (!form.phone.trim())        e.phone        = 'Phone number zaroori hai';
    if (!form.businessName.trim()) e.businessName = 'Business naam zaroori hai';
    if (!form.businessType)        e.businessType = 'Business type chunein';
    if (!form.city.trim())         e.city         = 'City zaroori hai';
    if (form.challenges.length === 0) e.challenges = 'Kam se kam ek challenge chunein';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStep(2);
    setApiError('');

    try {
      const result = await generateAIReport(form);
      setReport(result);
      setStep(3);
    } catch (err) {
      setApiError(err.message || 'Kuch problem hui. Please dobara try karein.');
      setStep(4);
    }
  };

  const resetForm = () => {
    setStep(1);
    setReport(null);
    setApiError('');
    setForm({ ownerName:'', phone:'', businessName:'', businessType:'', city:'', monthlyRevenue:'', challenges:[], description:'' });
    setErrors({});
  };

  return (
    <section id="analysis" className="section section-alt pain-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">🤖 AI-Powered Analysis</div>
          <h2 className="section-title">
            Free Business <span>Pain-Point Analysis</span>
          </h2>
          <p className="section-subtitle">
            Apne business ki problems batayein — hamara AI 30 seconds mein ek personalized
            digital growth report tayaar karega bilkul free!
          </p>
        </div>

        <div className="pain-wrapper">
          {/* Left: Benefits */}
          <div className="pain-benefits">
            <div className="pain-benefits__header">
              <div className="pain-benefits__icon">🎯</div>
              <h3>Report Mein Milega:</h3>
            </div>
            <ul className="pain-benefits__list">
              {[
                ['✅', 'Personalized website recommendations'],
                ['✅', 'Digital marketing strategy'],
                ['✅', 'Estimated monthly budget'],
                ['✅', 'Expected revenue increase'],
                ['✅', 'Competitor analysis summary'],
                ['✅', 'Step-by-step action plan'],
              ].map(([icon, text]) => (
                <li key={text}><span>{icon}</span>{text}</li>
              ))}
            </ul>

            <div className="pain-benefits__trust">
              <div className="pain-trust-item">
                <div className="pain-trust-num">500+</div>
                <div className="pain-trust-label">Reports Generated</div>
              </div>
              <div className="pain-trust-item">
                <div className="pain-trust-num">Free</div>
                <div className="pain-trust-label">No Cost</div>
              </div>
              <div className="pain-trust-item">
                <div className="pain-trust-num">30s</div>
                <div className="pain-trust-label">Instant Report</div>
              </div>
            </div>
          </div>

          {/* Right: Form / Loading / Report */}
          <div className="pain-form-box">
            {step === 1 && (
              <form onSubmit={handleSubmit} className="pain-form" noValidate>
                <h3 className="pain-form__title">📋 Business Information Form</h3>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Owner Name *</label>
                    <input className={`form-input ${errors.ownerName ? 'input-error' : ''}`} name="ownerName" value={form.ownerName} onChange={handleChange} placeholder="Aapka naam" />
                    {errors.ownerName && <span className="error-msg">{errors.ownerName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input className={`form-input ${errors.phone ? 'input-error' : ''}`} name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" type="tel" />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Business Name *</label>
                    <input className={`form-input ${errors.businessName ? 'input-error' : ''}`} name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business ka naam" />
                    {errors.businessName && <span className="error-msg">{errors.businessName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input className={`form-input ${errors.city ? 'input-error' : ''}`} name="city" value={form.city} onChange={handleChange} placeholder="Aapka city/town" />
                    {errors.city && <span className="error-msg">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Business Type *</label>
                  <select className={`form-select ${errors.businessType ? 'input-error' : ''}`} name="businessType" value={form.businessType} onChange={handleChange}>
                    <option value="">-- Business type chunein --</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.businessType && <span className="error-msg">{errors.businessType}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Monthly Revenue (Approximate)</label>
                  <select className="form-select" name="monthlyRevenue" value={form.monthlyRevenue} onChange={handleChange}>
                    <option value="">-- Select range --</option>
                    <option>Under ₹50,000</option>
                    <option>₹50,000 – ₹2,00,000</option>
                    <option>₹2,00,000 – ₹5,00,000</option>
                    <option>₹5,00,000 – ₹10,00,000</option>
                    <option>Above ₹10,00,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Business Challenges * (multiple select kar sakte hain)</label>
                  <div className={`pain-challenges ${errors.challenges ? 'challenges-error' : ''}`}>
                    {CHALLENGES.map(ch => (
                      <button
                        key={ch.id}
                        type="button"
                        className={`challenge-chip ${form.challenges.includes(ch.id) ? 'challenge-chip--active' : ''}`}
                        onClick={() => toggleChallenge(ch.id)}
                      >
                        {ch.label}
                      </button>
                    ))}
                  </div>
                  {errors.challenges && <span className="error-msg">{errors.challenges}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Information (Optional)</label>
                  <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Koi specific problem ya goal jo aap share karna chahte hain..." rows={3} />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  🤖 Generate My Free AI Report →
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="pain-loading">
                <div className="pain-loading__brain">🧠</div>
                <h3>AI Analyzing Your Business...</h3>
                <p>Personalized report tayaar ho rahi hai</p>
                <div className="pain-loading__steps">
                  {['Business data processing...', 'Market research analyzing...', 'Recommendations generating...'].map((s, i) => (
                    <div key={i} className="pain-loading__step" style={{ animationDelay: `${i * 0.8}s` }}>
                      <div className="pain-loading__spinner" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && report && (
              <div className="pain-report">
                <div className="pain-report__header">
                  <div className="pain-report__badge">✅ AI Report Ready</div>
                  <h3>{report.title}</h3>
                  <p className="pain-report__insight">💡 {report.insight}</p>
                </div>

                <div className="pain-report__recommendations">
                  {report.recommendations.map((rec, i) => (
                    <div key={i} className="pain-rec-card">
                      <div className="pain-rec-card__top">
                        <span className="pain-rec-icon">{rec.icon}</span>
                        <div>
                          <div className="pain-rec-title">{rec.title}</div>
                          <span className={`tag ${rec.priority === 'High' ? 'tag-red' : rec.priority === 'Medium' ? 'tag-gold' : 'tag-green'}`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                      </div>
                      <p className="pain-rec-desc">{rec.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Wins (new from AI) */}
                {report.quickWins && report.quickWins.length > 0 && (
                  <div className="pain-quick-wins">
                    <h4>⚡ Quick Wins — Is Hafte Karein:</h4>
                    <ul>
                      {report.quickWins.map((win, i) => (
                        <li key={i}>✓ {win}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {report.competitor_insight && (
                  <div className="pain-competitor-insight">
                    <span>🔍 Competitor Insight:</span> {report.competitor_insight}
                  </div>
                )}

                <div className="pain-report__summary">
                  <div className="pain-summary-item">
                    <span>💰 Recommended Budget</span>
                    <strong>{report.monthlyBudget}/month</strong>
                  </div>
                  <div className="pain-summary-item">
                    <span>📈 Expected Revenue Boost</span>
                    <strong>{report.expectedRevenue}</strong>
                  </div>
                </div>

                <div className="pain-report__actions">
                  <a
                    href={`https://wa.me/919999999999?text=Hi%20JhaTech!%20Maine%20AI%20report%20dekhi%20aur%20main%20apna%20business%20grow%20karna%20chahta%20hoon.%20Business:%20${form.businessName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    style={{ flex: 1 }}
                  >
                    💬 Expert se Baat Karein
                  </a>
                  <button className="btn btn-secondary" onClick={resetForm}>
                    🔄 New Analysis
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="pain-error">
                <div className="pain-error__icon">⚠️</div>
                <h3>Kuch problem hui</h3>
                <p>{apiError}</p>
                <div className="pain-error__actions">
                  <button className="btn btn-primary" onClick={resetForm}>
                    🔄 Dobara Try Karein
                  </button>
                  <a
                    href="https://wa.me/919999999999?text=Hi!%20AI%20analysis%20mein%20problem%20aa%20rahi%20hai%2C%20please%20help%20karein."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    💬 WhatsApp Support
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
