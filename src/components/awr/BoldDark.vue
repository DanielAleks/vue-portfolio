<style >


  :root {
    --bg: #141414;
    --surface: #1E1E1E;
    --surface2: #282828;
    --orange: #E85D04;
    --orange-glow: rgba(232,93,4,0.15);
    --cream: #FAF0E6;
    --gray: #999;
    --white: #F0F0F0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Barlow', sans-serif;
    background: var(--bg);
    color: var(--white);
  }

  /* HEADER */
  header {
    background: var(--bg);
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid rgba(232,93,4,0.3);
    position: sticky; top: 0; z-index: 50;
  }
  /* HERO FULL */
  .hero {
    position: relative; min-height: 520px;
    width: 100%;
    display: flex; flex-direction: column; justify-content: flex-end;
    overflow: hidden;
  }
  .hero-img {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80') center top / cover;
    filter: brightness(0.35) saturate(0.7);
  }
  .hero-grad {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 30%, var(--bg) 100%);
  }
  .hero-content {
    position: relative; z-index: 2; padding: 0 24px 40px;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--orange); color: white;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 6px 14px;
    margin-bottom: 16px;
  }
  .hero h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 68px; font-weight: 900; text-transform: uppercase;
    line-height: 0.9; color: var(--white); margin-bottom: 4px;
  }
  .hero h1 em { color: var(--orange); font-style: normal; }
  .hero-sub {
    font-size: 13px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--gray); margin-bottom: 24px;
  }

  .hero-cta { display: flex; flex-direction: column; gap: 10px; }

  .btn-ghost {
    background: transparent; color: var(--white);
    padding: 14px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.2);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; text-decoration: none;
    display: flex; align-items: center; justify-content: center;
  }

  /* STATS */
  .stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    background: var(--surface);
    border-top: 2px solid var(--orange);
  }
  .stat { padding: 20px 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
  .stat:last-child { border-right: none; }
  .stat-n { font-family: 'Barlow Condensed', sans-serif; font-size: 32px; font-weight: 900; color: var(--orange); }
  .stat-l { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); margin-top: 2px; }

  .padding-15 {
    padding-left: 2rem; padding-right: 2rem;
  }

  @media (min-width: 768px) {
    .padding-15 { padding-left: 15%; padding-right: 15%; }
  }

  /* SECTIONS */
  .services-section { margin-top: 5rem; margin-bottom: 5rem; margin-left: 1rem; margin-right: 1rem}
  .section-tag {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--orange); font-weight: 600; margin-bottom: 6px;
    display: flex; align-items: center; gap: 8px;
  }
  .section-tag::before { content: ''; width: 20px; height: 2px; background: var(--orange); }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px; font-weight: 800; text-transform: uppercase;
    margin-bottom: 24px; line-height: 1.05;
  }

  /* SERVICE CARDS */
  .svc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .svc-card {
    background: var(--surface); padding: 1px;
    display: flex; align-items: center; gap: 16px;
    border-left: 3px solid transparent;
    transition: border-color 0.2s, background 0.2s;
    cursor: pointer;
  }
  .svc-card:active { border-left-color: var(--orange); background: var(--surface2); }
  .svc-card-icon {
    width: 30px; height: 30px; flex-shrink: 0;
    background: var(--orange-glow);
    border: 1px solid rgba(232,93,4,0.3);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .svc-card h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .svc-card p { font-size: 13px; color: var(--gray); line-height: 1.5; }
  .svc-arrow { margin-left: auto; color: var(--orange); font-size: 18px; }

  /* QUOTE SECTION */
  .quote-section {
    width: 100%;
    background: #151922;
    padding: 40px 24px; text-align: center;
  }
  .quote-section blockquote {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 700; color: white;
    line-height: 1.2; margin-bottom: 16px; font-style: italic;
  }
  .quote-section cite { font-size: 13px; color: rgba(255,255,255,0.8); letter-spacing: 1px; }


  /* EMERGENCY BANNER */
  .emergency {
    background: var(--surface2);
    border: 1px solid rgba(232,93,4,0.3);
    margin: 0 20px 0; border-radius: 12px;
    padding: 24px; text-align: center;
  }
  .emergency-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--orange); margin-bottom: 8px;
  }
  .emergency h3 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 800; text-transform: uppercase;
    color: var(--white); margin-bottom: 8px;
  }
  .emergency p { font-size: 13px; color: var(--gray); line-height: 1.5; margin-bottom: 20px; }
  .emergency-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px; font-weight: 900; color: var(--orange);
    text-decoration: none; display: block; margin-bottom: 16px;
  }
  .btn-orange-full {
    background: var(--orange); color: white;
    padding: 14px 28px; border: none; border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; text-decoration: none; display: inline-block;
    width: 100%;
  }

  /* FORM */
  .form-section { padding-top: 3rem; padding-bottom: 3rem; }
  .form-inner {
    background: var(--surface); border-radius: 12px; padding: 28px 20px;
    border: 1px solid rgba(232,93,4,0.15);
  }
  .form-inner h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; }
  .form-inner .sub { font-size: 13px; color: var(--gray); margin-bottom: 20px; }
  .btn-submit {
    width: 100%; background: var(--orange); color: white;
    padding: 15px; border: none; border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer; margin-top: 6px;
  }

  /* CONTACT GRID */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 20px 40px; }
  .c-item {
    background: var(--surface); border-radius: 10px; padding: 18px 14px;
    text-align: center; text-decoration: none; color: var(--white);
  }
  .c-item-icon { font-size: 24px; margin-bottom: 8px; }
  .c-item-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gray); margin-bottom: 4px; }
  .c-item-val { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; color: var(--orange); }

  footer {
    background: var(--surface); border-top: 2px solid var(--orange);
    padding: 28px 20px; text-align: center;
  }
  footer p { font-size: 12px; color: var(--gray); margin-bottom: 8px; }
  .footer-links { display: flex; justify-content: center; gap: 20px; }
  .footer-links a { color: var(--gray); text-decoration: none; font-size: 13px; }
  .footer-links a:hover { color: var(--orange); }


  /* NEWEST DANIEL ALEKSANDROV */

    :root {
    --o:#FF6B1A; --o2:#E84A00; --od:#C03800;
    --bg:#0B0E14; --surf:#13181F; --surf2:#1C2330;
    --cream:#FAF0E6; --cream2:#F0E4D4;
    --lgray:#8899AA; --white:#EEF2F7;
    --border:rgba(255,107,26,0.15);
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Raleway',sans-serif;background:var(--cream);color:#1A1208; margin:0 auto;overflow-x:hidden}
 
  /* ── HEADER ── */
  header{background:var(--bg);padding:15px 20px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100;border-bottom:1px solid var(--border);}
  .logo-a{font-family:'Exo 2',sans-serif;font-size:17px;font-weight:900;color:var(--white);letter-spacing:.5px;}
  .logo-a span{color:var(--o);}
  .logo-b{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--lgray);margin-top:-3px;}
  .menu{color:var(--white);background:none;border:none;font-size:22px;cursor:pointer;}
 
  /* ── HERO ── */
  .hero{position:relative;background:var(--bg);overflow:hidden;min-height:500px;display:flex;flex-direction:column;justify-content:flex-end;}
  .hero-photo{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')center/cover;opacity:.18;}
  .hero-fire{position:absolute;bottom:0;left:0;right:0;height:320px;background:linear-gradient(to top,rgba(232,74,0,.35) 0%,transparent 100%);}
  .hero-top-glow{position:absolute;top:-80px;left:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(255,107,26,.12),transparent 65%);}
  /* animated particles */
  .sparks{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
  .spark{position:absolute;width:2px;height:2px;background:var(--o);border-radius:50%;animation:rise linear infinite;opacity:0;}
  .spark:nth-child(1){left:15%;animation-duration:4s;animation-delay:0s;}
  .spark:nth-child(2){left:35%;animation-duration:5s;animation-delay:1s;}
  .spark:nth-child(3){left:55%;animation-duration:3.5s;animation-delay:0.5s;}
  .spark:nth-child(4){left:75%;animation-duration:4.5s;animation-delay:2s;}
  .spark:nth-child(5){left:90%;animation-duration:3s;animation-delay:1.5s;}
  @keyframes rise{0%{transform:translateY(500px);opacity:0;}20%{opacity:.8;}80%{opacity:.3;}100%{transform:translateY(-20px);opacity:0;}}
  .hero-inner{position:relative;z-index:4;padding:0 20px 44px;}
  .hero-sup{font-family:'Exo 2',sans-serif;font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--o);margin-bottom:10px;  margin-top: 3rem;}
  .hero h1{font-family:'Exo 2',sans-serif;font-size:58px;font-weight:900;color:var(--white);line-height:.9;margin-bottom:12px;letter-spacing:-1px;}
  .hero h1 span{color:var(--o);display:block;}
  .hero-sub{font-size:14px;color:var(--lgray);line-height:1.75;margin-bottom:20px;max-width:330px;}
  .hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,107,26,.1);border:1px solid rgba(255,107,26,.3);border-radius:8px;padding:8px 16px;margin-bottom:32px;}
  .hero-tag span{font-family:'Exo 2',sans-serif;font-size:11px;font-weight:700;color:var(--o);letter-spacing:.5px;}
  .hero-btns{display:flex;flex-direction:column;gap:10px;}
  .btn-fire{background:linear-gradient(135deg,var(--o2),var(--o));color:white;padding:16px;border:none;border-radius:12px;font-family:'Exo 2',sans-serif;font-size:17px;font-weight:800;letter-spacing:.5px;text-decoration:none;text-align:center;display:block;cursor:pointer;box-shadow:0 8px 32px rgba(232,74,0,.4);}
  .btn-ghost{background:rgba(255,255,255,.05);color:var(--white);padding:13px;border:1px solid rgba(255,255,255,.12);border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;text-align:center;display:block;}
 
  /* ── STATS ── */
  .stats{background:var(--o);display:flex;}
  .stat{flex:1;padding:16px 8px;text-align:center;border-right:1px solid rgba(255,255,255,.2);}
  .stat:last-child{border-right:none;}
  .stat-n{font-family:'Exo 2',sans-serif;font-size:28px;font-weight:900;color:white;}
  .stat-l{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.75);margin-top:2px;}
 
  /* ── SECTIONS ── */
  .sec-tag{font-family:'Exo 2',sans-serif;font-size:9px;font-weight:800;letter-spacing:4px;text-transform:uppercase;color:var(--o);margin-bottom:6px;}
  .sec-title{font-family:'Exo 2',sans-serif;font-size:30px;font-weight:900;margin-bottom:22px;line-height:1.05;letter-spacing:-.5px;}
 
  /* ── SERVICES ── */
  .svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .svc-card{background:white;border-radius:14px;padding:18px;border:1px solid #EDE0D0;transition:border-color .2s,box-shadow .2s;}
  .svc-card:hover{border-color:var(--o);box-shadow:0 4px 20px rgba(232,74,0,.1);}
  .svc-icon{font-size:28px;margin-bottom:10px;}
  .svc-card h4{font-family:'Exo 2',sans-serif;font-size:14px;font-weight:800;margin-bottom:4px;}
  .svc-card p{font-size:12px;color:#7A6A58;line-height:1.5;}
 
  /* ── BEFORE / AFTER SLIDER ── */
  .ba-section{background:var(--surf); padding-top: 5rem; padding-bottom: 5rem}
  .ba-section .sec-tag{color:var(--o);}
  .ba-section .sec-title{color:var(--white);}
  .ba-section .sec-title span{color:var(--o);}
  .ba-desc{font-size:14px;color:var(--lgray);line-height:1.7;margin-bottom:28px;}
  .slider-wrap{position:relative;border-radius:16px;overflow:hidden;border:2px solid rgba(255,107,26,.25);touch-action:none;user-select:none;cursor:ew-resize;}
  .slider-track{position:relative;height:260px;}
  .img-after{position:absolute;inset:0;background-position:center;background-size:cover;filter:brightness(.95);}
  .img-before{position:absolute;inset:0;background-position:center;background-size:cover;filter:brightness(.8) saturate(.5);}
  /* labels */
  .ba-label-before{position:absolute;top:12px;left:12px;background:rgba(0,0,0,.65);color:white;font-family:'Exo 2',sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:5px 12px;border-radius:6px;z-index:5;text-transform:uppercase;}
  .ba-label-after{position:absolute;top:12px;right:12px;background:var(--o);color:white;font-family:'Exo 2',sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:5px 12px;border-radius:6px;z-index:5;text-transform:uppercase;}
  /* divider line */
  .ba-divider{position:absolute;top:0;bottom:0;left:50%;width:3px;background:white;z-index:10;transform:translateX(-50%);transition:left .05s;}
  .ba-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;background:white;border-radius:50%;z-index:11;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.4);cursor:ew-resize;font-size:16px;border:3px solid var(--o);}
  .slider-wrap.dragging .ba-handle{cursor:grabbing;}
  .ba-hint{text-align:center;margin-top:12px;font-size:11px;color:var(--lgray);letter-spacing:1px;font-family:'Exo 2',sans-serif;font-weight:600;}
  /* cards below slider */
  .ba-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px;}
  .ba-card{background:var(--surf2);border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,.06);}
  .ba-card-label{font-family:'Exo 2',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;}
  .ba-card-label.before{color:#EF4444;}
  .ba-card-label.after{color:#22C55E;}
  .ba-card p{font-size:12px;color:var(--lgray);line-height:1.55;}
 
  /* ── CTA SECTION ── */
  .cta-section{background:linear-gradient(135deg,var(--o2) 0%,var(--o) 60%,#FF8C40 100%); padding-top: 3rem; padding-bottom: 3rem; text-align:center;position:relative;overflow:hidden;}
  .cta-section::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.08);}
  .cta-section::after{content:'';position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;border-radius:50%;background:rgba(0,0,0,.08);}
  .cta-eyebrow{font-family:'Exo 2',sans-serif;font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:10px;position:relative;z-index:2;}
  .cta-section h2{font-family:'Exo 2',sans-serif;font-size:34px;font-weight:900;color:white;line-height:1.05;margin-bottom:12px;position:relative;z-index:2;}
  .cta-section p{font-size:15px;color:rgba(255,255,255,.88);line-height:1.75;margin-bottom:28px;position:relative;z-index:2;}
  .cta-phone-big{font-family:'Exo 2',sans-serif;font-size:38px;font-weight:900;color:white;text-decoration:none;display:block;margin-bottom:8px;letter-spacing:1px;position:relative;z-index:2;text-shadow:0 2px 12px rgba(0,0,0,.2);}
  .cta-phone-label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:28px;position:relative;z-index:2;}
  .cta-btns{display:flex;flex-direction:column;gap:10px;position:relative;z-index:2;}
  .btn-wh{background:white;color:var(--o2);padding:15px;border:none;border-radius:12px;font-family:'Exo 2',sans-serif;font-size:17px;font-weight:800;cursor:pointer;text-decoration:none;display:block;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.2);}
  .btn-wh-outline{background:transparent;color:white;padding:13px;border:2px solid rgba(255,255,255,.4);border-radius:12px;font-family:'Raleway',sans-serif;font-size:14px;font-weight:600;text-decoration:none;display:block;text-align:center;}
  .cta-guarantees{display:flex;justify-content:center;gap:20px;margin-top:24px;flex-wrap:wrap;position:relative;z-index:2;}
  .cta-g{font-size:12px;color:rgba(255,255,255,.8);display:flex;align-items:center;gap:5px;font-weight:600;}
 
  /* ── FORM ── */
  .form-section{padding-top: 3rem; padding-bottom: 3rem; background:var(--bg);}
  .form-section .sec-tag{color:var(--o);}
  .form-section .sec-title{color:var(--white);}
  .form-inner{background:var(--surf);border-radius:16px;padding:28px 20px;border:1px solid var(--border);}
  .fg{margin-bottom:14px;}
  .fg label{display:block;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--lgray);font-weight:600;margin-bottom:6px;}
  .fg input,.fg select,.fg textarea{width:100%;background:white;border:1px solid rgba(255,255,255,.1);color:var(--white);padding:13px 14px;font-family:'Raleway',sans-serif;font-size:14px;outline:none;border-radius:10px;transition:border-color .2s;-webkit-appearance:none;}
  .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--o);}
  .fg select option{background:var(--bg);}
  .fg textarea{resize:none;height:90px;}
  .btn-sub{width:100%;background:linear-gradient(135deg,var(--o2),var(--o));color:white;padding:15px;border:none;border-radius:12px;font-family:'Exo 2',sans-serif;font-size:17px;font-weight:800;cursor:pointer;box-shadow:0 6px 24px rgba(232,74,0,.3);}
 
  /* ── HOURS ── */
  .hours-section{padding-top: 2rem; padding-bottom: 2rem; background:var(--bg);}
  .hours-box{background:var(--surf);border-radius:16px;padding:24px;border:1px solid rgba(255,255,255,.06);}
  .hours-box .sec-title{font-size:22px;color:var(--white);margin-bottom:16px;}
  .hr-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);}
  .hr-row:last-child{border-bottom:none;}
  .hr-d{font-size:14px;color:var(--lgray);}
  .hr-t{font-family:'Exo 2',sans-serif;font-size:14px;font-weight:700;color:var(--white);}
 
  footer{background:var(--surf);border-top:1px solid var(--border);padding:24px 20px;text-align:center;}
  footer p{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(238,242,247,.25);margin-bottom:10px;font-family:'Exo 2',sans-serif;}
  .fl{display:flex;justify-content:center;gap:20px;}
  .fl a{color:rgba(238,242,247,.3);text-decoration:none;font-size:12px;}
