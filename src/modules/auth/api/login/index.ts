import { jobsApi } from '@modules/common/api';
import {
	VITE_CLIENT_ID,
	VITE_CLIENT_SECRET,
	VITE_LOGIN,
	VITE_PASSWORD,
} from '@modules/common/constants';

import { LoginResponse } from './dto';

export const loginUser = async (): Promise<LoginResponse> => {
	const login = import.meta.env[VITE_LOGIN];
	const password = import.meta.env[VITE_PASSWORD];
	const clientId = import.meta.env[VITE_CLIENT_ID];
	const clientSecret = import.meta.env[VITE_CLIENT_SECRET];

	return jobsApi
		.get('/2.0/oauth2/password/', {
			params: {
				login,
				password,
				client_id: clientId,
				client_secret: clientSecret,
				hr: 0,
			},
		})
		.then((response) => response.data);
};
