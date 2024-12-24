import { useFetch } from "../fetch";

const baseUrl = "http://127.0.0.1:3000";
export function getCars() {
  const allCarsUrl = baseUrl + "/garage";
  return useFetch(allCarsUrl);
}
