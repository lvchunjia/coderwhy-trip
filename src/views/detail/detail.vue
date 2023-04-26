<!--
 * @Author: jiumingmao 879021430@qq.com
 * @Date: 2023-04-25 22:57:16
 * @LastEditors: jiumingmao 879021430@qq.com
 * @LastEditTime: 2023-04-26 21:47:53
 * @FilePath: \coderwhy-trip\src\views\detail\detail.vue
 * @Description: 
 * Copyright (c) 2023 by jiumingmao 879021430@qq.com, All Rights Reserved.
-->
<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from "@/services";

import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwipe from "./cpns/detail-swipe.vue";
import DetailInfos from "./cpns/detail-infos.vue";
import DetailFacility from "./cpns/detail-facility.vue";
import DetailLandlord from "./cpns/detail-landlord.vue";
import DetailComment from "./cpns/detail-comment.vue";
import DetailNotice from "./cpns/detail-notice.vue";
import DetailMap from "./cpns/detail-map.vue";
import DetailIntro from "./cpns/detail-intro.vue";
import useScroll from "@/hooks/useScroll";

const router = useRouter();
const route = useRoute();

// 发送请求获取数据
const detailInfos = ref({});
const houseId = route.params.id;
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data;
});
const mainPart = computed(() => detailInfos.value.mainPart);

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back();
};

// tabControl相关的操作
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});

const sectionEls = ref({});
// 获取所有组件对应name位置
const getSectionRef = (value) => {
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};
const names = computed(() => {
  return Object.keys(sectionEls.value);
});

// 点击tab-control滚动到对应位置
let isClick = false;
let currentDistance = -1;
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index];
  const el = sectionEls.value[key];
  let distance = el.offsetTop;
  if (index !== 0) {
    distance = distance - 44;
  }

  isClick = true;
  currentDistance = distance;

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false;
  }
  if (isClick) return;

  // 1.获取所有的区域的offsetTops
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);

  // 2.根据newValue去匹配想要索引
  let index = values.length - 1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  tabControlRef.value?.setCurrentIndex(index);
});
</script>

<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-show="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />

      <detail-infos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />

      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />

      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />

      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />

      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />

      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />

      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
