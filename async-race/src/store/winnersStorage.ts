import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
import { request } from "../utils/requests";
import type { Win } from "../common/model";

interface UpdateWinner {
  wins: number;
  time: number;
}

export const useWinnersStore = defineStore("winners", () => {
  const winners = ref<Win[]>([]);
  const limit = ref(7);
  const page = ref(1);
  const winner = ref<Win | null>(null);

  watchEffect(() => {
    page;
    getWinners();
  });

  function nextPage() {
    page.value += 1;
  }

  function previousPage() {
    if (!page.value) {
      return;
    }
    page.value -= 1;
  }

  async function getWinners() {
    winner.value = null;
    await request
      .get<Win[]>(`winners?_page${page.value}$_limit=${limit.value}`)
      .then((win) => {
        winners.value = win;
      });
  }

  async function getWinner(id: number) {
    await request.get<Win>(`winners/${id}`).then((response) => {
      winner.value = { time: response.time, wins: response.wins, id };
    });
  }

  async function createWinner(newWinner: Win) {
    await request.post<Win>(`winners`, newWinner);
  }

  async function deleteWinner(id: number) {
    await request.delete(`winners/${id}`);
  }

  async function updateWinner(id: number, updateData: UpdateWinner) {
    await request.put<UpdateWinner>(`winners/${id}`, updateData);
  }

  return {
    winners,
    winner,
    getWinners,
    getWinner,
    createWinner,
    deleteWinner,
    updateWinner,
    nextPage,
    previousPage,
  };
});
