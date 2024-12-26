import { ref, watchEffect, type Ref } from "vue";

interface UseFetch<B> {
  data: Ref<B | null>;
  error: Ref<string>;
}

export function useFetch<T>(
  url: string,
  requestParams?: RequestInit,
): UseFetch<T> {
  const data = ref(null);
  const error = ref("");

  fetch(url, requestParams)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}

export function useWatchFetch(
  data: Ref,
  url: string,
  requestParams?: RequestInit,
) {
  watchEffect(async () => {
    const response = await fetch(url, requestParams);
    data.value = await response.json();
    console.log(data.value);
  });
}
