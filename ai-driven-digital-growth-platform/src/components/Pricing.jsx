import { useState } from 'react';
import './Pricing.css';

const PLANS = [
  {
    name: 'Starter',
    emoji: '🌱',
    tagline: 'Naye businesses ke liye',
    price: { one: '₹15,000', monthly: '₹3,000' },
    badge: null,
    color: 'green',
    features: [
      { icon: '🌐', text: '5-Page Professional Website', included: true },
      { icon: '📱', text: 'Mobile Responsive Design', included: true },
      { icon: '🔍', text: 'Basic SEO Setup', included: true },
      { icon: '📞', text: 'Contact Form + WhatsApp Button', included: true },
      { icon: '🔒', text: 'SSL Certificate (Free)', included: true },
      { icon: '📊', text: 'Google Analytics Setup', included: true },
      { icon: '🛒', text: 'E-Commerce / Online Store', included: false },
      { icon: '📢', text: 'Google / Facebook Ads', included: false },
      { icon: '🤖', text: 'AI Chatbot', included: false },
      { icon: '📈', text: 'Monthly Growth Reports', included: false },
    ],
    cta: 'Get Started',
    support: '3 Months Support',
  },
  {
    name: 'Growth',
    emoji: '🚀',
    tagline: 'Sabse popular plan',
    price: { one: '₹35,000', monthly: '₹8,000' },
    badge: 'Most Popular',
    color: 'purple',
    features: [
      { icon: '🌐', text: '10-Page Premium Website', included: true },
      { icon: '📱', text: 'Mobile Responsive Design', included: true },
      { icon: '🔍', text: 'Advanced SEO (15 Keywords)', included: true },
      { icon: '📞', text: 'Contact Form + WhatsApp CRM', included: true },
      { icon: '🔒', text: 'SSL + Domain (1 Year Free)', included: true },
      { icon: '📊', text: 'Advanced Analytics Dashboard', included: true },
      { icon: '🛒', text: 'E-Commerce (50 Products)', included: true },
      { icon: '📢', text: 'Social Media Marketing (2 platforms)', included: true },
      { icon: '🤖', text: 'AI Chatbot', included: false },
      { icon: '📈', text: 'Monthly Growth Reports', included: true },
    ],
    cta: 'Start Growing',
    support: '6 Months Priority Support',
  },
  {
    name: 'Enterprise',
    emoji: '👑',
    tagline: 'Established businesses ke liye',
    price: { one: '₹75,000', monthly: '₹18,000' },
    badge: 'Best Value',
    color: 'gold',
    features: [
      { icon: '🌐', text: 'Unlimited Pages Website', included: true },
      { icon: '📱', text: 'Mobile + App-like Experience', included: true },
      { icon: '🔍', text: 'Full SEO Suite (50 Keywords)', included: true },
      { icon: '📞', text: 'WhatsApp Business API + CRM', included: true },
      { icon: '🔒', text: 'SSL + Domain + Hosting (2 Years)', included: true },
      { icon: '📊', text: 'Real-time Analytics + BI Reports', included: true },
      { icon: '🛒', text: 'Full E-Commerce (Unlimited)', included: true },
      { icon: '📢', text: 'Google + Facebook + Instagram Ads', included: true },
      { icon: '🤖', text: 'AI Chatbot + Lead Automation', included: true },
      { icon: '📈', text: 'Weekly Growth Reports + Strategy Calls', included: true },
    ],
    cta: 'Go Enterprise',
    support: '12 Months Dedicated Manager',
  },
];

const ADD_ONS = [
  { icon: '📸', name: 'Professional Photography', price: '₹5,000', desc: '20 product photos' },
  { icon: '🎬', name: 'Promo Video (30s)', price: '₹8,000', desc: 'Animated brand video' },
  { icon: '📝', name: 'Content Writing', price: '₹3,000/mo', desc: '8 blog posts/month' },
  { icon: '🎯', name: 'Google Ads Management', price: '₹5,000/mo', desc: 'Ads + strategy included' },
  { icon: '📊', name: 'Monthly SEO Audit', price: '₹2,500/mo', desc: 'Detailed report + fixes' },
  { icon: '🤖', name: 'AI Competitor Analysis', price: '₹4,000/mo', desc: 'Weekly competitor insights' },
];

