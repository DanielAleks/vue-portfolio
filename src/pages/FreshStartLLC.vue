<template>
  <main class="fresh-start-page">
    <FSNavbar />

    <section id="home" class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> A fresh start, made easier</p>
        <h1>Your next chapter<br />starts <em>at home.</em></h1>
        <p class="hero-description">
          A home move is a big step. Get a helping hand with the packing,
          lifting, and getting everything safely to your new place.
        </p>
        <div class="hero-actions">
          <router-link class="button button-primary" to="/freshstart/get-started">Plan your move <span aria-hidden="true">↗</span></router-link>
          <a class="text-link" href="#services">See how we can help</a>
        </div>
        <div class="hero-note">
          <span aria-hidden="true">✳</span>
          <p>Friendly help for your move, from start to finish.</p>
        </div>
      </div>

      <div class="hero-photo">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&amp;fit=crop&amp;w=1400&amp;q=85"
          alt="A bright, welcoming living room ready for a fresh start"
        />
        <span class="photo-caption"><span aria-hidden="true">✳</span> A new place to call home</span>
      </div>
    </section>

    <section class="promise-strip" aria-label="Our moving service">
      <p>One home to the next.</p>
      <span aria-hidden="true"></span>
      <p>We’ll help you get there.</p>
    </section>

    <section id="services" class="services section-wrap">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span></span> Moving day support</p>
          <h2>Help with the whole<br /><em>home move.</em></h2>
        </div>
        <p class="section-description">
          Whether you need help with the heavy lifting or support with the
          details, we’ll make a plan that fits your move.
        </p>
      </div>

      <div class="service-grid">
        <article class="service-card">
          <span class="service-number">01</span>
          <span class="service-icon" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="M7 15h30v23H7zM11 15l3-8h16l3 8M7 22h30M17 22v16m10-16v16" />
              <path d="m18 11 4 4 5-6" />
            </svg>
          </span>
          <h3>Packing help</h3>
          <p>Get a hand preparing your belongings and keeping things organized for the trip.</p>
          <router-link class="service-detail-link" to="/freshstart/services/packing-help">Learn about packing help <span aria-hidden="true">↗</span></router-link>
        </article>

        <article class="service-card">
          <span class="service-number">02</span>
          <span class="service-icon" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="M5 17h23v18H5zM28 23h7l5 6v6H28z" />
              <circle cx="13" cy="36" r="3" />
              <circle cx="33" cy="36" r="3" />
              <path d="M10 22h12m-12 5h8" />
            </svg>
          </span>
          <h3>Loading &amp; transport</h3>
          <p>Let us handle the lifting and transportation of your household items to your new home.</p>
          <router-link class="service-detail-link" to="/freshstart/services/loading-transportation">Explore loading and transportation <span aria-hidden="true">↗</span></router-link>
        </article>

        <article class="service-card">
          <span class="service-number">03</span>
          <span class="service-icon" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="m6 20 16-13 16 13v17H6zM17 37V24h10v13" />
              <path d="M29 14h5v6M13 20h5m8 0h5" />
            </svg>
          </span>
          <h3>Unloading &amp; settling in</h3>
          <p>Get your belongings off the truck and into your new place, ready for the next chapter.</p>
          <router-link class="service-detail-link" to="/freshstart/services/unloading-settling">Learn about settling in <span aria-hidden="true">↗</span></router-link>
        </article>
      </div>
    </section>

    <section class="home-services" aria-labelledby="home-services-heading">
      <div class="home-services-inner">
        <div class="home-services-heading">
          <div>
            <p class="eyebrow"><span></span> Care for your space</p>
            <h2 id="home-services-heading">Services we <em>provide.</em></h2>
          </div>
          <p>From a fresh clean to finishing touches, discover more ways to care for your home.</p>
        </div>
        <div class="home-services-grid">
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="1" />
                <path d="M12 4v16M4 12h16M16.5 2v3M15 3.5h3" />
              </svg>
            </span>
            <h3>Cleaning &amp; window cleaning</h3>
            <p>Ask about home cleaning and window-cleaning options for your space.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m13 2-8 12h6l-1 8 9-12h-6l1-8Z" />
              </svg>
            </span>
            <h3>Electrical</h3>
            <p>Electrical service for home projects, subject to availability and applicable licensing.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 6h7l3 3-3 3H4V6Zm10 3h4M8 12v5a2 2 0 0 0 2 2h2" />
                <path d="m19 12 1 1m-2 2 1 1m-3 0 1 1" />
              </svg>
            </span>
            <h3>Pressure washing &amp; exterior care</h3>
            <p>Refresh exterior surfaces with pressure-washing and outdoor upkeep options.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="14" height="7" rx="1" />
                <path d="M17 6h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-6v2m-2 0h4v6h-4z" />
              </svg>
            </span>
            <h3>Drywall &amp; painting</h3>
            <p>Help with drywall touch-ups and painting projects around the home.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m14 4 2-2 5 5-2 2-5-5ZM15 5l-3 3m4 0L6 20l-2 1 1-2L15 7" />
                <path d="m3 13 3-3 3 3-3 3-3-3Z" />
              </svg>
            </span>
            <h3>Carpentry &amp; trim</h3>
            <p>Carpentry repairs and trim work to help finish or refresh your space.</p>
          </article>
          <article class="home-service-card">
            <span class="home-service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m3 11 9-7 9 7M5 10v8h14v-8M3 19h18M18 19v2" />
                <path d="M8 8h8" />
              </svg>
            </span>
            <h3>Roof &amp; gutter maintenance</h3>
            <p>Ask about routine roof and gutter upkeep for your home.</p>
          </article>
        </div>
        <p class="service-note">Service availability and project scope vary. Contact us to discuss your needs.</p>
      </div>
    </section>

    <section id="how-it-works" class="process">
      <div class="process-inner">
        <div class="process-heading">
          <p class="eyebrow"><span></span> A simpler move</p>
          <h2>Three steps to<br /><em>feeling at home.</em></h2>
        </div>
        <div class="steps">
          <article class="step">
            <span class="step-number">01</span>
            <h3>Tell us about your move</h3>
            <p>Share where you’re headed, when you’re moving, and the kind of help you need.</p>
          </article>
          <article class="step">
            <span class="step-number">02</span>
            <h3>Make a moving plan</h3>
            <p>Talk through the details and agree on the services that fit your move.</p>
          </article>
          <article class="step">
            <span class="step-number">03</span>
            <h3>Start fresh</h3>
            <p>We’ll help with moving day so you can focus on settling into your new home.</p>
          </article>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="about-mark" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none">
          <path d="M15 52 50 22l35 30" />
          <path d="M25 47v35h50V47M42 82V58h16v24" />
          <path d="M68 33V20h8v20" />
          <path d="M11 87h78" />
        </svg>
      </div>
      <div class="about-copy">
        <p class="eyebrow"><span></span> A fresh start, together</p>
        <h2>More than boxes.<br /><em>A new beginning.</em></h2>
        <p>
          Fresh Start Moving LLC is here to make the change of home feel a
          little less overwhelming. We believe a thoughtful plan and a helping
          hand can make moving day feel more manageable.
        </p>
        <a class="text-link" href="#contact">Let’s talk about your move <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="contact-inner">
        <p class="eyebrow"><span></span> Your next chapter</p>
        <h2>Ready for a<br /><em>fresh start?</em></h2>
        <p>Tell us a little about your move and the help you’re looking for. We’ll take it from there.</p>
        <a class="button button-light" href="mailto:?subject=Moving%20quote%20request">
          Email us about your move <span aria-hidden="true">↗</span>
        </a>
        <span class="contact-note">Add your business email address to this link before publishing.</span>
      </div>
      <div class="contact-decoration" aria-hidden="true">
        <svg viewBox="0 0 400 270" fill="none">
          <circle cx="200" cy="135" r="127" fill="#DCECF4" />
          <circle cx="297" cy="54" r="27" fill="#F2D59B" />
          <path d="M75 199c32-22 70-32 119-27 56-23 96-20 142 6v38H75v-17Z" fill="#B5D4DF" />
          <path d="M146 118 226 53l80 65v91H146v-91Z" fill="#FAFCF9" />
          <path d="m133 120 93-76 93 76" stroke="#315D78" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M278 85V59h18v41" fill="#315D78" />
          <path d="M212 209v-68h29v68" fill="#C99460" />
          <circle cx="235" cy="175" r="2" fill="#F7E5C8" />
          <path d="M165 137h29v32h-29zM258 137h29v32h-29z" fill="#ADD4E3" stroke="#DCECF4" stroke-width="4" />
          <path d="M179.5 137v32M165 153h29M272.5 137v32M258 153h29" stroke="#F7FBFC" stroke-width="2" />
          <path d="M65 214h273" stroke="#7FAAB9" stroke-width="3" stroke-linecap="round" />
          <path d="M78 166h86v43H78z" fill="#E8C08A" />
          <path d="M107 166h24v10h-24z" fill="#F4DEB7" />
          <path d="M96 130h59v36H96z" fill="#D9A874" />
          <path d="M117 130h17v9h-17z" fill="#F4DEB7" />
          <path d="M317 211v-38m0 14c-11-3-15-10-15-20 10 1 16 7 15 20Zm0 10c10-3 15-10 15-19-10 1-15 7-15 19Z" stroke="#4E8B83" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="m75 92 3-9 3 9 9 3-9 3-3 9-3-9-9-3 9-3ZM337 131l2-6 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#FFF8E9" />
        </svg>
      </div>
    </section>

    <footer class="site-footer">
      <a class="footer-brand" href="#home">Fresh Start <span>Moving LLC</span></a>
      <p>Helping you get home to what’s next.</p>
      <a href="#home">Back to top ↑</a>
    </footer>
  </main>