</style>
<template>

<div>
<header>
  <div>
    <div class="logo-a">AUTHORITY <span>WIN</span></div>
    <div class="logo-b">Window &amp; Repair</div>
  </div>
  <button class="menu">☰</button>
</header>
 
<!-- HERO -->
<section class="hero padding-15">
  <div class="hero-photo"></div>
  <div class="hero-fire"></div>
  <div class="hero-top-glow"></div>
  <div class="sparks">
    <div class="spark"></div><div class="spark"></div><div class="spark"></div>
    <div class="spark"></div><div class="spark"></div>
  </div>
  <div class="hero-inner">
    <div class="hero-sup">Authority Window &amp; Repair</div>
    <h1 style="line-height: 4rem">Window<br><span>Repair</span> Done Right</h1>
    <p class="hero-sub">Maximize your home's comfort with reliable, expert solutions for crystal-clear views.</p>
    <div class="hero-btns">
      <a class="btn-fire" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-ghost" href="#estimate">Get Free Estimate →</a>
    </div>
  </div>
</section>
 
<!-- STATS -->
<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years Exp</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs Done</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>
 
<!-- QUOTE -->
<div class="quote-section padding-15">
  <blockquote>"The job isn't done until the customer is completely satisfied — every time."</blockquote>
  <cite>Start with Authority Window &amp; Repair</cite>
