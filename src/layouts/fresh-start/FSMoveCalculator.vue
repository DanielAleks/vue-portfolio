<template>
  <section class="calculator" aria-labelledby="calculator-heading">
    <div class="calculator-copy">
      <p class="eyebrow">Plan ahead</p>
      <h2 id="calculator-heading">Fill in your info to get a quote</h2>
      <p>These are sample rates, not Fresh Start’s confirmed prices. Replace them before publishing; this is not a quote or a booking.</p>
      <p>The example uses a $150 base charge plus $2.50 per mile. Labor, packing, supplies, access, and other potential fees are not included.</p>
      <div class="planning-tip">
        <span class="planning-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M5 15h25v20H5zM30 22h7l6 7v6H30zM35 22v7h8" />
            <circle cx="13" cy="36" r="3" />
            <circle cx="36" cy="36" r="3" />
            <path d="M10 21h14M10 26h9" />
          </svg>
        </span>
        <div>
          <strong>A little preparation helps</strong>
          <p>Have your route, moving date, and any large items or access details ready when you request a written estimate.</p>
        </div>
      </div>
    </div>
    <div class="calculator-panel">
      <form @submit.prevent="calculate">
        <label>
          Where is your move?
          <select v-model="route" required>
            <option value="" disabled>Select a route</option>
            <option value="washington">Both locations in Washington</option>
            <option value="other">Outside Washington or between states</option>
          </select>
        </label>
        <label>
          Estimated one-way distance in miles
          <input v-model="miles" type="number" min="0" step="any" :required="route === 'washington'" inputmode="decimal" placeholder="e.g. 25" />
        </label>
        <p class="hint">Enter your estimated driving distance; this calculator does not find routes.</p>
        <button type="submit" :disabled="route === 'other'">Calculate preview <span aria-hidden="true">↗</span></button>
      </form>
      <div v-if="route === 'other'" class="result" role="status">
        <strong>Request a quote for this route</strong>
        <p>Estimates here are limited to moves within Washington. Availability and pricing for other moves must be confirmed individually.</p>
        <router-link to="/freshstart/contact">View contact information ↗</router-link>
      </div>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <div v-if="estimate" class="result" role="status">
        <span>Sample preview — not a quote</span>
        <strong class="amount">{{ formatCurrency(estimate.total) }}</strong>
        <p>Sample base charge: {{ formatCurrency(baseCharge) }}<br />{{ estimate.miles }} miles × {{ formatCurrency(perMile) }}: {{ formatCurrency(estimate.mileageCharge) }}</p>
        <p>Actual charges and availability must be confirmed in a written estimate.</p>
        <router-link to="/freshstart/contact">View contact information ↗</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";

const baseCharge = 150;
const perMile = 2.5;
const route = ref("");
const miles = ref("");
const estimate = ref(null);
const error = ref("");
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

watch([route, miles], () => {
  estimate.value = null;
  error.value = "";
});

function formatCurrency(value) {
  return currency.format(value);
}

function calculate() {
  if (route.value !== "washington") return;
  const distance = Number(miles.value);
  const mileageCharge = distance * perMile;
  if (miles.value === "" || !Number.isFinite(distance) || distance < 0 || !Number.isFinite(mileageCharge + baseCharge)) {
    error.value = "Enter a valid, non-negative distance in miles.";
    estimate.value = null;
    return;
  }
  estimate.value = { miles: distance, mileageCharge, total: baseCharge + mileageCharge };
}
</script>

<style scoped>
.calculator { display:grid; grid-template-columns:1fr 1fr; gap:40px; padding:38px; border:1px solid #d5e4ed; background:#edf5f9; color:#21384a; }
.eyebrow { margin:0 0 12px; color:#3e78a0; font-size:11px; font-weight:700; letter-spacing:1.6px; text-transform:uppercase; }
.calculator h2 { margin:0 0 16px; font:400 clamp(30px,3vw,42px)/1.15 Georgia,"Times New Roman",serif; }
.calculator-copy > p:not(.eyebrow),.hint,.result p { color:#526a79; font-size:14px; line-height:1.7; }
.calculator-copy > p:not(.eyebrow) { margin:0 0 14px; }
.planning-tip { display:none; }
.planning-icon { flex:none; width:48px; height:48px; display:grid; place-items:center; border-radius:50%; color:#3e78a0; background:#d7e9f3; }
.planning-icon svg { width:28px; height:28px; stroke:currentColor; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }
.planning-tip strong { color:#315f7e; font-size:14px; }
.planning-tip p { margin:6px 0 0; color:#526a79; font-size:13px; line-height:1.6; }
.calculator-panel { padding:24px; background:#fff; box-shadow:0 8px 24px #315a7812; }
form { display:grid; gap:16px; }
label { display:grid; gap:8px; color:#21384a; font-size:13px; font-weight:700; }
input,select { width:100%; min-width:0; padding:12px; border:1px solid #b9cedb; border-radius:3px; background:#fff; color:#21384a; font:14px "Helvetica Neue",Arial,sans-serif; }
input:focus-visible,select:focus-visible,button:focus-visible { outline:3px solid #d5a755; outline-offset:3px; }
.hint { margin:-6px 0 0; font-size:12px; }
button { justify-self:start; padding:14px 20px; border:0; background:#315f7e; color:#fff; font:700 13px "Helvetica Neue",Arial,sans-serif; cursor:pointer; }
button:hover { background:#234b67; }
button:disabled { background:#869ba8; cursor:not-allowed; }
.result { margin-top:22px; padding:20px; border-left:4px solid #3e78a0; background:#edf5f9; }
.result span,.result strong { display:block; }
.result span { color:#315f7e; font-size:12px; font-weight:700; }
.result .amount { margin-top:7px; color:#21384a; font:400 32px Georgia,"Times New Roman",serif; overflow-wrap:anywhere; }
.result p { margin:10px 0; overflow-wrap:anywhere; }
.calculator .result a { color:#315f7e; font-size:13px; font-weight:700; }
.result a:hover { text-decoration:underline; }
.error { color:#a32e2e; font-size:13px; }
@media(min-width:701px) { .planning-tip { display:flex; align-items:flex-start; gap:15px; margin-top:26px; padding:20px; border:1px solid #d5e4ed; background:#f8fbfd; } }
@media(max-width:700px) { .calculator { grid-template-columns:1fr; gap:16px; padding:24px; } .calculator-panel { padding:20px; } }
</style>
