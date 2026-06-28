<style scoped>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:Georgia,serif;background:#faf7f0;color:#1a2310;}
nav{background:#1a2310;padding:14px 36px;display:flex;justify-content:space-between;align-items:center;}
.logo{color:#faf7f0;font-size:15px;font-style:italic;}.logo strong{font-style:normal;color:#7db85a;}
.nav-links{display:flex;gap:20px;font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5a6a4a;}
.nav-phone{background:#7db85a;color:#fff;padding:8px 16px;font-size:13px;font-family:'Helvetica Neue',sans-serif;font-weight:600;cursor:pointer;border:none;}
.hero{padding:60px 36px;display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:start;border-bottom:2px solid #e0d8c8;}
.region-badge{display:inline-flex;align-items:center;gap:6px;background:#1a2310;color:#faf7f0;padding:5px 14px;font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;}
h1{font-size:46px;font-weight:700;line-height:1.05;color:#1a2310;}
h1 em{color:#4a7a28;font-style:italic;}
.sub{font-family:'Helvetica Neue',sans-serif;font-size:14px;color:#5a6a4a;line-height:1.7;margin-top:14px;}
.ctas{display:flex;gap:10px;margin-top:20px;}
.btn-p{background:#4a7a28;color:#fff;padding:12px 24px;font-family:'Helvetica Neue',sans-serif;font-weight:600;font-size:13px;cursor:pointer;border:none;}
.btn-s{border:2px solid #1a2310;color:#1a2310;padding:12px 24px;font-family:'Helvetica Neue',sans-serif;font-weight:600;font-size:13px;cursor:pointer;background:transparent;}
.trust-row{display:flex;gap:14px;margin-top:16px;flex-wrap:wrap;}
.tr{font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#5a6a4a;display:flex;align-items:center;gap:4px;}
.ck{color:#4a7a28;}
.form-box{background:#fff;border:1px solid #d0c8b8;padding:22px;}
.form-title{font-size:14px;font-weight:700;color:#1a2310;margin-bottom:3px;}
.form-sub{font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#5a6a4a;margin-bottom:14px;}
.ff{width:100%;padding:9px 12px;border:1px solid #d0c8b8;font-size:12px;font-family:'Helvetica Neue',sans-serif;color:#1a2310;margin-bottom:8px;background:#faf7f0;}
.ff::placeholder{color:#9a8a7a;}
.fs{width:100%;padding:9px 12px;border:1px solid #d0c8b8;font-size:12px;font-family:'Helvetica Neue',sans-serif;color:#5a6a4a;margin-bottom:8px;background:#faf7f0;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:0;}
.fb{width:100%;background:#4a7a28;color:#fff;padding:11px;font-family:'Helvetica Neue',sans-serif;font-weight:600;font-size:13px;cursor:pointer;border:none;margin-top:4px;}
.rating-small{font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#7a8a5a;text-align:center;margin-top:10px;}
.stats{border-top:2px solid #1a2310;border-bottom:1px solid #d0c8b8;display:grid;grid-template-columns:repeat(5,1fr);}
.stat{padding:18px 0;text-align:center;}
.stat:last-child{border-right:none;}
.stat-n{font-size:22px;font-weight:700;color:#4a7a28;}
.stat-l{font-family:'Helvetica Neue',sans-serif;font-size:10px;color:#7a8a6a;margin-top:3px;letter-spacing:1px;text-transform:uppercase;}
.why-us{padding:52px 36px;background:#fff;border-bottom:1px solid #d0c8b8;}
.sec-kicker{font-family:'Helvetica Neue',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7db85a;margin-bottom:8px;}
.sec-h{font-size:28px;font-weight:700;color:#1a2310;margin-bottom:28px;}
.wu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.wu-item{border-top:3px solid #7db85a;padding-top:16px;}
.wu-t{font-size:14px;font-weight:700;color:#1a2310;margin-bottom:6px;}
.wu-d{font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5a6a4a;line-height:1.6;}
.services{padding:52px 36px;background:#faf7f0;border-bottom:1px solid #d0c8b8;}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;}
.svc{background:#fff;padding:20px;border:1px solid #d0c8b8;}
.svc-price{font-family:'Helvetica Neue',sans-serif;display:inline-block;background:#eaf3de;color:#3b6d11;font-size:10px;font-weight:700;padding:3px 10px;margin-bottom:8px;}
.svc-t{font-size:14px;font-weight:700;color:#1a2310;margin-bottom:5px;}
.svc-d{font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5a6a4a;line-height:1.5;}
.process{padding:52px 36px;background:#1a2310;border-bottom:2px solid #4a7a28;}
.process .sec-kicker{color:#7db85a;}
.process .sec-h{color:#faf7f0;}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px;}
.step{border-top:2px solid #4a7a28;padding-top:18px;}
.step-n{font-size:36px;font-weight:700;color:#2a3a1a;line-height:1;margin-bottom:12px;}
.step-t{font-size:13px;font-weight:700;color:#faf7f0;margin-bottom:5px;}
.step-d{font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5a7a4a;line-height:1.7;}
.reviews{padding:52px 36px;background:#fff;border-bottom:1px solid #d0c8b8;}
.rev-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:24px;}
.rev{background:#faf7f0;padding:20px;border:1px solid #e0d8c8;}
.rev-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.av{width:34px;height:34px;border-radius:50%;background:#4a7a28;display:flex;align-items:center;justify-content:center;font-family:'Helvetica Neue',sans-serif;font-size:11px;font-weight:700;color:#fff;}
.rev-name{font-family:'Helvetica Neue',sans-serif;font-size:12px;font-weight:700;color:#1a2310;}
.rev-stars{color:#7db85a;font-size:11px;}
.rev-body{font-size:13px;color:#5a6a4a;line-height:1.6;font-style:italic;}
.areas{padding:40px 36px;background:#faf7f0;border-bottom:1px solid #d0c8b8;}
.area-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px;}
.area-tag{background:#fff;border:1px solid #c0d0a0;color:#3b6d11;padding:5px 12px;font-family:'Helvetica Neue',sans-serif;font-size:11px;font-weight:600;}
.faq{padding:52px 36px;background:#fff;border-bottom:1px solid #d0c8b8;}
.faq-list{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;margin-top:24px;}
.faq-item{border-bottom:1px solid #e0d8c8;padding:14px 0;}
.faq-q{font-size:13px;font-weight:700;color:#1a2310;margin-bottom:5px;}
.faq-a{font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5a6a4a;line-height:1.6;}
.final-cta{background:#4a7a28;padding:44px 36px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.fc-left h3{font-size:22px;font-weight:700;color:#fff;}
.fc-left p{font-family:'Helvetica Neue',sans-serif;font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px;}
.fc-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;}
.fc-btn{background:#fff;color:#4a7a28;padding:12px 26px;font-family:'Helvetica Neue',sans-serif;font-weight:700;font-size:13px;cursor:pointer;border:none;}
.fc-disc{font-family:'Helvetica Neue',sans-serif;font-size:11px;color:rgba(255,255,255,0.6);}
footer{background:#1a2310;padding:20px 36px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
.foot-l{font-family:'Helvetica Neue',sans-serif;font-size:11px;color:#3a4a2a;}
.foot-r{display:flex;gap:8px;}
.foot-badge{border:1px solid #2a3a1a;color:#3a5a2a;font-family:'Helvetica Neue',sans-serif;font-size:10px;padding:3px 8px;}
.stats-container {
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid #e8ecf0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
}
@media(min-width: 800px) {
.stats-container {
    padding-left: 60px;
    padding-right: 60px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  
  }
}
@media(max-width:768px){
  .hero,.wu-grid,.svc-grid,.steps,.rev-grid,.faq-list,.stats{grid-template-columns:1fr;}
  nav .nav-links{display:none;}
  h1{font-size:32px;}
  .final-cta{flex-direction:column;}
  .fc-right{align-items:flex-start;}
}
</style>
<template>
<nav>
  <div class="logo"><strong>Washington</strong> Electrical</div>
  <div class="nav-links"><span>Services</span><span>Areas</span><span>About</span><span>Blog</span></div>
  <button class="nav-phone">(253) 234-5359</button>
</nav>

<div class="hero">
  <div>
    <div class="region-badge">🌲 Serving the South Sound since 2023</div>
    <h1>Local power.<br><em>Local people.</em><br>Done right.</h1>
    <p class="sub">Family-owned electrical team in Fife, WA. We upgrade homes across Tacoma, Federal Way, and the South Sound — clean work, honest pricing, zero shortcuts.</p>
    <div class="ctas">
      <button class="btn-p">Get a Free Estimate</button>
      <button class="btn-s">Call (253) 234-5359</button>
    </div>
    <div class="trust-row">
      <div class="tr"><span class="ck">✓</span>Licensed · Bonded · Insured</div>
      <div class="tr"><span class="ck">✓</span>Senior discounts</div>
      <div class="tr"><span class="ck">✓</span>Military discounts</div>
      <div class="tr"><span class="ck">✓</span>BBB Accredited</div>
    </div>
  </div>
  <div class="form-box">
    <div class="form-title">Request a free estimate</div>
    <div class="form-sub">We respond the same day — Mon through Sat.</div>
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
    <button class="fb">Send my request</button>
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
  <div class="sec-kicker">Why choose us</div>
  <div class="sec-h">The Washington Electrical difference</div>
  <div class="wu-grid">
    <div class="wu-item"><div class="wu-t">Your home, respected</div><div class="wu-d">Minimal drywall damage. We protect your space and clean up before we leave.</div></div>
    <div class="wu-item"><div class="wu-t">Quote before we start</div><div class="wu-d">Written estimate, approved by you, before any work begins. No surprises, ever.</div></div>
    <div class="wu-item"><div class="wu-t">Permits pulled every time</div><div class="wu-d">Every job is fully permitted and inspected. Your home stays safe and insurable.</div></div>
    <div class="wu-item"><div class="wu-t">Neighbors, not strangers</div><div class="wu-d">We're based in Fife. Our reputation is built one home and one neighbor at a time.</div></div>
    <div class="wu-item"><div class="wu-t">Same-day response</div><div class="wu-d">Call, text, or submit a form. We get back to you fast — usually within the hour.</div></div>
    <div class="wu-item"><div class="wu-t">Senior and military discounts</div><div class="wu-d">We honor those who've served. Just mention it when you reach out.</div></div>
  </div>
</div>

<div class="services">
  <div class="sec-kicker">What we do</div>
  <div class="sec-h">Our electrical services</div>
  <div class="svc-grid">
    <div class="svc"><div class="svc-price">From $799</div><div class="svc-t">EV Charger Install</div><div class="svc-d">Level 2 home charging. Permitted, inspected, handled start to finish.</div></div>
    <div class="svc"><div class="svc-t">Panel Upgrades</div><div class="svc-d">Full upgrades, Zinsco and FPE replacements, SPAN smart panels.</div></div>
    <div class="svc"><div class="svc-t">Wiring Upgrades</div><div class="svc-d">Knob-and-tube removal with minimal disruption. Modern, safe systems.</div></div>
    <div class="svc"><div class="svc-t">Lighting Upgrades</div><div class="svc-d">Recessed cans, custom fixtures, high-ceiling work — professional and clean.</div></div>
    <div class="svc"><div class="svc-t">Outlet Install</div><div class="svc-d">Sparking outlets, loose plugs, tripping breakers — diagnosed and fixed.</div></div>
    <div class="svc"><div class="svc-t">Service Call</div><div class="svc-d">Flat-fee diagnostic. We find the issue and give you a clear repair plan.</div></div>
  </div>
</div>

<div class="process">
  <div class="sec-kicker">How it works</div>
  <div class="sec-h">From call to complete</div>
  <div class="steps">
    <div class="step"><div class="step-n">01</div><div class="step-t">Request a quote</div><div class="step-d">Call, text, or use our form. We respond the same day — usually within the hour.</div></div>
    <div class="step"><div class="step-n">02</div><div class="step-t">Schedule your visit</div><div class="step-d">We assess your home and give you a written estimate. You approve before anything starts.</div></div>
    <div class="step"><div class="step-n">03</div><div class="step-t">Work completed right</div><div class="step-d">Permits pulled, inspection passed. We don't leave until the job is done right.</div></div>
  </div>
</div>

<div class="reviews">
  <div class="sec-kicker">What customers say</div>
  <div class="sec-h">Straight from Google</div>
  <div class="rev-grid">
    <div class="rev"><div class="rev-top"><div class="av">DG</div><div><div class="rev-name">Damon Graves · 3 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Very happy with the work. Russ had a quote the day after his visit — great communication the whole way through."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">JC</div><div><div class="rev-name">John Curthoys · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Thorough investigation and clear communication about our options. Great work from start to finish."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">KS</div><div><div class="rev-name">Kent Stevenson · 5 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Professional, knowledgeable, and clean. Great team — would absolutely recommend to friends and neighbors."</div></div>
    <div class="rev"><div class="rev-top"><div class="av">MB</div><div><div class="rev-name">Mark Bishop · 4 months ago</div><div class="rev-stars">★★★★★</div></div></div><div class="rev-body">"Fast, fair, and friendly. Panel upgrade done without a hitch and the team left everything tidy."</div></div>
  </div>
</div>

<div class="areas">
  <div class="sec-kicker">Service area</div>
  <div class="sec-h">We come to you</div>
  <div class="area-tags">
    <div class="area-tag">Fife</div><div class="area-tag">Tacoma</div><div class="area-tag">Federal Way</div><div class="area-tag">Auburn</div><div class="area-tag">Puyallup</div><div class="area-tag">Lakewood</div><div class="area-tag">Gig Harbor</div><div class="area-tag">Kent</div><div class="area-tag">Renton</div><div class="area-tag">SeaTac</div><div class="area-tag">Sumner</div><div class="area-tag">Bonney Lake</div><div class="area-tag">University Place</div><div class="area-tag">DuPont</div><div class="area-tag">Burien</div>
  </div>
</div>

<div class="faq">
  <div class="sec-kicker">Common questions</div>
  <div class="sec-h">Things people ask us</div>
  <div class="faq-list">
    <div class="faq-item"><div class="faq-q">How much does a panel upgrade cost?</div><div class="faq-a">It depends on your setup. We provide a written estimate — no surprises before we start.</div></div>
    <div class="faq-item"><div class="faq-q">How long does wiring work take?</div><div class="faq-a">Usually 1–3 days. We work carefully and minimize drywall damage throughout.</div></div>
    <div class="faq-item"><div class="faq-q">Do you pull permits?</div><div class="faq-a">Yes, always. Permits protect your home's safety and are required for insurance and resale.</div></div>
    <div class="faq-item"><div class="faq-q">Can you install an EV charger if my panel is full?</div><div class="faq-a">Yes — we assess capacity and can upgrade the panel as part of the same job. Installs from $799.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer discounts?</div><div class="faq-a">Yes — senior and military discounts available. Just mention it when you reach out.</div></div>
    <div class="faq-item"><div class="faq-q">What areas do you serve?</div><div class="faq-a">Fife, Tacoma, Federal Way, and most of the South Sound region.</div></div>
  </div>
</div>

<div class="final-cta">
  <div class="fc-left">
    <h3>Ready to get started?</h3>
    <p>Same-day response. Written quote. No surprises.</p>
  </div>
  <div class="fc-right">
    <button class="fc-btn">Request a free estimate</button>
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