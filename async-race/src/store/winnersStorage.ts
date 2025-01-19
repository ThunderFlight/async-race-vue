import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { UpdateWinner, Winner } from "../common/model";
import {
  createWinner,
  deleteWinner,
  getWinner,
  getWinners,
  updateWinner,
} from "../utils/winners";

export const useWinnersStore = defineStore("winners", () => {
  const winners = ref<Winner[]>([]);
  const limit = 7;
  const page = ref(1);
  const winner = ref<Winner>();

  watch(page, () => {
    getAllWinners();
  });

  function nextPage() {
    page.value += 1;
  }

  function previousPage() {
    page.value -= 1;
  }

  function getAllWinners() {
    winners.value = [];

    getWinners(page.value, limit).then((win) => {
      winners.value = win;
    });
  }

  async function getLWinner(id: number) {
    getWinner(id).then((response) => {
      winner.value = { time: response.time, wins: response.wins, id };
    });
  }

  async function createLWinner(newWinner: Winner) {
    createWinner(newWinner);
    getAllWinners();
  }

  async function deleteLWinner(id: number) {
    deleteWinner(id);
    getAllWinners();
  }

  async function updateLWinner(id: number, updateData: UpdateWinner) {
    updateWinner(id, updateData);
    getAllWinners();
  }

  return {
    winners,
    winner,
    getWinners: getAllWinners,
    getWinner: getLWinner,
    createWinner: createLWinner,
    deleteWinner: deleteLWinner,
    updateWinner: updateLWinner,
    nextPage,
    previousPage,
  };
});
