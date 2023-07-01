/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import http from 'https';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	// const isDev = mode === 'development';
	// https: false,
	// rewrite: (path) => path.replace(/^\/api/, ''),
	// configure: (proxy, options) => {
	// options
	// proxy
	// proxy will be an instance of 'http-proxy'
	// },

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
					agent: new http.Agent(),
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		define: {
			'process.env': {},
		},
	});
};