</template>

<style scoped>
.fresh-start-page {
  --ink: #21384a;
  --muted: #627482;
  --blue: #3e78a0;
  --blue-dark: #2e5b7a;
  --pale-blue: #dceaf2;
  --cream: #f4f7f9;
  --line: #e1e9ee;
  color: var(--ink);
  background: #fff;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.fresh-start-page *,
.fresh-start-page *::before,
.fresh-start-page *::after {
  box-sizing: border-box;
}

.fresh-start-page a {
  color: inherit;
  text-decoration: none;
}

.fresh-start-page a:focus-visible {
  outline: 3px solid #d5a755;
  outline-offset: 4px;
}

.fresh-start-page section[id] {
  scroll-margin-top: 90px;
}

@media (max-width: 900px) {
  .fresh-start-page section[id] {
    scroll-margin-top: 180px;
  }
}

.service-icon svg,
.about-mark svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.text-link {
  transition: color 180ms ease;
}

.text-link:hover {
  color: var(--blue);
}

.hero {
  max-width: 1440px;
  min-height: 580px;
  margin: 0 auto;
  padding: 67px clamp(24px, 9.5vw, 136px) 76px;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(40px, 6vw, 88px);
}

.hero-copy {
  padding: 10px 0;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 19px;
  color: var(--blue);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.7px;
  line-height: 1.5;
  text-transform: uppercase;
}

.eyebrow > span {
  width: 18px;
  height: 1px;
  background: currentColor;
}

.hero h1,
.section-heading h2,
.process-heading h2,
.about-copy h2,
.contact h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -2.7px;
}

