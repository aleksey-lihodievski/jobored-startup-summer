import { clearToken, getToken, setToken } from '@modules/common/services';
import { FAVORITE_VACANCIES_KEY } from '@modules/vacancies/constants';
import { Vacancy } from '@modules/vacancies/types';

export const resetFavoriteVacancies = () => clearToken(FAVORITE_VACANCIES_KEY);

export const getFavoriteVacancies = (): Vacancy[] => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies = vacanciesJSON ? JSON.parse(vacanciesJSON) : [];
		return parsedVacancies;
	} catch (err) {
		resetFavoriteVacancies();
		return [];
	}
};

export const addFavoriteVacancy = (vacancy: Vacancy) => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies = vacanciesJSON
			? JSON.parse(vacanciesJSON) || []
			: [];

		setToken(
			FAVORITE_VACANCIES_KEY,
			JSON.stringify([...parsedVacancies, vacancy])
		);
	} catch (err) {
		resetFavoriteVacancies();
	}
};

export const deleteFavoriteVacancy = (key: number) => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies: Vacancy[] = vacanciesJSON
			? JSON.parse(vacanciesJSON) || []
			: [];

		const newVacancies = parsedVacancies.filter(
			(vacancy) => vacancy.id !== key
		);

		setToken(FAVORITE_VACANCIES_KEY, JSON.stringify(newVacancies));
	} catch (err) {
		resetFavoriteVacancies();
	}
};

export const isFavoriteVacancy = (key: number) => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies: Vacancy[] = vacanciesJSON
			? JSON.parse(vacanciesJSON) || []
			: [];

		return parsedVacancies.map((vacancy) => vacancy.id).includes(key);
	} catch (err) {
		resetFavoriteVacancies();
		return false;
	}
};
