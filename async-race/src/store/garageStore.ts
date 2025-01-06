import { defineStore } from "pinia";
import type { Car } from "../common/model";
import { getCarBrand, getRandomColor } from "../common/functions";
import { request } from "../utils/requests.ts";
import { ref, watchEffect } from "vue";

export const useGarageStore = defineStore("garage", () => {
  const garage = ref<Car[]>([]);
  const limit = ref(7);
  const page = ref(1);
  const selectedCarId = ref<number | null>(null);

  watchEffect(() => {
    page;
    garage;
    getGarage();
  });

  async function getGarage() {
    const queryParams = { "X-Total-Count": `${limit}` };
    request.options.query = JSON.stringify(queryParams);
    await request
      .get<Car[]>(`garage?_page=${page.value}&_limit=${limit.value}`)
      .then((cars) => {
        garage.value = cars;
      });
    return garage;
  }

  function nextPage() {
    page.value += 1;
  }

  function previousPage() {
    if (!page.value) {
      return;
    }
    page.value -= 1;
  }

  function selectCar(id: number) {
    selectedCarId.value = id;
  }

  async function createCar(name: string, color: string) {
    const dataParams = { name, color };

    request.options.body = JSON.stringify(dataParams);
    await request.post("garage");
    //const randomId = Math.floor(Math.random() * 9999);
    //this.garage = [...this.garage, { name, color, id: randomId }];
  }

  function createCars() {
    for (let i = 0; i < 50; i++) {
      createCar(getCarBrand(), getRandomColor());
    }
  }

  async function deleteCar(id: number) {
    await request.delete(`garage/${id}`);
    //this.garage = this.garage.filter((car) => car.id !== +id);
  }

  async function updateCar(name: string, color: string) {
    if (selectedCarId.value === null) {
      return;
    }

    const dataParams = { name, color };

    request.options.headers = { "Content-Type": "application/json" };
    request.options.body = JSON.stringify(dataParams);

    await request.put<Car>(`/${selectedCarId.value}`);

    //const index = this.garage.findIndex((car) => car.id === updatedCar.id);
    //this.garage.splice(index, 1, updatedCar);
  }

  return {
    garage,
    page,
    selectedCarId,
    selectCar,
    getGarage,
    createCar,
    deleteCar,
    updateCar,
    createCars,
    nextPage,
    previousPage,
  };
});
