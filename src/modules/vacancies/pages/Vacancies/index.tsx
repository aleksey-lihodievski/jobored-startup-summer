import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Group, Input, Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconSearch } from '@assets/icons';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { getVacancies } from '@modules/vacancies/api';
import { getFields } from '@modules/vacancies/api/getFields';
import {
	Filters,
	FiltersForm,
	MobileFilters,
	VacancyCard,
	VacancyCardSkeleton,
} from '@modules/vacancies/components';

import { useStyles } from './styles';
import { SearchForm } from './types';
import { searchSchema } from './validation';

const INPUT_PADDING = 24;
const DEFAULT_PAGES = 5;
const PAGE_ITEMS = 4;

const Vacancies = () => {
	const { search: urlSearchString, pathname } = useLocation();
	const params = new URLSearchParams(urlSearchString);
	const navigate = useNavigate();

	const [buttonWidth, setButtonWidth] = useState<number>();

	const { classes } = useStyles();

	const searchButtonRef = useRef<HTMLButtonElement>(null);

	const defaultSearch = params.get('search') || '';

	const { handleSubmit, control } = useForm({
		defaultValues: {
			search: defaultSearch,
		},
		resolver: yupResolver(searchSchema),
	});

	const defaultPage = Number(params.get('page')) || 1;
	const defaultField = params.get('field') || '';
	const defaultPaymentFrom = Number(params.get('from')) || '';
	const defaultPaymentTo = Number(params.get('to')) || '';

	const [page, setPage] = useState(defaultPage);

	const [filtersForm, setFiltersForm] = useState<FiltersForm>({
		catalogues: defaultField,
		payment_from: defaultPaymentFrom,
		payment_to: defaultPaymentTo,
	});

	const [search, setSearch] = useState(defaultSearch);

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

	useEffect(() => {
		const newSearchParams = new URLSearchParams();

		const {
			catalogues,
			payment_from: paymentFrom,
			payment_to: paymentTo,
		} = filtersForm;

		newSearchParams.append('page', page.toString());
		if (catalogues) newSearchParams.append('field', catalogues);
		if (paymentFrom) newSearchParams.append('from', paymentFrom.toString());
		if (paymentTo) newSearchParams.append('to', paymentTo.toString());
		if (search) newSearchParams.append('search', search);

		navigate(`${pathname}?${newSearchParams.toString()}`);
	}, [page, filtersForm, search]);

	const totalPages = vacancies?.total
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
											data-elem="search-input"
											size="lg"
											placeholder="Введите название вакансии"
											className={classes.searchInput}
											icon={<img src={IconSearch} alt="" />}
											rightSectionWidth={buttonWidth}
											rightSection={
												<Button
													ref={searchButtonRef}
													data-elem="search-button"
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
									<VacancyCard key={vacancy.id} data={vacancy} />
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
						/>
					</Box>
				</Group>
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default Vacancies;
