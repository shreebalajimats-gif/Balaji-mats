import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "About", "Products", "Gallery", "Testimonials", "Contact"];

const PRODUCTS = [
  {
    id: 1,
    name: "Grand Entrance Mats",
    category: "Entrance Mats",
    sizes: ['2x3 ft', '3x5 ft', '4x6 ft', '6x8 ft'],
    priceRange: "₹850 – ₹4,200",
    desc: "Heavy-duty entrance mats designed for high-traffic commercial lobbies. Superior dirt-trapping with anti-slip backing.",
    badge: "Bestseller",
    icon: "🏛️",
    features: ["Heavy-duty coir & rubber", "Custom logo printing", "UV-stabilized colors", "Anti-fatigue support"],
  },
  {
    id: 2,
    name: "Hotel Corridor Mats",
    category: "Hotel Floor Mats",
    sizes: ['Runner 2x10 ft', '2x20 ft', 'Custom'],
    priceRange: "₹1,200 – ₹8,500",
    desc: "Luxury corridor runners crafted for 5-star hotels. Plush nylon pile with precision-cut borders and fire-retardant treatment.",
    badge: "Premium",
    icon: "🏨",
    features: ["Fire-retardant certified", "Plush nylon pile", "Custom dimensions", "Hotel-grade durability"],
  },
  {
    id: 3,
    name: "Commercial Office Mats",
    category: "Commercial Mats",
    sizes: ['3x4 ft', '4x6 ft', '6x9 ft'],
    priceRange: "₹650 – ₹3,800",
    desc: "Professional office-grade mats with ergonomic comfort and clean corporate aesthetics for boardrooms and workspaces.",
    badge: "Popular",
    icon: "🏢",
    features: ["Ergonomic comfort", "Anti-static treatment", "Easy maintenance", "Low-profile design"],
  },
  {
    id: 4,
    name: "Anti-Slip Safety Mats",
    category: "Anti-slip Mats",
    sizes: ['2x3 ft', '3x5 ft', '4x8 ft'],
    priceRange: "₹480 – ₹2,600",
    desc: "Industrial-grade anti-slip mats with maximum grip for wet areas, kitchens, hospitals, and factory floors.",
    badge: "Safety",
    icon: "⚠️",
    features: ["Max grip surface", "Drainage holes option", "Chemical resistant", "ISO safety certified"],
  },
  {
    id: 5,
    name: "Customized Logo Mats",
    category: "Customized Mats",
    sizes: ['Any size', 'Any shape'],
    priceRange: "₹2,000 – ₹15,000",
    desc: "Brand-centric custom mats with high-resolution logo printing. Perfect for brand visibility at entrances and events.",
    badge: "Custom",
    icon: "✨",
    features: ["HD logo print", "Any shape/size", "Pantone color match", "Proof approval process"],
  },
  {
    id: 6,
    name: "Bulk Supply Mats",
    category: "Bulk Supply Mats",
    sizes: ['Any size', 'MOQ 50 pcs'],
    priceRange: "₹350 – ₹1,800/pc",
    desc: "Volume pricing for builders, hospitality chains, and institutional buyers. Factory-direct supply with GST billing.",
    badge: "Bulk Deal",
    icon: "📦",
    features: ["Factory-direct price", "GST billing", "Pan-India delivery", "Dedicated account manager"],
  },
];

const TESTIMONIALS = [
  {
    name: "Rajesh Mehta",
    role: "Purchase Manager",
    company: "Taj Vivanta Hotels",
    text: "Shree Balaji Mats has been our preferred supplier for 3 years. The quality is consistently excellent and their bulk order fulfillment is impeccable. Highly recommended for hospitality businesses.",
    stars: 5,
    avatar: "RM",
  },
  {
    name: "Priya Sharma",
    role: "Facility Head",
    company: "Fortis Healthcare Ltd.",
    text: "We sourced anti-slip mats for all our hospital floors. The quality exceeds expectations — durable, easy to sanitize, and perfectly sized. GST invoicing made the procurement process seamless.",
    stars: 5,
    avatar: "PS",
  },
  {
    name: "Aakash Builders",
    role: "Procurement Director",
    company: "Aakash Infra Projects",
    text: "Ordered 500+ units for our commercial complex project. On-time delivery, competitive pricing, and the custom logo mats for the lobby look absolutely premium. Will reorder.",
    stars: 5,
    avatar: "AB",
  },
];

