import { Pagination, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultContainer } from '@modules/common/components';
import { getPaginationControlProps } from '@modules/common/helpers';
import { getPageTitle } from '@modules/common/services';
import { NothingHere } from '@modules/not-found/components';
import { getVacancies } from '@modules/vacancies/api';
import {
	VacancyCard,
	VacancyCardSkeleton,
} from '@modules/vacancies/components';
import { getFavoriteVacancies } from '@modules/vacancies/services';

import { useStyles } from './styles';

const PAGE_ITEMS = 4;
const PARAM_PAGE = 'page';

const Favorites = () => {
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(search);

	const vacanciesKeys = useMemo(() => getFavoriteVacancies(), []);
	const totalVacancies = vacanciesKeys.length;
	const totalPages = Math.ceil(vacanciesKeys.length / PAGE_ITEMS);

	const paramsPage = Number(params.get(PARAM_PAGE));
	const page = paramsPage ? Math.min(paramsPage, totalPages) : 1;
	const pageIdx = page - 1;

	const hasVacancies = vacanciesKeys.length > 0;
	const pageAmount = Math.min(
		totalVacancies - pageIdx * PAGE_ITEMS,
		PAGE_ITEMS
	);
	const pageVacancies = useQuery(['favorites', pageIdx, vacanciesKeys], {
		queryFn: () =>
			getVacancies({ pageIdx, count: PAGE_ITEMS, ids: vacanciesKeys }),
	});

	const { classes } = useStyles();

	const onChangePage = useCallback(
		(newPage: number) => {
			const newParams = new URLSearchParams(search);
			newParams.set(PARAM_PAGE, newPage.toString());
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, search]
	);

	useEffect(() => {
		const newParams = new URLSearchParams();

		newParams.append(PARAM_PAGE, page.toString());

		navigate(`${pathname}?${newParams.toString()}`, { replace: true });
	}, []);

	const title = getPageTitle('Избранное');

	return (
		<DefaultContainer>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{hasVacancies ? (
				<>
					<Stack align="stretch">
						{pageVacancies.data
							? pageVacancies.data.objects.map((vacancy) => (
									<VacancyCard key={vacancy.id} data={vacancy} />
							  ))
							: Array(pageAmount)
									.fill(true)
									.map((_, idx) => <VacancyCardSkeleton key={idx} />)}
					</Stack>
					<Pagination
						value={page}
						onChange={onChangePage}
						total={totalPages}
						className={classes.pagination}
						getControlProps={getPaginationControlProps}
					/>
				</>
			) : (
				<NothingHere className={classes.nothingHere} />
			)}
		</DefaultContainer>
	);
};

export default Favorites;
