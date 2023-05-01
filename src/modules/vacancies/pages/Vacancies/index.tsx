import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Group, Input, Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconSearch } from '@assets/icons';

import { DefaultContainer } from '@modules/common/components';
import { getPaginationControlProps } from '@modules/common/helpers';
import { getPageTitle } from '@modules/common/services';
import { NothingHere } from '@modules/not-found/components';
import { getFields, getVacancies } from '@modules/vacancies/api';
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
const SEARCH_ICON_WIDTH = 13;
const SEARCH_ICON_X_PADDINGS = 23;

const Vacancies = () => {
	const { search: urlSearchString, pathname } = useLocation();
	const params = new URLSearchParams(urlSearchString);
	const navigate = useNavigate();

	const [buttonWidth, setButtonWidth] = useState<number>();

	const { classes } = useStyles({
		iconSectionWidth: SEARCH_ICON_WIDTH + SEARCH_ICON_X_PADDINGS,
	});

	const searchButtonRef = useRef<HTMLButtonElement>(null);

	const search = params.get('search') || '';

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			search,
		},
		resolver: yupResolver(searchSchema),
	});

	const page = Number(params.get('page')) || 1;
	const catalogue = params.get('field') || '';
	const paymentFrom = Number(params.get('from')) || '';
	const paymentTo = Number(params.get('to')) || '';

	const filtersForm = {
		catalogues: catalogue,
		payment_from: paymentFrom,
		payment_to: paymentTo,
	} as const;

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

	const onChangeSearch = useCallback(
		(values: SearchForm) => {
			const newParams = new URLSearchParams(urlSearchString);
			newParams.set('search', values.search);
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, urlSearchString]
	);

	const onChangeFilters = useCallback(
		(values: FiltersForm) => {
			const newParams = new URLSearchParams(urlSearchString);

			newParams.delete('field');
			newParams.delete('from');
			newParams.delete('to');

			if (values.catalogues) newParams.set('field', values.catalogues);
			if (values.payment_from)
				newParams.set('from', values.payment_from.toString());
			if (values.payment_to) newParams.set('to', values.payment_to.toString());

			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, urlSearchString]
	);

	const onChangePage = useCallback(
		(newPage: number) => {
			const newParams = new URLSearchParams(urlSearchString);
			newParams.set('page', newPage.toString());
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, urlSearchString]
	);

	useLayoutEffect(() => {
		const buttonRect = searchButtonRef.current?.getBoundingClientRect();
		const width = buttonRect ? buttonRect.width + INPUT_PADDING : 0;

		setButtonWidth(width);
	}, []);

	useEffect(() => {
		const newParams = new URLSearchParams();

		newParams.append('page', page.toString());
		if (catalogue) newParams.append('field', catalogue);
		if (paymentFrom) newParams.append('from', paymentFrom.toString());
		if (paymentTo) newParams.append('to', paymentTo.toString());
		if (search) newParams.append('search', search);
		reset({ search });

		navigate(`${pathname}?${newParams.toString()}`, { replace: true });
	}, []);

	useEffect(() => {
		const searchParams = new URLSearchParams(urlSearchString);
		const pageSearch = searchParams.get('search') || '';

		reset({ search: pageSearch });
	}, [urlSearchString]);

	const totalPages = vacancies?.total
		? Math.ceil(vacancies.total / 4)
		: DEFAULT_PAGES;

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
										icon={
											<img
												src={IconSearch}
												alt=""
												className={classes.searchIcon}
											/>
										}
										iconWidth={SEARCH_ICON_WIDTH + SEARCH_ICON_X_PADDINGS}
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
