import { defineStore } from "pinia";
import type { Car } from "../common/model";
import { getCarBrand, getRandomColor } from "../common/functions";

interface State {
  garage: Car[];
  selectedCarId: null | number;
}

const baseUrl = "http://127.0.0.1:3000/garage";

export const useGarageStore = defineStore("garage", {
  state: (): State => ({
    garage: [],
    selectedCarId: null,
  }),
  getters: {
    getGarage: (state) => {
      return state.garage;
    },
  },
  actions: {
    selectCar(id: number) {
      this.selectedCarId = id;
    },

    getCars() {
      const requestParams = { method: "GET" };

      fetch(baseUrl, requestParams)
        .then((res) => res.json())
        .then((json) => (this.garage = json));
    },

    createCar(name: string, color: string) {
      const dataParams = { name, color };
      const requestParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataParams),
      };
      fetch(baseUrl, requestParams).then((res) => res.json());

      const randomId = Math.floor(Math.random() * 9999);

      this.garage = [...this.garage, { name, color, id: randomId }];
    },

    createCars() {
      for (let i = 0; i < 50; i++) {
        this.createCar(getCarBrand(), getRandomColor());
      }
    },

    deleteCar(id: number) {
      const requestParams = {
        method: "DELETE",
      };

      fetch(baseUrl + `/${id}`, requestParams);
      console.log(id);
      console.log(this.garage);
      this.garage = this.garage.filter((car) => car.id !== +id);
    },

    updateCar(name: string, color: string) {
      if (this.selectedCarId === null) {
        return;
      }

      const dataParams = { name, color };
      const requestParams = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataParams),
      };
      fetch(baseUrl + `/${this.selectedCarId}`, requestParams)
        .then((res) => res.json())
        .then((json) => {
          const index = this.garage.findIndex((car) => car.id === json.id);
          this.garage.splice(index, 1, json);
        });
    },
  },
});
