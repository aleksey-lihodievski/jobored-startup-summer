import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { DefaultContainer, DefaultLayout } from '@modules/common/components';
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

	return (
		<DefaultLayout>
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
