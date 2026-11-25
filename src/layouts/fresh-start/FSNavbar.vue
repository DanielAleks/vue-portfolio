<template>
  <header class="fs-header">
    <router-link class="fs-brand" to="/freshstart" aria-label="Fresh Start Moving LLC home">
      <span class="fs-brand-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M7 25.5 24 11l17 14.5" />
          <path d="M12 23v17h24V23M20 40V28h8v12" />
          <path d="M33 15V9h5v10" />
        </svg>
      </span>
      <span class="fs-brand-name">Fresh Start <small>Moving LLC</small></span>
    </router-link>

    <nav class="fs-nav" aria-label="Main navigation">
      <router-link to="/freshstart">Home</router-link>
      <router-link to="/freshstart/services">Services</router-link>
      <router-link to="/freshstart/how-it-works">How it works</router-link>
      <router-link to="/freshstart/about">About Us</router-link>
      <router-link to="/freshstart/contact">Contact</router-link>
    </nav>

    <router-link class="fs-header-cta" to="/freshstart/get-started">
      Plan your move <span aria-hidden="true">↗</span>
    </router-link>
  </header>
</template>

<style scoped>
.fs-header {
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 82px;
  padding: 0 clamp(22px, 7vw, 104px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  border-bottom: 1px solid #edf1f4;
  color: #21384a;
  background: #fff;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.fs-header *,
.fs-header *::before,
.fs-header *::after {
  box-sizing: border-box;
}

.fs-header a {
  color: inherit;
  text-decoration: none;
}

.fs-header a:focus-visible {
  outline: 3px solid #d5a755;
  outline-offset: 4px;
}

.fs-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.fs-brand-icon {
  width: 39px;
  height: 39px;
  color: #3e78a0;
}

.fs-brand-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fs-brand-name {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.fs-brand-name small {
  display: block;
  margin-top: 2px;
  color: #627482;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.fs-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px clamp(16px, 2vw, 30px);
  margin-left: auto;
}

.fs-nav a,
.fs-header-cta {
  font-size: 12px;
  font-weight: 650;
}

.fs-nav a:hover,
.fs-nav a.router-link-exact-active {
  color: #3e78a0;
}

.fs-header-cta {
  display: inline-flex;
  min-height: 42px;
  flex-shrink: 0;
  align-items: center;
  gap: 14px;
  padding: 0 16px;
  color: #fff !important;
  background: #21384a;
  transition: background 180ms ease;
}

.fs-header-cta:hover {
  background: #3e78a0;
}

@media (max-width: 900px) {
  .fs-header {
    min-height: 70px;
    flex-wrap: wrap;
    gap: 0 16px;
    padding: 14px 24px;
  }

  .fs-nav {
    order: 3;
    width: 100%;
    margin: 15px 0 0;
    padding-top: 13px;
    border-top: 1px solid #edf1f4;
  }

  .fs-header-cta {
    min-height: 39px;
    margin-left: auto;
    padding: 0 12px;
    font-size: 11px;
  }
}
</style>
