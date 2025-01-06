<script setup lang="ts">
import { useGarageStore } from "../store/garageStore.ts";
import type { Car } from "../common/model.ts";
import { ref } from "vue";

interface Animation {
  animation: string;
  animationPlayState: string;
  backgroundColor?: string;
}

const props = defineProps<{ car: Car }>();
const garageStore = useGarageStore();
const requestParams = { method: "PATCH" };
const carStyles = ref<Animation>({
  animation: `0s`,
  animationPlayState: "running",
  backgroundColor: `${props.car.color}`,
});

function startEngine(id: number) {
  fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, requestParams)
    .then((res) => res.json())
    .then((json) => {
      carStyles.value.animation = `drive ${json.distance / json.velocity}ms
      forwards`;
      carStyles.value.animationPlayState = "running";
    });

  fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, requestParams)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch(() => {
      console.log("asdf");
      carStyles.value.animationPlayState = "paused";
    });
}

function stopEngine(id: number) {
  fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, requestParams)
    .then((res) => res.json())
    .then(() => {
      carStyles.value.animation = ``;
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
        <button class="stop" @click.permit="stopEngine(props.car.id)">b</button>
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
