import { Pagination, Stack } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
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

	const defaultPage = Number(params.get('page'))
		? Math.min(Number(params.get('page')), totalPages)
		: 1;
	const [page, setPage] = useState(defaultPage);

	const pageIdx = page - 1;

	const pageVacancies = useMemo(
		() => vacancies.slice(pageIdx * PAGE_ITEMS, page * PAGE_ITEMS),
		[vacancies, page, pageIdx]
	);

	const { classes } = useStyles();

	useEffect(() => {
		const newSearchParams = new URLSearchParams();

		newSearchParams.append('page', page.toString());

		navigate(`${pathname}?${newSearchParams.toString()}`, { replace: true });
	}, [page]);

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
						onChange={setPage}
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
