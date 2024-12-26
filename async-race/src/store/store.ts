import { defineStore } from "pinia";
import { useFetch } from "../common/fetch";
import type { Car } from "../common/model";
import { getCars } from "../services/RaceData/race-data";

interface State {
  garage: Car[];
}

export const useGarageStore = defineStore("garage", {
  state: (): State => ({
    garage: [],
  }),
  getters: {
    getGarage: (state) => {
      console.log(state.garage);
      return state.garage;
    },
  },
  actions: {
    getCars() {
      const cars = getCars().data.value;
      console.log(getCars());
      if (!Array.isArray(cars)) {
        return;
      }
      this.garage = cars;
    },

    createCar(name: string, color: string) {
      const garageUrl = "http://127.0.0.1:3000/garage";
      const dataParams = { name, color };
      const requestParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataParams),
      };
      useFetch(garageUrl, requestParams);
      const randomId = Math.floor(Math.random() * 9999);

      this.garage = [...this.garage, { name, color, id: randomId }];
    },
  },
});
