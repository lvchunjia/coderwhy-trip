import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/home.vue"),
    },
    {
      path: "/favor",
      name: "favor",
      component: () => import("@/views/favor/favor.vue"),
    },
    {
      path: "/message",
      name: "message",
      component: () => import("@/views/message/message.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/order/order.vue"),
    },
  ],
});

export default router;