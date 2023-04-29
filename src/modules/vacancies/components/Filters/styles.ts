import { createStyles, rem } from '@mantine/core';

const COLOR_INDEX = 5;

export const useStyles = createStyles((theme) => ({
	filterDesktop__wrapper: {
		padding: 20,
		paddingTop: 14,
		minWidth: 315,
	},

	title: {
		fontSize: rem(20),
	},

	resetText__wrapper: {
		cursor: 'pointer',
	},

	resetText: {
		color: theme.colors.gray[COLOR_INDEX],
		fontSize: rem(14),
		fontWeight: 500,
	},

	closeIcon: {
		marginLeft: '5px',
		marginBottom: '-2px',
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
