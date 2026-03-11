<style scoped>
  :root { --cream:#FDF6ED; --cream2:#F4E9D8; --orange:#E8600A; --orange-lite:#FFF0E6; --text:#1D1209; --gray:#8A7060; --white:#FFFFFF; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Lora',Georgia,serif; background:var(--cream); color:var(--text); max-width:430px; margin:0 auto; overflow-x:hidden; }

  header { padding:18px 22px; background:var(--white); display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--cream2); position:sticky; top:0; z-index:50; }
  .logo { font-family:'Josefin Sans',sans-serif; }
  .logo-a { font-size:15px; font-weight:700; letter-spacing:3px; color:var(--text); text-transform:uppercase; }
  .logo-b { font-size:9px; letter-spacing:2px; color:var(--orange); text-transform:uppercase; font-weight:600; }
  .menu { background:none; border:none; font-size:22px; color:var(--text); cursor:pointer; }

  /* HERO */
  .hero { position:relative; overflow:hidden; border-radius:0 0 40px 40px; }
  .hero-img-wrap { height:340px; position:relative; overflow:hidden; }
  .hero-img-wrap img, .hero-img-bg { width:100%; height:100%; object-fit:cover; display:block; position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80') center/cover; filter:brightness(0.38); }
  .hero-img-overlay { position:absolute; inset:0; background:linear-gradient(180deg, rgba(29,18,9,0.2) 0%, rgba(29,18,9,0.75) 80%); }
  .hero-img-content { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:28px 24px; }
  .hero-eyebrow { font-family:'Josefin Sans',sans-serif; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:rgba(253,246,237,0.7); margin-bottom:10px; }
  .hero-img-content h1 { font-family:'Josefin Sans',sans-serif; font-size:38px; font-weight:700; color:var(--white); line-height:1.1; letter-spacing:1px; text-transform:uppercase; margin-bottom:6px; }
  .hero-img-content h1 span { color:#FFA366; }
  /* CARD that overlaps hero */
  .hero-card { position:relative; z-index:10; margin:-36px 16px 0; background:var(--white); border-radius:20px; padding:24px 20px; box-shadow:0 8px 40px rgba(29,18,9,0.12); }
  .tech-pill { display:inline-flex; align-items:center; gap:8px; background:var(--orange-lite); border:1px solid rgba(232,96,10,0.25); border-radius:100px; padding:7px 16px; margin-bottom:14px; }
  .tech-pill span { font-family:'Josefin Sans',sans-serif; font-size:11px; font-weight:700; letter-spacing:1.5px; color:var(--orange); text-transform:uppercase; }
  .hero-card p { font-size:14px; color:var(--gray); line-height:1.75; margin-bottom:20px; }
  .hero-card-btns { display:flex; flex-direction:column; gap:10px; }
  .btn-fill { background:var(--orange); color:white; padding:15px; border:none; border-radius:100px; font-family:'Josefin Sans',sans-serif; font-size:15px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; text-decoration:none; text-align:center; display:block; cursor:pointer; }
  .btn-ring { background:transparent; color:var(--text); padding:13px; border:1.5px solid var(--cream2); border-radius:100px; font-family:'Josefin Sans',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; text-transform:uppercase; text-decoration:none; text-align:center; display:block; }

  /* STATS */
  .stats-row { display:flex; padding:28px 20px; gap:0; margin-top:24px; }
  .stat-item { flex:1; text-align:center; border-right:1px solid var(--cream2); }
  .stat-item:last-child { border-right:none; }
  .stat-n { font-family:'Josefin Sans',sans-serif; font-size:28px; font-weight:700; color:var(--orange); }
  .stat-l { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--gray); margin-top:3px; }

  /* SERVICES */
  .svcs-section { padding:8px 20px 36px; }
  .sec-tag { font-family:'Josefin Sans',sans-serif; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--orange); font-weight:700; margin-bottom:6px; }
  .sec-title { font-family:'Josefin Sans',sans-serif; font-size:26px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:20px; }
  .svc-cards { display:flex; flex-direction:column; gap:12px; }
  .svc-card { background:var(--white); border-radius:16px; padding:18px 20px; display:flex; align-items:center; gap:16px; border:1px solid var(--cream2); }
  .svc-icon { width:48px; height:48px; background:var(--orange-lite); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
  .svc-card h4 { font-family:'Josefin Sans',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:3px; }
  .svc-card p { font-size:12px; color:var(--gray); line-height:1.5; font-style:italic; }

  /* CALLOUT */
  .callout { background:var(--orange); margin:0 16px; border-radius:24px; padding:32px 24px; text-align:center; }
  .callout h2 { font-family:'Josefin Sans',sans-serif; font-size:28px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:white; margin-bottom:10px; }
  .callout p { font-size:13px; color:rgba(255,255,255,0.85); line-height:1.7; margin-bottom:20px; font-style:italic; }
  .callout-phone { font-family:'Josefin Sans',sans-serif; font-size:30px; font-weight:700; color:white; text-decoration:none; display:block; margin-bottom:16px; letter-spacing:2px; }
  .btn-wh { background:white; color:var(--orange); padding:13px 28px; border:none; border-radius:100px; font-family:'Josefin Sans',sans-serif; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; cursor:pointer; text-decoration:none; display:inline-block; }

  /* REVIEWS */
  .reviews-sec { padding:40px 20px; }
  .review-item { background:var(--white); border-radius:16px; padding:20px; margin-bottom:14px; border:1px solid var(--cream2); position:relative; }
  .review-item::before { content:'"'; font-family:'Lora',serif; font-size:64px; color:var(--orange); opacity:0.15; position:absolute; top:0px; left:14px; line-height:1; }
  .r-stars { color:var(--orange); font-size:13px; letter-spacing:2px; margin-bottom:10px; }
  .r-text { font-size:14px; color:var(--gray); line-height:1.7; margin-bottom:12px; font-style:italic; }
  .r-auth { font-family:'Josefin Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; }

  /* FORM */
  .form-sec { padding:8px 20px 40px; }
  .form-box { background:var(--white); border-radius:20px; padding:28px 20px; border:1px solid var(--cream2); }
  .form-box h3 { font-family:'Josefin Sans',sans-serif; font-size:22px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
  .form-box .sub { font-size:13px; color:var(--gray); margin-bottom:20px; font-style:italic; }
  .fg { margin-bottom:14px; }
  .fg label { display:block; font-family:'Josefin Sans',sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--gray); font-weight:700; margin-bottom:6px; }
  .fg input,.fg select,.fg textarea { width:100%; background:var(--cream); border:1.5px solid var(--cream2); color:var(--text); padding:13px 14px; font-family:'Lora',serif; font-size:14px; outline:none; border-radius:12px; transition:border-color 0.2s; -webkit-appearance:none; }
  .fg input:focus,.fg select:focus,.fg textarea:focus { border-color:var(--orange); }
  .fg textarea { resize:none; height:90px; }
  .btn-sub { width:100%; background:var(--orange); color:white; padding:15px; border:none; border-radius:100px; font-family:'Josefin Sans',sans-serif; font-size:15px; font-weight:700; letter-spacing:2px; text-transform:uppercase; cursor:pointer; }

  /* HOURS */
  .hours-sec { padding:0 20px 40px; }
  .hours-box { background:var(--cream2); border-radius:20px; padding:24px 20px; }
  .hours-box .sec-title { margin-bottom:16px; }
  .hr-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(139,112,96,0.15); }
  .hr-row:last-child { border-bottom:none; }
  .hr-day { font-size:14px; color:var(--gray); font-style:italic; }
  .hr-time { font-family:'Josefin Sans',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.5px; }

  /* CONTACT */
  .contact-sec { padding:0 20px 40px; display:flex; flex-direction:column; gap:12px; }
  .contact-link { background:var(--white); border-radius:14px; padding:16px 18px; display:flex; align-items:center; gap:14px; text-decoration:none; color:var(--text); border:1px solid var(--cream2); }
  .c-icon { width:40px; height:40px; background:var(--orange-lite); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .c-lbl { font-family:'Josefin Sans',sans-serif; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:var(--gray); }
  .c-val { font-family:'Josefin Sans',sans-serif; font-size:14px; font-weight:700; }

  footer { background:var(--text); padding:28px 20px; text-align:center; border-radius:24px 24px 0 0; }
  footer p { font-size:11px; color:rgba(253,246,237,0.4); letter-spacing:1px; margin-bottom:12px; font-family:'Josefin Sans',sans-serif; text-transform:uppercase; }
  .fl { display:flex; justify-content:center; gap:20px; }
  .fl a { color:rgba(253,246,237,0.5); text-decoration:none; font-family:'Josefin Sans',sans-serif; font-size:12px; letter-spacing:1px; text-transform:uppercase; }
</style>
<template>
<header>
  <div class="logo"><div class="logo-a">Authority</div><div class="logo-b">Window &amp; Repair</div></div>
  <button class="menu">☰</button>
</header>

<div class="hero">
  <div class="hero-img-wrap">
    <div class="hero-img-bg"></div>
    <div class="hero-img-overlay"></div>
    <div class="hero-img-content">
      <div class="hero-eyebrow">Authority Window &amp; Repair Services</div>
      <h1>Expert Window<br>Repair &amp; <span>Install</span></h1>
    </div>
  </div>
  <div class="hero-card">
    <div class="tech-pill"><span>👷 Technician · Daniel Chapurin · 7 Yrs Exp</span></div>
    <p>Reliable, expert solutions for crystal-clear views. Quality craftsmanship and customer satisfaction — guaranteed on every job.</p>
    <div class="hero-card-btns">
      <a class="btn-fill" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-ring" href="#estimate">Get Free Estimate</a>
    </div>
  </div>
</div>

<div class="stats-row">
  <div class="stat-item"><div class="stat-n">7+</div><div class="stat-l">Years</div></div>
  <div class="stat-item"><div class="stat-n">850+</div><div class="stat-l">Jobs</div></div>
  <div class="stat-item"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>

<div class="svcs-section">
  <div class="sec-tag">Services</div>
  <div class="sec-title">What We Offer</div>
  <div class="svc-cards">
    <div class="svc-card"><div class="svc-icon">🔧</div><div><h4>Window Repair</h4><p>Glass, seals, hardware — fixed same day.</p></div></div>
    <div class="svc-card"><div class="svc-icon">🪟</div><div><h4>Full Replacement</h4><p>All types, full removal and disposal.</p></div></div>
    <div class="svc-card"><div class="svc-icon">🚨</div><div><h4>Emergency Glass</h4><p>Same-day urgent service available.</p></div></div>
    <div class="svc-card"><div class="svc-icon">❄️</div><div><h4>Energy Upgrade</h4><p>Double-pane, low-E, weatherstripping.</p></div></div>
  </div>
</div>

<div class="callout">
  <h2>Ready to Get Started?</h2>
  <p>No hidden fees. Same-day service available. Your satisfaction is guaranteed.</p>
  <a class="callout-phone" href="tel:6304735256">630-473-5256</a>
  <a class="btn-wh" href="mailto:Authoritywindowrepair@gmail.com">Email Us</a>
</div>

<div class="reviews-sec">
  <div class="sec-tag">Reviews</div>
  <div class="sec-title">What Clients Say</div>
  <div class="review-item"><div class="r-stars">★★★★★</div><p class="r-text">"Daniel came same day, fixed my foggy window perfectly. Professional, fast, fair price."</p><div class="r-auth">— Sarah M., Aurora IL</div></div>
  <div class="review-item"><div class="r-stars">★★★★★</div><p class="r-text">"After a break-in he was there by noon. New glass installed before evening. Lifesaver."</p><div class="r-auth">— James T., Naperville IL</div></div>
</div>

<div class="form-sec" id="estimate">
  <div class="form-box">
    <h3>Free Estimate</h3>
    <p class="sub">We respond within the hour, every time.</p>
    <div class="fg"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fg"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service</label><select><option value="">Select service...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fg"><label>Details</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-sub" onclick="alert('Thank you! We\'ll reach out shortly.')">Send Request →</button>
  </div>
</div>

<div class="hours-sec">
  <div class="hours-box">
    <div class="sec-tag">Availability</div>
    <div class="sec-title">Business Hours</div>
    <div class="hr-row"><span class="hr-day">Monday – Friday</span><span class="hr-time">7:00 AM – 6:00 PM</span></div>
    <div class="hr-row"><span class="hr-day">Saturday</span><span class="hr-time">7:00 AM – 4:00 PM</span></div>
    <div class="hr-row"><span class="hr-day">Sunday</span><span class="hr-time" style="color:#EF4444">Closed</span></div>
  </div>
</div>

<div class="contact-sec">
  <a class="contact-link" href="tel:6304735256"><div class="c-icon">📞</div><div><div class="c-lbl">Call Us</div><div class="c-val">630-473-5256</div></div></a>
  <a class="contact-link" href="mailto:Authoritywindowrepair@gmail.com"><div class="c-icon">✉️</div><div><div class="c-lbl">Email</div><div class="c-val">Authoritywindowrepair@gmail.com</div></div></a>
</div>

<footer>
  <p>© 2025 Authority Window Repair</p>
  <div class="fl"><a href="#">Home</a><a href="#">Services</a><a href="#">Contact</a></div>
</footer>
</template>