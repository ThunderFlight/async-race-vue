<script setup lang="ts">
import type { Car } from "../common/model.ts";

const props = defineProps<{ car: Car }>();
const emit = defineEmits<{
  (e: "deleteCar"): void;
  (e: "selectCar"): void;
}>();
</script>

<template>
  <div class="race-wrapper">
    <div class="car-control">
      <div class="car-customization">
        <button class="select-car" @click.permit="emit('selectCar')">
          select
        </button>
        <button class="remove-car" @click.permit="emit('deleteCar')">
          remove
        </button>
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
