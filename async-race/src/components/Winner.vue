<script setup lang="ts">
import type { Win, Car } from "../common/model";

const props = defineProps<{ winnerResults: Win; winnerCar: Car }>();
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
      <div
        class="car"
        :style="{ 'background-color': props.winnerCar?.color }"
      ></div>
      <p>{{ winnerCar?.name }}</p>
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
