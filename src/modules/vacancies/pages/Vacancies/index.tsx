import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Group, Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultContainer } from '@modules/common/components';
import { getPaginationControlProps } from '@modules/common/helpers';
import { getPageTitle } from '@modules/common/services';
import { NothingHere } from '@modules/not-found/components';
import { getFields, getVacancies } from '@modules/vacancies/api';
import {
	Filters,
	MobileFilters,
	VacanciesSearch,
	VacancyCard,
	VacancyCardSkeleton,
} from '@modules/vacancies/components';
import { FiltersForm, SearchForm } from '@modules/vacancies/types';

import { useStyles } from './styles';
import { searchSchema } from './validation';

const DEFAULT_PAGES = 5;
const PAGE_ITEMS = 4;
const MAX_ENTITIES = 500;

const PARAM_PAGE = 'page';
const PARAM_SEARCH = 'search';
const PARAM_FIELD = 'field';
const PARAM_FROM = 'from';
const PARAM_TO = 'to';

const Vacancies = () => {
	const { search: urlSearchString, pathname } = useLocation();
	const params = new URLSearchParams(urlSearchString);
	const navigate = useNavigate();

	const { classes } = useStyles();

	const search = params.get(PARAM_SEARCH) || '';

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			search,
		},
		resolver: yupResolver(searchSchema),
	});

	const page = Number(params.get(PARAM_PAGE)) || 1;
	const catalogue = params.get(PARAM_FIELD) || '';
	const paymentFrom = Number(params.get(PARAM_FROM)) || '';
	const paymentTo = Number(params.get(PARAM_TO)) || '';

	const filtersForm: FiltersForm = {
		catalogues: catalogue,
		payment_from: paymentFrom,
		payment_to: paymentTo,
	};

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

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const onChangeSearch = useCallback(
		(values: SearchForm) => {
			const newParams = new URLSearchParams(urlSearchString);
			newParams.delete(PARAM_SEARCH);
			newParams.set(PARAM_PAGE, '1');
			if (values.search) newParams.set(PARAM_SEARCH, values.search);

			// scrollToTop();
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, urlSearchString]
	);

	const onChangeFilters = useCallback(
		(values: FiltersForm) => {
			const newParams = new URLSearchParams(urlSearchString);

			newParams.delete(PARAM_FIELD);
			newParams.delete(PARAM_FROM);
			newParams.delete(PARAM_TO);

			newParams.set(PARAM_PAGE, '1');

			if (values.catalogues) newParams.set(PARAM_FIELD, values.catalogues);
			if (values.payment_from)
				newParams.set(PARAM_FROM, values.payment_from.toString());
			if (values.payment_to)
				newParams.set(PARAM_TO, values.payment_to.toString());

			// scrollToTop();
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, urlSearchString]
	);

	const onChangePage = useCallback(
		(newPage: number) => {
			const newParams = new URLSearchParams(urlSearchString);
			newParams.set(PARAM_PAGE, newPage.toString());

			// scrollToTop();
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, urlSearchString]
	);

	useEffect(() => {
		const newParams = new URLSearchParams();

		newParams.append(PARAM_PAGE, page.toString());
		if (catalogue) newParams.append(PARAM_FIELD, catalogue);
		if (paymentFrom) newParams.append(PARAM_FROM, paymentFrom.toString());
		if (paymentTo) newParams.append(PARAM_TO, paymentTo.toString());
		if (search) newParams.append(PARAM_SEARCH, search);
		reset({ search });

		navigate(`${pathname}?${newParams.toString()}`, { replace: true });
	}, []);

	useEffect(() => {
		scrollToTop();
	}, [urlSearchString]);

	const entities = vacancies?.total
		? Math.min(vacancies.total, MAX_ENTITIES)
		: DEFAULT_PAGES * PAGE_ITEMS;

	const totalPages = Math.ceil(entities / PAGE_ITEMS);

	const readyToDisplay = !vacanciesLoading && vacancies;

	const noData = !vacanciesLoading && vacancies?.objects.length === 0;

	const title = getPageTitle('Вакансии');

	return (
		<DefaultContainer>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<MobileFilters
				values={filtersForm}
				fields={fields}
				onChange={onChangeFilters}
			/>
			<Group className={classes.columnsWrapper} align="flex-start" spacing={28}>
				<Filters
					className={classes.hiddenTabletsAndBelow}
					sticky
					values={filtersForm}
					fields={fields}
					onChange={onChangeFilters}
				/>
				<Box className={classes.flex1}>
					<Stack align="stretch" className={classes.flex1}>
						<VacanciesSearch
							onChange={handleSubmit(onChangeSearch)}
							control={control}
						/>

						{readyToDisplay ? (
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
						{noData && <NothingHere withButton={false} />}
					</Stack>
					<Pagination
						value={page}
						className={classes.pagination}
						onChange={onChangePage}
						total={totalPages}
						getControlProps={getPaginationControlProps}
					/>
				</Box>
			</Group>
		</DefaultContainer>
	);
};

export default Vacancies;
