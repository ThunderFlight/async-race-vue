<script setup lang="ts">
import { useGarageStore } from "../store/garageStore.ts";
import { storeToRefs } from "pinia";
import type { Car } from "../common/model.ts";
import { ref, watchEffect } from "vue";

interface Animation {
  animation: string;
  animationPlayState: string;
  backgroundColor?: string;
}

const props = defineProps<{ car: Car }>();
const garageStore = useGarageStore();
const { driveOptions } = storeToRefs(garageStore);
const carStyles = ref<Animation>({
  animation: `0s`,
  animationPlayState: "running",
  backgroundColor: `${props.car.color}`,
});

watchEffect(() => {
  driveOptions;
  const driveOption = garageStore.driveOptions.find(
    (options) => options.id === props.car.id,
  );

  if (driveOption?.driveStatus) {
    carStyles.value.animation = `drive ${driveOption?.time}ms forwards`;
    carStyles.value.animationPlayState = "running";
  } else {
    carStyles.value.animationPlayState = "paused";
  }

  if (driveOption?.resetStatus) {
    carStyles.value.animation = "";
  }
});
</script>

<template>
  <div class="race-wrapper">
    <div class="car-control">
      <div class="car-customization">
        <button
          class="select-car"
          @click.permit="garageStore.selectCar(props.car.id)"
        >
          select
        </button>
        <button
          class="remove-car"
          @click.permit="garageStore.deleteCar(props.car.id)"
        >
          remove
        </button>
      </div>

      <div class="car-race-cntrol">
        <button
          class="start"
          @click.permit="garageStore.startEngine(props.car.id)"
        >
          a
        </button>
        <button
          class="stop"
          @click.permit="garageStore.stopEngine(props.car.id)"
        >
          b
        </button>
      </div>
    </div>
    <div class="road">
      <div class="car animated" :style="carStyles"></div>
      <p>{{ props.car.name }}</p>
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
    position: relative;
    left: 0;
    top: 0;

    .car {
      width: 20px;
      height: 20px;
      position: absolute;
    }
  }
}
</style>
