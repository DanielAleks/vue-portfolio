<template>
  <div class="final-cta">
    <div class="fc-left">
      <h3>Ready to get started?</h3>
      <p>We respond same day. Written quote before any work begins.</p>
    </div>
    <div class="fc-right">
      <button class="fc-btn">Request a free quote</button>
      <div class="fc-disc">
        Or call/text (253) 234-5359 · Senior and military discounts available
      </div>
    </div>
  </div>
</template>

<style scoped>
.final-cta {
  background: #1a6be0;
  padding: 48px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
.fc-left h3 {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
}
.fc-left p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
}
.fc-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}
.fc-btn {
  background: #fff;
  color: #1a6be0;
  padding: 12px 28px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  border: none;
  white-space: nowrap;
}
.fc-disc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}
</style>