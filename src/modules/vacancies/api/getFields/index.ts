import { jobsApi } from '@modules/common/api';
import { Catalogue } from '@modules/vacancies/types';

export const getFields = async (): Promise<Catalogue[]> => {
	return jobsApi.get('/2.0/catalogues/').then((res) => res.data);
};
