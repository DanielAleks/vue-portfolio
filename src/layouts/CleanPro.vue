<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: #fff;
  color: #0d1f3c;
}
nav {
  padding: 16px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8ecf0;
}
.logo {
  font-size: 15px;
  font-weight: 700;
  color: #0d1f3c;
}
.logo span {
  color: #1a6be0;
}
.nav-links {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: #6b7a8d;
}
.nav-phone {
  background: #1a6be0;
  color: #fff;
  padding: 8px 18px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.hero {
  background: #f0f4ff;
  padding: 60px 36px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid #c5d5f5;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 11px;
  color: #1a6be0;
  font-weight: 600;
  margin-bottom: 16px;
}
h1 {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.1;
  color: #0d1f3c;
  letter-spacing: -0.5px;
}
h1 em {
  color: #1a6be0;
  font-style: normal;
}
.sub {
  color: #4a5568;
  font-size: 15px;
  line-height: 1.6;
  margin-top: 14px;
}
.ctas {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}
.btn-p {
  background: #1a6be0;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  border: none;
}
.btn-s {
  border: 2px solid #1a6be0;
  color: #1a6be0;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  background: transparent;
}
.trust-row {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.tr {
  font-size: 12px;
  color: #6b7a8d;
  display: flex;
  align-items: center;
  gap: 4px;
}
.ck {
  color: #16a34a;
}
.quote-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e8ecf0;
}
.form-title {
  font-size: 15px;
  font-weight: 700;
  color: #0d1f3c;
  margin-bottom: 4px;
}
.form-sub {
  font-size: 12px;
  color: #6b7a8d;
  margin-bottom: 16px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}
.form-field {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dde3ef;
  border-radius: 4px;
  font-size: 13px;
  color: #0d1f3c;
  font-family: inherit;
}
.form-field::placeholder {
  color: #9aa5b4;
}
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dde3ef;
  border-radius: 4px;
  font-size: 13px;
  color: #0d1f3c;
  font-family: inherit;
  margin-bottom: 8px;
  background: #fff;
}
.form-btn {
  width: 100%;
  background: #1a6be0;
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  border: none;
  margin-top: 4px;
}
.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  justify-content: center;
}
.stars-big {
  color: #f59e0b;
  font-size: 18px;
}
.rating-text {
  font-size: 12px;
  color: #6b7a8d;
}
.stats-container {
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid #e8ecf0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.sp-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
}
.sp-stat {
  text-align: center;
}
.sp-num {
  font-size: 28px;
  font-weight: 800;
  color: #1a6be0;
}
.sp-lab {
  font-size: 11px;
  color: #6b7a8d;
  margin-top: 2px;
}
.sp-div {
  width: 1px;
  height: 40px;
  background: #e8ecf0;
}
.why-us {
  padding: 52px 36px;
  background: #f8faff;
}
.sec-kicker {
  font-size: 11px;
  font-weight: 700;
  color: #1a6be0;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.sec-h {
  font-size: 28px;
  font-weight: 800;
  color: #0d1f3c;
  margin-bottom: 32px;
}
.wu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.wu-card {
  background: #fff;
  border-radius: 8px;
  padding: 22px;
  border: 1px solid #e8ecf0;
}
.wu-icon {
  width: 40px;
  height: 40px;
  background: #ebf0ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 14px;
}
.wu-t {
  font-size: 14px;
  font-weight: 700;
  color: #0d1f3c;
  margin-bottom: 6px;
}
.wu-d {
  font-size: 13px;
  color: #6b7a8d;
  line-height: 1.6;
}
.services {
  padding: 52px 36px;
  background: #fff;
}
.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 28px;
}
.svc {
  padding: 22px;
  border: 1px solid #e8ecf0;
  border-radius: 8px;
}
.svc-price {
  display: inline-block;
  background: #ebf0ff;
  color: #1a6be0;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}
.svc-t {
  font-size: 14px;
  font-weight: 700;
  color: #0d1f3c;
  margin-bottom: 6px;
}
.svc-d {
  font-size: 12px;
  color: #6b7a8d;
  line-height: 1.5;
}
.process {
  padding: 52px 36px;
  background: #0d1f3c;
}
.process .sec-h {
  color: #fff;
}
.process .sec-kicker {
  color: #7ab4ff;
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: 32px;
  position: relative;
}
.step {
  padding: 24px;
  position: relative;
}
.step-num {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1a6be0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 14px;
}
.step-t {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}
.step-d {
  font-size: 13px;
  color: #8899bb;
  line-height: 1.6;
}
.step-arrow {
  position: absolute;
  right: -12px;
  top: 36px;
  color: #1a6be0;
  font-size: 22px;
  z-index: 1;
}
.reviews {
  padding: 52px 36px;
  background: #fff;
}
.rev-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 28px;
}
.rev {
  background: #f8faff;
  border-radius: 8px;
  padding: 20px;
}
.rev-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.av {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: #fff;
  flex-shrink: 0;
}
.rev-name {
  font-size: 13px;
  font-weight: 700;
  color: #0d1f3c;
}
.rev-stars {
  color: #f59e0b;
  font-size: 12px;
}
.rev-body {
  font-size: 13px;
  color: #4a5568;
  line-height: 1.6;
  font-style: italic;
}
.areas {
  padding: 40px 36px;
  background: #f0f4ff;
}
.area-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}
.area-tag {
  background: #fff;
  border: 1px solid #c5d5f5;
  color: #1a6be0;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.faq {
  padding: 52px 36px;
  background: #fff;
}
.faq-list {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.faq-item {
  border-bottom: 1px solid #e8ecf0;
  padding: 18px 0;
}
.faq-q {
  font-size: 14px;
  font-weight: 700;
  color: #0d1f3c;
  margin-bottom: 6px;
}
.faq-a {
  font-size: 13px;
  color: #6b7a8d;
  line-height: 1.6;
}
.final-cta {
  background: #1a6be0;
  padding: 48px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
.fc-left h3 {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
}
.fc-left p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}
.fc-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}
.fc-btn {
  background: #fff;
  color: #1a6be0;
  padding: 12px 28px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  border: none;
  white-space: nowrap;
}
.fc-disc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
footer {
  background: #0d1f3c;
  padding: 24px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.foot-l {
  font-size: 12px;
  color: #4a5f7a;
}
.foot-r {
  display: flex;
  gap: 8px;
}
.foot-badge {
  background: rgba(255, 255, 255, 0.08);
  color: #7ab4ff;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 3px;
}
@media (max-width: 768px) {
  .hero,
  .wu-grid,
  .svc-grid,
  .steps,
  .rev-grid,
  .sp-inner,
  .faq-list {
    grid-template-columns: 1fr;
  }
  nav .nav-links {
    display: none;
  }
  h1 {
    font-size: 28px;
  }
  .final-cta {
    flex-direction: column;
  }
  .fc-right {
    align-items: flex-start;
  }
}
</style>
<template>
  <nav>
    <div class="logo">Washington <span>Electrical</span></div>
    <div class="nav-links">
      <span>Services</span><span>Areas</span><span>About</span><span>Blog</span>
    </div>
    <div class="nav-phone">(253) 234-5359</div>
  </nav>

  <div class="hero">
    <div>
      <div class="badge">✓ Licensed · Bonded · Insured · WASHIEL776C3</div>
      <h1>Trusted <em>electricians</em><br />in Fife, WA</h1>
      <p class="sub">
        Family-owned electrical company serving the South Sound since 2023. We
        treat every home like our own — clean work, honest pricing, done right.
      </p>
      <div class="ctas">
        <button class="btn-p">Get a Free Quote</button>
        <button class="btn-s">Call (253) 234-5359</button>
      </div>
      <div class="trust-row">
        <div class="tr"><span class="ck">✓</span>Senior discounts</div>
        <div class="tr"><span class="ck">✓</span>Military discounts</div>
        <div class="tr"><span class="ck">✓</span>Mon–Sat, 24 hours</div>
        <div class="tr"><span class="ck">✓</span>Same-day quotes</div>
      </div>
    </div>
    <div class="quote-form">
      <div class="form-title">Get a free estimate</div>
      <div class="form-sub">We respond same day — usually within the hour.</div>
      <div class="form-row">
        <input class="form-field" type="text" placeholder="First name" />
        <input class="form-field" type="text" placeholder="Last name" />
      </div>
      <input
        class="form-field"
        type="tel"
        placeholder="Phone number"
        style="width: 100%; margin-bottom: 8px"
      />
      <select class="form-select">
        <option value="">Select a service...</option>
        <option>Panel upgrade</option>
        <option>EV charger install</option>
        <option>Wiring upgrade</option>
        <option>Lighting / outlet work</option>
        <option>Service call / diagnostic</option>
        <option>Other</option>
      </select>
      <input
        class="form-field"
        type="text"
        placeholder="Your address"
        style="width: 100%; margin-bottom: 8px"
      />
      <button class="form-btn">Request my free quote</button>
      <div class="rating-row">
        <span class="stars-big">★★★★★</span>
        <span class="rating-text">5.0 · 47 Google reviews</span>
      </div>
    </div>
  </div>

  <div class="stats-container">
    <div class="sp-inner">
      <div class="sp-stat">
        <div class="sp-num">5.0★</div>
        <div class="sp-lab">Google rating</div>
      </div>
      <div class="sp-div"></div>
      <div class="sp-stat">
        <div class="sp-num">$799</div>
        <div class="sp-lab">EV chargers from</div>
      </div>
      <div class="sp-div"></div>
      <div class="sp-stat">
        <div class="sp-num">24H</div>
        <div class="sp-lab">Mon–Sat service</div>
      </div>
      <div class="sp-div"></div>
      <div class="sp-stat">
        <div class="sp-num">BBB</div>
        <div class="sp-lab">Accredited business</div>
      </div>
      <div class="sp-div"></div>
      <div class="sp-stat">
        <div class="sp-num">0</div>
        <div class="sp-lab">Shortcuts taken</div>
      </div>
    </div>
  </div>

  <div class="why-us">
    <div class="sec-kicker">Why choose us</div>
    <div class="sec-h">The Washington Electrical difference</div>
    <div class="wu-grid">
      <div class="wu-card">
        <div class="wu-icon">🏠</div>
        <div class="wu-t">We treat your home with respect</div>
        <div class="wu-d">
          Minimal drywall damage on every wiring job. We protect your space and
          clean up when we're done.
        </div>
      </div>
      <div class="wu-card">
        <div class="wu-icon">📋</div>
        <div class="wu-t">Quote before we start — always</div>
        <div class="wu-d">
          Transparent pricing, no surprises. You approve everything before we
          pick up a tool.
        </div>
      </div>
      <div class="wu-card">
        <div class="wu-icon">✅</div>
        <div class="wu-t">Code-compliant, permit-pulled</div>
        <div class="wu-d">
          Every job is fully permitted and inspected. Your home stays safe and
          insurable.
        </div>
      </div>
      <div class="wu-card">
        <div class="wu-icon">👨‍👩‍👦</div>
        <div class="wu-t">Family-owned, locally operated</div>
        <div class="wu-d">
          We're your neighbors in Fife. Our reputation is built one home at a
          time.
        </div>
      </div>
      <div class="wu-card">
        <div class="wu-icon">⚡</div>
        <div class="wu-t">Same-day response</div>
        <div class="wu-d">
          Call or text and we'll have a quote to you the same day. Mon–Sat, 24
          hours.
        </div>
      </div>
      <div class="wu-card">
        <div class="wu-icon">🎖️</div>
        <div class="wu-t">Senior and military discounts</div>
        <div class="wu-d">
          We're proud to serve those who've served. Discounts available — just
          mention it when you call.
        </div>
      </div>
    </div>
  </div>

  <div class="services">
    <div class="sec-kicker">Our services</div>
    <div class="sec-h">What we specialize in</div>
    <div class="svc-grid">
      <div class="svc">
        <div class="svc-price">From $799</div>
        <div class="svc-t">EV Charger Install</div>
        <div class="svc-d">
          Level 2 home charging. Fully permitted and inspected. We handle the
          panel too.
        </div>
      </div>
      <div class="svc">
        <div class="svc-t">Panel Upgrades</div>
        <div class="svc-d">
          Full service upgrades, Zinsco and Federal Pacific replacements, SPAN
          smart panels.
        </div>
      </div>
      <div class="svc">
        <div class="svc-t">Wiring Upgrades</div>
        <div class="svc-d">
          Knob-and-tube removal with minimal drywall disruption. Modern, safe
          systems.
        </div>
      </div>
      <div class="svc">
        <div class="svc-t">Lighting Upgrades</div>
        <div class="svc-d">
          Recessed cans, custom fixture installs, high-ceiling work — done
          cleanly.
        </div>
      </div>
      <div class="svc">
        <div class="svc-t">Outlet Install</div>
        <div class="svc-d">
          Sparking outlets, loose plugs, tripping breakers — quick diagnosis and
          fix.
        </div>
      </div>
      <div class="svc">
        <div class="svc-t">Service Call</div>
        <div class="svc-d">
          Electrical diagnostic starting at a flat fee. We find it and fix it
          right.
        </div>
      </div>
    </div>
  </div>

  <div class="process">
    <div class="sec-kicker">How it works</div>
    <div class="sec-h">From call to complete in 3 steps</div>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-t">Request a quote</div>
        <div class="step-d">
          Call, text, or fill out our form. We respond the same day — usually
          within the hour.
        </div>
        <div class="step-arrow">→</div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-t">Schedule your visit</div>
        <div class="step-d">
          We come to your home, assess the job, and give you a clear written
          estimate before any work begins.
        </div>
        <div class="step-arrow">→</div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-t">Work completed right</div>
        <div class="step-d">
          We do the work cleanly, pull permits where needed, and don't leave
          until you're satisfied.
        </div>
      </div>
    </div>
  </div>

  <div class="reviews">
    <div class="sec-kicker">Customer reviews</div>
    <div class="sec-h">What our neighbors are saying</div>
    <div class="rev-grid">
      <div class="rev">
        <div class="rev-top">
          <div class="av" style="background: #1a6be0">DG</div>
          <div>
            <div class="rev-name">Damon Graves · 3 months ago</div>
            <div class="rev-stars">★★★★★</div>
          </div>
        </div>
        <div class="rev-body">
          "Very happy with the work done by the crew. Russ had a quote for me
          the day after his initial visit — great communication throughout."
        </div>
      </div>
      <div class="rev">
        <div class="rev-top">
          <div class="av" style="background: #16a34a">JC</div>
          <div>
            <div class="rev-name">John Curthoys · 4 months ago</div>
            <div class="rev-stars">★★★★★</div>
          </div>
        </div>
        <div class="rev-body">
          "Thorough in their investigation and communicated our options clearly.
          Did great work and cleaned up after themselves."
        </div>
      </div>
      <div class="rev">
        <div class="rev-top">
          <div class="av" style="background: #9333ea">KS</div>
          <div>
            <div class="rev-name">Kent Stevenson · 5 months ago</div>
            <div class="rev-stars">★★★★★</div>
          </div>
        </div>
        <div class="rev-body">
          "Very professional, knowledgeable, and clean. Great personality —
          would recommend Washington Electrical to anyone."
        </div>
      </div>
      <div class="rev">
        <div class="rev-top">
          <div class="av" style="background: #dc2626">MB</div>
          <div>
            <div class="rev-name">Mark Bishop · 4 months ago</div>
            <div class="rev-stars">★★★★★</div>
          </div>
        </div>
        <div class="rev-body">
          "Fast, friendly, and fair. Had my panel upgraded without any hassle.
          The team was in and out and left everything tidy."
        </div>
      </div>
    </div>
  </div>

  <div class="areas">
    <div class="sec-kicker">Service area</div>
    <div class="sec-h">We come to you across the South Sound</div>
    <div class="area-tags">
      <div class="area-tag">Fife</div>
      <div class="area-tag">Tacoma</div>
      <div class="area-tag">Federal Way</div>
      <div class="area-tag">Auburn</div>
      <div class="area-tag">Puyallup</div>
      <div class="area-tag">Lakewood</div>
      <div class="area-tag">Gig Harbor</div>
      <div class="area-tag">Kent</div>
      <div class="area-tag">Renton</div>
      <div class="area-tag">SeaTac</div>
      <div class="area-tag">Sumner</div>
      <div class="area-tag">Bonney Lake</div>
      <div class="area-tag">University Place</div>
      <div class="area-tag">DuPont</div>
      <div class="area-tag">Burien</div>
    </div>
  </div>

  <div class="faq">
    <div class="sec-kicker">Common questions</div>
    <div class="sec-h">Things people ask us</div>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q">How much does a panel upgrade cost?</div>
        <div class="faq-a">
          Panel upgrades vary depending on the size and condition of your
          current setup. We provide a written estimate before any work begins —
          no surprises.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Do you pull permits?</div>
        <div class="faq-a">
          Yes, always. We pull all required permits and schedule inspections. It
          protects your home and ensures the work is done to code.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">How long does a wiring upgrade take?</div>
        <div class="faq-a">
          Most wiring upgrades take 1–3 days depending on the size of the home.
          We work cleanly and minimize disruption to your daily routine.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">
          Can you install a Level 2 EV charger in my garage?
        </div>
        <div class="faq-a">
          Yes — EV charger installations start at $799 and include everything
          from wiring to permitting. We'll check your panel capacity first and
          handle any upgrades needed.
        </div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Do you offer discounts?</div>
        <div class="faq-a">
          Yes — we offer senior and military discounts. Just mention it when you
          reach out and we'll apply it to your estimate.
        </div>
      </div>
    </div>
  </div>

  <div class="final-cta">
    <div class="fc-left">
      <h3>Ready to get started?</h3>
      <p>We respond same day. Written quote before any work begins.</p>
    </div>
    <div class="fc-right">
      <button class="fc-btn">Request a free quote</button>
      <div class="fc-disc">
        Or call/text (253) 234-5359 · Senior and military discounts available
      </div>
    </div>
  </div>

  <footer>
    <div class="foot-l">
      © 2024 Washington Electrical · Fife, WA ·
      Service@Washingtonelectrical.net
    </div>
    <div class="foot-r">
      <div class="foot-badge">Licensed</div>
      <div class="foot-badge">Bonded</div>
      <div class="foot-badge">Insured</div>
      <div class="foot-badge">WASHIEL776C3</div>
    </div>
  </footer>
</template>
