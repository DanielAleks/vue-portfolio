<template>
    <section class="quote-shell">
        <article class="quote-card" aria-label="Free quote form">
            <h2 class="quote-title">Get a Free Quote</h2>
            <p class="quote-subtitle">
                Start with your ZIP code to confirm we serve your area, then answer a few quick
                questions and we'll get you a fast, upfront quote.
            </p>

            <div class="quote-progress-row" aria-label="Progress: step 1 of 4">
                <div class="quote-progress-track" role="progressbar" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1">
                    <span class="quote-progress-fill" />
                </div>
                <span class="quote-step">Step 1 of 4</span>
            </div>

            <input
                v-model="zipCode"
                type="text"
                class="quote-input"
                placeholder="Enter your ZIP code"
                aria-label="Enter your ZIP code"
                @keyup.enter="handleContinue"
            >

            <button type="button" class="quote-continue" @click="handleContinue">Continue</button>
        </article>
    </section>
</template>

<script>
export default {
    name: 'WeFreeQuote',
    data() {
        return {
            zipCode: ''
        }
    },
    methods: {
        handleContinue() {
            if (this.zipCode.trim()) {
                // Keep this hook for parent integration or API submission.
                console.log('ZIP Code submitted:', this.zipCode)
            }
        }
    }
}
</script>

<style scoped>
.quote-shell {
    padding: 2.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
        radial-gradient(circle at 1px 1px, #d6dee8 1px, transparent 0) 0 0 / 18px 18px,
        linear-gradient(180deg, #f1f6fb 0%, #e7eef5 100%);
}

.quote-card {
    width: min(900px, 50%);
    background: #ffffff;
    border-radius: 1.3rem;
    box-shadow: 0 20px 50px rgba(18, 51, 77, 0.18);
    padding: clamp(1.5rem, 3vw, 2.35rem);
}

.quote-title {
    margin: 0;
    text-align: center;
    color: #0e395c;
    font-family: "Archivo Black", "Arial Black", sans-serif;
    font-size: clamp(1rem, 1.5rem, 2.15rem);
    letter-spacing: 0.01em;
    line-height: 1.05;
    font-weight: 700;
}

.quote-subtitle {
    margin: 0.75rem auto 1.55rem;
    max-width: 30rem;
    text-align: center;
    color: #5e7892;
    font-family: "Nunito Sans", "Segoe UI", sans-serif;
    font-size: clamp(1rem, 1.7vw, 1.2rem);
    line-height: 1.4;
}

.quote-progress-row {
    width: 90%;
    margin-left: 5%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.35rem;
}

.quote-progress-track {
    position: relative;
    flex: 1;
    height: 0.5rem;
    border-radius: 999px;
    background: #e2e8ef;
    overflow: hidden;
}

.quote-progress-fill {
    display: block;
    width: 25%;
    height: 100%;
    border-radius: inherit;
    background: #0e395c;
}

.quote-step {
    font-family: "Nunito Sans", "Segoe UI", sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #304f68;
    white-space: nowrap;
}

.quote-input {
    margin-left: 5%;
    width: 90%;
    height: 3rem;
    border: 1.5px solid #c8d5e2;
    border-radius: 0.65rem;
    text-align: center;
    color: #2d4c66;
    font-family: "Nunito Sans", "Segoe UI", sans-serif;
    font-size: clamp(1.2rem, 2vw, 1rem);
    letter-spacing: 0.18em;
    outline: none;
}

.quote-input::placeholder {
    color: #6c8aa6;
}

.quote-input:focus {
    border-color: #6fa2cf;
    box-shadow: 0 0 0 3px rgba(111, 162, 207, 0.2);
}

.quote-continue {
    margin-top: 1rem;
    margin-left: 5%;
    width: 90%;
    height: 3.55rem;
    border: 0;
    border-radius: 999px;
    cursor: pointer;
    color: #ffffff;
    font-family: "Nunito Sans", "Segoe UI", sans-serif;
    font-size: clamp(1.45rem, 2vw, 1.95rem);
    font-weight: 800;
    background: linear-gradient(90deg, #f2968f 0%, #ec8a84 55%, #ea8a86 100%);
    transition: filter 0.2s ease, transform 0.2s ease;
}

.quote-continue:hover {
    filter: brightness(0.98);
    transform: translateY(-1px);
}

@media (max-width: 700px) {
    .quote-shell {
        padding: 1.25rem 0.8rem;
    }

    .quote-card {
        border-radius: 1rem;
        padding: 1.2rem;
    }

    .quote-subtitle {
        margin-bottom: 1.15rem;
    }

    .quote-progress-row {
        gap: 0.5rem;
    }

    .quote-step {
        font-size: 0.85rem;
    }

    .quote-input {
        height: 3.45rem;
        font-size: 1.05rem;
        letter-spacing: 0.09em;
    }

    .quote-continue {
        height: 3.15rem;
        font-size: 1.25rem;
    }
}
</style>
