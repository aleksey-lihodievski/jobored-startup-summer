import { ActionIcon, Anchor, Group, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { IconStar, IconStarFilled } from '@assets/icons';

import { useStyles } from './styles';

interface CardHeaderProps {
	id: number;
	title: string;
	isFavorite: boolean;
	onToggleFavorite: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
	id,
	title,
	isFavorite,
	onToggleFavorite,
}) => {
	const { classes } = useStyles();

	return (
		<Group position="apart" noWrap>
			<Title order={2} className={classes.cardTitle}>
				<Anchor
					component={Link}
					to={`/vacancies/${id}`}
					className={classes.cardTitle__link}
				>
					{title}
				</Anchor>
			</Title>
			<ActionIcon
				onClick={onToggleFavorite}
				data-elem={`vacancy-${id}-shortlist-button`}
			>
				<img
					src={isFavorite ? IconStarFilled : IconStar}
					className={classes.starIcon}
					alt="Star icon"
				/>
			</ActionIcon>
		</Group>
	);
};

export default CardHeader;
export * from './skeleton';
