<script setup lang="ts">
import Winner from "../components/Winner.vue";
import { useWinnersStore } from "../store/winnersStorage.ts";
import { storeToRefs } from "pinia";

const winnerStorage = useWinnersStore();
const { winners } = storeToRefs(winnerStorage);

winnerStorage.getWinners();
</script>

<template>
  <div v-for="winnerResults in winners">
    <Winner :winnerResults="winnerResults" />
  </div>
  <button @click.prevent="winnerStorage.nextPage()">next</button>
  <button @click.prevent="winnerStorage.previousPage()">previous</button>
</template>

<style scoped></style>
