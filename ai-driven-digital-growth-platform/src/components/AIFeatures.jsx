import { useState } from 'react';
import './AIFeatures.css';

const COMPETITORS = [
  { name: 'Your Shop', score: 82, color: '#6c3de0', icon: '🏪' },
  { name: 'Competitor A', score: 65, color: '#ef4444', icon: '🏬' },
  { name: 'Competitor B', score: 71, color: '#f59e0b', icon: '🏭' },
  { name: 'Competitor C', score: 48, color: '#6b7280', icon: '🏢' },
];

const TRENDS = [
  { trend: '🎥 Video Commerce', growth: '+340%', status: 'hot', desc: 'Short product videos convert 5x better than photos' },
  { trend: '🤖 AI Chatbots', growth: '+280%', status: 'hot', desc: 'Automated 24/7 customer service is must-have' },
  { trend: '🌙 Dark Mode Websites', growth: '+190%', status: 'rising', desc: '60% users prefer dark mode option' },
  { trend: '📍 Hyperlocal SEO', growth: '+220%', status: 'hot', desc: '"Near me" searches growing rapidly in Tier 2/3 cities' },
  { trend: '💳 UPI-First Checkout', growth: '+410%', status: 'hot', desc: 'UPI integration boosts conversion by 35%' },
  { trend: '🗣️ Voice Search Opt.', growth: '+150%', status: 'rising', desc: 'Hindi voice search optimization gaining traction' },
];

const AI_FEATURES = [
  {
    icon: '🔍',
    title: 'Competitor Analysis',
    desc: 'Real-time tracking of what your competitors are doing online — their keywords, social activity, and pricing.',
    tag: 'AI Powered',
    tagColor: 'tag-purple',
  },
  {
    icon: '📈',
    title: 'Market Trend Alerts',
    desc: 'Weekly AI-curated alerts about new digital trends relevant to your specific business category.',
    tag: 'Weekly Updates',
    tagColor: 'tag-green',
  },
  {
    icon: '🎯',
    title: 'Feature Recommendations',
    desc: 'AI continuously analyzes your website performance and suggests new features to add based on user behavior.',
    tag: 'Auto-Suggest',
    tagColor: 'tag-gold',
  },
  {
    icon: '💬',
    title: 'AI Content Generator',
    desc: 'Automatically generate product descriptions, social media posts, and ad copy in Hindi & English.',
    tag: 'Hindi + English',
    tagColor: 'tag-purple',
  },
  {
    icon: '📊',
    title: 'Performance Dashboard',
    desc: 'Live metrics: website visitors, WhatsApp inquiries, conversion rates, and ROI — all in one place.',
    tag: 'Real-time',
    tagColor: 'tag-green',
  },
  {
    icon: '🛡️',
    title: 'Brand Monitor',
    desc: 'Get alerts when someone mentions your brand online — monitor reviews, mentions, and sentiments.',
    tag: 'Always On',
    tagColor: 'tag-gold',
  },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', business: 'Sharma Saree Palace, Varanasi', photo: '👩‍💼', text: 'JhaTech ki wajah se meri online sales 3x ho gayi! Website se roz 5-10 orders aa rahe hain. Best decision tha!', rating: 5 },
  { name: 'Rajesh Kumar', business: 'Kumar Electronics, Patna', photo: '👨‍💼', text: 'Google Ads se ab roz 20-25 calls aa rahi hain. AI competitor analysis ne mujhe market samajhne mein bahut madad ki.', rating: 5 },
  { name: 'Sunita Devi', business: 'Boutique by Sunita, Lucknow', photo: '👩‍🍳', text: 'Referral program se extra ₹15,000 mahine kama rahi hoon. Koi investment nahi, sirf apne contacts ko batao!', rating: 5 },
];

