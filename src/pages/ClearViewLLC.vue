<template>
  <main class="clearview-page">
    <header class="site-header">
      <a class="brand" href="#home" aria-label="ClearView Solutions LLC home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M7 7h26v26H7z" />
            <path d="M20 7v26M7 20h26" />
            <path d="M10 10h9v9h-9zM21 10h9v9h-9zM10 21h9v9h-9zM21 21h9v9h-9z" />
          </svg>
        </span>
        <span class="brand-name">ClearView Solutions <span>LLC</span></span>
      </a>

      <nav class="main-nav" aria-label="Main navigation">
        <a href="#services">Services</a>
        <a href="#our-approach">Our approach</a>
        <a href="#contact">Contact</a>
      </nav>

      <a class="header-cta" href="#contact">
        <span>Let’s talk</span>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10h12M10 4l6 6-6 6" />
        </svg>
      </a>
    </header>

    <section id="home" class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> Thoughtful window solutions</p>
        <h1>A clearer view<br />starts <em>here.</em></h1>
        <p class="hero-description">
          Bring more light, comfort, and character to your space with window
          solutions designed around the way you live and work.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="#contact">
            Start a conversation
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h12M10 4l6 6-6 6" />
            </svg>
          </a>
          <a class="text-link" href="#services">Discover our services</a>
        </div>
        <div class="hero-note">
          <span class="note-icon" aria-hidden="true">✳</span>
          <p>Considered details. A better everyday view.</p>
        </div>
      </div>

      <div class="hero-visual">
        <svg class="window-scene" viewBox="0 0 680 500" role="img" aria-labelledby="window-title window-description">
          <title id="window-title">A bright view through a ClearView window</title>
          <desc id="window-description">A simple four-pane window looking out onto a green garden and distant hills.</desc>
          <defs>
            <linearGradient id="window-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#dcefeb" />
              <stop offset="1" stop-color="#f4eddb" />
            </linearGradient>
            <linearGradient id="window-hills" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#92b29b" />
              <stop offset="1" stop-color="#527d69" />
            </linearGradient>
            <clipPath id="window-view">
              <rect x="78" y="54" width="524" height="360" />
            </clipPath>
          </defs>
          <rect width="680" height="500" fill="#f3f0e8" />
          <rect x="45" y="25" width="590" height="415" fill="#fff" />
          <g clip-path="url(#window-view)">
            <rect x="78" y="54" width="524" height="360" fill="url(#window-sky)" />
            <circle cx="492" cy="132" r="39" fill="#f2d79e" />
            <path d="M78 281 192 178l101 90 95-112 122 123 92-75v210H78V281Z" fill="#afc7ad" />
            <path d="m78 311 113-80 107 87 116-92 105 89 83-48v147H78V311Z" fill="url(#window-hills)" />
            <path d="M78 348c79-29 142-22 211 5 78-34 176-21 313 10v51H78v-66Z" fill="#47745f" />
            <g fill="#63856b">
              <path d="m127 329 27-71 28 71h-15l22 43h-64l22-43h-20Z" />
              <path d="m510 324 22-58 23 58h-13l18 36h-53l18-36h-15Z" />
            </g>
          </g>
          <path d="M340 54v360M78 234h524" stroke="#fff" stroke-width="12" />
          <path d="M61 42h558v384H61z" fill="none" stroke="#fff" stroke-width="22" />
          <path d="M43 442h594v18H43z" fill="#d4cbbb" />
          <path d="M0 460h680v40H0z" fill="#e5ded1" />
          <path d="M76 461h528" stroke="#c8bda9" stroke-width="2" />
        </svg>
      </div>
    </section>

    <section class="intro-strip" aria-label="What we do">
      <p>Windows shape the way a space feels.</p>
      <span aria-hidden="true"></span>
      <p>Let’s make yours work beautifully.</p>
    </section>

    <section id="services" class="services section-wrap">
      <div class="section-heading">
        <p class="eyebrow"><span></span> What we do</p>
        <h2>Solutions for every<br /><em>kind of view.</em></h2>
        <p class="section-description">
          From a single update to a whole-home refresh, we help you find the
          right fit for your space.
        </p>
      </div>

      <div class="service-grid">
        <article class="service-card">
          <span class="service-number">01</span>
          <span class="service-icon" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <rect x="7" y="7" width="30" height="30" rx="1" />
              <path d="M22 7v30M7 22h30" />
              <path d="m11 11 7 7m15-7-7 7m-15 8 7 7m15-7-7 7" />
            </svg>
          </span>
          <h3>Window replacement</h3>
          <p>Refresh your home with thoughtfully selected windows that feel right for your style and needs.</p>
          <a href="#contact" aria-label="Ask us about window replacement">Explore service <span aria-hidden="true">↗</span></a>
        </article>

        <article class="service-card">
          <span class="service-number">02</span>
          <span class="service-icon" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="M22 5 8 11v10c0 9 5.8 14.9 14 18 8.2-3.1 14-9 14-18V11L22 5Z" />
              <path d="m15 22 5 5 10-11" />
            </svg>
          </span>
          <h3>Repairs &amp; upgrades</h3>
          <p>Make existing windows work better with practical repairs and considered improvements.</p>
          <a href="#contact" aria-label="Ask us about window repairs and upgrades">Explore service <span aria-hidden="true">↗</span></a>
        </article>

        <article class="service-card">
          <span class="service-number">03</span>
          <span class="service-icon" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <path d="M7 37V9h30v28H7Z" />
              <path d="M13 37V15h18v22M22 15v22M13 22h18" />
              <path d="M4 37h36" />
            </svg>
          </span>
          <h3>New installations</h3>
          <p>Bring a new build or renovation together with window options chosen for the bigger picture.</p>
          <a href="#contact" aria-label="Ask us about new window installations">Explore service <span aria-hidden="true">↗</span></a>
        </article>
      </div>
    </section>

    <section id="our-approach" class="approach">
      <div class="approach-art" aria-hidden="true">
        <div class="art-frame">
          <div class="art-pane art-pane-one"></div>
          <div class="art-pane art-pane-two"></div>
          <div class="art-pane art-pane-three"></div>
          <div class="art-pane art-pane-four"></div>
        </div>
        <span class="art-sun"></span>
        <span class="art-leaf art-leaf-one"></span>
        <span class="art-leaf art-leaf-two"></span>
      </div>
      <div class="approach-copy">
        <p class="eyebrow"><span></span> The ClearView approach</p>
        <h2>Good work begins<br />with <em>listening.</em></h2>
        <p>
          Every space is different. We start by understanding what matters to
          you, then help make the next steps clear—from choosing an option to
          bringing the details together.
        </p>
        <a class="text-link" href="#contact">Tell us about your project <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <section id="contact" class="contact">
      <div class="contact-content">
        <p class="eyebrow"><span></span> Your next chapter starts here</p>
        <h2>Let’s open up<br />the <em>possibilities.</em></h2>
        <p>Have a project in mind? Explore our services and find a thoughtful next step for your space.</p>
        <a class="button button-light" href="#services">
          Explore services
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4 10h12M10 4l6 6-6 6" />
          </svg>
        </a>
      </div>
      <div class="contact-mark" aria-hidden="true">
        <svg viewBox="0 0 180 180" fill="none">
          <rect x="18" y="18" width="144" height="144" rx="2" />
          <path d="M90 18v144M18 90h144" />
          <path d="M31 31h46v46H31zM103 31h46v46h-46zM31 103h46v46H31zM103 103h46v46h-46z" />
        </svg>
      </div>
    </section>

    <footer class="site-footer">
      <a class="brand footer-brand" href="#home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M7 7h26v26H7zM20 7v26M7 20h26" />
          </svg>
        </span>
        <span class="brand-name">ClearView Solutions <span>LLC</span></span>
      </a>
      <p>Thoughtful window solutions. A clearer view.</p>
      <a class="back-top" href="#home">Back to top ↑</a>
    </footer>
  </main>
