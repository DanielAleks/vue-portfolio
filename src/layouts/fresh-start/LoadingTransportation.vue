<template>
  <FSServiceDetail eyebrow="Moving day support" title="Loading and" accent="transportation." intro="From the first box on the truck to your destination, a clear plan helps your move get off to a good start." art-number="02" art-title="On the move" art-caption="Loading, mileage, and your route">
    <section class="detail-section">
      <p class="detail-eyebrow">Planning your trip</p>
      <h2>What goes into your quote?</h2>
      <p>We’ll discuss your belongings, pickup and delivery access, truck arrangements, and the distance between locations before confirming a plan.</p>
      <ol class="trip-steps">
        <li><span class="step-number">01</span><h3>Loading</h3><p>Share your home size, heavy items, stairs, parking, and access restrictions. Let us know about special handling needs and whether boxes will be packed before loading.</p></li>
        <li><span class="step-number">02</span><h3>Per-mile pricing</h3><p>Mileage is considered when preparing a quote. The per-mile rate, any base charge, and other fees will be provided with your estimate; rates are not yet published.</p></li>
        <li><span class="step-number">03</span><h3>Moving between states</h3><p>Include both states in your move details. Availability, applicable requirements, and pricing for interstate moves must be confirmed before booking.</p></li>
      </ol>
    </section>
    <div class="detail-section calculator-section">
      <FSMoveCalculator />
    </div>
    <section class="moving-preparation" aria-labelledby="moving-preparation-heading">
      <div class="moving-preparation-inner">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&amp;fit=crop&amp;w=1000&amp;q=85"
          alt="A bright living room ready for a fresh start"
          loading="lazy"
        />
        <div>
          <p class="detail-eyebrow">A little planning goes a long way</p>
          <h2 id="moving-preparation-heading">A smoother journey starts at home.</h2>
          <p>Every move is different. Thinking through what you’re bringing and how to access each home can help you prepare for a more informed conversation about your move.</p>
          <p>Gather your pickup and delivery locations, a preferred moving date, and any details about stairs, parking, or larger items before filling out the form below.</p>
        </div>
      </div>
    </section>
    <section class="route-section" aria-labelledby="route-heading">
      <div class="route-inner">
        <p class="detail-eyebrow">Prepare your move</p>
        <h2 id="route-heading">Tell us about your route.</h2>
        <p>Complete this form to prepare a summary. It does not send a request or calculate a price. Business contact details are not yet configured.</p>
        <div class="route-card">
          <form class="detail-form" @submit.prevent="prepareSummary">
          <label>Pickup city<input v-model.trim="form.pickupCity" required autocomplete="address-level2" /></label>
          <label>Pickup state<input v-model.trim="form.pickupState" required autocomplete="address-level1" placeholder="e.g. Washington" /></label>
          <label>Delivery city<input v-model.trim="form.deliveryCity" required /></label>
          <label>Delivery state<input v-model.trim="form.deliveryState" required placeholder="e.g. Washington" /></label>
          <label>Estimated distance in miles<input v-model="form.miles" type="number" min="0" step="any" required /></label>
          <label>Preferred moving date <input v-model="form.date" type="date" /></label>
          <label class="full">Move details <textarea v-model.trim="form.notes" placeholder="Home size, large items, stairs, or other helpful details"></textarea></label>
          <p v-if="formError" class="full detail-form-error" role="alert">{{ formError }}</p>
          <button class="detail-button full" type="submit">Prepare move summary ↗</button>
        </form>
        <div v-if="summary" class="detail-summary" role="status">
          <h3>Your move summary</h3>
          <p>Pickup: {{ summary.pickupCity }}, {{ summary.pickupState }}</p>
          <p>Delivery: {{ summary.deliveryCity }}, {{ summary.deliveryState }}</p>
          <p>Estimated distance: {{ summary.miles }} miles</p>
          <p v-if="summary.date">Preferred date: {{ summary.date }}</p>
          <p v-if="summary.notes" class="summary-notes">Move details: {{ summary.notes }}</p>
          <p><strong>No request has been sent.</strong> Save these details and use them when contacting the business for a quote.</p>
          <router-link to="/freshstart/contact">View contact information ↗</router-link>
        </div>
        </div>
      </div>
    </section>
  </FSServiceDetail>
</template>

<script setup>
import { reactive, ref } from "vue";
import FSServiceDetail from "./FSServiceDetail.vue";
import FSMoveCalculator from "./FSMoveCalculator.vue";

const form = reactive({
  pickupCity: "",
  pickupState: "",
  deliveryCity: "",
  deliveryState: "",
  miles: "",
  date: "",
  notes: "",
});
const summary = ref(null);
const formError = ref("");

function prepareSummary() {
  if (!form.pickupCity || !form.pickupState || !form.deliveryCity || !form.deliveryState) {
    formError.value = "Enter a city and state for both pickup and delivery.";
    summary.value = null;
    return;
  }
  formError.value = "";
  summary.value = { ...form };
}
</script>

<style scoped>
.fs-detail .calculator-section { max-width:1140px; }
.trip-steps { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:50px; margin:38px 0 0; padding:0; list-style:none; }
.trip-steps li { position:relative; min-width:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
.trip-steps li:not(:last-child)::after { position:absolute; top:50%; right:-25px; transform:translate(50%,-50%); color:#7da8c0; font-size:26px; line-height:1; content:"→"; }
.step-number { display:grid; width:38px; height:38px; place-items:center; border-radius:50%; color:#315f7e; background:#e2eef5; font-size:12px; font-weight:700; }
.trip-steps h3 { margin:18px 0 10px; font-size:22px; }
.trip-steps p { margin:0; color:#526a79; font-size:14px; line-height:1.8; }
.moving-preparation { padding:20px 28px 80px; background:#fff; }
.moving-preparation-inner { max-width:1084px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:56px; }
.moving-preparation img { display:block; width:100%; height:310px; object-fit:cover; }
.moving-preparation h2 { margin:0 0 18px; font-size:clamp(30px,3vw,42px); line-height:1.15; }
.moving-preparation-inner > div > p:not(.detail-eyebrow) { color:#526a79; font-size:14px; line-height:1.8; }
.route-section { padding:72px 28px; background:#f7f3ec; }
.route-inner { max-width:1084px; margin:0 auto; }
.route-inner h2 { margin:0 0 18px; font-size:clamp(30px,3vw,42px); line-height:1.15; }
.route-inner > p:not(.detail-eyebrow) { max-width:650px; color:#526a79; font-size:14px; line-height:1.8; }
.route-card { margin-top:28px; padding:32px; border:1px solid #e6ddcf; background:#fff; box-shadow:0 8px 24px #594b3910; }
.fs-detail .route-card .detail-form { margin-top:0; }
@media(max-width:700px) {
  .trip-steps { grid-template-columns:1fr; gap:0; margin-top:28px; }
  .trip-steps li:not(:last-child) { padding-bottom:40px; }
  .trip-steps li:not(:last-child)::after { top:auto; right:auto; bottom:20px; left:50%; transform:translate(-50%,50%); content:"↓"; }
  .moving-preparation { padding:0 24px 52px; }
  .moving-preparation-inner { grid-template-columns:1fr; gap:26px; }
  .moving-preparation img { height:230px; }
  .route-section { padding:52px 24px; }
  .route-card { padding:22px; }
}
</style>
