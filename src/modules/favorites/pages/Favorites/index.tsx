import { Pagination, Stack } from '@mantine/core';
import { useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultContainer } from '@modules/common/components';
import { getPaginationControlProps } from '@modules/common/helpers';
import { getPageTitle } from '@modules/common/services';
import { NothingHere } from '@modules/not-found/components';
import { VacancyCard } from '@modules/vacancies/components';
import { getFavoriteVacancies } from '@modules/vacancies/services';

import { useStyles } from './styles';

const PAGE_ITEMS = 4;

const Favorites = () => {
	const { pathname, search } = useLocation();
	const navigate = useNavigate();
	const params = new URLSearchParams(search);

	const vacancies = useMemo(() => getFavoriteVacancies(), []);
	const hasVacancies = vacancies.length > 0;

	const totalPages = Math.ceil(vacancies.length / PAGE_ITEMS);

	const page = Number(params.get('page'))
		? Math.min(Number(params.get('page')), totalPages)
		: 1;

	const pageIdx = page - 1;

	const pageVacancies = useMemo(
		() => vacancies.slice(pageIdx * PAGE_ITEMS, page * PAGE_ITEMS),
		[vacancies, page, pageIdx]
	);

	const { classes } = useStyles();

	const onChangePage = useCallback(
		(newPage: number) => {
			const newParams = new URLSearchParams(search);
			newParams.set('page', newPage.toString());
			navigate(`${pathname}?${newParams.toString()}`);
		},
		[pathname, search]
	);

	useEffect(() => {
		const newParams = new URLSearchParams();

		newParams.append('page', page.toString());

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
						{pageVacancies.map((vacancy) => (
							<VacancyCard key={vacancy.id} data={vacancy} />
						))}
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
