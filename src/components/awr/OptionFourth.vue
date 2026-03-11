<style scoped>
  :root { --orange:#E85D04; --dark:#1A1A1A; --char:#2D2D2D; --lgray:#AAAAAA; --white:#F8F8F8; --cream:#FAF0E6; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Roboto Condensed',sans-serif; background:var(--cream); color:var(--dark); max-width:430px; margin:0 auto; overflow-x:hidden; }

  header { background:var(--dark); padding:14px 20px; display:flex; justify-content:space-between; align-items:center; }
  .logo-txt { font-family:'Bebas Neue',cursive; font-size:22px; letter-spacing:3px; color:var(--white); }
  .logo-sub { font-size:9px; letter-spacing:3px; color:var(--orange); text-transform:uppercase; margin-top:-4px; }
  .menu { color:var(--white); background:none; border:none; font-size:22px; cursor:pointer; }

  /* HERO */
  .hero { position:relative; height:500px; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden; }
  .hero-bg { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80') center/cover; filter:brightness(0.25) contrast(1.1); }
  .hero-overlay { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 10%, var(--dark) 100%); }
  /* diagonal orange bar */
  .hero-bar { position:absolute; bottom:180px; left:0; right:0; height:4px; background:var(--orange); transform:skewY(-2deg); }
  .hero-content { position:relative; z-index:3; padding:0 20px 40px; }
  .hero-label { font-family:'Bebas Neue',cursive; font-size:13px; letter-spacing:5px; color:var(--orange); margin-bottom:8px; }
  .hero h1 { font-family:'Bebas Neue',cursive; font-size:72px; line-height:0.9; color:var(--white); margin-bottom:10px; letter-spacing:2px; }
  .hero h1 span { color:var(--orange); }
  .hero-sub { font-size:12px; letter-spacing:2px; color:var(--lgray); text-transform:uppercase; margin-bottom:6px; }
  .hero-tech { display:inline-flex; align-items:center; gap:8px; background:rgba(232,93,4,0.15); border:1px solid var(--orange); padding:6px 14px; margin-bottom:24px; }
  .hero-tech span { font-size:11px; letter-spacing:1.5px; color:var(--orange); text-transform:uppercase; font-weight:700; }
  .cta-row { display:flex; flex-direction:column; gap:10px; }
  .btn-fill { background:var(--orange); color:white; padding:16px; border:none; font-family:'Bebas Neue',cursive; font-size:22px; letter-spacing:3px; text-decoration:none; text-align:center; display:block; }
  .btn-border { background:transparent; color:var(--white); padding:14px; border:1px solid rgba(255,255,255,0.25); font-family:'Roboto Condensed',sans-serif; font-size:14px; font-weight:700; letter-spacing:2px; text-decoration:none; text-align:center; display:block; text-transform:uppercase; }

  /* STATS */
  .stats { display:grid; grid-template-columns:repeat(3,1fr); background:var(--orange); }
  .stat { padding:16px 8px; text-align:center; border-right:1px solid rgba(255,255,255,0.2); }
  .stat:last-child { border-right:none; }
  .stat-n { font-family:'Bebas Neue',cursive; font-size:36px; color:white; line-height:1; letter-spacing:1px; }
  .stat-l { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.75); }

  /* SECTION */
  section { padding:36px 20px; }
  .tag { font-family:'Bebas Neue',cursive; font-size:13px; letter-spacing:4px; color:var(--orange); margin-bottom:4px; }
  h2 { font-family:'Bebas Neue',cursive; font-size:42px; letter-spacing:2px; margin-bottom:24px; line-height:1; }

  /* SERVICES */
  .svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; background:var(--char); }
  .svc-card { background:var(--dark); padding:20px 16px; }
  .svc-icon { font-size:28px; margin-bottom:10px; }
  .svc-card h3 { font-family:'Bebas Neue',cursive; font-size:20px; letter-spacing:1px; color:var(--white); margin-bottom:6px; }
  .svc-card p { font-size:12px; color:var(--lgray); line-height:1.5; font-weight:300; }

  /* ORANGE BOX CTA */
  .cta-box { background:var(--dark); margin:0; padding:36px 20px; text-align:center; border-top:4px solid var(--orange); }
  .cta-box h2 { color:var(--white); margin-bottom:8px; }
  .cta-box p { font-size:14px; color:var(--lgray); line-height:1.6; margin-bottom:20px; }
  .cta-phone { font-family:'Bebas Neue',cursive; font-size:48px; color:var(--orange); text-decoration:none; display:block; margin-bottom:16px; letter-spacing:3px; }
  .btn-orange-full { background:var(--orange); color:white; padding:14px 32px; border:none; font-family:'Bebas Neue',cursive; font-size:20px; letter-spacing:2px; cursor:pointer; text-decoration:none; display:inline-block; }

  /* REVIEWS */
  .reviews-section { background:var(--char); }
  .reviews-section h2 { color:var(--white); }
  .reviews-section .tag { }
  .review { border-left:3px solid var(--orange); padding:16px 20px; margin-bottom:16px; background:rgba(255,255,255,0.04); }
  .r-stars { color:var(--orange); font-size:14px; letter-spacing:2px; margin-bottom:8px; }
  .r-text { font-size:14px; color:var(--lgray); line-height:1.65; margin-bottom:10px; font-weight:300; }
  .r-author { font-family:'Bebas Neue',cursive; font-size:15px; color:var(--white); letter-spacing:1px; }

  /* FORM */
  .form-section { }
  .form-inner { background:white; padding:28px 20px; border-top:4px solid var(--orange); }
  .form-inner h3 { font-family:'Bebas Neue',cursive; font-size:32px; letter-spacing:2px; margin-bottom:4px; }
  .form-inner .sub { font-size:13px; color:var(--lgray); margin-bottom:20px; font-weight:300; }
  .fgroup { margin-bottom:14px; }
  .fgroup label { display:block; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--lgray); margin-bottom:5px; font-weight:700; }
  .fgroup input,.fgroup select,.fgroup textarea { width:100%; background:var(--cream); border:1px solid #DDD; color:var(--dark); padding:12px 14px; font-family:'Roboto Condensed',sans-serif; font-size:15px; outline:none; border-radius:0; transition:border-color 0.2s; -webkit-appearance:none; }
  .fgroup input:focus,.fgroup select:focus,.fgroup textarea:focus { border-color:var(--orange); }
  .fgroup textarea { resize:none; height:90px; }
  .btn-submit-full { width:100%; background:var(--orange); color:white; padding:15px; border:none; font-family:'Bebas Neue',cursive; font-size:22px; letter-spacing:3px; cursor:pointer; }

  /* CONTACT + HOURS */
  .info-strip { background:var(--dark); padding:28px 20px; }
  .info-strip h3 { font-family:'Bebas Neue',cursive; font-size:28px; color:var(--white); letter-spacing:2px; margin-bottom:16px; }
  .info-item { display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.07); }
  .info-item:last-child { border-bottom:none; }
  .info-icon { font-size:20px; width:32px; text-align:center; }
  .info-label { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--lgray); }
  .info-val { font-family:'Bebas Neue',cursive; font-size:16px; color:var(--white); letter-spacing:1px; }
  .info-val a { color:var(--orange); text-decoration:none; }

  footer { background:var(--orange); padding:24px 20px; text-align:center; }
  footer p { font-size:11px; color:rgba(255,255,255,0.8); letter-spacing:1px; text-transform:uppercase; }
