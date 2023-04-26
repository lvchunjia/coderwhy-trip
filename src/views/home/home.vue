<!--
 * @Author: jiumingmao 879021430@qq.com
 * @Date: 2023-04-24 20:21:13
 * @LastEditors: jiumingmao 879021430@qq.com
 * @LastEditTime: 2023-04-26 22:17:25
 * @FilePath: \coderwhy-trip\src\views\home\home.vue
 * @Description: 
 * Copyright (c) 2023 by jiumingmao 879021430@qq.com, All Rights Reserved.
-->
<script setup>
import { ref, computed, watch, onActivated } from "vue";
import useHomeStore from "@/stores/modules/home";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue";
import HomeCategories from "./cpns/home-categories.vue";
import SearchBar from "@/components/searchBar/searchBar.vue";
import HomeContent from "./cpns/home-content.vue";

import useScroll from "@/hooks/useScroll.js";

// 发送请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();

// 监听滚动到底部
const homeRef = ref();
const { isReachBottom, scrollTop } = useScroll(homeRef);
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false;
    });
  }
});

// search-bar
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});

// 跳转回home时，保留原来位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<template>
  <div class="home" ref="homeRef">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
    <home-categories />

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'" />
    </div>
    <home-content />
  </div>
</template>

<style scoped lang="less">
.home {
  padding-bottom: 100px;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 60px;

  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
