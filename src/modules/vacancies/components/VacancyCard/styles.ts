import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	cardTitle: {
		lineHeight: 1,
	},

	cardTitle__link: {
		fontSize: rem(20),
		lineHeight: 1,
		fontWeight: 600,

		wordBreak: 'break-word',

		['.mantine-Anchor-root']: {
			lineHeight: 1,
		},

		[theme.fn.smallerThan('lg')]: {
			fontSize: rem(18),
		},
	},

	compensation: {
		fontWeight: 700,
	},

	breadcrumbs: {
		flexWrap: 'wrap',

		[theme.fn.smallerThan('md')]: {
			['.mantine-Breadcrumbs-separator']: {
				display: 'none',
			},

			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: 11,
		},
	},

	location: {
		fontSize: rem(16),
	},

	startIcon: {
		width: 22,
		height: 22,
	},

	locationIcon: {
		width: 16,
		height: 18,
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

		[theme.fn.smallerThan('md')]: {
			['.mantine-Breadcrumbs-separator']: {
				display: 'none',
			},

			flexDirection: 'column',
			alignItems: 'flex-start',
			gap: 11,
		},
	},

	skeletonLocation: {
		display: 'flex',
		width: '100%',
		maxWidth: '250px',
	},
}));
