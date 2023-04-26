<!--
 * @Author: jiumingmao 879021430@qq.com
 * @Date: 2023-04-25 22:57:16
 * @LastEditors: jiumingmao 879021430@qq.com
 * @LastEditTime: 2023-04-26 20:30:44
 * @FilePath: \coderwhy-trip\src\views\detail\cpns\detail_08-intro.vue
 * @Description: 
 * Copyright (c) 2023 by jiumingmao 879021430@qq.com, All Rights Reserved.
-->
<script setup name="home">
defineProps({
  priceIntro: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="intro">
    <h2 class="title">{{ priceIntro.title }}</h2>
    <div class="content">
      {{ priceIntro.introduction }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.intro {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;

  .title {
    font-size: 14px;
    color: #000;
    font-weight: 700;
  }

  .content {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: #666;
  }
}
</style>
