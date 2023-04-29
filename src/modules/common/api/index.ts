import axios, {
	AxiosError,
	AxiosResponse,
	HttpStatusCode,
	InternalAxiosRequestConfig,
} from 'axios';

import { loginUser } from '@modules/auth/api';

import {
	ACCESS_TOKEN_KEY,
	VITE_CLIENT_SECRET,
	VITE_JOBS_API_URL,
	VITE_X_SECRET_KEY,
} from '../constants';
import { getToken } from '../services';

const CLIENT_SECRET_KEY = import.meta.env[VITE_CLIENT_SECRET];
const X_SECRET_KEY = import.meta.env[VITE_X_SECRET_KEY];

const onRequest = async (
	config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
	const accessToken = getToken(ACCESS_TOKEN_KEY);

	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`;
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
	if (
		error.response &&
		[HttpStatusCode.Unauthorized, HttpStatusCode.BadRequest].includes(
			error.response.status
		)
	) {
		await loginUser();
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
