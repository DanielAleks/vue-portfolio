<style scoped>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#f7f9fc;color:#1a2540;}
nav{background:#fff;padding:14px 32px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5eaf0;}
.logo{display:flex;align-items:center;gap:10px;}
.logo-mark{background:#2352d6;width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;}
.logo-text{font-size:14px;font-weight:700;color:#1a2540;}
.logo-text span{color:#888;font-weight:400;font-size:11px;display:block;}
.nav-links{display:flex;gap:20px;font-size:12px;color:#888;}
.nav-phone{background:#2352d6;color:#fff;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;}
.hero{padding:52px 32px;background:#fff;border-bottom:1px solid #e5eaf0;display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:start;}
.area-pill{display:inline-flex;align-items:center;gap:6px;background:#ebf0ff;color:#2352d6;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;margin-bottom:16px;}
h1{font-size:40px;font-weight:800;line-height:1.05;color:#1a2540;}
h1 span{color:#2352d6;}
.sub{font-size:14px;color:#6b7a99;line-height:1.7;margin-top:12px;}
.ctas{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}
.btn-p{background:#2352d6;color:#fff;padding:11px 22px;border-radius:8px;font-weight:600;font-size:13px;cursor:pointer;border:none;}
.btn-s{background:#ebf0ff;color:#2352d6;padding:11px 22px;border-radius:8px;font-weight:600;font-size:13px;cursor:pointer;border:none;}
.trust-row{display:flex;gap:12px;margin-top:14px;flex-wrap:wrap;}
.tr{font-size:11px;color:#888;display:flex;align-items:center;gap:4px;}
.ck{color:#22c55e;}
.form-box{background:#f0f4ff;border-radius:12px;padding:22px;}
.form-title{font-size:14px;font-weight:700;color:#1a2540;margin-bottom:3px;}
.form-sub{font-size:11px;color:#6b7a99;margin-bottom:14px;}
.ff{width:100%;padding:9px 12px;border:1px solid #d0d8ef;border-radius:6px;font-size:12px;font-family:inherit;color:#1a2540;margin-bottom:8px;background:#fff;}
.ff::placeholder{color:#aab0c0;}
.fs{width:100%;padding:9px 12px;border:1px solid #d0d8ef;border-radius:6px;font-size:12px;font-family:inherit;color:#6b7a99;margin-bottom:8px;background:#fff;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:0;}
.fb{width:100%;background:#2352d6;color:#fff;padding:11px;border-radius:6px;font-weight:600;font-size:13px;cursor:pointer;border:none;margin-top:4px;}
.rating-small{font-size:11px;color:#6b7a99;text-align:center;margin-top:10px;}
.stats{background:#fff;border-bottom:1px solid #e5eaf0;border-top:1px solid #e5eaf0;display:grid;grid-template-columns:repeat(5,1fr);}
.stat{padding:16px 0;border-right:1px solid #e5eaf0;text-align:center;}
.stat:last-child{border-right:none;}
.stat-n{font-size:20px;font-weight:800;color:#2352d6;}
.stat-l{font-size:10px;color:#888;margin-top:2px;text-transform:uppercase;letter-spacing:.5px;}
.why-us{padding:48px 32px;background:#f7f9fc;border-bottom:1px solid #e5eaf0;}
.sec-pill{display:inline-block;background:#ebf0ff;color:#2352d6;font-size:10px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;}
.sec-h{font-size:26px;font-weight:800;color:#1a2540;margin-bottom:24px;}
.wu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.wu-card{background:#fff;border-radius:10px;padding:18px;border:1px solid #e5eaf0;}
.wu-icon{width:36px;height:36px;background:#ebf0ff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:12px;}
.wu-t{font-size:13px;font-weight:700;color:#1a2540;margin-bottom:4px;}
.wu-d{font-size:12px;color:#6b7a99;line-height:1.6;}
.services{padding:48px 32px;background:#fff;border-bottom:1px solid #e5eaf0;}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;}
.svc{background:#f7f9fc;border-radius:10px;padding:18px;border:1px solid #e5eaf0;}
.svc-price{display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:10px;font-weight:700;padding:3px 10px;border-radius:12px;margin-bottom:8px;}
.svc-t{font-size:13px;font-weight:700;color:#1a2540;margin-bottom:4px;}
.svc-d{font-size:12px;color:#6b7a99;line-height:1.5;}
.process{padding:48px 32px;background:#2352d6;border-bottom:1px solid #1a3fb8;}
.process .sec-pill{background:rgba(255,255,255,0.15);color:#fff;}
.process .sec-h{color:#fff;}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;}
.step{background:rgba(255,255,255,0.1);border-radius:10px;padding:20px;}
.step-n{width:32px;height:32px;border-radius:50%;background:#fff;color:#2352d6;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;margin-bottom:12px;}
.step-t{font-size:13px;font-weight:700;color:#fff;margin-bottom:5px;}
.step-d{font-size:12px;color:rgba(255,255,255,0.65);line-height:1.6;}
.reviews{padding:48px 32px;background:#f7f9fc;border-bottom:1px solid #e5eaf0;}
.rev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px;}
.rev{background:#fff;border-radius:10px;padding:18px;border:1px solid #e5eaf0;}
.rev-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;}
.rev-name{font-size:12px;font-weight:700;color:#1a2540;}
.rev-stars{color:#f59e0b;font-size:11px;}
.rev-body{font-size:12px;color:#6b7a99;line-height:1.6;}
.areas{padding:40px 32px;background:#fff;border-bottom:1px solid #e5eaf0;}
.area-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;}
.area-tag{background:#f0f4ff;border:1px solid #d0d8ef;color:#2352d6;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600;}
.faq{padding:48px 32px;background:#f7f9fc;border-bottom:1px solid #e5eaf0;}
.faq-list{display:grid;grid-template-columns:1fr 1fr;gap:0 32px;margin-top:20px;}
.faq-item{border-bottom:1px solid #e5eaf0;padding:14px 0;}
.faq-q{font-size:13px;font-weight:700;color:#1a2540;margin-bottom:4px;}
.faq-a{font-size:12px;color:#6b7a99;line-height:1.6;}
.final-cta{background:#1a2540;padding:44px 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.fc-left h3{font-size:22px;font-weight:800;color:#fff;}
.fc-left p{font-size:13px;color:rgba(255,255,255,0.5);margin-top:4px;}
.fc-right{display:flex;flex-direction:column;gap:8px;align-items:flex-end;}
.fc-btn{background:#2352d6;color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;border:none;}
.fc-disc{font-size:11px;color:rgba(255,255,255,0.4);}
footer{background:#111827;padding:18px 32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
.foot-l{font-size:11px;color:#4b5563;}
.foot-r{display:flex;gap:8px;}
.foot-badge{background:rgba(255,255,255,0.06);color:#6b7280;font-size:10px;padding:3px 8px;border-radius:4px;}
.stats-container {
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid #e8ecf0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
}
@media(max-width:768px){
  .hero,.wu-grid,.svc-grid,.steps,.rev-grid,.faq-list,.stats{grid-template-columns:1fr;}
  nav .nav-links{display:none;}
  h1{font-size:28px;}
  .hero,.why-us,.services,.process,.reviews,.areas,.faq,.final-cta,footer{padding:36px 20px;}
  .final-cta{flex-direction:column;}
  .fc-right{align-items:flex-start;}
}
</style>
<template>
<nav>
  <div class="logo">
    <div class="logo-mark">⚡</div>
    <div class="logo-text">Washington Electrical<span>Fife, WA · Since 2023</span></div>
  </div>
  <div class="nav-links"><span>Services</span><span>Areas</span><span>About</span><span>Blog</span></div>
  <button class="nav-phone">Call (253) 234-5359</button>
</nav>

<div class="hero">
  <div>
    <div class="area-pill">📍 Serving Fife and the South Sound</div>
    <h1>Your neighborhood<br><span>electrician</span>,<br>done right</h1>
    <p class="sub">Small, family-owned team based in Fife. We take pride in clean work, honest pricing, and treating every home like our own.</p>
    <div class="ctas">
      <button class="btn-p">Get a Free Quote</button>
      <button class="btn-s">📞 (253) 234-5359</button>
    </div>
    <div class="trust-row">
      <div class="tr"><span class="ck">✓</span> Licensed · Bonded · Insured</div>
      <div class="tr"><span class="ck">✓</span> BBB Accredited</div>
      <div class="tr"><span class="ck">✓</span> Senior discounts</div>
      <div class="tr"><span class="ck">✓</span> Military discounts</div>
    </div>
  </div>
  <div class="form-box">
    <div class="form-title">Get a free estimate</div>
    <div class="form-sub">We respond same day — Mon through Sat.</div>
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
    <div class="rating-small">★★★★★ 5.0 · 47 Google reviews · WASHIEL776C3</div>
  </div>
</div>

<div class="stats-container">
  <div class="stat"><div class="stat-n">5.0★</div><div class="stat-l">Google rating</div></div>
  <div class="stat"><div class="stat-n">$799</div><div class="stat-l">EV from</div></div>
  <div class="stat"><div class="stat-n">24H</div><div class="stat-l">Mon–Sat</div></div>
  <div class="stat"><div class="stat-n">BBB</div><div class="stat-l">Accredited</div></div>
  <div class="stat"><div class="stat-n">0</div><div class="stat-l">Shortcuts</div></div>
</div>

<div class="why-us">
  <div class="sec-pill">Why choose us</div>
  <div class="sec-h">The Washington Electrical difference</div>
  <div class="wu-grid">
    <div class="wu-card"><div class="wu-icon">🏠</div><div class="wu-t">Your home, respected</div><div class="wu-d">Minimal drywall damage. We protect your space and clean up before leaving.</div></div>
    <div class="wu-card"><div class="wu-icon">📋</div><div class="wu-t">Quote before we start</div><div class="wu-d">Written estimate, approved by you, before we pick up a tool. No surprises.</div></div>
    <div class="wu-card"><div class="wu-icon">✅</div><div class="wu-t">Permits pulled every time</div><div class="wu-d">Fully permitted and inspected. Your home stays safe, insurable, and code-compliant.</div></div>
    <div class="wu-card"><div class="wu-icon">👨‍👩‍👦</div><div class="wu-t">Family-owned in Fife</div><div class="wu-d">We're your neighbors. Our reputation is built one home at a time.</div></div>
    <div class="wu-card"><div class="wu-icon">⚡</div><div class="wu-t">Same-day response</div><div class="wu-d">Call, text, or fill out our form. We get back fast — usually within the hour.</div></div>
    <div class="wu-card"><div class="wu-icon">🎖️</div><div class="wu-t">Senior and military discounts</div><div class="wu-d">Proud to serve those who've served. Just mention it when you call.</div></div>
  </div>
</div>

<div class="services">
  <div class="sec-pill">Our services</div>
  <div class="sec-h">What we specialize in</div>
  <div class="svc-grid">
    <div class="svc"><div class="svc-price">From $799</div><div class="svc-t">EV Charger Install</div><div class="svc-d">Level 2 home charging. Permitted and inspected, start to finish.</div></div>
    <div class="svc"><div class="svc-t">Panel Upgrades</div><div class="svc-d">Full upgrades, Zinsco and FPE replacements, SPAN smart panels.</div></div>
    <div class="svc"><div class="svc-t">Wiring Upgrades</div><div class="svc-d">Knob-and-tube removal with minimal drywall damage. Modern, safe systems.</div></div>
    <div class="svc"><div class="svc-t">Lighting Upgrades</div><div class="svc-d">Recessed cans, custom fixtures, high-ceiling installs — done cleanly.</div></div>
    <div class="svc"><div class="svc-t">Outlet Install</div><div class="svc-d">Sparking outlets, loose plugs, tripping breakers. Fixed right.</div></div>
    <div class="svc"><div class="svc-t">Service Call</div><div class="svc-d">Flat-fee diagnostic. We find the issue and give you a clear plan.</div></div>
  </div>
</div>

<div class="process">
  <div class="sec-pill">How it works</div>
  <div class="sec-h">From call to complete in 3 steps</div>
  <div class="steps">
    <div class="step"><div class="step-n">1</div><div class="step-t">Request a quote</div><div class="step-d">Call, text, or use our form. We respond same day — usually within the hour.</div></div>
    <div class="step"><div class="step-n">2</div><div class="step-t">Schedule your visit</div><div class="step-d">We assess your home and give you a written estimate. You approve before we start.</div></div>
    <div class="step"><div class="step-n">3</div><div class="step-t">Work completed right</div><div class="step-d">Permits pulled, inspection passed. We don't leave until you're satisfied.</div></div>
  </div>
</div>

<div class="reviews">
  <div class="sec-pill">Customer reviews</div>
  <div class="sec-h">What our neighbors say</div>
  <div class="rev-grid">
    <div class="rev"><div class="rev-top"><div class="av" style="background:#2352d6;">DG</div><div><div class="rev-name">Damon Graves · 3 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Very happy with the work. Russ had a quote for me the day after his visit — great communication throughout."</div></div>
    <div class="rev"><div class="rev-top"><div class="av" style="background:#16a34a;">JC</div><div><div class="rev-name">John Curthoys · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Thorough, communicated our options clearly, and did great work. Highly recommend."</div></div>
    <div class="rev"><div class="rev-top"><div class="av" style="background:#9333ea;">KS</div><div><div class="rev-name">Kent Stevenson · 5 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Professional, knowledgeable, and clean. Great team — would recommend to anyone in the area."</div></div>
    <div class="rev"><div class="rev-top"><div class="av" style="background:#dc2626;">MB</div><div><div class="rev-name">Mark Bishop · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Fast, friendly, and fair. Panel upgrade was a breeze. Left everything tidy."</div></div>
  </div>
</div>

<div class="areas">
  <div class="sec-pill">Service area</div>
  <div class="sec-h">We come to you across the South Sound</div>
  <div class="area-tags">
    <div class="area-tag">Fife</div><div class="area-tag">Tacoma</div><div class="area-tag">Federal Way</div><div class="area-tag">Auburn</div><div class="area-tag">Puyallup</div><div class="area-tag">Lakewood</div><div class="area-tag">Gig Harbor</div><div class="area-tag">Kent</div><div class="area-tag">Renton</div><div class="area-tag">SeaTac</div><div class="area-tag">Sumner</div><div class="area-tag">Bonney Lake</div><div class="area-tag">University Place</div><div class="area-tag">DuPont</div><div class="area-tag">Burien</div>
  </div>
</div>

<div class="faq">
  <div class="sec-pill">Common questions</div>
  <div class="sec-h">Things people ask us</div>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">How much does a panel upgrade cost?</div><div class="faq-a">Depends on your setup. We give you a written estimate before any work starts — no surprises.</div></div>
    <div class="faq-item"><div class="faq-q">How long does wiring work take?</div><div class="faq-a">Usually 1–3 days. We work carefully and minimize drywall disruption throughout.</div></div>
    <div class="faq-item"><div class="faq-q">Do you pull permits?</div><div class="faq-a">Yes, every time. Permits keep your home safe, insurable, and ready for resale.</div></div>
    <div class="faq-item"><div class="faq-q">Can you install an EV charger if my panel is full?</div><div class="faq-a">Yes — we assess capacity and can upgrade the panel as part of the same job. From $799.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer senior or military discounts?</div><div class="faq-a">Yes — just mention it when you reach out and we'll apply it to your estimate.</div></div>
    <div class="faq-item"><div class="faq-q">What areas do you serve?</div><div class="faq-a">Fife, Tacoma, Federal Way, and most of the South Sound — see the full list above.</div></div>
  </div>
</div>

<div class="final-cta">
  <div class="fc-left">
    <h3>Ready to get started?</h3>
    <p>Same-day response. Written quote. No surprises.</p>
  </div>
  <div class="fc-right">
    <button class="fc-btn">Request a free quote</button>
    <div class="fc-disc">Or call/text (253) 234-5359 · Senior and military discounts available</div>
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