import { createStyles, rem } from '@mantine/core';

const SEARCH_ICON_LEFT_PADDING = 14;
const SEARCH_ICON_WIDTH = 13;

interface VacancyPageStylesProps {
	iconSectionWidth: number;
}

export const useStyles = createStyles(
	(theme, { iconSectionWidth }: VacancyPageStylesProps) => ({
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

		searchIcon: {
			width: SEARCH_ICON_WIDTH,
			boxSizing: 'content-box',
			aspectRatio: '1 / 1',
			paddingLeft: SEARCH_ICON_LEFT_PADDING,
			paddingRight:
				iconSectionWidth - SEARCH_ICON_LEFT_PADDING - SEARCH_ICON_WIDTH,
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
	})
);
