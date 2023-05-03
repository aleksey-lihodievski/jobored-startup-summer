import axios, {
	AxiosError,
	AxiosResponse,
	HttpStatusCode,
	InternalAxiosRequestConfig,
} from 'axios';

import { loginUser, refreshTokens } from '@modules/auth/api';

import {
	ACCESS_TOKEN_KEY,
	EXPIRE_DATE_KEY,
	REFRESH_TOKEN_KEY,
	VITE_CLIENT_SECRET,
	VITE_JOBS_API_URL,
	VITE_X_SECRET_KEY,
} from '../constants';
import { getToken, setToken } from '../services';

const CLIENT_SECRET_KEY = import.meta.env[VITE_CLIENT_SECRET];
const X_SECRET_KEY = import.meta.env[VITE_X_SECRET_KEY];

const onRequest = async (
	config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
	const accessToken = getToken(ACCESS_TOKEN_KEY);

	if (config?.headers) {
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		config.headers['x-secret-key'] = X_SECRET_KEY;
		config.headers['X-Api-App-Id'] = CLIENT_SECRET_KEY;
	}

	return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = async (response: AxiosResponse): Promise<AxiosResponse> => {
	return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
	const refreshToken = getToken(REFRESH_TOKEN_KEY);

	if (error.response) {
		if ([HttpStatusCode.Unauthorized].includes(error.response.status)) {
			const data = await loginUser();
			const expireDate = data.ttl * 1000;

			setToken(ACCESS_TOKEN_KEY, data.access_token);
			setToken(REFRESH_TOKEN_KEY, data.refresh_token);
			setToken(EXPIRE_DATE_KEY, expireDate.toString());
		}

		if ([HttpStatusCode.Gone].includes(error.response.status)) {
			await refreshTokens(refreshToken);
		}
	}

	return Promise.reject(error);
};

export const getHttp = (baseURL: string) => {
	const http = axios.create({
		baseURL,
	});

	http.interceptors.request.use(onRequest, onRequestError);
	http.interceptors.response.use(onResponse, onResponseError);
	return http;
};

export const jobsApi = getHttp(import.meta.env[VITE_JOBS_API_URL]);
