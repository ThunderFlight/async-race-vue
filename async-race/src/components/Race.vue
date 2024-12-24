<script setup lang="ts">
import * as models from "../common/model.ts";
const props = defineProps({ car: models.Car });
</script>

<template class="race-wrapper">
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
      <div class="car" :style="{ 'background-color': props.color }"></div>
    </div>
  </div>
</template>

<style scoped>
.race-wrapper {
  .car-control {
  }

  .car-race-control {
  }

  .road {
    .car {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
