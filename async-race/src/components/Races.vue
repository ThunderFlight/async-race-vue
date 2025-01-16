<script setup lang="ts">
import Race from "./Race.vue";

import { useGarageStore } from "../store/garageStore.ts";
import { storeToRefs } from "pinia";

const garageStore = useGarageStore();
const { garage } = storeToRefs(garageStore);
garageStore.getGarage();
</script>

<template>
  <div v-for="car in garage">
    <Race :car />
  </div>
  <button @click.prevent="garageStore.nextPage()">next</button>
  <button @click.prevent="garageStore.previousPage()">previous</button>
</template>

<style scoped></style>
