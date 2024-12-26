import { useFetch } from "../../common/fetch.ts";

const baseUrl = "http://127.0.0.1:3000";

export function getCars() {
  const garageUrl = baseUrl + "/garage";
  const requestParams = { method: "GET" };
  return useFetch(garageUrl, requestParams);
}

export function createCar(name: string, color: string) {
  const garageUrl = baseUrl + "/garage";
  const dataParams = { name, color };
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataParams),
  };
  return useFetch(garageUrl, requestParams);
}
