import { Vacancy } from '@modules/vacancies/types';

export interface GetVacanciesRequest {
	/*** Starts with zero **/
	pageIdx: number;

	count: number;

	fields?: string;
	paymentFrom?: number;
	paymentTo?: number;

	keyword?: string;
}

export interface GetVacanciesResponse {
	more: boolean;
	objects: Vacancy[];
	subscription_active: boolean;
	subscription_id: number;
	total: number;
}