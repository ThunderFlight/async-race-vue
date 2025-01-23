import { mande } from "mande";
import { baseUrl } from "./baseUrl";
import type { Car } from "../common/models/car";

const garage = mande(baseUrl("garage"));

export async function getGarage(limit: number, page: number) {
  return await garage.get<Car[]>(`?_limit=${limit}_page=${page}`);
}

export async function getCar(id: number) {
  return await garage.get<Car>(`${id}`);
}

export function createCar(name: string, color: string) {
  return garage.post({ name, color });
}

export function deleteCar(id: number) {
  return garage.post(`${id}`);
}

export function updateCar(name: string, color: string, id: number) {
  return garage.put<Car>(`${id}`, { name, color });
}