.hero h1 {
  font-size: clamp(53px, 6vw, 78px);
  line-height: 1.02;
}

.hero h1 em,
.section-heading h2 em,
.process-heading h2 em,
.about-copy h2 em,
.contact h2 em {
  color: var(--blue);
  font-weight: 400;
}

.hero-description {
  max-width: 430px;
  margin: 22px 0 27px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
}

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 0 19px;
  font-size: 11px;
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  color: #fff !important;
  background: var(--blue);
}

.button-primary:hover {
  background: var(--ink);
}

.text-link {
  font-size: 11px;
  font-weight: 700;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 43px;
  color: var(--muted);
}

.hero-note > span {
  color: #b89357;
  font-size: 19px;
}

.hero-note p {
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.15px;
}

.hero-photo {
  position: relative;
  min-height: 370px;
  aspect-ratio: 1.35;
  overflow: hidden;
  background: #e7eef2;
}

.hero-photo::after {
  position: absolute;
  inset: 45% 0 0;
  background: linear-gradient(transparent, rgba(28, 49, 66, 0.53));
  content: "";
}

.hero-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.photo-caption {
  position: absolute;
  z-index: 1;
  right: 20px;
  bottom: 18px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
  font-style: italic;
}

.photo-caption span {
  color: #e7c982;
}

.promise-strip {
  min-height: 84px;
  padding: 20px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 23px;
  color: #526a7a;
  background: var(--cream);
}

