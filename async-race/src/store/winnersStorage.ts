import { defineStore } from "pinia";

interface Store {
  winners: [];
}

export const useWinnersStore = defineStore("winners", {
  state: (): Store => ({
    winners: [],
  }),
  getters: {
    getWinners: (state) => state.winners,
  },
  actions: {},
});
