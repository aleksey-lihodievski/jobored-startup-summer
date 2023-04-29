import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
	columnsWrapper: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		width: '100%',
	},

	flex1: {
		flex: 1,
	},

	searchInput: {
		['& .mantine-Input-input']: {
			fontSize: rem(14),
		},
	},

	inputButton: {
		fontSize: rem(14),
	},

	pagination: {
		justifyContent: 'center',
		marginTop: 40,
	},

	hiddenDesktop: {
		[theme.fn.largerThan('lg')]: {
			display: 'none',
		},
	},

	hiddenTabletsAndBelow: {
		[theme.fn.smallerThan('lg')]: {
			display: 'none',
		},
	},
}));
