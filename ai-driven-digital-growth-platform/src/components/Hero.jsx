import './Hero.css';

const STATS = [
  { value: '500+', label: 'Businesses Helped' },
  { value: '₹2Cr+', label: 'Revenue Generated' },
  { value: '98%',   label: 'Client Satisfaction' },
  { value: '24/7',  label: 'AI Support' },
];

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Background Elements */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        {/* Badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          🚀 AI-Powered Business Growth for Indian SMEs
        </div>

        {/* Headline */}
        <h1 className="hero__title">
          Apne Business Ko
          <span className="hero__title-gradient"> Digital India</span>
          <br />Mein Aage Badhaiye
        </h1>

        <p className="hero__subtitle">
          JhaTech ke saath apna digital transformation shuru karein. AI-driven website development,
          digital marketing, aur personalized growth strategies — sab ek jagah.
        </p>

        {/* CTAs */}
        <div className="hero__actions">
          <button className="btn btn-primary btn-lg" onClick={() => scrollTo('analysis')}>
            🎯 Free Business Analysis
          </button>
          <button className="btn btn-secondary btn-lg hero__btn-outline" onClick={() => scrollTo('pricing')}>
            💰 Pricing Dekhein
          </button>
        </div>

        {/* Trust Badges */}
        <div className="hero__trust">
          <span>✅ No Hidden Fees</span>
          <span>✅ Results in 30 Days</span>
          <span>✅ 24/7 Support</span>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          {STATS.map((stat, i) => (
            <div key={i} className="hero__stat" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="hero__stat-value">{stat.value}</div>
              <div className="hero__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cards */}
      <div className="hero__float hero__float--left">
        <div className="hero__float-card">
          <span>🛍️</span>
          <div>
            <div className="hero__float-title">Saree Shop</div>
            <div className="hero__float-sub">₹5L Monthly Revenue ↑</div>
          </div>
        </div>
      </div>

      <div className="hero__float hero__float--right">
        <div className="hero__float-card">
          <span>📈</span>
          <div>
            <div className="hero__float-title">AI Analysis</div>
            <div className="hero__float-sub">Report Ready in 30s</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll" onClick={() => scrollTo('analysis')}>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
