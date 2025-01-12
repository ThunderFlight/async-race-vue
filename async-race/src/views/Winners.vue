<script setup lang="ts">
import Winner from "../components/Winner.vue";
import { useWinnersStore } from "../store/winnersStorage.ts";
import { useGarageStore } from "../store/garageStore.ts";
import { storeToRefs } from "pinia";

const winnerStorage = useWinnersStore();
const garageStorage = useGarageStore();
const { winners } = storeToRefs(winnerStorage);
const { garage } = storeToRefs(garageStorage);
winnerStorage.getWinners();
</script>

<template>
  <div v-for="winnerResults in winners">
    <Winner
      :winnerResults="winnerResults"
      :winnerCar="garage.find((car) => car.id === winnerResults.id)"
    />
  </div>
  <button @click.prevent="winnerStorage.nextPage()">next</button>
  <button @click.prevent="winnerStorage.previousPage()">previous</button>
</template>

<style scoped></style>
