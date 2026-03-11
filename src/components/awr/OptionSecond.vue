<style scoped>
  :root {
    --bg: #141414;
    --surface: #1E1E1E;
    --surface2: #282828;
    --orange: #E85D04;
    --orange-glow: rgba(232,93,4,0.15);
    --cream: #FAF0E6;
    --gray: #999;
    --white: #F0F0F0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Barlow', sans-serif;
    background: var(--bg);
    color: var(--white);
    max-width: 430px; margin: 0 auto;
    overflow-x: hidden;
  }

  /* HEADER */
  header {
    background: var(--bg);
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(232,93,4,0.3);
    position: sticky; top: 0; z-index: 50;
  }
  .logo-top { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 18px; letter-spacing: 3px; color: var(--white); text-transform: uppercase; }
  .logo-bot { background: var(--orange); color: white; font-size: 9px; letter-spacing: 2px; padding: 2px 8px; font-weight: 700; text-transform: uppercase; display: inline-block; margin-top: 2px; }
  .hamburger { font-size: 22px; color: var(--white); background: none; border: none; cursor: pointer; }

  /* HERO FULL */
  .hero {
    position: relative; min-height: 520px;
    display: flex; flex-direction: column; justify-content: flex-end;
    overflow: hidden;
  }
  .hero-img {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80') center top / cover;
    filter: brightness(0.35) saturate(0.7);
  }
  .hero-grad {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 30%, var(--bg) 100%);
  }
  .hero-content {
    position: relative; z-index: 2; padding: 0 24px 40px;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--orange); color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 6px 14px;
    margin-bottom: 16px;
  }
  .hero h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 68px; font-weight: 900; text-transform: uppercase;
    line-height: 0.9; color: var(--white); margin-bottom: 4px;
  }
  .hero h1 em { color: var(--orange); font-style: normal; }
  .hero-sub {
    font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--gray); margin-bottom: 24px;
  }
  .hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
  .pill {
    background: rgba(255,255,255,0.08); color: var(--white);
    font-size: 12px; font-weight: 600; letter-spacing: 1px;
    padding: 6px 14px; border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.12);
  }
  .pill.orange { background: var(--orange-glow); border-color: rgba(232,93,4,0.4); color: var(--orange); }
  .hero-cta { display: flex; flex-direction: column; gap: 10px; }
  .btn-call {
    background: var(--orange); color: white;
    padding: 16px; border: none; border-radius: 8px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; text-decoration: none;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .btn-ghost {
    background: transparent; color: var(--white);
    padding: 14px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
  }

  /* STATS */
  .stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    background: var(--surface);
    border-top: 2px solid var(--orange);
  }
  .stat { padding: 20px 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
  .stat:last-child { border-right: none; }
  .stat-n { font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 900; color: var(--orange); }
  .stat-l { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); margin-top: 2px; }

  /* SECTIONS */
  .section { padding: 40px 20px; }
  .section-tag {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--orange); font-weight: 600; margin-bottom: 6px;
    display: flex; align-items: center; gap: 8px;
  }
  .section-tag::before { content: ''; width: 20px; height: 2px; background: var(--orange); }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px; font-weight: 800; text-transform: uppercase;
    margin-bottom: 24px; line-height: 1.05;
  }

  /* SERVICE CARDS */
  .svc-grid { display: flex; flex-direction: column; gap: 2px; }
  .svc-card {
    background: var(--surface); padding: 20px;
    display: flex; align-items: center; gap: 16px;
    border-left: 3px solid transparent;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .svc-card:active { border-left-color: var(--orange); background: var(--surface2); }
  .svc-card-icon {
    width: 52px; height: 52px; flex-shrink: 0;
    background: var(--orange-glow);
    border: 1px solid rgba(232,93,4,0.3);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .svc-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .svc-card p { font-size: 13px; color: var(--gray); line-height: 1.5; }
  .svc-arrow { margin-left: auto; color: var(--orange); font-size: 18px; }

  /* QUOTE SECTION */
  .quote-section {
    background: var(--orange);
    padding: 40px 24px; text-align: center;
  }
  .quote-section blockquote {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 700; color: white;
    line-height: 1.2; margin-bottom: 16px; font-style: italic;
  }
  .quote-section cite { font-size: 13px; color: rgba(255,255,255,0.8); letter-spacing: 1px; }

  /* REVIEWS */
  .reviews { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.05); }
  .review {
    background: var(--surface); padding: 24px 20px;
  }
  .r-stars { color: var(--orange); font-size: 13px; letter-spacing: 2px; margin-bottom: 10px; }
  .r-text { font-size: 14px; color: var(--gray); line-height: 1.6; margin-bottom: 12px; }
  .r-author { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }

  /* EMERGENCY BANNER */
  .emergency {
    background: var(--surface2);
    border: 1px solid rgba(232,93,4,0.3);
    margin: 0 20px 0; border-radius: 12px;
    padding: 24px; text-align: center;
  }
  .emergency-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--orange); margin-bottom: 8px;
  }
  .emergency h3 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 800; text-transform: uppercase;
    color: var(--white); margin-bottom: 8px;
  }
  .emergency p { font-size: 13px; color: var(--gray); line-height: 1.5; margin-bottom: 20px; }
  .emergency-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px; font-weight: 900; color: var(--orange);
    text-decoration: none; display: block; margin-bottom: 16px;
  }
  .btn-orange-full {
    background: var(--orange); color: white;
    padding: 14px 28px; border: none; border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; text-decoration: none; display: inline-block;
    width: 100%;
  }

  /* FORM */
  .form-section { padding: 40px 20px; }
  .form-inner {
    background: var(--surface); border-radius: 12px; padding: 28px 20px;
    border: 1px solid rgba(232,93,4,0.15);
  }
  .form-inner h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; }
  .form-inner .sub { font-size: 13px; color: var(--gray); margin-bottom: 20px; }
  .fgroup { margin-bottom: 14px; }
  .fgroup label { display: block; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--gray); font-weight: 600; margin-bottom: 6px; }
  .fgroup input, .fgroup select, .fgroup textarea {
    width: 100%; background: var(--bg); border: 1px solid rgba(255,255,255,0.1);
    color: var(--white); padding: 13px 14px;
    font-family: 'Barlow', sans-serif; font-size: 15px;
    outline: none; border-radius: 6px; transition: border-color 0.2s;
    -webkit-appearance: none;
  }
  .fgroup input:focus, .fgroup select:focus, .fgroup textarea:focus { border-color: var(--orange); }
  .fgroup select option { background: var(--bg); }
  .fgroup textarea { resize: none; height: 90px; }
  .btn-submit {
    width: 100%; background: var(--orange); color: white;
    padding: 15px; border: none; border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer; margin-top: 6px;
  }

  /* CONTACT GRID */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 20px 40px; }
  .c-item {
    background: var(--surface); border-radius: 10px; padding: 18px 14px;
    text-align: center; text-decoration: none; color: var(--white);
  }
  .c-item-icon { font-size: 24px; margin-bottom: 8px; }
  .c-item-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gray); margin-bottom: 4px; }
  .c-item-val { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; color: var(--orange); }

  footer {
    background: var(--surface); border-top: 2px solid var(--orange);
    padding: 28px 20px; text-align: center;
  }
  footer p { font-size: 12px; color: var(--gray); margin-bottom: 8px; }
  .footer-links { display: flex; justify-content: center; gap: 20px; }
  .footer-links a { color: var(--gray); text-decoration: none; font-size: 13px; }
  .footer-links a:hover { color: var(--orange); }
