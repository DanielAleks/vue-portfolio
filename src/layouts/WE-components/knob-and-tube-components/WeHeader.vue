<template>
   		<header class="we-nav we-nav--desktop navbar-desktop" aria-label="Desktop navigation">
			<a href="#" class="we-nav__brand" aria-label="Washington Electrical home">
				<span class="we-nav__logo" aria-hidden="true">
					<svg viewBox="0 0 70 42" xmlns="http://www.w3.org/2000/svg" fill="none">
						<path d="M3 35L22 6l14 14 8-8 23 23H3Z" fill="#0E3F5A"/>
						<path d="M26 20h8l-4 8h7l-13 12 5-10h-6l3-10Z" fill="#ffffff"/>
					</svg>
				</span>
				<span class="we-nav__brand-text">
					<span class="we-nav__brand-line">Washington</span>
					<span class="we-nav__brand-line">Electrical</span>
				</span>
			</a>

			<nav class="we-nav__links" aria-label="Primary">
				<a href="#" class="we-nav__link">About Us <span class="we-nav__caret">&#9662;</span></a>
				<a href="#" class="we-nav__link">Service Area <span class="we-nav__caret">&#9662;</span></a>
				<a href="#" class="we-nav__link we-nav__link--highlight">Electrical Services <span class="we-nav__caret">&#9662;</span></a>
				<a href="#" class="we-nav__link">Blog <span class="we-nav__caret">&#9662;</span></a>
			</nav>

			<a class="we-nav__phone" aria-label="Call 253 234 5359">
				Get Started
				<span class="we-nav__phone-icon">→</span>
            </a>
		</header>

</template>

<style scoped>
.we-nav {
	background: #ffffff;
	border-bottom: 1px solid #eef1f4;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.25rem;
	gap: 1rem;
}

.we-nav__brand {
	display: inline-flex;
	align-items: center;
	gap: 0.75rem;
	text-decoration: none;
}

.we-nav__logo {
	width: 6.9rem;
	height: 2.7rem;
	display: inline-flex;
}

.we-nav__logo svg {
	width: 100%;
	height: 100%;
}

.we-nav__brand-text {
	display: inline-flex;
	flex-direction: column;
	line-height: 1.03;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-weight: 800;
	color: #0b3f61;
	font-size: 1.01rem;
}

.we-nav__links {
	display: inline-flex;
	align-items: center;
	gap: 1.9rem;
}

.we-nav__link {
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-size: 1.07rem;
	font-weight: 600;
	text-decoration: none;
	color: #10354c;
	white-space: nowrap;
}

.we-nav__link--highlight {
	color: #ab9735;
}

.we-nav__caret {
	font-size: 0.58rem;
	margin-left: 0.3rem;
	vertical-align: middle;
}

.we-nav__phone {
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	text-decoration: none;
	background: #c42520;
	color: #fff;
	font-family: "Nunito Sans", "Segoe UI", sans-serif;
	font-weight: 900;
	font-size: 1.03rem;
	padding: 0.56rem 1rem;
	border-radius: 999px;
	line-height: 1;
	white-space: nowrap;
}

.we-nav__phone-icon {
	font-size: 1.5rem;
	line-height: 1;
    margin-bottom: .2rem;
}

.we-nav--mobile {
	display: none;
}

.we-nav--desktop {
	display: flex;
}
.we-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.875rem 1rem;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
}

.we-header__brand {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-width: 0;
}

.we-header__logo {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 9999px;
    background: #0f172a;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    flex-shrink: 0;
}

.we-header__title {
    color: #0f172a;
    font-size: 1rem;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.we-header__call {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.5rem 0.9rem;
    border: 0;
    border-radius: 9999px;
    background: #16a34a;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
}

.we-header__call-icon {
    width: 1rem;
    height: 1rem;
}

@media (max-width: 480px) {
    .we-header {
        padding: 0.75rem;
    }

    .we-header__title {
        font-size: 0.92rem;
    }

    .we-header__call {
        padding: 0.45rem 0.8rem;
        font-size: 0.82rem;
    }
}
</style>