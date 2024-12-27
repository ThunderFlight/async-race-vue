<script setup lang="ts">
import Race from "./Race.vue";
import { useGarageStore } from "../store/store.ts";
import { storeToRefs } from "pinia";

const store = useGarageStore();
store.getCars();

const { getGarage } = storeToRefs(store);
</script>

<template>
  <div v-for="car in getGarage">
    <Race
      :car="car"
      @select-car="store.selectCar(car.id)"
      @delete-car="store.deleteCar(car.id)"
    />
  </div>
</template>

<style scoped></style>