</style>
<template>
<header>
  <div>
    <div class="logo-txt">Authority</div>
    <div class="logo-sub">Window &amp; Repair</div>
  </div>
  <button class="menu">☰</button>
</header>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-bar"></div>
  <div class="hero-content">
    <div class="hero-label">Authority Window &amp; Repair</div>
    <h1>Maximize Your<br>Home's <span>Comfort</span></h1>
    <div class="hero-sub">Expert Window Solutions</div>
    <div class="hero-tech"><span>👷 Technician: Daniel Chapurin · 7 Yrs Exp</span></div>
    <div class="cta-row">
      <a class="btn-fill" href="tel:6304735256">📞 CALL 630-473-5256</a>
      <a class="btn-border" href="#estimate">Get Free Estimate</a>
    </div>
  </div>
</section>

<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years Exp</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs Done</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>

<section>
  <div class="tag">Our Services</div>
  <h2>What We Do</h2>
  <div class="svc-grid">
    <div class="svc-card"><div class="svc-icon">🔧</div><h3>Window Repair</h3><p>Glass, seals, hardware fixed same day.</p></div>
    <div class="svc-card"><div class="svc-icon">🪟</div><h3>Replacement</h3><p>All types, removal and disposal included.</p></div>
    <div class="svc-card"><div class="svc-icon">🚨</div><h3>Emergency</h3><p>Same-day urgent glass replacement.</p></div>
    <div class="svc-card"><div class="svc-icon">❄️</div><h3>Energy Upgrade</h3><p>Double-pane, low-E, weatherstripping.</p></div>
  </div>
</section>

<div class="cta-box">
  <div class="tag">Call Now</div>
  <h2>Same-Day Service Available</h2>
  <p>No hidden fees. Quality craftsmanship and customer satisfaction — guaranteed on every job.</p>
  <a class="cta-phone" href="tel:6304735256">630-473-5256</a>
  <a class="btn-orange-full" href="mailto:Authoritywindowrepair@gmail.com">EMAIL US</a>
</div>

<section class="reviews-section">
  <div class="tag">Reviews</div>
  <h2>What Clients Say</h2>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Daniel fixed my foggy window same day. Professional, fast, fair price. Will call again."</p><div class="r-author">Sarah M. — Aurora, IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Called at 8am after a break-in. Daniel was there by noon with new glass installed by evening."</p><div class="r-author">James T. — Naperville, IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Honest, on time, zero mess. He's my go-to window guy from now on."</p><div class="r-author">Linda K. — Wheaton, IL</div></div>
</section>

<div class="form-section" id="estimate">
  <div class="form-inner">
    <h3>Free Estimate</h3>
    <p class="sub">We respond within the hour, Monday–Saturday.</p>
    <div class="fgroup"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fgroup"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fgroup"><label>Service</label><select><option value="">Select service...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fgroup"><label>Notes</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-submit-full" onclick="alert('Sent! We\'ll contact you shortly.')">SUBMIT REQUEST</button>
  </div>
</div>

<div class="info-strip">
  <h3>Contact &amp; Hours</h3>
  <div class="info-item"><div class="info-icon">📞</div><div><div class="info-label">Phone</div><div class="info-val"><a href="tel:6304735256">630-473-5256</a></div></div></div>
  <div class="info-item"><div class="info-icon">✉️</div><div><div class="info-label">Email</div><div class="info-val"><a href="mailto:Authoritywindowrepair@gmail.com">Authoritywindowrepair@gmail.com</a></div></div></div>
  <div class="info-item"><div class="info-icon">🕐</div><div><div class="info-label">Mon–Fri</div><div class="info-val">7:00 AM – 6:00 PM</div></div></div>
  <div class="info-item"><div class="info-icon">🕐</div><div><div class="info-label">Saturday</div><div class="info-val">7:00 AM – 4:00 PM</div></div></div>
</div>

<footer><p>© 2025 Authority Window Repair · All Rights Reserved</p></footer>
</template>