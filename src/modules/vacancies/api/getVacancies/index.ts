import { jobsApi } from '@modules/common/api';

import { GetVacanciesRequest, GetVacanciesResponse } from './dto';

export const getVacancies = async (
	params: GetVacanciesRequest
): Promise<GetVacanciesResponse> => {
	const { pageIdx, count, fields, paymentFrom, paymentTo, keyword } = params;

	return jobsApi
		.get('/2.0/vacancies/', {
			params: {
				page: pageIdx,
				count,

				catalogues: fields,
				payment_from: paymentFrom,
				payment_to: paymentTo,

				keyword,
				published: 1,
			},
		})
		.then((res) => res.data);
};
