<template>
    <div style="margin-left: 5rem">
        <h1>Business Ideas</h1>
        <p>Welcome to the Business Ideas page. Here you can find information about various business ideas.</p>
        <p>Website Design / Development</p>
        <p>HVAC</p>
        <p>Cleaning Business</p>
        <p>Car Business</p>
        <p>Workout Course</p>
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