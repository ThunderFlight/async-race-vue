import { mande } from "mande";
import { baseUrl } from "./baseUrl";
import type { Winner } from "../common/models/winner";
import type { UpdateWinner } from "../common/models/updateWiner";

const winners = mande(baseUrl("winners"));

export const getWinners = async (page: number, limit: number) =>
  await winners.get<Winner[]>(`?_limit=${limit}_page=${page}`);

export const getWinner = async (id: number) =>
  await winners.get<Winner>(`/${id}`);

export const createWinner = (newWinner: Winner) =>
  winners.post<Winner>(newWinner);

export const deleteWinner = (id: number) => winners.delete(`/${id}`);

export const updateWinner = (id: number, updateData: UpdateWinner) =>
  winners.put<UpdateWinner>(`/${id}`, updateData);
