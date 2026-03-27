<style scoped>
:root {
  --cream: #faf0e6;
  --cream-dark: #f0e4d4;
  --orange: #e85d04;
  --orange-light: #ff7a2b;
  --orange-pale: #fff0e8;
  --brown: #2a1a0e;
  --gray: #6b5c52;
  --white: #ffffff;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Nunito Sans", sans-serif;
  background: var(--cream);
  color: var(--brown);
  max-width: 430px;
  margin: 0 auto;
  overflow-x: hidden;
}

/* HEADER */
header {
  background: var(--cream);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(232, 93, 4, 0.15);
  position: sticky;
  top: 0;
  z-index: 50;
}
.logo-wrap {
  display: flex;
  flex-direction: column;
}
.logo-top {
  font-family: "Nunito", sans-serif;
  font-weight: 900;
  font-size: 16px;
  letter-spacing: 2px;
  color: var(--orange);
  text-transform: uppercase;
}
.logo-bot {
  background: var(--orange);
  color: white;
  font-size: 10px;
  letter-spacing: 1.5px;
  padding: 2px 6px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 2px;
  border-radius: 2px;
}
.hamburger {
  font-size: 24px;
  color: var(--brown);
  background: none;
  border: none;
  cursor: pointer;
}

/* HERO */
.hero {
  background: var(--brown);
  position: relative;
  text-align: center;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 100%,
    rgba(232, 93, 4, 0.25) 0%,
    transparent 65%
  );
}
.hero-badge {
  display: inline-block;
  background: var(--orange);
  color: white;
  font-family: "Nunito", sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 100px;
  margin-bottom: 24px;
  position: relative;
}
.hero-photo-wrap {
  position: relative;
  display: inline-block;
  margin-bottom: 28px;
}
.hero-photo-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3px solid var(--orange);
  padding: 4px;
  display: inline-block;
}
.hero-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--cream-dark);
  display: block;
  overflow: hidden;
}
.hero-photo-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #3d2b1a, #5a3e2a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
}
.exp-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: var(--orange);
  color: white;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--brown);
  font-family: "Nunito", sans-serif;
}
.exp-dot-num {
  font-size: 15px;
  font-weight: 900;
  line-height: 1;
}
.exp-dot-txt {
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1.2;
  text-align: center;
}
.hero h1 {
  font-family: "Nunito", sans-serif;
  font-size: 38px;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 6px;
  position: relative;
}
.hero h1 span {
  color: var(--orange-light);
}
.hero-role {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 24px;
  position: relative;
}
.hero-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 32px;
  position: relative;
}
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}
.btn-main {
  background: var(--orange);
  color: white;
  padding: 16px 24px;
  border-radius: 100px;
  border: none;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.2s,
    background 0.2s;
}
.btn-main:active {
  transform: scale(0.97);
  background: #c44d03;
}
.btn-outline {
  background: transparent;
  color: white;
  padding: 14px 24px;
  border-radius: 100px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* STATS ROW */
.stats {
  display: flex;
  background: var(--orange);
}
.stat {
  flex: 1;
  padding: 18px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}
.stat:last-child {
  border-right: none;
}
.stat-n {
  font-family: "Nunito", sans-serif;
  font-size: 26px;
  font-weight: 900;
  color: white;
  line-height: 1;
}
.stat-l {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* SECTION */
.section {
  padding: 40px 20px;
}
.section-tag {
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--orange);
  font-weight: 700;
  margin-bottom: 8px;
}
.section-title {
  font-family: "Nunito", sans-serif;
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 24px;
  line-height: 1.15;
}

/* SPECIALTIES */
.spec-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.spec-item {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  box-shadow: 0 2px 12px rgba(42, 26, 14, 0.06);
}
.spec-icon-wrap {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: var(--orange-pale);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.spec-item h3 {
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 4px;
}
.spec-item p {
  font-size: 13px;
  color: var(--gray);
  line-height: 1.5;
}

  /* REVIEWS */
  .reviews { display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.05); }
  .review {
    background: var(--surface); padding: 24px 20px;
  }
  .r-stars { color: var(--orange); font-size: 13px; letter-spacing: 2px; margin-bottom: 10px; }
  .r-text { font-size: 14px; color: var(--gray); line-height: 1.6; margin-bottom: 12px; }
  .r-author { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }


/* CTA BLOCK */
.cta-block {
  background: var(--orange);
  margin: 0 20px 40px;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
}
.cta-block h2 {
  font-family: "Nunito", sans-serif;
  font-size: 26px;
  font-weight: 900;
  color: white;
  margin-bottom: 8px;
}
.cta-block p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}
.cta-phone {
  font-family: "Nunito", sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
  letter-spacing: 1px;
}
.btn-white {
  background: white;
  color: var(--orange);
  padding: 14px 32px;
  border-radius: 100px;
  border: none;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  display: inline-block;
}

