import { jobsApi } from '@modules/common/api';
import { VITE_CLIENT_ID, VITE_CLIENT_SECRET } from '@modules/common/constants';

import { RefreshTokenResponse } from './dto';

export const refreshTokens = async (
	refreshToken: string | null
): Promise<RefreshTokenResponse> => {
	const clientId = import.meta.env[VITE_CLIENT_ID];
	const clientSecret = import.meta.env[VITE_CLIENT_SECRET];

	return jobsApi
		.get('/2.0/oauth2/refresh_token/', {
			params: {
				refresh_token: refreshToken,
				client_id: clientId,
				client_secret: clientSecret,
			},
		})
		.then((response) => response.data);
};
