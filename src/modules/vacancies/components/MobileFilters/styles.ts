import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	mobileFilters: {
		minWidth: 'unset',
		width: '100%',
	},

	accordion: {
		marginBottom: rem(16),

		['.mantine-Accordion-control']: {
			padding: 0,
		},

		['.mantine-Accordion-content']: {
			padding: 0,
		},

		['.mantine-Accordion-label']: {
			paddingTop: 0,
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan('lg')]: {
			display: 'none',
		},
	},
}));
