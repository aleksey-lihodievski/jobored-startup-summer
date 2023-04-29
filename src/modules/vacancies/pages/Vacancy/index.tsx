import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
import { getPageTitle } from '@modules/common/services';
import { getVacancy } from '@modules/vacancies/api';
import {
	VacancyBody,
	VacancyBodySkeleton,
	VacancyHeader,
	VacancyHeaderSkeleton,
} from '@modules/vacancies/components';

const Vacancy = () => {
	const { id } = useParams();

	const { data: vacancy, isLoading } = useQuery(['vacancy', id], {
		queryFn: () => getVacancy(id as string),
	});

	const title = getPageTitle(vacancy?.profession);

	return (
		<DefaultLayout>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<DefaultContainer>
				{!isLoading && vacancy ? (
					<Stack spacing={20}>
						<VacancyHeader data={vacancy} />
						<VacancyBody description={vacancy.vacancyRichText} />
					</Stack>
				) : (
					<Stack spacing={20}>
						<VacancyHeaderSkeleton />
						<VacancyBodySkeleton />
					</Stack>
				)}
			</DefaultContainer>
		</DefaultLayout>
	);
};

export default Vacancy;
