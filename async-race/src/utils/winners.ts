import { mande } from "mande";
import { baseUrl } from "./baseUrl";
import type { Winner } from "../common/models/winner";
import type { UpdateWinner } from "../common/models/updateWiner";

const winners = mande(baseUrl("winners"));

export async function getWinners(page: number, limit: number) {
  return await winners.get<Winner[]>(`?_limit=${limit}_page=${page}`);
}

export async function getWinner(id: number) {
  return await winners.get<Winner>(`/${id}`);
}

export function createWinner(newWinner: Winner) {
  return winners.post<Winner>(newWinner);
}

export function deleteWinner(id: number) {
  return winners.delete(`/${id}`);
}

export function updateWinner(id: number, updateData: UpdateWinner) {
  return winners.put<UpdateWinner>(`/${id}`, updateData);
}