</style>
<template>

<header>
  <div>
    <div class="logo-top">Authority</div>
    <div class="logo-bot">Window ▪ Repair</div>
  </div>
  <button class="hamburger">☰</button>
</header>

<!-- HERO -->
<section class="hero">
  <div class="hero-img"></div>
  <div class="hero-grad"></div>
  <div class="hero-content">
    <div class="hero-tag">⭐ Window Technician</div>
    <h1>Daniel<br><em>Chapurin</em></h1>
    <div class="hero-sub">Authority Window & Repair</div>
    <div class="hero-pills">
      <span class="pill orange">7 Yrs Experience</span>
      <span class="pill">Certified</span>
      <span class="pill">5-Star Rated</span>
      <span class="pill">Same-Day Available</span>
    </div>
    <div class="hero-cta">
      <a class="btn-call" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-ghost" href="#estimate">Request Free Estimate</a>
    </div>
  </div>
</section>

<!-- STATS -->
<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>

<!-- SERVICES -->
<section class="section">
  <div class="section-tag">What He Does</div>
  <div class="section-title">Services</div>
  <div class="svc-grid">
    <div class="svc-card">
      <div class="svc-card-icon">🔧</div>
      <div>
        <h3>Window Repair</h3>
        <p>Glass, seals, hardware — fixed same day.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
    <div class="svc-card">
      <div class="svc-card-icon">🪟</div>
      <div>
        <h3>Replacement</h3>
        <p>Full replacement, all window types.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
    <div class="svc-card">
      <div class="svc-card-icon">🚨</div>
      <div>
        <h3>Emergency Glass</h3>
        <p>Urgent same-day glass replacement.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
    <div class="svc-card">
      <div class="svc-card-icon">❄️</div>
      <div>
        <h3>Energy Upgrade</h3>
        <p>Double-pane, low-E, weatherstripping.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
  </div>
