<style scoped>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0a0e14;color:#fff;}
nav{padding:16px 36px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1a2030;}
.logo{font-size:14px;font-weight:700;color:#fff;letter-spacing:.5px;}.logo em{color:#00e5cc;font-style:normal;}
.nav-links{display:flex;gap:22px;font-size:12px;color:#5a6a7a;}
.nav-phone{border:1px solid #00e5cc;color:#00e5cc;padding:8px 16px;font-size:12px;font-weight:600;cursor:pointer;border-radius:3px;background:transparent;}
.hero{padding:70px 36px 0;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start; background: #0a0e14}
.eyebrow{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#00e5cc;margin-bottom:18px;}
h1{font-size:52px;font-weight:800;line-height:1;letter-spacing:-2px;color:#fff;}
h1 em{color:#00e5cc;font-style:normal;}
.sub{color:#7a8a9a;font-size:14px;line-height:1.7;margin-top:16px;max-width:400px;}
.ctas{display:flex;gap:12px;margin-top:24px;}
.btn-p{background:#00e5cc;color:#0a0e14;padding:12px 26px;font-weight:700;font-size:13px;cursor:pointer;border-radius:3px;border:none;}
.btn-s{border:1px solid #2a3a4a;color:#7a8a9a;padding:12px 26px;font-size:13px;cursor:pointer;border-radius:3px;background:transparent;}
.trust-row{display:flex;gap:16px;margin-top:18px;flex-wrap:wrap;}
.tr{font-size:11px;color:#4a6a5a;display:flex;align-items:center;gap:4px;}
.ck{color:#00e5cc;}
.quote-form{background:#0d1520;border:1px solid #1a2a3a;border-radius:8px;padding:24px;}
.form-title{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;}
.form-sub{font-size:12px;color:#5a7a6a;margin-bottom:16px;}
.form-field{width:100%;padding:10px 12px;background:#0a1018;border:1px solid #1e2e3e;border-radius:4px;font-size:13px;color:#fff;font-family:inherit;margin-bottom:8px;}
.form-field::placeholder{color:#3a4a5a;}
.form-select{width:100%;padding:10px 12px;background:#0a1018;border:1px solid #1e2e3e;border-radius:4px;font-size:13px;color:#7a8a9a;font-family:inherit;margin-bottom:8px;}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:0;}
.form-btn{width:100%;background:#00e5cc;color:#0a0e14;padding:12px;border-radius:4px;font-weight:700;font-size:13px;cursor:pointer;border:none;margin-top:4px;}
.rating-row{text-align:center;margin-top:12px;font-size:11px;color:#3a5a4a;}
.rating-row span{color:#00e5cc;}
.stats-bar{border-top:1px solid #1a2030;border-bottom:1px solid #1a2030;display:grid;grid-template-columns:repeat(5,1fr);margin-top:48px;}
.stat{padding:20px; text-align:center;}
.stat:last-child{border-right:none;}
.stat-n{font-size:22px;font-weight:800;color:#00e5cc;}
.stat-l{font-size:10px;color:#4a6a5a;letter-spacing:1px;text-transform:uppercase;margin-top:3px;}
.why-us{padding:52px 36px;background:#0d1117;}
.sec-kicker{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#00e5cc;margin-bottom:10px;}
.sec-h{font-size:26px;font-weight:800;letter-spacing:-1px;color:#fff;margin-bottom:28px;}
.wu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#1a2030;}
.wu-card{background:#0d1117;padding:22px;}
.wu-t{font-size:13px;font-weight:700;color:#fff;margin-bottom:6px;}
.wu-d{font-size:12px;color:#4a6a7a;line-height:1.6;}
.wu-dot{width:8px;height:8px;background:#00e5cc;border-radius:50%;margin-bottom:12px;}
.services{padding:52px 36px;background:#0a0e14;}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#1a2030;margin-top:28px;}
.svc{background:#0a0e14;padding:22px;}
.svc-num{font-size:10px;letter-spacing:2px;color:#00e5cc;margin-bottom:8px;}
.svc-t{font-size:14px;font-weight:700;color:#fff;margin-bottom:6px;}
.svc-d{font-size:12px;color:#4a6a7a;line-height:1.5;}
.svc-price{display:inline-block;background:rgba(0,229,204,0.1);color:#00e5cc;font-size:11px;padding:3px 10px;border-radius:3px;margin-top:8px;}
.process{padding:52px 36px;background:#0d1117;border-top:1px solid #1a2030;}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px;}
.step{padding:22px;border:1px solid #1a2030;border-radius:4px;position:relative;}
.step-n{font-size:32px;font-weight:800;color:#1a2a3a;line-height:1;margin-bottom:12px;}
.step-t{font-size:13px;font-weight:700;color:#fff;margin-bottom:6px;}
.step-d{font-size:12px;color:#4a6a7a;line-height:1.6;}
.step-accent{position:absolute;top:0;left:0;width:3px;height:100%;background:#00e5cc;border-radius:4px 0 0 4px;}
.reviews{padding:52px 36px;background:#0a0e14;}
.rev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#1a2030;margin-top:28px;}
.rev{background:#0a0e14;padding:22px;}
.rev-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.av{width:34px;height:34px;border-radius:50%;background:#1a2a3a;border:1px solid #2a3a4a;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#00e5cc;}
.rev-name{font-size:12px;font-weight:700;color:#fff;}
.rev-stars{color:#00e5cc;font-size:11px;}
.rev-body{font-size:12px;color:#4a6a7a;line-height:1.6;}
.areas{padding:40px 36px;background:#0d1117;border-top:1px solid #1a2030;}
.area-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;}
.area-tag{border:1px solid #1a2a3a;color:#3a6a5a;padding:4px 12px;font-size:11px;border-radius:2px;}
.faq{padding:52px 36px;background:#0a0e14;border-top:1px solid #1a2030;}
.faq-list{margin-top:24px;}
.faq-item{border-bottom:1px solid #1a2030;padding:16px 0;}
.faq-q{font-size:13px;font-weight:700;color:#fff;margin-bottom:5px;}
.faq-a{font-size:12px;color:#4a6a7a;line-height:1.6;}
.final-cta{background:#00e5cc;padding:44px 36px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.fc-left h3{font-size:22px;font-weight:800;color:#0a0e14;}
.fc-left p{font-size:13px;color:#0a3a2a;margin-top:4px;}
.fc-right{display:flex;flex-direction:column;gap:8px;align-items:flex-end;}
.fc-btn{background:#0a0e14;color:#00e5cc;padding:12px 26px;border-radius:3px;font-weight:700;font-size:13px;cursor:pointer;border:none;}
.fc-disc{font-size:11px;color:#0a3a2a;}
footer{background:#070b0f;padding:20px 36px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;border-top:1px solid #1a2030;}
.foot-l{font-size:11px;color:#2a3a4a;}
.foot-r{display:flex;gap:10px;}
.foot-badge{border:1px solid #1a2a3a;color:#2a4a3a;font-size:10px;padding:3px 8px;border-radius:2px;}
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
  .hero,.wu-grid,.svc-grid,.steps,.rev-grid,.stats-bar{grid-template-columns:1fr;}
  nav .nav-links{display:none;}
  h1{font-size:36px;}
  .final-cta{flex-direction:column;}
  .fc-right{align-items:flex-start;}
}
</style>
<template>
<nav style="background: #0a0e14">
  <div class="logo"><em>WA</em> ELECTRICAL</div>
  <div class="nav-links"><span>Services</span><span>Areas</span><span>About</span><span>Blog</span></div>
  <div class="nav-phone">⚡ (253) 234-5359</div>
</nav>

<div class="hero">
  <div>
    <div class="eyebrow">Fife · Tacoma · South Sound · Licensed since 2023</div>
    <h1>Fife's<br><em>voltage</em><br>experts</h1>
    <p class="sub">Licensed, bonded and insured electrical work — done clean, done safe, done right the first time. Family-owned and locally operated.</p>
    <div class="ctas">
      <button class="btn-p">Get a Free Quote</button>
      <button class="btn-s">View Services</button>
    </div>
    <div class="trust-row">
      <div class="tr"><span class="ck">✓</span>Senior discounts</div>
      <div class="tr"><span class="ck">✓</span>Military discounts</div>
      <div class="tr"><span class="ck">✓</span>Mon–Sat 24H</div>
      <div class="tr"><span class="ck">✓</span>Same-day quotes</div>
    </div>
  </div>
  <div class="quote-form">
    <div class="form-title">Request a free estimate</div>
    <div class="form-sub">Same-day response, Mon–Sat.</div>
    <div class="form-row">
      <input class="form-field" type="text" placeholder="First name">
      <input class="form-field" type="text" placeholder="Last name">
    </div>
    <input class="form-field" type="tel" placeholder="Phone number" style="margin-top:8px;">
    <select class="form-select">
      <option value="">Select a service...</option>
      <option>Panel upgrade</option>
      <option>EV charger install</option>
      <option>Wiring upgrade</option>
      <option>Lighting / outlet work</option>
      <option>Service call / diagnostic</option>
    </select>
    <input class="form-field" type="text" placeholder="Your address">
    <button class="form-btn">Send my request →</button>
    <div class="rating-row"><span>★★★★★</span> 5.0 · 47 Google reviews · WASHIEL776C3</div>
  </div>
</div>

<div class="stats-container" style="background: #0a0e14">
  <div class="stat"><div class="stat-n">5.0★</div><div class="stat-l">Google rating</div></div>
  <div class="stat"><div class="stat-n">$799</div><div class="stat-l">EV install from</div></div>
  <div class="stat"><div class="stat-n">24H</div><div class="stat-l">Mon–Sat service</div></div>
  <div class="stat"><div class="stat-n">BBB</div><div class="stat-l">Accredited</div></div>
  <div class="stat"><div class="stat-n">0</div><div class="stat-l">Shortcuts taken</div></div>
</div>

<div class="why-us">
  <div class="sec-kicker">Why Washington Electrical</div>
  <div class="sec-h">What sets us apart</div>
  <div class="wu-grid">
    <div class="wu-card"><div class="wu-dot"></div><div class="wu-t">Quote before we touch a thing</div><div class="wu-d">Written estimate, approved by you, before any work begins. No hidden fees, ever.</div></div>
    <div class="wu-card"><div class="wu-dot"></div><div class="wu-t">Minimal drywall damage</div><div class="wu-d">We're careful. Wiring upgrades are done with precision to protect your walls.</div></div>
    <div class="wu-card"><div class="wu-dot"></div><div class="wu-t">Permits pulled every time</div><div class="wu-d">Every job is permitted, inspected, and fully code-compliant. Your home stays protected.</div></div>
    <div class="wu-card"><div class="wu-dot"></div><div class="wu-t">Family-owned in Fife</div><div class="wu-d">We're your neighbors. Our reputation is built one home at a time and we take that seriously.</div></div>
    <div class="wu-card"><div class="wu-dot"></div><div class="wu-t">Same-day response</div><div class="wu-d">Call, text, or submit a form. We get back to you fast — usually within the hour.</div></div>
    <div class="wu-card"><div class="wu-dot"></div><div class="wu-t">Senior and military discounts</div><div class="wu-d">We honor those who've served. Just mention it and we'll apply the discount to your quote.</div></div>
  </div>
</div>

<div class="services">
  <div class="sec-kicker">Services</div>
  <div class="sec-h">Everything electric</div>
  <div class="svc-grid">
    <div class="svc"><div class="svc-num">01 · EV</div><div class="svc-t">EV Charger Install</div><div class="svc-d">Level 2 home charging, fully permitted and inspected. We handle the panel too.</div><div class="svc-price">From $799</div></div>
    <div class="svc"><div class="svc-num">02 · PANEL</div><div class="svc-t">Panel Upgrades</div><div class="svc-d">Full service upgrades, Zinsco and FPE replacements, SPAN smart panels.</div></div>
    <div class="svc"><div class="svc-num">03 · WIRING</div><div class="svc-t">Wiring Upgrades</div><div class="svc-d">Knob-and-tube removal with minimal drywall damage. Modern, safe systems.</div></div>
    <div class="svc"><div class="svc-num">04 · LIGHT</div><div class="svc-t">Lighting Upgrades</div><div class="svc-d">Recessed cans, custom fixtures, high-ceiling installs — clean and professional.</div></div>
    <div class="svc"><div class="svc-num">05 · OUTLET</div><div class="svc-t">Outlet Install</div><div class="svc-d">Sparking outlets, loose plugs, tripping breakers — diagnosed and fixed.</div></div>
    <div class="svc"><div class="svc-num">06 · DIAG</div><div class="svc-t">Service Call</div><div class="svc-d">Flat-fee diagnostic. We find the problem and fix it right the first time.</div></div>
  </div>
</div>

<div class="process">
  <div class="sec-kicker">How it works</div>
  <div class="sec-h">3 steps from call to complete</div>
  <div class="steps">
    <div class="step"><div class="step-accent"></div><div class="step-n">01</div><div class="step-t">Request a quote</div><div class="step-d">Call, text, or use our form. We respond the same day, usually within the hour.</div></div>
    <div class="step"><div class="step-accent"></div><div class="step-n">02</div><div class="step-t">Schedule your visit</div><div class="step-d">We assess the job and give you a written estimate. You approve before anything starts.</div></div>
    <div class="step"><div class="step-accent"></div><div class="step-n">03</div><div class="step-t">Work completed right</div><div class="step-d">Clean work, permits pulled, inspection passed. We don't leave until you're satisfied.</div></div>
  </div>
</div>

<div class="reviews">
  <div class="sec-kicker">Reviews</div>
  <div class="sec-h">What customers say</div>
  <div class="rev-grid">
    <div class="rev"><div class="rev-top"><div class="av">DG</div><div><div class="rev-name">Damon Graves · 3 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Very happy with the work. Russ had a quote for me the day after his initial visit — great communication throughout the whole job."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">JC</div><div><div class="rev-name">John Curthoys · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Thorough investigation, clear communication about our options, and did great work. Very happy with the result."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">KS</div><div><div class="rev-name">Kent Stevenson · 5 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Professional, knowledgeable, and clean. Great personality — would recommend to anyone in the South Sound."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">MB</div><div><div class="rev-name">Mark Bishop · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Fast, friendly, and fair. Panel upgrade done without a hitch. Left everything clean and tidy."</div></div>
  </div>
</div>

<div class="areas">
  <div class="sec-kicker">Service area</div>
  <div class="sec-h">Covering the South Sound</div>
  <div class="area-tags">
    <div class="area-tag">Fife</div><div class="area-tag">Tacoma</div><div class="area-tag">Federal Way</div><div class="area-tag">Auburn</div><div class="area-tag">Puyallup</div><div class="area-tag">Lakewood</div><div class="area-tag">Gig Harbor</div><div class="area-tag">Kent</div><div class="area-tag">Renton</div><div class="area-tag">SeaTac</div><div class="area-tag">Sumner</div><div class="area-tag">Bonney Lake</div><div class="area-tag">University Place</div><div class="area-tag">DuPont</div>
  </div>
</div>

<div class="faq">
  <div class="sec-kicker">FAQ</div>
  <div class="sec-h">Common questions</div>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">How much does a panel upgrade cost?</div><div class="faq-a">It depends on the size and condition of your existing panel. We provide a written estimate before any work — no surprises.</div></div>
    <div class="faq-item"><div class="faq-q">Do you pull permits for every job?</div><div class="faq-a">Yes, always. Permits protect your home's safety record and are required for insurance and resale. We handle all of it.</div></div>
    <div class="faq-item"><div class="faq-q">How long does knob-and-tube wiring removal take?</div><div class="faq-a">Usually 1–3 days depending on the home. We work carefully to minimize drywall damage and disruption.</div></div>
    <div class="faq-item"><div class="faq-q">Can you install an EV charger if my panel is at capacity?</div><div class="faq-a">Yes — we assess your panel first and can upgrade it as part of the same job. EV installs start at $799.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer discounts?</div><div class="faq-a">Yes — senior and military discounts are available. Mention it when you call or fill out our form.</div></div>
  </div>
</div>

<div class="final-cta">
  <div class="fc-left">
    <h3>Ready to get started?</h3>
    <p>Same-day response. Written quote. No surprises.</p>
  </div>
  <div class="fc-right">
    <button class="fc-btn">Request a free estimate →</button>
    <div class="fc-disc">Call/text (253) 234-5359 · Senior and military discounts</div>
  </div>
</div>

<footer>
  <div class="foot-l">© 2024 Washington Electrical · Fife, WA · Service@Washingtonelectrical.net</div>
  <div class="foot-r">
    <div class="foot-badge">Licensed</div>
    <div class="foot-badge">Bonded</div>
    <div class="foot-badge">Insured</div>
    <div class="foot-badge">WASHIEL776C3</div>
  </div>
</footer>
</template>