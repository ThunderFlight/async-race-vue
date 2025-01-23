import { defineStore } from "pinia";
import { getCarBrand, getRandomColor } from "../common/functions";
import { ref, watch } from "vue";
import { startEngine, stopEngine, switchEngine } from "../utils/engine";
import {
  createCar,
  deleteCar,
  getCar,
  getGarage,
  updateCar,
} from "../utils/garage";
import type { Car } from "../common/models/car";
import type { DriveOption } from "../common/models/driveOption";
import type { Engine } from "../common/models/engine";
import type { Drive } from "../common/models/drive";

export const useGarageStore = defineStore("garage", () => {
  const garage = ref<Car[]>([]);
  const limit = 7;
  const page = ref(1);
  const selectedCarId = ref<number>();
  const driveOptions = ref<DriveOption[]>([]);
  const carDriveStatus = ref<true>();
  const car = ref<Car>();

  watch(page, () => {
    getCars();
  });

  function nextPage() {
    page.value += 1;
  }

  function previousPage() {
    page.value -= 1;
  }

  function selectCar(id: number) {
    selectedCarId.value = id;
  }

  function startAllEngines() {
    garage.value.forEach((car) => startCarEngine(car.id));
  }

  function stopAllEngines() {
    garage.value.forEach((car) => stopCarEngine(car.id));
  }

  function setDriveOptionsParams(value: Engine, id: number) {
    const time = value.distance / value.velocity;

    driveOptions.value = [
      ...driveOptions.value,
      {
        time,
        startedStatus: true,
        driveStatus: false,
        resetStatus: false,
        id,
      },
    ];
  }

  function setEngineStatus(id: number) {
    const car = driveOptions.value.findIndex((car) => car.id === id);
    driveOptions.value[car].startedStatus = false;
  }

  function setDriveStatus(value: Drive | void, id: number) {
    if (!value) {
      return;
    }

    const car = driveOptions.value.findIndex((car) => car.id === id);
    driveOptions.value[car].driveStatus = true;
  }

  function startCarEngine(id: number) {
    driveOptions.value = [];
    carDriveStatus.value = undefined;

    startEngine(id)
      .then((value) => setDriveOptionsParams(value, id))
      .then(() =>
        switchEngine(id)
          .catch(() => setEngineStatus(id))
          .then((value) => setDriveStatus(value, id)),
      );
  }

  function stopCarEngine(id: number) {
    stopEngine(id).then(() => {
      const car = driveOptions.value.findIndex((car) => car.id === id);
      driveOptions.value[car].resetStatus = true;
    });
  }

  function getCars() {
    getGarage(limit, page.value).then((cars) => {
      garage.value = cars;

      return garage;
    });
  }

  function getOneCar(id: number) {
    getCar(id).then((value) => {
      car.value = value;

      return car.value;
    });
  }

  function generateCar(name: string, color: string) {
    createCar(name, color).then(getCars);
  }

  function createCars() {
    for (let i = 0; i < 100; i++) {
      generateCar(getCarBrand(), getRandomColor());
    }
  }

  function removeCar(id: number) {
    deleteCar(id).then(getCars);
  }

  function updatCar(name: string, color: string) {
    if (!selectedCarId.value) {
      return;
    }

    updateCar(name, color, selectedCarId.value).then(getCars);
  }

  return {
    garage,
    page,
    selectedCarId,
    driveOptions,
    carDriveStatus,
    car,
    selectCar,
    getGarage: getCars,
    getCar: getOneCar,
    createCar: generateCar,
    deleteCar: removeCar,
    updateCar: updatCar,
    createCars,
    nextPage,
    previousPage,
    startEngine: startCarEngine,
    stopEngine: stopCarEngine,
    startAllEngines,
    stopAllEngines,
  };
});
