/**
 * Get the API base URL
 * In development: returns empty string to use Vite proxy
 * In production: returns the full API URL from environment variable
 */
export function getApiBaseUrl(): string {
  // In development, use the Vite proxy (empty string means relative URLs)
  // In production, use the full API URL from environment variable
  return import.meta.env.VITE_API_BASE_URL || "";
}

/**
 * Build a full API URL
 * @param path - The API path (e.g., "/api/products")
 * @returns The full URL for the API endpoint
 */
export function getApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  
  // If baseUrl is empty (development), return the path as-is for proxy
  // If baseUrl exists (production), prepend it to the path
  return baseUrl ? `${baseUrl}${path}` : path;
}

