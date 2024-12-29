<script setup lang="ts">
import { useGarageStore } from "../store/garageStore.ts";
import type { Car } from "../common/model.ts";
import { ref } from "vue";

const props = defineProps<{ car: Car }>();
const garageStore = useGarageStore();
const requestParams = { method: "PATCH" };
const carRaceTime = ref<number>(0);
const setAnimation = ref<string>("");

async function startEngine(id: number) {
  await fetch(
    `http://127.0.0.1:3000/engine?id=${id}&status=started`,
    requestParams,
  )
    .then((res) => res.json())
    .then((json) => {
      carRaceTime.value = json.distance / json.velocity;
      setAnimation.value = "drive";
    });
}
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
        <button class="start" @click.permit="startEngine(props.car.id)">
          a
        </button>
        <button class="restart">b</button>
      </div>
    </div>
    <div class="road">
      <div
        class="car animated"
        :style="{
          'background-color': props.car.color,
          animation: `${setAnimation} ${carRaceTime}ms forwards`,
        }"
      ></div>
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
