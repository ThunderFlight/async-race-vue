import { defineStore } from "pinia";
import type { Car, Drive, DriveOptions, Engine } from "../common/model";
import { getCarBrand, getRandomColor } from "../common/functions";
import { request } from "../utils/requests.ts";
import { ref, watchEffect } from "vue";

export const useGarageStore = defineStore("garage", () => {
  const garage = ref<Car[]>([]);
  const limit = ref(7);
  const page = ref(1);
  const selectedCarId = ref<number | null>(null);
  const driveOptions = ref<DriveOptions[]>([]);

  watchEffect(() => {
    page;
    garage;
    getGarage();
  });

  function startAllEngines() {
    garage.value.forEach((car) => startEngine(car.id));
  }

  function stopAllEngines() {
    garage.value.forEach((car) => stopEngine(car.id));
  }

  async function startEngine(id: number) {
    driveOptions.value = [];
    await request
      .patch<Engine>(`engine?id=${id}&status=started`)
      .then((engine) => {
        const time = engine.distance / engine.velocity;
        const driveStatus = true;
        const resetStatus = false;
        driveOptions.value = [
          ...driveOptions.value,
          { time, driveStatus, resetStatus, id },
        ];
      });

    await request.patch<Drive>(`engine?id=${id}&status=drive`).catch(() => {
      const findedCar = driveOptions.value.findIndex((car) => car.id === id);
      driveOptions.value[findedCar].driveStatus = false;
    });
  }

  async function stopEngine(id: number) {
    await request.patch(`engine?id=${id}&status=stopped`).then(() => {
      const findedCar = driveOptions.value.findIndex((car) => car.id === id);
      driveOptions.value[findedCar].resetStatus = true;
    });
  }

  async function getGarage() {
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
  }

  function createCars() {
    for (let i = 0; i < 50; i++) {
      createCar(getCarBrand(), getRandomColor());
    }
  }

  async function deleteCar(id: number) {
    await request.delete(`garage/${id}`);
  }

  async function updateCar(name: string, color: string) {
    if (selectedCarId.value === null) {
      return;
    }

    const dataParams = { name, color };

    request.options.headers = { "Content-Type": "application/json" };
    request.options.body = JSON.stringify(dataParams);

    await request.put<Car>(`/${selectedCarId.value}`);
  }

  return {
    garage,
    page,
    selectedCarId,
    driveOptions,
    selectCar,
    getGarage,
    createCar,
    deleteCar,
    updateCar,
    createCars,
    nextPage,
    previousPage,
    startEngine,
    stopEngine,
    startAllEngines,
    stopAllEngines,
  };
});
