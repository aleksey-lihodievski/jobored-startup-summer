import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	cardTitle: {
		lineHeight: 1,
	},

	cardTitle__link: {
		fontSize: 20,
		lineHeight: 1,
		fontWeight: 600,

		wordBreak: 'break-word',

		['.mantine-Anchor-root']: {
			lineHeight: 1,
		},
	},

	compensation: {
		fontSize: 16,
		fontWeight: 700,
	},

	breadcrumbs: {
		flexWrap: 'wrap',
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

	skeletonBreadcrumbs: {
		display: 'flex',
		width: '100%',
		maxWidth: '500px',
	},

	skeletonLocation: {
		display: 'flex',
		width: '100%',
		maxWidth: '250px',
	},
}));
