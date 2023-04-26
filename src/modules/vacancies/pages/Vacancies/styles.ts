import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
	columnsWrapper: {
		width: '100%',
	},

	contentWrapper: {
		flex: 1,
	},

	searchInput: {
		['& .mantine-Input-input']: {
			fontSize: rem(14),
		},

		['& .mantine-Input-rightSection']: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},

	searchButton: {
		fontSize: rem(14),

		height: 'unset',
		padding: '9px 20px',
	},
}));
