<style scoped>
  :root { --gold:#B8861A; --orange:#D45000; --cream:#F9F5EE; --cream2:#EDE5D5; --dark:#141008; --mid:#5C4A30; --lgray:#9A8870; --white:#FFFFFF; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Libre Baskerville',Georgia,serif; background:var(--cream); color:var(--dark); max-width:430px; margin:0 auto; overflow-x:hidden; }

  /* thin gold line */
  .gold-line { height:1px; background:linear-gradient(90deg, transparent, var(--gold), transparent); }

  header { padding:20px 24px; background:var(--white); display:flex; justify-content:space-between; align-items:center; }
  .logo { text-align:left; }
  .logo-a { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:700; letter-spacing:2px; color:var(--dark); }
  .logo-b { font-size:9px; letter-spacing:4px; text-transform:uppercase; color:var(--gold); margin-top:2px; }
  .menu { background:none; border:none; font-size:20px; color:var(--dark); cursor:pointer; }

  /* HERO */
  .hero { position:relative; overflow:hidden; }
  .hero-img { height:340px; position:relative; overflow:hidden; }
  .hero-bg { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80') center/cover; filter:brightness(0.22) saturate(0.5); }
  .hero-veil { position:absolute; inset:0; background:linear-gradient(180deg, rgba(20,16,8,0.3) 0%, rgba(20,16,8,0.9) 100%); }
  .hero-inner { position:absolute; bottom:0; left:0; right:0; padding:28px 24px; }
  .hero-tagline { font-family:'Cormorant Garamond',serif; font-size:11px; letter-spacing:5px; text-transform:uppercase; color:var(--gold); margin-bottom:14px; font-style:italic; }
  .hero h1 { font-family:'Cormorant Garamond',serif; font-size:52px; font-weight:700; color:var(--white); line-height:0.95; margin-bottom:12px; }
  .hero h1 em { color:var(--orange); font-style:italic; display:block; }
  /* gold underline */
  .gold-underline { width:48px; height:1px; background:var(--gold); margin-bottom:12px; }

  /* overlap white card */
  .card { position:relative; z-index:5; margin:-28px 16px 0; background:var(--white); padding:24px 20px; box-shadow:0 8px 48px rgba(20,16,8,0.1); border-top:2px solid var(--gold); }
  .tech-line { display:flex; align-items:center; gap:10px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid var(--cream2); }
  .tech-line-dot { width:8px; height:8px; background:var(--orange); border-radius:50%; flex-shrink:0; }
  .tech-line-text { font-size:12px; color:var(--mid); letter-spacing:0.5px; font-style:italic; }
  .tech-line-text strong { font-style:normal; color:var(--dark); font-weight:700; }
  .tech-line-exp { margin-left:auto; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--gold); }
  .card p { font-size:14px; color:var(--mid); line-height:1.85; margin-bottom:20px; font-weight:400; }
  .card-btns { display:flex; flex-direction:column; gap:10px; }
  .btn-dark { background:var(--dark); color:var(--white); padding:15px; border:none; font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; letter-spacing:1px; text-decoration:none; text-align:center; display:block; cursor:pointer; }
  .btn-ring { background:transparent; color:var(--dark); padding:13px; border:1px solid var(--cream2); font-family:'Libre Baskerville',serif; font-size:13px; text-decoration:none; text-align:center; display:block; font-style:italic; }

  /* STATS */
  .stats { display:flex; padding:28px 24px; border-bottom:1px solid var(--cream2); gap:0; }
  .stat { flex:1; text-align:center; border-right:1px solid var(--cream2); }
  .stat:last-child { border-right:none; }
  .stat-n { font-family:'Cormorant Garamond',serif; font-size:34px; font-weight:700; color:var(--orange); line-height:1; }
  .stat-l { font-size:9px; letter-spacing:2.5px; text-transform:uppercase; color:var(--lgray); margin-top:4px; }

  /* SERVICES */
  .section { padding:36px 24px; border-bottom:1px solid var(--cream2); }
  .section-header { margin-bottom:24px; }
  .sec-eyebrow { font-size:9px; letter-spacing:4px; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
  .sec-title { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:700; line-height:1.1; }

  .svc-list { }
  .svc-row { display:flex; align-items:flex-start; gap:16px; padding:18px 0; border-bottom:1px solid var(--cream2); }
  .svc-row:last-child { border-bottom:none; }
  .svc-num-roman { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:600; color:var(--gold); width:24px; flex-shrink:0; font-style:italic; }
  .svc-row h4 { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:700; margin-bottom:4px; }
  .svc-row p { font-size:13px; color:var(--mid); line-height:1.65; font-style:italic; }

  /* DARK CTA */
  .dark-cta { background:var(--dark); padding:40px 24px; text-align:center; }
  .dark-cta .sec-eyebrow { color:var(--gold); }
  .dark-cta h2 { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:700; color:var(--white); margin-bottom:10px; font-style:italic; }
  .dark-cta p { font-size:14px; color:rgba(249,245,238,0.6); line-height:1.8; margin-bottom:24px; }
  .d-phone { font-family:'Cormorant Garamond',serif; font-size:40px; font-weight:700; color:var(--orange); text-decoration:none; display:block; margin-bottom:20px; }
  .btn-gold-fill { background:var(--gold); color:var(--dark); padding:14px 32px; border:none; font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-block; }

  /* REVIEWS */
  .reviews { padding:36px 24px; }
  .review { margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid var(--cream2); }
  .review:last-child { border-bottom:none; margin-bottom:0; }
  .r-stars { color:var(--gold); font-size:14px; letter-spacing:3px; margin-bottom:12px; }
  .r-text { font-size:14px; color:var(--mid); line-height:1.8; margin-bottom:12px; font-style:italic; }
  .r-auth { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:700; }

  /* FORM */
  .form-section { padding:36px 24px; background:var(--cream2); }
  .form-inner { background:var(--white); padding:28px 20px; border-top:1px solid var(--gold); }
  .form-inner h3 { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:700; margin-bottom:4px; }
  .form-inner .sub { font-size:12px; color:var(--lgray); margin-bottom:20px; font-style:italic; }
  .fg { margin-bottom:14px; }
  .fg label { display:block; font-size:9px; letter-spacing:3px; text-transform:uppercase; color:var(--lgray); margin-bottom:5px; }
  .fg input,.fg select,.fg textarea { width:100%; background:var(--cream); border:1px solid var(--cream2); color:var(--dark); padding:13px 14px; font-family:'Libre Baskerville',serif; font-size:13px; outline:none; transition:border-color 0.2s; -webkit-appearance:none; border-radius:0; }
  .fg input:focus,.fg select:focus,.fg textarea:focus { border-color:var(--gold); }
  .fg textarea { resize:none; height:90px; }
  .btn-sub { width:100%; background:var(--orange); color:white; padding:15px; border:none; font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:700; cursor:pointer; letter-spacing:1px; }

  /* HOURS */
  .hours-section { padding:36px 24px; border-top:1px solid var(--cream2); }
  .hr-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--cream2); }
  .hr-row:last-child { border-bottom:none; }
  .hr-d { font-size:14px; color:var(--mid); font-style:italic; }
  .hr-t { font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:700; }

  /* CONTACT */
  .contact-section { padding:0 24px 36px; display:flex; flex-direction:column; gap:12px; }
  .c-link { display:flex; align-items:center; gap:14px; padding:16px; background:var(--white); text-decoration:none; color:var(--dark); border-bottom:1px solid var(--cream2); }
  .c-icon { width:36px; height:36px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .c-lbl { font-size:9px; letter-spacing:2.5px; text-transform:uppercase; color:var(--lgray); }
  .c-val { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:700; }

  footer { background:var(--dark); padding:28px 24px; text-align:center; }
  footer p { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(249,245,238,0.3); margin-bottom:10px; }
  .fl { display:flex; justify-content:center; gap:20px; }
  .fl a { color:rgba(249,245,238,0.35); text-decoration:none; font-family:'Libre Baskerville',serif; font-size:11px; font-style:italic; }
</style>
<template>
<div class="gold-line"></div>
<header>
  <div class="logo">
    <div class="logo-a">Authority</div>
    <div class="logo-b">Window &amp; Repair</div>
  </div>
  <button class="menu">☰</button>
</header>
<div class="gold-line"></div>

<section class="hero">
  <div class="hero-img">
    <div class="hero-bg"></div>
    <div class="hero-veil"></div>
    <div class="hero-inner">
      <div class="hero-tagline">Precision · Comfort · Clarity</div>
      <h1>Expert Window<br><em>Repair &amp; Restore</em></h1>
      <div class="gold-underline"></div>
    </div>
  </div>
  <div class="card">
    <div class="tech-line">
      <div class="tech-line-dot"></div>
      <div class="tech-line-text">Your Technician — <strong>Daniel Chapurin</strong></div>
      <div class="tech-line-exp">7 Yrs Exp</div>
    </div>
    <p>Maximize your home's comfort with reliable, expert solutions for crystal-clear views. Quality craftsmanship and customer satisfaction guaranteed on every job.</p>
    <div class="card-btns">
      <a class="btn-dark" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-ring" href="#estimate">Request Free Estimate</a>
    </div>
  </div>
</section>

<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>

<div class="section">
  <div class="section-header">
    <div class="sec-eyebrow">Our Services</div>
    <div class="sec-title">What We Offer</div>
  </div>
  <div class="svc-list">
    <div class="svc-row"><div class="svc-num-roman">I</div><div><h4>Window Repair</h4><p>Glass, seals, hardware — diagnosed and fixed same day.</p></div></div>
    <div class="svc-row"><div class="svc-num-roman">II</div><div><h4>Full Replacement</h4><p>All window types, removal and disposal included.</p></div></div>
    <div class="svc-row"><div class="svc-num-roman">III</div><div><h4>Emergency Glass</h4><p>Same-day urgent service for break-ins and storms.</p></div></div>
    <div class="svc-row"><div class="svc-num-roman">IV</div><div><h4>Energy Upgrade</h4><p>Double-pane, low-E, weatherstripping — lower bills.</p></div></div>
  </div>
</div>

<div class="dark-cta">
  <div class="sec-eyebrow">Contact</div>
  <h2>Ready to Fix<br>Your Windows?</h2>
  <p>Same-day service available. No hidden fees. Your satisfaction is guaranteed, every time.</p>
  <a class="d-phone" href="tel:6304735256">630-473-5256</a>
  <a class="btn-gold-fill" href="mailto:Authoritywindowrepair@gmail.com">Send Email</a>
</div>

<div class="reviews">
  <div class="section-header">
    <div class="sec-eyebrow">Testimonials</div>
    <div class="sec-title">What Clients Say</div>
  </div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Daniel came same day, fixed my foggy window perfectly. Professional, fast, fair price."</p><div class="r-auth">— Sarah M., Aurora IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"After a break-in, Daniel was there by noon with new glass installed by evening."</p><div class="r-auth">— James T., Naperville IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Honest, on time, zero mess. He is the only person I will call for windows."</p><div class="r-auth">— Linda K., Wheaton IL</div></div>
</div>

<div class="form-section" id="estimate">
  <div class="form-inner">
    <h3>Free Estimate</h3>
    <p class="sub">We respond within the hour, Monday through Saturday.</p>
    <div class="fg"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fg"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service</label><select><option value="">Select service...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fg"><label>Details</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-sub" onclick="alert('Thank you. We will be in touch shortly.')">Submit Request</button>
  </div>
</div>

<div class="hours-section">
  <div class="section-header">
    <div class="sec-eyebrow">Availability</div>
    <div class="sec-title">Business Hours</div>
  </div>
  <div class="hr-row"><span class="hr-d">Monday – Friday</span><span class="hr-t">7:00 AM – 6:00 PM</span></div>
  <div class="hr-row"><span class="hr-d">Saturday</span><span class="hr-t">7:00 AM – 4:00 PM</span></div>
  <div class="hr-row"><span class="hr-d">Sunday</span><span class="hr-t" style="color:#EF4444">Closed</span></div>
</div>

<div class="gold-line"></div>
<div class="contact-section">
  <a class="c-link" href="tel:6304735256"><div class="c-icon">📞</div><div><div class="c-lbl">Phone</div><div class="c-val">630-473-5256</div></div></a>
  <a class="c-link" href="mailto:Authoritywindowrepair@gmail.com"><div class="c-icon">✉️</div><div><div class="c-lbl">Email</div><div class="c-val">Authoritywindowrepair@gmail.com</div></div></a>
</div>

<div class="gold-line"></div>
<footer>
  <p>© 2025 Authority Window Repair · All Rights Reserved</p>
  <div class="fl"><a href="#">Home</a><a href="#">Services</a><a href="#">Contact</a></div>
</footer>
</template>