<template>
  <FSPageLayout>
    <main class="content-page">
      <section class="page-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Moving &amp; home services</p>
            <h1>Help for your home<br /><em>and your next move.</em></h1>
            <p>Explore move-day support and practical services for your home. Contact us to confirm project scope, availability, and pricing.</p>
          </div>
          <div class="service-banner-art" role="img" aria-label="Illustration of home service cards surrounding a house">
            <div class="service-art-sun"></div>
            <div class="service-art-house">
              <span class="service-art-roof"></span>
              <span class="service-art-door"></span>
              <span class="service-art-window"></span>
            </div>
            <div class="service-float service-float-one"><span>✦</span> Clean</div>
            <div class="service-float service-float-two"><span>⌁</span> Repair</div>
            <div class="service-float service-float-three"><span>＋</span> Care</div>
          </div>
        </div>
      </section>
      <section class="services-section">
        <h2 class="group-title">Moving day support</h2>
        <p class="group-intro">From packing up to settling in, explore the help available for each part of your move.</p>
        <div class="service-grid">
          <article class="moving-card">
            <div class="moving-card-top">
              <span class="card-number">01</span>
              <span class="moving-icon" aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none">
                  <path d="M7 15h30v23H7zM11 15l3-8h16l3 8M7 22h30M17 22v16m10-16v16" />
                  <path d="m18 11 4 4 5-6" />
                </svg>
              </span>
            </div>
            <h3>Packing help</h3>
            <p>Get help preparing your belongings for the trip. Discuss packing materials and which items you’d like help with ahead of time.</p>
            <router-link class="card-detail" to="/freshstart/services/packing-help">Explore packing help <span aria-hidden="true">↗</span></router-link>
          </article>
          <article class="moving-card">
            <div class="moving-card-top">
              <span class="card-number">02</span>
              <span class="moving-icon" aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none">
                  <path d="M5 17h23v18H5zM28 23h7l5 6v6H28z" />
                  <circle cx="13" cy="36" r="3" />
                  <circle cx="33" cy="36" r="3" />
                  <path d="M10 22h12m-12 5h8" />
                </svg>
              </span>
            </div>
            <h3>Loading &amp; transportation</h3>
            <p>Arrange help with lifting and transporting household items. Confirm truck arrangements, mileage, and access details for each job.</p>
            <router-link class="card-detail" to="/freshstart/services/loading-transportation">Explore loading and transportation <span aria-hidden="true">↗</span></router-link>
          </article>
          <article class="moving-card">
            <div class="moving-card-top">
              <span class="card-number">03</span>
              <span class="moving-icon" aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none">
                  <path d="m6 20 16-13 16 13v17H6zM17 37V24h10v13" />
                  <path d="M29 14h5v6M13 20h5m8 0h5" />
                </svg>
              </span>
            </div>
            <h3>Unloading &amp; settling in</h3>
            <p>Get help unloading your belongings at the new home. Share stair, room, and placement details as part of your move plan.</p>
            <router-link class="card-detail" to="/freshstart/services/unloading-settling">Explore unloading and settling in <span aria-hidden="true">↗</span></router-link>
          </article>
        </div>
      </section>
      <section class="services-section home-services">
        <h2 class="group-title">Home services</h2>
        <p class="group-intro">Discover practical services to clean, maintain, and refresh your home. Contact us to discuss your project and availability.</p>
        <div class="service-grid">
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M12 4v16M4 12h16M16.5 2v3M15 3.5h3" /></svg></span>
            <h3>Cleaning &amp; window service</h3><p>Ask about home cleaning and window-cleaning options for your space.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m13 2-8 12h6l-1 8 9-12h-6l1-8Z" /></svg></span>
            <h3>Electrical</h3><p>Electrical service for home projects, subject to availability and applicable licensing.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 6h7l3 3-3 3H4V6Zm10 3h4M8 12v5a2 2 0 0 0 2 2h2" /><path d="m19 12 1 1m-2 2 1 1m-3 0 1 1" /></svg></span>
            <h3>Pressure washing &amp; exterior care</h3><p>Refresh exterior surfaces with pressure-washing and outdoor upkeep options.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="14" height="7" rx="1" /><path d="M17 6h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-6v2m-2 0h4v6h-4z" /></svg></span>
            <h3>Drywall &amp; painting</h3><p>Help with drywall touch-ups and painting projects around the home.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m14 4 2-2 5 5-2 2-5-5ZM15 5l-3 3m4 0L6 20l-2 1 1-2L15 7" /><path d="m3 13 3-3 3 3-3 3-3-3Z" /></svg></span>
            <h3>Carpentry &amp; trim</h3><p>Carpentry repairs and trim work to help finish or refresh your space.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m3 11 9-7 9 7M5 10v8h14v-8M3 19h18M18 19v2" /><path d="M8 8h8" /></svg></span>
            <h3>Roof &amp; gutter maintenance</h3><p>Ask about routine roof and gutter upkeep for your home.</p>
          </article>
        </div>
      </section>
      <aside class="notice" style="margin-top: 3rem; margin-bottom: 3rem"><strong>Every project is different.</strong><p>Service availability, scope, and pricing depend on your needs. Electrical and other regulated work must be handled by appropriately licensed professionals where required. Contact us to discuss your project.</p></aside>
      <section class="team-section" aria-labelledby="team-heading">
        <div class="team-inner">
          <div>
            <p class="eyebrow">A helping hand</p>
            <h2 id="team-heading">Moving forward, together.</h2>
            <p>A move is easier to plan when everyone knows what to expect. Share your priorities, timing, and any items needing special attention so we can discuss the right support for your day.</p>
            <p>From packing and loading to settling in, we’ll help you explore the services that fit your needs. Availability and the details of each move are confirmed individually.</p>
            <router-link class="team-link" to="/freshstart/how-it-works">See how it works <span aria-hidden="true">↗</span></router-link>
          </div>
          <figure>
            <img src="https://images.unsplash.com/photo-1601654717399-7486d5ebedca?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Moving crew gathered next to a moving truck" loading="lazy" />
            <figcaption>Stock photo: Metropolis Moving crew, via Unsplash.</figcaption>
          </figure>
        </div>
      </section>
      <section class="bottom-cta">
        <h2>Let’s find the right help for your home.</h2>
        <router-link class="button" to="/freshstart/contact">Tell us what you need <span aria-hidden="true">↗</span></router-link>
      </section>
    </main>
  </FSPageLayout>