/* FORM */
.form-wrap {
  background: white;
  border-radius: 20px;
  padding: 28px 20px;
  margin: 0 20px 40px;
  box-shadow: 0 4px 20px rgba(42, 26, 14, 0.08);
}
.form-wrap h3 {
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 4px;
}
.form-wrap .sub {
  font-size: 13px;
  color: var(--gray);
  margin-bottom: 20px;
}
.fgroup {
  margin-bottom: 14px;
}
.fgroup label {
  display: block;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gray);
  font-weight: 700;
  margin-bottom: 6px;
}
.fgroup input,
.fgroup select,
.fgroup textarea {
  width: 100%;
  background: var(--cream);
  border: 1.5px solid rgba(232, 93, 4, 0.15);
  color: var(--brown);
  padding: 13px 14px;
  font-family: "Nunito Sans", sans-serif;
  font-size: 15px;
  outline: none;
  border-radius: 10px;
  transition: border-color 0.2s;
  -webkit-appearance: none;
}
.fgroup input:focus,
.fgroup select:focus,
.fgroup textarea:focus {
  border-color: var(--orange);
}
.fgroup textarea {
  resize: none;
  height: 100px;
}
.btn-form {
  width: 100%;
  background: var(--orange);
  color: white;
  padding: 15px;
  border: none;
  border-radius: 100px;
  font-family: "Nunito", sans-serif;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s;
}
.btn-form:active {
  background: #c44d03;
}



/* FOOTER */
footer {
  background: var(--orange);
  padding: 28px 20px;
  text-align: center;
}
footer p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  margin-bottom: 12px;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.footer-links a {
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
}
.footer-copy {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-top: 16px;
}