export default function Pricing() {
  const [billing, setBilling] = useState('one'); // 'one' | 'monthly'

  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">💰 Transparent Pricing</div>
          <h2 className="section-title">
            Simple, <span>No-Hidden-Charges</span> Pricing
          </h2>
          <p className="section-subtitle">
            Har budget ke liye plans available hain. Website development se lekar full digital
            marketing tak — sab kuch ek jagah.
          </p>

          {/* Billing Toggle */}
          <div className="pricing-toggle">
            <button
              className={`pricing-toggle__btn ${billing === 'one' ? 'active' : ''}`}
              onClick={() => setBilling('one')}
            >
              One-time Payment
            </button>
            <button
              className={`pricing-toggle__btn ${billing === 'monthly' ? 'active' : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly Plan
              <span className="pricing-toggle__save">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`pricing-card pricing-card--${plan.color} ${plan.badge === 'Most Popular' ? 'pricing-card--featured' : ''}`}>
              {plan.badge && (
                <div className={`pricing-card__badge ${plan.badge === 'Most Popular' ? 'badge-purple' : 'badge-gold'}`}>
                  {plan.badge === 'Most Popular' ? '⭐ ' : '💎 '}{plan.badge}
                </div>
              )}

              <div className="pricing-card__header">
                <div className="pricing-card__emoji">{plan.emoji}</div>
                <div className="pricing-card__name">{plan.name}</div>
                <div className="pricing-card__tagline">{plan.tagline}</div>
                <div className="pricing-card__price">
                  <span className="price-amount">{plan.price[billing]}</span>
                  <span className="price-period">{billing === 'one' ? 'one-time' : '/month'}</span>
                </div>
                <div className="pricing-card__support">
                  <span>🛡️</span> {plan.support}
                </div>
              </div>

              <div className="pricing-card__divider" />

              <ul className="pricing-card__features">
                {plan.features.map((f, i) => (
                  <li key={i} className={`pricing-feature ${!f.included ? 'pricing-feature--disabled' : ''}`}>
                    <span className="pricing-feature__check">
                      {f.included ? '✓' : '✕'}
                    </span>
                    <span className="pricing-feature__icon">{f.icon}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/919999999999?text=Hi%20JhaTech!%20I'm%20interested%20in%20the%20${plan.name}%20plan.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn pricing-card__cta ${plan.color === 'purple' ? 'btn-primary' : plan.color === 'gold' ? 'btn-gold' : 'btn-secondary'}`}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Value Propositions */}
        <div className="pricing-value">
          {[
            { icon: '🔒', title: 'No Hidden Charges', desc: 'Jo price dekhein, wahi pay karein. Koi extra fees nahi.' },
            { icon: '🔄', title: '30-Day Revision', desc: 'Agar pasand na aaye, hum free mein change karenge.' },
            { icon: '📞', title: '24/7 Support', desc: 'WhatsApp par hamesha available hain aapke liye.' },
            { icon: '💳', title: 'Easy EMI', desc: '0% interest par 3-12 mahine ki EMI available.' },
          ].map((v, i) => (
            <div key={i} className="pricing-value-item">
              <span className="pricing-value-icon">{v.icon}</span>
              <div>
                <div className="pricing-value-title">{v.title}</div>
                <div className="pricing-value-desc">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="pricing-addons">
          <div className="section-header" style={{ marginBottom: '36px' }}>
            <h3 className="addons-title">🔧 Add-on Services</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem' }}>
              Apne plan ke saath ye additional services bhi add kar sakte hain
            </p>
          </div>
          <div className="addons-grid">
            {ADD_ONS.map((addon, i) => (
              <div key={i} className="addon-card">
                <span className="addon-icon">{addon.icon}</span>
                <div className="addon-info">
                  <div className="addon-name">{addon.name}</div>
                  <div className="addon-desc">{addon.desc}</div>
                </div>
                <div className="addon-price">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
