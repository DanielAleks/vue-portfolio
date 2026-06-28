<style scoped>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Helvetica Neue',Arial,sans-serif;background:#000;color:#fff;}
nav{padding:18px 44px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1a1a1a;}
.logo{font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;}
.nav-r{display:flex;gap:20px;align-items:center;}
.nav-link{font-size:12px;color:#555;}
.nav-btn{background:#1a6be0;color:#fff;padding:8px 18px;font-size:12px;font-weight:600;cursor:pointer;border-radius:2px;border:none;}
.hero{padding:80px 44px 0;border-bottom:1px solid #1a1a1a;}
.hero-kicker{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#444;margin-bottom:24px;}
.hero-main{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;}
h1{font-size:60px;font-weight:800;line-height:.95;letter-spacing:-2px;}
h1 span{color:#1a6be0;}
.hero-sub{font-size:14px;color:#555;line-height:1.7;margin-top:20px;max-width:360px;}
.trust-row{display:flex;flex-direction:column;gap:5px;margin-top:16px;}
.tr{font-size:11px;color:#444;display:flex;align-items:center;gap:4px;}
.ck{color:#1a6be0;}
.form-box{background:#0a0a0a;border:1px solid #1a1a1a;padding:22px;}
.form-title{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px;}
.form-sub{font-size:11px;color:#444;margin-bottom:14px;}
.ff{width:100%;padding:9px 12px;background:#000;border:1px solid #222;font-size:12px;font-family:inherit;color:#fff;margin-bottom:8px;}
.ff::placeholder{color:#444;}
.fs{width:100%;padding:9px 12px;background:#000;border:1px solid #222;font-size:12px;font-family:inherit;color:#555;margin-bottom:8px;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:0;}
.fb{width:100%;background:#1a6be0;color:#fff;padding:11px;font-size:12px;font-weight:700;cursor:pointer;border:none;margin-top:4px;border-radius:2px;}
.rating-small{font-size:10px;color:#333;text-align:center;margin-top:10px;}
.hero-bottom{padding:36px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-top:1px solid #111;margin-top:24px;}
.hb-stat{text-align:center;}
.hb-n{font-size:24px;font-weight:800;letter-spacing:-1px;color:#fff;}
.hb-n span{color:#1a6be0;}
.hb-l{font-size:10px;color:#444;text-transform:uppercase;letter-spacing:1px;margin-top:2px;}
.why-us{padding:60px 44px;background:#050505;border-bottom:1px solid #1a1a1a;}
.sec-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#333;margin-bottom:10px;}
.sec-h{font-size:28px;font-weight:800;letter-spacing:-1px;margin-bottom:28px;}
.sec-h span{color:#1a6be0;}
.wu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#1a1a1a;}
.wu-item{background:#050505;padding:22px;}
.wu-t{font-size:13px;font-weight:700;margin-bottom:6px; color: lightgrey}
.wu-d{font-size:12px;color:#555;line-height:1.7;}
.wu-acc{width:24px;height:2px;background:#1a6be0;margin-bottom:14px;}
.services{padding:60px 44px;border-bottom:1px solid #1a1a1a;}
.svc-list{margin-top:28px;}
.svc-row{display:grid;grid-template-columns:220px 1fr 100px;align-items:baseline;padding:18px 0;border-bottom:1px solid #111;gap:24px;}
.svc-row:first-child{border-top:1px solid #111;}
.svc-t{font-size:13px;font-weight:700;}
.svc-d{font-size:12px;color:#555;line-height:1.5;}
.svc-price{font-size:11px;color:#1a6be0;text-align:right;}
.process{padding:60px 44px;background:#050505;border-bottom:1px solid #1a1a1a;}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:32px;}
.step{border-top:1px solid #1a1a1a;padding-top:18px;}
.step-n{font-size:44px;font-weight:800;letter-spacing:-2px;color:#111;line-height:1;margin-bottom:14px;}
.step-t{font-size:13px;font-weight:700;margin-bottom:6px; color: lightgrey}
.step-d{font-size:12px;color:#555;line-height:1.7;}
.reviews{padding:60px 44px;border-bottom:1px solid #1a1a1a;}
.rev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#1a1a1a;margin-top:28px;}
.rev{background:#000;padding:22px;}
.rev-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.av{width:32px;height:32px;border-radius:50%;background:#0a1a3a;border:1px solid #1a2a4a;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#1a6be0;}
.rev-name{font-size:12px;font-weight:700;}
.rev-stars{color:#1a6be0;font-size:11px;}
.rev-body{font-size:12px;color:#555;line-height:1.7;}
.areas{padding:48px 44px;background:#050505;border-bottom:1px solid #1a1a1a;}
.area-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;}
.area-tag{border:1px solid #1a1a1a;color:#444;padding:4px 12px;font-size:11px;border-radius:2px;}
.faq{padding:60px 44px;border-bottom:1px solid #1a1a1a;}
.faq-list{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:28px;}
.faq-item{border-bottom:1px solid #111;padding:16px 0;}
.faq-q{font-size:13px;font-weight:700;margin-bottom:5px;}
.faq-a{font-size:12px;color:#555;line-height:1.7;}
.final-cta{padding:60px 44px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;border-top:3px solid #1a6be0;}
.fc-left h3{font-size:28px;font-weight:800;letter-spacing:-1px;}
.fc-left h3 span{color:#1a6be0;}
.fc-left p{font-size:13px;color:#555;margin-top:4px;}
.fc-right{display:flex;gap:12px;align-items:center;}
.fc-btn{background:#1a6be0;color:#fff;padding:12px 28px;font-size:13px;font-weight:700;cursor:pointer;border-radius:2px;border:none;}
.fc-tel{font-size:14px;font-weight:700;color:#fff;border-bottom:2px solid #1a6be0;padding-bottom:1px;cursor:pointer;}
footer{padding:20px 44px;border-top:1px solid #111;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
.foot-l{font-size:11px;color:#333;}
.foot-r{display:flex;gap:8px;}
.foot-badge{border:1px solid #1a1a1a;color:#333;font-size:10px;padding:3px 8px;border-radius:2px;}
@media(max-width:768px){
  .hero-main,.wu-grid,.steps,.rev-grid,.faq-list,.svc-row,.hero-bottom{grid-template-columns:1fr;}
  nav .nav-r .nav-link{display:none;}
  h1{font-size:40px;}
  .hero,.why-us,.services,.process,.reviews,.areas,.faq,.final-cta,footer{padding:40px 24px;}
  .final-cta{flex-direction:column;}
}
</style>
<template>
<nav style="background: #000">
  <div class="logo">Washington Electrical</div>
  <div class="nav-r">
    <div class="nav-link">Services</div>
    <div class="nav-link">Areas</div>
    <div class="nav-link">About</div>
    <button class="nav-btn">Get a Quote</button>
  </div>
</nav>

<div class="hero" style="background: #000">
  <div class="hero-kicker">Licensed Electrician · Fife, WA · WASHIEL776C3</div>
  <div class="hero-main">
    <div>
      <h1 style="color: white;">We fix what <span>sparks</span> the worry</h1>
      <p class="hero-sub">Family-owned electrical team in Fife. Panel upgrades, wiring, EV chargers — done clean, done safe, right the first time.</p>
      <div class="trust-row">
        <div class="tr"><span class="ck">✓</span> Licensed · Bonded · Insured</div>
        <div class="tr"><span class="ck">✓</span> BBB Accredited Business</div>
        <div class="tr"><span class="ck">✓</span> Senior and military discounts</div>
        <div class="tr"><span class="ck">✓</span> Mon–Sat, 24 hours</div>
      </div>
    </div>
    <div class="form-box">
      <div class="form-title">Request a free estimate</div>
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
      <button class="fb">Send my request →</button>
      <div class="rating-small">★★★★★ 5.0 · 47 Google reviews</div>
    </div>
  </div>
  <div class="hero-bottom">
    <div class="hb-stat"><div class="hb-n">5<span>.0★</span></div><div class="hb-l">Google rating</div></div>
    <div class="hb-stat"><div class="hb-n"><span>$</span>799</div><div class="hb-l">EV install from</div></div>
    <div class="hb-stat"><div class="hb-n">24<span>H</span></div><div class="hb-l">Mon–Sat service</div></div>
    <div class="hb-stat"><div class="hb-n">BBB</div><div class="hb-l">Accredited</div></div>
    <div class="hb-stat"><div class="hb-n">100<span>%</span></div><div class="hb-l">Permitted jobs</div></div>
  </div>
</div>

<div class="why-us">
  <div class="sec-label">Why Washington Electrical</div>
  <div class="sec-h" style="color: lightgrey">What sets us <span>apart</span></div>
  <div class="wu-grid">
    <div class="wu-item"><div class="wu-acc"></div><div class="wu-t">Quote before we start</div><div class="wu-d">Written estimate approved by you before we touch anything. No hidden fees.</div></div>
    <div class="wu-item"><div class="wu-acc"></div><div class="wu-t">Minimal drywall damage</div><div class="wu-d">Precise work protects your walls. We're careful every time.</div></div>
    <div class="wu-item"><div class="wu-acc"></div><div class="wu-t">Permits pulled every time</div><div class="wu-d">Every job is fully permitted, inspected, and code-compliant.</div></div>
    <div class="wu-item"><div class="wu-acc"></div><div class="wu-t">Family-owned in Fife</div><div class="wu-d">Our reputation is built one home at a time. We take that seriously.</div></div>
    <div class="wu-item"><div class="wu-acc"></div><div class="wu-t">Same-day response</div><div class="wu-d">Call, text, or form. We respond fast — usually within the hour.</div></div>
    <div class="wu-item"><div class="wu-acc"></div><div class="wu-t">Senior and military discounts</div><div class="wu-d">Just mention it when you call. We're honored to serve those who've served.</div></div>
  </div>
</div>

<div class="services">
  <div class="sec-label">Services</div>
  <div class="sec-h">What we do</div>
  <div class="svc-list">
    <div class="svc-row"><div class="svc-t">EV Charger Install</div><div class="svc-d">Level 2 home charging, fully permitted. We handle the panel capacity too.</div><div class="svc-price">From $799</div></div>
    <div class="svc-row"><div class="svc-t">Panel Upgrades</div><div class="svc-d">Full upgrades, Zinsco and FPE replacements, SPAN smart panels.</div><div class="svc-price">Quote required</div></div>
    <div class="svc-row"><div class="svc-t">Wiring Upgrades</div><div class="svc-d">Knob-and-tube removal with minimal drywall damage. Modern, safe systems.</div><div class="svc-price">Quote required</div></div>
    <div class="svc-row"><div class="svc-t">Lighting Upgrades</div><div class="svc-d">Recessed cans, custom fixtures, high-ceiling installs — professional and clean.</div><div class="svc-price">Quote required</div></div>
    <div class="svc-row"><div class="svc-t">Outlet Install</div><div class="svc-d">Sparking outlets, loose plugs, tripping breakers. Diagnosed and fixed right.</div><div class="svc-price">Flat fee</div></div>
    <div class="svc-row"><div class="svc-t">Service Call</div><div class="svc-d">Electrical diagnostic, flat fee. We find the issue and give you a clear plan.</div><div class="svc-price">Flat fee</div></div>
  </div>
</div>

<div class="process">
  <div class="sec-label">How it works</div>
  <div class="sec-h" style="color: lightgrey">From call to complete</div>
  <div class="steps">
    <div class="step"><div class="step-n">01</div><div class="step-t">Request a quote</div><div class="step-d">Call, text, or use our form. We respond same day, usually within the hour.</div></div>
    <div class="step"><div class="step-n">02</div><div class="step-t">Schedule your visit</div><div class="step-d">We assess the job and hand you a written estimate. You approve before anything starts.</div></div>
    <div class="step"><div class="step-n">03</div><div class="step-t">Work done right</div><div class="step-d">Permits pulled, inspection passed, cleanup done. We don't leave until it's right.</div></div>
  </div>
</div>

<div class="reviews" style="background: #000">
  <div class="sec-label">Reviews</div>
  <div class="sec-h" style="color: white">What customers say</div>
  <div class="rev-grid">
    <div class="rev"><div class="rev-top"><div class="av">DG</div><div><div class="rev-name">Damon Graves · 3 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Very happy with the work. Russ had a quote for me the day after his visit — great communication throughout."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">JC</div><div><div class="rev-name">John Curthoys · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Thorough investigation, clear options, great work. Very happy with the result and would recommend."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">KS</div><div><div class="rev-name">Kent Stevenson · 5 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Professional, knowledgeable, and clean. Great personality — would recommend to anyone."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">MB</div><div><div class="rev-name">Mark Bishop · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Fast, fair, and friendly. Panel upgrade done without a hitch. Left everything clean."</div></div>
  </div>
</div>

<div class="areas">
  <div class="sec-label">Service area</div>
  <div class="sec-h" style="color: lightgrey">Covering the South Sound</div>
  <div class="area-tags">
    <div class="area-tag">Fife</div><div class="area-tag">Tacoma</div><div class="area-tag">Federal Way</div><div class="area-tag">Auburn</div><div class="area-tag">Puyallup</div><div class="area-tag">Lakewood</div><div class="area-tag">Gig Harbor</div><div class="area-tag">Kent</div><div class="area-tag">Renton</div><div class="area-tag">SeaTac</div><div class="area-tag">Sumner</div><div class="area-tag">Bonney Lake</div><div class="area-tag">University Place</div><div class="area-tag">DuPont</div>
  </div>
</div>

<div class="faq">
  <div class="sec-label">FAQ</div>
  <div class="sec-h">Common questions</div>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">How much does a panel upgrade cost?</div><div class="faq-a">Depends on your setup. We provide a written estimate before any work — no surprises.</div></div>
    <div class="faq-item"><div class="faq-q">Do you pull permits?</div><div class="faq-a">Yes, always. Permits protect your home and are required for insurance and resale.</div></div>
    <div class="faq-item"><div class="faq-q">How long does wiring work take?</div><div class="faq-a">Usually 1–3 days. We minimize drywall damage and disruption throughout.</div></div>
    <div class="faq-item"><div class="faq-q">Can you install an EV charger if my panel is full?</div><div class="faq-a">Yes — we check capacity first and can upgrade the panel as part of the same job.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer senior or military discounts?</div><div class="faq-a">Yes — just mention it when you call or submit our form.</div></div>
    <div class="faq-item"><div class="faq-q">What areas do you cover?</div><div class="faq-a">Fife, Tacoma, Federal Way, and the broader South Sound region.</div></div>
  </div>
</div>

<div class="final-cta">
  <div class="fc-left">
    <h3>Ready to get <span>started?</span></h3>
    <p>Same-day response. Written quote. No surprises.</p>
  </div>
  <div class="fc-right">
    <button class="fc-btn">Request a free quote</button>
    <div class="fc-tel">(253) 234-5359</div>
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