<style scoped>
  :root { --o:#E85D04; --o2:#FF7A1A; --bg:#0F0F0F; --bg2:#181818; --bg3:#222; --wh:#EFEFEF; --gray:#777; --cream:#FAF0E6; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'DM Mono',monospace; background:var(--cream); color:#1A1A1A; max-width:430px; margin:0 auto; overflow-x:hidden; }

  header { background:var(--bg); padding:16px 20px; display:flex; justify-content:space-between; align-items:center; }
  .hlogo { }
  .hlogo-a { font-family:'Anton',sans-serif; font-size:20px; letter-spacing:3px; color:var(--wh); }
  .hlogo-b { font-size:9px; letter-spacing:2px; color:var(--o); margin-top:-2px; }
  .hmenu { color:var(--wh); background:none; border:none; font-size:22px; cursor:pointer; }

  /* HERO — full bleed with big typographic treatment */
  .hero { position:relative; background:var(--bg); overflow:hidden; min-height:480px; display:flex; flex-direction:column; justify-content:flex-end; }
  .hero-photo { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80') center/cover; opacity:0.2; filter:grayscale(0.6); }
  /* orange gradient burst */
  .hero-burst { position:absolute; top:-100px; right:-100px; width:350px; height:350px; background:radial-gradient(circle, rgba(232,93,4,0.4) 0%, transparent 65%); }
  .hero-bottom-grad { position:absolute; bottom:0; left:0; right:0; height:240px; background:linear-gradient(to top, var(--bg), transparent); }
  /* ticker tape bar */
  .ticker-wrap { position:absolute; top:60px; left:0; right:0; overflow:hidden; background:var(--o); padding:8px 0; z-index:3; }
  .ticker { display:flex; gap:0; animation:ticker 14s linear infinite; white-space:nowrap; }
  @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  .ticker-item { font-family:'Anton',sans-serif; font-size:13px; letter-spacing:3px; color:white; padding:0 24px; }
  .ticker-dot { color:rgba(255,255,255,0.5); }
  .hero-inner { position:relative; z-index:4; padding:0 20px 36px; }
  .hero-mono { font-size:10px; letter-spacing:3px; color:var(--o); margin-bottom:10px; }
  .hero h1 { font-family:'Anton',sans-serif; font-size:70px; line-height:0.88; color:var(--wh); letter-spacing:1px; margin-bottom:12px; }
  .hero h1 em { color:var(--o); font-style:normal; display:block; }
  .hero-tag { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1px; color:rgba(239,239,239,0.5); margin-bottom:6px; }
  .hero-name-tag { display:inline-block; background:var(--bg3); border:1px solid var(--o); color:var(--o); font-size:11px; letter-spacing:1.5px; padding:6px 14px; margin-bottom:24px; }
  .hero-btns { display:flex; flex-direction:column; gap:8px; }
  .btn-o { background:var(--o); color:white; padding:16px; border:none; font-family:'Anton',sans-serif; font-size:22px; letter-spacing:3px; text-decoration:none; text-align:center; display:block; }
  .btn-w { background:transparent; color:var(--wh); padding:13px; border:1px solid rgba(239,239,239,0.2); font-family:'DM Mono',monospace; font-size:12px; letter-spacing:2px; text-decoration:none; text-align:center; display:block; }

  /* STAT BAR */
  .stats { background:var(--o); display:flex; }
  .stat { flex:1; padding:14px 8px; text-align:center; border-right:1px solid rgba(255,255,255,0.2); }
  .stat:last-child { border-right:none; }
  .stat-n { font-family:'Anton',sans-serif; font-size:30px; color:white; letter-spacing:1px; }
  .stat-l { font-size:8px; letter-spacing:2px; color:rgba(255,255,255,0.7); margin-top:2px; }

  /* BODY */
  .body { }
  .section { padding:36px 20px; }
  .sec-mono { font-size:10px; letter-spacing:3px; color:var(--o); margin-bottom:4px; }
  h2 { font-family:'Anton',sans-serif; font-size:40px; letter-spacing:1px; margin-bottom:20px; line-height:1; }

  /* SERVICES — mono list */
  .svc-list { display:flex; flex-direction:column; gap:0; }
  .svc-item { display:flex; gap:16px; align-items:center; padding:16px 0; border-bottom:1px solid #E5D8C8; }
  .svc-num { font-family:'Anton',sans-serif; font-size:32px; color:#E5D8C8; width:40px; flex-shrink:0; line-height:1; }
  .svc-info h4 { font-family:'Anton',sans-serif; font-size:18px; letter-spacing:1px; margin-bottom:4px; }
  .svc-info p { font-size:12px; color:#888; line-height:1.5; }

  /* DARK CTA */
  .dark-cta { background:var(--bg); padding:40px 20px; text-align:center; }
  .dark-cta h2 { color:var(--wh); }
  .dark-cta p { font-size:13px; color:var(--gray); line-height:1.7; margin-bottom:24px; }
  .d-phone { font-family:'Anton',sans-serif; font-size:44px; color:var(--o); text-decoration:none; display:block; margin-bottom:20px; letter-spacing:3px; }
  .btn-o-full { background:var(--o); color:white; padding:14px 32px; border:none; font-family:'Anton',sans-serif; font-size:18px; letter-spacing:2px; cursor:pointer; text-decoration:none; display:inline-block; }

  /* REVIEWS */
  .reviews { background:var(--bg2); padding:36px 20px; }
  .reviews h2 { color:var(--wh); }
  .review { border-left:2px solid var(--o); padding:16px 18px; margin-bottom:14px; }
  .r-stars { color:var(--o); font-size:13px; letter-spacing:2px; margin-bottom:8px; }
  .r-text { font-size:12px; color:var(--gray); line-height:1.65; margin-bottom:10px; }
  .r-auth { font-family:'Anton',sans-serif; font-size:14px; color:var(--wh); letter-spacing:1px; }

  /* FORM */
  .form-section { padding:36px 20px; }
  .form-inner { background:white; padding:24px 20px; border-top:3px solid var(--o); }
  .form-inner h3 { font-family:'Anton',sans-serif; font-size:28px; letter-spacing:2px; margin-bottom:4px; }
  .form-inner .sub { font-size:12px; color:#888; margin-bottom:18px; }
  .fg { margin-bottom:12px; }
  .fg label { display:block; font-size:9px; letter-spacing:2.5px; text-transform:uppercase; color:#888; margin-bottom:5px; }
  .fg input,.fg select,.fg textarea { width:100%; background:var(--cream); border:1px solid #DDD; color:#1A1A1A; padding:12px 14px; font-family:'DM Mono',monospace; font-size:13px; outline:none; transition:border-color 0.2s; -webkit-appearance:none; border-radius:0; }
  .fg input:focus,.fg select:focus,.fg textarea:focus { border-color:var(--o); }
  .fg textarea { resize:none; height:80px; }
  .btn-sub { width:100%; background:var(--o); color:white; padding:15px; border:none; font-family:'Anton',sans-serif; font-size:20px; letter-spacing:3px; cursor:pointer; }

  /* INFO */
  .info { background:var(--bg); padding:28px 20px; }
  .info h3 { font-family:'Anton',sans-serif; font-size:24px; color:var(--wh); letter-spacing:2px; margin-bottom:16px; }
  .info-row { display:flex; align-items:center; gap:14px; padding:12px 0; border-bottom:1px solid rgba(239,239,239,0.07); }
  .info-row:last-child { border-bottom:none; }
  .info-i { font-size:18px; width:30px; }
  .info-lbl { font-size:9px; letter-spacing:2px; color:var(--gray); }
  .info-v { font-family:'Anton',sans-serif; font-size:15px; color:var(--wh); letter-spacing:1px; }
  .info-v a { color:var(--o); text-decoration:none; }

  footer { background:var(--o); padding:22px 20px; text-align:center; }
  footer p { font-size:10px; letter-spacing:2px; color:rgba(255,255,255,0.8); }
</style>
<template>
<header>
  <div class="hlogo"><div class="hlogo-a">Authority</div><div class="hlogo-b">WINDOW &amp; REPAIR</div></div>
  <button class="hmenu">☰</button>
</header>

<section class="hero">
  <div class="hero-photo"></div>
  <div class="hero-burst"></div>
  <div class="hero-bottom-grad"></div>
  <div class="ticker-wrap">
    <div class="ticker">
      <span class="ticker-item">WINDOW REPAIR</span><span class="ticker-dot">·</span>
      <span class="ticker-item">INSTALLATION</span><span class="ticker-dot">·</span>
      <span class="ticker-item">REPLACEMENT</span><span class="ticker-dot">·</span>
      <span class="ticker-item">EMERGENCY GLASS</span><span class="ticker-dot">·</span>
      <span class="ticker-item">WINDOW REPAIR</span><span class="ticker-dot">·</span>
      <span class="ticker-item">INSTALLATION</span><span class="ticker-dot">·</span>
      <span class="ticker-item">REPLACEMENT</span><span class="ticker-dot">·</span>
      <span class="ticker-item">EMERGENCY GLASS</span><span class="ticker-dot">·</span>
    </div>
  </div>
  <div class="hero-inner">
    <div class="hero-mono">// AUTHORITY WINDOW &amp; REPAIR</div>
    <h1>Maximize<br>Your Home's<br><em>Comfort.</em></h1>
    <div class="hero-tag">EXPERT TECHNICIAN ON CALL</div>
    <div class="hero-name-tag">👷 Daniel Chapurin · 7 Yrs Exp · 4.9★</div>
    <div class="hero-btns">
      <a class="btn-o" href="tel:6304735256">CALL 630-473-5256</a>
      <a class="btn-w" href="#estimate">// GET FREE ESTIMATE</a>
    </div>
  </div>
</section>

<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">YRS EXP</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">JOBS</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">RATED</div></div>
</div>

<section class="section">
  <div class="sec-mono">// SERVICES</div>
  <h2>What We Do</h2>
  <div class="svc-list">
    <div class="svc-item"><div class="svc-num">01</div><div class="svc-info"><h4>Window Repair</h4><p>Glass, seals, hardware — fixed same day.</p></div></div>
    <div class="svc-item"><div class="svc-num">02</div><div class="svc-info"><h4>Replacement</h4><p>All types, full removal and disposal.</p></div></div>
    <div class="svc-item"><div class="svc-num">03</div><div class="svc-info"><h4>Emergency Glass</h4><p>Same-day urgent glass replacement.</p></div></div>
    <div class="svc-item"><div class="svc-num">04</div><div class="svc-info"><h4>Energy Upgrade</h4><p>Double-pane, low-E, weatherstripping.</p></div></div>
  </div>
</section>

<div class="dark-cta">
  <div class="sec-mono">// CONTACT</div>
  <h2>Same-Day Service Available</h2>
  <p>No hidden fees. Quality craftsmanship and satisfaction guaranteed on every job.</p>
  <a class="d-phone" href="tel:6304735256">630-473-5256</a>
  <a class="btn-o-full" href="mailto:Authoritywindowrepair@gmail.com">EMAIL US</a>
</div>

<div class="reviews">
  <div class="sec-mono" style="color:var(--o);">// REVIEWS</div>
  <h2>Client Feedback</h2>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Daniel came same day, fixed it fast. Professional, clean, fair priced. Will call again."</p><div class="r-auth">Sarah M. · Aurora IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Break-in at 8am. Daniel there by noon. New glass before evening. Real professional."</p><div class="r-auth">James T. · Naperville IL</div></div>
  <div class="review"><div class="r-stars">★★★★★</div><p class="r-text">"Honest, on time. Only person I'll ever call for windows."</p><div class="r-auth">Linda K. · Wheaton IL</div></div>
</div>

<div class="form-section" id="estimate">
  <div class="form-inner">
    <h3>Free Estimate</h3>
    <p class="sub">// Response within the hour, Mon–Sat</p>
    <div class="fg"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fg"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service</label><select><option value="">Select...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fg"><label>Notes</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-sub" onclick="alert('Sent! We\'ll be in touch.')">SUBMIT REQUEST</button>
  </div>
</div>

<div class="info">
  <h3>Contact &amp; Hours</h3>
  <div class="info-row"><div class="info-i">📞</div><div><div class="info-lbl">PHONE</div><div class="info-v"><a href="tel:6304735256">630-473-5256</a></div></div></div>
  <div class="info-row"><div class="info-i">✉️</div><div><div class="info-lbl">EMAIL</div><div class="info-v"><a href="mailto:Authoritywindowrepair@gmail.com">Authoritywindowrepair@gmail.com</a></div></div></div>
  <div class="info-row"><div class="info-i">🕐</div><div><div class="info-lbl">MON–FRI</div><div class="info-v">7:00 AM – 6:00 PM</div></div></div>
  <div class="info-row"><div class="info-i">🕐</div><div><div class="info-lbl">SAT</div><div class="info-v">7:00 AM – 4:00 PM</div></div></div>
</div>

<footer><p>© 2025 AUTHORITY WINDOW REPAIR · ALL RIGHTS RESERVED</p></footer>
</template>