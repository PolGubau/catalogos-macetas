 import tailwindcss from "@tailwindcss/vite";
import react  from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const apiBaseUrl =
		env.VITE_API_BASE_URL ||
		"https://alex-back-l4uhvp-a22dbf-185-250-36-170.traefik.me";

	return {
		plugins: [
			react(),
 			tailwindcss(),
		],
		server: {
			proxy: {
				"/api": {
					target: apiBaseUrl,
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, "/api"),
				},
			},
		},
	};
});
