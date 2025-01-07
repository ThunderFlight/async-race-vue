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
    await request
      .get<Win[]>(`winners?_page${page.value}$_limit=${limit.value}`)
      .then((win) => {
        winners.value = win;
      });
  }

  async function getWinner(id: number) {
    const response = await request.get<Win>(`winners/${id}`);
    return response;
  }

  async function createWinner(newWinner: Win) {
    request.options.body = JSON.stringify(newWinner);
    await request.post<Win>(`winners`);
  }

  async function deleteWinner(id: number) {
    await request.delete(`winners/${id}`);
  }

  async function updateWinner(id: number, updateData: UpdateWinner) {
    request.options.body = JSON.stringify(updateData);
    await request.delete(`winners/${id}`);
  }

  return {
    winners,
    getWinners,
    getWinner,
    createWinner,
    deleteWinner,
    updateWinner,
    nextPage,
    previousPage,
  };
});
