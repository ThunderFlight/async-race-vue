<script setup lang="ts">
import Race from "./Race.vue";
import * as raceData from "../services/RaceData/race-data.ts";
const { data, error } = raceData.getCars();
</script>

<template>
  <div v-for="(item, key) in data" :key="key">
    <Race :car="item" />
  </div>
</template>

<style scoped></style>
