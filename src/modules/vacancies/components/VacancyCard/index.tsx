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
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { IconGeolocation, IconStar, IconStarFilled } from '@assets/icons';

import { getCompensationString } from '@modules/vacancies/helpers';
import {
	addFavoriteVacancy,
	deleteFavoriteVacancy,
	isFavoriteVacancy,
} from '@modules/vacancies/services';
import { Vacancy } from '@modules/vacancies/types';

import { useStyles } from './styles';

interface VacancyCardProps {
	data: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ data }) => {
	const { classes } = useStyles();

	const {
		type_of_work: { title: workType },
		profession,
		town: { title: location },
		payment_from: paymentFrom,
		payment_to: paymentTo,
		currency,
	} = data;

	const compensation = getCompensationString(currency, paymentFrom, paymentTo);

	const [isFavorite, setIsFavorite] = useState(isFavoriteVacancy(data.id));

	const toggleIsFavorite = useCallback(() => {
		if (isFavorite) {
			deleteFavoriteVacancy(data.id);
			setIsFavorite(false);
			return;
		}

		addFavoriteVacancy(data);
		setIsFavorite(true);
	}, [isFavorite, data]);

	return (
		<Paper component="article" p={23} pb={18} pt={17} withBorder>
			<Stack spacing={11}>
				<Group position="apart" noWrap>
					<Title order={2} className={classes.cardTitle}>
						<Anchor
							component={Link}
							to="/favorites"
							className={classes.cardTitle__link}
						>
							{profession}
						</Anchor>
					</Title>
					<ActionIcon mt={3} onClick={toggleIsFavorite}>
						<img
							src={isFavorite ? IconStarFilled : IconStar}
							height={22}
							alt="Star icon"
						/>
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
