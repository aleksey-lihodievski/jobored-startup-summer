import { Button, Group, Input, Stack } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconSearch } from '@assets/icons';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { FiltersDesktop, VacancyCard } from '@modules/vacancies/components';

import { useStyles } from './styles';

const INPUT_PADDING = 24;

const Vacancies = () => {
	const [buttonWidth, setButtonWidth] = useState<number>();

	const { classes } = useStyles();

	const searchButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const buttonRect = searchButtonRef.current?.getBoundingClientRect();
		const width = buttonRect ? buttonRect.width + INPUT_PADDING : 0;

		setButtonWidth(width);
	}, []);

	return (
		<DefaultLayout>
			<Helmet>
				<title>Вакансии | Jobored</title>
			</Helmet>
			<DefaultContainer>
				<Group
					className={classes.columnsWrapper}
					align="flex-start"
					spacing={28}
				>
					<FiltersDesktop />
					<Stack align="stretch" className={classes.contentWrapper}>
						<Input
							size="lg"
							placeholder="Введите название вакансии"
							className={classes.searchInput}
							icon={<img src={IconSearch} alt="" />}
							rightSectionWidth={buttonWidth}
							rightSection={
								<Button
									ref={searchButtonRef}
									className={classes.searchButton}
									size="xs"
								>
									Поиск
								</Button>
							}
						/>
						<VacancyCard
							jobTitle="Front-end developer"
							paymentFrom={100_000}
							paymentTo={300_000}
							workType="Гибкий график"
							location="Новый Уренгой"
						/>
					</Stack>
				</Group>
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default Vacancies;
