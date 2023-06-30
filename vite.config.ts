/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		plugins: [react(), tsconfigPaths(), svgr()],

		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/test/setup.ts',
		},
		resolve: {
			alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
		},
		server: {
			proxy: {
				'/api': {
					target: process.env.VITE_JOBS_API_URL,
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		define: {
			'process.env': {},
		},
	});
};