</template>

<style scoped>
.clearview-page {
  --ink: #183b3a;
  --muted: #657674;
  --teal: #2d7770;
  --line: #dce6e1;
  --cream: #f6f5ef;
  color: var(--ink);
  background: #fff;
  font-family: Inter, "Avenir Next", Avenir, "Segoe UI", sans-serif;
}

.clearview-page *,
.clearview-page *::before,
.clearview-page *::after {
  box-sizing: border-box;
}

.clearview-page a {
  color: inherit;
  text-decoration: none;
}

.clearview-page a:focus-visible {
  outline: 3px solid #f3ad61;
  outline-offset: 4px;
}

.site-header {
  height: 86px;
  padding: 0 clamp(24px, 7.4vw, 112px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #edf0eb;
  background: #fff;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand-mark {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  color: var(--teal);
}

.brand-mark svg {
  width: 100%;
  stroke: currentColor;
  stroke-width: 1.7;
}

.brand-name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.45px;
}

.brand-name > span {
  color: var(--muted);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.5px;
  margin-left: 3px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: clamp(22px, 3.4vw, 52px);
  margin-left: auto;
  margin-right: clamp(24px, 4vw, 60px);
}

.main-nav a,
.header-cta {
  font-size: 12px;
  font-weight: 600;
}

