import { ref } from "vue";

export function useFetch(url: string, requestParams?: RequestInit) {
  const data = ref(null);
  const error = ref(null);

  fetch(url, requestParams)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