</section>

<!-- QUOTE -->
<div class="quote-section">
  <blockquote>"The job isn't done until the customer is completely satisfied — every time."</blockquote>
  <cite>— Daniel Chapurin, Senior Technician</cite>
</div>

<!-- REVIEWS -->
<section class="section">
  <div class="section-tag">Client Reviews</div>
  <div class="section-title">What They Say</div>
  <div class="reviews">
    <div class="review">
      <div class="r-stars">★★★★★</div>
      <p class="r-text">"Daniel came same day and fixed my foggy window fast. Super professional, no mess, fair price."</p>
      <div class="r-author">— Sarah M., Aurora IL</div>
    </div>
    <div class="review">
      <div class="r-stars">★★★★★</div>
      <p class="r-text">"After a break-in, Daniel was there within hours. Had new glass in by evening. Could not ask for more."</p>
      <div class="r-author">— James T., Naperville IL</div>
    </div>
    <div class="review">
      <div class="r-stars">★★★★★</div>
      <p class="r-text">"Honest, on time, great work. He's the only person I'll call for windows."</p>
      <div class="r-author">— Linda K., Wheaton IL</div>
    </div>
  </div>
</section>

<!-- EMERGENCY -->
<div class="emergency">
  <div class="emergency-label">🚨 Emergency Service</div>
  <h3>Broken Window?<br>We Come Same Day.</h3>
  <p>Available Monday–Saturday. Don't wait — broken windows are a security risk.</p>
  <a class="emergency-num" href="tel:6304735256">630-473-5256</a>
  <a class="btn-orange-full" href="tel:6304735256">Call Daniel Now</a>
</div>

<!-- FORM -->
<div class="form-section" id="estimate">
  <div class="form-inner">
    <h3>Free Estimate</h3>
    <p class="sub">Daniel responds within the hour.</p>
    <div class="fgroup">
      <label>Name</label>
      <input type="text" placeholder="Your full name">
    </div>
    <div class="fgroup">
      <label>Phone</label>
      <input type="tel" placeholder="(630) 000-0000">
    </div>
    <div class="fgroup">
      <label>Service</label>
      <select>
        <option value="">Select service...</option>
        <option>Window Repair</option>
        <option>Window Replacement</option>
        <option>Emergency Glass</option>
        <option>Energy Upgrade</option>
        <option>Other</option>
      </select>
    </div>
    <div class="fgroup">
      <label>Notes</label>
      <textarea placeholder="Describe the issue..."></textarea>
    </div>
    <button class="btn-submit" onclick="alert('Request sent! Daniel will reach out shortly.')">Submit Request →</button>
  </div>
</div>

<!-- CONTACT GRID -->
<div class="contact-grid">
  <a class="c-item" href="tel:6304735256">
    <div class="c-item-icon">📞</div>
    <div class="c-item-label">Phone</div>
    <div class="c-item-val">630-473-5256</div>
  </a>
  <a class="c-item" href="mailto:Authoritywindowrepair@gmail.com">
    <div class="c-item-icon">✉️</div>
    <div class="c-item-label">Email</div>
    <div class="c-item-val">Send Email</div>
  </a>
  <div class="c-item" style="grid-column: span 2;">
    <div class="c-item-icon">🕐</div>
    <div class="c-item-label">Hours</div>
    <div class="c-item-val" style="font-size: 13px;">Mon–Fri 7AM–6PM &nbsp;|&nbsp; Sat 7AM–4PM</div>
  </div>
</div>

<footer>
  <p>© 2025 Authority Window Repair · All rights reserved</p>
  <div class="footer-links">
    <a href="#">Home</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </div>
</footer>

</template>