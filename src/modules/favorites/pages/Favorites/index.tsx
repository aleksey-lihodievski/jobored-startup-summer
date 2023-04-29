import { Pagination, Stack } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { NothingHere } from '@modules/favorites/components';
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

		navigate(`${pathname}?${newSearchParams.toString()}`);
	}, [page]);

	return (
		<DefaultLayout>
			<Helmet>
				<title>Избранное | Jobored</title>
			</Helmet>
			<DefaultContainer>
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
						/>
					</>
				) : (
					<NothingHere />
				)}
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default Favorites;