.main-nav a {
  color: #526663;
  transition: color 180ms ease;
}

.main-nav a:hover,
.text-link:hover,
.service-card a:hover {
  color: var(--teal);
}

.header-cta,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.header-cta {
  min-height: 42px;
  padding: 0 17px;
  color: #fff !important;
  background: var(--ink);
  transition: background 180ms ease;
}

.header-cta:hover {
  background: var(--teal);
}

.header-cta svg,
.button svg {
  width: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
}

.hero {
  max-width: 1440px;
  min-height: 600px;
  margin: 0 auto;
  padding: 62px clamp(24px, 9.7vw, 140px) 72px;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  align-items: center;
  gap: clamp(30px, 5vw, 76px);
}

.hero-copy {
  padding: 16px 0 0;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 21px;
  color: var(--teal);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.65px;
  line-height: 1.5;
  text-transform: uppercase;
}

.eyebrow > span {
  width: 19px;
  height: 1px;
  background: currentColor;
}

.hero h1,
.section-heading h2,
.approach-copy h2,
.contact h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -2.7px;
}

.hero h1 {
  font-size: clamp(54px, 6vw, 82px);
  line-height: 1.02;
}

.hero h1 em,
.section-heading h2 em,
.approach-copy h2 em,
.contact h2 em {
  color: var(--teal);
  font-weight: 400;
}

.hero-description {
  max-width: 415px;
  margin: 23px 0 27px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 23px;
}

.button {
  min-height: 49px;
  padding: 0 20px;
  font-size: 11px;
  font-weight: 650;
  transition: background 180ms ease, transform 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  color: #fff !important;
  background: var(--teal);
}

.button-primary:hover {
  background: var(--ink);
}

.text-link {
  color: var(--ink);
  font-size: 11px;
  font-weight: 650;
  transition: color 180ms ease;
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: 48px;
  color: #6c7b75;
}

.hero-note p {
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.2px;
}

.note-icon {
  color: #bd9e68;
  font-size: 19px;
}

.hero-visual {
  width: 100%;
  aspect-ratio: 1.36;
  overflow: hidden;
  background: #e4ece4;
}

.window-scene {
  display: block;
  width: 100%;
  height: 100%;
}

.intro-strip {
  min-height: 90px;
  padding: 22px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background: var(--cream);
  color: #52645f;
}

.intro-strip p {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  font-style: italic;
}

.intro-strip > span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #bf9b64;
}

.section-wrap {
  max-width: 1230px;
  margin: 0 auto;
  padding: 112px 36px 120px;
}

.section-heading {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  column-gap: 44px;
}

.section-heading .eyebrow {
  grid-column: 1 / -1;
  margin-bottom: 18px;
}

.section-heading h2,
.approach-copy h2,
.contact h2 {
  font-size: clamp(42px, 4.7vw, 60px);
  line-height: 1.06;
}

