<script setup lang="ts">
import { reactive } from "vue";
import { useGarageStore } from "../store/garageStore.ts";

const garageStore = useGarageStore();
const formValues = reactive({
  createCarText: "",
  createCarColor: "",
  updateCarText: "",
  updateCarColor: "",
});
</script>

<template>
  <div class="forms-wrapper">
    <div class="races-control">
      <button @click.prevent="garageStore.startAllEngines()">race</button>
      <button @click.permit="garageStore.stopAllEngines()">restart</button>
    </div>
    <div class="create-car-wrapper">
      <input
        type="text"
        placeholder="type car brand"
        v-model="formValues.createCarText"
      />
      <input type="color" v-model="formValues.createCarColor" />
      <button
        @click.prevent="
          garageStore.createCar(
            formValues.createCarText,
            formValues.createCarColor,
          )
        "
      >
        create
      </button>
    </div>
    <div class="udpate-car-wrapper">
      <input
        type="text"
        placeholder="type car brand"
        v-model="formValues.updateCarText"
      />
      <input type="color" v-model="formValues.updateCarColor" />
      <button
        @click.prevent="
          garageStore.updateCar(
            formValues.updateCarText,
            formValues.updateCarColor,
          )
        "
      >
        update
      </button>
    </div>
    <button @click.prevent="garageStore.createCars()">generate cars</button>
  </div>
</template>

<style scoped>
.forms-wrapper {
  display: flex;

  .races-control {
    display: flex;
    align-items: center;
  }

  .create-car-wrapper {
    display: flex;
    align-items: center;
  }

  .udpate-car-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
