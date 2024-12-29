<script setup lang="ts">
import { ref } from "vue";
import { useGarageStore } from "../store/garageStore.ts";

const store = useGarageStore();
const createCarText = ref<string>("");
const createCarColor = ref<string>("");
const updateCarText = ref<string>("");
const updateCarColor = ref<string>("");
</script>

<template>
  <div class="forms-wrapper">
    <div class="races-control">
      <button>race</button>
      <button>restart</button>
    </div>
    <div class="create-car-wrapper">
      <input type="text" placeholder="type car brand" v-model="createCarText" />
      <input type="color" v-model="createCarColor" />
      <button @click.prevent="store.createCar(createCarText, createCarColor)">
        create
      </button>
    </div>
    <div class="udpate-car-wrapper">
      <input type="text" placeholder="type car brand" v-model="updateCarText" />
      <input type="color" v-model="updateCarColor" />
      <button @click.prevent="store.updateCar(updateCarText, updateCarColor)">
        update
      </button>
    </div>
    <button>generate cars</button>
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
