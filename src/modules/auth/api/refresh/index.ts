import axios from 'axios';

import {
	VITE_CLIENT_ID,
	VITE_CLIENT_SECRET,
	VITE_JOBS_API_URL,
	VITE_X_SECRET_KEY,
} from '@modules/common/constants';

import { RefreshTokenResponse } from './dto';

const clientId = import.meta.env[VITE_CLIENT_ID];
const clientSecret = import.meta.env[VITE_CLIENT_SECRET];
const xSecret = import.meta.env[VITE_X_SECRET_KEY];

const BASE_URL = import.meta.env[VITE_JOBS_API_URL];

export const refreshTokens = async (
	refreshToken: string | null
): Promise<RefreshTokenResponse> => {
	return axios
		.get(`${BASE_URL}/2.0/oauth2/refresh_token/`, {
			params: {
				refresh_token: refreshToken,
				client_id: clientId,
				client_secret: clientSecret,
			},
			headers: {
				'x-secret-key': xSecret,
				'X-Api-App-Id': clientSecret,
			},
		})
		.then((response) => response.data);
};
