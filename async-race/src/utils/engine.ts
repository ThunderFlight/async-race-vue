import { mande } from "mande";
import { baseUrl } from "./requests";
import type { Car, Drive, Engine } from "../common/model";

const engine = mande(baseUrl("engine"));
const garage = mande(baseUrl("garage"));

export const startEngine = (id: number) =>
  engine.patch<Engine>(`?id=${id}&status=started`);

export const stopEngine = (id: number) =>
  engine.patch<Drive>(`?id=${id}&status=stopped`);

export const switchEngine = (id: number) =>
  engine.patch<Drive>(`?id=${id}&status=drive`);

export const getGarage = async (limit: number, page: number) =>
  await garage.get<Car[]>(`?_limit=${limit}_page=${page}`);

export const getCar = async (id: number) => await garage.get<Car>(`/${id}`);

export const createCar = (name: string, color: string) =>
  garage.post({ name, color });

export const deleteCar = (id: number) => garage.post(`${id}`);

export const updateCar = (name: string, color: string, id: number) =>
  garage.put<Car>(`${id}`, { name, color });
