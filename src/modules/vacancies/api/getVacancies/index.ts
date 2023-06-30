import { jobsApi } from '@modules/common/api';

import { GetVacanciesRequest, GetVacanciesResponse } from './dto';

export const getVacancies = async (
	params: GetVacanciesRequest
): Promise<GetVacanciesResponse> => {
	const { pageIdx, count, fields, paymentFrom, paymentTo, keyword, ids } =
		params;

	return jobsApi
		.get('/api/2.0/vacancies/', {
			params: {
				page: pageIdx,
				count,

				catalogues: fields,
				payment_from: paymentFrom,
				payment_to: paymentTo,

				keyword,
				published: 1,
				no_agreement: 1,

				ids,
			},
		})
		.then((res) => res.data);
};
