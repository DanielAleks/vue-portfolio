<template>
  <FSPageLayout>
    <main class="fs-detail">
      <section class="detail-hero">
        <div class="detail-hero-inner">
          <div>
            <router-link class="detail-back" to="/freshstart/services">← All services</router-link>
            <p class="detail-eyebrow">{{ eyebrow }}</p>
            <h1>{{ title }} <em>{{ accent }}</em></h1>
            <p class="detail-intro">{{ intro }}</p>
          </div>
          <div class="detail-art" aria-hidden="true">
            <div class="detail-art-circle"></div>
            <div class="detail-art-card">
              <span>{{ artNumber }}</span>
              <strong>{{ artTitle }}</strong>
              <small>{{ artCaption }}</small>
            </div>
            <div class="detail-art-spark">✦</div>
          </div>
        </div>
      </section>
      <slot />
    </main>
  </FSPageLayout>
</template>

<script setup>
import FSPageLayout from "./FSPageLayout.vue";

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  accent: { type: String, required: true },
  intro: { type: String, required: true },
  artNumber: { type: String, required: true },
  artTitle: { type: String, required: true },
  artCaption: { type: String, required: true },
});
</script>

<style>
.fs-detail { color:#21384a; font-family:"Helvetica Neue",Arial,sans-serif; }
.fs-detail .detail-hero { padding:48px 28px; overflow:hidden; background:#edf3f7; }
.fs-detail .detail-hero-inner { max-width:1084px; min-height:300px; margin:auto; display:grid; grid-template-columns:1fr .85fr; align-items:center; gap:48px; }
.fs-detail .detail-back { display:inline-block; margin-bottom:30px; color:#315f7e; font-size:12px; font-weight:700; }
.fs-detail .detail-eyebrow { margin:0 0 15px; color:#3e78a0; font-size:11px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; }
.fs-detail h1,.fs-detail h2,.fs-detail h3 { font-family:Georgia,"Times New Roman",serif; font-weight:400; }
.fs-detail h1 { margin:0; font-size:clamp(42px,5vw,62px); letter-spacing:-2px; line-height:1.05; }
.fs-detail h1 em { color:#3e78a0; }
.fs-detail .detail-intro { max-width:520px; margin:20px 0 0; color:#627482; font-size:14px; line-height:1.8; }
.fs-detail .detail-art { position:relative; min-height:255px; display:grid; place-items:center; overflow:hidden; background:linear-gradient(145deg,#dceaf2,#f8fbfc); }
.fs-detail .detail-art-circle { position:absolute; width:190px; height:190px; border:1px dashed #9bbbd0; border-radius:50%; animation:detail-spin 20s linear infinite; }
.fs-detail .detail-art-card { position:relative; width:190px; padding:24px; background:white; box-shadow:0 18px 35px #315a7826; animation:detail-float 4s ease-in-out infinite; }
.fs-detail .detail-art-card span,.fs-detail .detail-art-card strong,.fs-detail .detail-art-card small { display:block; }
.fs-detail .detail-art-card span { color:#3e78a0; font-size:12px; font-weight:700; }
.fs-detail .detail-art-card strong { margin:14px 0 8px; font:24px Georgia,serif; }
.fs-detail .detail-art-card small { color:#627482; line-height:1.5; }
.fs-detail .detail-art-spark { position:absolute; top:36px; right:22%; color:#c49c63; font-size:24px; }
.fs-detail .detail-section { max-width:1084px; margin:auto; padding:72px 28px; }
.fs-detail .detail-section h2 { margin:0 0 18px; font-size:clamp(30px,3vw,42px); line-height:1.15; }
.fs-detail .detail-section > p,.fs-detail .detail-card p,.fs-detail .detail-note { color:#526a79; font-size:14px; line-height:1.8; }
.fs-detail .detail-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:32px; }
.fs-detail .detail-card { padding:26px; border:1px solid #d5e4ed; border-top:4px solid #3e78a0; background:#f7fafc; }
.fs-detail .detail-card span { color:#3e78a0; font-size:12px; font-weight:700; }
.fs-detail .detail-card h3 { margin:16px 0 10px; font-size:22px; }
.fs-detail .detail-card p { margin:0; }
.fs-detail .detail-cta { padding:38px; background:#eaf2f7; }
.fs-detail .detail-cta p { color:#526a79; line-height:1.8; }
.fs-detail .detail-button { display:inline-block; padding:14px 20px; border:0; background:#315f7e; color:#fff; font:700 13px "Helvetica Neue",Arial,sans-serif; cursor:pointer; }
.fs-detail .detail-button:hover { background:#234b67; }
.fs-detail .detail-form { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; margin-top:28px; }
.fs-detail .detail-form label { display:grid; gap:7px; color:#21384a; font-size:13px; font-weight:700; }
.fs-detail .detail-form input,.fs-detail .detail-form textarea { width:100%; padding:12px; border:1px solid #b9cedb; border-radius:3px; background:#fff; color:#21384a; font:14px "Helvetica Neue",Arial,sans-serif; }
.fs-detail .detail-form textarea { min-height:100px; resize:vertical; }
.fs-detail .detail-form-error { margin:0; color:#a32e2e; font-size:13px; }
.fs-detail .detail-form .full { grid-column:1 / -1; }
.fs-detail .detail-form button { justify-self:start; }
.fs-detail .detail-summary { margin-top:28px; padding:24px; border-left:4px solid #3e78a0; background:#edf5f9; }
.fs-detail .detail-summary h3 { margin:0 0 12px; font-size:24px; }
.fs-detail .detail-summary p { margin:6px 0; color:#405e70; line-height:1.6; overflow-wrap:anywhere; }
.fs-detail .detail-summary .summary-notes { white-space:pre-wrap; }
@keyframes detail-float { 50% { transform:translateY(-8px); } }
@keyframes detail-spin { to { transform:rotate(360deg); } }
@media (max-width:700px) {
  .fs-detail .detail-hero-inner,.fs-detail .detail-grid,.fs-detail .detail-form { grid-template-columns:1fr; }
  .fs-detail .detail-hero-inner { gap:28px; }
  .fs-detail .detail-art { min-height:210px; }
  .fs-detail .detail-section { padding:52px 24px; }
  .fs-detail .detail-form .full { grid-column:auto; }
}
@media (prefers-reduced-motion:reduce) {
  .fs-detail .detail-art-circle,.fs-detail .detail-art-card { animation:none; }
}
</style>
