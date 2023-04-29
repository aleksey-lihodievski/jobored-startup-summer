import { jobsApi } from '@modules/common/api';
import { Vacancy } from '@modules/vacancies/types';

export const getVacancy = async (id: number): Promise<Vacancy> => {
	return jobsApi.get(`/2.0/vacancies/${id}/`).then((res) => res.data);
};
