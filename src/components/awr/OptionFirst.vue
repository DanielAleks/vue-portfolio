<style scoped>
:root {
  --cream: #faf0e6;
  --cream-dark: #f0e4d4;
  --orange: #e85d04;
  --orange-light: #ff7a2b;
  --orange-pale: #fff0e8;
  --brown: #2a1a0e;
  --gray: #6b5c52;
  --white: #ffffff;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Nunito Sans", sans-serif;
  background: var(--cream);
  color: var(--brown);
  max-width: 430px;
  margin: 0 auto;
  overflow-x: hidden;
}

/* HEADER */
header {
  background: var(--cream);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(232, 93, 4, 0.15);
  position: sticky;
  top: 0;
  z-index: 50;
}
.logo-wrap {
  display: flex;
  flex-direction: column;
}
.logo-top {
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  font-size: 16px;
  letter-spacing: 2px;
  color: var(--orange);
  text-transform: uppercase;
}
.logo-bot {
  background: var(--orange);
  color: white;
  font-size: 10px;
  letter-spacing: 1.5px;
  padding: 2px 6px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 2px;
  border-radius: 2px;
}
.hamburger {
  font-size: 24px;
  color: var(--brown);
  background: none;
  border: none;
  cursor: pointer;
}

/* HERO */
.hero {
  background: var(--brown);
  position: relative;
  overflow: hidden;
  padding: 48px 24px 56px;
  text-align: center;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 100%,
    rgba(232, 93, 4, 0.25) 0%,
    transparent 65%
  );
}
.hero-badge {
  display: inline-block;
  background: var(--orange);
  color: white;
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 24px;
  position: relative;
}
.hero-photo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 28px;
}
.hero-photo-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid var(--orange);
  padding: 4px;
  display: inline-block;
}
.hero-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--cream-dark);
  display: block;
  overflow: hidden;
}
.hero-photo-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #3d2b1a, #5a3e2a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}
.exp-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: var(--orange);
  color: white;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--brown);
  font-family: "Nunito", sans-serif;
}
.exp-dot-num {
  font-size: 15px;
  font-weight: 900;
  line-height: 1;
}
.exp-dot-txt {
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1.2;
  text-align: center;
}
.hero h1 {
  font-family: "Nunito", sans-serif;
  font-size: 38px;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 6px;
  position: relative;
}
.hero h1 span {
  color: var(--orange-light);
}
.hero-role {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 24px;
  position: relative;
}
.hero-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 32px;
  position: relative;
}
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}
.btn-main {
  background: var(--orange);
  color: white;
  padding: 16px 24px;
  border-radius: 100px;
  border: none;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.2s,
    background 0.2s;
}
.btn-main:active {
  transform: scale(0.97);
  background: #c44d03;
}
.btn-outline {
  background: transparent;
  color: white;
  padding: 14px 24px;
  border-radius: 100px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* STATS ROW */
.stats {
  display: flex;
  background: var(--orange);
}
.stat {
  flex: 1;
  padding: 18px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.stat:last-child {
  border-right: none;
}
.stat-n {
  font-family: "Nunito", sans-serif;
  font-size: 26px;
  font-weight: 900;
  color: white;
  line-height: 1;
}
.stat-l {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* SECTION */
.section {
  padding: 40px 20px;
}
.section-tag {
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--orange);
  font-weight: 700;
  margin-bottom: 8px;
}
.section-title {
  font-family: "Nunito", sans-serif;
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.15;
}

/* SPECIALTIES */
.spec-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.spec-item {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: 0 2px 12px rgba(42, 26, 14, 0.06);
}
.spec-icon-wrap {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: var(--orange-pale);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.spec-item h3 {
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 4px;
}
.spec-item p {
  font-size: 13px;
  color: var(--gray);
  line-height: 1.5;
}

/* REVIEWS */
.reviews-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.review-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(42, 26, 14, 0.06);
  position: relative;
}
.review-card::before {
  content: '"';
  font-family: "Nunito", sans-serif;
  font-size: 60px;
  color: var(--orange);
  opacity: 0.2;
  position: absolute;
  top: 4px;
  left: 14px;
  line-height: 1;
}
.stars {
  color: var(--orange);
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.review-text {
  font-size: 14px;
  color: var(--gray);
  line-height: 1.65;
  margin-bottom: 14px;
}
.review-author {
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 800;
}

/* CTA BLOCK */
.cta-block {
  background: var(--orange);
  margin: 0 20px 40px;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
}
.cta-block h2 {
  font-family: "Nunito", sans-serif;
  font-size: 26px;
  font-weight: 900;
  color: white;
  margin-bottom: 8px;
}
.cta-block p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}
.cta-phone {
  font-family: "Nunito", sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  letter-spacing: 1px;
}
.btn-white {
  background: white;
  color: var(--orange);
  padding: 14px 32px;
  border-radius: 100px;
  border: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  display: inline-block;
}

/* FORM */
.form-wrap {
  background: white;
  border-radius: 20px;
  padding: 28px 20px;
  margin: 0 20px 40px;
  box-shadow: 0 4px 20px rgba(42, 26, 14, 0.08);
}
.form-wrap h3 {
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 4px;
}
.form-wrap .sub {
  font-size: 13px;
  color: var(--gray);
  margin-bottom: 20px;
}
.fgroup {
  margin-bottom: 14px;
}
.fgroup label {
  display: block;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gray);
  font-weight: 700;
  margin-bottom: 6px;
}
.fgroup input,
.fgroup select,
.fgroup textarea {
  width: 100%;
  background: var(--cream);
  border: 1.5px solid rgba(232, 93, 4, 0.15);
  color: var(--brown);
  padding: 13px 14px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 15px;
  outline: none;
  border-radius: 10px;
  transition: border-color 0.2s;
  -webkit-appearance: none;
}
.fgroup input:focus,
.fgroup select:focus,
.fgroup textarea:focus {
  border-color: var(--orange);
}
.fgroup textarea {
  resize: none;
  height: 100px;
}
.btn-form {
  width: 100%;
  background: var(--orange);
  color: white;
  padding: 15px;
  border: none;
  border-radius: 100px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s;
}
.btn-form:active {
  background: #c44d03;
}

/* CONTACT INFO */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
  margin-bottom: 40px;
}
.contact-item {
  background: white;
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(42, 26, 14, 0.05);
  text-decoration: none;
  color: var(--brown);
}
.contact-item-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background: var(--orange-pale);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.contact-item-label {
  font-size: 11px;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.contact-item-val {
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  font-size: 15px;
}

/* FOOTER */
footer {
  background: var(--orange);
  padding: 28px 20px;
  text-align: center;
}
footer p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  margin-bottom: 12px;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
}
.footer-copy {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-top: 16px;
}
</style>

