<script setup>
import tabBarData from "@/assets/data/tabBar.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const active = ref(0);
const route = useRoute();
watch(route, (newRoute) => {
  const index = tabBarData.findIndex((item) => item.path === newRoute.path);
  if (index === -1) return;
  active.value = index;
});
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" active-color="#ff9854" route>
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
