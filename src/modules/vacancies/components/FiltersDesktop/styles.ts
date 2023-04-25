import { createStyles } from '@mantine/core';

const COLOR_INDEX = 5;

export const useStyles = createStyles((theme) => ({
	resetText__wrapper: {
		cursor: 'pointer',
	},

	resetText: {
		color: theme.colors.gray[COLOR_INDEX],
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
}));
