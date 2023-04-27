import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	cardTitle: { lineHeight: 1 },

	cardTitle__link: {
		fontSize: 20,
		lineHeight: 1,
		fontWeight: 600,

		['.mantine-Anchor-root']: {
			lineHeight: 1,
		},
	},

	compensation: {
		fontSize: 16,
		fontWeight: 700,
	},

	location: {
		fontSize: 16,
	},

	separator: {
		width: 5,
		height: 5,
		background: theme.colors.gray[6],
		borderRadius: '50%',
		margin: '0 2px',
	},
}));