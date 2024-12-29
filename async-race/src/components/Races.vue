<script setup lang="ts">
import Race from "./Race.vue";
import { useGarageStore } from "../store/garageStore.ts";
import { storeToRefs } from "pinia";

const garageStore = useGarageStore();
garageStore.getCars();

const { getGarage } = storeToRefs(garageStore);
</script>

<template>
  <div v-for="car in getGarage">
    <Race :car="car" />
  </div>
</template>

<style scoped></style>
