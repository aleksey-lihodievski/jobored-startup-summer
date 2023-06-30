import { jobsApi } from '@modules/common/api';
import { Vacancy } from '@modules/vacancies/types';

export const getVacancy = async (id: string | number): Promise<Vacancy> => {
	return jobsApi.get(`/api/2.0/vacancies/${id}/`).then((res) => res.data);
};
