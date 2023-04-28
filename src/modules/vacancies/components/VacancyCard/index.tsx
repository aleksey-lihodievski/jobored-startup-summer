import {
	ActionIcon,
	Anchor,
	Breadcrumbs,
	Group,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { IconGeolocation, IconStar, IconStarFilled } from '@assets/icons';

import { getCompensationString } from '@modules/vacancies/helpers';

import { useStyles } from './styles';

interface VacancyCardProps {
	jobTitle: string;
	paymentFrom?: number;
	paymentTo?: number;
	currency: string;
	workType: string;
	location: string;
}

const VacancyCard: React.FC<VacancyCardProps> = ({
	jobTitle,
	paymentFrom,
	paymentTo,
	currency,
	workType,
	location,
}) => {
	const { classes } = useStyles();

	const compensation = getCompensationString(currency, paymentFrom, paymentTo);

	return (
		<Paper component="article" p={23} pb={18} pt={17} withBorder>
			<Stack spacing={12}>
				<Group position="apart" noWrap>
					<Title order={2} className={classes.cardTitle}>
						<Anchor
							component={Link}
							to="/favorites"
							className={classes.cardTitle__link}
						>
							{jobTitle}
						</Anchor>
					</Title>
					<ActionIcon mt={3}>
						<img src={IconStar && IconStarFilled} height={22} alt="Star icon" />
					</ActionIcon>
				</Group>
				<Group>
					<Breadcrumbs
						separator={<div className={classes.separator} />}
						className={classes.breadcrumbs}
					>
						<Text className={classes.compensation}>{compensation}</Text>
						<Text>{workType}</Text>
					</Breadcrumbs>
				</Group>
				<Group spacing={12}>
					<img src={IconGeolocation} alt="" />
					<Text className={classes.location}>{location}</Text>
				</Group>
			</Stack>
		</Paper>
	);
};

export default VacancyCard;
export { VacancyCardSkeleton } from './skeleton';
