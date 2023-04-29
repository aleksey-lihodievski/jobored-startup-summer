import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
	image: {
		maxWidth: 240,
	},

	title: {
		fontSize: rem(24),
		textAlign: 'center',
	},

	button: {
		fontSize: rem(14),
	},
}));
