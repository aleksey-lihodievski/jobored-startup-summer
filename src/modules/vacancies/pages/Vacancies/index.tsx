import { Button, Group, Input } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import { IconSearch } from '@assets/icons';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { FiltersDesktop } from '@modules/vacancies/components';

import { useStyles } from './styles';

const INPUT_PADDING = 16;

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
				<Group className={classes.columnsWrapper} align="flex-start">
					<FiltersDesktop />
					<Input
						size="md"
						placeholder="Введите название вакансии"
						icon={<img src={IconSearch} alt="search icon" />}
						className={classes.searchInput}
						rightSectionWidth={buttonWidth}
						rightSection={
							<Button ref={searchButtonRef} size="xs">
								Поиск
							</Button>
						}
					/>
				</Group>
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default Vacancies;
