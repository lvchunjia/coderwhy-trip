<!--
 * @Author: jiumingmao 879021430@qq.com
 * @Date: 2023-04-25 22:57:45
 * @LastEditors: jiumingmao 879021430@qq.com
 * @LastEditTime: 2023-04-26 21:35:51
 * @FilePath: \coderwhy-trip\src\components\tab-control\tab-control.vue
 * @Description: 
 * Copyright (c) 2023 by jiumingmao 879021430@qq.com, All Rights Reserved.
-->

<script setup>
import { ref } from "vue";

const props = defineProps({
  titles: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["tabItemClick"]);

const currentIndex = ref(0);
const itemClick = (index) => {
  currentIndex.value = index;
  emit("tabItemClick", index);
};

// 供父级调用
const setCurrentIndex = (index) => {
  currentIndex.value = index;
};
defineExpose({
  setCurrentIndex,
});
</script>

<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div
        class="tab-control-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item.active {
  color: var(--primary-color);
  font-weight: 700;
}

.tab-control-item.active span {
  border-bottom: 3px solid var(--primary-color);
  padding: 8px;
}
</style>
