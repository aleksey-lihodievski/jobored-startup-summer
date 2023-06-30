import axios from 'axios';

import { VITE_CLIENT_ID, VITE_CLIENT_SECRET } from '@modules/common/constants';

import { RefreshTokenResponse } from './dto';

const clientId = import.meta.env[VITE_CLIENT_ID];
const clientSecret = import.meta.env[VITE_CLIENT_SECRET];

export const refreshTokens = async (
	refreshToken: string | null
): Promise<RefreshTokenResponse> => {
	return axios
		.get('/api/2.0/oauth2/refresh_token/', {
			params: {
				refresh_token: refreshToken,
				client_id: clientId,
				client_secret: clientSecret,
			},
			headers: {
				'X-Api-App-Id': clientSecret,
			},
		})
		.then((response) => response.data);
};
