<!--
 * @Author: jiumingmao 879021430@qq.com
 * @Date: 2023-04-25 22:57:16
 * @LastEditors: jiumingmao 879021430@qq.com
 * @LastEditTime: 2023-04-26 20:32:12
 * @FilePath: \coderwhy-trip\src\views\detail\cpns\detail_07-map.vue
 * @Description: 
 * Copyright (c) 2023 by jiumingmao 879021430@qq.com, All Rights Reserved.
-->
<script setup>
import DetailSection from "@/components/detail-section/detail-section.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({}),
  },
});

const mapRef = ref();

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value); // 创建地图实例
  const point = new BMapGL.Point(
    props.position.longitude,
    props.position.latitude
  ); // 创建点坐标
  map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMapGL.Marker(point);
  map.addOverlay(marker);
});
</script>

<template>
  <div class="home">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<style lang="less" scoped>
.baidu {
  height: 250px;
}
</style>
