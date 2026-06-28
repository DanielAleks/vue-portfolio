<style scoped>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;color:#111;}
nav{padding:18px 48px;display:flex;justify-content:space-between;align-items:center;}
.logo{font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;}
.nav-r{display:flex;align-items:center;gap:24px;}
.nav-link{font-size:12px;color:#888;}
.nav-btn{font-size:12px;font-weight:700;color:#111;border-bottom:2px solid #111;padding-bottom:1px;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;}
.hero{padding:72px 48px 0;border-bottom:1px solid #eee;}
.kicker{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#888;margin-bottom:24px;}
.hero-top{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;}
h1{font-size:60px;font-weight:300;line-height:1;letter-spacing:-2px;}
h1 strong{font-weight:800;}
.form-box{background:#f8f8f8;padding:24px;border-left:3px solid #111;}
.form-title{font-size:13px;font-weight:700;margin-bottom:3px;}
.form-sub{font-size:11px;color:#888;margin-bottom:14px;}
.ff{width:100%;padding:9px 12px;border:1px solid #ddd;font-size:12px;font-family:inherit;color:#111;margin-bottom:8px;background:#fff;}
.ff::placeholder{color:#aaa;}
.fs{width:100%;padding:9px 12px;border:1px solid #ddd;font-size:12px;font-family:inherit;color:#666;margin-bottom:8px;background:#fff;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:0;}
.fb{width:100%;background:#111;color:#fff;padding:11px;font-size:12px;font-weight:700;letter-spacing:.5px;cursor:pointer;border:none;margin-top:4px;}
.rating-small{font-size:11px;color:#888;text-align:center;margin-top:10px;}
.hero-bottom{display:flex;justify-content:space-between;align-items:flex-end;padding:36px 0 0;}
.hero-sub{font-size:14px;color:#666;line-height:1.7;max-width:380px;}
.trust-items{display:flex;flex-direction:column;align-items:flex-end;gap:6px;}
.tr{font-size:11px;color:#888;}
.metrics{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #eee;border-bottom:1px solid #eee;}
.met{padding:24px 0 24px 48px;border-right:1px solid #eee;}
.met:last-child{border-right:none;}
.met-n{font-size:28px;font-weight:800;letter-spacing:-1px;}
.met-l{font-size:10px;color:#888;margin-top:3px;letter-spacing:.5px;text-transform:uppercase;}
.why-us{padding:64px 48px;background:#f8f8f8;border-bottom:1px solid #eee;}
.sec-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#888;margin-bottom:10px;}
.sec-h{font-size:28px;font-weight:800;letter-spacing:-1px;margin-bottom:36px;}
.wu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;}
.wu-item{border-top:2px solid #111;padding-top:18px;}
.wu-t{font-size:13px;font-weight:700;margin-bottom:6px;}
.wu-d{font-size:12px;color:#666;line-height:1.7;}
.services{padding:64px 48px;border-bottom:1px solid #eee;}
.svc-list{margin-top:28px;}
.svc-row{display:grid;grid-template-columns:200px 1fr auto;align-items:baseline;padding:18px 0;border-bottom:1px solid #eee;gap:24px;}
.svc-row:first-child{border-top:1px solid #eee;}
.svc-t{font-size:14px;font-weight:700;}
.svc-d{font-size:13px;color:#666;line-height:1.5;}
.svc-price{font-size:12px;color:#888;white-space:nowrap;}
.process{padding:64px 48px;background:#111;border-bottom:1px solid #222;}
.process .sec-label{color:#555;}
.process .sec-h{color:#fff;}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:32px;}
.step{border-top:1px solid #333;padding-top:18px;}
.step-n{font-size:40px;font-weight:300;color:#333;line-height:1;margin-bottom:12px;}
.step-t{font-size:13px;font-weight:700;color:#fff;margin-bottom:6px;}
.step-d{font-size:12px;color:#666;line-height:1.7;}
.reviews{padding:64px 48px;border-bottom:1px solid #eee;}
.rev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:28px;}
.rev{padding:22px;border:1px solid #eee;}
.rev-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.av{width:32px;height:32px;border-radius:50%;background:#111;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;}
.rev-name{font-size:12px;font-weight:700;}
.rev-stars{color:#111;font-size:11px;}
.rev-body{font-size:12px;color:#666;line-height:1.7;}
.areas{padding:48px;background:#f8f8f8;border-bottom:1px solid #eee;}
.area-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;}
.area-tag{border:1px solid #ddd;color:#666;padding:4px 12px;font-size:11px;}
.faq{padding:64px 48px;border-bottom:1px solid #eee;}
.faq-list{margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:0 48px;}
.faq-item{border-bottom:1px solid #eee;padding:16px 0;}
.faq-q{font-size:13px;font-weight:700;margin-bottom:5px;}
.faq-a{font-size:12px;color:#666;line-height:1.7;}
.final-cta{padding:64px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;}
.fc-left h3{font-size:28px;font-weight:800;letter-spacing:-1px;}
.fc-left p{font-size:13px;color:#888;margin-top:4px;}
.fc-right{display:flex;gap:12px;align-items:center;}
.fc-btn{background:#111;color:#fff;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;border:none;}
.fc-tel{font-size:14px;font-weight:700;border-bottom:2px solid #111;padding-bottom:1px;cursor:pointer;}
footer{padding:20px 48px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
.foot-l{font-size:11px;color:#aaa;}
.foot-r{font-size:11px;color:#aaa;}
.stats-container {
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid #e8ecf0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
@media(max-width:768px){
  .hero-top,.wu-grid,.steps,.rev-grid,.faq-list,.svc-row,.metrics{grid-template-columns:1fr;}
  nav .nav-r .nav-link{display:none;}
  h1{font-size:40px;}
  .hero,.why-us,.services,.process,.reviews,.areas,.faq,.final-cta,footer{padding:40px 24px;}
  .final-cta{flex-direction:column;}
}
</style>
<template>
<nav>
  <div class="logo">Washington Electrical</div>
  <div class="nav-r">
    <div class="nav-link">Services</div>
    <div class="nav-link">Areas</div>
    <div class="nav-link">About</div>
    <button class="nav-btn">(253) 234-5359 →</button>
  </div>
</nav>

<div class="hero">
  <div class="kicker">Licensed Electrician · Fife, WA · Since 2023</div>
  <div class="hero-top">
    <div>
      <h1>The <strong>electrician</strong><br>your home<br>deserves</h1>
      <div class="hero-bottom">
        <p class="hero-sub">Family-owned electrical team in Fife. Panel upgrades, wiring, EV chargers — done clean, on budget, right the first time.</p>
        <div class="trust-items">
          <div class="tr">✓ Licensed · Bonded · Insured</div>
          <div class="tr">✓ BBB Accredited · WASHIEL776C3</div>
          <div class="tr">✓ Senior and military discounts</div>
        </div>
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">Get a free estimate</div>
      <div class="form-sub">Same-day response, Mon–Sat.</div>
      <div class="frow">
        <input class="ff" type="text" placeholder="First name">
        <input class="ff" type="text" placeholder="Last name">
      </div>
      <input class="ff" type="tel" placeholder="Phone number" style="margin-top:8px;">
      <select class="fs">
        <option value="">Select a service...</option>
        <option>Panel upgrade</option>
        <option>EV charger install</option>
        <option>Wiring upgrade</option>
        <option>Lighting / outlet work</option>
        <option>Service call</option>
      </select>
      <input class="ff" type="text" placeholder="Your address">
      <button class="fb">Request my free estimate</button>
      <div class="rating-small">★★★★★ 5.0 · 47 Google reviews</div>
    </div>
  </div>
</div>

<div class="stats-container">
  <div class="met"><div class="met-n">5.0★</div><div class="met-l">Google rating</div></div>
  <div class="met"><div class="met-n">$799</div><div class="met-l">EV install from</div></div>
  <div class="met"><div class="met-n">24H</div><div class="met-l">Mon–Sat service</div></div>
  <div class="met"><div class="met-n">BBB</div><div class="met-l">Accredited</div></div>
  <div class="met"><div class="met-n">0</div><div class="met-l">Shortcuts taken</div></div>
</div>

<div class="why-us">
  <div class="sec-label">Why choose us</div>
  <div class="sec-h">The Washington Electrical standard</div>
  <div class="wu-grid">
    <div class="wu-item"><div class="wu-t">Quote before we start — always</div><div class="wu-d">Written estimate approved by you before we pick up a tool. No hidden fees, no surprises.</div></div>
    <div class="wu-item"><div class="wu-t">Minimal drywall damage</div><div class="wu-d">We're precise. Wiring upgrades are done carefully to protect your walls and your home.</div></div>
    <div class="wu-item"><div class="wu-t">Permits pulled every time</div><div class="wu-d">Every job is fully permitted and inspected. Your home stays safe, insurable, and up to code.</div></div>
    <div class="wu-item"><div class="wu-t">Family-owned in Fife</div><div class="wu-d">We're your neighbors. Our reputation is built one home at a time and we take that seriously.</div></div>
    <div class="wu-item"><div class="wu-t">Same-day response</div><div class="wu-d">Call, text, or fill out our form. We respond fast — usually within the hour, Mon–Sat.</div></div>
    <div class="wu-item"><div class="wu-t">Senior and military discounts</div><div class="wu-d">We honor those who've served our country and our community. Mention it when you call.</div></div>
  </div>
</div>

<div class="services">
  <div class="sec-label">Our services</div>
  <div class="sec-h">What we do</div>
  <div class="svc-list">
    <div class="svc-row"><div class="svc-t">EV Charger Install</div><div class="svc-d">Level 2 home charging, fully permitted and inspected. We handle the panel too.</div><div class="svc-price">From $799</div></div>
    <div class="svc-row"><div class="svc-t">Panel Upgrades</div><div class="svc-d">Full service upgrades, Zinsco and Federal Pacific replacements, SPAN smart panels.</div><div class="svc-price">Quote required</div></div>
    <div class="svc-row"><div class="svc-t">Wiring Upgrades</div><div class="svc-d">Knob-and-tube removal with minimal drywall disruption. Modern, safe, code-compliant.</div><div class="svc-price">Quote required</div></div>
    <div class="svc-row"><div class="svc-t">Lighting Upgrades</div><div class="svc-d">Recessed cans, custom fixtures, high-ceiling installs — done cleanly and professionally.</div><div class="svc-price">Quote required</div></div>
    <div class="svc-row"><div class="svc-t">Outlet Install</div><div class="svc-d">Sparking outlets, loose plugs, tripping breakers. Diagnosed and fixed right.</div><div class="svc-price">Flat fee</div></div>
    <div class="svc-row"><div class="svc-t">Service Call</div><div class="svc-d">Flat-fee electrical diagnostic. We find the issue and give you a clear repair plan.</div><div class="svc-price">Flat fee</div></div>
  </div>
</div>

<div class="process">
  <div class="sec-label">How it works</div>
  <div class="sec-h">From call to complete</div>
  <div class="steps">
    <div class="step"><div class="step-n">01</div><div class="step-t">Request a quote</div><div class="step-d">Call, text, or use our form. We respond the same day — usually within the hour.</div></div>
    <div class="step"><div class="step-n">02</div><div class="step-t">Schedule your visit</div><div class="step-d">We come to you, assess the job, and hand you a written estimate. You approve before we start.</div></div>
    <div class="step"><div class="step-n">03</div><div class="step-t">Work completed right</div><div class="step-d">Permits pulled, inspection passed, cleanup done. We don't leave until the job is right.</div></div>
  </div>
</div>

<div class="reviews">
  <div class="sec-label">What customers say</div>
  <div class="sec-h">Straight from Google</div>
  <div class="rev-grid">
    <div class="rev"><div class="rev-top"><div class="av">DG</div><div><div class="rev-name">Damon Graves · 3 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Very happy with the work. Russ had a quote for me the day after his initial visit. Great communication throughout the whole job."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">JC</div><div><div class="rev-name">John Curthoys · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Thorough investigation and clear communication about our options. Did great work and left everything clean."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">KS</div><div><div class="rev-name">Kent Stevenson · 5 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Professional, knowledgeable, and clean. Great personality — would recommend to anyone in the area."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">MB</div><div><div class="rev-name">Mark Bishop · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Fast, friendly, and fair pricing. Panel upgrade was done without hassle and the team left everything tidy."</div></div>
  </div>
</div>

<div class="areas">
  <div class="sec-label">Service area</div>
  <div class="sec-h">Serving the South Sound</div>
  <div class="area-tags">
    <div class="area-tag">Fife</div><div class="area-tag">Tacoma</div><div class="area-tag">Federal Way</div><div class="area-tag">Auburn</div><div class="area-tag">Puyallup</div><div class="area-tag">Lakewood</div><div class="area-tag">Gig Harbor</div><div class="area-tag">Kent</div><div class="area-tag">Renton</div><div class="area-tag">SeaTac</div><div class="area-tag">Sumner</div><div class="area-tag">Bonney Lake</div><div class="area-tag">University Place</div><div class="area-tag">DuPont</div><div class="area-tag">Burien</div>
  </div>
</div>

<div class="faq">
  <div class="sec-label">Common questions</div>
  <div class="sec-h">Things people ask us</div>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">How much does a panel upgrade cost?</div><div class="faq-a">It depends on your current setup. We provide a written estimate before any work — no surprises.</div></div>
    <div class="faq-item"><div class="faq-q">Do you pull permits?</div><div class="faq-a">Yes, always. Permits protect your home's safety record and are required for insurance and resale.</div></div>
    <div class="faq-item"><div class="faq-q">How long does wiring work take?</div><div class="faq-a">Most wiring jobs take 1–3 days. We're precise and minimize drywall damage throughout.</div></div>
    <div class="faq-item"><div class="faq-q">Can you install an EV charger if my panel is full?</div><div class="faq-a">Yes — we assess your panel first and can upgrade it as part of the same job. Installs from $799.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer senior or military discounts?</div><div class="faq-a">Yes — mention it when you reach out and we'll apply the discount to your estimate.</div></div>
    <div class="faq-item"><div class="faq-q">What areas do you serve?</div><div class="faq-a">Fife, Tacoma, Federal Way, and most of the South Sound — see our full service area above.</div></div>
  </div>
</div>

<div class="final-cta">
  <div class="fc-left">
    <h3>Ready to get started?</h3>
    <p>Same-day response. Written quote. No surprises.</p>
  </div>
  <div class="fc-right">
    <button class="fc-btn">Request a free quote</button>
    <div class="fc-tel">(253) 234-5359</div>
  </div>
</div>

<footer>
  <div class="foot-l">© 2024 Washington Electrical · Fife, WA · Service@Washingtonelectrical.net · Licensed · Bonded · Insured · WASHIEL776C3</div>
  <div class="foot-r">Senior and military discounts available</div>
</footer>
</template>