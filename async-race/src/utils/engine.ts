import { mande } from "mande";
import { baseUrl } from "./baseUrl";
import type { Engine } from "../common/models/engine";
import type { Drive } from "../common/models/drive";

const engine = mande(baseUrl("engine"));

export const startEngine = (id: number) =>
  engine.patch<Engine>(`?id=${id}&status=started`);

export const stopEngine = (id: number) =>
  engine.patch<Drive>(`?id=${id}&status=stopped`);

export const switchEngine = (id: number) =>
  engine.patch<Drive>(`?id=${id}&status=drive`);
