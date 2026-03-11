<style >
  :root {
    --orange: #E85D04;
    --orange-dark: #C44D03;
    --orange-ultra-pale: #FFF6F0;
    --orange-pale: #FFE8D8;
    --black: #111111;
    --text: #1C1C1C;
    --gray: #6B7280;
    --border: #E8E0D8;
    --white: #FFFFFF;
    --cream: #FDFAF7;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--text);
    max-width: 430px; margin: 0 auto;
    overflow-x: hidden;
  }

  /* HEADER */
  header {
    background: var(--white);
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 50;
    box-shadow: 0 1px 12px rgba(0,0,0,0.05);
  }
  .logo-row { display: flex; align-items: center; gap: 10px; }
  .logo-mark {
    width: 36px; height: 36px; background: var(--orange);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    color: white; font-family: 'Sora', sans-serif; font-weight: 800; font-size: 16px;
  }
  .logo-text { font-family: 'Sora', sans-serif; }
  .logo-text-top { font-size: 13px; font-weight: 800; color: var(--text); letter-spacing: 0.5px; }
  .logo-text-bot { font-size: 10px; font-weight: 600; color: var(--gray); letter-spacing: 1px; text-transform: uppercase; }
  .hamburger { font-size: 22px; color: var(--text); background: none; border: none; cursor: pointer; }

  /* HERO CARD */
  .hero-card {
    background: var(--black);
    margin: 20px 16px 0;
    border-radius: 24px;
    padding: 32px 24px;
    position: relative; overflow: hidden;
    animation: slideUp 0.5s ease both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-card::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,93,4,0.3), transparent 70%);
  }
  .hero-card::after {
    content: 'AWR';
    position: absolute; bottom: -20px; right: -10px;
    font-family: 'Sora', sans-serif;
    font-size: 100px; font-weight: 800;
    color: rgba(255,255,255,0.03); line-height: 1;
    pointer-events: none;
  }
  .hero-top { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; }
  .hero-avatar {
    width: 80px; height: 80px; border-radius: 16px;
    background: linear-gradient(135deg, #2a2a2a, #3d3d3d);
    flex-shrink: 0; overflow: hidden;
    border: 2px solid var(--orange);
    display: flex; align-items: center; justify-content: center;
    font-size: 40px;
  }
  .hero-meta { flex: 1; padding-top: 4px; }
  .hero-verified {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(232,93,4,0.2); color: var(--orange);
    font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 4px 10px; border-radius: 100px;
    margin-bottom: 8px;
  }
  .hero h1 {
    font-family: 'Sora', sans-serif;
    font-size: 24px; font-weight: 800; color: white;
    line-height: 1.1; margin-bottom: 4px;
  }
  .hero-role { font-size: 12px; color: rgba(255,255,255,0.5); letter-spacing: 0.5px; }
  .hero-stats-row {
    display: flex; gap: 0; background: rgba(255,255,255,0.06);
    border-radius: 12px; margin-bottom: 24px; overflow: hidden;
  }
  .hs {
    flex: 1; padding: 14px 8px; text-align: center;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .hs:last-child { border-right: none; }
  .hs-n { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: var(--orange); }
  .hs-l { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .hero-desc {
    font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.7;
    margin-bottom: 24px;
  }
  .hero-btns { display: flex; flex-direction: column; gap: 10px; }
  .btn-primary {
    background: var(--orange); color: white;
    padding: 15px 20px; border: none; border-radius: 12px;
    font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 700;
    text-decoration: none; text-align: center;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s;
  }
  .btn-primary:active { background: var(--orange-dark); }
  .btn-secondary {
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8);
    padding: 13px 20px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.12);
    font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600;
    text-decoration: none; text-align: center;
    display: flex; align-items: center; justify-content: center;
  }

  /* CONTENT */
  .content { padding: 20px 16px; }
  .card {
    background: var(--white); border-radius: 20px;
    padding: 24px; margin-bottom: 16px;
    border: 1px solid var(--border);
    box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  }
  .card-tag {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--orange); font-weight: 700; margin-bottom: 6px;
  }
  .card-title {
    font-family: 'Sora', sans-serif;
    font-size: 20px; font-weight: 800; margin-bottom: 16px;
  }

  /* SERVICES */
  .svc-items { display: flex; flex-direction: column; gap: 12px; }
  .svc-row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px; background: var(--cream); border-radius: 12px;
  }
  .svc-row-icon {
    width: 44px; height: 44px; flex-shrink: 0;
    background: var(--orange-pale); border-radius: 10px;
    display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .svc-row h4 { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 2px; }
  .svc-row p { font-size: 12px; color: var(--gray); }
  .svc-check { margin-left: auto; color: var(--orange); font-size: 16px; }

  /* ORANGE HIGHLIGHT CARD */
  .highlight-card {
    background: var(--orange);
    border-radius: 20px; padding: 28px 24px;
    margin-bottom: 16px; text-align: center;
  }
  .highlight-card h3 {
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 800; color: white; margin-bottom: 8px;
  }
  .highlight-card p { font-size: 14px; color: rgba(255,255,255,0.85); line-height: 1.6; margin-bottom: 20px; }
  .highlight-phone {
    font-family: 'Sora', sans-serif;
    font-size: 30px; font-weight: 800; color: white;
    text-decoration: none; display: block; margin-bottom: 16px;
    letter-spacing: 1px;
  }
  .btn-white-rounded {
    background: white; color: var(--orange);
    padding: 13px 28px; border-radius: 100px; border: none;
    font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 700; text-decoration: none;
    display: inline-block; cursor: pointer;
  }

  /* REVIEWS */
  .review-cards { display: flex; flex-direction: column; gap: 12px; }
  .review-card {
    background: var(--cream); border-radius: 14px; padding: 18px;
    border: 1px solid var(--border);
  }
  .r-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .r-stars { color: var(--orange); font-size: 13px; }
  .r-verified { font-size: 10px; color: var(--gray); letter-spacing: 0.5px; }
  .r-text { font-size: 13px; color: var(--text); line-height: 1.65; margin-bottom: 10px; }
  .r-author { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: var(--gray); }

  /* FORM CARD */
  .form-card {
    background: var(--white); border-radius: 20px;
    padding: 28px 20px; margin-bottom: 16px;
    border: 1px solid var(--border);
    box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  }
  .form-card h3 { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; margin-bottom: 4px; }
  .form-card .sub { font-size: 13px; color: var(--gray); margin-bottom: 20px; }
  .fgroup { margin-bottom: 14px; }
  .fgroup label { display: block; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); font-weight: 600; margin-bottom: 6px; }
  .fgroup input, .fgroup select, .fgroup textarea {
    width: 100%; background: var(--cream); border: 1.5px solid var(--border);
    color: var(--text); padding: 13px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    outline: none; border-radius: 10px; transition: border-color 0.2s;
    -webkit-appearance: none;
  }
  .fgroup input:focus, .fgroup select:focus, .fgroup textarea:focus { border-color: var(--orange); }
  .fgroup textarea { resize: none; height: 90px; }
  .btn-form {
    width: 100%; background: var(--orange); color: white;
    padding: 15px; border: none; border-radius: 100px;
    font-family: 'Sora', sans-serif;
    font-size: 16px; font-weight: 700; cursor: pointer;
  }

  /* HOURS CARD */
  .hours-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .hours-row:last-child { border-bottom: none; }
  .hours-day { font-size: 14px; font-weight: 600; }
  .hours-time { font-size: 14px; color: var(--gray); }
  .hours-closed { color: #EF4444; }

  /* CONTACT CHIPS */
  .contact-chips { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
  .chip {
    background: var(--white); border-radius: 14px; padding: 16px 18px;
    display: flex; align-items: center; gap: 14px;
    text-decoration: none; color: var(--text);
    border: 1px solid var(--border);
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .chip-icon {
    width: 40px; height: 40px; background: var(--orange-pale);
    border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
  }
  .chip-label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); }
  .chip-val { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; }

  footer {
    background: var(--black);
    padding: 28px 20px; text-align: center; border-radius: 20px 20px 0 0;
  }
  .footer-logo { font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 800; color: white; margin-bottom: 4px; }
  .footer-sub { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
  .footer-links { display: flex; justify-content: center; gap: 20px; margin-bottom: 16px; }
  .footer-links a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 13px; }
  .footer-copy { font-size: 11px; color: rgba(255,255,255,0.3); }
</style>
<template>

<header>
  <div class="logo-row">
    <div class="logo-mark">A</div>
    <div class="logo-text">
      <div class="logo-text-top">Authority</div>
      <div class="logo-text-bot">Window & Repair</div>
    </div>
  </div>
  <button class="hamburger">☰</button>
</header>

<!-- HERO CARD -->
<div class="hero-card">
  <div class="hero-top">
    <div class="hero-avatar">👷</div>
    <div class="hero-meta">
      <div class="hero-verified">✓ Verified Technician</div>
      <h1>Daniel<br>Chapurin</h1>
      <div class="hero-role">Senior Window Technician</div>
    </div>
  </div>
  <div class="hero-stats-row">
    <div class="hs"><div class="hs-n">7+</div><div class="hs-l">Years</div></div>
    <div class="hs"><div class="hs-n">850+</div><div class="hs-l">Jobs</div></div>
    <div class="hs"><div class="hs-n">4.9</div><div class="hs-l">Rating</div></div>
    <div class="hs"><div class="hs-n">24h</div><div class="hs-l">Avail</div></div>
  </div>
  <p class="hero-desc">7 years of precision window work. Daniel responds fast, works clean, and delivers results — every time. Hundreds of homeowners trust him by name.</p>
  <div class="hero-btns">
    <a class="btn-primary" href="tel:6304735256">📞 Call 630-473-5256</a>
    <a class="btn-secondary" href="#estimate">Request Free Estimate →</a>
  </div>
</div>

<!-- CONTENT -->
<div class="content">

  <!-- SERVICES -->
  <div class="card">
    <div class="card-tag">What Daniel Does</div>
    <div class="card-title">Services</div>
    <div class="svc-items">
      <div class="svc-row">
        <div class="svc-row-icon">🔧</div>
        <div>
          <h4>Window Repair</h4>
          <p>Glass, seals, hardware — same day.</p>
        </div>
        <div class="svc-check">✓</div>
      </div>
      <div class="svc-row">
        <div class="svc-row-icon">🪟</div>
        <div>
          <h4>Full Replacement</h4>
          <p>All window types, full removal.</p>
        </div>
        <div class="svc-check">✓</div>
      </div>
      <div class="svc-row">
        <div class="svc-row-icon">🚨</div>
        <div>
          <h4>Emergency Glass</h4>
          <p>Urgent same-day service.</p>
        </div>
        <div class="svc-check">✓</div>
      </div>
      <div class="svc-row">
        <div class="svc-row-icon">❄️</div>
        <div>
          <h4>Energy Upgrades</h4>
          <p>Double-pane, low-E, sealing.</p>
        </div>
        <div class="svc-check">✓</div>
      </div>
    </div>
  </div>

  <!-- EMERGENCY CTA -->
  <div class="highlight-card">
    <h3>Need a Window Fixed<br>Today?</h3>
    <p>Call Daniel directly for same-day service. No hidden fees, 100% satisfaction guaranteed.</p>
    <a class="highlight-phone" href="tel:6304735256">630-473-5256</a>
    <a class="btn-white-rounded" href="mailto:Authoritywindowrepair@gmail.com">Send Email</a>
  </div>

  <!-- REVIEWS -->
  <div class="card">
    <div class="card-tag">Customer Reviews</div>
    <div class="card-title">What They Say</div>
    <div class="review-cards">
      <div class="review-card">
        <div class="r-top">
          <div class="r-stars">★★★★★</div>
          <div class="r-verified">Verified Review</div>
        </div>
        <p class="r-text">"Daniel came same day, fixed my foggy seal, cleaned up perfectly. Fair price, no pressure. Highly recommend."</p>
        <div class="r-author">Sarah M. — Aurora, IL</div>
      </div>
      <div class="review-card">
        <div class="r-top">
          <div class="r-stars">★★★★★</div>
          <div class="r-verified">Verified Review</div>
        </div>
        <p class="r-text">"After a break-in Daniel came same day. New glass installed by evening. Absolute lifesaver."</p>
        <div class="r-author">James T. — Naperville, IL</div>
      </div>
      <div class="review-card">
        <div class="r-top">
          <div class="r-stars">★★★★★</div>
          <div class="r-verified">Verified Review</div>
        </div>
        <p class="r-text">"Honest, punctual, quality work. He's my go-to window guy from now on."</p>
        <div class="r-author">Linda K. — Wheaton, IL</div>
      </div>
    </div>
  </div>

  <!-- FORM -->
  <div class="form-card" id="estimate">
    <h3>Get a Free Estimate</h3>
    <p class="sub">Daniel responds within the hour.</p>
    <div class="fgroup">
      <label>Your Name</label>
      <input type="text" placeholder="John Smith">
    </div>
    <div class="fgroup">
      <label>Phone Number</label>
      <input type="tel" placeholder="(630) 000-0000">
    </div>
    <div class="fgroup">
      <label>Service Needed</label>
      <select>
        <option value="">Select a service...</option>
        <option>Window Repair</option>
        <option>Window Replacement</option>
        <option>Emergency Glass</option>
        <option>Energy Upgrade</option>
        <option>Other / Not Sure</option>
      </select>
    </div>
    <div class="fgroup">
      <label>Tell Us More</label>
      <textarea placeholder="Number of windows, type, any urgency..."></textarea>
    </div>
    <button class="btn-form" onclick="alert('Sent! Daniel will contact you shortly.')">Send Request →</button>
  </div>

  <!-- CONTACT CHIPS -->
  <div class="contact-chips">
    <a class="chip" href="tel:6304735256">
      <div class="chip-icon">📞</div>
      <div><div class="chip-label">Call Us</div><div class="chip-val">630-473-5256</div></div>
    </a>
    <a class="chip" href="mailto:Authoritywindowrepair@gmail.com">
      <div class="chip-icon">✉️</div>
      <div><div class="chip-label">Email</div><div class="chip-val">Authoritywindowrepair@gmail.com</div></div>
    </a>
  </div>

  <!-- HOURS -->
  <div class="card">
    <div class="card-tag">Availability</div>
    <div class="card-title">Business Hours</div>
    <div class="hours-row"><span class="hours-day">Monday – Friday</span><span class="hours-time">7:00 AM – 6:00 PM</span></div>
    <div class="hours-row"><span class="hours-day">Saturday</span><span class="hours-time">7:00 AM – 4:00 PM</span></div>
    <div class="hours-row"><span class="hours-day">Sunday</span><span class="hours-time hours-closed">Closed</span></div>
  </div>

</div>

<footer>
  <div class="footer-logo">Authority Window & Repair</div>
  <div class="footer-sub">Window Repair · Installation · Replacement</div>
  <div class="footer-links">
    <a href="#">Home</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </div>
  <div class="footer-copy">© 2025 Authority Window Repair · All rights reserved</div>
</footer>

</template>