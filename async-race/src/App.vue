<script setup lang="ts">
import Main from "./views/main.vue";
import Winners from "./views/Winners.vue";
import { ref, computed, type DefineComponent } from "vue";

interface Routes {
  [key: string]: DefineComponent<{}, {}, any>;
}

const routes: Routes = {
  "/": Main,
  "/winners": Winners,
};

const currentPath = ref(window.location.hash);
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/"];
});
</script>

<template>
  <a href="#/">main</a>
  <a href="#/winners">winners</a>
  <component :is="currentView" />
</template>

<style scoped></style>
