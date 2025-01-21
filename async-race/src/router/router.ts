import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Main",
    component: () => import("../views/main.vue"),
  },
  {
    path: "/winners",
    name: "Winners",
    component: () => import("../views/Winners.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
