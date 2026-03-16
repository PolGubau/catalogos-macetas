import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const apiBaseUrl = env.VITE_API_BASE_URL || "http://localhost:8080";

	return {
		plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
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