.promise-strip p {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  font-style: italic;
}

.promise-strip > span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #bd985f;
}

.section-wrap {
  max-width: 1220px;
  margin: 0 auto;
  padding: 105px 36px 100px;
}

.section-heading {
  display: grid;
  grid-template-columns: 1fr 0.75fr;
  align-items: end;
  gap: 50px;
}

.section-heading h2,
.process-heading h2,
.about-copy h2,
.contact h2 {
  font-size: clamp(41px, 4.7vw, 59px);
  line-height: 1.06;
}

.section-description {
  max-width: 390px;
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.85;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 52px;
}

.service-card {
  position: relative;
  min-height: 255px;
  padding: 27px 25px 24px;
  border: 1px solid var(--line);
  transition: transform 180ms ease, border-color 180ms ease;
}

.service-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #3e78a0, #7eb5d4, #d6b77c);
  content: "";
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: #9bbbd0;
}

.service-number {
  position: absolute;
  top: 25px;
  right: 24px;
  color: #98aab6;
  font-size: 9px;
  letter-spacing: 1px;
}

.service-icon {
  display: block;
  width: 42px;
  height: 42px;
  margin-bottom: 24px;
  color: var(--blue);
}

.service-icon svg {
  stroke-width: 1.5;
}

.service-card h3,
.step h3 {
  margin: 0 0 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 19px;
  font-weight: 400;
}

.service-card p,
.step p {
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.75;
}

.fresh-start-page .service-detail-link {
  display: inline-block;
  margin-top: 18px;
  color: var(--blue-dark);
  font-size: 12px;
  font-weight: 700;
}

.service-detail-link:hover {
  text-decoration: underline;
}

.home-services {
  padding: 82px 36px 88px;
  background: #eaf2f7;
}

.home-services-inner {
  max-width: 1148px;
  margin: 0 auto;
}

.home-services-heading {
  display: grid;
  grid-template-columns: 1fr 0.75fr;
  align-items: end;
  gap: 50px;
}

.home-services-heading h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(41px, 4.7vw, 59px);
  font-weight: 400;
  letter-spacing: -2.7px;
  line-height: 1.06;
}

.home-services-heading h2 em {
  color: var(--blue);
  font-weight: 400;
}

.home-services-heading > p {
  max-width: 390px;
  margin: 0 0 4px;
  color: #536e7e;
  font-size: 13px;
  line-height: 1.85;
}

.home-services-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 42px;
}

.home-service-card {
  min-height: 205px;
  padding: 25px;
  border: 1px solid #c6dce9;
  border-top: 5px solid var(--blue);
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(49, 90, 120, 0.08);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.home-service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 26px rgba(49, 90, 120, 0.15);
}

.home-service-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  margin-bottom: 20px;
  border-radius: 50%;
  color: var(--blue);
  background: rgba(62, 120, 160, 0.3);
}

.home-service-icon svg {
  width: 23px;
  height: 23px;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.home-service-card h3 {
  margin: 0 0 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 19px;
  font-weight: 400;
}

.home-service-card p {
  margin: 0;
  color: #445e6f;
  font-size: 12px;
  line-height: 1.75;
}

.service-note {
  margin: 20px 0 0;
  color: var(--muted);
  font-size: 11px;
  text-align: center;
}

.process {
  padding: 85px clamp(28px, 8vw, 112px) 92px;
  background: var(--ink);
}

.process-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.process .eyebrow {
  color: #a8c9e0;
}

.process-heading h2 {
  color: #fffdf7;
}

.process-heading h2 em {
  color: #b7d5e8;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 38px;
  margin-top: 48px;
}

.step {
  padding-top: 17px;
  border-top: 1px solid #718797;
}

.step-number {
  display: block;
  margin-bottom: 20px;
  color: #a8c9e0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
}

.step h3 {
  color: #fffdf7;
  font-size: 17px;
}

.step p {
  max-width: 300px;
  color: #c1d0da;
}

.about {
  min-height: 390px;
  padding: 78px max(8vw, 36px);
  display: grid;
  grid-template-columns: minmax(250px, 0.8fr) minmax(320px, 1fr);
  align-items: center;
  gap: clamp(45px, 9vw, 125px);
  background: #edf3f7;
}

.about-mark {
  width: min(100%, 330px);
  aspect-ratio: 1;
  justify-self: end;
  padding: 28px;
  color: var(--blue);
  background: var(--pale-blue);
}

.about-mark svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.4;
}

