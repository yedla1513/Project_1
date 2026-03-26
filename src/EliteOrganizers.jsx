import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #080808;
    --black2: #0f0f0f;
    --black3: #161616;
    --black4: #1e1e1e;
    --gold: #c9a84c;
    --gold2: #e8c97a;
    --gold3: #f5dfa0;
    --gold-dim: rgba(201,168,76,0.15);
    --gold-border: rgba(201,168,76,0.3);
    --text: #f0ece0;
    --muted: #7a7468;
    --white: #faf8f2;
    --serif: 'Playfair Display', Georgia, serif;
    --cormorant: 'Cormorant Garamond', serif;
    --sans: 'Jost', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--text);
    font-family: var(--sans);
    font-weight: 300;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 60px;
    display: flex; align-items: center; justify-content: space-between;
    height: 72px;
    border-bottom: 1px solid transparent;
    transition: all 0.4s ease;
  }
  .nav.scrolled {
    background: rgba(8,8,8,0.96);
    border-bottom-color: var(--gold-border);
    backdrop-filter: blur(12px);
  }
  .nav-logo {
    font-family: var(--serif);
    font-size: 22px;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 1px;
    cursor: pointer;
  }
  .nav-logo span {
    display: block;
    font-size: 9px;
    font-family: var(--sans);
    font-weight: 400;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: -2px;
  }
  .nav-links {
    display: flex; gap: 36px; list-style: none;
  }
  .nav-links li a {
    font-size: 12px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: var(--muted);
    text-decoration: none; transition: color 0.2s;
    cursor: pointer;
  }
  .nav-links li a:hover { color: var(--gold); }
  .nav-cta {
    padding: 9px 24px;
    border: 1px solid var(--gold-border);
    background: transparent;
    color: var(--gold);
    font-family: var(--sans);
    font-size: 11px; font-weight: 400;
    letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
  }
  .nav-cta:hover { background: var(--gold); color: var(--black); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    position: relative;
    padding: 120px 60px 80px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 70%),
      radial-gradient(ellipse 40% 50% at 20% 80%, rgba(201,168,76,0.03) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.03;
    background-image:
      linear-gradient(var(--gold) 1px, transparent 1px),
      linear-gradient(90deg, var(--gold) 1px, transparent 1px);
    background-size: 80px 80px;
  }
  .hero-ornament {
    position: absolute; right: 80px; top: 50%;
    transform: translateY(-50%);
    width: 420px; height: 420px;
    border: 1px solid var(--gold-border);
    border-radius: 50%;
    opacity: 0.4;
  }
  .hero-ornament::before {
    content: '';
    position: absolute; inset: 20px;
    border: 1px solid var(--gold-border);
    border-radius: 50%;
  }
  .hero-ornament::after {
    content: '';
    position: absolute; inset: 40px;
    border: 1px solid rgba(201,168,76,0.1);
    border-radius: 50%;
  }
  .hero-content { position: relative; max-width: 660px; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
    opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards;
  }
  .hero-tag::before {
    content: ''; width: 40px; height: 1px; background: var(--gold);
  }
  .hero-h1 {
    font-family: var(--serif);
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 700; line-height: 1.05;
    color: var(--white);
    margin-bottom: 24px;
    opacity: 0; animation: fadeUp 0.8s ease 0.4s forwards;
  }
  .hero-h1 em {
    font-style: italic; color: var(--gold);
  }
  .hero-p {
    font-size: 15px; font-weight: 300; line-height: 1.9;
    color: var(--muted); max-width: 480px;
    margin-bottom: 40px;
    opacity: 0; animation: fadeUp 0.8s ease 0.6s forwards;
  }
  .hero-btns {
    display: flex; gap: 16px; align-items: center;
    opacity: 0; animation: fadeUp 0.8s ease 0.8s forwards;
  }
  .btn-primary {
    padding: 14px 36px;
    background: var(--gold);
    color: var(--black);
    font-family: var(--sans);
    font-size: 11px; font-weight: 500; letter-spacing: 2.5px;
    text-transform: uppercase; border: none; cursor: pointer;
    transition: all 0.25s;
  }
  .btn-primary:hover { background: var(--gold2); transform: translateY(-1px); }
  .btn-ghost {
    padding: 14px 36px;
    background: transparent;
    color: var(--text);
    font-family: var(--sans);
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase;
    border: 1px solid rgba(240,236,224,0.2); cursor: pointer;
    transition: all 0.25s;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
  .hero-stats {
    position: absolute; bottom: 60px; right: 60px;
    display: flex; gap: 48px;
    opacity: 0; animation: fadeUp 0.8s ease 1s forwards;
  }
  .stat { text-align: center; }
  .stat-num {
    font-family: var(--serif); font-size: 36px; font-weight: 700;
    color: var(--gold); line-height: 1;
  }
  .stat-lbl {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); margin-top: 6px;
  }

  /* DIVIDER */
  .divider {
    display: flex; align-items: center; gap: 20px;
    padding: 0 60px; margin: 0 0 0;
  }
  .divider-line { flex: 1; height: 1px; background: var(--gold-border); }
  .divider-diamond {
    width: 8px; height: 8px;
    border: 1px solid var(--gold);
    transform: rotate(45deg);
  }

  /* SERVICES */
  .services {
    padding: 100px 60px;
    background: var(--black2);
    position: relative;
  }
  .section-header { text-align: center; margin-bottom: 64px; }
  .section-tag {
    font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 16px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .section-tag::before, .section-tag::after {
    content: ''; width: 30px; height: 1px; background: var(--gold-border);
  }
  .section-title {
    font-family: var(--serif);
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 500; color: var(--white);
    line-height: 1.2;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-sub {
    font-size: 14px; color: var(--muted); margin-top: 16px;
    line-height: 1.8; max-width: 500px; margin-left: auto; margin-right: auto;
  }

  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;
    margin-bottom: 60px;
  }
  .svc-card {
    background: var(--black3);
    padding: 48px 40px;
    border: 1px solid transparent;
    position: relative; overflow: hidden;
    cursor: pointer;
    transition: all 0.4s ease;
  }
  .svc-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold-dim) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s;
  }
  .svc-card:hover { border-color: var(--gold-border); }
  .svc-card:hover::before { opacity: 1; }
  .svc-card.active { border-color: var(--gold); background: var(--black4); }
  .svc-card.active::before { opacity: 1; }
  .svc-num {
    font-family: var(--cormorant); font-size: 72px; font-weight: 300;
    color: var(--gold-border); line-height: 1;
    margin-bottom: 24px; transition: color 0.4s;
  }
  .svc-card:hover .svc-num, .svc-card.active .svc-num { color: rgba(201,168,76,0.3); }
  .svc-icon-wrap {
    width: 56px; height: 56px;
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px; transition: all 0.4s;
  }
  .svc-card:hover .svc-icon-wrap { border-color: var(--gold); background: var(--gold-dim); }
  .svc-icon { font-size: 22px; }
  .svc-name {
    font-family: var(--serif); font-size: 24px; font-weight: 500;
    color: var(--white); margin-bottom: 14px;
  }
  .svc-desc {
    font-size: 13px; font-weight: 300; color: var(--muted);
    line-height: 1.9; margin-bottom: 24px;
  }
  .svc-features { list-style: none; }
  .svc-features li {
    font-size: 12px; color: var(--muted); letter-spacing: 0.5px;
    padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex; align-items: center; gap: 10px;
  }
  .svc-features li::before {
    content: '◆'; font-size: 6px; color: var(--gold); flex-shrink: 0;
  }
  .svc-price {
    margin-top: 28px; padding-top: 20px;
    border-top: 1px solid var(--gold-border);
    display: flex; align-items: baseline; gap: 6px;
  }
  .svc-price-num {
    font-family: var(--serif); font-size: 28px; color: var(--gold);
  }
  .svc-price-unit { font-size: 12px; color: var(--muted); }

  /* PROCESS */
  .process {
    padding: 100px 60px;
    background: var(--black);
  }
  .process-steps {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; position: relative; margin-top: 64px;
  }
  .process-steps::before {
    content: '';
    position: absolute; top: 36px; left: 12.5%; right: 12.5%;
    height: 1px; background: linear-gradient(90deg, transparent, var(--gold-border) 20%, var(--gold-border) 80%, transparent);
  }
  .process-step { text-align: center; padding: 0 24px; }
  .step-circle {
    width: 72px; height: 72px; border-radius: 50%;
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 28px;
    font-family: var(--cormorant); font-size: 28px; color: var(--gold);
    background: var(--black); position: relative; z-index: 1;
    transition: all 0.3s;
  }
  .process-step:hover .step-circle { background: var(--gold-dim); border-color: var(--gold); }
  .step-title {
    font-family: var(--serif); font-size: 18px; color: var(--white);
    margin-bottom: 12px;
  }
  .step-desc { font-size: 13px; color: var(--muted); line-height: 1.8; }

  /* ABOUT */
  .about {
    padding: 100px 60px;
    background: var(--black2);
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center;
  }
  .about-visual {
    position: relative; height: 480px;
  }
  .about-frame {
    position: absolute;
    border: 1px solid var(--gold-border);
  }
  .about-frame-1 {
    inset: 0;
    background: var(--black3);
    display: flex; align-items: center; justify-content: center;
  }
  .about-frame-2 {
    width: 70%; height: 65%;
    bottom: -24px; right: -24px;
    background: linear-gradient(135deg, var(--gold-dim), transparent);
    border-color: var(--gold);
  }
  .about-frame-text {
    font-family: var(--serif); font-size: 80px; font-weight: 700;
    color: rgba(201,168,76,0.08); line-height: 1; text-align: center;
    user-select: none;
  }
  .about-badge {
    position: absolute; top: 24px; left: -32px;
    background: var(--gold);
    padding: 16px 20px; text-align: center;
  }
  .about-badge-num {
    font-family: var(--serif); font-size: 36px; font-weight: 700;
    color: var(--black); line-height: 1;
  }
  .about-badge-txt {
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--black); margin-top: 4px;
  }
  .about-content .section-header { text-align: left; margin-bottom: 28px; }
  .about-content .section-tag { justify-content: flex-start; }
  .about-content .section-tag::before { display: none; }
  .about-p {
    font-size: 14px; color: var(--muted); line-height: 1.9;
    margin-bottom: 20px;
  }
  .about-values {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin: 32px 0;
  }
  .value-item {
    padding: 16px;
    border: 1px solid var(--gold-border);
    background: var(--black3);
  }
  .value-title {
    font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 6px;
  }
  .value-desc { font-size: 12px; color: var(--muted); line-height: 1.7; }

  /* TESTIMONIALS */
  .testimonials {
    padding: 100px 60px;
    background: var(--black);
  }
  .testi-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    margin-top: 64px;
  }
  .testi-card {
    background: var(--black2);
    border: 1px solid var(--gold-border);
    padding: 36px 32px;
    position: relative;
    transition: all 0.3s;
  }
  .testi-card:hover { border-color: var(--gold); transform: translateY(-4px); }
  .testi-quote {
    font-family: var(--cormorant); font-size: 64px; color: var(--gold);
    line-height: 1; margin-bottom: 16px; opacity: 0.5;
  }
  .testi-text {
    font-size: 14px; font-weight: 300; color: var(--muted);
    line-height: 1.9; font-style: italic; margin-bottom: 28px;
    font-family: var(--cormorant); font-size: 17px;
  }
  .testi-stars {
    display: flex; gap: 3px; margin-bottom: 16px;
    color: var(--gold); font-size: 12px;
  }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--serif); font-size: 15px; color: var(--gold);
  }
  .testi-name { font-size: 13px; font-weight: 500; color: var(--white); }
  .testi-role { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* BOOKING */
  .booking {
    padding: 100px 60px;
    background: var(--black2);
    display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px;
    align-items: start;
  }
  .booking-info .section-header { text-align: left; }
  .booking-info .section-tag { justify-content: flex-start; }
  .booking-info .section-tag::before { display: none; }
  .contact-detail {
    display: flex; align-items: center; gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--gold-border);
  }
  .contact-icon {
    width: 40px; height: 40px;
    border: 1px solid var(--gold-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .contact-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
  .contact-val { font-size: 14px; color: var(--text); margin-top: 2px; }

  .form-card {
    background: var(--black3);
    border: 1px solid var(--gold-border);
    padding: 44px;
  }
  .form-title {
    font-family: var(--serif); font-size: 24px; color: var(--white);
    margin-bottom: 32px; padding-bottom: 20px;
    border-bottom: 1px solid var(--gold-border);
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { margin-bottom: 20px; }
  .form-group label {
    display: block;
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px;
  }
  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    background: var(--black4);
    border: 1px solid rgba(255,255,255,0.06);
    color: var(--text);
    font-family: var(--sans); font-size: 13px; font-weight: 300;
    padding: 12px 16px; outline: none;
    transition: border-color 0.2s;
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--gold);
  }
  .form-group select option { background: var(--black3); }
  .form-group textarea { resize: none; height: 100px; }
  .service-select-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
    margin-bottom: 20px;
  }
  .svc-select-btn {
    padding: 12px 8px; text-align: center;
    background: var(--black4);
    border: 1px solid rgba(255,255,255,0.06);
    color: var(--muted); font-family: var(--sans);
    font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s;
  }
  .svc-select-btn:hover { border-color: var(--gold-border); color: var(--text); }
  .svc-select-btn.sel { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
  .svc-select-btn .ico { font-size: 18px; display: block; margin-bottom: 6px; }
  .submit-btn {
    width: 100%; padding: 16px;
    background: var(--gold); color: var(--black);
    font-family: var(--sans); font-size: 12px; font-weight: 500;
    letter-spacing: 3px; text-transform: uppercase;
    border: none; cursor: pointer; transition: all 0.25s;
    margin-top: 8px;
  }
  .submit-btn:hover { background: var(--gold2); }
  .success-msg {
    background: var(--gold-dim);
    border: 1px solid var(--gold-border);
    color: var(--gold);
    padding: 16px 20px;
    text-align: center;
    font-size: 13px; letter-spacing: 1px;
    margin-top: 16px;
  }

  /* FOOTER */
  .footer {
    background: var(--black);
    border-top: 1px solid var(--gold-border);
    padding: 60px 60px 32px;
  }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
    margin-bottom: 48px;
  }
  .footer-logo {
    font-family: var(--serif); font-size: 24px; color: var(--gold);
    margin-bottom: 16px;
  }
  .footer-tagline { font-size: 13px; color: var(--muted); line-height: 1.8; }
  .footer-col h4 {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px;
  }
  .footer-col ul { list-style: none; }
  .footer-col ul li {
    font-size: 13px; color: var(--muted);
    margin-bottom: 10px; cursor: pointer; transition: color 0.2s;
  }
  .footer-col ul li:hover { color: var(--text); }
  .footer-bottom {
    border-top: 1px solid var(--gold-border);
    padding-top: 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .footer-copy { font-size: 12px; color: var(--muted); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in {
    opacity: 0; transform: translateY(20px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* Mobile */
  @media (max-width: 900px) {
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .hero { padding: 120px 24px 80px; }
    .hero-ornament { display: none; }
    .hero-stats { display: none; }
    .services { padding: 60px 24px; }
    .services-grid { grid-template-columns: 1fr; }
    .process { padding: 60px 24px; }
    .process-steps { grid-template-columns: 1fr 1fr; }
    .process-steps::before { display: none; }
    .about { padding: 60px 24px; grid-template-columns: 1fr; }
    .about-visual { display: none; }
    .testimonials { padding: 60px 24px; }
    .testi-grid { grid-template-columns: 1fr; }
    .booking { padding: 60px 24px; grid-template-columns: 1fr; }
    .footer { padding: 48px 24px 24px; }
    .footer-top { grid-template-columns: 1fr 1fr; }
  }
`;

const SERVICES = [
  {
    icon: "🏛️", num: "01", name: "Organizing",
    desc: "Transform chaos into curated calm. Our professional organizers redesign every space with intention — from closets to entire homes.",
    features: ["Home & Office Decluttering", "Custom Storage Solutions", "Digital Organization", "Move-in/Move-out Services", "Seasonal Reorganization"],
    price: "₹4,999", unit: "/ session"
  },
  {
    icon: "✨", num: "02", name: "Cleaning",
    desc: "Deep, meticulous cleaning that restores every surface to perfection. We use premium, eco-conscious products throughout.",
    features: ["Deep Clean & Sanitization", "Post-Event Cleaning", "Move-out Cleaning", "Premium Upholstery Care", "Window & Facade Cleaning"],
    price: "₹3,499", unit: "/ session"
  },
  {
    icon: "🌿", num: "03", name: "Decorating",
    desc: "Elevate your interiors with our expert decorating team. We craft spaces that reflect your personality and elevate your everyday.",
    features: ["Interior Style Consultation", "Furniture Arrangement", "Seasonal Decor Refresh", "Event Styling & Setup", "Bespoke Accent Curation"],
    price: "₹7,999", unit: "/ project"
  }
];

const TESTIMONIALS = [
  { quote: "Elite Organizers transformed our entire home in one weekend. Every drawer, every shelf — pure perfection.", stars: 5, name: "Anjali Kapoor", role: "Interior Designer, Mumbai", init: "AK" },
  { quote: "Their cleaning service is unlike anything I've experienced. White-glove professionalism from start to finish.", stars: 5, name: "Rohan Mehta", role: "CEO, Hyderabad", init: "RM" },
  { quote: "The decorating team understood our vision immediately. The result was breathtaking and completely us.", stars: 5, name: "Priya & Arjun Nair", role: "Homeowners, Bangalore", init: "PN" }
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function EliteOrganizers() {
  const scrolled = useScrolled();
  const [activeService, setActiveService] = useState(0);
  const [selectedSvcs, setSelectedSvcs] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const processRef = useFadeIn();
  const aboutRef = useFadeIn();
  const testiRef = useFadeIn();
  const bookRef = useFadeIn();

  const toggleSvc = (s) => setSelectedSvcs(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", email: "", date: "", message: "" });
    setSelectedSvcs([]);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">
          Elite Organizers
          <span>Luxury Home Services</span>
        </div>
        <ul className="nav-links">
          {["services","process","about","testimonials","booking"].map(s => (
            <li key={s}><a onClick={() => scrollTo(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("booking")}>Book a Consult</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-ornament" />
        <div className="hero-content">
          <div className="hero-tag">Premium Home Services</div>
          <h1 className="hero-h1">
            Where Order<br />Meets <em>Elegance</em>
          </h1>
          <p className="hero-p">
            We transform living and working spaces into beautifully curated environments — through expert organizing, deep cleaning, and refined decorating.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("services")}>Explore Services</button>
            <button className="btn-ghost" onClick={() => scrollTo("booking")}>Get a Free Quote</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">500+</div><div className="stat-lbl">Projects Done</div></div>
          <div className="stat"><div className="stat-num">12</div><div className="stat-lbl">Years Experience</div></div>
          <div className="stat"><div className="stat-num">98%</div><div className="stat-lbl">Client Satisfaction</div></div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="section-header">
          <div className="section-tag">Our Services</div>
          <h2 className="section-title">Curated for <em>Perfection</em></h2>
          <p className="section-sub">Each service is delivered with precision, care, and a commitment to lasting excellence.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`svc-card${activeService === i ? " active" : ""}`}
              onClick={() => setActiveService(i)}
            >
              <div className="svc-num">{s.num}</div>
              <div className="svc-icon-wrap"><span className="svc-icon">{s.icon}</span></div>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
              <ul className="svc-features">
                {s.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <div className="svc-price">
                <span className="svc-price-num">{s.price}</span>
                <span className="svc-price-unit">{s.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="divider">
          <div className="divider-line" />
          <div className="divider-diamond" />
          <div className="divider-line" />
        </div>
      </section>

      {/* PROCESS */}
      <section className="process" id="process">
        <div className="section-header">
          <div className="section-tag">How We Work</div>
          <h2 className="section-title">A Seamless <em>Experience</em></h2>
        </div>
        <div className="process-steps fade-in" ref={processRef}>
          {[
            { n: "1", title: "Consultation", desc: "We begin with a complimentary walkthrough to understand your vision, needs, and timeline." },
            { n: "2", title: "Custom Plan", desc: "Our experts craft a tailored plan specific to your space, style, and budget." },
            { n: "3", title: "Execution", desc: "Our trained team arrives on time and works meticulously to deliver extraordinary results." },
            { n: "4", title: "Final Review", desc: "A thorough walkthrough ensures every detail meets our exacting standards — and yours." }
          ].map((step, i) => (
            <div className="process-step" key={i}>
              <div className="step-circle">{step.n}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-visual">
          <div className="about-frame about-frame-1">
            <div className="about-frame-text">ELITE</div>
          </div>
          <div className="about-frame about-frame-2" />
          <div className="about-badge">
            <div className="about-badge-num">12+</div>
            <div className="about-badge-txt">Years of<br/>Excellence</div>
          </div>
        </div>
        <div className="about-content fade-in" ref={aboutRef}>
          <div className="section-header">
            <div className="section-tag">About Us</div>
            <h2 className="section-title">Crafting Spaces with <em>Intention</em></h2>
          </div>
          <p className="about-p">Elite Organizers was founded on a singular belief — that a beautifully organized, immaculately clean, and thoughtfully decorated space transforms not just how you live, but how you feel.</p>
          <p className="about-p">With over a decade of experience across Hyderabad, Mumbai, and Bangalore, our team of certified professionals brings expertise, discretion, and artistry to every project.</p>
          <div className="about-values">
            {[
              { t: "Precision", d: "Every detail executed with care and intention." },
              { t: "Discretion", d: "Your privacy is paramount to our practice." },
              { t: "Sustainability", d: "Eco-conscious products and methods throughout." },
              { t: "Excellence", d: "We set a standard — then exceed it." }
            ].map((v, i) => (
              <div className="value-item" key={i}>
                <div className="value-title">{v.t}</div>
                <div className="value-desc">{v.d}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => scrollTo("booking")}>Schedule a Consultation</button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <div className="section-tag">Client Stories</div>
          <h2 className="section-title">Voices of <em>Trust</em></h2>
        </div>
        <div className="testi-grid fade-in" ref={testiRef}>
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-quote">"</div>
              <p className="testi-text">{t.quote}</p>
              <div className="testi-stars">{"★".repeat(t.stars)}</div>
              <div className="testi-author">
                <div className="testi-avatar">{t.init}</div>
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking" id="booking">
        <div className="booking-info">
          <div className="section-header">
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Begin Your <em>Transformation</em></h2>
          </div>
          <p className="about-p" style={{ marginBottom: 32 }}>Book a complimentary consultation and discover how we can transform your space into something extraordinary.</p>
          {[
            { icon: "📞", label: "Phone", val: "+91 98765 43210" },
            { icon: "✉️", label: "Email", val: "hello@eliteorganizers.in" },
            { icon: "📍", label: "Location", val: "Hyderabad, Mumbai & Bangalore" },
            { icon: "🕐", label: "Hours", val: "Mon – Sat, 9 AM – 7 PM" }
          ].map((c, i) => (
            <div className="contact-detail" key={i}>
              <div className="contact-icon">{c.icon}</div>
              <div><div className="contact-label">{c.label}</div><div className="contact-val">{c.val}</div></div>
            </div>
          ))}
        </div>
        <div className="fade-in" ref={bookRef}>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-title">Request a Consultation</div>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 00000 00000" />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Services Required</label>
              <div className="service-select-grid">
                {[["🏛️","Organizing"],["✨","Cleaning"],["🌿","Decorating"]].map(([ico, lbl]) => (
                  <div key={lbl} className={`svc-select-btn${selectedSvcs.includes(lbl) ? " sel" : ""}`} onClick={() => toggleSvc(lbl)}>
                    <span className="ico">{ico}</span>{lbl}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Property Type</label>
                <select><option>Apartment</option><option>Villa</option><option>Office</option><option>Retail Space</option></select>
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your space and requirements..." />
            </div>
            <button type="submit" className="submit-btn">Request Free Consultation</button>
            {submitted && <div className="success-msg">✦ Thank you! We'll reach out within 24 hours.</div>}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo">Elite Organizers</div>
            <p className="footer-tagline">Transforming spaces into extraordinary environments since 2012. Precision. Elegance. Perfection.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul><li>Organizing</li><li>Cleaning</li><li>Decorating</li><li>Consultation</li></ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul><li>About Us</li><li>Our Team</li><li>Press</li><li>Careers</li></ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul><li>+91 98765 43210</li><li>hello@eliteorganizers.in</li><li>Hyderabad</li><li>Mumbai · Bangalore</li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Elite Organizers. All rights reserved.</div>
          <div className="footer-copy">Crafted with precision.</div>
        </div>
      </footer>
    </>
  );
}