.section-description {
  max-width: 340px;
  margin: 0 0 4px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.85;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 19px;
  margin-top: 57px;
}

.service-card {
  position: relative;
  min-height: 258px;
  padding: 29px 26px 25px;
  border: 1px solid var(--line);
  transition: border-color 180ms ease, transform 180ms ease;
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: #9abdb1;
}

.service-number {
  position: absolute;
  top: 29px;
  right: 26px;
  color: #9baaa3;
  font-size: 9px;
  letter-spacing: 1px;
}

.service-icon {
  display: block;
  width: 42px;
  height: 42px;
  margin-bottom: 24px;
  color: var(--teal);
}

.service-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.service-card h3 {
  margin: 0 0 10px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 19px;
  font-weight: 400;
}

.service-card p {
  min-height: 58px;
  margin: 0 0 17px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.7;
}

.service-card a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 650;
  transition: color 180ms ease;
}

.service-card a span {
  font-size: 14px;
}

.approach {
  min-height: 475px;
  padding: 76px max(7.5vw, 36px);
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(320px, 0.84fr);
  align-items: center;
  gap: clamp(50px, 9vw, 130px);
  background: var(--cream);
}

.approach-art {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 315px;
  justify-self: end;
  overflow: hidden;
  background: #d9e6dd;
}

.art-frame {
  position: absolute;
  inset: 26px 42px 27px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 7px;
  padding: 9px;
  border: 9px solid #fffdf8;
  background: #fffdf8;
  box-shadow: 0 15px 35px rgba(53, 76, 65, 0.11);
}

