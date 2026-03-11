<style >
  :root { --o:#FF6B1A; --o2:#E84A00; --bg:#0B0E14; --surf:#151922; --surf2:#1E2430; --cream:#FAF0E6; --lgray:#8899AA; --white:#EEF2F7; --blue:#1E3A5F; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Raleway',sans-serif; background:var(--cream); color:var(--bg); max-width:430px; margin:0 auto; overflow-x:hidden; }

  header { background:var(--bg); padding:16px 20px; display:flex; justify-content:space-between; align-items:center; }
  .logo-a { font-family:'Exo 2',sans-serif; font-size:18px; font-weight:900; color:var(--white); letter-spacing:1px; }
  .logo-a span { color:var(--o); }
  .logo-b { font-size:9px; letter-spacing:3px; text-transform:uppercase; color:var(--lgray); margin-top:-2px; }
  .menu { color:var(--white); background:none; border:none; font-size:22px; cursor:pointer; }

  /* HERO */
  .hero { position:relative; overflow:hidden; background:var(--bg); min-height:480px; display:flex; flex-direction:column; justify-content:flex-end; }
  .hero-photo { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80') center/cover; opacity:0.15; }
  /* fire gradient from bottom */
  .hero-fire { position:absolute; bottom:0; left:0; right:0; height:300px; background:linear-gradient(to top, rgba(255,107,26,0.3) 0%, transparent 100%); }
  .hero-vignette { position:absolute; inset:0; background:radial-gradient(ellipse at center top, rgba(30,58,95,0.4) 0%, transparent 60%); }
  /* floating geometry */
  .geo1 { position:absolute; top:40px; right:-30px; width:160px; height:160px; border:1px solid rgba(255,107,26,0.15); border-radius:50%; }
  .geo2 { position:absolute; top:70px; right:0px; width:90px; height:90px; border:1px solid rgba(255,107,26,0.2); border-radius:50%; }
  .hero-content { position:relative; z-index:4; padding:0 20px 40px; }
  .hero-sup { font-family:'Exo 2',sans-serif; font-size:10px; font-weight:600; letter-spacing:4px; text-transform:uppercase; color:var(--o); margin-bottom:10px; }
  .hero h1 { font-family:'Exo 2',sans-serif; font-size:54px; font-weight:900; color:var(--white); line-height:0.92; margin-bottom:10px; letter-spacing:-1px; }
  .hero h1 span { color:var(--o); }
  .hero-sub { font-size:13px; color:var(--lgray); line-height:1.7; margin-bottom:20px; max-width:320px; font-weight:400; }
  .hero-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(255,107,26,0.12); border:1px solid rgba(255,107,26,0.3); border-radius:6px; padding:8px 14px; margin-bottom:28px; }
  .hero-tag span { font-family:'Exo 2',sans-serif; font-size:12px; font-weight:700; color:var(--o); letter-spacing:0.5px; }
  .hero-btns { display:flex; flex-direction:column; gap:10px; }
  .btn-fire { background:linear-gradient(135deg, var(--o2), var(--o)); color:white; padding:16px; border:none; border-radius:10px; font-family:'Exo 2',sans-serif; font-size:17px; font-weight:800; letter-spacing:1px; text-decoration:none; text-align:center; display:block; cursor:pointer; }
  .btn-ghost { background:rgba(255,255,255,0.06); color:var(--white); padding:14px; border:1px solid rgba(255,255,255,0.12); border-radius:10px; font-family:'Raleway',sans-serif; font-size:14px; font-weight:600; text-decoration:none; text-align:center; display:block; }

  /* STATS */
  .stats { background:var(--o); display:flex; }
  .stat { flex:1; padding:16px 8px; text-align:center; border-right:1px solid rgba(255,255,255,0.2); }
  .stat:last-child { border-right:none; }
  .stat-n { font-family:'Exo 2',sans-serif; font-size:28px; font-weight:900; color:white; }
  .stat-l { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.75); margin-top:2px; }

  /* SECTION */
  .section { padding:36px 20px; }
  .sec-tag { font-family:'Exo 2',sans-serif; font-size:9px; font-weight:800; letter-spacing:4px; text-transform:uppercase; color:var(--o); margin-bottom:6px; }
  h2 { font-family:'Exo 2',sans-serif; font-size:30px; font-weight:900; margin-bottom:20px; line-height:1.1; letter-spacing:-0.5px; }

  /* SERVICES */
  .svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .svc-card { background:white; border-radius:14px; padding:18px; border:1px solid #EDE0D0; }
  .svc-icon { font-size:28px; margin-bottom:10px; }
  .svc-card h4 { font-family:'Exo 2',sans-serif; font-size:14px; font-weight:800; margin-bottom:4px; letter-spacing:0.3px; }
  .svc-card p { font-size:12px; color:#7A6A58; line-height:1.5; font-weight:400; }

  /* DARK CTA */
  .cta-dark { background:var(--surf); padding:40px 20px; text-align:center; }
  .cta-dark h2 { color:var(--white); margin-bottom:8px; }
  .cta-dark p { font-size:13px; color:var(--lgray); line-height:1.7; margin-bottom:24px; }
  .cta-phone { font-family:'Exo 2',sans-serif; font-size:38px; font-weight:900; color:var(--o); text-decoration:none; display:block; margin-bottom:20px; letter-spacing:1px; }
  .btn-o-solid { background:var(--o); color:white; padding:14px 32px; border:none; border-radius:10px; font-family:'Exo 2',sans-serif; font-size:16px; font-weight:800; cursor:pointer; text-decoration:none; display:inline-block; }

  /* REVIEWS */
  .reviews-sec { background:#F0E8DA; padding:36px 20px; }
  .reviews-sec h2 { margin-bottom:20px; }
  .review { background:white; border-radius:12px; padding:20px; margin-bottom:14px; border-left:3px solid var(--o); }
  .r-stars { color:var(--o); font-size:13px; letter-spacing:2px; margin-bottom:8px; }
  .r-text { font-size:14px; color:#5C4A30; line-height:1.65; margin-bottom:10px; font-weight:400; }
  .r-auth { font-family:'Exo 2',sans-serif; font-size:13px; font-weight:800; }

  /* FORM */
  .form-sec { padding:36px 20px; }
  .form-inner { background:white; border-radius:16px; padding:26px 20px; border:1px solid #EDE0D0; }
  .form-inner h3 { font-family:'Exo 2',sans-serif; font-size:24px; font-weight:900; margin-bottom:4px; }
  .form-inner .sub { font-size:12px; color:#9A8870; margin-bottom:20px; }
  .fg { margin-bottom:13px; }
  .fg label { display:block; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#9A8870; font-weight:600; margin-bottom:5px; }
  .fg input,.fg select,.fg textarea { width:100%; background:var(--cream); border:1.5px solid #EDE0D0; color:var(--bg); padding:12px 14px; font-family:'Raleway',sans-serif; font-size:14px; outline:none; border-radius:8px; transition:border-color 0.2s; -webkit-appearance:none; }
  .fg input:focus,.fg select:focus,.fg textarea:focus { border-color:var(--o); }
  .fg textarea { resize:none; height:80px; }
  .btn-sub { width:100%; background:linear-gradient(135deg,var(--o2),var(--o)); color:white; padding:15px; border:none; border-radius:10px; font-family:'Exo 2',sans-serif; font-size:17px; font-weight:800; cursor:pointer; letter-spacing:0.5px; }

  /* CONTACT + HOURS */
  .info-section { padding:0 20px 40px; display:flex; flex-direction:column; gap:12px; }
  .info-box { background:white; border-radius:14px; padding:20px; border:1px solid #EDE0D0; }
  .info-box-title { font-family:'Exo 2',sans-serif; font-size:10px; font-weight:800; letter-spacing:3px; text-transform:uppercase; color:var(--o); margin-bottom:14px; }
  .info-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #EDE0D0; }
  .info-row:last-child { border-bottom:none; }
  .info-day { font-size:14px; color:#7A6A58; font-weight:400; }
  .info-time { font-family:'Exo 2',sans-serif; font-size:14px; font-weight:700; }
  .c-link { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #EDE0D0; text-decoration:none; color:var(--bg); }
  .c-link:last-child { border-bottom:none; }
  .c-ico { width:36px; height:36px; background:#FFF0E6; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
  .c-lbl { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#9A8870; font-weight:600; }
  .c-val { font-family:'Exo 2',sans-serif; font-size:14px; font-weight:700; }

  footer { background:var(--bg); padding:24px 20px; text-align:center; }
  footer p { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(238,242,247,0.3); margin-bottom:10px; }
  .fl { display:flex; justify-content:center; gap:20px; }
  .fl a { color:rgba(238,242,247,0.35); text-decoration:none; font-size:12px; letter-spacing:1px; }
</style>
<template>
<header>
  <div>
    <div class="logo-a">AUTHORITY <span>WIN</span></div>
    <div class="logo-b">Window &amp; Repair</div>
  </div>
  <button class="menu">☰</button>
</header>

<section class="hero">
  <div class="hero-photo"></div>
  <div class="hero-fire"></div>
  <div class="hero-vignette"></div>
  <div class="geo1"></div><div class="geo2"></div>
  <div class="hero-content">
    <div class="hero-sup">Authority Window &amp; Repair</div>
    <h1>Window<br><span>Repair</span><br>Done Right</h1>
    <p class="hero-sub">Maximize your home's comfort with reliable, expert solutions for crystal-clear views.</p>
    <div class="hero-tag"><span>👷 Technician: Daniel Chapurin · 7 Yrs · 4.9★</span></div>
    <div class="hero-btns">
      <a class="btn-fire" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-ghost" href="#estimate">Get Free Estimate →</a>
    </div>
  </div>
</section>

<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>

<div class="section">
  <div class="sec-tag">Services</div>
  <h2>What We Offer</h2>
  <div class="svc-grid">
    <div class="svc-card"><div class="svc-icon">🔧</div><h4>Window Repair</h4><p>Glass, seals, hardware — same day.</p></div>
    <div class="svc-card"><div class="svc-icon">🪟</div><h4>Replacement</h4><p>All types, full removal.</p></div>
    <div class="svc-card"><div class="svc-icon">🚨</div><h4>Emergency Glass</h4><p>Urgent same-day service.</p></div>
    <div class="svc-card"><div class="svc-icon">❄️</div><h4>Energy Upgrade</h4><p>Double-pane, low-E, sealing.</p></div>
  </div>
</div>

<div class="cta-dark">
  <div class="sec-tag" style="color:var(--o)">Call Now</div>
  <h2>Same-Day Service Available</h2>
  <p>No hidden fees. Quality craftsmanship and satisfaction — guaranteed on every job.</p>
  <a class="cta-phone" href="tel:6304735256">630-473-5256</a>
  <a class="btn-o-solid" href="mailto:Authoritywindowrepair@gmail.com">Send Email</a>
</div>

<div class="reviews-sec">
  <div class="sec-tag">Reviews</div>
  <h2>What They Say</h2>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Daniel came same day, fixed my foggy window fast. Professional, clean, fair priced."</p><div class="r-auth">Sarah M. — Aurora, IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Break-in at 8am. Daniel was there by noon, new glass installed before evening."</p><div class="r-auth">James T. — Naperville, IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Honest, on time, no mess. My go-to window technician going forward."</p><div class="r-auth">Linda K. — Wheaton, IL</div></div>
</div>

<div class="form-sec" id="estimate">
  <div class="form-inner">
    <h3>Free Estimate</h3>
    <p class="sub">Response within the hour, Monday–Saturday.</p>
    <div class="fg"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fg"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service</label><select><option value="">Select service...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fg"><label>Notes</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-sub" onclick="alert('Sent! We\'ll reach out shortly.')">Submit Request →</button>
  </div>
</div>

<div class="info-section">
  <div class="info-box">
    <div class="info-box-title">Business Hours</div>
    <div class="info-row"><span class="info-day">Monday – Friday</span><span class="info-time">7:00 AM – 6:00 PM</span></div>
    <div class="info-row"><span class="info-day">Saturday</span><span class="info-time">7:00 AM – 4:00 PM</span></div>
    <div class="info-row"><span class="info-day">Sunday</span><span class="info-time" style="color:#EF4444">Closed</span></div>
  </div>
  <div class="info-box">
    <div class="info-box-title">Contact Us</div>
    <a class="c-link" href="tel:6304735256"><div class="c-ico">📞</div><div><div class="c-lbl">Phone</div><div class="c-val">630-473-5256</div></div></a>
    <a class="c-link" href="mailto:Authoritywindowrepair@gmail.com"><div class="c-ico">✉️</div><div><div class="c-lbl">Email</div><div class="c-val">Authoritywindowrepair@gmail.com</div></div></a>
  </div>
</div>

<footer>
  <p>© 2025 Authority Window Repair</p>
  <div class="fl"><a href="#">Home</a><a href="#">Services</a><a href="#">Contact</a></div>
</footer>
</template>