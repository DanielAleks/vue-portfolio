<style scoped>
  :root { --o:#E85D04; --od:#C04A02; --opale:#FFF4EE; --cream:#FAF0E6; --dark:#18110A; --mid:#5A4535; --lgray:#9B8B7E; --border:#EDE0D0; --white:#FFFFFF; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Merriweather',Georgia,serif; background:var(--white); color:var(--dark); max-width:430px; margin:0 auto; overflow-x:hidden; }

  header { background:var(--white); padding:16px 20px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); position:sticky; top:0; z-index:50; box-shadow:0 1px 8px rgba(24,17,10,0.06); }
  .logo-wrap { display:flex; align-items:center; gap:10px; }
  .logo-badge { background:var(--o); width:34px; height:34px; border-radius:6px; display:flex; align-items:center; justify-content:center; }
  .logo-badge span { font-family:'Montserrat',sans-serif; font-weight:900; font-size:15px; color:white; }
  .logo-name { font-family:'Montserrat',sans-serif; font-weight:800; font-size:13px; letter-spacing:0.5px; }
  .logo-sub { font-size:9px; letter-spacing:1.5px; color:var(--lgray); text-transform:uppercase; font-family:'Montserrat',sans-serif; font-weight:500; }
  .menu { background:none; border:none; font-size:22px; color:var(--dark); cursor:pointer; }

  /* HERO */
  .hero { position:relative; overflow:hidden; }
  .hero-img { height:300px; position:relative; }
  .hero-bg { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80') center/cover; filter:brightness(0.3) saturate(0.8); }
  .hero-shade { position:absolute; inset:0; background:linear-gradient(180deg, rgba(24,17,10,0.4) 0%, rgba(24,17,10,0.9) 100%); }
  .hero-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:24px; }
  .hero-pre { font-family:'Montserrat',sans-serif; font-size:9px; letter-spacing:3px; text-transform:uppercase; color:rgba(250,240,230,0.6); margin-bottom:8px; font-weight:600; }
  .hero h1 { font-family:'Montserrat',sans-serif; font-size:34px; font-weight:900; color:var(--white); line-height:1.1; margin-bottom:8px; }
  .hero h1 mark { background:none; color:var(--o); }
  /* OVERLAP CARD */
  .overlap-card { position:relative; z-index:5; margin:-32px 16px 0; background:var(--white); border-radius:16px; padding:22px 18px; box-shadow:0 12px 40px rgba(24,17,10,0.15); }
  .tech-row { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
  .tech-avatar { width:44px; height:44px; background:var(--opale); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; border:1.5px solid rgba(232,93,4,0.2); }
  .tech-info-name { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700; }
  .tech-info-role { font-size:11px; color:var(--lgray); font-style:italic; }
  .tech-badge { margin-left:auto; background:var(--opale); border-radius:6px; padding:4px 10px; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:700; color:var(--o); }
  .overlap-card p { font-size:13px; color:var(--mid); line-height:1.75; margin-bottom:18px; font-weight:300; }
  .oc-btns { display:flex; flex-direction:column; gap:8px; }
  .btn-main { background:var(--o); color:white; padding:14px; border:none; border-radius:10px; font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.5px; text-decoration:none; text-align:center; display:block; cursor:pointer; }
  .btn-sec { background:var(--cream); color:var(--dark); padding:12px; border:none; border-radius:10px; font-family:'Montserrat',sans-serif; font-size:13px; font-weight:600; text-decoration:none; text-align:center; display:block; }

  /* STATS */
  .stats-wrap { display:flex; padding:28px 20px; border-bottom:1px solid var(--border); }
  .stat { flex:1; text-align:center; border-right:1px solid var(--border); }
  .stat:last-child { border-right:none; }
  .stat-n { font-family:'Montserrat',sans-serif; font-size:26px; font-weight:900; color:var(--o); }
  .stat-l { font-size:9px; letter-spacing:1.5px; text-transform:uppercase; color:var(--lgray); margin-top:2px; font-family:'Montserrat',sans-serif; font-weight:500; }

  /* SECTIONS */
  .section { padding:32px 20px; border-bottom:1px solid var(--border); }
  .sec-tag { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:var(--o); margin-bottom:6px; }
  .sec-title { font-family:'Montserrat',sans-serif; font-size:24px; font-weight:900; margin-bottom:20px; line-height:1.15; }

  /* SERVICES */
  .svc-items { display:flex; flex-direction:column; gap:12px; }
  .svc-card { display:flex; gap:14px; align-items:flex-start; padding:16px; background:var(--cream); border-radius:12px; }
  .svc-ico { width:44px; height:44px; background:var(--opale); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; border:1px solid rgba(232,93,4,0.15); }
  .svc-card h4 { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700; margin-bottom:3px; }
  .svc-card p { font-size:12px; color:var(--mid); line-height:1.5; font-style:italic; font-weight:300; }

  /* ORANGE CALLOUT */
  .callout { background:var(--o); padding:36px 20px; text-align:center; }
  .callout h2 { font-family:'Montserrat',sans-serif; font-size:26px; font-weight:900; color:white; margin-bottom:10px; }
  .callout p { font-size:13px; color:rgba(255,255,255,0.85); line-height:1.7; margin-bottom:20px; font-weight:300; }
  .c-phone { font-family:'Montserrat',sans-serif; font-size:32px; font-weight:900; color:white; text-decoration:none; display:block; margin-bottom:16px; }
  .btn-wh { background:white; color:var(--od); padding:13px 28px; border:none; border-radius:8px; font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-block; }

  /* REVIEWS */
  .reviews-sec { }
  .review { padding:22px 20px; border-bottom:1px solid var(--border); }
  .r-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
  .r-stars { color:var(--o); font-size:14px; }
  .r-verified { font-family:'Montserrat',sans-serif; font-size:9px; font-weight:600; letter-spacing:1px; color:var(--lgray); text-transform:uppercase; }
  .r-text { font-size:13px; color:var(--mid); line-height:1.7; margin-bottom:12px; font-style:italic; font-weight:300; }
  .r-auth { font-family:'Montserrat',sans-serif; font-size:12px; font-weight:700; }

  /* FORM */
  .form-section { padding:32px 20px; }
  .form-inner { background:var(--cream); border-radius:16px; padding:26px 20px; border:1px solid var(--border); }
  .form-inner h3 { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:900; margin-bottom:4px; }
  .form-inner .sub { font-size:12px; color:var(--lgray); margin-bottom:20px; font-style:italic; }
  .fg { margin-bottom:12px; }
  .fg label { display:block; font-family:'Montserrat',sans-serif; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:var(--lgray); font-weight:600; margin-bottom:5px; }
  .fg input,.fg select,.fg textarea { width:100%; background:var(--white); border:1.5px solid var(--border); color:var(--dark); padding:12px 14px; font-family:'Merriweather',serif; font-size:13px; outline:none; border-radius:8px; transition:border-color 0.2s; -webkit-appearance:none; }
  .fg input:focus,.fg select:focus,.fg textarea:focus { border-color:var(--o); }
  .fg textarea { resize:none; height:80px; }
  .btn-sub { width:100%; background:var(--o); color:white; padding:14px; border:none; border-radius:10px; font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; cursor:pointer; }

  /* HOURS + CONTACT */
  .bottom-info { padding:0 20px 40px; display:flex; flex-direction:column; gap:12px; }
  .info-card { background:var(--cream); border-radius:12px; padding:18px; border:1px solid var(--border); }
  .info-card-title { font-family:'Montserrat',sans-serif; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--o); margin-bottom:12px; }
  .info-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); }
  .info-row:last-child { border-bottom:none; }
  .info-day { font-size:13px; color:var(--mid); font-weight:300; }
  .info-time { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700; }
  .contact-link { display:flex; align-items:center; gap:12px; text-decoration:none; color:var(--dark); }
  .cl-ico { width:36px; height:36px; background:var(--opale); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
  .cl-lbl { font-family:'Montserrat',sans-serif; font-size:9px; letter-spacing:1.5px; text-transform:uppercase; color:var(--lgray); font-weight:600; }
  .cl-val { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700; }

  footer { background:var(--dark); padding:24px 20px; text-align:center; }
  footer p { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(250,240,230,0.35); font-family:'Montserrat',sans-serif; margin-bottom:10px; }
  .fl { display:flex; justify-content:center; gap:20px; }
  .fl a { color:rgba(250,240,230,0.4); text-decoration:none; font-family:'Montserrat',sans-serif; font-size:10px; letter-spacing:1px; text-transform:uppercase; }
</style>
<template>
<header>
  <div class="logo-wrap">
    <div class="logo-badge"><span>A</span></div>
    <div><div class="logo-name">Authority</div><div class="logo-sub">Window &amp; Repair</div></div>
  </div>
  <button class="menu">☰</button>
</header>

<section class="hero">
  <div class="hero-img">
    <div class="hero-bg"></div>
    <div class="hero-shade"></div>
    <div class="hero-text">
      <div class="hero-pre">Authority Window &amp; Repair Services</div>
      <h1>Your Trusted Partner<br>in <mark>Window Solutions</mark></h1>
    </div>
  </div>
  <div class="overlap-card">
    <div class="tech-row">
      <div class="tech-avatar">👷</div>
      <div>
        <div class="tech-info-name">Daniel Chapurin</div>
        <div class="tech-info-role">Senior Window Technician</div>
      </div>
      <div class="tech-badge">7 Yrs Exp</div>
    </div>
    <p>Maximize your home's comfort with reliable, expert solutions for crystal-clear views. Quality craftsmanship — guaranteed.</p>
    <div class="oc-btns">
      <a class="btn-main" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-sec" href="#estimate">Get Free Estimate →</a>
    </div>
  </div>
</section>

<div class="stats-wrap">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs Done</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>

<div class="section">
  <div class="sec-tag">Services</div>
  <div class="sec-title">Our Services</div>
  <div class="svc-items">
    <div class="svc-card"><div class="svc-ico">🔧</div><div><h4>Window Repair</h4><p>Glass, seals, hardware — diagnosed and fixed same day.</p></div></div>
    <div class="svc-card"><div class="svc-ico">🪟</div><div><h4>Full Replacement</h4><p>All window types, full removal and disposal included.</p></div></div>
    <div class="svc-card"><div class="svc-ico">🚨</div><div><h4>Emergency Glass</h4><p>Same-day urgent service for break-ins and storms.</p></div></div>
    <div class="svc-card"><div class="svc-ico">❄️</div><div><h4>Energy Upgrades</h4><p>Double-pane, low-E coating, weatherstripping.</p></div></div>
  </div>
</div>

<div class="callout">
  <h2>Ready to Fix Your Windows?</h2>
  <p>Same-day service available. No hidden fees. 100% satisfaction guaranteed on every job.</p>
  <a class="c-phone" href="tel:6304735256">630-473-5256</a>
  <a class="btn-wh" href="mailto:Authoritywindowrepair@gmail.com">Send Email</a>
</div>

<div class="reviews-sec">
  <div class="review"><div class="r-top"><div class="r-stars">★★★★★</div><div class="r-verified">Verified</div></div><p class="r-text">"Daniel came same day, fixed my foggy window perfectly. Professional, fast, fair price."</p><div class="r-auth">— Sarah M., Aurora IL</div></div>
  <div class="review"><div class="r-top"><div class="r-stars">★★★★★</div><div class="r-verified">Verified</div></div><p class="r-text">"After a break-in, Daniel was there by noon. New glass installed before evening."</p><div class="r-auth">— James T., Naperville IL</div></div>
  <div class="review"><div class="r-top"><div class="r-stars">★★★★★</div><div class="r-verified">Verified</div></div><p class="r-text">"Honest, on time, zero mess. He's my go-to window person going forward."</p><div class="r-auth">— Linda K., Wheaton IL</div></div>
</div>

<div class="form-section" id="estimate">
  <div class="form-inner">
    <h3>Free Estimate</h3>
    <p class="sub">We respond within the hour, Monday–Saturday.</p>
    <div class="fg"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fg"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service</label><select><option value="">Select...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fg"><label>Notes</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-sub" onclick="alert('Sent! We\'ll reach out shortly.')">Request Estimate →</button>
  </div>
</div>

<div class="bottom-info">
  <div class="info-card">
    <div class="info-card-title">Business Hours</div>
    <div class="info-row"><span class="info-day">Monday – Friday</span><span class="info-time">7:00 AM – 6:00 PM</span></div>
    <div class="info-row"><span class="info-day">Saturday</span><span class="info-time">7:00 AM – 4:00 PM</span></div>
    <div class="info-row"><span class="info-day">Sunday</span><span class="info-time" style="color:#EF4444">Closed</span></div>
  </div>
  <div class="info-card">
    <div class="info-card-title">Contact Us</div>
    <a class="contact-link" href="tel:6304735256" style="margin-bottom:12px; display:flex;"><div class="cl-ico">📞</div><div><div class="cl-lbl">Phone</div><div class="cl-val">630-473-5256</div></div></a>
    <a class="contact-link" href="mailto:Authoritywindowrepair@gmail.com"><div class="cl-ico">✉️</div><div><div class="cl-lbl">Email</div><div class="cl-val">Authoritywindowrepair@gmail.com</div></div></a>
  </div>
</div>

<footer>
  <p>© 2025 Authority Window Repair</p>
  <div class="fl"><a href="#">Home</a><a href="#">Services</a><a href="#">Contact</a></div>
</footer>
</template>