import { Catalogue } from '../catalogue/entity';

type VacancyCatalog = Omit<
	Catalogue,
	'title_rus' | 'title_trimmed' | 'url_rus'
>;

export interface Vacancy {
	id: number;
	catalogues: VacancyCatalog[];
	firm_name: string;
	payment_from: number;
	payment_to: number;
	currency: string;
	town: {
		id: number;
		title: string;
	};
	profession: string;
	type_of_work: { id: number; title: string };
}

// age_from: number;
// age_to: number;
// agency: { id: number; title: string };
// agreement: boolean;
// already_sent_on_vacancy: boolean;
// anonymous: boolean;
// canEdit: boolean;
// candidat: string;
// children: { id: number; title: string };
// client: {
// 	client_logo: string;
// 	description: string;
// 	id: number;
// 	industry: [];
// 	is_blocked: boolean;
// 	link: string;
// 	registered_date: number;
// 	short_reg: boolean;
// 	staff_count: string;
// 	title: string;
// 	town: {
// 		declension: string;
// 		genitive: string;
// 		hasMetro: boolean;
// 		id: number;
// 		title: string;
// 	};
// 	url: string;
// 	vacancy_count: number;
// };
// client_logo: string;
// contact: string;
// covid_vaccination_requirement: { id: number; title: string };
// date_archived: number;
// date_pub_to: number;
// date_published: number;
// education: { id: number; title: string };
// experience: { id: number; title: string };
// favorite: boolean;
// firm_actIVity: string;
// gender: { id: number; title: string };
// highlight: boolean;
// id: number;
// id_client: number;
// isBlacklisted: boolean;
// is_archive: boolean;
// is_closed: boolean;
// is_storage: boolean;
// link: string;
// maritalstatus: { id: number; title: string };
// moveable: boolean;
// phone: string;
// place_of_work: { id: number; title: string };
// vacancyRichText: string;
