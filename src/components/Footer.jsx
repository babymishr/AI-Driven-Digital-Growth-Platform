import './Footer.css';

const WHATSAPP_NUMBER = '919999999999';
const WHATSAPP_BASE   = `https://wa.me/${WHATSAPP_NUMBER}`;

const LINKS = {
  Services: [
    { label: 'Website Development', href: '#pricing' },
    { label: 'Digital Marketing', href: '#pricing' },
    { label: 'AI Competitor Analysis', href: '#ai-features' },
    { label: 'SEO Services', href: '#pricing' },
    { label: 'Social Media Marketing', href: '#pricing' },
  ],
  Company: [
    { label: 'About Us', href: '#home' },
    { label: 'Success Stories', href: '#ai-features' },
    { label: 'Blog', href: '#home' },
    { label: 'Careers', href: '#home' },
    { label: 'Privacy Policy', href: '#home' },
  ],
  Partner: [
    { label: 'Referral Program', href: '#referral' },
    { label: 'Earn ₹1,000/Sale', href: '#referral' },
    { label: 'Partner Login', href: '#referral' },
    { label: 'Training Materials', href: '#referral' },
  ],
};

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container footer-cta__inner">
          <div className="footer-cta__text">
            <h2>Aaj Hi Shuru Karein Apna Digital Journey!</h2>
            <p>Free consultation ke liye abhi WhatsApp karein — koi hidden charges nahi.</p>
          </div>
          <div className="footer-cta__actions">
            <a
              href={`${WHATSAPP_BASE}?text=Hi%20JhaTech!%20Main%20apne%20business%20ke%20liye%20free%20consultation%20chahta%20hoon.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Karein
            </a>
            <a
              href={`${WHATSAPP_BASE}?text=Hi!%20I%20want%20to%20get%20a%20free%20AI%20business%20analysis%20report.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary footer-cta__btn-outline"
            >
              📊 Free Analysis
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo__icon">J</div>
                <div>
                  <div className="footer-logo__name">JhaTech</div>
                  <div className="footer-logo__tagline">AI Growth Platform</div>
                </div>
              </div>
              <p className="footer-brand__desc">
                India ke chhote aur medium businesses ko digital world mein aage badhane ke liye
                AI-powered solutions provide karna hamara mission hai.
              </p>

              {/* Contact Info */}
              <div className="footer-contact">
                <a
                  href={`${WHATSAPP_BASE}?text=Hi%20JhaTech!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-item"
                >
                  <span>💬</span>
                  <span>WhatsApp: +91 99999 99999</span>
                </a>
                <div className="footer-contact-item">
                  <span>📧</span>
                  <span>hello@jhatech.in</span>
                </div>
                <div className="footer-contact-item">
                  <span>🕐</span>
                  <span>Mon–Sat: 9AM – 8PM IST</span>
                </div>
              </div>

              {/* Social */}
              <div className="footer-social">
                {[
                  { icon: '📘', label: 'Facebook', href: '#' },
                  { icon: '📸', label: 'Instagram', href: '#' },
                  { icon: '🐦', label: 'Twitter', href: '#' },
                  { icon: '▶️', label: 'YouTube', href: '#' },
                ].map(s => (
                  <a key={s.label} href={s.href} className="footer-social__item" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(LINKS).map(([heading, items]) => (
              <div key={heading} className="footer-links">
                <h4 className="footer-links__heading">{heading}</h4>
                <ul>
                  {items.map(item => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="footer-links__item"
                        onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <p>© 2025 JhaTech. All rights reserved. Made with ❤️ in India 🇮🇳</p>
          <div className="footer-bottom__links">
            <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }}>Privacy Policy</a>
            <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }}>Terms of Service</a>
            <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }}>Sitemap</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`${WHATSAPP_BASE}?text=Hi%20JhaTech!%20Main%20apne%20business%20ko%20digitally%20grow%20karna%20chahta%20hoon.`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="whatsapp-fab__tooltip">Chat on WhatsApp</span>
      </a>
    </footer>
  );
}
