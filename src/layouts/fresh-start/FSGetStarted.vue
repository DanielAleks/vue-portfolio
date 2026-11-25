<template>
  <FSPageLayout>
    <main class="get-started">
      <section class="hero">
        <div class="hero-inner">
          <div>
            <p class="eyebrow">Your next chapter</p>
            <h1>Get started <em>with us.</em></h1>
            <p class="intro">Every move begins with a conversation. Gather a few details about your plans and let’s take the next step together.</p>
            <a class="button" href="#contact-details">Contact information <span aria-hidden="true">↗</span></a>
          </div>
          <div class="hero-art" aria-hidden="true">
            <div class="art-orbit"></div>
            <div class="art-card"><span>✦</span><strong>A fresh start</strong><small>One step at a time</small></div>
            <div class="art-dot"></div>
          </div>
        </div>
      </section>

      <section class="section">
        <p class="eyebrow">A simple way forward</p>
        <h2>How your move comes together.</h2>
        <div class="steps">
          <article><span>01</span><h3>Tell us your plans</h3><p>Share your moving date, pickup and delivery locations, home size, and the help you need.</p></article>
          <article><span>02</span><h3>Review your plan</h3><p>Discuss access, services, availability, and a written estimate before confirming your booking.</p></article>
          <article><span>03</span><h3>Start your move</h3><p>On moving day, follow the agreed plan for the packing, loading, transportation, or unloading you arrange.</p></article>
        </div>
        <router-link class="text-link" to="/freshstart/how-it-works">See how it works in more detail <span aria-hidden="true">↗</span></router-link>
      </section>

      <div class="section">
        <FSMoveCalculator />
      </div>

      <section id="contact-details" class="contact-section">
        <div class="contact-inner">
          <div>
            <p class="eyebrow">Let’s talk</p>
            <h2>Ready to plan your move?</h2>
            <p>Have your preferred date, locations, and any details about stairs, parking, or large items ready. These details help us discuss the right services and prepare an estimate.</p>
            <router-link class="text-link" to="/freshstart/contact">More contact and planning information <span aria-hidden="true">↗</span></router-link>
          </div>
          <aside class="contact-card">
            <h3>Fresh Start Moving LLC</h3>
            <p>Add your business contact details before publishing so customers can reach you.</p>
            <div><small>Business phone</small><strong>Add your phone number</strong></div>
            <div><small>Business email</small><strong>Add your email address</strong></div>
          </aside>
        </div>
      </section>
    </main>
  </FSPageLayout>
</template>

<script setup>
import FSPageLayout from "./FSPageLayout.vue";
import FSMoveCalculator from "./FSMoveCalculator.vue";
</script>

<style scoped>
.get-started { color:#21384a; font-family:"Helvetica Neue",Arial,sans-serif; }
.hero { padding:48px 28px; background:#edf3f7; overflow:hidden; }
.hero-inner { max-width:1084px; min-height:300px; margin:auto; display:grid; grid-template-columns:1fr .85fr; align-items:center; gap:48px; }
.eyebrow { margin:0 0 16px; color:#3e78a0; font-size:11px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; }
h1,h2,h3 { font-family:Georgia,"Times New Roman",serif; font-weight:400; }
h1 { margin:0; font-size:clamp(42px,5vw,62px); letter-spacing:-2px; line-height:1.05; }
h1 em { color:#3e78a0; }
.intro,.contact-inner > div > p:not(.eyebrow) { max-width:520px; color:#627482; font-size:14px; line-height:1.8; }
.intro { margin:20px 0 0; }
.get-started .button { display:inline-flex; gap:18px; margin-top:22px; padding:14px 20px; color:#fff; background:#315f7e; font-size:13px; font-weight:700; }
.button:hover { background:#234b67; }
.hero-art { position:relative; min-height:255px; display:grid; place-items:center; overflow:hidden; background:linear-gradient(145deg,#dceaf2,#f8fbfc); }
.art-orbit { position:absolute; width:190px; height:190px; border:1px dashed #9bbbd0; border-radius:50%; animation:orbit 20s linear infinite; }
.art-card { position:relative; width:190px; padding:24px; background:#fff; box-shadow:0 18px 35px #315a7826; animation:float 4s ease-in-out infinite; }
.art-card span,.art-card strong,.art-card small { display:block; }
.art-card span { color:#c49c63; font-size:22px; }
.art-card strong { margin:12px 0 8px; font:24px Georgia,serif; }
.art-card small { color:#627482; }
.art-dot { position:absolute; top:42px; right:22%; width:12px; height:12px; border-radius:50%; background:#d6b77c; }
.section,.contact-inner { max-width:1084px; margin:auto; padding:72px 28px; }
h2 { margin:0; font-size:clamp(30px,3vw,42px); line-height:1.15; }
.steps { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin:32px 0 24px; }
.steps article { padding:26px; border:1px solid #d5e4ed; border-top:4px solid #3e78a0; background:#f7fafc; }
.steps span { color:#3e78a0; font-size:12px; font-weight:700; }
.steps h3 { margin:16px 0 10px; font-size:22px; }
.steps p,.contact-card p { margin:0; color:#526a79; font-size:14px; line-height:1.8; }
.get-started .text-link { display:inline-block; color:#315f7e; font-size:13px; font-weight:700; }
.text-link:hover { text-decoration:underline; }
.contact-section { background:#edf3f7; }
#contact-details { scroll-margin-top:90px; }
.contact-inner { display:grid; grid-template-columns:1fr .8fr; align-items:center; gap:60px; }
.contact-inner > div > p:not(.eyebrow) { margin:18px 0; }
.contact-card { padding:30px; border:1px solid #d5e4ed; background:#fff; box-shadow:0 10px 24px #315a7812; }
.contact-card h3 { margin:0 0 12px; font-size:25px; }
.contact-card div { display:grid; gap:5px; margin-top:20px; padding-top:16px; border-top:1px solid #e1e9ee; }
.contact-card small { color:#627482; font-size:11px; text-transform:uppercase; letter-spacing:1px; }
.contact-card strong { font-size:14px; }
@keyframes orbit { to { transform:rotate(360deg); } }
@keyframes float { 50% { transform:translateY(-8px); } }
@media(max-width:700px) {
  .hero-inner,.steps,.contact-inner { grid-template-columns:1fr; }
  .hero-inner,.contact-inner { gap:28px; }
  .hero-art { min-height:210px; }
  .section,.contact-inner { padding:52px 24px; }
}
@media(max-width:900px) { #contact-details { scroll-margin-top:180px; } }
@media(prefers-reduced-motion:reduce) { .art-orbit,.art-card { animation:none; } }
</style>
