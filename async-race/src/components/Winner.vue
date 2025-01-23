<script setup lang="ts">
import type { Car } from "../common/models/car";
import type { Winner } from "../common/models/winner";

const props = defineProps<{ winner: Winner; car: Car | undefined }>();
</script>

<template>
  <div class="winner-wrapper">
    <p>Results</p>
    <div class="winner-params">
      <p>Wins: {{ props.winner.wins }}</p>
      <p>Time: {{ props.winner.time }}s</p>
    </div>
    <p>Winner Car</p>
    <div class="winner-params">
      <div class="car" :style="{ 'background-color': props.car?.color }"></div>
      <p>{{ props.car?.name }}</p>
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
