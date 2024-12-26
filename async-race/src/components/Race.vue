<script setup lang="ts">
import type { Car } from "../common/model.ts";

const props = defineProps<{ car: Car }>();
</script>

<template>
  <div class="race-wrapper">
    <div class="car-control">
      <div class="car-customization">
        <button class="select-car">select</button>
        <button class="remove-car">remove</button>
      </div>
      <div class="car-race-cntrol">
        <button class="start">a</button>
        <button class="restart">b</button>
      </div>
    </div>
    <div class="road">
      <div>
        <div class="car" :style="{ 'background-color': props.car.color }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-wrapper {
  display: flex;
  align-items: center;

  .car-control {
    display: flex;
    gap: 10px;
  }

  .road {
    width: 100%;
    .car {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