/* DANIEL ALEKSANDROV NEEWWEST OINES */
 
  header{background:var(--white);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;box-shadow:0 1px 8px rgba(24,17,10,.06);}
  .logo-wrap{display:flex;align-items:center;gap:10px;}
  .logo-badge{background:var(--o);width:34px;height:34px;border-radius:6px;display:flex;align-items:center;justify-content:center;}
  .logo-badge span{font-family:'Montserrat',sans-serif;font-weight:900;font-size:15px;color:white;}
  .logo-name{font-family:'Montserrat',sans-serif;font-weight:800;font-size:13px;}
  .logo-sub{font-size:9px;letter-spacing:1.5px;color:var(--lgray);text-transform:uppercase;font-family:'Montserrat',sans-serif;font-weight:500;}
  .menu{background:none;border:none;font-size:22px;color:var(--dark);cursor:pointer;}
 
  /* HERO */
  .hero{position:relative;overflow:hidden;}
  .hero-img{height:75vh;position:relative; width: 100%}
  .hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')center/cover;filter:brightness(.28) saturate(.8);}
  .hero-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(24,17,10,.4) 0%,rgba(24,17,10,.92) 100%);}
  .hero-text{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-start;padding:24px; margin-top: 2rem}
  .hero-pre{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(250,240,230,.6);margin-bottom:8px;font-weight:600;}
  .hero h1{font-family:'Montserrat',sans-serif;font-size:34px;font-weight:900;color:var(--white);line-height:1.1;margin-bottom:6px;}
  .hero h1 mark{background:none;color:var(--o);}
  /* OVERLAP CARD */
  .overlap-card{position:relative;z-index:5;margin:-40vh 16px 3rem;background:var(--white);border-radius:18px;padding:24px 20px;box-shadow:0 14px 48px rgba(24,17,10,.14);border-top:3px solid var(--o);}
  .tech-row{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--cream2);}
  .tech-dot{width:10px;height:10px;background:var(--o);border-radius:50%;flex-shrink:0;}
  .tech-name{font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;}
  .tech-role{font-size:11px;color:var(--lgray);font-style:italic;}
  .tech-badge{margin-left:auto;background:var(--opale);border-radius:6px;padding:4px 10px;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;color:var(--o);}
  .overlap-card p{font-size:13px;color:var(--mid);line-height:1.78;margin-bottom:18px;font-weight:300;}
  .oc-btns{display:flex;flex-direction:column;gap:8px;}
  .btn-main{background:var(--o);color:white;padding:14px;border:none;border-radius:10px;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;text-decoration:none;text-align:center;display:block;cursor:pointer;}
  .btn-sec{background:var(--cream);color:var(--dark);padding:12px;border:none;border-radius:10px;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:600;text-decoration:none;text-align:center;display:block;}
 
  /* STATS */
  .stats{display:flex;padding:24px 20px;border-bottom:1px solid var(--border);border-top:1px solid var(--border);margin-top:24px;}
  .stat{flex:1;text-align:center;border-right:1px solid var(--border);}
  .stat:last-child{border-right:none;}
  .stat-n{font-family:'Montserrat',sans-serif;font-size:26px;font-weight:900;color:var(--o);}
  .stat-l{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--lgray);margin-top:2px;font-family:'Montserrat',sans-serif;font-weight:500;}
 
  /* SECTIONS */
  .section{padding:36px 20px;border-bottom:1px solid var(--border);}
  .sec-tag{font-family:'Montserrat',sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--o);margin-bottom:6px;}
  .sec-title{font-family:'Montserrat',sans-serif;font-size:24px;font-weight:900;margin-bottom:20px;line-height:1.15;}
 
  /* SERVICES */
  .svc-items{display:flex;flex-direction:column;gap:12px;}
  .svc-card{display:flex;gap:14px;align-items:flex-start;padding:16px;background:var(--cream);border-radius:12px;}
  .svc-ico{width:44px;height:44px;background:var(--opale);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;border:1px solid rgba(232,93,4,.15);}
  .svc-card h4{font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;margin-bottom:3px;}
  .svc-card p{font-size:12px;color:var(--mid);line-height:1.5;font-style:italic;font-weight:300;}
 
  /* BEFORE / AFTER */
  .ba-section{padding:36px 20px;background:var(--cream);border-bottom:1px solid var(--border);}
  .slider-wrap{position:relative;overflow:hidden;border-radius:14px;border:2px solid var(--border);touch-action:none;user-select:none;box-shadow:0 6px 24px rgba(24,17,10,.1);}
  .slider-track{position:relative;height:240px;}
  .img-after{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80')center/cover;filter:brightness(.95);}
  .img-before{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80')center/cover;filter:brightness(.75) saturate(.4);clip-path:inset(0 50% 0 0);}
  .ba-lbl{position:absolute;top:12px;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;padding:5px 12px;border-radius:6px;z-index:5;text-transform:uppercase;}
  .ba-lbl.before{left:12px;background:rgba(0,0,0,.6);color:#DDD;}
  .ba-lbl.after{right:12px;background:var(--o);color:white;}
  .ba-line{position:absolute;top:0;bottom:0;left:50%;width:2px;background:white;z-index:10;transform:translateX(-50%);box-shadow:0 0 8px rgba(0,0,0,.3);}
  .ba-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:white;border-radius:50%;z-index:11;display:flex;align-items:center;justify-content:center;cursor:ew-resize;font-size:14px;box-shadow:0 4px 16px rgba(0,0,0,.3);border:2.5px solid var(--o);}
  .ba-hint{text-align:center;margin-top:10px;font-size:11px;color:var(--lgray);font-family:'Montserrat',sans-serif;font-weight:500;letter-spacing:.5px;}
  /* before/after detail cards */
  .ba-detail{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:18px;}
  .ba-d{background:white;border-radius:10px;padding:14px;border:1px solid var(--border);}
  .ba-d-lbl{font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}
  .ba-d-lbl.bad{color:#EF4444;}
  .ba-d-lbl.good{color:#22C55E;}
  .ba-d p{font-size:12px;color:var(--mid);line-height:1.55;font-style:italic;font-weight:300;}
 
  /* CTA */
  .cta-section{background:var(--o);padding:44px 20px;text-align:center;position:relative;overflow:hidden;}
  .cta-section::before{content:'';position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:rgba(255,255,255,.07);border-radius:50%;}
  .cta-section::after{content:'';position:absolute;bottom:-60px;left:-60px;width:200px;height:200px;background:rgba(0,0,0,.06);border-radius:50%;}
  .cta-pre{font-family:'Montserrat',sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:10px;position:relative;z-index:2;}
  .cta-section h2{font-family:'Montserrat',sans-serif;font-size:30px;font-weight:900;color:white;line-height:1.1;margin-bottom:12px;position:relative;z-index:2;}
  .cta-section p{font-size:14px;color:rgba(255,255,255,.88);line-height:1.78;margin-bottom:24px;font-weight:300;position:relative;z-index:2;}
  .cta-num{font-family:'Montserrat',sans-serif;font-size:36px;font-weight:900;color:white;text-decoration:none;display:block;margin-bottom:6px;position:relative;z-index:2;}
  .cta-num-lbl{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:28px;position:relative;z-index:2;font-family:'Montserrat',sans-serif;}
  .cta-btns{display:flex;flex-direction:column;gap:10px;position:relative;z-index:2;}
  .btn-white-main{background:white;color:var(--od);padding:15px;border:none;border-radius:10px;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;cursor:pointer;text-decoration:none;display:block;text-align:center;box-shadow:0 6px 24px rgba(0,0,0,.15);}
  .btn-white-outline{background:transparent;color:white;padding:12px;border:2px solid rgba(255,255,255,.4);border-radius:10px;font-family:'Merriweather',serif;font-size:13px;text-decoration:none;display:block;text-align:center;font-style:italic;}
  .cta-promises{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:22px;position:relative;z-index:2;}
  .cta-promise{font-family:'Montserrat',sans-serif;font-size:11px;font-weight:600;color:rgba(255,255,255,.85);display:flex;align-items:center;gap:4px;}
 
  /* FORM */
  .form-section{padding:36px 20px;border-top:1px solid var(--border);}
  .form-inner{background:var(--cream);border-radius:16px;padding:26px 20px;border:1px solid var(--border);}
  .fg{margin-bottom:13px;}
  .fg label{display:block;font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--lgray);font-weight:600;margin-bottom:5px;}
  .fg input,.fg select,.fg textarea{width:100%;background:var(--white);border:1.5px solid var(--border);color:var(--dark);padding:12px 14px;font-family:'Merriweather',serif;font-size:13px;outline:none;border-radius:8px;transition:border-color .2s;-webkit-appearance:none;}
  .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--o);}
  .fg textarea{resize:none;height:80px;}
  .btn-sub{width:100%;background:var(--o);color:white;padding:14px;border:none;border-radius:10px;font-family:'Montserrat',sans-serif;font-size:14px;font-weight:700;cursor:pointer;}
 
  /* INFO CARDS */
  .info-section{padding:0 20px 40px;display:flex;flex-direction:column;gap:14px;}
  .info-card{background:var(--cream);border-radius:12px;padding:18px;border:1px solid var(--border);}
  .info-card-t{font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--o);margin-bottom:12px;}
  .hr-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);}
  .hr-row:last-child{border-bottom:none;}
  .hr-d{font-size:13px;color:var(--mid);font-weight:300;font-style:italic;}
  .hr-t{font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;}
  .c-link{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);text-decoration:none;color:var(--dark);}
  .c-link:last-child{border-bottom:none;}
  .c-ico{width:36px;height:36px;background:var(--opale);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
  .c-lbl{font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--lgray);font-weight:600;}
  .c-val{font-family:'Montserrat',sans-serif;font-size:13px;font-weight:700;}
 
  footer{background:var(--dark);padding:24px 20px;text-align:center;}
  footer p{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(250,240,230,.3);font-family:'Montserrat',sans-serif;margin-bottom:10px;}
  .fl{display:flex;justify-content:center;gap:20px;}
  .fl a{color:rgba(250,240,230,.35);text-decoration:none;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-family:'Montserrat',sans-serif;}
