import { ref, watchEffect, toValue, type Ref } from "vue";

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

  watchEffect(async () => {
    data.value = null;
    error.value = "";

    await fetch(toValue(url), requestParams)
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  });
  return { data, error };
}