<template>
  <header>
    <div class="logo-wrap">
      <span class="logo-top">Authority</span>
      <span class="logo-bot">Window ▪ Repair</span>
    </div>
    <button class="hamburger">☰</button>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-badge">⭐ Featured Technician</div>
    <div class="hero-photo-wrap">
      <div class="hero-photo-ring">
        <div class="hero-photo">
          <div class="hero-photo-placeholder">👷</div>
        </div>
      </div>
      <div class="exp-dot">
        <span class="exp-dot-num">7</span>
        <span class="exp-dot-txt">YRS EXP</span>
      </div>
    </div>
    <h1>Daniel<br /><span>Chapurin</span></h1>
    <div class="hero-role">Senior Window Technician</div>
    <p class="hero-desc">
      7 years of precision window work. Daniel shows up on time, communicates
      clearly, and gets the job done right — every single time.
    </p>
    <div class="hero-actions">
      <a class="btn-main" href="tel:6304735256">📞 Call Daniel Now</a>
      <a class="btn-outline" href="#estimate">Get Free Estimate →</a>
    </div>
  </section>

  <!-- STATS -->
  <div class="stats">
    <div class="stat">
      <div class="stat-n">7+</div>
      <div class="stat-l">Yrs Exp</div>
    </div>
    <div class="stat">
      <div class="stat-n">850+</div>
      <div class="stat-l">Jobs Done</div>
    </div>
    <div class="stat">
      <div class="stat-n">4.9★</div>
      <div class="stat-l">Rating</div>
    </div>
  </div>

  <!-- ABOUT -->
  <section class="section">
    <div class="section-tag">About Daniel</div>
    <div class="section-title">Your Trusted Window Expert</div>
    <p style="color: var(--gray); font-size: 15px; line-height: 1.75">
      Daniel Chapurin has spent 7 years mastering every aspect of window repair
      and installation. From emergency glass replacement to energy-efficient
      upgrades, he handles it all with care and skill. Hundreds of homeowners
      across the area trust him by name.
    </p>
  </section>

  <!-- SPECIALTIES -->
  <section class="section" style="padding-top: 0">
    <div class="section-tag">What Daniel Does</div>
    <div class="section-title">Specialties</div>
    <div class="spec-list">
      <div class="spec-item">
        <div class="spec-icon-wrap">🔧</div>
        <div>
          <h3>Window Repair</h3>
          <p>
            Cracked glass, broken seals, foggy panes — diagnosed and fixed same
            day.
          </p>
        </div>
      </div>
      <div class="spec-item">
        <div class="spec-icon-wrap">🪟</div>
        <div>
          <h3>Full Replacement</h3>
          <p>
            Complete window replacement with energy-efficient options. Disposal
            included.
          </p>
        </div>
      </div>
      <div class="spec-item">
        <div class="spec-icon-wrap">🚨</div>
        <div>
          <h3>Emergency Glass</h3>
          <p>
            Same-day emergency service for break-ins, storms, and accidents.
          </p>
        </div>
      </div>
      <div class="spec-item">
        <div class="spec-icon-wrap">❄️</div>
        <div>
          <h3>Energy Upgrades</h3>
          <p>
            Low-E glass, double-pane upgrades, weatherstripping to cut utility
            bills.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section
    class="section"
    style="background: var(--cream-dark); padding-top: 40px"
  >
    <div class="section-tag">Client Reviews</div>
    <div class="section-title">What People Say</div>
    <div class="reviews-wrap">
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review-text">
          Daniel arrived on time, assessed the problem immediately, and had my
          foggy window fixed same day. Genuinely impressive work.
        </p>
        <div class="review-author">— Sarah M., Aurora IL</div>
      </div>
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review-text">
          Called after a break-in at 8am. Daniel was at my home by noon with new
          glass installed before evening. A real lifesaver.
        </p>
        <div class="review-author">— James T., Naperville IL</div>
      </div>
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review-text">
          Fair pricing, quality work, no mess left behind. I'll only ever call
          Daniel for my window needs going forward.
        </p>
        <div class="review-author">— Linda K., Wheaton IL</div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section">
    <div class="cta-block">
      <h2>Need a Window Fixed?</h2>
      <p>
        Call Daniel directly for same-day service. No hidden fees. 100%
        satisfaction guaranteed.
      </p>
      <a class="cta-phone" href="tel:6304735256">630-473-5256</a>
      <a class="btn-white" href="mailto:Authoritywindowrepair@gmail.com"
        >Email Daniel</a
      >
    </div>
  </section>

  <!-- FORM -->
  <div class="form-wrap" id="estimate">
    <h3>Request Free Estimate</h3>
    <p class="sub">Daniel personally responds within the hour.</p>
    <div class="fgroup">
      <label>Your Name</label>
      <input type="text" placeholder="John Smith" />
    </div>
    <div class="fgroup">
      <label>Phone</label>
      <input type="tel" placeholder="(630) 000-0000" />
    </div>
    <div class="fgroup">
      <label>Service Needed</label>
      <select>
        <option value="">Choose a service...</option>
        <option>Window Repair</option>
        <option>Window Replacement</option>
        <option>Emergency Glass</option>
        <option>Energy Upgrade</option>
        <option>Other</option>
      </select>
    </div>
    <div class="fgroup">
      <label>Details</label>
      <textarea
        placeholder="Describe the issue, number of windows, any urgency..."
      ></textarea>
    </div>
    <button
      class="btn-form"
      onclick="alert('Thanks! Daniel will contact you shortly.')"
    >
      Send Estimate Request →
    </button>
  </div>

  <!-- CONTACT INFO -->
  <div class="contact-list">
    <a class="contact-item" href="tel:6304735256">
      <div class="contact-item-icon">📞</div>
      <div>
        <div class="contact-item-label">Call Us</div>
        <div class="contact-item-val">630-473-5256</div>
      </div>
    </a>
    <a class="contact-item" href="mailto:Authoritywindowrepair@gmail.com">
      <div class="contact-item-icon">✉️</div>
      <div>
        <div class="contact-item-label">Email</div>
        <div class="contact-item-val">Authoritywindowrepair@gmail.com</div>
      </div>
    </a>
    <div class="contact-item">
      <div class="contact-item-icon">🕐</div>
      <div>
        <div class="contact-item-label">Hours</div>
        <div class="contact-item-val">Mon–Fri 7AM–6PM · Sat 7AM–4PM</div>
      </div>
    </div>
  </div>

  <footer>
    <p>Serving Aurora, Naperville, Wheaton & surrounding areas</p>
    <div class="footer-links">
      <a href="#">Home</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>
    <p class="footer-copy">Copyright © 2025 Authority Window Repair</p>
  </footer>
  </template>