</style>

<template>
 <header>
  <div class="logo-wrap">
    <div class="logo-badge"><span>A</span></div>
    <div><div class="logo-name">Authority</div><div class="logo-sub">Window Repair</div></div>
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
      <div class="tech-dot"></div>
      <div><div class="tech-name">Daniel Chapurin</div><div class="tech-role">Senior Window Technician</div></div>
      <div class="tech-badge">7 Yrs Exp</div>
    </div>
    <p>Maximize your home's comfort with reliable, expert solutions for crystal-clear views. Quality craftsmanship and customer satisfaction guaranteed on every job.</p>
    <div class="oc-btns">
      <a class="btn-main" href="tel:6304735256">📞 Call 630-473-5256</a>
      <a class="btn-sec" href="#estimate">Get Free Estimate →</a>
    </div>
  </div>
</section>
 
<div class="stats">
  <div class="stat"><div class="stat-n">7+</div><div class="stat-l">Years</div></div>
  <div class="stat"><div class="stat-n">850+</div><div class="stat-l">Jobs Done</div></div>
  <div class="stat"><div class="stat-n">4.9★</div><div class="stat-l">Rated</div></div>
</div>
 
  <!-- ABOUT -->
  <section class="section">
    <div class="section-tag">About Daniel</div>
    <div class="section-title">Your Trusted Window Expert</div>
    <p style="color: var(--gray); font-size: 15px; line-height: 1.75">
      Daniel Chapurin has spent 7 years mastering every aspect of window repair
      and installation. From emergency glass replacement to energy-efficient
      upgrades, he handles it all with care and skill. Hundreds of homeowners
      across the area trust him by name.
    </p>
  </section>

  <!-- SPECIALTIES -->
  <section class="section" style="padding-top: 0">
    <div class="section-tag">What Daniel Does</div>
    <div class="section-title">Specialties</div>
    <div class="spec-list">
      <div class="spec-item">
        <div class="spec-icon-wrap">🔧</div>
        <div>
          <h3>Window Repair</h3>
          <p>
            Cracked glass, broken seals, foggy panes — diagnosed and fixed same
            day.
          </p>
        </div>
      </div>
      <div class="spec-item">
        <div class="spec-icon-wrap">🪟</div>
        <div>
          <h3>Full Replacement</h3>
          <p>
            Complete window replacement with energy-efficient options. Disposal
            included.
          </p>
        </div>
      </div>
      <div class="spec-item">
        <div class="spec-icon-wrap">🚨</div>
        <div>
          <h3>Emergency Glass</h3>
          <p>
            Same-day emergency service for break-ins, storms, and accidents.
          </p>
        </div>
      </div>
      <div class="spec-item">
        <div class="spec-icon-wrap">❄️</div>
        <div>
          <h3>Energy Upgrades</h3>
          <p>
            Low-E glass, double-pane upgrades, weatherstripping to cut utility
            bills.
          </p>
        </div>
      </div>
    </div>
  </section>

 
