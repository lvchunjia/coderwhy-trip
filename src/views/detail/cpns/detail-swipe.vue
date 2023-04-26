<!--
 * @Author: jiumingmao 879021430@qq.com
 * @Date: 2023-04-25 22:57:15
 * @LastEditors: jiumingmao 879021430@qq.com
 * @LastEditTime: 2023-04-26 20:03:08
 * @FilePath: \coderwhy-trip\src\views\detail\cpns\detail-swipe.vue
 * @Description: 
 * Copyright (c) 2023 by jiumingmao 879021430@qq.com, All Rights Reserved.
-->
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

// 对数据进行转换
const swipeGroup = {};
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory];
  if (!valueArray) {
    valueArray = [];
    swipeGroup[item.enumPictureCategory] = valueArray;
  }
  valueArray.push(item);
}

// 处理轮播图名称title
const nameReg = /【(.*?)】/i;
const getName = (name) => {
  const results = nameReg.exec(name);
  return results[1];
};

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory];
  return valueArray.findIndex((data) => data === item) + 1;
};
</script>

<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="item in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>

      <template #indicator="{ active }">
        <div class="indicator">
          <template v-for="(value, key) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory * 1 === key"
              >
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      border-radius: 3px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
