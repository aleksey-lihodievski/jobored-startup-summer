import axios from 'axios';

import {
	VITE_CLIENT_ID,
	VITE_CLIENT_SECRET,
	VITE_JOBS_API_URL,
	VITE_LOGIN,
	VITE_PASSWORD,
	VITE_X_SECRET_KEY,
} from '@modules/common/constants';

import { LoginResponse } from './dto';

const login = import.meta.env[VITE_LOGIN];
const password = import.meta.env[VITE_PASSWORD];
const clientId = import.meta.env[VITE_CLIENT_ID];
const clientSecret = import.meta.env[VITE_CLIENT_SECRET];
const xSecret = import.meta.env[VITE_X_SECRET_KEY];

const BASE_URL = import.meta.env[VITE_JOBS_API_URL];

export const loginUser = async (): Promise<LoginResponse> => {
	return axios
		.get(`${BASE_URL}/2.0/oauth2/password/`, {
			params: {
				login,
				password,
				client_id: clientId,
				client_secret: clientSecret,
				hr: 0,
			},
			headers: {
				'x-secret-key': xSecret,
				'X-Api-App-Id': clientSecret,
			},
		})
		.then((response) => response.data);
};
