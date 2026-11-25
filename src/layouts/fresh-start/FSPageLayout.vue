<template>
  <div class="fs-page">
    <FSNavbar />

    <slot />

    <footer class="fs-footer">
      <router-link class="fs-footer-brand" to="/freshstart">
        Fresh Start <span>Moving LLC</span>
      </router-link>
      <p>Helping you get home to what’s next.</p>
      <router-link to="/freshstart">Home ↑</router-link>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import FSNavbar from "./FSNavbar.vue";

onMounted(() => {
  const loader = document.getElementById("loading__container");
  if (loader) {
    loader.style.display = "none";
  }
});
</script>

<style scoped>
.fs-page {
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

.fs-page *,
.fs-page *::before,
.fs-page *::after {
  box-sizing: border-box;
}

.fs-page a {
  color: inherit;
  text-decoration: none;
}

.fs-page a:focus-visible {
  outline: 3px solid #d5a755;
  outline-offset: 4px;
}

.fs-footer a:hover {
  color: var(--blue);
}

.fs-footer {
  min-height: 72px;
  padding: 18px clamp(22px, 7vw, 104px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #dce6ed;
  background: var(--ink);
}

.fs-footer-brand {
  color: #fffdf7 !important;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 14px;
  font-weight: 700;
}

.fs-footer-brand span {
  color: #a8c9e0;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 10px;
  font-weight: 500;
}

.fs-footer p,
.fs-footer > a:last-child {
  margin: 0;
  color: #c1d0da;
  font-size: 10px;
}

@media (max-width: 650px) {
  .fs-footer {
    align-items: flex-start;
    flex-direction: column;
    padding: 22px 24px;
  }
}
</style>
