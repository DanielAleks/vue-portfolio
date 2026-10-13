<template>
    <div style="margin-left: 5rem">
        <h1>Business Ideas</h1>
        <p>Welcome to the Business Ideas page. Here you can find information about various business ideas.</p>
        <p>Website Design / Development (freelance but going away)</p>
        <p style="color: green; font-weight: 900;">Marketing Consultant (freelance but requires networking)</p>
        <p>Hair salon (labor)</p>
        <p>Electrician Low-volt with coding/automation skills (freelance but labor)</p>
        <p>Outdoors</p>
        <p>Carpentry (amzZZZinnGGG labor)</p>
        <p>Moldova, freelance is best</p>
        <p>Renting Business (freelance but requires initial investment)</p>
        <p>Auto Glass Installation (COLD)</p>
    </div>
</template>

<script>
import { onMounted } from "vue";

export default {
    name: "BusinessIdeas",
    setup() {
        onMounted(() => {
            document.getElementById("loading__container").style.display = "none";
        });
    }
};
</script>