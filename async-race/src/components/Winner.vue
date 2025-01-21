<script setup lang="ts">
import type { Winner } from "../common/models/winner";
import { useGarageStore } from "../store/garageStore";
import { storeToRefs } from "pinia";

const props = defineProps<{ winnerResults: Winner }>();

const garageStorage = useGarageStore();
const { car } = storeToRefs(garageStorage);

garageStorage.getCar(props.winnerResults.id);
</script>

<template>
  <div class="winner-wrapper">
    <p>Results</p>
    <div class="winner-params">
      <p>Wins: {{ props.winnerResults.wins }}</p>
      <p>Time: {{ props.winnerResults.time }}s</p>
    </div>
    <p>Winner Car</p>
    <div class="winner-params">
      <div class="car" :style="{ 'background-color': car?.color }"></div>
      <p>{{ car?.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.winner-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;

  .winner-params {
    display: flex;
    align-items: center;
    gap: 10px;

    .car {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
