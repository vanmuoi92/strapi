import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			"@": path.resolve(
				fileURLToPath(new URL(".", import.meta.url)),
				"src",
			),
		},
	},

	server: {
		port: 3000,
		host: true,
	},

	preview: {
		port: 3000,
	},
});