.art-pane {
  background: linear-gradient(150deg, #b8d8d5, #e9d8ad);
}

.art-pane-one {
  background: linear-gradient(140deg, #d1e7df 0%, #eff1dc 58%, #b4ccad 59%);
}

.art-pane-two {
  background: linear-gradient(155deg, #cae5df 0%, #f2d9a7 69%, #acc49f 70%);
}

.art-pane-three {
  background: linear-gradient(145deg, #b8d8d2 0%, #edf0d8 55%, #9fb99a 56%);
}

.art-pane-four {
  background: linear-gradient(150deg, #d6e9e3 0%, #f4dfb5 60%, #b1c8a6 61%);
}

.art-sun {
  position: absolute;
  top: 41px;
  right: 74px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #f3d797;
}

.art-leaf {
  position: absolute;
  bottom: -20px;
  left: 14px;
  width: 83px;
  height: 150px;
  border-left: 2px solid #60826c;
  border-radius: 50%;
  transform: rotate(22deg);
}

.art-leaf::before,
.art-leaf::after {
  position: absolute;
  width: 35px;
  height: 18px;
  border-radius: 100% 0 100% 0;
  background: #78977e;
  content: "";
}

.art-leaf::before {
  top: 39px;
  left: 8px;
  transform: rotate(-25deg);
}

.art-leaf::after {
  top: 83px;
  left: -34px;
  transform: rotate(30deg) scaleX(-1);
}

.art-leaf-two {
  left: 40px;
  transform: rotate(-8deg) scale(0.72);
  transform-origin: bottom;
}

.approach-copy {
  max-width: 430px;
}

.approach-copy .eyebrow {
  margin-bottom: 19px;
}

.approach-copy > p:not(.eyebrow) {
  max-width: 390px;
  margin: 21px 0 23px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.9;
}

.approach-copy .text-link span {
  margin-left: 8px;
  font-size: 14px;
}

.contact {
  position: relative;
  min-height: 375px;
  padding: 77px clamp(30px, 12vw, 175px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  color: #fff;
  background: var(--ink);
}

.contact-content {
  position: relative;
  z-index: 1;
  max-width: 515px;
}

.contact .eyebrow {
  color: #a5c7b9;
  margin-bottom: 17px;
}

.contact h2 {
  color: #fff;
}

.contact h2 em {
  color: #a5c7b9;
}

.contact-content > p:not(.eyebrow) {
  max-width: 390px;
  margin: 18px 0 21px;
  color: #cfdbd4;
  font-size: 12px;
  line-height: 1.8;
}

.button-light {
  color: var(--ink) !important;
  background: #f7f5ed;
}

.button-light:hover {
  background: #dce9e1;
}

.contact-mark {
  width: clamp(150px, 22vw, 250px);
  color: rgba(201, 223, 212, 0.22);
}

.contact-mark svg {
  width: 100%;
  stroke: currentColor;
  stroke-width: 1;
}

.site-footer {
  min-height: 80px;
  padding: 18px clamp(24px, 7.4vw, 112px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: #fff;
}

.footer-brand .brand-mark {
  width: 31px;
  height: 31px;
}

.footer-brand .brand-name {
  font-size: 12px;
}

.site-footer > p,
.back-top {
  color: var(--muted);
  font-size: 10px;
}

.site-footer > p {
  margin: 0;
}

.back-top {
  font-weight: 600;
}

@media (max-width: 900px) {
  .hero {
    min-height: 0;
    padding: 56px 6vw 64px;
    grid-template-columns: minmax(0, 1fr);
    gap: 38px;
  }

  .hero-copy {
    max-width: 620px;
  }

  .hero-visual {
    width: 100%;
    max-width: 760px;
    aspect-ratio: 1.36;
    justify-self: center;
  }

  .approach {
    gap: 55px;
  }
}

@media (max-width: 700px) {
  .site-header {
    height: auto;
    min-height: 76px;
    padding: 16px 22px;
    flex-wrap: wrap;
    row-gap: 15px;
  }

  .brand-name {
    font-size: 14px;
  }

  .main-nav {
    order: 3;
    width: 100%;
    justify-content: space-between;
    gap: 12px;
    margin: 0;
  }

  .main-nav a {
    font-size: 11px;
  }

  .header-cta {
    min-height: 37px;
    padding: 0 13px;
    font-size: 11px;
  }

  .hero {
    padding: 55px 24px 48px;
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .hero-copy {
    padding: 0;
  }

  .hero h1 {
    font-size: clamp(54px, 13vw, 76px);
  }

  .hero-description {
    max-width: 470px;
  }

  .hero-note {
    margin-top: 30px;
  }

  .hero-visual {
    min-height: 0;
  }

  .intro-strip {
    min-height: 78px;
    gap: 13px;
  }

  .intro-strip p {
    font-size: 13px;
    text-align: center;
  }

  .section-wrap {
    padding: 78px 24px 84px;
  }

  .section-heading {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .section-heading .eyebrow {
    margin-bottom: 3px;
  }

  .section-description {
    max-width: 420px;
  }

  .service-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 34px;
  }

  .service-card {
    min-height: 0;
    padding: 23px;
  }

  .service-icon {
    margin-bottom: 18px;
  }

  .service-card p {
    min-height: 0;
    max-width: 430px;
  }

  .approach {
    padding: 62px 24px 72px;
    grid-template-columns: 1fr;
    gap: 39px;
  }

  .approach-art {
    height: min(315px, 70vw);
    min-height: 245px;
    justify-self: stretch;
  }

  .approach-copy {
    max-width: 540px;
  }

  .contact {
    min-height: 345px;
    padding: 63px 25px;
  }

  .contact-mark {
    position: absolute;
    right: -48px;
    bottom: -31px;
    width: 190px;
    opacity: 0.65;
  }

  .site-footer {
    padding: 19px 22px;
    flex-wrap: wrap;
  }

  .site-footer > p {
    order: 3;
    width: 100%;
  }
}

@media (max-width: 390px) {
  .brand-mark {
    width: 31px;
    height: 31px;
  }

  .brand-name {
    font-size: 12px;
  }

  .brand-name > span {
    font-size: 9px;
  }

  .hero-actions {
    gap: 17px;
  }

  .hero-visual {
    min-height: 0;
  }

  .intro-strip {
    flex-direction: column;
    gap: 8px;
  }

  .intro-strip > span {
    display: none;
  }

  .art-frame {
    inset: 28px 28px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .clearview-page *,
  .clearview-page *::before,
  .clearview-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

<script setup>
            document.getElementById("loading__container").style.display = "none";

</script>