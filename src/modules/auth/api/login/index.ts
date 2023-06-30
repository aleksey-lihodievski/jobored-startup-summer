import axios from 'axios';

import {
	VITE_CLIENT_ID,
	VITE_CLIENT_SECRET,
	VITE_LOGIN,
	VITE_PASSWORD,
} from '@modules/common/constants';

import { LoginResponse } from './dto';

const login = import.meta.env[VITE_LOGIN];
const password = import.meta.env[VITE_PASSWORD];
const clientId = import.meta.env[VITE_CLIENT_ID];
const clientSecret = import.meta.env[VITE_CLIENT_SECRET];

export const loginUser = async (): Promise<LoginResponse> => {
	return axios
		.get('/api/2.0/oauth2/password/', {
			params: {
				login,
				password,
				client_id: clientId,
				client_secret: clientSecret,
				hr: 0,
			},
			headers: {
				'X-Api-App-Id': clientSecret,
			},
		})
		.then((response) => response.data);
};
