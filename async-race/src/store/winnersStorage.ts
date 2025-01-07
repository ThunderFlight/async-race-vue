import { defineStore } from "pinia";
import { ref } from "vue";
import { request } from "../utils/requests";
import type { Win } from "../common/model";

interface UpdateWinner {
  wins: number;
  time: number;
}

export const useWinnersStore = defineStore("winners", () => {
  const winners = ref<Win[]>([]);
  async function getWinners() {
    await request.get<Win[]>(`winners`).then((win) => {
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
  };
});
