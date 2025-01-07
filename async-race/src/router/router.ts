import type { DefineComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/main.vue";
import Winners from "../views/Winners.vue";

interface Routes {
  path: string;
  name: string;
  component: DefineComponent<{}, {}, any>;
}

const routes: Routes[] = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/winners",
    name: "Winners",
    component: Winners,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
