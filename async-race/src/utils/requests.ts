import { mande } from "mande";

const baseUrl = "http://127.0.0.1:3000/";

export const request = mande(baseUrl);
