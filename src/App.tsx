import { useCallback, useEffect, useRef } from 'react';

import { loginUser, refreshTokens } from '@modules/auth/api';
import {
	ACCESS_TOKEN_KEY,
	EXPIRE_DATE_KEY,
	REFRESH_TOKEN_KEY,
} from '@modules/common/constants';
import { Router } from '@modules/common/router';
import { getToken, setToken } from '@modules/common/services';

const FIVE_MINUTES = 1000 * 60 * 5;

function App() {
	const refOnce = useRef(false);

	const onRefreshTokens = useCallback(async () => {
		const refreshToken = getToken(REFRESH_TOKEN_KEY);

		try {
			const data = await refreshTokens(refreshToken);

			const nowUtc = new Date().getTime();
			const expirationDate = data.expires_in * 1000 + nowUtc;

			setToken(ACCESS_TOKEN_KEY, data.access_token);
			setToken(REFRESH_TOKEN_KEY, data.refresh_token);
			setToken(EXPIRE_DATE_KEY, expirationDate.toString());
		} catch (err) {
			return;
		}
	}, []);

	const onLoginUser = useCallback(async () => {
		try {
			const data = await loginUser();

			const expirationDate = data.ttl * 1000;

			setToken(ACCESS_TOKEN_KEY, data.access_token);
			setToken(REFRESH_TOKEN_KEY, data.refresh_token);
			setToken(EXPIRE_DATE_KEY, expirationDate.toString());
		} catch (err) {
			return;
		}
	}, []);

	useEffect(() => {
		const checkTokenExpiration = () => {
			const nowUtc = new Date().getTime();
			const expirationDate = Number(getToken(EXPIRE_DATE_KEY)) || 0;
			const refreshToken = getToken(REFRESH_TOKEN_KEY);
			const accessToken = getToken(ACCESS_TOKEN_KEY);

			if (
				(!accessToken && !refOnce.current) ||
				(!expirationDate && !refreshToken && !refOnce.current)
			) {
				onLoginUser();
				refOnce.current = true;
				return;
			}

			const expireDatePassed =
				accessToken &&
				(nowUtc > expirationDate - FIVE_MINUTES || !expirationDate);

			if (expireDatePassed) {
				if (!refOnce.current) onRefreshTokens();
				refOnce.current = true;
				return;
			}
		};

		checkTokenExpiration();
		const timer = setInterval(checkTokenExpiration, 60000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Router />;
}

export default App;