<!-- BEFORE / AFTER -->
<div class="ba-section">
  <div class="sec-tag">Our Work</div>
  <div class="sec-title">Before &amp; After</div>
  <div class="slider-wrap" id="sliderWrap">
    <div class="slider-track">
      <div class="img-after"></div>
      <div class="img-before" id="beforeImg"></div>
      <div class="ba-lbl before">Before</div>
      <div class="ba-lbl after">After</div>
      <div class="ba-line" id="divider"></div>
      <div class="ba-handle" id="handle">⇔</div>
    </div>
    <p class="ba-hint">Drag to compare results</p>
  </div>
  <div class="ba-detail">
    <div class="ba-d"><div class="ba-d-lbl bad">✕ Before</div><p>Foggy panes, failed seals, condensation, drafts, water stains</p></div>
    <div class="ba-d"><div class="ba-d-lbl good">✓ After</div><p>Crystal clear, airtight seal, energy efficient, fully restored</p></div>
  </div>
</div>
 
<!-- CTA -->
<div class="cta-section">
  <div class="cta-pre">Get Started Today</div>
  <h2>Ready to Fix<br>Your Windows?</h2>
  <p>Same-day service available. Daniel personally handles every job with care and precision. No hidden fees — satisfaction is guaranteed.</p>
  <a class="cta-num" href="tel:6304735256">630-473-5256</a>
  <div class="cta-num-lbl">Tap to Call · Mon–Sat</div>
  <div class="cta-btns">
    <a class="btn-white-main" href="#estimate">Request Free Estimate</a>
    <a class="btn-white-outline" href="mailto:Authoritywindowrepair@gmail.com">Send an Email Instead</a>
  </div>
  <div class="cta-promises">
    <span class="cta-promise">✓ No Hidden Fees</span>
    <span class="cta-promise">✓ Same-Day Available</span>
    <span class="cta-promise">✓ 100% Satisfaction</span>
  </div>
