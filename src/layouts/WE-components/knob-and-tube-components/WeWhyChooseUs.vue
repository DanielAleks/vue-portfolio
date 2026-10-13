<template>
	<section class="we-why">
		<div class="we-why__inner">
			<h2 class="we-why__title">Why Choose Us?</h2>
			<p class="we-why__subtitle">
				A lot of companies will run a wire and leave. Our knob and tube wiring replacement
				is done by a licensed, bonded, and insured electrician who stands behind the work.
				Here is what you get when you call us.
			</p>

			<div class="we-why__grid">
				<article v-for="item in benefits" :key="item" class="we-why__card">
					<span class="we-why__icon" aria-hidden="true">
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="10" cy="10" r="10" fill="#153f60" />
							<path d="M6.1 10.4 8.6 13l5.3-5.7" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</span>
					<h3 class="we-why__card-text">{{ item }}</h3>
				</article>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'WeWhyChooseUs',
	data() {
		return {
			benefits: [
				'Licensed, Bonded & Insured Electrician',
				'Free Onsite Estimate',
				'No Pressure Quotes',
				'Upfront, Honest Pricing',
				'Local & Trusted in the South Sound',
				'Fast, Flexible Scheduling',
				'Clean and Code Compliant Installs'
			]
		}
	}
}
</script>

<style scoped>
.we-why {
	padding: clamp(1.6rem, 4vw, 3rem) 0.75rem 1.25rem;
	background: #ffffff;
}

.we-why__inner {
	width: min(920px, 100%);
	margin: 0 auto;
}

.we-why__title {
	margin: 0;
	text-align: center;
	color: #0f3a5b;
	font-family: "Archivo Black", "Arial Black", sans-serif;
	font-size: clamp(2rem, 4.2vw, 2rem);
	line-height: 1.05;
}

.we-why__subtitle {
	margin: 0.95rem auto 1.5rem;
	max-width: 52rem;
	text-align: center;
	color: #4f6e8a;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-size: clamp(1rem, 2.1vw, 1.2rem);
	line-height: 1.34;
}

.we-why__grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 0.9rem;
}

.we-why__card {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.8rem;
	min-height: 4.65rem;
	padding: 0.85rem 1rem;
	border: 1px solid #d2dbe4;
	border-radius: 0.7rem;
	background: #f8fbfe;
}

.we-why__card:nth-child(7) {
	grid-column: 1 / -1;
}

.we-why__icon {
	width: 1.35rem;
	height: 1.35rem;
	color: #153f60;
	flex-shrink: 0;
}

.we-why__icon svg {
	width: 100%;
	display: block;
}

.we-why__card-text {
	margin: 0;
	color: #0f3a5b;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-size: clamp(1.1rem, 2.2vw, 1.3rem);
	font-weight: 700;
	line-height: 1.2;
}

@media (max-width: 760px) {
	.we-why {
		padding-left: 0.65rem;
		padding-right: 0.65rem;
	}

	.we-why__grid {
		grid-template-columns: 1fr;
		gap: 0.72rem;
	}

	.we-why__subtitle {
		margin-bottom: 1.15rem;
	}

	.we-why__card {
		min-height: 3.9rem;
	}
}
</style>
