import { Button, Stack, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { ImgNotFound } from '@assets/img';

import { useStyles } from './styles';

interface NothingHereProps {
	className?: string;
	withButton?: boolean;
}

const NothingHere: React.FC<NothingHereProps> = ({
	className,
	withButton = true,
}) => {
	const { classes } = useStyles();

	return (
		<Stack spacing={32} align="center" className={className}>
			<img
				src={ImgNotFound}
				alt="Man with a loupe"
				height="100%"
				className={classes.image}
			/>
			<Title className={classes.title}>Упс, здесь еще ничего нет!</Title>
			{withButton && (
				<Button
					variant="light"
					size="md"
					className={classes.button}
					component={Link}
					to="/vacancies"
				>
					Поиск Вакансий
				</Button>
			)}
		</Stack>
	);
};

export default NothingHere;
