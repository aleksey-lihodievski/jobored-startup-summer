import { Button, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import { ImgNotFound } from '@assets/img';

import { useStyles } from './styles';

const NothingHere = () => {
	const { classes } = useStyles();

	return (
		<Stack spacing={32} align="center" mt={84}>
			<img src={ImgNotFound} alt="Man with a loupe" className={classes.image} />
			<Title className={classes.title}>Упс, здесь еще ничего нет!</Title>
			<Button
				variant="light"
				size="md"
				className={classes.button}
				component={Link}
				to="/vacancies"
			>
				Поиск Вакансий
			</Button>
		</Stack>
	);
};

export default NothingHere;
