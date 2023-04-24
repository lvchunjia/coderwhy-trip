<script setup>
import useHomeStore from "@/stores/modules/home";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";

const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
</script>

<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
  </div>
</template>

<style scoped lang="less">
.home {
  padding-bottom: 100px;
}

.banner {
  img {
    width: 100%;
  }
}
</style>
