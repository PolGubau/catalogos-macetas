/**
 * Get the API base URL
 * Always returns empty string to use proxy (Vite in dev, Vercel in production)
 */
export function getApiBaseUrl(): string {
	// Always use relative URLs - proxies handle the routing:
	// - Development: Vite proxy (vite.config.ts)
	// - Production: Vercel rewrites (vercel.json)
	return "";
}

/**
 * Build a full API URL
 * @param path - The API path (e.g., "/api/products")
 * @returns The full URL for the API endpoint
 */
export function getApiUrl(path: string): string {
	// Always return the path as-is to use the proxy
	return path;
}
