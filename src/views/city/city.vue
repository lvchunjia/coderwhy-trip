<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useCityStore from "@/stores/modules/city";
import { useRouter } from "vue-router";
import CityGroup from "./cpns/city-group.vue";

const router = useRouter();

// 搜索框功能
const searchValue = ref("");
const cancelClick = () => {
  router.back();
};

// tab的切换
const tabActive = ref();

// 从Store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);
</script>

<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      <!-- tab的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- 内容 -->
    <div class="content">
      <template v-for="(value, key) in allCities">
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.city {
  --van-tabs-line-height: 35px;

  .content {
    height: calc(100vh - 89px);
    overflow-y: auto;
  }
}
</style>