</div>

<!-- SERVICES -->
<div class="services-section padding-15">
  <div class="sec-tag" style="margin-left: 1rem;">Services</div>
  <div class="sec-title" style="margin-left: 1rem;">What We Offer</div>
  <div class="svc-grid">
    <div class="svc-card">
      <div class="svc-card-icon">🔧</div>
      <div>
        <h4>Window Repair</h4>
        <p>Glass, seals, hardware — fixed same day.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
    <div class="svc-card">
      <div class="svc-card-icon">🪟</div>
      <div>
        <h4>Replacement</h4>
        <p>Full replacement, all window types.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
    <div class="svc-card">
      <div class="svc-card-icon">🚨</div>
      <div>
        <h4>Emergency Glass</h4>
        <p>Urgent same-day glass replacement.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
    <div class="svc-card">
      <div class="svc-card-icon">❄️</div>
      <div>
        <h4>Energy Upgrade</h4>
        <p>Double-pane, low-E, weatherstripping.</p>
      </div>
      <div class="svc-arrow">›</div>
    </div>
  </div>
</div>
 
<!-- BEFORE / AFTER -->
<div class="ba-section padding-15">
  <div class="sec-tag">Our Work</div>
  <div class="sec-title">Before &amp; <span>After</span></div>
  <p class="ba-desc">Drag the slider to see the difference our work makes. From foggy, damaged windows to crystal-clear results.</p>
  <div
    ref="sliderWrap"
    class="slider-wrap"
    :class="{ dragging: isDragging }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerLeave"
  >
    <div class="slider-track">
      <div class="img-after" :style="afterImageStyle"></div>
      <div class="img-before" :style="[beforeImageStyle, beforeClipStyle]"></div>
      <div class="ba-label-before">Before</div>
      <div class="ba-label-after">After</div>
      <div class="ba-divider" :style="sliderPositionStyle"></div>
      <div
        class="ba-handle"
        :style="sliderPositionStyle"
        tabindex="0"
        role="slider"
        aria-label="Before and after image slider"
        :aria-valuemin="0"
        :aria-valuemax="100"
        :aria-valuenow="Math.round(sliderPosition)"
        @keydown="onSliderKeyDown"
      >
        ⇔
      </div>
    </div>
    <p class="ba-hint">◂ DRAG TO COMPARE ▸</p>
  </div>
  <div class="ba-cards">
    <div class="ba-card">
      <div class="ba-card-label before">✕ Before</div>
      <p>Foggy seals, condensation between panes, drafts, faded frame, water damage</p>
    </div>
    <div class="ba-card">
      <div class="ba-card-label after">✓ After</div>
      <p>Crystal-clear glass, airtight seal, energy-efficient, restored frame, like new</p>
    </div>
  </div>
