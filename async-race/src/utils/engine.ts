import { mande } from "mande";
import { baseUrl } from "./baseUrl";
import type { Engine } from "../common/models/engine";
import type { Drive } from "../common/models/drive";

const engine = mande(baseUrl("engine"));

export function startEngine(id: number) {
  return engine.patch<Engine>(`?id=${id}&status=started`);
}

export function stopEngine(id: number) {
  return engine.patch<Drive>(`?id=${id}&status=stopped`);
}

export function switchEngine(id: number) {
  return engine.patch<Drive>(`?id=${id}&status=drive`);
}