export default function AIFeatures() {
  const [activeCompetitor, setActiveCompetitor] = useState(null);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const runAnalysis = () => {
    setAnalysisRunning(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setAnalysisRunning(false);
      setAnalysisResult(true);
    }, 2000);
  };

  return (
    <>
      <section id="ai-features" className="section ai-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">🤖 Continuous Improvement</div>
            <h2 className="section-title">
              AI-Powered <span>Competitor Analysis</span>
              <br />& Market Intelligence
            </h2>
            <p className="section-subtitle">
              Hamara AI aapke competitors par nazar rakhta hai, market trends track karta hai,
              aur automatically new features recommend karta hai.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid-3" style={{ marginBottom: '80px' }}>
            {AI_FEATURES.map((f, i) => (
              <div key={i} className="card ai-feature-card">
                <div className="ai-feature-card__icon">{f.icon}</div>
                <span className={`tag ${f.tagColor}`}>{f.tag}</span>
                <h3 className="ai-feature-card__title">{f.title}</h3>
                <p className="ai-feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Competitor Analysis Demo */}
          <div className="ai-demo-section">
            <div className="ai-demo-left">
              <div className="section-badge" style={{ marginBottom: '16px' }}>🔍 Live Demo</div>
              <h3 className="ai-demo__title">Competitor Score Dashboard</h3>
              <p className="ai-demo__desc">
                Dekhein aap apne competitors ke mukable mein kahan hain.
                Har factor ko AI individually analyze karta hai.
              </p>

              {/* Score Bars */}
              <div className="competitor-bars">
                {COMPETITORS.map((c, i) => (
                  <div
                    key={i}
                    className={`comp-bar-item ${activeCompetitor === i ? 'comp-bar-item--active' : ''}`}
                    onClick={() => setActiveCompetitor(activeCompetitor === i ? null : i)}
                  >
                    <div className="comp-bar-left">
                      <span>{c.icon}</span>
                      <span className="comp-bar-name">{c.name}</span>
                    </div>
                    <div className="comp-bar-track">
                      <div
                        className="comp-bar-fill"
                        style={{
                          width: `${c.score}%`,
                          background: c.color,
                        }}
                      />
                    </div>
                    <span className="comp-bar-score" style={{ color: c.color }}>{c.score}/100</span>
                  </div>
                ))}
              </div>

              {activeCompetitor !== null && (
                <div className="comp-detail">
                  <strong>📊 {COMPETITORS[activeCompetitor].name}</strong>
                  {activeCompetitor === 0
                    ? ': Aap market leader hain! Website speed, SEO, aur social media sab strong hai.'
                    : ': Is competitor ki website slow hai aur social media inactive. Yeh aapke liye opportunity hai!'}
                </div>
              )}

              <button className="btn btn-primary" onClick={runAnalysis} style={{ marginTop: '20px' }}>
                {analysisRunning ? '🔄 Analyzing...' : '🤖 Run AI Analysis'}
              </button>

              {analysisResult && (
                <div className="analysis-result">
                  <strong>✅ Analysis Complete!</strong>
                  <p>Aap top 3 areas mein competitors se aage hain: SEO, Website Speed, aur Social Media Engagement. 2 improvement areas found: Google Ads aur Video Content.</p>
                </div>
              )}
            </div>

            {/* Market Trends */}
            <div className="ai-demo-right">
              <h3 className="trends-title">📈 Latest Market Trends</h3>
              <div className="trends-list">
                {TRENDS.map((t, i) => (
                  <div key={i} className="trend-item">
                    <div className="trend-left">
                      <span className="trend-name">{t.trend}</span>
                      <span className="trend-desc">{t.desc}</span>
                    </div>
                    <div className="trend-right">
                      <span className={`trend-growth ${t.status === 'hot' ? 'trend-hot' : 'trend-rising'}`}>
                        {t.growth}
                      </span>
                      {t.status === 'hot' && <span className="trend-badge-hot">🔥 Hot</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">⭐ Success Stories</div>
            <h2 className="section-title">
              Hamare <span>Happy Clients</span>
            </h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.photo}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-business">{t.business}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