</template>

<script setup>
import FSPageLayout from "./FSPageLayout.vue";
</script>

<style scoped>
.content-page { --ink:#21384a; --muted:#627482; --blue:#3e78a0; color:var(--ink); font-family:"Helvetica Neue",Arial,sans-serif; }
.page-hero { padding:48px 28px; background:#edf3f7; overflow:hidden; }
.hero-inner { max-width:1084px; min-height:300px; margin:0 auto; display:grid; grid-template-columns:1fr .9fr; align-items:center; gap:40px; }
.hero-copy { position:relative; z-index:1; }
.eyebrow { margin:0 0 18px; color:var(--blue); font-size:10px; font-weight:700; letter-spacing:1.7px; text-transform:uppercase; }
.page-hero h1 { margin:0; font-family:Georgia,"Times New Roman",serif; font-size:clamp(40px,5vw,62px); font-weight:400; letter-spacing:-2.7px; line-height:1.04; }
.page-hero h1 em { color:var(--blue); }
.hero-copy > p:last-child { max-width:500px; margin:20px 0 0; color:var(--muted); font-size:13px; line-height:1.85; }
.service-banner-art { position:relative; height:270px; overflow:hidden; background:radial-gradient(ellipse at 50% 95%,#d1e2ed 0 35%,transparent 36%),linear-gradient(145deg,#e4eef4,#f6f9fa); }
.service-art-sun { position:absolute; top:26px; right:43px; width:72px; height:72px; border-radius:50%; background:#d7e8f1; animation:service-pulse 4s ease-in-out infinite; }
.service-art-house { position:absolute; z-index:1; left:50%; bottom:27px; width:155px; height:124px; transform:translateX(-50%); background:#fff; box-shadow:0 16px 30px #466b831c; }
.service-art-roof { position:absolute; left:-15px; top:-54px; width:185px; height:100px; background:#477a9c; clip-path:polygon(50% 0,100% 100%,0 100%); }
.service-art-door { position:absolute; bottom:0; left:64px; width:32px; height:63px; background:#d7b17c; }
.service-art-window { position:absolute; top:26px; left:18px; width:32px; height:33px; border:5px solid #fff; background:#b8d5e4; box-shadow:0 0 0 1px #abc3d1; }
.service-float { position:absolute; z-index:2; min-width:105px; padding:11px 14px; display:flex; align-items:center; gap:9px; color:#315a78; background:#fff; box-shadow:0 8px 24px #27445a1a; font-size:11px; font-weight:650; animation:service-float 4s ease-in-out infinite; }
.service-float span { color:#3e78a0; font-size:17px; }
.service-float-one { top:64px; left:8%; }
.service-float-two { top:120px; right:7%; animation-delay:-1.3s; }
.service-float-three { bottom:40px; left:10%; animation-delay:-2.4s; }
@keyframes service-float { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-9px) rotate(1deg); } }
@keyframes service-pulse { 0%,100% { transform:scale(.94); opacity:.75; } 50% { transform:scale(1.08); opacity:1; } }
.services-section { max-width:1140px; margin:0 auto; padding:55px 28px 10px; }
.group-title { margin:0 0 12px; font-family:Georgia,"Times New Roman",serif; font-size:27px; font-weight:400; }
.group-intro { max-width:650px; margin:0 0 24px; color:var(--muted); font-size:13px; line-height:1.8; }
.home-services { padding-top:75px; text-align:center; }
.home-services .group-intro { margin-right:auto; margin-left:auto; }
.service-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
.service-grid article { min-height:210px; padding:26px 23px; border:1px solid #e1e9ee; }
.moving-card { position:relative; overflow:hidden; background:linear-gradient(145deg,#f7fbfd,#edf4f8); box-shadow:0 7px 20px #315a780d; transition:transform 220ms ease,box-shadow 220ms ease,background 220ms ease; }
.moving-card::before { position:absolute; top:0; right:0; left:0; height:4px; background:linear-gradient(90deg,#3e78a0,#7eb5d4,#d6b77c); content:""; transition:height 220ms ease; }
.moving-card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
.moving-card .card-number { color:#477a9c; font-family:Georgia,"Times New Roman",serif; font-size:14px; letter-spacing:.4px; }
.moving-icon { width:46px; height:46px; display:grid; place-items:center; border-radius:14px; color:#3e78a0; background:#deebf3; transition:color 220ms ease,background 220ms ease,transform 220ms ease; }
.moving-icon svg { width:27px; height:27px; stroke:currentColor; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }
.moving-card h3 { margin:0 0 10px; font-family:Georgia,"Times New Roman",serif; font-size:20px; font-weight:400; transition:color 220ms ease; }
.moving-card p { margin:0; color:var(--muted); font-size:12px; line-height:1.8; transition:color 220ms ease; }
.card-detail { display:flex; justify-content:space-between; align-items:center; margin-top:19px; padding-top:12px; border-top:1px solid #d5e3eb; color:#477a9c; font-size:10px; font-weight:700; letter-spacing:.35px; transition:color 220ms ease,border-color 220ms ease; }
.moving-card:hover,.moving-card:focus-within { transform:translateY(-7px); background:linear-gradient(145deg,#3f83ad,#326b91); border-color:#39799f; box-shadow:0 18px 34px #315a7833; }
.moving-card:hover::before,.moving-card:focus-within::before { height:6px; background:linear-gradient(90deg,#f0d99d,#fff,#a9d8ec); }
.moving-card:hover .moving-icon,.moving-card:focus-within .moving-icon { color:#fff; background:#ffffff2e; transform:rotate(-5deg) scale(1.07); }
.moving-card:hover .card-number,.moving-card:focus-within .card-number,.moving-card:hover h3,.moving-card:focus-within h3,.moving-card:hover p,.moving-card:focus-within p,.moving-card:hover .card-detail,.moving-card:focus-within .card-detail { color:#fff; }
.moving-card:hover .card-detail,.moving-card:focus-within .card-detail { border-color:#ffffff60; }
.home-service-card { min-height:190px !important; padding:23px 21px !important; border:1px solid #c8dce8 !important; border-top:4px solid #7da8c0 !important; border-radius:4px; background:#fff; box-shadow:0 5px 14px #315a7818; transition:transform 180ms ease,border-color 180ms ease,box-shadow 180ms ease; }
.home-service-card:hover { transform:translateY(-3px); border-color:#8fb4ca !important; border-top-color:#3e78a0 !important; box-shadow:0 10px 22px #315a7820; }
.home-service-icon { display:inline-grid; width:64px; height:64px; place-items:center; border-radius:50%; color:#315f7d; background:linear-gradient(135deg,#d2eafa,#f4dfbb); }
.home-service-icon svg { width:30px; height:30px; stroke:currentColor; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }
.home-service-card:nth-child(1) { border-radius:4px; }
.home-service-card:nth-child(2) { border-radius:22px; border-top-color:#c49c63 !important; box-shadow:0 10px 24px #315a781c; }
.home-service-card:nth-child(2) .home-service-icon { background:linear-gradient(135deg,#f9e8bc,#d8eaf3); color:#795b28; }
.home-service-card:nth-child(4),.home-service-card:nth-child(5),.home-service-card:nth-child(6) { border-top:1px solid #c8dce8 !important; border-radius:32px 32px 4px 4px; box-shadow:0 8px 0 #dceaf2,0 13px 22px #315a7818; }
.home-service-card:nth-child(4) .home-service-icon,.home-service-card:nth-child(5) .home-service-icon,.home-service-card:nth-child(6) .home-service-icon { box-shadow:0 0 0 5px #f4f8fa; background:linear-gradient(135deg,#d7e8f8,#f1ddc2); color:#3e6687; }
.home-service-card h3 { margin:17px 0 9px; font-family:Georgia,"Times New Roman",serif; font-size:18px; font-weight:400; }
.home-service-card p { margin:0; color:#586f7d; font-size:12px; line-height:1.75; }
.service-grid h3 { margin:17px 0 10px; font-family:Georgia,"Times New Roman",serif; font-size:19px; font-weight:400; }
.service-grid p,.notice p { margin:0; color:var(--muted); font-size:12px; line-height:1.8; }
.notice { max-width:1084px; margin:10px auto 0; padding:21px 24px; background:#edf3f7; }
.notice strong { font-family:Georgia,"Times New Roman",serif; font-size:16px; font-weight:400; }
.notice p { margin-top:5px; }
.team-section { padding:75px 28px 20px; }
.team-inner { max-width:1084px; margin:auto; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:56px; }
.team-inner h2 { margin:0 0 18px; font:400 clamp(30px,3vw,42px)/1.15 Georgia,"Times New Roman",serif; }
.team-inner > div > p:not(.eyebrow) { color:#526a79; font-size:14px; line-height:1.8; }
.content-page .team-link { display:inline-block; margin-top:8px; color:#315f7e; font-size:13px; font-weight:700; }
.team-link:hover { text-decoration:underline; }
.team-inner figure { margin:0; }
.team-inner img { display:block; width:100%; height:310px; object-fit:cover; }
.team-inner figcaption { margin-top:8px; color:#627482; font-size:11px; }
.bottom-cta { margin-top:5rem; padding:62px 24px 70px; background:#edf3f7; text-align:center; }
.bottom-cta h2 { margin:0; font-family:Georgia,"Times New Roman",serif; font-size:clamp(25px,4vw,34px); font-weight:400; }
.button { display:inline-flex; min-height:46px; align-items:center; gap:18px; margin-top:18px; padding:0 19px; color:#fff; background:var(--blue); font-size:11px; font-weight:700; text-decoration:none; }
.button:hover { background:#21384a; }
@media(max-width:760px) { .service-grid,.team-inner { grid-template-columns:1fr; } .service-grid article { min-height:0; } .notice { margin-right:28px; margin-left:28px; } .team-section { padding:54px 24px 10px; } .team-inner { gap:28px; } .team-inner img { height:240px; } }
@media(max-width:760px) { .hero-inner { grid-template-columns:1fr; gap:24px; } .service-banner-art { height:235px; } }
@media(max-width:600px) { .page-hero { padding:40px 24px; } .page-hero h1 { font-size:42px; } }
@media(prefers-reduced-motion:reduce) { .service-banner-art *, .service-banner-art *::before { animation:none !important; } }
</style>
