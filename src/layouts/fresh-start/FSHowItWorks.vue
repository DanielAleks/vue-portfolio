<template>
  <FSPageLayout>
    <main class="content-page">
      <section class="page-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">A simpler move</p>
            <h1>Three steps to<br /><em>feeling at home.</em></h1>
            <p>Moving has a lot of details. We’ll start with what you need, make a clear plan, and help you through moving day.</p>
          </div>
          <div class="journey-art" role="img" aria-label="Animated illustration of a moving truck traveling from one home to another">
            <div class="journey-sun"></div>
            <div class="journey-path"></div>
            <div class="journey-home journey-start"><span>⌂</span></div>
            <div class="journey-home journey-end"><span>⌂</span></div>
            <div class="journey-truck"><span class="truck-box"></span><span class="truck-cab"></span><i></i><b></b></div>
            <span class="journey-spark journey-spark-one">✦</span>
            <span class="journey-spark journey-spark-two">✦</span>
          </div>
        </div>
      </section>

      <section class="steps">
        <article>
          <span>01</span>
          <div>
            <h2>Tell us about your move</h2>
            <p>Share your moving date, where you’re going, and what kind of help you’re looking for. A few details help us understand what the day may involve.</p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <h2>Make a moving plan</h2>
            <p>Talk through the details, including the items, access, and services you need. We’ll confirm the plan and pricing with you before you book.</p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <h2>Start fresh</h2>
            <p>On moving day, follow the plan for packing, loading, transportation, and unloading. The exact support depends on the services you arrange with us.</p>
          </div>
        </article>
      </section>

      <section class="prep">
        <h2>A few details make planning easier.</h2>
        <ul>
          <li>Your moving date and both addresses</li>
          <li>Home size and an estimate of the items to move</li>
          <li>Stairs, elevators, parking, or longer carries</li>
          <li>Whether you need packing, loading, or unloading help</li>
        </ul>
      </section>

      <section class="moving-day" aria-labelledby="moving-day-heading">
        <div class="moving-day-inner">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&amp;fit=crop&amp;w=1000&amp;q=85"
            alt="A bright living room ready for a fresh start"
            loading="lazy"
          />
          <div>
            <p class="eyebrow">From one home to the next</p>
            <h2 id="moving-day-heading">A little preparation makes room for a fresh start.</h2>
            <p>Once you’ve discussed your move, take time to label boxes by room and set aside the things you’ll need right away. Keep important documents, medications, and valuables with you.</p>
            <p>Before moving day, confirm the schedule, parking and building access, and any items needing special attention. If your plans change, share the update so the details can be reviewed together.</p>
            <router-link class="service-link" to="/freshstart/services">Explore moving services <span aria-hidden="true">↗</span></router-link>
          </div>
        </div>
      </section>

      <section class="day-guide" aria-labelledby="day-guide-heading">
        <div class="day-guide-inner">
          <p class="eyebrow">What to expect</p>
          <h2 id="day-guide-heading">Keep the day moving smoothly.</h2>
          <div class="guide-grid">
            <article><span>01</span><h3>Before arrival</h3><p>Clear walkways, check elevator or parking arrangements, and separate items that won’t be going on the truck. Confirm any packing or preparation included in your plan.</p></article>
            <article><span>02</span><h3>At pickup</h3><p>Walk through the home and point out large items, fragile belongings, and access challenges. Review any questions about loading or handling before work begins.</p></article>
            <article><span>03</span><h3>At your new home</h3><p>Share where boxes and furniture should go, and check that your agreed services are complete. Keep first-day essentials nearby as you settle in.</p></article>
          </div>
          <p class="guide-note">The services provided, schedule, and pricing depend on your individual agreement. Review your written estimate before booking.</p>
        </div>
      </section>

      <section class="bottom-cta">
        <h2>Ready to talk through your move?</h2>
        <router-link class="button" to="/freshstart/get-started">Plan your move <span aria-hidden="true">↗</span></router-link>
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
.page-hero h1 { margin:0; font-size:clamp(40px,5vw,62px); letter-spacing:-2.7px; line-height:1.04; }
.page-hero h1 em { color:var(--blue); }
.hero-copy > p:last-child { max-width:500px; margin:20px 0 0; color:var(--muted); font-size:13px; line-height:1.85; }
.journey-art { position:relative; height:270px; overflow:hidden; background:linear-gradient(180deg,#e1edf4,#f7f9fa); }
.journey-sun { position:absolute; top:25px; right:47px; width:58px; height:58px; border-radius:50%; background:#e8c986; animation:journey-sunrise 5s ease-in-out infinite; }
.journey-path { position:absolute; top:57%; right:14%; left:13%; height:2px; border-top:2px dashed #88a9bd; animation:path-flow 1.8s linear infinite; }
.journey-home { position:absolute; bottom:37px; width:57px; height:49px; display:grid; place-items:center; background:#fff; box-shadow:0 8px 18px #21384a15; }
.journey-home::before { position:absolute; top:-21px; width:43px; height:43px; background:#477a9c; content:""; clip-path:polygon(50% 0,100% 100%,0 100%); }
.journey-home span { position:relative; z-index:1; margin-top:-1px; color:#477a9c; font-size:21px; }
.journey-start { left:9%; }
.journey-end { right:9%; transform:scale(.88); }
.journey-end::before { background:#7e9fb3; }
.journey-end span { color:#7e9fb3; }
.journey-truck { position:absolute; z-index:2; top:51%; left:22%; width:69px; height:36px; animation:truck-trip 5s ease-in-out infinite; }
.truck-box { position:absolute; left:0; bottom:7px; width:43px; height:28px; border-radius:2px 2px 0 0; background:#3e78a0; }
.truck-cab { position:absolute; right:0; bottom:7px; width:24px; height:21px; border-radius:2px 8px 0 0; background:#d7ad70; }
.truck-cab::after { position:absolute; top:4px; right:4px; width:12px; height:8px; background:#e7f1f5; content:""; }
.journey-truck i,.journey-truck b { position:absolute; bottom:0; width:13px; height:13px; border:3px solid #fff; border-radius:50%; background:#354c5c; }
.journey-truck i { left:8px; }
.journey-truck b { right:5px; }
.journey-spark { position:absolute; color:#477a9c; animation:sparkle 2.8s ease-in-out infinite; }
.journey-spark-one { top:27%; left:25%; }
.journey-spark-two { top:38%; right:19%; animation-delay:-1.4s; }
@keyframes truck-trip { 0%,8% { transform:translateX(0); } 75%,92% { transform:translateX(175px); } 100% { transform:translateX(0); } }
@keyframes path-flow { to { border-color:#d7ad70; } }
@keyframes journey-sunrise { 0%,100% { transform:translateY(7px); } 50% { transform:translateY(-5px); } }
@keyframes sparkle { 0%,100% { opacity:.4; transform:scale(.8) rotate(0); } 50% { opacity:1; transform:scale(1.2) rotate(35deg); } }
.steps { max-width:920px; margin:0 auto; padding:60px 28px; }
.steps article { display:grid; grid-template-columns:70px 1fr; gap:20px; padding:26px 0; border-bottom:1px solid #e1e9ee; }
.steps article > span { color:var(--blue); font-family:Georgia,"Times New Roman",serif; font-size:30px; }
.steps h2,.prep h2,.bottom-cta h2 { margin:0 0 10px; font-size:24px; }
.steps p { max-width:650px; margin:0; color:var(--muted); font-size:13px; line-height:1.85; }
.prep { padding:54px max(28px,calc((100% - 850px)/2)); background:#edf3f7; }
.prep ul { display:grid; grid-template-columns:repeat(2,1fr); gap:12px 30px; margin:0; padding-left:20px; color:var(--muted); font-size:13px; line-height:1.7; }
.prep li::marker { color:var(--blue); }
.moving-day { padding:75px 28px; }
.moving-day-inner { max-width:1084px; margin:auto; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:56px; }
.moving-day img { display:block; width:100%; height:340px; object-fit:cover; }
.moving-day h2,.day-guide h2 { margin:0 0 18px; font-size:clamp(29px,3vw,40px); line-height:1.15; }
.moving-day-inner > div > p:not(.eyebrow) { color:var(--muted); font-size:14px; line-height:1.8; }
.content-page .service-link { display:inline-block; margin-top:8px; color:#315f7e; font-size:13px; font-weight:700; }
.service-link:hover { text-decoration:underline; }
.day-guide { padding:70px 28px; background:#f7f3ec; }
.day-guide-inner { max-width:1084px; margin:auto; }
.guide-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:30px; }
.guide-grid article { padding:26px; border-top:4px solid #7da8c0; background:#fff; }
.guide-grid span { color:var(--blue); font-size:12px; font-weight:700; }
.guide-grid h3 { margin:15px 0 10px; font:400 21px Georgia,"Times New Roman",serif; }
.guide-grid p,.guide-note { margin:0; color:#526a79; font-size:13px; line-height:1.8; }
.guide-note { margin-top:24px; }
.bottom-cta { padding:62px 24px 70px; text-align:center; }
.button { display:inline-flex; min-height:46px; align-items:center; gap:18px; margin-top:12px; padding:0 19px; color:#fff; background:var(--blue); font-size:11px; font-weight:700; text-decoration:none; }
.button:hover { background:#21384a; }
@media(max-width:760px) { .hero-inner,.moving-day-inner,.guide-grid { grid-template-columns:1fr; } .hero-inner { gap:22px; } .moving-day-inner { gap:28px; } .moving-day,.day-guide { padding:54px 24px; } .moving-day img { height:240px; } .journey-art { height:235px; } .journey-truck { animation-name:truck-trip-mobile; } }
@keyframes truck-trip-mobile { 0%,8% { transform:translateX(0); } 75%,92% { transform:translateX(min(36vw,150px)); } 100% { transform:translateX(0); } }
@media(max-width:600px) { .page-hero { padding:40px 24px; } .page-hero h1 { font-size:42px; } .steps article { grid-template-columns:48px 1fr; gap:12px; } .prep ul { grid-template-columns:1fr; } }
@media(prefers-reduced-motion:reduce) { .journey-art *, .journey-art *::before { animation:none !important; } }
</style>