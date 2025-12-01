<template>
    <div class="parent-container-no-classes" >
        <NavbarContainer/>

        <div class="banner-container">
            <img :src="LaptopWithUI" class="banner-bg" />
            <div class="banner-overlay" />
            <div class="banner-text">
                <div>
                    <h1>We create beautiful and modern website in an ever-changing digital world.</h1>
                    <p>With half a decade of experience in web design and development, we specialize in crafting visually stunning and highly functional websites that captivate audiences and drive business growth.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import LaptopWithUI from "src/assets/images/marketing/laptop-with-ui.jpg";
import "src/css/marketing.scss";
import NavbarContainer from "src/components/NavbarContainer.vue";

export default {
    name: "BusinessDevelopment",
    components: {
        NavbarContainer
    },
    setup() {
        onMounted(() => {
            document.getElementById("loading__container").style.display = "none";
        });

        return {
            LaptopWithUI
        }
    }
};
</script>