</div>
 
<!-- CTA -->
<div class="cta-section padding-15">
  <div class="cta-eyebrow">Get Started Today</div>
  <h2>Ready to Fix Your Windows?</h2>
  <p>Daniel personally handles every job. Call now for a free estimate — we respond within the hour, Monday through Saturday.</p>
  <a class="cta-phone-big" href="tel:6304735256">630-473-5256</a>
  <div class="cta-phone-label">Tap to Call Now</div>
  <div class="cta-btns">
    <a class="btn-wh" href="#estimate">Request Free Estimate</a>
    <a class="btn-wh-outline" href="mailto:Authoritywindowrepair@gmail.com">Send Email Instead</a>
  </div>
  <div class="cta-guarantees">
    <span class="cta-g">✓ No Hidden Fees</span>
    <span class="cta-g">✓ Same-Day Available</span>
    <span class="cta-g">✓ 100% Satisfaction</span>
  </div>
</div>
 
<!-- FORM -->
<div class="form-section padding-15" id="estimate">
  <div class="sec-tag">Free Estimate</div>
  <div class="sec-title">Get a Quote</div>
  <div class="form-inner">
    <div class="fg"><label>Your Name</label><input type="text" placeholder="John Smith"></div>
    <div class="fg"><label>Phone Number</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service Needed</label>
      <select style="color: darkslategrey" ><option value="">Select a service...</option><option>Window Repair</option><option>Window Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select>
    </div>
    <div class="fg"><label>Details</label><textarea placeholder="Number of windows, issue description, any urgency..."></textarea></div>
    <button class="btn-sub" onclick="alert('Request sent! Daniel will contact you shortly.')">Submit Request →</button>
  </div>
