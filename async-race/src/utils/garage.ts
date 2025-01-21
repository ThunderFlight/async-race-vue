import { mande } from "mande";
import { baseUrl } from "./baseUrl";
import type { Car } from "../common/models/car";

const garage = mande(baseUrl("garage"));

export const getGarage = async (limit: number, page: number) =>
  await garage.get<Car[]>(`?_limit=${limit}_page=${page}`);

export const getCar = async (id: number) => await garage.get<Car>(`/${id}`);

export const createCar = (name: string, color: string) =>
  garage.post({ name, color });

export const deleteCar = (id: number) => garage.post(`${id}`);

export const updateCar = (name: string, color: string, id: number) =>
  garage.put<Car>(`${id}`, { name, color });
