<template>
	<section class="we-services">
		<div class="we-services__inner">
			<h2 class="we-services__title">
				Expert Knob and Tube Wiring
				<br>
				Replacement Services
			</h2>

			<p class="we-services__subtitle">
				Whether it is one stubborn circuit or your entire home, we have the right rewiring
				solution to make your house safe, insurable, and ready for modern living.
			</p>

			<div class="we-services__grid">
				<article v-for="service in services" :key="service.title" class="we-services__card">
					<!-- <div class="we-services__card-icon" aria-hidden="true">{{ service.icon }}</div> -->
					<h3 class="we-services__card-title">{{ service.title }}</h3>
					<p class="we-services__card-copy">{{ service.copy }}</p>
				</article>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'WeExpertKnowAndTubeWiring',
	data() {
		return {
			services: [
				{
					title: 'Knob and Tube Wiring Replacement',
					copy: "We replace knob and tube wiring with modern, grounded circuits, so your home is safe, insurable, and ready for today's electrical demands."
				},
				{
					title: 'Whole Home Rewiring',
					copy: 'A full knob and tube rewiring in one project means one inspection and decades of safe, code compliant power throughout your home.'
				},
				{
					title: 'Partial and Room by Room Rewiring',
					copy: 'Only part of your home still runs on old wiring? We handle a staged knob and tube rewire so you can spread the work across a budget that fits.'
				},
				{
					title: 'Electrical Panel Upgrades',
					copy: 'Old wiring usually means an old panel. We upgrade it to a modern, properly grounded panel that safely handles your new circuits and future loads.'
				},
				{
					title: 'Knob and Tube Removal',
					copy: 'Old wiring left inside your walls is still a risk. Our complete knob and tube wiring removal pulls it out and replaces it with safe modern circuits.'
				},
				{
					title: 'Insurance and Code Compliance',
					copy: 'Many insurers will not cover homes with old wiring. We bring your knob and tube replacement up to code so you can pass inspection and keep your coverage.'
				},
				{
					title: 'Cloth and Aluminum Wiring Replacement',
					copy: 'Beyond knob and tube, we replace other outdated wiring like cloth insulated and aluminum runs that pose a fire or safety risk.'
				}
			]
		}
	}
}
</script>

<style scoped>
.we-services {
	background:
		radial-gradient(circle at top left, rgba(255, 106, 61, 0.28) 0%, transparent 30%),
		linear-gradient(135deg, #0f3553 0%, #143e5d 45%, #19517b 100%);
	padding: clamp(1.75rem, 4vw, 3.25rem) 0.8rem 2.2rem;
}

.we-services__inner {
	width: min(980px, 100%);
	margin: 0 auto;
}

.we-services__title {
	margin: 0;
	text-align: center;
	color: #ffffff;
	font-family: "Archivo Black", "Arial Black", sans-serif;
	font-size: clamp(2rem, 4.4vw, 3.8rem);
	line-height: 1.07;
	text-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
}

.we-services__subtitle {
	margin: 1rem auto 1.45rem;
	max-width: 52rem;
	text-align: center;
	color: #d7e6f4;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-size: clamp(1rem, 2.1vw, 1.8rem);
	line-height: 1.35;
}

.we-services__grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 1rem;
}

.we-services__card {
	position: relative;
	overflow: hidden;
	background: linear-gradient(145deg, #ffffff 0%, #f5faff 45%, #eaf4ff 100%);
	border-radius: 1rem;
	padding: 1rem 1rem 1.05rem;
	border: 1px solid rgba(223, 232, 241, 0.95);
	box-shadow: 0 14px 30px rgba(5, 29, 47, 0.16);
	transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.we-services__card:nth-child(7) {
	grid-column: 1 / -1;
	max-width: 50%;
	margin: 0 auto;
}

.we-services__card::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 0.32rem;
	background: linear-gradient(90deg, #4f91f7 0%, #1a6be0 50%, #0f4fb3 100%);
}

.we-services__card::after {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.55), transparent 45%);
	pointer-events: none;
}

.we-services__card:hover {
	transform: translateY(-5px) scale(1.01);
	box-shadow: 0 20px 36px rgba(5, 29, 47, 0.2);
	border-color: rgba(26, 107, 224, 0.32);
}

.we-services__card-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 3.25rem;
	height: 3.25rem;
	margin-bottom: 0.8rem;
	border-radius: 0.95rem;
	background: linear-gradient(135deg, #4f91f7 0%, #1a6be0 100%);
	color: #ffffff;
	box-shadow: 0 10px 20px rgba(26, 107, 224, 0.28);
	font-size: 1.45rem;
	line-height: 1;
	transform: rotate(-2deg);
	border: 2px solid rgba(255, 255, 255, 0.9);
}

.we-services__card-title {
	margin: 0;
	color: #10395a;
	font-family: "Archivo Black", "Arial Black", sans-serif;
	font-size: clamp(1.3rem, 2.5vw, 2.2rem);
	line-height: 1.12;
}

.we-services__card-copy {
	margin: 0.68rem 0 0;
	color: #335675;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-size: clamp(1rem, 1.9vw, 1.55rem);
	line-height: 1.32;
}

.we-services__cta-wrap {
	display: flex;
	justify-content: center;
	margin-top: 1.65rem;
}

.we-services__cta {
	border: 0;
	border-radius: 999px;
	min-height: 3.25rem;
	padding: 0.7rem 1.45rem;
	background: linear-gradient(90deg, #f01b05 0%, #e40f00 100%);
	color: #ffffff;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-size: clamp(1.2rem, 2.4vw, 2rem);
	font-weight: 800;
	cursor: pointer;
	box-shadow: 0 10px 24px rgba(240, 27, 5, 0.4);
	transition: transform 0.2s ease, filter 0.2s ease;
}

.we-services__cta:hover {
	filter: brightness(0.98);
	transform: translateY(-1px);
}

@media (max-width: 760px) {
	.we-services {
		padding-left: 0.65rem;
		padding-right: 0.65rem;
	}

	.we-services__grid {
		grid-template-columns: 1fr;
		gap: 0.82rem;
	}

	.we-services__subtitle {
		margin-bottom: 1rem;
	}

	.we-services__card {
		padding: 0.88rem 0.9rem;
	}
}
</style>
