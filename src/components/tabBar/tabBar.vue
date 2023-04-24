<script setup>
import tabBarData from "@/assets/data/tabBar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref } from "vue";

const active = ref(0);
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" active-color="#ff9854">
      <template v-for="(item, index) in tabBarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              v-if="active !== index"
              :src="getAssetURL(item.image)"
              alt=""
            />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
.tab-bar {
  img {
    height: 26px;
  }
}
</style>
