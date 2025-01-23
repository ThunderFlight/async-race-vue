<script setup lang="ts">
import Winner from "../components/Winner.vue";
import { useGarageStore } from "../store/garageStore.ts";
import { useWinnersStore } from "../store/winnersStorage.ts";
import { storeToRefs } from "pinia";

const winnerStorage = useWinnersStore();
const garageStorage = useGarageStore();

const { garage } = storeToRefs(garageStorage);
const { winners } = storeToRefs(winnerStorage);

winnerStorage.getWinners();
garageStorage.getGarage();

function getWinnerCar(id: number) {
  const car = garage.value.find((car) => car.id === id);
  return car;
}
</script>

<template>
  <div v-for="winnerResults in winners">
    <Winner :winner="winnerResults" :car="getWinnerCar(winnerResults.id)" />
  </div>
  <button @click.prevent="winnerStorage.nextPage()">next</button>
  <button @click.prevent="winnerStorage.previousPage()">previous</button>
</template>

<style scoped></style>