const TRUST_BADGES = [
  { icon: "🏅", label: "GST Certified", sub: "Reg. No. 27AAABM1234Z1Z5" },
  { icon: "🚚", label: "Pan-India Delivery", sub: "All 28 states covered" },
  { icon: "📦", label: "Bulk Orders", sub: "MOQ 50 units" },
  { icon: "⭐", label: "15+ Years Experience", sub: "Est. 2009" },
  { icon: "🔒", label: "ISO Certified", sub: "Quality Assured" },
  { icon: "💼", label: "500+ B2B Clients", sub: "Hotels, Hospitals & More" },
];

const GALLERY_ITEMS = [
  { label: "Hotel Lobby Installation", color: "#1a2744" },
  { label: "Hospital Corridor Project", color: "#1e3a5f" },
  { label: "Corporate Office Supply", color: "#152238" },
  { label: "Retail Store Branding", color: "#1a3050" },
  { label: "Custom Logo Mats", color: "#0f1e35" },
  { label: "Bulk Warehouse Stock", color: "#1c2d4a" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShreeBalaji() {
  const [activeNav, setActiveNav] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", company: "", phone: "", email: "",
    quantity: "", productType: "", message: ""
  });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(p => ({ ...p, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerRef = (id) => (el) => { sectionRefs.current[id] = el; };

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setFormSent(true), 600);
  };

  const isVisible = (id) => visibleSections[id];

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#f8f5f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: white;
          cursor: pointer;
          padding: 6px 0;
          position: relative;
          transition: color 0.3s;
          background: none;
          border: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #c9a84c;
          transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link:hover { color: #c9a84c; }
        .nav-link.active { color: #c9a84c; }

        .btn-gold {
          background: linear-gradient(135deg, #c9a84c, #e8c96a, #c9a84c);
          color: #0d1b2a;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 14px 36px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-gold:hover {
          background: linear-gradient(135deg, #e8c96a, #c9a84c, #a87a2c);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201,168,76,0.4);
        }

        .btn-outline {
          background: transparent;
          color: #c9a84c;
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 13px 35px;
          border: 1px solid #c9a84c;
          cursor: pointer;
          transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .btn-outline:hover {
          background: #c9a84c;
          color: #0d1b2a;
          transform: translateY(-2px);
        }

        .product-card {
          background: white;
          border: 1px solid #e8e0d5;
          transition: all 0.4s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c9a84c, #e8c96a);
          transform: scaleX(0);
          transition: transform 0.4s;
        }
        .product-card:hover::before { transform: scaleX(1); }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(13,27,42,0.15);
          border-color: #c9a84c;
        }

        .section-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .badge {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 12px;
          background: linear-gradient(135deg, #c9a84c, #e8c96a);
          color: #0d1b2a;
        }

        .form-input {
          width: 100%;
          padding: 14px 18px;
          border: 1px solid #d5cdc3;
          background: #faf8f5;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: #1a1a1a;
          transition: border-color 0.3s;
          outline: none;
        }
        .form-input:focus { border-color: #c9a84c; background: white; }

        .whatsapp-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 60px;
          height: 60px;
          background: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(37,211,102,0.5);
          transition: all 0.3s;
          text-decoration: none;
          animation: pulse 2.5s infinite;
        }
        .whatsapp-fab:hover { transform: scale(1.1); }

        @keyframes pulse {
          0% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); }
          50% { box-shadow: 0 4px 40px rgba(37,211,102,0.8); }
          100% { box-shadow: 0 4px 20px rgba(37,211,102,0.5); }
        }

        .hero-text-reveal {
          overflow: hidden;
        }
        .hero-text-reveal span {
          display: block;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--delay, 0s);
          transform: translateY(100%);
          opacity: 0;
        }
        @keyframes slideUp {
          to { transform: translateY(0); opacity: 1; }
        }

        .gold-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #c9a84c, #e8c96a, #c9a84c);
          margin: 0 auto 20px;
        }

        .testimonial-card {
          background: white;
          border-left: 3px solid #c9a84c;
          padding: 32px;
          transition: all 0.3s;
        }
        .testimonial-card:hover { box-shadow: 0 10px 30px rgba(13,27,42,0.1); }

        .trust-badge-item {
          padding: 24px 20px;
          border: 1px solid rgba(201,168,76,0.2);
          background: rgba(255,255,255,0.05);
          text-align: center;
          transition: all 0.3s;
        }
        .trust-badge-item:hover {
          background: rgba(201,168,76,0.1);
          border-color: #c9a84c;
          transform: translateY(-4px);
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(13,27,42,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          color: #c9a84c;
          line-height: 1;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0ebe3; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/919876543210?text=Hello%20Shree%20Balaji%20Mats%2C%20I%20am%20interested%20in%20bulk%20mat%20orders."
        className="whatsapp-fab" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── Navbar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        background: scrolled ? "rgba(13,27,42,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
        transition: "all 0.4s",
        padding: "0 5%",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ cursor: "pointer" }} onClick={() => scrollTo("Home")}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40,
                background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 700, color: "#0d1b2a",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }}>SB</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "white", lineHeight: 1.1, letterSpacing: 1 }}>
                  Shree Balaji
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 500, color: "#c9a84c", letterSpacing: 3, textTransform: "uppercase" }}>
                  MATS
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button key={link} className={`nav-link ${activeNav === link ? "active" : ""}`}
                onClick={() => scrollTo(link)}>
                {link}
              </button>
            ))}
            <button className="btn-gold" onClick={() => scrollTo("Contact")} style={{ padding: "10px 22px", fontSize: 10 }}>
              Get Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
            className="mobile-menu-btn">
            <div style={{ width: 24, height: 2, background: "#c9a84c", marginBottom: 5 }} />
            <div style={{ width: 24, height: 2, background: "#c9a84c", marginBottom: 5 }} />
            <div style={{ width: 16, height: 2, background: "#c9a84c" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{ background: "rgba(13,27,42,0.98)", padding: "20px 0", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
            {NAV_LINKS.map(link => (
              <div key={link} onClick={() => scrollTo(link)}
                style={{ padding: "14px 24px", color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: 2, cursor: "pointer", textTransform: "uppercase" }}>
                {link}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="home" style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0d1b2a 0%, #1a2f4a 50%, #0d1b2a 100%)",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", padding: "120px 5% 80px",
      }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "15%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              borderRadius: "50%",
              background: "rgba(201,168,76,0.4)",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
            }} />
          ))}
          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
            {[...Array(10)].map((_, i) => (
              <line key={i} x1={`${i * 11}%`} y1="0" x2={`${i * 11}%`} y2="100%" stroke="#c9a84c" strokeWidth="1" />
            ))}
            {[...Array(10)].map((_, i) => (
              <line key={i} x1="0" y1={`${i * 11}%`} x2="100%" y2={`${i * 11}%`} stroke="#c9a84c" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="hero-grid">
          {/* Left */}
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#c9a84c", textTransform: "uppercase", marginBottom: 20 }}>
              ◆ Premium B2B Mat Manufacturer ◆
            </div>
            <div className="hero-text-reveal">
              <span style={{ "--delay": "0.2s", fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 300, color: "white", lineHeight: 1.1, fontFamily: "'Cormorant Garamond', serif" }}>
                Floor Mats
              </span>
            </div>
            <div className="hero-text-reveal">
              <span style={{ "--delay": "0.35s", fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 700, color: "#c9a84c", lineHeight: 1.1, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                Crafted for
              </span>
            </div>
            <div className="hero-text-reveal">
              <span style={{ "--delay": "0.5s", fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 300, color: "white", lineHeight: 1.1, fontFamily: "'Cormorant Garamond', serif" }}>
                Excellence
              </span>
            </div>

            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginTop: 28, marginBottom: 40, maxWidth: 460, fontWeight: 300, animation: "slideUp 1s 0.7s both" }}>
              Premium quality floor mats for hotels, hospitals, offices & commercial spaces. Bulk supply with GST billing. Factory-direct pricing. Pan-India delivery.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "slideUp 1s 0.9s both" }}>
              <button className="btn-gold" onClick={() => scrollTo("Products")}>
                Explore Products
              </button>
              <button className="btn-outline" onClick={() => scrollTo("Contact")}>
                Request Bulk Quote
              </button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(201,168,76,0.15)", animation: "slideUp 1s 1.1s both" }} className="stats-grid">
              {[["500+", "B2B Clients"], ["15+", "Years Experience"], ["50K+", "Mats Supplied"]].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-number">{n}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: "100%", aspectRatio: "4/5", maxWidth: 420,
              background: "linear-gradient(160deg, #1a3050, #0f1e35)",
              border: "1px solid rgba(201,168,76,0.2)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Mat pattern preview */}
              <div style={{ position: "absolute", inset: 20, border: "1px solid rgba(201,168,76,0.15)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40 }}>
                <div style={{ fontSize: 64 }}>🏛️</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "white", textAlign: "center", fontWeight: 300 }}>
                  Shree Balaji<br /><span style={{ color: "#c9a84c", fontStyle: "italic" }}>Mats</span>
                </div>
                <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.8, letterSpacing: 1 }}>
                  PREMIUM FLOOR SOLUTIONS<br />FOR COMMERCIAL SPACES
                </div>
                {/* Decorative mat pattern */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginTop: 20 }}>
                  {[...Array(25)].map((_, i) => (
                    <div key={i} style={{
                      width: 32, height: 32,
                      background: i % 3 === 0 ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.15)",
                    }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{
              position: "absolute", top: 20, right: -20,
              background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
              padding: "16px 20px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#0d1b2a", lineHeight: 1 }}>GST</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 8, fontWeight: 700, color: "#0d1b2a", letterSpacing: 1.5 }}>CERTIFIED</div>
            </div>

            <div style={{
              position: "absolute", bottom: 30, left: -20,
              background: "#0d1b2a", border: "1px solid rgba(201,168,76,0.3)",
              padding: "14px 20px",
            }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#c9a84c", letterSpacing: 2 }}>PAN-INDIA DELIVERY</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "white", marginTop: 2 }}>Free above ₹50,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section style={{ background: "#0d1b2a", padding: "28px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 1 }} className="trust-grid">
          {TRUST_BADGES.map(b => (
            <div key={b.label} className="trust-badge-item">
              <div style={{ fontSize: 24, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, color: "#c9a84c", letterSpacing: 0.5 }}>{b.label}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" ref={registerRef("about")} style={{ padding: "100px 5%", background: "#f8f5f0" }}>
        <div className={`section-reveal ${isVisible("about") ? "visible" : ""}`}
          style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} >
          {/* Left visual */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "linear-gradient(160deg, #0d1b2a, #1a3050)",
              padding: 60, position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 20, left: 20, right: 20, bottom: 20, border: "1px solid rgba(201,168,76,0.2)" }} />
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, color: "rgba(201,168,76,0.15)", fontWeight: 700 }}>15</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: "white", marginTop: -30 }}>Years of</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: "#c9a84c", fontStyle: "italic" }}>Excellence</div>
                <div style={{ width: 40, height: 1, background: "#c9a84c", margin: "20px auto" }} />
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 2, letterSpacing: 1 }}>
                  EST. 2009 · MUMBAI, INDIA<br />
                  FACTORY DIRECT SUPPLY<br />
                  ISO QUALITY CERTIFIED
                </div>
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: -24, right: -24,
              background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
              padding: "24px 30px",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: "#0d1b2a", lineHeight: 1 }}>500+</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 700, color: "#0d1b2a", letterSpacing: 1.5 }}>HAPPY B2B CLIENTS</div>
            </div>
          </div>

          {/* Right content */}
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>
              About Us
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#0d1b2a", lineHeight: 1.15, marginBottom: 24 }}>
              India's Trusted<br /><em style={{ color: "#c9a84c" }}>Mat Manufacturer</em><br />Since 2009
            </h2>
            <div className="gold-divider" style={{ margin: "0 0 24px" }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
              Shree Balaji Mats is a Mumbai-based premium floor mat manufacturer serving the hospitality, healthcare, retail, and corporate sectors across India. We combine traditional craftsmanship with modern manufacturing to deliver mats that meet international quality standards.
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#555", lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>
              Our factory-direct model ensures competitive pricing for bulk buyers, with GST-compliant invoicing, pan-India logistics support, and a dedicated account management team for B2B clients.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                "Factory-Direct Pricing", "GST Registered Business",
                "Custom Mat Manufacturing", "ISO Quality Standards",
                "Pan-India Logistics", "Dedicated B2B Support"
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, background: "#c9a84c", transform: "rotate(45deg)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#333", fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <button className="btn-gold" onClick={() => scrollTo("Contact")}>Partner With Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" ref={registerRef("products")} style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`section-reveal ${isVisible("products") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>
              Our Products
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#0d1b2a" }}>
              Premium Mat Collections
            </h2>
            <div className="gold-divider" style={{ marginTop: 20 }} />
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#777", maxWidth: 520, margin: "0 auto", fontWeight: 300, lineHeight: 1.8 }}>
              From elegant hotel lobbies to industrial factory floors — we manufacture mats that perform and impress.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="products-grid">
            {PRODUCTS.map((p, i) => (
              <div key={p.id} className={`product-card section-reveal ${isVisible("products") ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
                onClick={() => setActiveProduct(activeProduct?.id === p.id ? null : p)}>
                {/* Color block */}
                <div style={{
                  background: `linear-gradient(160deg, #0d1b2a, #1a3050)`,
                  height: 160, display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden"
                }}>
                  <div style={{ fontSize: 56 }}>{p.icon}</div>
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                    padding: "4px 12px"
                  }}>
                    <span className="badge" style={{ background: "none", padding: 0, color: "#0d1b2a" }}>{p.badge}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(transparent, rgba(201,168,76,0.1))" }} />
                </div>

                <div style={{ padding: 28 }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#c9a84c", textTransform: "uppercase", marginBottom: 8 }}>
                    {p.category}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 600, color: "#0d1b2a", marginBottom: 12 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#666", lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>
                    {p.desc}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 16, borderTop: "1px solid #f0ebe3" }}>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#aaa", letterSpacing: 1, textTransform: "uppercase" }}>Price Range</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#0d1b2a" }}>{p.priceRange}</div>
                    </div>
                    <div style={{ color: "#c9a84c", fontSize: 18, transition: "transform 0.3s", transform: activeProduct?.id === p.id ? "rotate(180deg)" : "none" }}>▼</div>
                  </div>

                  {/* Expanded */}
                  {activeProduct?.id === p.id && (
                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #f0ebe3" }}>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 1, color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
                        Key Features
                      </div>
                      {p.features.map(f => (
                        <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                          <div style={{ color: "#c9a84c", fontSize: 14 }}>◆</div>
                          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "#555" }}>{f}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 16, fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#888" }}>
                        Available sizes: {p.sizes.join(" · ")}
                      </div>
                      <button className="btn-gold" style={{ marginTop: 20, width: "100%", textAlign: "center" }}
                        onClick={(e) => { e.stopPropagation(); scrollTo("Contact"); }}>
                        Enquire Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" ref={registerRef("gallery")} style={{ padding: "100px 5%", background: "#f8f5f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`section-reveal ${isVisible("gallery") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>Gallery</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#0d1b2a" }}>
              Installations & Projects
            </h2>
            <div className="gold-divider" style={{ marginTop: 20 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="gallery-grid">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className={`gallery-item section-reveal ${isVisible("gallery") ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ background: item.color, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, position: "relative" }}>
                  {/* Mat texture simulation */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 2, opacity: 0.3, position: "absolute", inset: 16 }}>
                    {[...Array(64)].map((_, j) => (
                      <div key={j} style={{ height: 20, background: j % 2 === 0 ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.1)" }} />
                    ))}
                  </div>
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>🏗️</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>{item.label}</div>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "white" }}>{item.label}</div>
                    <div style={{ width: 40, height: 1, background: "#c9a84c", margin: "12px auto" }} />
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#c9a84c", letterSpacing: 2, cursor: "pointer" }}>VIEW PROJECT</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" ref={registerRef("testimonials")} style={{ padding: "100px 5%", background: "#0d1b2a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`section-reveal ${isVisible("testimonials") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>Client Reviews</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "white" }}>
              Trusted by Industry Leaders
            </h2>
            <div className="gold-divider" style={{ marginTop: 20 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="products-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testimonial-card section-reveal ${isVisible("testimonials") ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.15}s`, background: "rgba(255,255,255,0.05)", borderLeft: "3px solid #c9a84c" }}>
                <div style={{ color: "#c9a84c", fontSize: 28, marginBottom: 16, lineHeight: 1 }}>"</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontStyle: "italic", marginBottom: 24 }}>
                  {t.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 46, height: 46, background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 700, color: "#0d1b2a"
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, color: "white" }}>{t.name}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#c9a84c", marginTop: 2 }}>{t.role} · {t.company}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#c9a84c", fontSize: 12 }}>{"★".repeat(t.stars)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ background: "linear-gradient(135deg, #c9a84c, #a87a2c)", padding: "70px 5%", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#0d1b2a", marginBottom: 16 }}>
            Ready to Place a Bulk Order?
          </h2>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "rgba(13,27,42,0.7)", marginBottom: 36, fontWeight: 300 }}>
            Get factory-direct pricing, GST invoice, and dedicated support for orders above 50 units.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Contact")} style={{
              background: "#0d1b2a", color: "white",
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2,
              textTransform: "uppercase", padding: "14px 36px", border: "none", cursor: "pointer",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              transition: "all 0.3s",
            }}>
              Request Quote
            </button>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{
              background: "#25d366", color: "white",
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2,
              textTransform: "uppercase", padding: "14px 36px", textDecoration: "none", display: "inline-block",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}>
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact & Form ── */}
      <section id="contact" ref={registerRef("contact")} style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`section-reveal ${isVisible("contact") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 4, color: "#c9a84c", textTransform: "uppercase", marginBottom: 16 }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#0d1b2a" }}>
              Request a Bulk Quote
            </h2>
            <div className="gold-divider" style={{ marginTop: 20 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="about-grid">
            {/* Contact info */}
            <div className={`section-reveal ${isVisible("contact") ? "visible" : ""}`}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "#0d1b2a", marginBottom: 32 }}>
                Let's Build a<br /><em style={{ color: "#c9a84c" }}>Long-term Partnership</em>
              </h3>

              {[
                { icon: "📍", label: "Factory Address", value: "Plot No. 42, MIDC Industrial Area, Bhiwandi, Thane – 421302, Maharashtra, India" },
                { icon: "📞", label: "Phone / WhatsApp", value: "+91 98765 43210" },
                { icon: "✉️", label: "Email", value: "inquiry@shreebalajimats.com" },
                { icon: "⏰", label: "Business Hours", value: "Mon – Sat: 9:00 AM – 7:00 PM IST" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 20, marginBottom: 28 }}>
                  <div style={{
                    width: 46, height: 46, background: "#f8f5f0", border: "1px solid #e8e0d5",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 1, color: "#c9a84c", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#333", lineHeight: 1.6 }}>{c.value}</div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div style={{
                height: 180, background: "linear-gradient(160deg, #0d1b2a, #1a3050)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(201,168,76,0.2)", marginTop: 8
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32 }}>📍</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#c9a84c", marginTop: 8, letterSpacing: 1 }}>
                    BHIWANDI, THANE — MAHARASHTRA
                  </div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                    Click to open in Google Maps
                  </div>
                </div>
              </div>

              {/* Download Brochure */}
              <button style={{
                marginTop: 24, width: "100%", padding: "16px",
                background: "#f8f5f0", border: "1px dashed #c9a84c",
                fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: 2, color: "#c9a84c", textTransform: "uppercase", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all 0.3s",
              }}
                onMouseOver={e => e.currentTarget.style.background = "#c9a84c"}
                onMouseOut={e => e.currentTarget.style.background = "#f8f5f0"}>
                <span>📥</span> Download Product Brochure (PDF)
              </button>
            </div>

            {/* Form */}
            <div className={`section-reveal ${isVisible("contact") ? "visible" : ""}`} style={{ transitionDelay: "0.2s" }}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "60px 40px", background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.3)" }}>
                  <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#0d1b2a", marginBottom: 12 }}>
                    Inquiry Received!
                  </h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "#666", lineHeight: 1.8 }}>
                    Thank you for reaching out. Our B2B sales team will contact you within 2 business hours.
                  </p>
                  <div style={{ marginTop: 24, fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#c9a84c", letterSpacing: 1 }}>
                    EXPECT A CALL FROM: +91 98765 43210
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ background: "#0d1b2a", padding: "16px 24px", marginBottom: 24 }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#c9a84c", letterSpacing: 2, textTransform: "uppercase" }}>
                      Bulk Inquiry Form
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Full Name *</label>
                      <input className="form-input" required value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Company *</label>
                      <input className="form-input" required value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Company name" />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Phone *</label>
                      <input className="form-input" required value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email *</label>
                      <input className="form-input" type="email" required value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your@company.com" />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-grid">
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Product Type *</label>
                      <select className="form-input" required value={formData.productType}
                        onChange={e => setFormData({ ...formData, productType: e.target.value })}>
                        <option value="">Select product</option>
                        {PRODUCTS.map(p => <option key={p.id} value={p.category}>{p.category}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Quantity Required *</label>
                      <input className="form-input" required value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })} placeholder="e.g. 100 units" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#888", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Message / Specifications</label>
                    <textarea className="form-input" rows={4} value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirements: size, color, logo printing, delivery timeline..." style={{ resize: "vertical" }} />
                  </div>

                  <button type="submit" className="btn-gold" style={{ width: "100%", padding: "16px", fontSize: 12 }}>
                    Submit Bulk Inquiry
                  </button>

                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#aaa", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                    🔒 Your information is secure. We respond within 2 business hours.<br />
                    GST invoicing provided. Minimum order: 50 units.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#080f18", padding: "60px 5% 30px", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36,
                  background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700, color: "#0d1b2a",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}>SB</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "white", fontWeight: 600 }}>Shree Balaji Mats</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: "#c9a84c", letterSpacing: 2 }}>PREMIUM MANUFACTURER</div>
                </div>
              </div>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.9, maxWidth: 280, fontWeight: 300 }}>
                India's premier B2B floor mat manufacturer. Serving hotels, hospitals, offices, and commercial spaces since 2009.
              </p>
              <div style={{ marginTop: 20, fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "#c9a84c", letterSpacing: 1 }}>
                GST No: 27AAABM1234Z1Z5
              </div>
            </div>

            {[
              {
                title: "Products",
                links: ["Entrance Mats", "Hotel Floor Mats", "Commercial Mats", "Anti-slip Mats", "Custom Mats", "Bulk Supply"]
              },
              {
                title: "Company",
                links: ["About Us", "Quality Standards", "Manufacturing", "Certifications", "Career", "Blog"]
              },
              {
                title: "Support",
                links: ["Bulk Inquiry", "Download Brochure", "Shipping Policy", "GST Invoice", "Track Order", "Contact"]
              }
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseOver={e => e.currentTarget.style.color = "#c9a84c"}
                    onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
                    {link}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              © 2024 Shree Balaji Mats. All rights reserved. | Mumbai, Maharashtra, India
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map(link => (
                <span key={link} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{link}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; flex-direction: column; }
        }
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