</div>
 
<!-- FORM -->
<div class="form-section" id="estimate">
  <div class="sec-tag">Estimate</div>
  <div class="sec-title">Request a Free Quote</div>
  <div class="form-inner">
    <div class="fg"><label>Name</label><input type="text" placeholder="Your full name"></div>
    <div class="fg"><label>Phone</label><input type="tel" placeholder="(630) 000-0000"></div>
    <div class="fg"><label>Service</label><select><option value="">Select service...</option><option>Window Repair</option><option>Replacement</option><option>Emergency Glass</option><option>Energy Upgrade</option></select></div>
    <div class="fg"><label>Notes</label><textarea placeholder="Describe the issue..."></textarea></div>
    <button class="btn-sub" onclick="alert('Sent! We\'ll reach out shortly.')">Request Estimate →</button>
  </div>
</div>
 
<div class="info-section">
  <div class="info-card">
    <div class="info-card-t">Business Hours</div>
    <div class="hr-row"><span class="hr-d">Monday – Friday</span><span class="hr-t">7:00 AM – 6:00 PM</span></div>
    <div class="hr-row"><span class="hr-d">Saturday</span><span class="hr-t">7:00 AM – 4:00 PM</span></div>
    <div class="hr-row"><span class="hr-d">Sunday</span><span class="hr-t" style="color:#EF4444">Closed</span></div>
  </div>
  <div class="info-card">
    <div class="info-card-t">Contact Us</div>
    <a class="c-link" href="tel:6304735256"><div class="c-ico">📞</div><div><div class="c-lbl">Phone</div><div class="c-val">630-473-5256</div></div></a>
    <a class="c-link" href="mailto:Authoritywindowrepair@gmail.com"><div class="c-ico">✉️</div><div><div class="c-lbl">Email</div><div class="c-val">Authoritywindowrepair@gmail.com</div></div></a>
  </div>
</div>
 
<footer>
  <p>© 2025 Authority Window Repair</p>
  <div class="fl"><a href="#">Home</a><a href="#">Services</a><a href="#">Contact</a></div>
</footer>

<!-- REVIEWS -->
<section class="section">
  <div class="section-tag">Client Reviews</div>
  <div class="section-title">What They Say</div>
  <div class="reviews">
    <div class="review">
      <div class="r-stars">★★★★★</div>
      <p class="r-text">"Daniel came same day and fixed my foggy window fast. Super professional, no mess, fair price."</p>
      <div class="r-author">— Sarah M., Aurora IL</div>
    </div>
    <div class="review">
      <div class="r-stars">★★★★★</div>
      <p class="r-text">"After a break-in, Daniel was there within hours. Had new glass in by evening. Could not ask for more."</p>
      <div class="r-author">— James T., Naperville IL</div>
    </div>
    <div class="review">
      <div class="r-stars">★★★★★</div>
      <p class="r-text">"Honest, on time, great work. He's the only person I'll call for windows."</p>
      <div class="r-author">— Linda K., Wheaton IL</div>
    </div>
  </div>
</section>

  <!-- FORM -->
  <div class="form-wrap" id="estimate">
    <h3>Request Free Estimate</h3>
    <p class="sub">Daniel personally responds within the hour.</p>
    <div class="fgroup">
      <label>Your Name</label>
      <input type="text" placeholder="John Smith" />
    </div>
    <div class="fgroup">
      <label>Phone</label>
      <input type="tel" placeholder="(630) 000-0000" />
    </div>
    <div class="fgroup">
      <label>Service Needed</label>
      <select>
        <option value="">Choose a service...</option>
        <option>Window Repair</option>
        <option>Window Replacement</option>
        <option>Emergency Glass</option>
        <option>Energy Upgrade</option>
        <option>Other</option>
      </select>
    </div>
    <div class="fgroup">
      <label>Details</label>
      <textarea
        placeholder="Describe the issue, number of windows, any urgency..."
      ></textarea>
    </div>
    <button
      class="btn-form"
      onclick="alert('Thanks! Daniel will contact you shortly.')"
    >
      Send Estimate Request →
    </button>
  </div>



  <footer>
    <p>Serving Aurora, Naperville, Wheaton & surrounding areas</p>
    <div class="footer-links">
      <a href="#">Home</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>
    <p class="footer-copy">Copyright © 2025 Authority Window Repair</p>
  </footer>
  </template>