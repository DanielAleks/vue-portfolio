<template>
  <FSPageLayout>
    <main class="content-page">
      <section class="page-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Your next chapter</p>
            <h1>Let’s talk about<br /><em>your move.</em></h1>
            <p>Gather a few details about your plans so they’re ready when you request an estimate.</p>
          </div>
          <div class="contact-banner-art" role="img" aria-label="Animated illustration of a message being sent to Fresh Start">
            <div class="contact-orbit orbit-one"></div>
            <div class="contact-orbit orbit-two"></div>
            <div class="contact-spark">✦</div>
            <div class="contact-envelope">
              <span class="envelope-flap"></span>
              <span class="envelope-paper"><i></i><i></i><i></i></span>
            </div>
            <div class="contact-plane"><span></span></div>
            <div class="contact-dot dot-one"></div>
            <div class="contact-dot dot-two"></div>
          </div>
        </div>
      </section>
      <section class="contact-grid">
        <div>
          <p class="eyebrow">Request a moving estimate</p>
          <h2>A good plan starts with the details.</h2>
          <p>When you get in touch, include the information below. It helps prepare an estimate based on your move rather than a guess.</p>
          <ul>
            <li>Moving date or preferred timeframe</li>
            <li>Pickup and delivery city or ZIP code</li>
            <li>Home size and any unusually large items</li>
            <li>Stairs, elevators, parking, or other access details</li>
            <li>Whether you need packing, loading, or unloading help</li>
          </ul>
        </div>
        <aside class="contact-card">
          <span aria-hidden="true">✳</span>
          <h2>Fresh Start Moving LLC</h2>
          <p>Add your business contact details here before publishing so customers know how to reach you.</p>
          <div><small>Business phone</small><strong>Add your phone number</strong></div>
          <div><small>Business email</small><strong>Add your email address</strong></div>
        </aside>
      </section>
      <section class="planning-section" aria-labelledby="planning-heading">
        <div class="planning-inner">
          <div class="planning-intro">
            <p class="eyebrow">A little preparation goes a long way</p>
            <h2 id="planning-heading">Let’s make your next step clearer.</h2>
            <p>Whether you’re planning a move or a home project, sharing the right details helps us understand what you need and discuss the available options.</p>
          </div>
          <div class="planning-cards">
            <article>
              <span aria-hidden="true">01</span>
              <h3>For a home service</h3>
              <p>Describe the work you have in mind, the location, your preferred timing, and any details that might affect access. Photos can help illustrate the project when requested.</p>
            </article>
            <article>
              <span aria-hidden="true">02</span>
              <h3>Before you book</h3>
              <p>Ask about availability, the services included, estimated costs, and any preparation needed. Review the written estimate and confirm the details before proceeding.</p>
            </article>
            <article>
              <span aria-hidden="true">03</span>
              <h3>Questions are welcome</h3>
              <p>Not sure which services you need? Start with what you know and share any questions or concerns. We can discuss the scope and next steps together.</p>
            </article>
          </div>
        </div>
      </section>
      <section class="explore-section">
        <h2>Need help deciding?</h2>
        <p>Explore our moving and home services to see what might fit your plans. Availability and project scope are confirmed individually.</p>
        <router-link class="explore-link" to="/freshstart/services">Explore our services <span aria-hidden="true">↗</span></router-link>
      </section>
      <p class="notice">Confirm service availability, the written estimate, and move details before accepting a booking.</p>
    </main>
  </FSPageLayout>
</template>

<script setup>
import FSPageLayout from "./FSPageLayout.vue";
</script>