.about-copy {
  max-width: 470px;
}

.about-copy > p:not(.eyebrow) {
  margin: 19px 0 20px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.85;
}

.contact {
  position: relative;
  min-height: 400px;
  padding: 72px clamp(28px, 9vw, 130px);
  overflow: hidden;
  color: #fff;
  background: var(--blue);
}

.contact-inner {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
}

.contact .eyebrow {
  color: #d8e8f1;
}

.contact h2 em {
  color: #d7e6f0;
}

.contact-inner > p:not(.eyebrow) {
  max-width: 400px;
  margin: 17px 0 23px;
  color: #e4edf2;
  font-size: 13px;
  line-height: 1.8;
}

.button-light {
  color: var(--blue-dark) !important;
  background: #fffdf7;
}

.button-light:hover {
  background: #e6eff4;
}

.contact-note {
  display: block;
  margin-top: 10px;
  color: #e4edf2;
  font-size: 10px;
}

.contact-decoration {
  position: absolute;
  right: max(7vw, calc((100% - 1100px) / 2));
  top: 50%;
  width: min(36%, 390px);
  transform: translateY(-50%);
}

.contact-decoration svg {
  display: block;
  width: 100%;
  height: auto;
}

.site-footer {
  min-height: 72px;
  padding: 18px clamp(22px, 7vw, 104px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #dce6ed;
  background: #21384a;
}

.footer-brand {
  color: #fffdf7 !important;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 14px;
  font-weight: 700;
}

.footer-brand span {
  color: #a8c9e0;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 10px;
  font-weight: 500;
}

.site-footer p,
.site-footer > a:last-child {
  margin: 0;
  color: #c1d0da;
  font-size: 10px;
}

@media (max-width: 850px) {
  .hero {
    min-height: auto;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    padding-top: 58px;
    padding-bottom: 60px;
  }

  .hero-photo {
    min-height: 300px;
  }

  .about {
    gap: 45px;
  }

  .contact-decoration {
    position: relative;
    right: auto;
    top: auto;
    width: min(100%, 300px);
    margin: 20px auto -25px;
    transform: none;
  }
}

@media (max-width: 650px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 48px 24px 45px;
  }

  .hero h1 {
    font-size: clamp(49px, 13vw, 68px);
  }

  .hero-photo {
    min-height: 280px;
  }

  .promise-strip {
    gap: 13px;
  }

  .promise-strip p {
    font-size: 14px;
  }

  .section-wrap {
    padding: 72px 24px;
  }

  .home-services {
    padding: 68px 24px;
  }

  .home-services-heading {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .home-services-heading h2 {
    font-size: 45px;
  }

  .home-services-grid {
    grid-template-columns: 1fr;
    gap: 13px;
    margin-top: 32px;
  }

  .home-service-card {
    min-height: 0;
  }

  .section-heading {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .section-heading h2,
  .process-heading h2,
  .about-copy h2,
  .contact h2 {
    font-size: 45px;
  }

  .service-grid,
  .steps {
    grid-template-columns: 1fr;
    gap: 13px;
    margin-top: 32px;
  }

  .service-card {
    min-height: 0;
  }

  .service-card p {
    max-width: 390px;
  }

  .process {
    padding: 68px 24px;
  }

  .steps {
    gap: 25px;
  }

  .step {
    padding-top: 12px;
  }

  .step-number {
    margin-bottom: 12px;
  }

  .about {
    grid-template-columns: 1fr;
    padding: 60px 24px;
  }

  .about-mark {
    width: min(100%, 260px);
    justify-self: start;
  }

  .contact {
    min-height: 370px;
    padding: 60px 24px;
  }

  .site-footer {
    align-items: flex-start;
    flex-direction: column;
    padding: 22px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-service-card {
    transition: none;
  }

  .home-service-card:hover {
    transform: none;
  }
}
</style>

<script setup>
import { onMounted } from "vue";
import FSNavbar from "layouts/fresh-start/FSNavbar.vue";

onMounted(() => {
  const loader = document.getElementById("loading__container");
  if (loader) {
    loader.style.display = "none";
  }
});
</script>