</div>
 
<!-- HOURS -->
 <div>
<div class="hours-section padding-15">
  <div class="hours-box">
    <div class="sec-title">Business Hours</div>
    <div class="hr-row"><span class="hr-d">Monday – Friday</span><span class="hr-t">7:00 AM – 6:00 PM</span></div>
    <div class="hr-row"><span class="hr-d">Saturday</span><span class="hr-t">7:00 AM – 4:00 PM</span></div>
    <div class="hr-row"><span class="hr-d">Sunday</span><span class="hr-t" style="color:#EF4444">Closed</span></div>
  </div>
</div>

<div class="hours-section padding-15  ">
  <div class="hours-box">
    <div class="sec-title">Contact Us</div>
      <div class="info-card">
        <div class="flex">
        <p style="padding-right: 20%" class="hr-d">Phone</p>
        <p style="color: white">630-473-5256</p>
        </div>
        <div class="flex">
        <p style="padding-right: 20%" class="hr-d">Email</p>
        <p style="color: white">Authoritywindowrepair@gmail.com</p>
        </div>
    </div>
  </div>
</div>
 </div>
 
<footer  class="padding-15">
  <p style="color: lightgrey">© 2026 Authority Window Repair · All Rights Reserved</p>
  <div class="fl" style="color: lightgrey"><a href="#" style="color: lightgrey">Home</a><a href="#" style="color: lightgrey">Services</a><a href="#" style="color: lightgrey">Contact</a></div>