<style scoped>
.content-page { --ink:#21384a; --muted:#627482; --blue:#3e78a0; color:var(--ink); font-family:"Helvetica Neue",Arial,sans-serif; }
.page-hero { padding:48px 28px; background:#edf3f7; overflow:hidden; }
.hero-inner { max-width:1084px; min-height:300px; margin:0 auto; display:grid; grid-template-columns:1fr .95fr; align-items:center; gap:40px; }
.hero-copy { position:relative; z-index:1; }
.eyebrow { margin:0 0 18px; color:var(--blue); font-size:10px; font-weight:700; letter-spacing:1.7px; text-transform:uppercase; }
.page-hero h1 { margin:0; font-family:Georgia,"Times New Roman",serif; font-size:clamp(40px,5vw,62px); font-weight:400; letter-spacing:-2.7px; line-height:1.04; }
.page-hero h1 em { color:var(--blue); }
.hero-copy > p:last-child { max-width:500px; margin:20px 0 0; color:var(--muted); font-size:13px; line-height:1.85; }
.contact-banner-art { position:relative; height:270px; display:grid; place-items:center; overflow:hidden; background:radial-gradient(ellipse at 50% 50%,#f9fbfc 0 27%,transparent 28%),linear-gradient(145deg,#e2edf3,#f3f7f9); }
.contact-orbit { position:absolute; width:190px; height:190px; border:1px dashed #9bbbd0; border-radius:50%; animation:contact-orbit 14s linear infinite; }
.orbit-two { width:235px; height:235px; border-color:#c3d7e3; animation-direction:reverse; animation-duration:20s; }
.contact-spark { position:absolute; top:36px; right:22%; color:#c49c63; font-size:23px; animation:contact-spark 2.8s ease-in-out infinite; }
.contact-envelope { position:relative; z-index:2; width:150px; height:100px; overflow:hidden; background:#477a9c; box-shadow:0 20px 38px #315a7829; animation:envelope-float 4s ease-in-out infinite; }
.contact-envelope::before,.contact-envelope::after { position:absolute; z-index:2; bottom:-1px; width:0; height:0; border-top:51px solid transparent; content:""; }
.contact-envelope::before { left:0; border-right:76px solid #6f9bb5; }
.contact-envelope::after { right:0; border-left:76px solid #5b88a2; }
.envelope-flap { position:absolute; z-index:3; top:-1px; left:0; width:0; height:0; border-top:55px solid #8aadc1; border-right:75px solid transparent; border-left:75px solid transparent; transform-origin:top; animation:flap-open 5s ease-in-out infinite; }
.envelope-paper { position:absolute; z-index:1; top:14px; left:25px; width:100px; height:70px; padding:24px 14px 0; background:#fff; animation:paper-rise 5s ease-in-out infinite; }
.envelope-paper i { display:block; height:3px; margin-bottom:6px; background:#d4e2eb; }
.envelope-paper i:nth-child(2) { width:75%; }
.envelope-paper i:nth-child(3) { width:52%; }
.contact-plane { position:absolute; z-index:4; top:36px; left:20%; width:32px; height:32px; animation:plane-flight 5s ease-in-out infinite; }
.contact-plane span { display:block; width:0; height:0; border-top:12px solid transparent; border-bottom:12px solid transparent; border-left:30px solid #d5ad72; transform:rotate(-25deg); }
.contact-dot { position:absolute; width:8px; height:8px; border-radius:50%; background:#477a9c; animation:dot-pop 3s ease-in-out infinite; }
.dot-one { bottom:54px; left:24%; }
.dot-two { top:67px; right:20%; width:5px; height:5px; animation-delay:-1.5s; }
@keyframes contact-orbit { to { transform:rotate(360deg); } }
@keyframes envelope-float { 0%,100% { transform:translateY(3px) rotate(-2deg); } 50% { transform:translateY(-8px) rotate(2deg); } }
@keyframes flap-open { 0%,20%,100% { transform:rotateX(0); } 40%,76% { transform:rotateX(180deg); } }
@keyframes paper-rise { 0%,22%,100% { transform:translateY(22px); } 42%,76% { transform:translateY(-14px); } }
@keyframes plane-flight { 0%,15% { opacity:0; transform:translate(0,20px) rotate(-15deg); } 32%,70% { opacity:1; transform:translate(100px,-9px) rotate(0); } 88%,100% { opacity:0; transform:translate(180px,-25px) rotate(15deg); } }
@keyframes contact-spark { 0%,100% { opacity:.45; transform:scale(.8) rotate(0); } 50% { opacity:1; transform:scale(1.2) rotate(30deg); } }
@keyframes dot-pop { 0%,100% { opacity:.4; transform:scale(.75); } 50% { opacity:1; transform:scale(1.35); } }
.contact-grid { max-width:1050px; margin:0 auto; padding:70px 28px; display:grid; grid-template-columns:1.1fr .9fr; gap:55px; }
.contact-grid h2 { margin:0; font-family:Georgia,"Times New Roman",serif; font-size:29px; font-weight:400; line-height:1.15; }
.contact-grid p,.contact-grid li { color:var(--muted); font-size:13px; line-height:1.85; }
.contact-grid > div > p:not(.eyebrow) { margin:17px 0; }
.contact-grid ul { margin:0; padding-left:19px; }
.contact-grid li::marker { color:var(--blue); }
.contact-card { padding:28px; border:1px solid #e1e9ee; }
.contact-card > span { display:block; margin-bottom:13px; color:var(--blue); font-size:23px; }
.contact-card h2 { font-size:22px; }
.contact-card > p { margin:12px 0 20px; }
.contact-card > div { display:flex; flex-direction:column; gap:5px; padding:14px 0; border-top:1px solid #e1e9ee; }
.contact-card small { color:var(--muted); font-size:10px; letter-spacing:1px; text-transform:uppercase; }
.contact-card strong { color:var(--blue); font-size:13px; }
.planning-section { padding:68px 28px 76px; background:#edf3f7; }
.planning-inner { max-width:994px; margin:0 auto; }
.planning-intro { max-width:610px; }
.planning-intro h2,.explore-section h2 { margin:0; font-family:Georgia,"Times New Roman",serif; font-size:clamp(29px,4vw,40px); font-weight:400; line-height:1.15; }
.planning-intro > p:not(.eyebrow),.explore-section p { color:var(--muted); font-size:13px; line-height:1.85; }
.planning-intro > p:not(.eyebrow) { margin:16px 0 0; }
.planning-cards { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:32px; }
.planning-cards article { padding:24px; border-top:4px solid var(--blue); background:#fff; box-shadow:0 6px 20px rgba(49,90,120,.08); }
.planning-cards article > span { color:var(--blue); font-family:Georgia,"Times New Roman",serif; font-size:19px; }
.planning-cards h3 { margin:15px 0 9px; font-family:Georgia,"Times New Roman",serif; font-size:19px; font-weight:400; }
.planning-cards p { margin:0; color:var(--muted); font-size:12px; line-height:1.8; }
.explore-section { padding:64px 24px; text-align:center; }
.explore-section p { max-width:520px; margin:14px auto 0; }
.explore-link { display:inline-flex; align-items:center; gap:14px; min-height:46px; margin-top:20px; padding:0 19px; color:#fff !important; background:var(--blue); font-size:11px; font-weight:700; }
.explore-link:hover { background:var(--ink); }
.notice { margin:0; padding:22px 24px; color:var(--muted); background:#edf3f7; font-size:11px; line-height:1.7; text-align:center; }
@media(max-width:700px) { .contact-grid,.planning-cards { grid-template-columns:1fr; } .contact-grid { gap:30px; } }
@media(max-width:760px) { .hero-inner { grid-template-columns:1fr; gap:22px; } .contact-banner-art { height:235px; } }
@media(max-width:600px) { .page-hero { padding:40px 24px; } .page-hero h1 { font-size:42px; } .contact-grid { padding:55px 24px; } .planning-section { padding:55px 24px; } }
@media(prefers-reduced-motion:reduce) { .contact-banner-art *, .contact-banner-art *::before { animation:none !important; } }
</style>
