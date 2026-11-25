<template>
  <FSPageLayout>
    <main class="content-page">
      <section class="page-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">A fresh start, together</p>
            <h1>More than boxes.<br /><em>A new beginning.</em></h1>
            <p>A move is a new home, a new routine, and the start of what comes next. We’re here to help make the change feel more manageable.</p>
          </div>
          <div class="about-banner-art" role="img" aria-label="Animated illustration of a welcoming home at sunrise">
            <div class="about-sun"></div>
            <div class="about-hill about-hill-back"></div>
            <div class="about-hill about-hill-front"></div>
            <div class="about-house">
              <span class="about-roof"></span>
              <span class="about-wall"></span>
              <span class="about-door"></span>
              <span class="about-window"></span>
            </div>
            <div class="about-plant"><i></i><b></b><span></span></div>
            <span class="about-glint glint-one">✦</span>
            <span class="about-glint glint-two">✦</span>
          </div>
        </div>
      </section>
      <section class="story">
        <div class="home-art">
          <img
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&amp;fit=crop&amp;w=1000&amp;q=85"
            alt="Moving crew carefully carrying a large houseplant beside a moving truck"
          />
        </div>
        <div>
          <p class="eyebrow">Our approach</p>
          <h2>Thoughtful help for a big day.</h2>
          <p>Fresh Start Moving LLC is built around a simple idea: clear communication and a thoughtful plan can make a home move feel more manageable.</p>
          <p>From the first conversation, we’ll ask about your priorities, timing, belongings, and both locations. We’ll explain the services being discussed, confirm what is and isn’t included, and make sure you have a chance to ask questions before making a decision.</p>
          <p>Before the move, we’ll review the agreed schedule, estimate, access details, and any special handling needs. If something changes, we’ll communicate with you so you know what to expect. Services, scheduling, and estimates are confirmed for each move.</p>
        </div>
      </section>
      <section class="values">
        <article>
          <span>01</span>
          <h2>Clear communication</h2>
          <p>We’ll listen to what matters to you and explain the options in straightforward terms.</p>
          <p>Before you book, we’ll review the services, estimate, schedule, and move-day expectations together. You’ll know what’s included and who to contact with questions.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Careful preparation</h2>
          <p>Good preparation starts with understanding your home and what needs to be moved.</p>
          <p>We’ll talk through access, stairs, parking, timing, and items needing special attention, then use those details to shape a clear plan for the day.</p>
        </article>
        <article>
          <span>03</span>
          <h2>A fresh beginning</h2>
          <p>Moving day is one part of a bigger change, and we want the process to feel manageable.</p>
          <p>With the plan in place and expectations aligned, you can focus on getting comfortable in your new space and starting what comes next.</p>
        </article>
      </section>
      <section class="bottom-cta">
        <h2>Planning a move?</h2>
        <p>Whether you’re moving soon or planning ahead, tell us a little about your home and what kind of help you need. We’ll talk through the details and help you figure out the next step.</p>
        <router-link class="button" to="/freshstart/contact">Get in touch <span aria-hidden="true">↗</span></router-link>
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
.hero-inner { max-width:1084px; min-height:300px; margin:0 auto; display:grid; grid-template-columns:1fr .95fr; align-items:center; gap:40px; }
.hero-copy { position:relative; z-index:1; }
.eyebrow { margin:0 0 18px; color:var(--blue); font-size:10px; font-weight:700; letter-spacing:1.7px; text-transform:uppercase; }
h1,h2 { font-family:Georgia,"Times New Roman",serif; font-weight:400; }
.page-hero h1 { margin:0; font-size:clamp(40px,5vw,60px); letter-spacing:-2.7px; line-height:1.04; }
.page-hero h1 em { color:var(--blue); }
.hero-copy > p:last-child { max-width:500px; margin:20px 0 0; color:var(--muted); font-size:13px; line-height:1.85; }
.about-banner-art { position:relative; height:270px; overflow:hidden; background:linear-gradient(180deg,#dceaf2 0%,#f3f6f5 76%); }
.about-sun { position:absolute; top:27px; right:22%; width:62px; height:62px; border-radius:50%; background:#edcf91; animation:about-sun 6s ease-in-out infinite; }
.about-hill { position:absolute; right:-8%; bottom:0; left:-8%; height:43%; border-radius:50% 50% 0 0/55% 55% 0 0; }
.about-hill-back { background:#c3d9e3; transform:translateX(-4%); }
.about-hill-front { right:-15%; bottom:-14%; left:34%; height:46%; background:#9dbbc9; transform:rotate(-8deg); }
.about-house { position:absolute; z-index:1; bottom:25px; left:50%; width:156px; height:118px; transform:translateX(-50%); }
.about-roof { position:absolute; z-index:2; top:0; left:-10px; width:176px; height:78px; background:#456c85; clip-path:polygon(50% 0,100% 100%,0 100%); }
.about-wall { position:absolute; right:4px; bottom:0; left:4px; height:78px; background:#fffdf7; box-shadow:0 14px 26px #21384a20; }
.about-door { position:absolute; z-index:2; bottom:0; left:66px; width:31px; height:57px; background:#d2aa73; transform-origin:0 50%; animation:door-welcome 5s ease-in-out infinite; }
.about-window { position:absolute; z-index:2; top:53px; left:19px; width:29px; height:27px; border:4px solid #fff; background:#b5d4e2; }
.about-plant { position:absolute; z-index:2; bottom:20px; left:11%; width:36px; height:60px; border-bottom:9px solid #6d8d85; }
.about-plant i,.about-plant b,.about-plant span { position:absolute; bottom:25px; left:13px; width:18px; height:28px; border-radius:100% 0 100% 0; background:#5c8a83; transform-origin:bottom; animation:plant-sway 3s ease-in-out infinite; }
.about-plant b { left:0; bottom:14px; transform:rotate(-42deg) scale(.8); animation-delay:-.5s; }
.about-plant span { left:18px; bottom:11px; transform:rotate(38deg) scale(.75); animation-delay:-1s; }
.about-glint { position:absolute; z-index:3; color:#fff; animation:about-glint 2.4s ease-in-out infinite; }
.glint-one { top:27%; left:20%; }
.glint-two { top:57%; right:16%; color:#bd985f; animation-delay:-1.2s; }
@keyframes about-sun { 0%,100% { transform:translateY(4px); box-shadow:0 0 0 0 #edcf9128; } 50% { transform:translateY(-7px); box-shadow:0 0 0 12px #edcf9128; } }
@keyframes door-welcome { 0%,35%,100% { transform:perspective(100px) rotateY(0); } 55%,80% { transform:perspective(100px) rotateY(-27deg); } }
@keyframes plant-sway { 0%,100% { rotate:-7deg; } 50% { rotate:8deg; } }
@keyframes about-glint { 0%,100% { opacity:.45; transform:scale(.8); } 50% { opacity:1; transform:scale(1.2); } }
.story { max-width:1080px; margin:0 auto; padding:70px 28px; display:grid; grid-template-columns:minmax(230px,.8fr) minmax(300px,1fr); align-items:center; gap:clamp(40px,8vw,100px); }
.home-art { width:min(100%,390px); aspect-ratio:1.15; justify-self:end; overflow:hidden; background:#dceaf2; box-shadow:0 18px 38px #21384a1c; }
.home-art img { display:block; width:100%; height:100%; object-fit:cover; object-position:28% center; }
.story h2 { margin:0 0 16px; font-size:32px; }
.story div:last-child > p:not(.eyebrow) { margin:0 0 13px; color:var(--muted); font-size:13px; line-height:1.85; }
.values { padding:55px max(28px,calc((100% - 1080px)/2)) 65px; display:grid; grid-template-columns:repeat(3,1fr); gap:25px; background:#edf3f7; }
.values article { padding-top:16px; border-top:1px solid #aebfca; }
.values article > span { color:var(--blue); font-family:Georgia,"Times New Roman",serif; font-size:24px; }
.values h2 { margin:12px 0 8px; font-size:18px; }
.values p { margin:0 0 9px; color:var(--muted); font-size:12px; line-height:1.8; }
.bottom-cta { padding:60px 24px 70px; text-align:center; }
.bottom-cta h2 { margin:0; font-size:30px; }
.bottom-cta p { max-width:540px; margin:14px auto 0; color:var(--muted); font-size:13px; line-height:1.8; }
.button { display:inline-flex; min-height:46px; align-items:center; gap:18px; margin-top:18px; padding:0 19px; color:#fff; background:var(--blue); font-size:11px; font-weight:700; text-decoration:none; }
.button:hover { background:#21384a; }
@media(max-width:700px) { .story { grid-template-columns:1fr; } .home-art { width:min(100%,390px); justify-self:start; } .values { grid-template-columns:1fr; gap:20px; } }
@media(max-width:760px) { .hero-inner { grid-template-columns:1fr; gap:22px; } .about-banner-art { height:235px; } }
@media(max-width:600px) { .page-hero { padding:40px 24px; } .page-hero h1 { font-size:42px; } }
@media(prefers-reduced-motion:reduce) { .about-banner-art *, .about-banner-art *::before { animation:none !important; } }
</style>