</footer>
</div>

</template>

<script>
export default {
  name: 'BoldDark',
  props: {
    beforePhoto: {
      type: String,
      default: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80'
    },
    afterPhoto: {
      type: String,
      default: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    }
  },
  data() {
    return {
      sliderPosition: 50,
      isDragging: false
    }
  },
  computed: {
    beforeImageStyle() {
      return {
        backgroundImage: `url(${this.beforePhoto})`
      }
    },
    afterImageStyle() {
      return {
        backgroundImage: `url(${this.afterPhoto})`
      }
    },
    beforeClipStyle() {
      return {
        clipPath: `inset(0 ${100 - this.sliderPosition}% 0 0)`
      }
    },
    sliderPositionStyle() {
      return {
        left: `${this.sliderPosition}%`
      }
    }
  },
  methods: {
    updateSliderFromClientX(clientX) {
      const sliderEl = this.$refs.sliderWrap
      if (!sliderEl) {
        return
      }

      const { left, width } = sliderEl.getBoundingClientRect()
      if (!width) {
        return
      }

      const rawPercent = ((clientX - left) / width) * 100
      this.sliderPosition = Math.min(100, Math.max(0, rawPercent))
    },
    onPointerDown(event) {
      this.isDragging = true
      this.updateSliderFromClientX(event.clientX)

      const sliderEl = this.$refs.sliderWrap
      if (sliderEl && typeof sliderEl.setPointerCapture === 'function') {
        sliderEl.setPointerCapture(event.pointerId)
      }
    },
    onPointerMove(event) {
      if (!this.isDragging) {
        return
      }

      this.updateSliderFromClientX(event.clientX)
    },
    onPointerUp(event) {
      this.isDragging = false

      const sliderEl = this.$refs.sliderWrap
      if (
        sliderEl &&
        typeof sliderEl.releasePointerCapture === 'function' &&
        event.pointerId !== undefined
      ) {
        try {
          sliderEl.releasePointerCapture(event.pointerId)
        } catch {
          // No-op: release can throw if capture was already cleared.
        }
      }
    },
    onPointerLeave(event) {
      if (!this.isDragging) {
        return
      }

      this.onPointerUp(event)
    },
    onSliderKeyDown(event) {
      const step = event.shiftKey ? 10 : 5

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        this.sliderPosition = Math.max(0, this.sliderPosition - step)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        this.sliderPosition = Math.min(100, this.sliderPosition + step)
      } else if (event.key === 'Home') {
        event.preventDefault()
        this.sliderPosition = 0
      } else if (event.key === 'End') {
        event.preventDefault()
        this.sliderPosition = 100
      }
    }
  }
}
</script>