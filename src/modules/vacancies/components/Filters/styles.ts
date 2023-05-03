import { createStyles, rem } from '@mantine/core';

const COLOR_INDEX = 5;

export const useStyles = createStyles((theme) => ({
	filterDesktop__wrapper: {
		padding: 20,
		paddingTop: 14,
		minWidth: 315,
	},

	filters__select: {
		['.mantine-Select-rightSection']: {
			pointerEvents: 'none',
		},
	},

	closeIcon: {
		width: 16,
		height: 16,
		marginLeft: '5px',
	},

	chevronDownIcon: {
		width: 16,
		height: 8,
	},

	numberInput: {
		['& .mantine-NumberInput-controlUp']: {
			justifyContent: 'flex-start',
			alignItems: 'flex-end',

			cursor: 'pointer',
			color: theme.colors.gray[COLOR_INDEX],
			border: 0,

			...theme.fn.hover({
				background: 'transparent',
			}),
		},

		['& .mantine-NumberInput-controlDown']: {
			justifyContent: 'flex-start',
			alignItems: 'flex-start',

			cursor: 'pointer',
			color: theme.colors.gray[COLOR_INDEX],
			border: 0,

			...theme.fn.hover({
				background: 'transparent',
			}),
		},
	},

	filterButton: {
		marginTop: 20,
		fontSize: rem(14),
	},
}));
