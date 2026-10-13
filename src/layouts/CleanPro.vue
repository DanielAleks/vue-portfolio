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
  margin-bottom: .5rem;
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

.faq{padding:60px 44px;border-bottom:1px solid #1a1a1a;}
.faq-list{display:grid;grid-template-columns:1fr 1fr;gap:0 48px;margin-top:28px;}
.faq-item{border-bottom:1px solid #111;padding:16px 0;}
.faq-q{font-size:13px;font-weight:700;margin-bottom:5px;}
.faq-a{font-size:12px;color:#555;line-height:1.7;}
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
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:24px;}
.svc{background:#fff;padding:20px;border:1px solid #d0c8b8;}
/* .svc-price{font-family:'Helvetica Neue',sans-serif;display:inline-block;background:#eaf3de;color:#3b6d11;font-size:10px;font-weight:700;padding:3px 10px;margin-bottom:8px;} */
.svc-t{font-size:14px;font-weight:700;color:#1a2310;margin-bottom:5px;}
.svc-d{font-family:'Helvetica Neue',sans-serif;font-size:12px;color:#5a6a4a;line-height:1.5;}
.round-blue-btn {
  background: #1A6BE0;
  color: white;
  padding: 0.25rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border: none;
  border-radius: 100px;
}
.round-blue-btn:hover {
  background: #458bee;
  scale: 1.01;
  /* background: #1A6BE0; */
  cursor: pointer;
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

  <div class="hero">
    
    <div>
      <!-- <WEHeader/> -->
      <!-- <FreeQuoteForm/> -->
      <!-- <WhyChooseUs/> -->
      <!-- <SatisfactionGuaranteed/> -->
    </div>

    <div>
      <div class="ctas">
        <button class="btn-p" style="border-radius: 100px">Get a Free Quote</button>
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
          <button class="round-blue-btn" style="margin-top: .5rem;"><p>Learn More</p></button>
      </div>
      <div class="svc">
        <div class="svc-price">From $4000</div>
        <div class="svc-t">Panel Upgrades</div>
        <div class="svc-d">
          Full service upgrades, Zinsco and Federal Pacific replacements, SPAN
          smart panels.
        </div>
          <button class="round-blue-btn" style="margin-top: .5rem;"><p>Learn More</p></button>
      </div>
      <div class="svc">
        <div class="svc-price">From $1200</div>
        <div class="svc-t">Wiring Upgrades</div>
        <div class="svc-d">
          Knob-and-tube removal with minimal drywall disruption. Modern, safe
          systems.
        </div>
          <button class="round-blue-btn" style="margin-top: .5rem;"><p>Learn More</p></button>
      </div>
      <div class="svc">
        <div class="svc-price">From $399</div>
        <div class="svc-t">Lighting Upgrades</div>
        <div class="svc-d">
          Recessed cans, custom fixture installs, high-ceiling work — done
          cleanly.
        </div>
          <button class="round-blue-btn" style="margin-top: .5rem;"><p>Learn More</p></button>
      </div>
      <div class="svc">
        <div class="svc-price">From $199</div>
        <div class="svc-t">Outlet Install</div>
        <div class="svc-d">
          Sparking outlets, loose plugs, tripping breakers — quick diagnosis and
          fix.
        </div>
          <button class="round-blue-btn" style="margin-top: .5rem;"><p>Learn More</p></button>
      </div>
      <div class="svc">
        <div class="svc-price">$150 per hour / $200 first hour </div>
        <div class="svc-t">Service Call</div>
        <div class="svc-d">
          Electrical diagnostic starting at a flat fee. We find it and fix it
          right.
        </div>
          <button class="round-blue-btn" style="margin-top: .5rem;"><p>Learn More</p></button>
      </div>
    </div>
  </div>


  <!-- <div class="process">
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
  </div> -->
</template>

<script>
export default {
  name: "CleanPro",
};
</script>