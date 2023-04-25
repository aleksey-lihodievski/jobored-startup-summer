import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { refetchOnMount: false, refetchOnWindowFocus: false },
	},
});

const overrides: MantineThemeOverride = {
	components: {
		Paper: {
			styles: () => ({
				root: {
					borderRadius: 12,
				},
			}),
		},

		Button: {
			styles: () => ({
				root: {
					borderRadius: 8,
				},
			}),
		},

		Input: {
			styles: () => ({
				input: {
					borderRadius: '8px',
				},
			}),
		},

		NumberInput: {
			styles: () => ({
				input: {
					borderRadius: '8px',
				},
			}),
		},

		Select: {
			styles: () => ({
				input: {
					borderRadius: '8px',
				},
			}),
		},
	},
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={overrides} withGlobalStyles withNormalizeCSS>
				<BrowserRouter>
					<App />
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</MantineProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
