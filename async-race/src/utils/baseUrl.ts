const envBaseUrl = import.meta.env.VITE_API_URL;

export function baseUrl(path?: string) {
  if (!path) {
    return envBaseUrl;
  }

  return envBaseUrl + path;
}
