<script setup>
import tabBar from "@/components/tabBar/tabBar.vue";
// import Loading from "@/components/loading/loading.vue"
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div id="app">
    <router-view></router-view>

    <tab-bar v-show="!route.meta.hideTabBar" />
  </div>
</template>

<style scoped></style>
