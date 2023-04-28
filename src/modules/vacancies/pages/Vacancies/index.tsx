import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Group, Input, Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';

import { IconSearch } from '@assets/icons';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { getVacancies } from '@modules/vacancies/api';
import { getFields } from '@modules/vacancies/api/getFields';
import {
	Filters,
	FiltersForm,
	VacancyCard,
} from '@modules/vacancies/components';
import MobileFilters from '@modules/vacancies/components/MobileFilters';
import { VacancyCardSkeleton } from '@modules/vacancies/components/VacancyCard';

import { useStyles } from './styles';
import { SearchForm } from './types';
import { searchSchema } from './validation';

const INPUT_PADDING = 24;
const DEFAULT_PAGES = 5;
const PAGE_ITEMS = 5;

const Vacancies = () => {
	const [buttonWidth, setButtonWidth] = useState<number>();

	const { classes } = useStyles();

	const searchButtonRef = useRef<HTMLButtonElement>(null);

	const { handleSubmit, control } = useForm({
		defaultValues: {
			search: '',
		},
		resolver: yupResolver(searchSchema),
	});

	const [page, setPage] = useState(1);

	const [filtersForm, setFiltersForm] = useState<FiltersForm>({
		catalogues: '',
		payment_from: '',
		payment_to: '',
	});

	const [search, setSearch] = useState('');

	const { data: vacancies, isLoading: vacanciesLoading } = useQuery(
		['vacancies', page, filtersForm, search],
		{
			queryFn: () =>
				getVacancies({
					pageIdx: page - 1,
					count: PAGE_ITEMS,
					fields: filtersForm.catalogues,
					paymentFrom: filtersForm.payment_from || undefined,
					paymentTo: filtersForm.payment_to || undefined,
					keyword: search,
				}),
		}
	);

	const { data: fields } = useQuery(['fields'], {
		queryFn: () => getFields(),
	});

	const onChangeSearch = useCallback((values: SearchForm) => {
		setSearch(values.search);
	}, []);

	const onChangeFilters = useCallback((values: FiltersForm) => {
		setFiltersForm(values);
	}, []);

	useEffect(() => {
		const buttonRect = searchButtonRef.current?.getBoundingClientRect();
		const width = buttonRect ? buttonRect.width + INPUT_PADDING : 0;

		setButtonWidth(width);
	}, []);

	const totalPages =
		typeof vacancies?.total === 'number'
			? Math.ceil(vacancies.total / 4)
			: DEFAULT_PAGES;

	return (
		<DefaultLayout>
			<Helmet>
				<title>Вакансии | Jobored</title>
			</Helmet>
			<DefaultContainer>
				<MobileFilters
					values={filtersForm}
					fields={fields}
					onChange={onChangeFilters}
				/>
				<Group
					className={classes.columnsWrapper}
					align="flex-start"
					spacing={28}
				>
					<Filters
						className={classes.hiddenTabletsAndBelow}
						values={filtersForm}
						fields={fields}
						onChange={onChangeFilters}
					/>
					<Box className={classes.flex1}>
						<Stack align="stretch" className={classes.flex1}>
							<form onSubmit={handleSubmit(onChangeSearch)}>
								<Controller
									name="search"
									render={({ field }) => (
										<Input
											{...field}
											size="lg"
											placeholder="Введите название вакансии"
											className={classes.searchInput}
											icon={<img src={IconSearch} alt="" />}
											rightSectionWidth={buttonWidth}
											rightSection={
												<Button
													ref={searchButtonRef}
													type="submit"
													className={classes.inputButton}
													size="xs"
												>
													Поиск
												</Button>
											}
										/>
									)}
									control={control}
								/>
							</form>
							{!vacanciesLoading && vacancies ? (
								vacancies.objects.map((vacancy) => (
									<VacancyCard
										key={vacancy.id}
										jobTitle={vacancy.profession}
										paymentFrom={vacancy.payment_from}
										paymentTo={vacancy.payment_to}
										currency={vacancy.currency}
										workType={vacancy.type_of_work.title}
										location={vacancy.town.title}
									/>
								))
							) : (
								<>
									<VacancyCardSkeleton />
									<VacancyCardSkeleton />
									<VacancyCardSkeleton />
									<VacancyCardSkeleton />
								</>
							)}
						</Stack>
						<Pagination
							value={page}
							className={classes.pagination}
							onChange={setPage}
							total={totalPages}
							mt={40}
						/>
					</Box>
				</Group>
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default Vacancies;
